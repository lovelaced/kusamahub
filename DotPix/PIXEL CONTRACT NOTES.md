# PixelCanvas Smart Contract Fee Analysis

## Overview

This document provides a comprehensive analysis of the PixelCanvas smart contract's fee mechanism, distribution system, and modification options. Based on detailed contract analysis and testing on PASEO testnet.

**Contract Address**: `0xb4596f85e131F8E022ccB9d463DB3382186d9FC9`  
**Network**: PASEO Testnet (Chain ID: 420420422)

---

## Current Fee Structure

### Constants (Immutable)

```solidity
uint256 public constant BASE_PIXEL_FEE = 0.001 ether;    // 1,000,000,000,000,000 wei
uint256 public constant BURN_PERCENTAGE = 49;           // 49%
address public immutable recipient;                     // Set at deployment
```

### Fee Calculation Formula

**Single Pixel**: `BASE_PIXEL_FEE` (0.001 ETH)

**Batch Pixels**: `(BASE_PIXEL_FEE × count × [100 + (count-1) × 10]) ÷ 100`

This creates a **10% fee increase per additional pixel** in a batch, incentivizing smaller batches while allowing large ones.

### Fee Examples

| Pixels | Total Fee | Fee/Pixel | Burn (49%) | Recipient (51%) |
|--------|-----------|-----------|------------|-----------------|
| 1      | 0.001 ETH | 0.001 ETH | 0.00049 ETH | 0.00051 ETH |
| 5      | 0.007 ETH | 0.0014 ETH | 0.00343 ETH | 0.00357 ETH |
| 10     | 0.019 ETH | 0.0019 ETH | 0.00931 ETH | 0.00969 ETH |
| 50     | 0.295 ETH | 0.0059 ETH | 0.1446 ETH | 0.1505 ETH |
| 100    | 1.09 ETH  | 0.0109 ETH | 0.5341 ETH | 0.5559 ETH |

---

## Fee Distribution Mechanism

### Current Implementation

```solidity
function _distributeFees(uint256 totalFee) internal {
    uint256 toBurn = (totalFee * BURN_PERCENTAGE) / 100;
    uint256 toRecipient = totalFee - toBurn;
    
    (bool success,) = payable(recipient).call{value: toRecipient}("");
    require(success, "Transfer failed");
    
    emit FeesDistributed(toBurn, toRecipient);
}
```

### ⚠️ Critical Discovery: "Burning" Mechanism

**The contract does NOT actually burn tokens!** Instead:

1. **49% "burn"**: Stays in the contract permanently
2. **51% recipient**: Sent to the recipient address immediately
3. **Accumulated "burned" fees**: Currently 1.569372 ETH in contract
4. **Risk**: Owner can withdraw accumulated fees via `emergencyWithdraw()`

### Actual Fee Flow

```
User pays fee
     ↓
51% → Recipient Address (immediate transfer)
49% → Contract Balance (accumulates, not truly burned)
     ↓
Emits FeesDistributed(toBurn, toRecipient)
```

---

## Modification Options

### 1. Changing Base Fee

**Current**: `0.001 ether` (hardcoded constant)

**To Modify**: Deploy new contract with different `BASE_PIXEL_FEE`

```solidity
// Example modifications
uint256 public constant BASE_PIXEL_FEE = 0.0005 ether;  // Reduce to 0.0005 ETH
uint256 public constant BASE_PIXEL_FEE = 0.002 ether;   // Increase to 0.002 ETH
```

### 2. Changing Burn/Recipient Split

**Current**: 49% burn / 51% recipient

**To Modify**: Deploy new contract with different `BURN_PERCENTAGE`

```solidity
// Example modifications
uint256 public constant BURN_PERCENTAGE = 30;  // 30% burn, 70% recipient
uint256 public constant BURN_PERCENTAGE = 60;  // 60% burn, 40% recipient
uint256 public constant BURN_PERCENTAGE = 0;   // 0% burn, 100% recipient
```

### 3. Implementing True Burning

**Current Problem**: Tokens accumulate in contract instead of being burned

**Solution**: Deploy new contract with true burning mechanism:

