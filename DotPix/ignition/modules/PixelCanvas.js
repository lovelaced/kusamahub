const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("PixelCanvas", (m) => {
  // Use the same recipient as V2 for consistency
  const recipient = "0x9D99675d078d7d74EeAFaae29714B5d56DcA54A3";
  
  const pixelCanvas = m.contract("PixelCanvas", [recipient]);

  return { pixelCanvas };
});