import React, { useRef, useEffect, useState, useCallback } from 'react';
import { CANVAS_CONFIG } from '../constants';
import { Pixel } from '../types';

interface CanvasProps {
  pixels: Map<number, Pixel>;
  selectedPixels: Set<number>;
  selectedColor: string;
  conflicts: Set<number>;
  onPixelClick: (pixelId: number) => void;
  onPixelHover: (pixelId: number | null) => void;
  hoveredPixel?: number | null;
}

export const Canvas: React.FC<CanvasProps> = ({
  pixels,
  selectedPixels,
  selectedColor,
  conflicts,
  onPixelClick,
  onPixelHover,
  hoveredPixel
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(10); // Start zoomed in to see grid
  const [pan, setPan] = useState({ x: 50, y: 50 }); // Start slightly panned in
  const [isDragging, setIsDragging] = useState(false);
  const [lastPanPoint, setLastPanPoint] = useState({ x: 0, y: 0 });

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Fill with white background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Save the current transform
    ctx.save();
    
    // Apply pan and zoom
    ctx.translate(pan.x, pan.y);
    ctx.scale(scale, scale);

    // Calculate visible area
    const viewLeft = Math.floor(-pan.x / scale);
    const viewTop = Math.floor(-pan.y / scale);
    const viewRight = Math.floor((canvas.width - pan.x) / scale);
    const viewBottom = Math.floor((canvas.height - pan.y) / scale);

    // Draw grid lines when zoomed in enough
    if (scale > 3) {
      // Lighter grid for medium zoom
      ctx.strokeStyle = scale > 8 ? '#d0d0d0' : '#e8e8e8';
      ctx.lineWidth = scale > 8 ? 1 / scale : 0.5 / scale;
      
      // Vertical lines
      for (let x = Math.max(0, viewLeft); x <= Math.min(CANVAS_CONFIG.WIDTH, viewRight); x++) {
        ctx.beginPath();
        ctx.moveTo(x, Math.max(0, viewTop));
        ctx.lineTo(x, Math.min(CANVAS_CONFIG.HEIGHT, viewBottom));
        ctx.stroke();
      }
      
      // Horizontal lines
      for (let y = Math.max(0, viewTop); y <= Math.min(CANVAS_CONFIG.HEIGHT, viewBottom); y++) {
        ctx.beginPath();
        ctx.moveTo(Math.max(0, viewLeft), y);
        ctx.lineTo(Math.min(CANVAS_CONFIG.WIDTH, viewRight), y);
        ctx.stroke();
      }
    }
    
    // Only render pixels in the visible area
    for (let y = Math.max(0, viewTop); y < Math.min(CANVAS_CONFIG.HEIGHT, viewBottom); y++) {
      for (let x = Math.max(0, viewLeft); x < Math.min(CANVAS_CONFIG.WIDTH, viewRight); x++) {
        const pixelId = y * CANVAS_CONFIG.WIDTH + x;
        const pixel = pixels.get(pixelId);
        
        let color = '#ffffff'; // Default white (empty pixel)
        let hasColor = false;
        
        if (pixel && pixel.color !== '#ffffff') {
          color = pixel.color;
          hasColor = true;
        }
        
        // Apply visual indicators
        if (selectedPixels.has(pixelId)) {
          ctx.fillStyle = selectedColor;
          ctx.globalAlpha = 0.8;
          ctx.fillRect(x, y, 1, 1);
          
          // Add selection border
          ctx.strokeStyle = '#4ecdc4';
          ctx.lineWidth = 0.1;
          ctx.globalAlpha = 1;
          ctx.strokeRect(x, y, 1, 1);
        } else if (conflicts.has(pixelId)) {
          if (hasColor) {
            ctx.fillStyle = color;
            ctx.globalAlpha = 1;
            ctx.fillRect(x, y, 1, 1);
          }
          
          // Add red border for conflicts
          ctx.strokeStyle = '#ff0000';
          ctx.lineWidth = 0.1;
          ctx.strokeRect(x, y, 1, 1);
        } else if (hasColor) {
          ctx.fillStyle = color;
          ctx.globalAlpha = 1;
          ctx.fillRect(x, y, 1, 1);
        }
        // If no color and not selected/conflicted, the white background shows through
      }
    }
    
    // Draw hover effect
    if (hoveredPixel !== null && hoveredPixel !== undefined) {
      const hoverX = hoveredPixel % CANVAS_CONFIG.WIDTH;
      const hoverY = Math.floor(hoveredPixel / CANVAS_CONFIG.WIDTH);
      
      if (hoverX >= viewLeft && hoverX < viewRight && hoverY >= viewTop && hoverY < viewBottom) {
        ctx.strokeStyle = '#666666';
        ctx.lineWidth = 0.15;
        ctx.setLineDash([0.3, 0.3]);
        ctx.strokeRect(hoverX, hoverY, 1, 1);
        ctx.setLineDash([]);
      }
    }
    
    // Draw canvas border
    ctx.strokeStyle = '#333333';
    ctx.lineWidth = 2 / scale;
    ctx.strokeRect(0, 0, CANVAS_CONFIG.WIDTH, CANVAS_CONFIG.HEIGHT);
    
    ctx.restore();
  }, [pixels, selectedPixels, selectedColor, conflicts, scale, pan, hoveredPixel]);

  const getPixelFromMouse = useCallback((e: React.MouseEvent): number | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Convert to canvas coordinates
    const canvasX = (mouseX - pan.x) / scale;
    const canvasY = (mouseY - pan.y) / scale;

    // Convert to pixel coordinates
    const pixelX = Math.floor(canvasX);
    const pixelY = Math.floor(canvasY);

    if (pixelX >= 0 && pixelX < CANVAS_CONFIG.WIDTH && 
        pixelY >= 0 && pixelY < CANVAS_CONFIG.HEIGHT) {
      return pixelY * CANVAS_CONFIG.WIDTH + pixelX;
    }

    return null;
  }, [scale, pan]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button === 0) { // Left click
      const pixelId = getPixelFromMouse(e);
      if (pixelId !== null) {
        onPixelClick(pixelId);
      }
    } else if (e.button === 1 || e.button === 2) { // Middle or right click for panning
      setIsDragging(true);
      setLastPanPoint({ x: e.clientX, y: e.clientY });
      e.preventDefault();
    }
  }, [getPixelFromMouse, onPixelClick]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isDragging) {
      const deltaX = e.clientX - lastPanPoint.x;
      const deltaY = e.clientY - lastPanPoint.y;
      
      setPan(prev => ({
        x: prev.x + deltaX,
        y: prev.y + deltaY
      }));
      
      setLastPanPoint({ x: e.clientX, y: e.clientY });
    } else {
      const pixelId = getPixelFromMouse(e);
      onPixelHover(pixelId);
    }
  }, [isDragging, lastPanPoint, getPixelFromMouse, onPixelHover]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
    const newScale = Math.max(0.05, Math.min(10, scale * zoomFactor));

    // Zoom towards mouse position
    const zoomPointX = (mouseX - pan.x) / scale;
    const zoomPointY = (mouseY - pan.y) / scale;

    setPan(prev => ({
      x: mouseX - zoomPointX * newScale,
      y: mouseY - zoomPointY * newScale
    }));

    setScale(newScale);
  }, [scale, pan]);

  // Resize canvas to container
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const resizeCanvas = () => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      draw();
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [draw]);

  // Redraw when dependencies change
  useEffect(() => {
    draw();
  }, [draw]);

  return (
    <div 
      ref={containerRef}
      className="canvas-container"
      style={{ 
        width: '100%', 
        height: '100%', 
        overflow: 'hidden',
        cursor: isDragging ? 'grabbing' : 'crosshair'
      }}
    >
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        onContextMenu={e => e.preventDefault()}
        style={{ display: 'block' }}
      />
      
      <div className="canvas-controls" style={{
        position: 'absolute',
        bottom: '10px',
        left: '10px',
        background: 'rgba(30,30,30,0.95)',
        padding: '10px',
        borderRadius: '5px',
        color: 'white',
        fontSize: '12px',
        border: '1px solid rgba(255,255,255,0.2)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
      }}>
        <div>Zoom: {(scale * 100).toFixed(1)}%</div>
        <div>Position: {Math.floor(-pan.x / scale)}, {Math.floor(-pan.y / scale)}</div>
        <div>Selected: {selectedPixels.size} pixels</div>
        {hoveredPixel !== null && hoveredPixel !== undefined && (
          <div style={{ marginTop: '5px' }}>
            Hover: ({hoveredPixel % CANVAS_CONFIG.WIDTH}, {Math.floor(hoveredPixel / CANVAS_CONFIG.WIDTH)})
          </div>
        )}
        <div style={{ marginTop: '5px', fontSize: '10px', opacity: 0.8 }}>
          <div>🖱️ Left click: Select pixel</div>
          <div>🖱️ Right/Middle drag: Pan</div>
          <div>⚲ Scroll: Zoom in/out</div>
        </div>
      </div>
    </div>
  );
};