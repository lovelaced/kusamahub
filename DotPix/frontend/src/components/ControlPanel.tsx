import React, { useState, useEffect } from 'react';

interface ControlPanelProps {
  selectedPixels: Set<number>;
  selectedColor: string;
  isLoading: boolean;
  onPlacePixels: () => void;
  onClearSelection: () => void;
  onCalculateFee: (count: number) => Promise<string>;
  contractAddress: string | null;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  selectedPixels,
  selectedColor,
  isLoading,
  onPlacePixels,
  onClearSelection,
  onCalculateFee,
  contractAddress
}) => {
  const [estimatedFee, setEstimatedFee] = useState<string>('0');

  useEffect(() => {
    const updateFee = async () => {
      if (selectedPixels.size > 0 && contractAddress) {
        try {
          const fee = await onCalculateFee(selectedPixels.size);
          setEstimatedFee(fee);
        } catch (error) {
          console.error('Error calculating fee:', error);
          setEstimatedFee('Error');
        }
      } else {
        setEstimatedFee('0');
      }
    };

    updateFee();
  }, [selectedPixels.size, onCalculateFee, contractAddress]);

  const canPlacePixels = selectedPixels.size > 0 && contractAddress && !isLoading;

  return (
    <div className="control-panel" style={{
      padding: '15px',
      background: '#1a1a1a',
      borderRadius: '8px',
      margin: '10px 0'
    }}>
      <h3 style={{ margin: '0 0 15px 0', fontSize: '16px' }}>Place Pixels</h3>
      
      <div style={{ marginBottom: '15px' }}>
        <div style={{ fontSize: '14px', marginBottom: '5px' }}>
          <strong>Selected Pixels:</strong> {selectedPixels.size}
          {selectedPixels.size > 100 && (
            <span style={{ color: '#ff6b6b', marginLeft: '5px' }}>
              (Max 100 per batch)
            </span>
          )}
        </div>
        
        <div style={{ fontSize: '14px', marginBottom: '5px' }}>
          <strong>Color:</strong>
          <span style={{
            display: 'inline-block',
            width: '20px',
            height: '20px',
            backgroundColor: selectedColor,
            marginLeft: '8px',
            border: '1px solid #333',
            borderRadius: '3px',
            verticalAlign: 'middle'
          }} />
          <span style={{ marginLeft: '8px', fontFamily: 'monospace' }}>
            {selectedColor.toUpperCase()}
          </span>
        </div>
        
        <div style={{ fontSize: '14px', marginBottom: '10px' }}>
          <strong>Estimated Fee:</strong> {estimatedFee} PAS
        </div>
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          onClick={onPlacePixels}
          disabled={!canPlacePixels || selectedPixels.size > 100}
          style={{
            padding: '10px 20px',
            backgroundColor: canPlacePixels && selectedPixels.size <= 100 ? '#4ecdc4' : '#666',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: canPlacePixels && selectedPixels.size <= 100 ? 'pointer' : 'not-allowed',
            fontSize: '14px',
            fontWeight: 'bold',
            flex: 1
          }}
        >
          {isLoading ? 'Placing...' : `Place ${selectedPixels.size} Pixel${selectedPixels.size !== 1 ? 's' : ''}`}
        </button>
        
        <button
          onClick={onClearSelection}
          disabled={selectedPixels.size === 0}
          style={{
            padding: '10px 15px',
            backgroundColor: selectedPixels.size > 0 ? '#ff6b6b' : '#666',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: selectedPixels.size > 0 ? 'pointer' : 'not-allowed',
            fontSize: '14px'
          }}
        >
          Clear
        </button>
      </div>

      {selectedPixels.size > 100 && (
        <div style={{
          marginTop: '10px',
          padding: '10px',
          backgroundColor: '#ff6b6b20',
          borderRadius: '5px',
          fontSize: '12px',
          color: '#ff6b6b'
        }}>
          ⚠️ You can only place up to 100 pixels in a single transaction. 
          Please reduce your selection or place pixels in multiple batches.
        </div>
      )}

      {!contractAddress && (
        <div style={{
          marginTop: '10px',
          padding: '10px',
          backgroundColor: '#ff6b6b20',
          borderRadius: '5px',
          fontSize: '12px',
          color: '#ff6b6b'
        }}>
          ⚠️ Contract address not set. Please check the application configuration.
        </div>
      )}
    </div>
  );
};