import React from 'react';
import { DEFAULT_COLORS } from '../constants';

interface ColorPickerProps {
  selectedColor: string;
  onColorChange: (color: string) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
  selectedColor,
  onColorChange
}) => {
  return (
    <div className="color-picker" style={{
      padding: '15px',
      background: '#1a1a1a',
      borderRadius: '8px',
      margin: '10px 0'
    }}>
      <h3 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>Choose Color</h3>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(8, 1fr)',
        gap: '8px',
        marginBottom: '15px'
      }}>
        {DEFAULT_COLORS.map((color) => (
          <button
            key={color}
            onClick={() => onColorChange(color)}
            style={{
              width: '30px',
              height: '30px',
              backgroundColor: color,
              border: selectedColor === color ? '3px solid #fff' : '1px solid #333',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            title={color}
          />
        ))}
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <label style={{ fontSize: '14px' }}>Custom:</label>
        <input
          type="color"
          value={selectedColor}
          onChange={(e) => onColorChange(e.target.value)}
          style={{
            width: '40px',
            height: '30px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        />
        <span style={{ 
          fontSize: '12px', 
          fontFamily: 'monospace',
          background: '#333',
          padding: '2px 6px',
          borderRadius: '3px'
        }}>
          {selectedColor.toUpperCase()}
        </span>
      </div>
    </div>
  );
};