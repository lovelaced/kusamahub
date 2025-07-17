# DotPix Deployment Guide

This guide provides step-by-step instructions for deploying DotPix to the PASEO testnet and setting up the complete application stack.

## Prerequisites

### System Requirements
- Node.js 18.0.0 or higher
- NPM 8.0.0 or higher
- Git
- MetaMask browser extension

### Token Requirements
- PAS tokens for deployment (get from [PASEO faucet](https://faucet.polkadot.io/?parachain=1111))
- Minimum 0.1 PAS recommended for deployment and testing

## Step 1: Environment Setup

### 1.1 Clone Repository
```bash
git clone <repository-url>
cd DotPix
```

### 1.2 Install Dependencies
```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..
```

### 1.3 Verify Installation
```bash
# Test compilation
npx hardhat compile

# Run test suite
NODE_ENV=test npx hardhat test
```

## Step 2: Configure PASEO Network

### 2.1 Private Key Setup
```bash
# Set your deployment private key (without 0x prefix)
npx hardhat vars set PRIVATE_KEY your_64_character_private_key

# Verify it's set
npx hardhat vars list
```

### 2.2 Get Test Tokens
1. Visit [PASEO Faucet](https://faucet.polkadot.io/?parachain=1111)
2. Enter your wallet address
3. Request PAS tokens
4. Verify receipt in [Block Explorer](https://blockscout-passet-hub.parity-testnet.parity.io)

### 2.3 Verify Network Connection
```bash
npx hardhat console --network passetHub
> await ethers.provider.getBalance("YOUR_ADDRESS")
# Should return your PAS balance
```

## Step 3: Smart Contract Deployment

### 3.1 Compile Contracts
```bash
npx hardhat compile
```

Expected output:
```
Compiling 1 Solidity file
Successfully compiled 1 Solidity file
```

### 3.2 Deploy to PASEO
```bash
npx hardhat ignition deploy ./ignition/modules/PixelCanvas.js --network passetHub
```

When prompted:
- Confirm deployment with `y`
- Wait for transaction confirmation

Expected output:
```
[ PixelCanvas ] successfully deployed 🚀

Deployed Addresses
PixelCanvas#PixelCanvas - 0x1234567890abcdef...
```

### 3.3 Verify Deployment
```bash
# Check contract on block explorer
npx hardhat console --network passetHub
> const contract = await ethers.getContractAt("PixelCanvas", "DEPLOYED_ADDRESS")
> await contract.CANVAS_WIDTH()
# Should return 2000
```

## Step 4: Frontend Configuration

### 4.1 Set Contract Address
```bash
cd frontend
echo "VITE_CONTRACT_ADDRESS=your_deployed_contract_address" > .env
```

### 4.2 Build Frontend
```bash
npm run build
```

### 4.3 Test Locally
```bash
npm run dev
```

Visit `http://localhost:3000` and verify:
- MetaMask connection works
- Contract address is displayed
- Canvas loads without errors

## Step 5: Production Deployment

### 5.1 Frontend Hosting Options

#### Option A: Vercel Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd frontend
vercel --prod
```

#### Option B: Netlify Deployment
```bash
# Build and deploy
npm run build
# Upload dist/ folder to Netlify
```

#### Option C: GitHub Pages
```bash
# Add to package.json
"homepage": "https://yourusername.github.io/DotPix"

# Build and deploy
npm run build
npx gh-pages -d dist
```

### 5.2 Domain Configuration
- Configure custom domain in hosting provider
- Update CORS settings if needed
- Set up SSL certificate

## Step 6: Verification & Testing

### 6.1 Smart Contract Verification
```bash
# Test core functions
npx hardhat console --network passetHub
> const contract = await ethers.getContractAt("PixelCanvas", "CONTRACT_ADDRESS")
> await contract.calculatePixelFee(1)
> await contract.getPixelId(0, 0)
```

### 6.2 Frontend Integration Test
1. Open deployed application
2. Connect MetaMask to PASEO network
3. Select a pixel on canvas
4. Choose a color
5. Attempt pixel placement
6. Verify transaction success

### 6.3 End-to-End Testing
```bash
# Run full test suite
NODE_ENV=test npx hardhat test

# All tests should pass
```

## Step 7: Monitoring & Maintenance

### 7.1 Set Up Monitoring
- Monitor contract on [Block Explorer](https://blockscout-passet-hub.parity-testnet.parity.io)
- Set up alerts for contract interactions
- Monitor frontend performance metrics

### 7.2 Backup & Recovery
```bash
# Backup deployment artifacts
cp -r ignition/deployments/ backups/
cp .env frontend/.env.backup
```

### 7.3 Update Procedures
```bash
# For contract updates
rm -rf ignition/deployments/
npx hardhat compile
npx hardhat ignition deploy ./ignition/modules/PixelCanvas.js --network passetHub

# For frontend updates
cd frontend
npm run build
# Deploy to hosting provider
```

## Troubleshooting

### Common Deployment Issues

#### Issue: "CodeRejected" Error
```bash
# Verify hardhat config
cat hardhat.config.js | grep polkavm
# Should show: polkavm: true

# Verify resolc config present
cat hardhat.config.js | grep resolc -A 3
```

#### Issue: "Insufficient Funds"
```bash
# Check balance
npx hardhat console --network passetHub
> await ethers.provider.getBalance("YOUR_ADDRESS")

# Get more tokens from faucet
```

#### Issue: Contract Size Too Large
```bash
# Check contract size
npx hardhat compile
# Look for size warnings

# Solution: Remove unnecessary imports
```

#### Issue: Frontend Won't Connect
```bash
# Check environment variables
cat frontend/.env
# Verify VITE_CONTRACT_ADDRESS is set

# Check MetaMask network
# Ensure PASEO network is added and selected
```

### Network-Specific Issues

#### RPC Connection Problems
```bash
# Test RPC directly
curl -X POST -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":1}' \
  https://testnet-passet-hub-eth-rpc.polkadot.io
```

#### Transaction Failures
1. Check gas price and limit
2. Verify account has sufficient PAS
3. Ensure contract address is correct
4. Check for reentrancy issues

## Security Considerations

### Deployment Security
- Never commit private keys to repository
- Use environment variables for sensitive data
- Verify contract source on block explorer
- Test thoroughly on testnet before mainnet

### Operational Security
- Regular security audits
- Monitor for unusual contract interactions
- Keep dependencies updated
- Implement proper access controls

## Performance Optimization

### Contract Optimization
- Minimize storage operations
- Use events for off-chain data
- Optimize batch operations
- Consider gas-efficient data structures

### Frontend Optimization
- Implement canvas virtualization
- Use Web Workers for heavy computations
- Optimize bundle size
- Implement proper caching

## Maintenance Schedule

### Daily Tasks
- Monitor contract events
- Check application uptime
- Review error logs

### Weekly Tasks
- Analyze usage metrics
- Update documentation
- Review security alerts

### Monthly Tasks
- Dependency updates
- Performance optimization
- Backup verification

---

For additional support, refer to:
- [PASEO Documentation](https://docs.polkadot.io/)
- [Hardhat Documentation](https://hardhat.org/docs)
- [Project README](README.md)