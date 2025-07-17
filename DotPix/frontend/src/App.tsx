import React, { useState, useCallback, useEffect } from 'react';
import { Canvas } from './components/Canvas';
import { ColorPicker } from './components/ColorPicker';
import { WalletPanel } from './components/WalletPanel';
import { ControlPanel } from './components/ControlPanel';
import { ConflictWarning } from './components/ConflictWarning';
import { useWallet } from './hooks/useWallet';
import { useContract } from './hooks/useContract';
import { useConflictDetection } from './hooks/useConflictDetection';
import { useRealtimeUpdates } from './hooks/useRealtimeUpdates';
import { Pixel, CanvasState } from './types';
import { CANVAS_CONFIG } from './constants';

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS || null;

const App: React.FC = () => {
  const { walletState, provider, connectWallet, disconnectWallet } = useWallet();
  const { 
    contract,
    isLoading,
    placePixel,
    placePixelsBatch,
    getPixel,
    getPixelsByRange,
    calculatePixelFee,
    getPixelId
  } = useContract({ 
    provider, 
    contractAddress: CONTRACT_ADDRESS 
  });

  const [canvasState, setCanvasState] = useState<CanvasState>({
    pixels: new Map(),
    selectedPixels: new Set(),
    selectedColor: '#FF0000',
    isLoading: false,
    conflicts: new Set()
  });

  const [hoveredPixel, setHoveredPixel] = useState<number | null>(null);

  // Real-time conflict detection
  const { 
    conflicts,
    hasConflicts,
    conflictedPixels,
    isCheckingConflicts
  } = useConflictDetection({
    contract,
    selectedPixels: canvasState.selectedPixels,
    userAddress: walletState.address
  });

  // Real-time canvas updates
  const handlePixelUpdate = useCallback((newPixels: Map<number, Pixel>) => {
    setCanvasState(prev => ({
      ...prev,
      pixels: new Map([...prev.pixels, ...newPixels])
    }));
  }, []);

  useRealtimeUpdates({
    contract,
    onPixelUpdate: handlePixelUpdate,
    userAddress: walletState.address
  });

  // Update conflicts in canvas state
  useEffect(() => {
    setCanvasState(prev => ({ ...prev, conflicts }));
  }, [conflicts]);

  // Load initial canvas data from events
  useEffect(() => {
    const loadCanvasData = async () => {
      if (!contract) return;
      
      setCanvasState(prev => ({ ...prev, isLoading: true }));
      
      try {
        console.log('Loading canvas data from blockchain events...');
        
        // Get all PixelPlaced events
        const pixelPlacedFilter = contract.filters.PixelPlaced();
        const batchPixelsPlacedFilter = contract.filters.BatchPixelsPlaced();
        
        // Query past events (from block 0 to latest)
        const [singleEvents, batchEvents] = await Promise.all([
          contract.queryFilter(pixelPlacedFilter, 0, 'latest'),
          contract.queryFilter(batchPixelsPlacedFilter, 0, 'latest')
        ]);
        
        console.log(`Found ${singleEvents.length} single pixel events and ${batchEvents.length} batch events`);
        
        const newPixels = new Map<number, Pixel>();
        
        // Process single pixel events
        for (const event of singleEvents) {
          if ('args' in event && event.args) {
            const pixelId = Number(event.args[0]);
            const owner = event.args[1];
            const color = Number(event.args[2]);
            const timestamp = Number(event.args[4]);
            
            const x = pixelId % CANVAS_CONFIG.WIDTH;
            const y = Math.floor(pixelId / CANVAS_CONFIG.WIDTH);
            
            newPixels.set(pixelId, {
              id: pixelId,
              x,
              y,
              color: `#${color.toString(16).padStart(6, '0')}`,
              owner,
              lastModified: timestamp
            });
          }
        }
        
        // Process batch pixel events
        for (const event of batchEvents) {
          if ('args' in event && event.args) {
            const owner = event.args[0];
            const pixelIds = event.args[1];
            const colors = event.args[2];
            const timestamp = Number(event.args[4]);
            
            for (let i = 0; i < pixelIds.length; i++) {
              const pixelId = Number(pixelIds[i]);
              const color = Number(colors[i]);
              
              const x = pixelId % CANVAS_CONFIG.WIDTH;
              const y = Math.floor(pixelId / CANVAS_CONFIG.WIDTH);
              
              newPixels.set(pixelId, {
                id: pixelId,
                x,
                y,
                color: `#${color.toString(16).padStart(6, '0')}`,
                owner,
                lastModified: timestamp
              });
            }
          }
        }
        
        console.log(`Loaded ${newPixels.size} pixels from blockchain`);
        setCanvasState(prev => ({ ...prev, pixels: newPixels }));
        
      } catch (error) {
        console.error('Error loading canvas data:', error);
      } finally {
        setCanvasState(prev => ({ ...prev, isLoading: false }));
      }
    };

    loadCanvasData();
  }, [contract]);

  const handlePixelClick = useCallback((pixelId: number) => {
    setCanvasState(prev => {
      const newSelected = new Set(prev.selectedPixels);
      if (newSelected.has(pixelId)) {
        newSelected.delete(pixelId);
      } else {
        newSelected.add(pixelId);
      }
      return { ...prev, selectedPixels: newSelected };
    });
  }, []);

  const handlePixelHover = useCallback((pixelId: number | null) => {
    setHoveredPixel(pixelId);
  }, []);

  const handleColorChange = useCallback((color: string) => {
    setCanvasState(prev => ({ ...prev, selectedColor: color }));
  }, []);

  const handleClearSelection = useCallback(() => {
    setCanvasState(prev => ({ 
      ...prev, 
      selectedPixels: new Set(),
      conflicts: new Set()
    }));
  }, []);

  const handleCalculateFee = useCallback(async (count: number): Promise<string> => {
    if (!contract) return '0';
    return await calculatePixelFee(count);
  }, [calculatePixelFee, contract]);

  const handlePlacePixels = useCallback(async () => {
    if (!contract || canvasState.selectedPixels.size === 0) return;

    try {
      setCanvasState(prev => ({ ...prev, isLoading: true }));

      const pixelIds = Array.from(canvasState.selectedPixels);
      const colors = pixelIds.map(() => canvasState.selectedColor);

      let tx;
      if (pixelIds.length === 1) {
        tx = await placePixel(pixelIds[0], canvasState.selectedColor);
      } else {
        tx = await placePixelsBatch(pixelIds, colors);
      }

      // Update local state optimistically
      const newPixels = new Map(canvasState.pixels);
      for (const pixelId of pixelIds) {
        const x = pixelId % CANVAS_CONFIG.WIDTH;
        const y = Math.floor(pixelId / CANVAS_CONFIG.WIDTH);
        newPixels.set(pixelId, {
          id: pixelId,
          x,
          y,
          color: canvasState.selectedColor,
          owner: walletState.address!,
          lastModified: Date.now() / 1000
        });
      }

      setCanvasState(prev => ({
        ...prev,
        pixels: newPixels,
        selectedPixels: new Set(),
        conflicts: new Set()
      }));

      console.log('Pixels placed successfully:', tx);
    } catch (error) {
      console.error('Error placing pixels:', error);
      alert(`Error placing pixels: ${error}`);
    } finally {
      setCanvasState(prev => ({ ...prev, isLoading: false }));
    }
  }, [
    contract,
    canvasState.selectedPixels,
    canvasState.selectedColor,
    canvasState.pixels,
    placePixel,
    placePixelsBatch,
    walletState.address
  ]);

  const isCorrectNetwork = walletState.chainId === parseInt('420420422');
  const canInteract = walletState.isConnected && isCorrectNetwork && CONTRACT_ADDRESS;

  return (
    <div style={{ 
      display: 'flex', 
      height: '100vh', 
      backgroundColor: '#0a0a0a',
      color: 'white',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Sidebar */}
      <div style={{ 
        width: '300px', 
        padding: '20px', 
        borderRight: '1px solid #333',
        overflowY: 'auto'
      }}>
        <h1 style={{ 
          margin: '0 0 20px 0', 
          fontSize: '24px',
          textAlign: 'center',
          color: '#4ecdc4'
        }}>
          DotPix
        </h1>
        <p style={{ 
          margin: '0 0 20px 0', 
          fontSize: '14px', 
          color: '#ccc',
          textAlign: 'center'
        }}>
          Collaborative pixel art on PASEO network
        </p>

        <WalletPanel
          walletState={walletState}
          onConnect={connectWallet}
          onDisconnect={disconnectWallet}
        />

        {canInteract && (
          <>
            <ColorPicker
              selectedColor={canvasState.selectedColor}
              onColorChange={handleColorChange}
            />

            <ConflictWarning
              hasConflicts={hasConflicts}
              conflictedPixels={conflictedPixels}
              isCheckingConflicts={isCheckingConflicts}
              onProceedWithConflicts={handlePlacePixels}
              onClearConflicts={() => {
                const conflictSet = new Set(conflictedPixels);
                const newSelected = new Set([...canvasState.selectedPixels].filter(id => !conflictSet.has(id)));
                setCanvasState(prev => ({ ...prev, selectedPixels: newSelected }));
              }}
            />

            <ControlPanel
              selectedPixels={canvasState.selectedPixels}
              selectedColor={canvasState.selectedColor}
              isLoading={canvasState.isLoading || isLoading}
              onPlacePixels={handlePlacePixels}
              onClearSelection={handleClearSelection}
              onCalculateFee={handleCalculateFee}
              contractAddress={CONTRACT_ADDRESS}
            />
          </>
        )}

        {/* Info Panel */}
        <div style={{
          padding: '15px',
          background: '#1a1a1a',
          borderRadius: '8px',
          marginTop: '20px',
          fontSize: '12px',
          color: '#ccc'
        }}>
          <h4 style={{ margin: '0 0 10px 0' }}>Canvas Info</h4>
          <div>Size: {CANVAS_CONFIG.WIDTH} × {CANVAS_CONFIG.HEIGHT}</div>
          <div>Total Pixels: {CANVAS_CONFIG.TOTAL_PIXELS.toLocaleString()}</div>
          <div>Loaded Pixels: {canvasState.pixels.size.toLocaleString()}</div>
          {hoveredPixel !== null && (
            <div style={{ marginTop: '10px' }}>
              <strong>Hovered Pixel:</strong><br />
              ID: {hoveredPixel}<br />
              X: {hoveredPixel % CANVAS_CONFIG.WIDTH}<br />
              Y: {Math.floor(hoveredPixel / CANVAS_CONFIG.WIDTH)}
            </div>
          )}
        </div>
      </div>

      {/* Main Canvas Area */}
      <div style={{ flex: 1, position: 'relative' }}>
        {canInteract ? (
          <Canvas
            pixels={canvasState.pixels}
            selectedPixels={canvasState.selectedPixels}
            selectedColor={canvasState.selectedColor}
            conflicts={canvasState.conflicts}
            onPixelClick={handlePixelClick}
            onPixelHover={handlePixelHover}
            hoveredPixel={hoveredPixel}
          />
        ) : (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            fontSize: '18px',
            color: '#666'
          }}>
            {!walletState.isConnected 
              ? 'Connect your wallet to start painting'
              : !isCorrectNetwork
              ? 'Switch to PASEO TestNet to continue'
              : !CONTRACT_ADDRESS
              ? 'Contract address not configured'
              : 'Loading...'
            }
          </div>
        )}
      </div>
    </div>
  );
};

export default App;