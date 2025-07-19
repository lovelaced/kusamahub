const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("PvPGridModule", (m) => {
  // Deploy parameters
  const entryFee = m.getParameter("entryFee", ethers.parseEther("1")); // 1 PAS default
  const gameFee = m.getParameter("gameFee", 1000); // 10% default fee
  const teamWallet = m.getParameter("teamWallet", "0x0000000000000000000000000000000000000000"); // You must provide this
  
  // Deploy the basic version
  const pvpGrid = m.contract("PvPGrid", [entryFee, gameFee, teamWallet]);
  
  // Deploy the enhanced version
  const pvpGridEnhanced = m.contract("PvPGridEnhanced", [entryFee, gameFee, teamWallet]);
  
  return { pvpGrid, pvpGridEnhanced };
});