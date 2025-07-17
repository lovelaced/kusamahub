require("@nomicfoundation/hardhat-toolbox");
require("@parity/hardhat-polkadot");
const { vars } = require("hardhat/config");

module.exports = {
  solidity: "0.8.28",
  resolc: {
    version: "1.5.2",
    compilerSource: "npm",
  },
  networks: {
    hardhat: {
      polkavm: process.env.NODE_ENV !== 'test',
    },
    localNode: {
      polkavm: true,
      url: "http://127.0.0.1:8545",
    },
    passetHub: {
      polkavm: true,
      url: "https://testnet-passet-hub-eth-rpc.polkadot.io",
      accounts: [vars.get("PRIVATE_KEY")],
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
};