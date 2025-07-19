// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract PvPGrid {
    // Game configuration
    uint256 public constant GRID_SIZE = 16; // 4x4 grid
    uint256 public entryFee;
    uint256 public gameFee; // Platform fee percentage (basis points, e.g., 1000 = 10%)
    
    // Game state
    address[GRID_SIZE] public grid;
    uint256 public tilesSelected;
    uint256 public currentGameId;
    uint256 public prizePool;
    
    // Randomness state
    uint256 public finalSelectionBlock;
    bool public winnerDetermined;
    address public winner;
    
    // Admin
    address public owner;
    address public teamWallet; // Separate wallet for team/developer fees
    
    // Events
    event TileSelected(uint256 indexed gameId, address indexed player, uint256 tileIndex);
    event GameCompleted(uint256 indexed gameId, address indexed winner, uint256 prize);
    event NewGameStarted(uint256 indexed gameId, uint256 entryFee);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }
    
    constructor(uint256 _entryFee, uint256 _gameFee, address _teamWallet) {
        owner = msg.sender;
        teamWallet = _teamWallet;
        entryFee = _entryFee;
        gameFee = _gameFee;
        require(_gameFee <= 2000, "Fee too high"); // Max 20%
        require(_teamWallet != address(0), "Invalid team wallet");
        _startNewGame();
    }
    
    function selectTile(uint256 tileIndex) external payable {
        require(msg.value == entryFee, "Incorrect entry fee");
        require(tileIndex < GRID_SIZE, "Invalid tile index");
        require(grid[tileIndex] == address(0), "Tile already selected");
        require(!winnerDetermined, "Game already finished");
        
        // Record the selection
        grid[tileIndex] = msg.sender;
        tilesSelected++;
        prizePool += msg.value;
        
        emit TileSelected(currentGameId, msg.sender, tileIndex);
        
        // Check if this was the last tile
        if (tilesSelected == GRID_SIZE) {
            // Record the block number for randomness
            finalSelectionBlock = block.number;
        }
    }
    
    function determineWinner() external {
        require(tilesSelected == GRID_SIZE, "Game not complete");
        require(!winnerDetermined, "Winner already determined");
        require(block.number > finalSelectionBlock, "Wait for next block");
        require(block.number <= finalSelectionBlock + 255, "Too late to determine winner");
        
        // Generate random number using future block hash
        uint256 randomHash = uint256(blockhash(finalSelectionBlock + 1));
        uint256 winningTile = randomHash % GRID_SIZE;
        
        winner = grid[winningTile];
        winnerDetermined = true;
        
        // Calculate prize distribution
        uint256 platformFee = (prizePool * gameFee) / 10000;
        uint256 winnerPrize = prizePool - platformFee;
        
        // Transfer winnings
        if (platformFee > 0) {
            (bool feeSuccess, ) = teamWallet.call{value: platformFee}("");
            require(feeSuccess, "Fee transfer failed");
        }
        
        (bool prizeSuccess, ) = winner.call{value: winnerPrize}("");
        require(prizeSuccess, "Prize transfer failed");
        
        emit GameCompleted(currentGameId, winner, winnerPrize);
        
        // Start new game
        _startNewGame();
    }
    
    function _startNewGame() private {
        currentGameId++;
        tilesSelected = 0;
        winnerDetermined = false;
        winner = address(0);
        finalSelectionBlock = 0;
        prizePool = 0;
        
        // Clear the grid
        for (uint256 i = 0; i < GRID_SIZE; i++) {
            grid[i] = address(0);
        }
        
        emit NewGameStarted(currentGameId, entryFee);
    }
    
    // Admin functions
    function updateEntryFee(uint256 _newFee) external onlyOwner {
        require(tilesSelected == 0, "Game in progress");
        entryFee = _newFee;
    }
    
    function updateGameFee(uint256 _newFee) external onlyOwner {
        require(_newFee <= 2000, "Fee too high"); // Max 20%
        gameFee = _newFee;
    }
    
    function updateTeamWallet(address _newWallet) external onlyOwner {
        require(_newWallet != address(0), "Invalid wallet");
        teamWallet = _newWallet;
    }
    
    // View functions
    function getGrid() external view returns (address[GRID_SIZE] memory) {
        return grid;
    }
    
    function getTileOwner(uint256 tileIndex) external view returns (address) {
        require(tileIndex < GRID_SIZE, "Invalid tile index");
        return grid[tileIndex];
    }
    
    function isGameComplete() external view returns (bool) {
        return tilesSelected == GRID_SIZE;
    }
    
    function canDetermineWinner() external view returns (bool) {
        return tilesSelected == GRID_SIZE && 
               !winnerDetermined && 
               block.number > finalSelectionBlock &&
               block.number <= finalSelectionBlock + 255;
    }
}