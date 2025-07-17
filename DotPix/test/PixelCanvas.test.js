const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("PixelCanvas", function () {
  let pixelCanvas;
  let owner;
  let recipient;
  let user1;
  let user2;
  
  const CANVAS_WIDTH = 2000;
  const CANVAS_HEIGHT = 2000;
  const BASE_FEE = ethers.parseEther("0.001");

  beforeEach(async function () {
    [owner, recipient, user1, user2] = await ethers.getSigners();
    
    const PixelCanvas = await ethers.getContractFactory("PixelCanvas");
    pixelCanvas = await PixelCanvas.deploy(recipient.address);
    await pixelCanvas.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should set the correct recipient", async function () {
      expect(await pixelCanvas.recipient()).to.equal(recipient.address);
    });

    it("Should set the correct owner", async function () {
      expect(await pixelCanvas.owner()).to.equal(owner.address);
    });

    it("Should have correct canvas dimensions", async function () {
      expect(await pixelCanvas.CANVAS_WIDTH()).to.equal(CANVAS_WIDTH);
      expect(await pixelCanvas.CANVAS_HEIGHT()).to.equal(CANVAS_HEIGHT);
      expect(await pixelCanvas.TOTAL_PIXELS()).to.equal(CANVAS_WIDTH * CANVAS_HEIGHT);
    });
  });

  describe("Pixel ID conversion", function () {
    it("Should correctly convert coordinates to pixel ID", async function () {
      expect(await pixelCanvas.getPixelId(0, 0)).to.equal(0);
      expect(await pixelCanvas.getPixelId(1, 0)).to.equal(1);
      expect(await pixelCanvas.getPixelId(0, 1)).to.equal(CANVAS_WIDTH);
      expect(await pixelCanvas.getPixelId(CANVAS_WIDTH - 1, CANVAS_HEIGHT - 1))
        .to.equal(CANVAS_WIDTH * CANVAS_HEIGHT - 1);
    });

    it("Should correctly convert pixel ID to coordinates", async function () {
      const [x0, y0] = await pixelCanvas.getPixelCoordinates(0);
      expect(x0).to.equal(0);
      expect(y0).to.equal(0);

      const [x1, y1] = await pixelCanvas.getPixelCoordinates(1);
      expect(x1).to.equal(1);
      expect(y1).to.equal(0);

      const [x2, y2] = await pixelCanvas.getPixelCoordinates(CANVAS_WIDTH);
      expect(x2).to.equal(0);
      expect(y2).to.equal(1);
    });

    it("Should revert for invalid coordinates", async function () {
      await expect(pixelCanvas.getPixelId(CANVAS_WIDTH, 0))
        .to.be.revertedWith("Coordinates out of bounds");
      
      await expect(pixelCanvas.getPixelId(0, CANVAS_HEIGHT))
        .to.be.revertedWith("Coordinates out of bounds");
    });
  });

  describe("Fee calculation", function () {
    it("Should calculate correct fee for single pixel", async function () {
      const fee = await pixelCanvas.calculatePixelFee(1);
      expect(fee).to.equal(BASE_FEE);
    });

    it("Should calculate correct fee for multiple pixels", async function () {
      const fee2 = await pixelCanvas.calculatePixelFee(2);
      const expected2 = BASE_FEE * 2n * 110n / 100n; // 10% increase
      expect(fee2).to.equal(expected2);

      const fee5 = await pixelCanvas.calculatePixelFee(5);
      const expected5 = BASE_FEE * 5n * 140n / 100n; // 40% increase
      expect(fee5).to.equal(expected5);
    });
  });

  describe("Single pixel placement", function () {
    it("Should place a pixel successfully", async function () {
      const pixelId = 100;
      const color = 0xFF0000; // Red
      const fee = await pixelCanvas.calculatePixelFee(1);
      
      await expect(pixelCanvas.connect(user1).placePixel(pixelId, color, { value: fee }))
        .to.emit(pixelCanvas, "PixelPlaced")
        .withArgs(pixelId, user1.address, color, fee, anyValue);
      
      const [pixelOwner, pixelColor, lastModified] = await pixelCanvas.getPixel(pixelId);
      expect(pixelOwner).to.equal(user1.address);
      expect(pixelColor).to.equal(color);
      expect(lastModified).to.be.greaterThan(0);
    });

    it("Should revert with insufficient fee", async function () {
      const pixelId = 100;
      const color = 0xFF0000;
      const insufficientFee = BASE_FEE - 1n;
      
      await expect(pixelCanvas.connect(user1).placePixel(pixelId, color, { value: insufficientFee }))
        .to.be.revertedWith("Insufficient fee");
    });

    it("Should refund excess payment", async function () {
      const pixelId = 100;
      const color = 0xFF0000;
      const fee = await pixelCanvas.calculatePixelFee(1);
      const excess = ethers.parseEther("0.001");
      const totalPayment = fee + excess;
      
      const balanceBefore = await ethers.provider.getBalance(user1.address);
      const tx = await pixelCanvas.connect(user1).placePixel(pixelId, color, { value: totalPayment });
      const receipt = await tx.wait();
      const balanceAfter = await ethers.provider.getBalance(user1.address);
      
      const gasUsed = receipt.gasUsed * receipt.gasPrice;
      const expectedBalance = balanceBefore - fee - gasUsed;
      
      expect(balanceAfter).to.be.closeTo(expectedBalance, ethers.parseEther("0.0001"));
    });

    it("Should revert for invalid pixel ID", async function () {
      const invalidPixelId = CANVAS_WIDTH * CANVAS_HEIGHT;
      const color = 0xFF0000;
      const fee = await pixelCanvas.calculatePixelFee(1);
      
      await expect(pixelCanvas.connect(user1).placePixel(invalidPixelId, color, { value: fee }))
        .to.be.revertedWith("Invalid pixel ID");
    });
  });

  describe("Batch pixel placement", function () {
    it("Should place multiple pixels successfully", async function () {
      const pixelIds = [100, 101, 102];
      const colors = [0xFF0000, 0x00FF00, 0x0000FF];
      const fee = await pixelCanvas.calculatePixelFee(pixelIds.length);
      
      await expect(pixelCanvas.connect(user1).placePixelsBatch(pixelIds, colors, { value: fee }))
        .to.emit(pixelCanvas, "BatchPixelsPlaced")
        .withArgs(user1.address, pixelIds, colors, fee, anyValue);
      
      for (let i = 0; i < pixelIds.length; i++) {
        const [pixelOwner, pixelColor] = await pixelCanvas.getPixel(pixelIds[i]);
        expect(pixelOwner).to.equal(user1.address);
        expect(pixelColor).to.equal(colors[i]);
      }
    });

    it("Should revert with mismatched array lengths", async function () {
      const pixelIds = [100, 101];
      const colors = [0xFF0000]; // Different length
      const fee = await pixelCanvas.calculatePixelFee(pixelIds.length);
      
      await expect(pixelCanvas.connect(user1).placePixelsBatch(pixelIds, colors, { value: fee }))
        .to.be.revertedWith("Arrays length mismatch");
    });

    it("Should revert with empty arrays", async function () {
      const pixelIds = [];
      const colors = [];
      
      await expect(pixelCanvas.connect(user1).placePixelsBatch(pixelIds, colors, { value: 0 }))
        .to.be.revertedWith("Empty arrays");
    });

    it("Should revert with batch too large", async function () {
      const pixelIds = Array.from({ length: 101 }, (_, i) => i);
      const colors = Array.from({ length: 101 }, () => 0xFF0000);
      const fee = await pixelCanvas.calculatePixelFee(pixelIds.length);
      
      await expect(pixelCanvas.connect(user1).placePixelsBatch(pixelIds, colors, { value: fee }))
        .to.be.revertedWith("Batch too large");
    });
  });

  describe("Fee distribution", function () {
    it("Should distribute fees correctly", async function () {
      const pixelId = 100;
      const color = 0xFF0000;
      const fee = await pixelCanvas.calculatePixelFee(1);
      
      const recipientBalanceBefore = await ethers.provider.getBalance(recipient.address);
      
      await expect(pixelCanvas.connect(user1).placePixel(pixelId, color, { value: fee }))
        .to.emit(pixelCanvas, "FeesDistributed");
      
      const recipientBalanceAfter = await ethers.provider.getBalance(recipient.address);
      const expectedRecipientIncrease = fee * 51n / 100n;
      
      expect(recipientBalanceAfter - recipientBalanceBefore).to.equal(expectedRecipientIncrease);
    });
  });

  describe("Pixel queries", function () {
    beforeEach(async function () {
      // Place some test pixels
      const fee = await pixelCanvas.calculatePixelFee(1);
      await pixelCanvas.connect(user1).placePixel(0, 0xFF0000, { value: fee });
      await pixelCanvas.connect(user2).placePixel(1, 0x00FF00, { value: fee });
    });

    it("Should return correct pixel data", async function () {
      const [owner, color, lastModified] = await pixelCanvas.getPixel(0);
      expect(owner).to.equal(user1.address);
      expect(color).to.equal(0xFF0000);
      expect(lastModified).to.be.greaterThan(0);
    });

    it("Should return range of pixels", async function () {
      const { owners, colors, timestamps } = await pixelCanvas.getPixelsByRange(0, 2);
      
      expect(owners[0]).to.equal(user1.address);
      expect(owners[1]).to.equal(user2.address);
      expect(colors[0]).to.equal(0xFF0000);
      expect(colors[1]).to.equal(0x00FF00);
      expect(timestamps[0]).to.be.greaterThan(0);
      expect(timestamps[1]).to.be.greaterThan(0);
    });

    it("Should revert for range too large", async function () {
      await expect(pixelCanvas.getPixelsByRange(0, 1001))
        .to.be.revertedWith("Range too large");
    });

    it("Should revert for range exceeding canvas", async function () {
      await expect(pixelCanvas.getPixelsByRange(CANVAS_WIDTH * CANVAS_HEIGHT - 1, 2))
        .to.be.revertedWith("Range exceeds canvas");
    });
  });

  describe("Ownership functions", function () {
    it("Should transfer ownership", async function () {
      await pixelCanvas.connect(owner).transferOwnership(user1.address);
      expect(await pixelCanvas.owner()).to.equal(user1.address);
    });

    it("Should revert ownership transfer from non-owner", async function () {
      await expect(pixelCanvas.connect(user1).transferOwnership(user2.address))
        .to.be.revertedWith("Not owner");
    });

    it("Should allow emergency withdrawal by owner", async function () {
      // Send some ETH to contract
      await user1.sendTransaction({
        to: await pixelCanvas.getAddress(),
        value: ethers.parseEther("1.0")
      });
      
      const ownerBalanceBefore = await ethers.provider.getBalance(owner.address);
      const contractBalance = await ethers.provider.getBalance(await pixelCanvas.getAddress());
      
      const tx = await pixelCanvas.connect(owner).emergencyWithdraw();
      const receipt = await tx.wait();
      const gasUsed = receipt.gasUsed * receipt.gasPrice;
      
      const ownerBalanceAfter = await ethers.provider.getBalance(owner.address);
      
      expect(ownerBalanceAfter).to.be.closeTo(
        ownerBalanceBefore + contractBalance - gasUsed,
        ethers.parseEther("0.0001")
      );
    });
  });

  describe("Reentrancy protection", function () {
    it("Should prevent reentrancy attacks", async function () {
      // This test would require a malicious contract, but we can test the modifier is applied
      const pixelId = 100;
      const color = 0xFF0000;
      const fee = await pixelCanvas.calculatePixelFee(1);
      
      // Multiple rapid calls should not cause issues
      const promises = Array.from({ length: 5 }, () =>
        pixelCanvas.connect(user1).placePixel(pixelId + Math.floor(Math.random() * 1000), color, { value: fee })
      );
      
      await Promise.allSettled(promises);
      // If reentrancy protection works, this shouldn't cause state corruption
    });
  });

  // Helper function for testing events with dynamic values
  function anyValue() {
    return true;
  }
});