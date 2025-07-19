// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract PvPGridEnhanced {
    // Game configuration
    uint256 public constant GRID_SIZE = 16;
    uint256 public entryFee;
    uint256 public gameFee; // Basis points (1000 = 10%)
    uint256 public minPlayers = 2; // Minimum players to start a game
    
    // Game state
    struct Game {
        address[GRID_SIZE] grid;
        mapping(address => uint256) playerTileCount;
        uint256 tilesSelected;
        uint256 prizePool;
        uint256 finalSelectionBlock;
        uint256 startTime;
        bool winnerDetermined;
        address winner;
    }
    
    mapping(uint256 => Game) public games;
    uint256 public currentGameId;
    
    // Player stats
    mapping(address => uint256) public playerWins;
    mapping(address => uint256) public playerGamesPlayed;
    
    // Admin
    address public owner;
    address public teamWallet; // Separate wallet for team/developer fees
    bool public paused;
    
    // Reentrancy guard
    uint256 private constant _NOT_ENTERED = 1;
    uint256 private constant _ENTERED = 2;
    uint256 private _status;
    
    // Events
    event TileSelected(uint256 indexed gameId, address indexed player, uint256 tileIndex);
    event GameCompleted(uint256 indexed gameId, address indexed winner, uint256 prize);
    event NewGameStarted(uint256 indexed gameId, uint256 entryFee);
    event GameRefunded(uint256 indexed gameId, string reason);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }
    
    modifier whenNotPaused() {
        require(!paused, "Contract paused");
        _;
    }
    
    modifier nonReentrant() {
        require(_status != _ENTERED, "ReentrancyGuard: reentrant call");
        _status = _ENTERED;
        _;
        _status = _NOT_ENTERED;
    }
    
    constructor(uint256 _entryFee, uint256 _gameFee, address _teamWallet) {
        owner = msg.sender;
        teamWallet = _teamWallet;
        entryFee = _entryFee;
        gameFee = _gameFee;
        require(_gameFee <= 2000, "Fee too high"); // Max 20%
        require(_teamWallet != address(0), "Invalid team wallet");
        _status = _NOT_ENTERED;
        _startNewGame();
    }
    
    function selectTile(uint256 tileIndex) external payable whenNotPaused nonReentrant {
        require(msg.value == entryFee, "Incorrect entry fee");
        require(tileIndex < GRID_SIZE, "Invalid tile index");
        
        Game storage game = games[currentGameId];
        require(game.grid[tileIndex] == address(0), "Tile already selected");
        require(!game.winnerDetermined, "Game already finished");
        
        // Prevent same player from taking too many tiles
        require(game.playerTileCount[msg.sender] < GRID_SIZE / 2, "Too many tiles per player");
        
        // Record the selection
        game.grid[tileIndex] = msg.sender;
        game.playerTileCount[msg.sender]++;
        game.tilesSelected++;
        game.prizePool += msg.value;
        
        // Update player stats
        if (game.playerTileCount[msg.sender] == 1) {
            playerGamesPlayed[msg.sender]++;
        }
        
        emit TileSelected(currentGameId, msg.sender, tileIndex);
        
        // Check if this was the last tile
        if (game.tilesSelected == GRID_SIZE) {
            game.finalSelectionBlock = block.number;
        }
    }
    
    function selectMultipleTiles(uint256[] calldata tileIndexes) external payable whenNotPaused nonReentrant {
        require(msg.value == entryFee * tileIndexes.length, "Incorrect total fee");
        require(tileIndexes.length > 0 && tileIndexes.length <= 4, "Invalid number of tiles");
        
        Game storage game = games[currentGameId];
        require(game.playerTileCount[msg.sender] + tileIndexes.length <= GRID_SIZE / 2, "Too many tiles per player");
        
        for (uint256 i = 0; i < tileIndexes.length; i++) {
            require(tileIndexes[i] < GRID_SIZE, "Invalid tile index");
            require(game.grid[tileIndexes[i]] == address(0), "Tile already selected");
            
            game.grid[tileIndexes[i]] = msg.sender;
            emit TileSelected(currentGameId, msg.sender, tileIndexes[i]);
        }
        
        game.playerTileCount[msg.sender] += tileIndexes.length;
        game.tilesSelected += tileIndexes.length;
        game.prizePool += msg.value;
        
        if (game.playerTileCount[msg.sender] == tileIndexes.length) {
            playerGamesPlayed[msg.sender]++;
        }
        
        if (game.tilesSelected == GRID_SIZE) {
            game.finalSelectionBlock = block.number;
        }
    }
    
    function determineWinner() external nonReentrant {
        Game storage game = games[currentGameId];
        require(game.tilesSelected == GRID_SIZE, "Game not complete");
        require(!game.winnerDetermined, "Winner already determined");
        require(block.number > game.finalSelectionBlock, "Wait for next block");
        require(block.number <= game.finalSelectionBlock + 255, "Too late to determine winner");
        
        // Check if minimum players requirement is met
        uint256 uniquePlayers = _countUniquePlayers(currentGameId);
        if (uniquePlayers < minPlayers) {
            _refundGame(currentGameId, "Not enough players");
            return;
        }
        
        // Generate random number using future block hash
        uint256 randomHash = uint256(blockhash(game.finalSelectionBlock + 1));
        uint256 winningTile = randomHash % GRID_SIZE;
        
        game.winner = game.grid[winningTile];
        game.winnerDetermined = true;
        playerWins[game.winner]++;
        
        // Calculate prize distribution
        uint256 platformFee = (game.prizePool * gameFee) / 10000;
        uint256 winnerPrize = game.prizePool - platformFee;
        
        // Transfer winnings
        if (platformFee > 0) {
            (bool feeSuccess, ) = teamWallet.call{value: platformFee}("");
            require(feeSuccess, "Fee transfer failed");
        }
        
        (bool prizeSuccess, ) = game.winner.call{value: winnerPrize}("");
        require(prizeSuccess, "Prize transfer failed");
        
        emit GameCompleted(currentGameId, game.winner, winnerPrize);
        
        // Start new game
        _startNewGame();
    }
    
    function emergencyDetermineWinner() external onlyOwner nonReentrant {
        Game storage game = games[currentGameId];
        require(game.tilesSelected == GRID_SIZE, "Game not complete");
        require(!game.winnerDetermined, "Winner already determined");
        require(block.number > game.finalSelectionBlock + 255, "Use normal determination");
        
        // Use a combination of block data for emergency randomness
        uint256 emergencyRandom = uint256(keccak256(abi.encodePacked(
            block.timestamp,
            block.prevrandao,
            currentGameId
        )));
        uint256 winningTile = emergencyRandom % GRID_SIZE;
        
        game.winner = game.grid[winningTile];
        game.winnerDetermined = true;
        playerWins[game.winner]++;
        
        uint256 platformFee = (game.prizePool * gameFee) / 10000;
        uint256 winnerPrize = game.prizePool - platformFee;
        
        if (platformFee > 0) {
            (bool feeSuccess, ) = owner.call{value: platformFee}("");
            require(feeSuccess, "Fee transfer failed");
        }
        
        (bool prizeSuccess, ) = game.winner.call{value: winnerPrize}("");
        require(prizeSuccess, "Prize transfer failed");
        
        emit GameCompleted(currentGameId, game.winner, winnerPrize);
        _startNewGame();
    }
    
    function _refundGame(uint256 gameId, string memory reason) private {
        Game storage game = games[gameId];
        
        // Refund all players
        for (uint256 i = 0; i < GRID_SIZE; i++) {
            if (game.grid[i] != address(0)) {
                uint256 refundAmount = entryFee * game.playerTileCount[game.grid[i]];
                game.playerTileCount[game.grid[i]] = 0;
                
                (bool success, ) = game.grid[i].call{value: refundAmount}("");
                require(success, "Refund failed");
            }
        }
        
        game.winnerDetermined = true; // Mark as complete
        emit GameRefunded(gameId, reason);
        _startNewGame();
    }
    
    function _countUniquePlayers(uint256 gameId) private view returns (uint256) {
        Game storage game = games[gameId];
        address[] memory players = new address[](GRID_SIZE);
        uint256 count = 0;
        
        for (uint256 i = 0; i < GRID_SIZE; i++) {
            address player = game.grid[i];
            if (player != address(0)) {
                bool found = false;
                for (uint256 j = 0; j < count; j++) {
                    if (players[j] == player) {
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    players[count] = player;
                    count++;
                }
            }
        }
        
        return count;
    }
    
    function _startNewGame() private {
        currentGameId++;
        Game storage newGame = games[currentGameId];
        newGame.startTime = block.timestamp;
        
        emit NewGameStarted(currentGameId, entryFee);
    }
    
    // Admin functions
    function setPaused(bool _paused) external onlyOwner {
        paused = _paused;
    }
    
    function updateEntryFee(uint256 _newFee) external onlyOwner {
        require(games[currentGameId].tilesSelected == 0, "Game in progress");
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
    
    function updateMinPlayers(uint256 _minPlayers) external onlyOwner {
        require(_minPlayers >= 2 && _minPlayers <= GRID_SIZE, "Invalid min players");
        minPlayers = _minPlayers;
    }
    
    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "Invalid address");
        owner = newOwner;
    }
    
    // View functions
    function getGrid(uint256 gameId) external view returns (address[GRID_SIZE] memory) {
        return games[gameId].grid;
    }
    
    function getCurrentGrid() external view returns (address[GRID_SIZE] memory) {
        return games[currentGameId].grid;
    }
    
    function getAvailableTiles() external view returns (uint256[] memory) {
        Game storage game = games[currentGameId];
        uint256[] memory available = new uint256[](GRID_SIZE - game.tilesSelected);
        uint256 index = 0;
        
        for (uint256 i = 0; i < GRID_SIZE; i++) {
            if (game.grid[i] == address(0)) {
                available[index] = i;
                index++;
            }
        }
        
        return available;
    }
    
    function getPlayerTileCount(address player) external view returns (uint256) {
        return games[currentGameId].playerTileCount[player];
    }
    
    function getGameInfo(uint256 gameId) external view returns (
        uint256 tilesSelected,
        uint256 prizePool,
        bool isComplete,
        bool winnerDetermined,
        address winner
    ) {
        Game storage game = games[gameId];
        return (
            game.tilesSelected,
            game.prizePool,
            game.tilesSelected == GRID_SIZE,
            game.winnerDetermined,
            game.winner
        );
    }
}