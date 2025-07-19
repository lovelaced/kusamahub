require("@nomicfoundation/hardhat-toolbox");
require("@parity/hardhat-polkadot");
const { vars } = require("hardhat/config");

module.exports = {
  solidity: {
    version: "0.8.28",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  resolc: {
    version: "1.5.2",
    compilerSource: "npm",
  },
  networks: {
    hardhat: {
      polkavm: true,
    },
    localhost: {
      url: "http://127.0.0.1:8545"
    },
    passetHub: {
      polkavm: true,
      url: "https://testnet-passet-hub-eth-rpc.polkadot.io",
      accounts: [vars.get("PRIVATE_KEY")],
      chainId: 420420422, // Correct Paseo TestNet chain ID
    },
    // Add other networks as needed
    // sepolia: {
    //   url: `https://sepolia.infura.io/v3/${vars.get("INFURA_KEY")}`,
    //   accounts: [vars.get("PRIVATE_KEY")]
    // }
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  }
};