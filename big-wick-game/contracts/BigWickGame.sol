// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract BigWickGame {
    enum GameState { NotStarted, StartingPeriod, EndingPeriod, Ended }
    
    struct Game {
        uint256 gameId;
        uint256 startTime;
        uint256 endingPeriodStart;
        uint256 endTime;
        uint256 totalPot;
        uint256 treasuryFund;
        address winner;
        GameState state;
        uint256 candleEnd;
        bool finalized;
    }

    struct Player {
        uint256 totalBid;
        uint256 bidCount;
        uint256 lastBidTime;
        bool exists;
    }

    // Constants
    uint256 public constant STARTING_PERIOD = 2 days;
    uint256 public constant ENDING_PERIOD = 5 days;
    uint256 public constant WINNER_SHARE = 90; // 90%
    uint256 public constant TREASURY_SHARE = 10; // 10%
    
    // State variables
    address public owner;
    uint256 public currentGameId;
    mapping(uint256 => Game) public games;
    mapping(uint256 => mapping(address => Player)) public gamePlayers;
    mapping(uint256 => address[]) public gamePlayerList;
    mapping(address => uint256) public pendingWithdrawals;
    
    // Events
    event GameStarted(uint256 indexed gameId, uint256 startTime, uint256 endingPeriodStart, uint256 endTime);
    event BidPlaced(uint256 indexed gameId, address indexed player, uint256 amount, uint256 totalBid);
    event GameEnded(uint256 indexed gameId, address indexed winner, uint256 prizeAmount, uint256 treasuryAmount);
    event CandleEndDetermined(uint256 indexed gameId, uint256 candleEnd);
    event WithdrawalReady(address indexed player, uint256 amount);
    
    // Modifiers
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    modifier gameExists(uint256 gameId) {
        require(games[gameId].gameId == gameId, "Game does not exist");
        _;
    }
    
    modifier gameInProgress(uint256 gameId) {
        require(games[gameId].state == GameState.StartingPeriod || games[gameId].state == GameState.EndingPeriod, "Game not in progress");
        _;
    }
    
    constructor() {
        owner = msg.sender;
        currentGameId = 0;
    }
    
    function startNewGame() external onlyOwner returns (uint256) {
        require(currentGameId == 0 || games[currentGameId].state == GameState.Ended, "Current game must be ended");
        
        currentGameId++;
        uint256 startTime = block.timestamp;
        uint256 endingPeriodStart = startTime + STARTING_PERIOD;
        uint256 endTime = endingPeriodStart + ENDING_PERIOD;
        
        games[currentGameId] = Game({
            gameId: currentGameId,
            startTime: startTime,
            endingPeriodStart: endingPeriodStart,
            endTime: endTime,
            totalPot: 0,
            treasuryFund: 0,
            winner: address(0),
            state: GameState.StartingPeriod,
            candleEnd: 0,
            finalized: false
        });
        
        emit GameStarted(currentGameId, startTime, endingPeriodStart, endTime);
        return currentGameId;
    }
    
    function placeBid(uint256 gameId) external payable gameExists(gameId) gameInProgress(gameId) {
        require(msg.value > 0, "Bid amount must be greater than 0");
        require(block.timestamp < games[gameId].endTime, "Game has ended");
        
        Game storage game = games[gameId];
        Player storage player = gamePlayers[gameId][msg.sender];
        
        // Update game state based on time
        if (block.timestamp >= game.endingPeriodStart && game.state == GameState.StartingPeriod) {
            game.state = GameState.EndingPeriod;
        }
        
        // Add new player if not exists
        if (!player.exists) {
            player.exists = true;
            gamePlayerList[gameId].push(msg.sender);
        }
        
        // Update player bid
        player.totalBid += msg.value;
        player.bidCount++;
        player.lastBidTime = block.timestamp;
        
        // Update game pot
        game.totalPot += msg.value;
        
        emit BidPlaced(gameId, msg.sender, msg.value, player.totalBid);
    }
    
    function endGame(uint256 gameId) external gameExists(gameId) {
        Game storage game = games[gameId];
        require(block.timestamp >= game.endTime, "Game has not ended yet");
        require(game.state != GameState.Ended, "Game already ended");
        require(!game.finalized, "Game already finalized");
        
        // Determine candle end using pseudo-randomness
        // In production, this should use VRF for true randomness
        uint256 candleEnd = game.endingPeriodStart + 
            (uint256(keccak256(abi.encodePacked(block.timestamp, block.prevrandao, gameId))) % ENDING_PERIOD);
        
        game.candleEnd = candleEnd;
        game.state = GameState.Ended;
        
        emit CandleEndDetermined(gameId, candleEnd);
        
        // Determine winner - player with highest bid at candle end
        address winner = determineWinner(gameId, candleEnd);
        
        if (winner != address(0)) {
            game.winner = winner;
            
            // Calculate prize distribution
            uint256 winnerPrize = (game.totalPot * WINNER_SHARE) / 100;
            uint256 treasuryAmount = game.totalPot - winnerPrize;
            
            game.treasuryFund = treasuryAmount;
            
            // Make prize available for withdrawal
            pendingWithdrawals[winner] += winnerPrize;
            
            emit GameEnded(gameId, winner, winnerPrize, treasuryAmount);
            emit WithdrawalReady(winner, winnerPrize);
        }
        
        game.finalized = true;
    }
    
    function determineWinner(uint256 gameId, uint256 candleEnd) internal view returns (address) {
        address[] memory playerList = gamePlayerList[gameId];
        address currentWinner = address(0);
        uint256 highestBid = 0;
        
        for (uint256 i = 0; i < playerList.length; i++) {
            address player = playerList[i];
            Player memory playerData = gamePlayers[gameId][player];
            
            // Only consider bids placed before candle end
            if (playerData.lastBidTime <= candleEnd && playerData.totalBid > highestBid) {
                highestBid = playerData.totalBid;
                currentWinner = player;
            }
        }
        
        return currentWinner;
    }
    
    function getGameState(uint256 gameId) external view returns (GameState) {
        if (games[gameId].gameId == 0) return GameState.NotStarted;
        
        Game memory game = games[gameId];
        if (block.timestamp >= game.endTime) return GameState.Ended;
        if (block.timestamp >= game.endingPeriodStart) return GameState.EndingPeriod;
        return GameState.StartingPeriod;
    }
    
    function getPlayerBid(uint256 gameId, address player) external view returns (uint256, uint256, uint256) {
        Player memory playerData = gamePlayers[gameId][player];
        return (playerData.totalBid, playerData.bidCount, playerData.lastBidTime);
    }
    
    function getGamePlayers(uint256 gameId) external view returns (address[] memory) {
        return gamePlayerList[gameId];
    }
    
    function getGamePlayerCount(uint256 gameId) external view returns (uint256) {
        return gamePlayerList[gameId].length;
    }
    
    function withdraw() external {
        uint256 amount = pendingWithdrawals[msg.sender];
        require(amount > 0, "No funds to withdraw");
        
        pendingWithdrawals[msg.sender] = 0;
        
        (bool success, ) = payable(msg.sender).call{value: amount}("");
        require(success, "Transfer failed");
    }
    
    function withdrawTreasury() external onlyOwner {
        uint256 totalTreasury = 0;
        
        // Calculate total treasury from all ended games
        for (uint256 i = 1; i <= currentGameId; i++) {
            if (games[i].finalized) {
                totalTreasury += games[i].treasuryFund;
                games[i].treasuryFund = 0;
            }
        }
        
        require(totalTreasury > 0, "No treasury funds to withdraw");
        
        (bool success, ) = payable(owner).call{value: totalTreasury}("");
        require(success, "Transfer failed");
    }
    
    // Emergency function to end game if needed
    function emergencyEndGame(uint256 gameId) external onlyOwner gameExists(gameId) {
        Game storage game = games[gameId];
        require(game.state != GameState.Ended, "Game already ended");
        
        game.state = GameState.Ended;
        game.finalized = true;
        
        // Refund all players proportionally
        address[] memory playerList = gamePlayerList[gameId];
        
        for (uint256 i = 0; i < playerList.length; i++) {
            address player = playerList[i];
            uint256 playerBid = gamePlayers[gameId][player].totalBid;
            
            if (playerBid > 0) {
                pendingWithdrawals[player] += playerBid;
                emit WithdrawalReady(player, playerBid);
            }
        }
        
        emit GameEnded(gameId, address(0), 0, 0);
    }
}