import { useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import { Pixel } from '../types';
import { CANVAS_CONFIG } from '../constants';

interface RealtimeUpdatesProps {
  contract: ethers.Contract | null;
  onPixelUpdate: (pixels: Map<number, Pixel>) => void;
  userAddress: string | null;
}

export const useRealtimeUpdates = ({ 
  contract, 
  onPixelUpdate, 
  userAddress 
}: RealtimeUpdatesProps) => {
  
  const handlePixelPlaced = useCallback((
    pixelId: bigint,
    owner: string,
    color: bigint,
    fee: bigint,
    timestamp: bigint
  ) => {
    const id = Number(pixelId);
    const x = id % CANVAS_CONFIG.WIDTH;
    const y = Math.floor(id / CANVAS_CONFIG.WIDTH);
    
    const pixel: Pixel = {
      id,
      x,
      y,
      color: `#${color.toString(16).padStart(6, '0')}`,
      owner,
      lastModified: Number(timestamp)
    };

    const pixelMap = new Map([[id, pixel]]);
    onPixelUpdate(pixelMap);

    // Show notification for other users' pixels
    if (owner.toLowerCase() !== userAddress?.toLowerCase()) {
      console.log(`Pixel ${id} was placed by ${owner.slice(0, 6)}...${owner.slice(-4)} with color ${pixel.color}`);
    }
  }, [onPixelUpdate, userAddress]);

  const handleBatchPixelsPlaced = useCallback((
    owner: string,
    pixelIds: bigint[],
    colors: bigint[],
    totalFee: bigint,
    timestamp: bigint
  ) => {
    const pixelMap = new Map<number, Pixel>();
    
    for (let i = 0; i < pixelIds.length; i++) {
      const id = Number(pixelIds[i]);
      const x = id % CANVAS_CONFIG.WIDTH;
      const y = Math.floor(id / CANVAS_CONFIG.WIDTH);
      
      const pixel: Pixel = {
        id,
        x,
        y,
        color: `#${colors[i].toString(16).padStart(6, '0')}`,
        owner,
        lastModified: Number(timestamp)
      };
      
      pixelMap.set(id, pixel);
    }

    onPixelUpdate(pixelMap);

    // Show notification for other users' batch
    if (owner.toLowerCase() !== userAddress?.toLowerCase()) {
      console.log(`${pixelIds.length} pixels were placed by ${owner.slice(0, 6)}...${owner.slice(-4)}`);
    }
  }, [onPixelUpdate, userAddress]);

  useEffect(() => {
    if (!contract) return;

    // Set up event listeners
    const pixelPlacedFilter = contract.filters.PixelPlaced();
    const batchPixelsPlacedFilter = contract.filters.BatchPixelsPlaced();

    contract.on(pixelPlacedFilter, handlePixelPlaced);
    contract.on(batchPixelsPlacedFilter, handleBatchPixelsPlaced);

    return () => {
      contract.off(pixelPlacedFilter, handlePixelPlaced);
      contract.off(batchPixelsPlacedFilter, handleBatchPixelsPlaced);
    };
  }, [contract, handlePixelPlaced, handleBatchPixelsPlaced]);

  return {
    // Could add methods here for manual event querying if needed
  };
};