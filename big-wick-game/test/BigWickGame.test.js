const { expect } = require("chai");
const { ethers } = require("hardhat");
const { time } = require("@nomicfoundation/hardhat-network-helpers");

describe("BigWickGame", function () {
  let BigWickGame, bigWickGame, owner, player1, player2, player3;
  
  const STARTING_PERIOD = 2 * 24 * 60 * 60; // 2 days in seconds
  const ENDING_PERIOD = 5 * 24 * 60 * 60; // 5 days in seconds
  
  beforeEach(async function () {
    [owner, player1, player2, player3] = await ethers.getSigners();
    
    BigWickGame = await ethers.getContractFactory("BigWickGame");
    bigWickGame = await BigWickGame.deploy();
    await bigWickGame.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should set the correct owner", async function () {
      expect(await bigWickGame.owner()).to.equal(owner.address);
    });

    it("Should initialize currentGameId to 0", async function () {
      expect(await bigWickGame.currentGameId()).to.equal(0);
    });

    it("Should have correct constants", async function () {
      expect(await bigWickGame.STARTING_PERIOD()).to.equal(STARTING_PERIOD);
      expect(await bigWickGame.ENDING_PERIOD()).to.equal(ENDING_PERIOD);
      expect(await bigWickGame.WINNER_SHARE()).to.equal(90);
      expect(await bigWickGame.TREASURY_SHARE()).to.equal(10);
    });
  });

  describe("Game Management", function () {
    it("Should allow owner to start a new game", async function () {
      const tx = await bigWickGame.startNewGame();
      const receipt = await tx.wait();
      
      expect(await bigWickGame.currentGameId()).to.equal(1);
      
      // Check event emission
      const event = receipt.logs.find(log => 
        log.fragment && log.fragment.name === 'GameStarted'
      );
      expect(event).to.not.be.undefined;
      expect(event.args.gameId).to.equal(1);
    });

    it("Should not allow non-owner to start a game", async function () {
      await expect(
        bigWickGame.connect(player1).startNewGame()
      ).to.be.revertedWith("Only owner can call this function");
    });

    it("Should not allow starting new game while current game is in progress", async function () {
      await bigWickGame.startNewGame();
      
      await expect(
        bigWickGame.startNewGame()
      ).to.be.revertedWith("Current game must be ended");
    });

    it("Should set correct game parameters", async function () {
      const startTime = await time.latest();
      await bigWickGame.startNewGame();
      
      const game = await bigWickGame.games(1);
      expect(game.gameId).to.equal(1);
      expect(game.startTime).to.be.closeTo(startTime, 2);
      expect(game.endingPeriodStart).to.equal(game.startTime + BigInt(STARTING_PERIOD));
      expect(game.endTime).to.equal(game.endingPeriodStart + BigInt(ENDING_PERIOD));
      expect(game.totalPot).to.equal(0);
      expect(game.state).to.equal(1); // StartingPeriod
    });
  });

  describe("Bidding System", function () {
    beforeEach(async function () {
      await bigWickGame.startNewGame();
    });

    it("Should allow players to place bids", async function () {
      const bidAmount = ethers.parseEther("1.0");
      
      const tx = await bigWickGame.connect(player1).placeBid(1, { value: bidAmount });
      const receipt = await tx.wait();
      
      const [totalBid, bidCount, lastBidTime] = await bigWickGame.getPlayerBid(1, player1.address);
      expect(totalBid).to.equal(bidAmount);
      expect(bidCount).to.equal(1);
      
      // Check event emission
      const event = receipt.logs.find(log => 
        log.fragment && log.fragment.name === 'BidPlaced'
      );
      expect(event).to.not.be.undefined;
      expect(event.args.gameId).to.equal(1);
      expect(event.args.player).to.equal(player1.address);
      expect(event.args.amount).to.equal(bidAmount);
      expect(event.args.totalBid).to.equal(bidAmount);
    });

    it("Should accumulate bids from same player", async function () {
      const bidAmount1 = ethers.parseEther("1.0");
      const bidAmount2 = ethers.parseEther("2.0");
      
      await bigWickGame.connect(player1).placeBid(1, { value: bidAmount1 });
      await bigWickGame.connect(player1).placeBid(1, { value: bidAmount2 });
      
      const [totalBid, bidCount] = await bigWickGame.getPlayerBid(1, player1.address);
      expect(totalBid).to.equal(bidAmount1 + bidAmount2);
      expect(bidCount).to.equal(2);
    });

    it("Should not allow bids with zero value", async function () {
      await expect(
        bigWickGame.connect(player1).placeBid(1, { value: 0 })
      ).to.be.revertedWith("Bid amount must be greater than 0");
    });

    it("Should not allow bids on non-existent game", async function () {
      await expect(
        bigWickGame.connect(player1).placeBid(999, { value: ethers.parseEther("1.0") })
      ).to.be.revertedWith("Game does not exist");
    });

    it("Should update game total pot", async function () {
      const bidAmount1 = ethers.parseEther("1.0");
      const bidAmount2 = ethers.parseEther("2.0");
      
      await bigWickGame.connect(player1).placeBid(1, { value: bidAmount1 });
      await bigWickGame.connect(player2).placeBid(1, { value: bidAmount2 });
      
      const game = await bigWickGame.games(1);
      expect(game.totalPot).to.equal(bidAmount1 + bidAmount2);
    });

    it("Should track multiple players", async function () {
      await bigWickGame.connect(player1).placeBid(1, { value: ethers.parseEther("1.0") });
      await bigWickGame.connect(player2).placeBid(1, { value: ethers.parseEther("2.0") });
      await bigWickGame.connect(player3).placeBid(1, { value: ethers.parseEther("3.0") });
      
      const players = await bigWickGame.getGamePlayers(1);
      expect(players.length).to.equal(3);
      expect(players).to.include(player1.address);
      expect(players).to.include(player2.address);
      expect(players).to.include(player3.address);
    });
  });

  describe("Game State Management", function () {
    beforeEach(async function () {
      await bigWickGame.startNewGame();
    });

    it("Should correctly transition from StartingPeriod to EndingPeriod", async function () {
      // Initially in StartingPeriod
      expect(await bigWickGame.getGameState(1)).to.equal(1); // StartingPeriod
      
      // Advance time to ending period
      await time.increase(STARTING_PERIOD + 1);
      
      // State should now be EndingPeriod
      expect(await bigWickGame.getGameState(1)).to.equal(2); // EndingPeriod
    });

    it("Should transition to Ended state after full game duration", async function () {
      // Advance time past game end
      await time.increase(STARTING_PERIOD + ENDING_PERIOD + 1);
      
      expect(await bigWickGame.getGameState(1)).to.equal(3); // Ended
    });

    it("Should update game state when placing bid in ending period", async function () {
      // Advance to ending period
      await time.increase(STARTING_PERIOD + 1);
      
      await bigWickGame.connect(player1).placeBid(1, { value: ethers.parseEther("1.0") });
      
      const game = await bigWickGame.games(1);
      expect(game.state).to.equal(2); // EndingPeriod
    });
  });

  describe("Game Ending and Winner Selection", function () {
    beforeEach(async function () {
      await bigWickGame.startNewGame();
    });

    it("Should not allow ending game before end time", async function () {
      await expect(
        bigWickGame.endGame(1)
      ).to.be.revertedWith("Game has not ended yet");
    });

    it("Should allow ending game after end time", async function () {
      // Place some bids
      await bigWickGame.connect(player1).placeBid(1, { value: ethers.parseEther("1.0") });
      await bigWickGame.connect(player2).placeBid(1, { value: ethers.parseEther("2.0") });
      
      // Advance time past game end
      await time.increase(STARTING_PERIOD + ENDING_PERIOD + 1);
      
      await expect(bigWickGame.endGame(1)).to.not.be.reverted;
    });

    it("Should determine winner correctly", async function () {
      // Place bids in starting period
      await bigWickGame.connect(player1).placeBid(1, { value: ethers.parseEther("1.0") });
      await bigWickGame.connect(player2).placeBid(1, { value: ethers.parseEther("2.0") });
      
      // Advance to ending period
      await time.increase(STARTING_PERIOD + 1);
      
      // Place bid in ending period
      await bigWickGame.connect(player3).placeBid(1, { value: ethers.parseEther("3.0") });
      
      // End game
      await time.increase(ENDING_PERIOD + 1);
      await bigWickGame.endGame(1);
      
      const game = await bigWickGame.games(1);
      // Winner should be determined based on candle end time
      expect(game.winner).to.not.equal(ethers.ZeroAddress);
      expect(game.state).to.equal(3); // Ended
      expect(game.finalized).to.be.true;
    });

    it("Should distribute prize correctly (90% to winner, 10% to treasury)", async function () {
      const bidAmount = ethers.parseEther("10.0");
      
      await bigWickGame.connect(player1).placeBid(1, { value: bidAmount });
      
      // End game
      await time.increase(STARTING_PERIOD + ENDING_PERIOD + 1);
      await bigWickGame.endGame(1);
      
      const game = await bigWickGame.games(1);
      expect(game.treasuryFund).to.equal(bidAmount * BigInt(10) / BigInt(100));
      
      // Check winner has funds available for withdrawal
      const expectedPrize = bidAmount * BigInt(90) / BigInt(100);
      expect(await bigWickGame.pendingWithdrawals(player1.address)).to.equal(expectedPrize);
    });

    it("Should emit GameEnded event", async function () {
      await bigWickGame.connect(player1).placeBid(1, { value: ethers.parseEther("1.0") });
      
      await time.increase(STARTING_PERIOD + ENDING_PERIOD + 1);
      
      const tx = await bigWickGame.endGame(1);
      const receipt = await tx.wait();
      
      const event = receipt.logs.find(log => 
        log.fragment && log.fragment.name === 'GameEnded'
      );
      expect(event).to.not.be.undefined;
      expect(event.args.gameId).to.equal(1);
    });
  });

  describe("Withdrawal System", function () {
    beforeEach(async function () {
      await bigWickGame.startNewGame();
    });

    it("Should allow winner to withdraw prize", async function () {
      const bidAmount = ethers.parseEther("10.0");
      
      await bigWickGame.connect(player1).placeBid(1, { value: bidAmount });
      
      // End game
      await time.increase(STARTING_PERIOD + ENDING_PERIOD + 1);
      await bigWickGame.endGame(1);
      
      const initialBalance = await ethers.provider.getBalance(player1.address);
      
      const tx = await bigWickGame.connect(player1).withdraw();
      const receipt = await tx.wait();
      const gasUsed = receipt.gasUsed * receipt.gasPrice;
      
      const finalBalance = await ethers.provider.getBalance(player1.address);
      const expectedPrize = bidAmount * BigInt(90) / BigInt(100);
      
      expect(finalBalance).to.be.closeTo(initialBalance + expectedPrize - gasUsed, ethers.parseEther("0.01"));
      expect(await bigWickGame.pendingWithdrawals(player1.address)).to.equal(0);
    });

    it("Should not allow withdrawal when no funds pending", async function () {
      await expect(
        bigWickGame.connect(player1).withdraw()
      ).to.be.revertedWith("No funds to withdraw");
    });
  });

  describe("Treasury Management", function () {
    beforeEach(async function () {
      await bigWickGame.startNewGame();
    });

    it("Should allow owner to withdraw treasury funds", async function () {
      const bidAmount = ethers.parseEther("10.0");
      
      await bigWickGame.connect(player1).placeBid(1, { value: bidAmount });
      
      // End game
      await time.increase(STARTING_PERIOD + ENDING_PERIOD + 1);
      await bigWickGame.endGame(1);
      
      const initialBalance = await ethers.provider.getBalance(owner.address);
      
      const tx = await bigWickGame.withdrawTreasury();
      const receipt = await tx.wait();
      const gasUsed = receipt.gasUsed * receipt.gasPrice;
      
      const finalBalance = await ethers.provider.getBalance(owner.address);
      const expectedTreasury = bidAmount * BigInt(10) / BigInt(100);
      
      expect(finalBalance).to.be.closeTo(initialBalance + expectedTreasury - gasUsed, ethers.parseEther("0.01"));
    });

    it("Should not allow non-owner to withdraw treasury", async function () {
      await expect(
        bigWickGame.connect(player1).withdrawTreasury()
      ).to.be.revertedWith("Only owner can call this function");
    });

    it("Should not allow withdrawal when no treasury funds", async function () {
      await expect(
        bigWickGame.withdrawTreasury()
      ).to.be.revertedWith("No treasury funds to withdraw");
    });
  });

  describe("Emergency Functions", function () {
    beforeEach(async function () {
      await bigWickGame.startNewGame();
    });

    it("Should allow owner to emergency end game", async function () {
      await bigWickGame.connect(player1).placeBid(1, { value: ethers.parseEther("1.0") });
      await bigWickGame.connect(player2).placeBid(1, { value: ethers.parseEther("2.0") });
      
      await expect(bigWickGame.emergencyEndGame(1)).to.not.be.reverted;
      
      const game = await bigWickGame.games(1);
      expect(game.state).to.equal(3); // Ended
      expect(game.finalized).to.be.true;
    });

    it("Should not allow non-owner to emergency end game", async function () {
      await expect(
        bigWickGame.connect(player1).emergencyEndGame(1)
      ).to.be.revertedWith("Only owner can call this function");
    });
  });

  describe("View Functions", function () {
    beforeEach(async function () {
      await bigWickGame.startNewGame();
    });

    it("Should return correct player bid information", async function () {
      const bidAmount = ethers.parseEther("1.5");
      
      await bigWickGame.connect(player1).placeBid(1, { value: bidAmount });
      
      const [totalBid, bidCount, lastBidTime] = await bigWickGame.getPlayerBid(1, player1.address);
      expect(totalBid).to.equal(bidAmount);
      expect(bidCount).to.equal(1);
      expect(lastBidTime).to.be.greaterThan(0);
    });

    it("Should return correct game player count", async function () {
      await bigWickGame.connect(player1).placeBid(1, { value: ethers.parseEther("1.0") });
      await bigWickGame.connect(player2).placeBid(1, { value: ethers.parseEther("2.0") });
      
      expect(await bigWickGame.getGamePlayerCount(1)).to.equal(2);
    });
  });
});