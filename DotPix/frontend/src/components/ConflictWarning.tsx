import React from 'react';

interface ConflictWarningProps {
  hasConflicts: boolean;
  conflictedPixels: number[];
  isCheckingConflicts: boolean;
  onProceedWithConflicts: () => void;
  onClearConflicts: () => void;
}

export const ConflictWarning: React.FC<ConflictWarningProps> = ({
  hasConflicts,
  conflictedPixels,
  isCheckingConflicts,
  onProceedWithConflicts,
  onClearConflicts
}) => {
  if (isCheckingConflicts) {
    return (
      <div style={{
        padding: '15px',
        background: '#ffa50020',
        borderRadius: '8px',
        margin: '10px 0',
        borderLeft: '4px solid #ffa500'
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          fontSize: '14px',
          color: '#ffa500'
        }}>
          <span style={{ marginRight: '8px' }}>🔍</span>
          Checking for pixel conflicts...
        </div>
      </div>
    );
  }

  if (!hasConflicts) {
    return null;
  }

  return (
    <div style={{
      padding: '15px',
      background: '#ff6b6b20',
      borderRadius: '8px',
      margin: '10px 0',
      borderLeft: '4px solid #ff6b6b'
    }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        marginBottom: '10px',
        fontSize: '14px',
        color: '#ff6b6b'
      }}>
        <span style={{ marginRight: '8px' }}>⚠️</span>
        <strong>Pixel Conflicts Detected</strong>
      </div>
      
      <div style={{ fontSize: '12px', color: '#ccc', marginBottom: '10px' }}>
        {conflictedPixels.length} of your selected pixels were recently modified by other users:
      </div>
      
      <div style={{ 
        fontSize: '11px', 
        fontFamily: 'monospace',
        color: '#ff6b6b',
        marginBottom: '15px',
        maxHeight: '60px',
        overflowY: 'auto'
      }}>
        {conflictedPixels.slice(0, 10).map(pixelId => {
          const x = pixelId % 2000;
          const y = Math.floor(pixelId / 2000);
          return `Pixel ${pixelId} (${x}, ${y})`;
        }).join(', ')}
        {conflictedPixels.length > 10 && ` ... and ${conflictedPixels.length - 10} more`}
      </div>

      <div style={{ fontSize: '12px', color: '#ccc', marginBottom: '15px' }}>
        You can still place pixels on conflicted areas, but they might overwrite recent artwork.
        Consider selecting different pixels to avoid conflicts.
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          onClick={onProceedWithConflicts}
          style={{
            padding: '8px 15px',
            backgroundColor: '#ff6b6b',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: 'bold'
          }}
        >
          Place Anyway
        </button>
        
        <button
          onClick={onClearConflicts}
          style={{
            padding: '8px 15px',
            backgroundColor: '#666',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '12px'
          }}
        >
          Clear Conflicts
        </button>
      </div>
    </div>
  );
};