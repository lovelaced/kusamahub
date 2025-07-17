const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("BigWickGameModule", (m) => {
  const bigWickGame = m.contract("BigWickGame");

  return { bigWickGame };
});