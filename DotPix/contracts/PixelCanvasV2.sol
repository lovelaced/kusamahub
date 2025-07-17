// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract PixelCanvasV2 {
    uint256 public constant CANVAS_WIDTH = 2000;
    uint256 public constant CANVAS_HEIGHT = 2000;
    uint256 public constant TOTAL_PIXELS = CANVAS_WIDTH * CANVAS_HEIGHT;
    
    uint256 public constant BASE_PIXEL_FEE = 0.001 ether;
    uint256 public constant BURN_PERCENTAGE = 49;
    
    address public immutable recipient;
    address public owner;
    bool private locked;
    
    struct Pixel {
        address owner;
        uint32 color;
        uint256 lastModified;
    }
    
    mapping(uint256 => Pixel) public pixels;
    
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
    
    function placePixel(uint256 pixelId, uint32 color) external payable validPixelId(pixelId) nonReentrant {
        uint256 requiredFee = calculatePixelFee(1);
        require(msg.value >= requiredFee, "Insufficient fee");
        
        pixels[pixelId] = Pixel({
            owner: msg.sender,
            color: color,
            lastModified: block.timestamp
        });
        
        _distributeFees(requiredFee);
        
        if (msg.value > requiredFee) {
            (bool success,) = payable(msg.sender).call{value: msg.value - requiredFee}("");
            require(success, "Refund failed");
        }
        
        emit PixelPlaced(pixelId, msg.sender, color, requiredFee, block.timestamp);
    }
    
    function placePixelsBatch(uint256[] calldata pixelIds, uint32[] calldata colors) external payable nonReentrant {
        require(pixelIds.length == colors.length, "Arrays length mismatch");
        require(pixelIds.length > 0, "Empty arrays");
        require(pixelIds.length <= 100, "Batch too large");
        
        uint256 requiredFee = calculatePixelFee(pixelIds.length);
        require(msg.value >= requiredFee, "Insufficient fee");
        
        for (uint256 i = 0; i < pixelIds.length; i++) {
            require(pixelIds[i] < TOTAL_PIXELS, "Invalid pixel ID");
            
            pixels[pixelIds[i]] = Pixel({
                owner: msg.sender,
                color: colors[i],
                lastModified: block.timestamp
            });
        }
        
        _distributeFees(requiredFee);
        
        if (msg.value > requiredFee) {
            (bool success,) = payable(msg.sender).call{value: msg.value - requiredFee}("");
            require(success, "Refund failed");
        }
        
        emit BatchPixelsPlaced(msg.sender, pixelIds, colors, requiredFee, block.timestamp);
    }
    
    function _distributeFees(uint256 totalFee) internal {
        uint256 toBurn = (totalFee * BURN_PERCENTAGE) / 100;
        uint256 toRecipient = totalFee - toBurn;
        
        (bool success,) = payable(recipient).call{value: toRecipient}("");
        require(success, "Transfer failed");
        
        emit FeesDistributed(toBurn, toRecipient);
    }
    
    function getPixel(uint256 pixelId) external view validPixelId(pixelId) returns (address pixelOwner, uint32 color, uint256 lastModified) {
        Pixel memory pixel = pixels[pixelId];
        return (pixel.owner, pixel.color, pixel.lastModified);
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