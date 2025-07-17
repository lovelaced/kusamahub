const { ethers } = require("hardhat");

async function main() {
  console.log("=== WRITING 'N4DRO' ON CANVAS (BATCHED) ===");
  
  const contractAddress = "0xfC72434Ce268668d0F946bFAcB59F6D8d728eC0E";
  const [deployer] = await ethers.getSigners();
  
  console.log("Contract:", contractAddress);
  console.log("Writer:", deployer.address);
  
  const contract = await ethers.getContractAt("PixelCanvasV2", contractAddress);
  
  // Define the letters in a 5x7 pixel font
  const startX = 100;
  const startY = 100;
  const letterSpacing = 7;
  const letterHeight = 7;
  const letterWidth = 5;
  
  // Define each letter as a bitmap
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
  
  const text = 'N4DRO';
  const color = 0x00FF00; // Green
  
  // Process each letter separately to avoid batch size issues
  let totalPixelsPlaced = 0;
  let totalCost = 0n;
  
  for (let letterIndex = 0; letterIndex < text.length; letterIndex++) {
    const letter = text[letterIndex];
    const letterBitmap = letters[letter];
    const letterX = startX + (letterIndex * letterSpacing);
    
    // Collect pixels for this letter
    const pixelIds = [];
    const colors = [];
    
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
    
    if (pixelIds.length === 0) continue;
    
    // Calculate fee for this letter
    const fee = await contract.calculatePixelFee(pixelIds.length);
    
    console.log(`\nPlacing letter '${letter}' (${pixelIds.length} pixels)...`);
    console.log(`Position: (${letterX}, ${startY})`);
    console.log(`Fee: ${ethers.formatEther(fee)} PAS`);
    
    try {
      const tx = await contract.placePixelsBatch(pixelIds, colors, { value: fee });
      console.log(`Transaction sent: ${tx.hash}`);
      
      const receipt = await tx.wait();
      console.log(`Confirmed in block: ${receipt.blockNumber}`);
      
      totalPixelsPlaced += pixelIds.length;
      totalCost += fee;
      
    } catch (error) {
      console.error(`❌ Error placing letter '${letter}':`, error.message);
      throw error;
    }
  }
  
  console.log("\n✅ 'N4DRO' successfully written on canvas!");
  console.log(`Total pixels placed: ${totalPixelsPlaced}`);
  console.log(`Total cost: ${ethers.formatEther(totalCost)} PAS`);
  
  // Display visual representation
  console.log("\nVisual representation:");
  console.log("=".repeat(40));
  for (let row = 0; row < letterHeight; row++) {
    let line = "";
    for (let letterIndex = 0; letterIndex < text.length; letterIndex++) {
      const letter = text[letterIndex];
      const letterBitmap = letters[letter];
      for (let col = 0; col < letterWidth; col++) {
        line += letterBitmap[row][col] === 1 ? "█" : " ";
      }
      line += "  ";
    }
    console.log(line);
  }
  console.log("=".repeat(40));
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