```solidity
function _distributeFees(uint256 totalFee) internal {
    uint256 toBurn = (totalFee * BURN_PERCENTAGE) / 100;
    uint256 toRecipient = totalFee - toBurn;
    
    // Send to recipient
    (bool success,) = payable(recipient).call{value: toRecipient}("");
    require(success, "Transfer failed");
    
    // True burning: Send to burn address
    (bool burnSuccess,) = payable(0x000000000000000000000000000000000000dEaD).call{value: toBurn}("");
    require(burnSuccess, "Burn failed");
    
    emit FeesDistributed(toBurn, toRecipient);
}
```

### 4. Making Fee Structure Dynamic

**Current**: Fixed constants (requires redeployment to change)

**Enhancement**: Add owner functions to modify fees:

```solidity
uint256 public baseFee = 0.001 ether;          // Mutable
uint256 public burnPercentage = 49;            // Mutable

function setBaseFee(uint256 _newFee) external onlyOwner {
    require(_newFee > 0, "Fee must be positive");
    baseFee = _newFee;
    emit BaseFeeUpdated(_newFee);
}

function setBurnPercentage(uint256 _percentage) external onlyOwner {
    require(_percentage <= 100, "Invalid percentage");
    burnPercentage = _percentage;
    emit BurnPercentageUpdated(_percentage);
}
```

---

## Security Considerations

### 1. Accumulated Contract Balance

**Risk**: 1.569372 ETH currently accumulated in contract
**Mitigation**: Owner should either:
- Leave funds permanently locked (true burning effect)
- Implement proper burning mechanism in new contract
- Transfer to verified burn address

### 2. Emergency Withdraw Function

```solidity
function emergencyWithdraw() external onlyOwner {
    (bool success,) = payable(owner).call{value: address(this).balance}("");
    require(success, "Withdrawal failed");
}
```

**Risk**: Allows owner to withdraw "burned" fees  
**Recommendation**: Remove or modify this function if true burning is desired

### 3. Constants vs Variables

**Current**: All fee parameters are constants (immutable)  
**Pro**: Gas efficient, predictable  
**Con**: Requires redeployment to change

---

## Deployment Considerations

### To Change Fee Structure

1. **Modify contract constants**
2. **Redeploy contract** (new address)
3. **Update frontend** (`.env` file)
4. **Migrate users** to new contract

### Migration Strategy

1. Announce new contract deployment
2. Deploy with new fee structure
3. Update frontend to use new address
4. Consider implementing migration function for existing pixel data

---

## Recommendations

### Immediate Actions

1. **Document the accumulation behavior** for users
2. **Decide on emergency withdraw policy**
3. **Consider implementing true burning** in next version

### Future Enhancements

1. **Dynamic fee adjustment** via owner functions
2. **True token burning** mechanism
3. **Fee discount systems** for frequent users
4. **Progressive fee structure** for different pixel counts

---

## Code Examples for Modifications

### Enhanced Fee Structure with True Burning

```solidity
contract PixelCanvasEnhanced {
    uint256 public baseFee = 0.001 ether;
    uint256 public burnPercentage = 49;
    address public constant BURN_ADDRESS = 0x000000000000000000000000000000000000dEaD;
    
    function _distributeFees(uint256 totalFee) internal {
        uint256 toBurn = (totalFee * burnPercentage) / 100;
        uint256 toRecipient = totalFee - toBurn;
        
        // Send to recipient
        if (toRecipient > 0) {
            (bool success,) = payable(recipient).call{value: toRecipient}("");
            require(success, "Transfer failed");
        }
        
        // True burning
        if (toBurn > 0) {
            (bool burnSuccess,) = payable(BURN_ADDRESS).call{value: toBurn}("");
            require(burnSuccess, "Burn failed");
        }
        
        emit FeesDistributed(toBurn, toRecipient);
    }
    
    function setBaseFee(uint256 _newFee) external onlyOwner {
        require(_newFee > 0, "Fee must be positive");
        emit BaseFeeUpdated(baseFee, _newFee);
        baseFee = _newFee;
    }
    
    function setBurnPercentage(uint256 _percentage) external onlyOwner {
        require(_percentage <= 100, "Invalid percentage");
        emit BurnPercentageUpdated(burnPercentage, _percentage);
        burnPercentage = _percentage;
    }
}
```

---

## Analysis Summary

✅ **Working Correctly**: 51% goes to recipient address  
⚠️ **Issue Found**: 49% accumulates in contract (not truly burned)  
🔧 **Modification Required**: Redeploy contract to change fee structure  
🎯 **Recommendation**: Implement true burning and dynamic fee adjustment

This analysis provides the foundation for making informed decisions about fee structure modifications and contract improvements.