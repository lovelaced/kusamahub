const { ethers } = require("hardhat");

async function main() {
  console.log("=== WRITING 'N4DRO' ON CANVAS ===");
  
  const contractAddress = "0xfC72434Ce268668d0F946bFAcB59F6D8d728eC0E";
  const [deployer] = await ethers.getSigners();
  
  console.log("Contract:", contractAddress);
  console.log("Writer:", deployer.address);
  
  const contract = await ethers.getContractAt("PixelCanvasV2", contractAddress);
  
  // Define the letters in a 5x7 pixel font
  // Starting position: x=100, y=100
  const startX = 100;
  const startY = 100;
  const letterSpacing = 7;
  const letterHeight = 7;
  const letterWidth = 5;
  
  // Define each letter as a bitmap (1 = filled, 0 = empty)
  const letters = {
    'N': [
      [1,0,0,0,1],
      [1,1,0,0,1],
      [1,0,1,0,1],
      [1,0,0,1,1],
      [1,0,0,0,1],
      [1,0,0,0,1],
      [1,0,0,0,1]
    ],
    '4': [
      [0,0,0,1,0],
      [0,0,1,1,0],
      [0,1,0,1,0],
      [1,0,0,1,0],
      [1,1,1,1,1],
      [0,0,0,1,0],
      [0,0,0,1,0]
    ],
    'D': [
      [1,1,1,1,0],
      [1,0,0,0,1],
      [1,0,0,0,1],
      [1,0,0,0,1],
      [1,0,0,0,1],
      [1,0,0,0,1],
      [1,1,1,1,0]
    ],
    'R': [
      [1,1,1,1,0],
      [1,0,0,0,1],
      [1,0,0,0,1],
      [1,1,1,1,0],
      [1,0,1,0,0],
      [1,0,0,1,0],
      [1,0,0,0,1]
    ],
    'O': [
      [0,1,1,1,0],
      [1,0,0,0,1],
      [1,0,0,0,1],
      [1,0,0,0,1],
      [1,0,0,0,1],
      [1,0,0,0,1],
      [0,1,1,1,0]
    ]
  };
  
  // Collect all pixels to place
  const pixelIds = [];
  const colors = [];
  const text = 'N4DRO';
  const color = 0x00FF00; // Green color for the text
  
  // Calculate pixel positions for each letter
  for (let letterIndex = 0; letterIndex < text.length; letterIndex++) {
    const letter = text[letterIndex];
    const letterBitmap = letters[letter];
    const letterX = startX + (letterIndex * letterSpacing);
    
    for (let row = 0; row < letterHeight; row++) {
      for (let col = 0; col < letterWidth; col++) {
        if (letterBitmap[row][col] === 1) {
          const x = letterX + col;
          const y = startY + row;
          const pixelId = await contract.getPixelId(x, y);
          
          pixelIds.push(pixelId);
          colors.push(color);
        }
      }
    }
  }
  
  console.log(`\nTotal pixels to place: ${pixelIds.length}`);
  console.log(`Text position: (${startX}, ${startY})`);
  console.log(`Color: #${color.toString(16).padStart(6, '0')}`);
  
  // Calculate fee
  const fee = await contract.calculatePixelFee(pixelIds.length);
  console.log(`Total fee: ${ethers.formatEther(fee)} PAS`);
  
  // Check balance
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log(`Current balance: ${ethers.formatEther(balance)} PAS`);
  
  if (balance < fee) {
    console.error("❌ Insufficient balance for placing pixels!");
    return;
  }
  
  try {
    console.log("\nPlacing pixels...");
    const tx = await contract.placePixelsBatch(pixelIds, colors, { value: fee });
    console.log("Transaction sent:", tx.hash);
    
    const receipt = await tx.wait();
    console.log("Transaction confirmed in block:", receipt.blockNumber);
    
    console.log("\n✅ 'N4DRO' successfully written on canvas!");
    console.log("View on block explorer:", `https://blockscout-passet-hub.parity-testnet.parity.io/tx/${tx.hash}`);
    
    // Display a visual representation
    console.log("\nVisual representation:");
    console.log("=" .repeat(40));
    for (let row = 0; row < letterHeight; row++) {
      let line = "";
      for (let letterIndex = 0; letterIndex < text.length; letterIndex++) {
        const letter = text[letterIndex];
        const letterBitmap = letters[letter];
        for (let col = 0; col < letterWidth; col++) {
          line += letterBitmap[row][col] === 1 ? "█" : " ";
        }
        line += "  "; // Space between letters
      }
      console.log(line);
    }
    console.log("=" .repeat(40));
    
  } catch (error) {
    console.error("❌ Error placing pixels:", error.message);
    throw error;
  }
}

main()
  .then(() => {
    console.log("\n=== SCRIPT COMPLETE ===");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Script failed:", error);
    process.exit(1);
  });