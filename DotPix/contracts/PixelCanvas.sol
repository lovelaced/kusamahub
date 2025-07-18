// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract PixelCanvas {
    uint256 public constant CANVAS_WIDTH = 2000;
    uint256 public constant CANVAS_HEIGHT = 2000;
    uint256 public constant TOTAL_PIXELS = CANVAS_WIDTH * CANVAS_HEIGHT;
    
    uint256 public constant BASE_PIXEL_FEE = 0.001 ether;
    uint256 public constant BURN_PERCENTAGE = 49;
    
    address public immutable recipient;
    address public owner;
    bool private locked;
    
    // Optimized storage: Pack pixel data into single storage slot
    // Layout: owner (20 bytes) + color (4 bytes) + timestamp (8 bytes) = 32 bytes
    // This reduces storage costs significantly
    mapping(uint256 => bytes32) public pixelData;
    
    event PixelPlaced(uint256 indexed pixelId, address indexed owner, uint32 color, uint256 fee, uint256 timestamp);
    event BatchPixelsPlaced(address indexed owner, uint256[] pixelIds, uint32[] colors, uint256 totalFee, uint256 timestamp);
    event FeesDistributed(uint256 burned, uint256 toRecipient);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }
    
    modifier validPixelId(uint256 pixelId) {
        require(pixelId < TOTAL_PIXELS, "Invalid pixel ID");
        _;
    }
    
    modifier nonReentrant() {
        require(!locked, "Reentrant call");
        locked = true;
        _;
        locked = false;
    }
    
    constructor(address _recipient) {
        require(_recipient != address(0), "Invalid recipient");
        recipient = _recipient;
        owner = msg.sender;
    }
    
    receive() external payable {}
    
    function getPixelId(uint256 x, uint256 y) public pure returns (uint256) {
        require(x < CANVAS_WIDTH && y < CANVAS_HEIGHT, "Coordinates out of bounds");
        return y * CANVAS_WIDTH + x;
    }
    
    function getPixelCoordinates(uint256 pixelId) public pure returns (uint256 x, uint256 y) {
        require(pixelId < TOTAL_PIXELS, "Invalid pixel ID");
        x = pixelId % CANVAS_WIDTH;
        y = pixelId / CANVAS_WIDTH;
    }
    
    function calculatePixelFee(uint256 count) public pure returns (uint256) {
        if (count == 1) return BASE_PIXEL_FEE;
        uint256 multiplier = 100 + (count - 1) * 10;
        return (BASE_PIXEL_FEE * count * multiplier) / 100;
    }
    
    // Pack pixel data into single bytes32 slot
    function _packPixelData(address pixelOwner, uint32 color, uint256 timestamp) internal pure returns (bytes32) {
        // Truncate timestamp to 8 bytes (good until year 2554)
        uint64 truncatedTimestamp = uint64(timestamp);
        return bytes32(
            (uint256(uint160(pixelOwner)) << 96) |
            (uint256(color) << 64) |
            uint256(truncatedTimestamp)
        );
    }
    
    // Unpack pixel data from bytes32 slot
    function _unpackPixelData(bytes32 data) internal pure returns (address pixelOwner, uint32 color, uint256 timestamp) {
        pixelOwner = address(uint160(uint256(data) >> 96));
        color = uint32((uint256(data) >> 64) & 0xFFFFFFFF);
        timestamp = uint256(uint64(uint256(data) & 0xFFFFFFFFFFFFFFFF));
    }
    
    function placePixel(uint256 pixelId, uint32 color) external payable validPixelId(pixelId) nonReentrant {
        uint256 requiredFee = calculatePixelFee(1);
        require(msg.value >= requiredFee, "Insufficient fee");
        
        pixelData[pixelId] = _packPixelData(msg.sender, color, block.timestamp);
        
        _distributeFees(requiredFee);
        
        if (msg.value > requiredFee) {
            (bool success,) = payable(msg.sender).call{value: msg.value - requiredFee}("");
            require(success, "Refund failed");
        }
        
        emit PixelPlaced(pixelId, msg.sender, color, requiredFee, block.timestamp);
    }
    
    // Optimized batch function with several gas optimizations
    function placePixelsBatch(uint256[] calldata pixelIds, uint32[] calldata colors) external payable nonReentrant {
        uint256 length = pixelIds.length;
        require(length == colors.length, "Arrays length mismatch");
        require(length > 0, "Empty arrays");
        require(length <= 100, "Batch too large");
        
        uint256 requiredFee = calculatePixelFee(length);
        require(msg.value >= requiredFee, "Insufficient fee");
        
        // Cache timestamp and pack once
        uint256 timestamp = block.timestamp;
        
        // Batch validation - check all pixel IDs upfront
        for (uint256 i = 0; i < length;) {
            require(pixelIds[i] < TOTAL_PIXELS, "Invalid pixel ID");
            unchecked { ++i; }
        }
        
        // Batch storage updates - pack data efficiently
        for (uint256 i = 0; i < length;) {
            pixelData[pixelIds[i]] = _packPixelData(msg.sender, colors[i], timestamp);
            unchecked { ++i; }
        }
        
        _distributeFees(requiredFee);
        
        if (msg.value > requiredFee) {
            (bool success,) = payable(msg.sender).call{value: msg.value - requiredFee}("");
            require(success, "Refund failed");
        }
        
        // Emit individual PixelPlaced events for each pixel (gas efficient + frontend compatible)
        for (uint256 i = 0; i < length;) {
            emit PixelPlaced(pixelIds[i], msg.sender, colors[i], 0, timestamp);
            unchecked { ++i; }
        }
        
        // Also emit a summary batch event without arrays (gas efficient)
        emit BatchPixelsPlaced(msg.sender, new uint256[](0), new uint32[](0), requiredFee, timestamp);
    }
    
    function _distributeFees(uint256 totalFee) internal {
        uint256 toBurn = (totalFee * BURN_PERCENTAGE) / 100;
        uint256 toRecipient = totalFee - toBurn;
        
        (bool success,) = payable(recipient).call{value: toRecipient}("");
        require(success, "Transfer failed");
        
        emit FeesDistributed(toBurn, toRecipient);
    }
    
    function getPixel(uint256 pixelId) external view validPixelId(pixelId) returns (address pixelOwner, uint32 color, uint256 lastModified) {
        return _unpackPixelData(pixelData[pixelId]);
    }
    
    // Compatibility function for existing frontend
    function pixels(uint256 pixelId) external view returns (address pixelOwner, uint32 color, uint256 lastModified) {
        return _unpackPixelData(pixelData[pixelId]);
    }
    
    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "Invalid address");
        owner = newOwner;
    }
    
    function emergencyWithdraw() external onlyOwner {
        (bool success,) = payable(owner).call{value: address(this).balance}("");
        require(success, "Withdrawal failed");
    }
}