import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import { CONTRACT_ABI } from '../constants';

interface UseContractProps {
  provider: ethers.BrowserProvider | null;
  contractAddress: string | null;
}

export const useContract = ({ provider, contractAddress }: UseContractProps) => {
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (provider && contractAddress) {
      try {
        provider.getSigner().then(signer => {
          const contractInstance = new ethers.Contract(contractAddress, CONTRACT_ABI, signer);
          setContract(contractInstance);
        }).catch(error => {
          console.error('Error getting signer:', error);
          setContract(null);
        });
      } catch (error) {
        console.error('Error creating contract instance:', error);
        setContract(null);
      }
    } else {
      setContract(null);
    }
  }, [provider, contractAddress]);

  const placePixel = useCallback(async (pixelId: number, color: string) => {
    if (!contract) throw new Error('Contract not initialized');
    
    setIsLoading(true);
    try {
      // Convert hex color to uint32
      const colorInt = parseInt(color.replace('#', ''), 16);
      const fee = await contract.calculatePixelFee(1);
      
      const tx = await contract.placePixel(pixelId, colorInt, { value: fee });
      return await tx.wait();
    } finally {
      setIsLoading(false);
    }
  }, [contract]);

  const placePixelsBatch = useCallback(async (pixelIds: number[], colors: string[]) => {
    if (!contract) throw new Error('Contract not initialized');
    if (pixelIds.length !== colors.length) throw new Error('Arrays length mismatch');
    
    setIsLoading(true);
    try {
      const colorInts = colors.map(color => parseInt(color.replace('#', ''), 16));
      const fee = await contract.calculatePixelFee(pixelIds.length);
      
      // Try to simulate the transaction first to catch errors early
      try {
        await contract.placePixelsBatch.staticCall(pixelIds, colorInts, { value: fee });
      } catch (simError: any) {
        console.log('Simulation failed:', simError);
        throw new Error(`Transaction would fail: ${simError.reason || simError.message || 'Unknown simulation error'}`);
      }
      
      // Execute the transaction (V3 contract supports larger batches efficiently)
      const tx = await contract.placePixelsBatch(pixelIds, colorInts, { value: fee });
      return await tx.wait();
    } finally {
      setIsLoading(false);
    }
  }, [contract]);

  const getPixel = useCallback(async (pixelId: number) => {
    if (!contract) throw new Error('Contract not initialized');
    
    const [owner, color, lastModified] = await contract.getPixel(pixelId);
    return {
      owner,
      color: `#${color.toString(16).padStart(6, '0')}`,
      lastModified: Number(lastModified)
    };
  }, [contract]);

  const getPixelsByRange = useCallback(async (startId: number, count: number) => {
    if (!contract) throw new Error('Contract not initialized');
    
    // Since getPixelsByRange is not in the deployed contract, we'll fetch pixels individually
    const owners: string[] = [];
    const colors: string[] = [];
    const timestamps: number[] = [];
    
    for (let i = 0; i < count; i++) {
      try {
        const pixelId = startId + i;
        const [owner, color, lastModified] = await contract.pixels(pixelId);
        owners.push(owner);
        colors.push(`#${color.toString(16).padStart(6, '0')}`);
        timestamps.push(Number(lastModified));
      } catch (error) {
        // If pixel fetch fails, use default values
        owners.push('0x0000000000000000000000000000000000000000');
        colors.push('#ffffff');
        timestamps.push(0);
      }
    }
    
    return { owners, colors, timestamps };
  }, [contract]);

  const calculatePixelFee = useCallback(async (count: number) => {
    if (!contract) throw new Error('Contract not initialized');
    
    const fee = await contract.calculatePixelFee(count);
    return ethers.formatEther(fee);
  }, [contract]);

  const getPixelId = useCallback(async (x: number, y: number) => {
    if (!contract) throw new Error('Contract not initialized');
    
    return Number(await contract.getPixelId(x, y));
  }, [contract]);

  return {
    contract,
    isLoading,
    placePixel,
    placePixelsBatch,
    getPixel,
    getPixelsByRange,
    calculatePixelFee,
    getPixelId
  };
};