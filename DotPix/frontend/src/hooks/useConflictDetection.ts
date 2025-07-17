import { useState, useCallback, useEffect } from 'react';
import { ethers } from 'ethers';

interface ConflictDetectionProps {
  contract: ethers.Contract | null;
  selectedPixels: Set<number>;
  userAddress: string | null;
}

export const useConflictDetection = ({ 
  contract, 
  selectedPixels, 
  userAddress 
}: ConflictDetectionProps) => {
  const [conflicts, setConflicts] = useState<Set<number>>(new Set());
  const [isCheckingConflicts, setIsCheckingConflicts] = useState(false);

  const checkPixelConflicts = useCallback(async () => {
    if (!contract || selectedPixels.size === 0 || !userAddress) {
      setConflicts(new Set());
      return;
    }

    setIsCheckingConflicts(true);
    const newConflicts = new Set<number>();

    try {
      // Check each selected pixel for conflicts
      const pixelIds = Array.from(selectedPixels);
      const chunkSize = 10; // Check in small chunks to avoid overwhelming the RPC
      
      for (let i = 0; i < pixelIds.length; i += chunkSize) {
        const chunk = pixelIds.slice(i, i + chunkSize);
        
        // Check multiple pixels in parallel within the chunk
        const conflictChecks = chunk.map(async (pixelId) => {
          try {
            const [owner, , lastModified] = await contract.getPixel(pixelId);
            
            // Consider it a conflict if:
            // 1. The pixel is owned by someone else
            // 2. The pixel was modified recently (within last 5 minutes)
            const isOwnedByOther = owner !== '0x0000000000000000000000000000000000000000' && 
                                   owner.toLowerCase() !== userAddress.toLowerCase();
            const wasRecentlyModified = Number(lastModified) > (Date.now() / 1000) - 300; // 5 minutes
            
            if (isOwnedByOther && wasRecentlyModified) {
              return pixelId;
            }
            
            return null;
          } catch (error) {
            console.warn(`Error checking pixel ${pixelId}:`, error);
            return null;
          }
        });

        const chunkResults = await Promise.all(conflictChecks);
        chunkResults.forEach(pixelId => {
          if (pixelId !== null) {
            newConflicts.add(pixelId);
          }
        });

        // Small delay between chunks to avoid rate limiting
        if (i + chunkSize < pixelIds.length) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      }
    } catch (error) {
      console.error('Error checking conflicts:', error);
    } finally {
      setConflicts(newConflicts);
      setIsCheckingConflicts(false);
    }
  }, [contract, selectedPixels, userAddress]);

  // Debounced conflict checking
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      checkPixelConflicts();
    }, 500); // 500ms debounce

    return () => clearTimeout(timeoutId);
  }, [checkPixelConflicts]);

  const hasConflicts = conflicts.size > 0;
  const conflictedPixels = Array.from(conflicts);

  return {
    conflicts,
    hasConflicts,
    conflictedPixels,
    isCheckingConflicts,
    recheckConflicts: checkPixelConflicts
  };
};