const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("PvPGrid", function () {
  let pvpGrid;
  let owner;
  let player1, player2, player3, player4;
  let teamWallet;
  const entryFee = ethers.parseEther("1"); // 1 PAS
  const gameFee = 1000; // 10%

  beforeEach(async function () {
    [owner, player1, player2, player3, player4, teamWallet] = await ethers.getSigners();
    
    const PvPGrid = await ethers.getContractFactory("PvPGrid");
    pvpGrid = await PvPGrid.deploy(entryFee, gameFee, teamWallet.address);
    await pvpGrid.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await pvpGrid.owner()).to.equal(owner.address);
    });

    it("Should set the correct entry fee", async function () {
      expect(await pvpGrid.entryFee()).to.equal(entryFee);
    });

    it("Should set the correct game fee", async function () {
      expect(await pvpGrid.gameFee()).to.equal(gameFee);
    });

    it("Should start with game ID 1", async function () {
      expect(await pvpGrid.currentGameId()).to.equal(1);
    });
  });

  describe("Tile Selection", function () {
    it("Should allow selecting an empty tile", async function () {
      await expect(pvpGrid.connect(player1).selectTile(0, { value: entryFee }))
        .to.emit(pvpGrid, "TileSelected")
        .withArgs(1, player1.address, 0);
      
      expect(await pvpGrid.getTileOwner(0)).to.equal(player1.address);
      expect(await pvpGrid.tilesSelected()).to.equal(1);
    });

    it("Should reject incorrect entry fee", async function () {
      await expect(
        pvpGrid.connect(player1).selectTile(0, { value: ethers.parseEther("0.5") })
      ).to.be.revertedWith("Incorrect entry fee");
    });

    it("Should reject selecting already taken tile", async function () {
      await pvpGrid.connect(player1).selectTile(0, { value: entryFee });
      
      await expect(
        pvpGrid.connect(player2).selectTile(0, { value: entryFee })
      ).to.be.revertedWith("Tile already selected");
    });

    it("Should reject invalid tile index", async function () {
      await expect(
        pvpGrid.connect(player1).selectTile(16, { value: entryFee })
      ).to.be.revertedWith("Invalid tile index");
    });
  });

  describe("Game Completion", function () {
    it("Should mark game complete when all tiles selected", async function () {
      // Fill the grid
      for (let i = 0; i < 16; i++) {
        const player = [player1, player2, player3, player4][i % 4];
        await pvpGrid.connect(player).selectTile(i, { value: entryFee });
      }

      expect(await pvpGrid.isGameComplete()).to.be.true;
      expect(await pvpGrid.tilesSelected()).to.equal(16);
    });

    it("Should record final selection block", async function () {
      // Fill all but last tile
      for (let i = 0; i < 15; i++) {
        const player = [player1, player2, player3, player4][i % 4];
        await pvpGrid.connect(player).selectTile(i, { value: entryFee });
      }

      expect(await pvpGrid.finalSelectionBlock()).to.equal(0);

      // Select last tile
      await pvpGrid.connect(player1).selectTile(15, { value: entryFee });
      
      expect(await pvpGrid.finalSelectionBlock()).to.be.gt(0);
    });
  });

  describe("Winner Determination", function () {
    beforeEach(async function () {
      // Fill the grid
      for (let i = 0; i < 16; i++) {
        const player = [player1, player2, player3, player4][i % 4];
        await pvpGrid.connect(player).selectTile(i, { value: entryFee });
      }
    });

    it("Should reject determining winner before next block", async function () {
      await expect(pvpGrid.determineWinner()).to.be.revertedWith("Wait for next block");
    });

    it("Should allow determining winner after next block", async function () {
      // Mine a block
      await ethers.provider.send("evm_mine", []);
      
      // Should work now
      await expect(pvpGrid.determineWinner())
        .to.emit(pvpGrid, "GameCompleted");
      
      expect(await pvpGrid.winnerDetermined()).to.be.true;
      expect(await pvpGrid.winner()).to.not.equal(ethers.ZeroAddress);
    });

    it("Should start new game after winner determined", async function () {
      await ethers.provider.send("evm_mine", []);
      
      const gameIdBefore = await pvpGrid.currentGameId();
      await pvpGrid.determineWinner();
      const gameIdAfter = await pvpGrid.currentGameId();
      
      expect(gameIdAfter).to.equal(gameIdBefore + 1n);
      expect(await pvpGrid.tilesSelected()).to.equal(0);
      expect(await pvpGrid.winnerDetermined()).to.be.false;
    });

    it("Should distribute prize correctly", async function () {
      await ethers.provider.send("evm_mine", []);
      
      const teamWalletBalanceBefore = await ethers.provider.getBalance(teamWallet.address);
      
      await pvpGrid.determineWinner();
      
      const winner = await pvpGrid.winner();
      const expectedPlatformFee = (entryFee * 16n * BigInt(gameFee)) / 10000n; // 1.6 PAS
      const expectedWinnerPrize = (entryFee * 16n) - expectedPlatformFee; // 14.4 PAS
      
      // Check platform fee was received by team wallet
      const teamWalletBalanceAfter = await ethers.provider.getBalance(teamWallet.address);
      expect(teamWalletBalanceAfter - teamWalletBalanceBefore).to.equal(expectedPlatformFee);
    });
  });

  describe("Admin Functions", function () {
    it("Should allow owner to update entry fee", async function () {
      const newFee = ethers.parseEther("2");
      await pvpGrid.updateEntryFee(newFee);
      expect(await pvpGrid.entryFee()).to.equal(newFee);
    });

    it("Should reject updating entry fee during game", async function () {
      await pvpGrid.connect(player1).selectTile(0, { value: entryFee });
      
      await expect(
        pvpGrid.updateEntryFee(ethers.parseEther("2"))
      ).to.be.revertedWith("Game in progress");
    });

    it("Should allow owner to update game fee", async function () {
      await pvpGrid.updateGameFee(500); // 5%
      expect(await pvpGrid.gameFee()).to.equal(500);
    });

    it("Should reject too high game fee", async function () {
      await expect(pvpGrid.updateGameFee(2001)).to.be.revertedWith("Fee too high");
    });
    
    it("Should allow owner to update team wallet", async function () {
      const newWallet = player4.address;
      await pvpGrid.updateTeamWallet(newWallet);
      expect(await pvpGrid.teamWallet()).to.equal(newWallet);
    });

    it("Should reject non-owner admin calls", async function () {
      await expect(
        pvpGrid.connect(player1).updateEntryFee(ethers.parseEther("0.02"))
      ).to.be.revertedWith("Not owner");
    });
  });

  describe("View Functions", function () {
    it("Should return grid state", async function () {
      await pvpGrid.connect(player1).selectTile(0, { value: entryFee });
      await pvpGrid.connect(player2).selectTile(5, { value: entryFee });
      
      const grid = await pvpGrid.getGrid();
      expect(grid[0]).to.equal(player1.address);
      expect(grid[5]).to.equal(player2.address);
      expect(grid[1]).to.equal(ethers.ZeroAddress);
    });

    it("Should check if can determine winner", async function () {
      expect(await pvpGrid.canDetermineWinner()).to.be.false;
      
      // Fill grid
      for (let i = 0; i < 16; i++) {
        await pvpGrid.connect(player1).selectTile(i, { value: entryFee });
      }
      
      expect(await pvpGrid.canDetermineWinner()).to.be.false;
      
      // Mine block
      await ethers.provider.send("evm_mine", []);
      
      expect(await pvpGrid.canDetermineWinner()).to.be.true;
      
      // Determine winner
      await pvpGrid.determineWinner();
      
      expect(await pvpGrid.canDetermineWinner()).to.be.false;
    });
  });
});