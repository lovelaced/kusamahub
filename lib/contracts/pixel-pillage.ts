// DotPix Contract ABI and Configuration
export const CONTRACT_ADDRESS = "0xb4596f85e131F8E022ccB9d463DB3382186d9FC9" // Deployed on Paseo TestNet
export const CHAIN_ID = "0x190F1B46" // 420420422 in hex for Paseo TestNet

export const NETWORK_CONFIG = {
  chainId: CHAIN_ID,
  chainName: "Polkadot Hub TestNet",
  nativeCurrency: {
    name: "PAS",
    symbol: "PAS",
    decimals: 18
  },
  rpcUrls: ["https://testnet-passet-hub-eth-rpc.polkadot.io"],
  blockExplorerUrls: ["https://blockscout-passet-hub.parity-testnet.parity.io/"]
}

// DotPix contract uses full RGB colors, not palette indices
export const CONTRACT_ABI = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "pixelId",
        "type": "uint256"
      },
      {
        "internalType": "uint32",
        "name": "color",
        "type": "uint32"
      }
    ],
    "name": "placePixel",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256[]",
        "name": "pixelIds",
        "type": "uint256[]"
      },
      {
        "internalType": "uint32[]",
        "name": "colors",
        "type": "uint32[]"
      }
    ],
    "name": "placePixelsBatch",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "pixelId",
        "type": "uint256"
      }
    ],
    "name": "getPixel",
    "outputs": [
      {
        "internalType": "address",
        "name": "pixelOwner",
        "type": "address"
      },
      {
        "internalType": "uint32",
        "name": "color",
        "type": "uint32"
      },
      {
        "internalType": "uint256",
        "name": "lastModified",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "count",
        "type": "uint256"
      }
    ],
    "name": "calculatePixelFee",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "x",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "y",
        "type": "uint256"
      }
    ],
    "name": "getPixelId",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "pixelId",
        "type": "uint256"
      }
    ],
    "name": "getPixelCoordinates",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "x",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "y",
        "type": "uint256"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "pixels",
    "outputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "uint32",
        "name": "color",
        "type": "uint32"
      },
      {
        "internalType": "uint256",
        "name": "lastModified",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "pixelId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint32",
        "name": "color",
        "type": "uint32"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "fee",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      }
    ],
    "name": "PixelPlaced",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256[]",
        "name": "pixelIds",
        "type": "uint256[]"
      },
      {
        "indexed": false,
        "internalType": "uint32[]",
        "name": "colors",
        "type": "uint32[]"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "totalFee",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      }
    ],
    "name": "BatchPixelsPlaced",
    "type": "event"
  }
] as const

// Canvas configuration
export const CANVAS_CONFIG = {
  width: 2000,
  height: 2000,
  basePixelFee: "0.001", // in PAS
  burnPercentage: 49,
  maxBatchSize: 100
}