import React, { useState, useMemo } from 'react';
import { SparklesIcon, DownloadIcon, ZoomInIcon, ZoomOutIcon, RefreshCwIcon, ReplaceIcon } from './icons';

interface ImageDisplayProps {
  originalImageUrl: string | null;
  editedImageUrl: string | null;
  responseText: string | null;
  blurAmount: number;
  enhanceAmount: number;
  onUseAsOriginal: (imageUrl: string) => void;
  textOverlay: string;
  fontFamily: string;
  fontSize: number;
  fontColor: string;
  textPosition: string;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ 
  originalImageUrl, 
  editedImageUrl, 
  responseText, 
  blurAmount, 
  enhanceAmount, 
  onUseAsOriginal,
  textOverlay,
  fontFamily,
  fontSize,
  fontColor,
  textPosition,
}) => {
  const [transform, setTransform] = useState({ scale: 1, x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });

  const imageFilterStyle = useMemo(() => {
    const saturate = 1 + (enhanceAmount / 100);
    const contrast = 1 + (enhanceAmount / 200);
    const filters = [];
    if (blurAmount > 0) filters.push(`blur(${blurAmount}px)`);
    if (enhanceAmount > 0) filters.push(`saturate(${saturate}) contrast(${contrast})`);
    return { filter: filters.join(' ') };
  }, [blurAmount, enhanceAmount]);

  const textPreviewStyle = useMemo(() => ({
      fontFamily: fontFamily,
      fontSize: `${fontSize}px`,
      color: fontColor,
      textShadow: '0px 0px 5px rgba(0,0,0,0.7)',
  }), [fontFamily, fontSize, fontColor]);

  const textPreviewPositionClasses = useMemo(() => {
      const classes = ['absolute', 'p-4', 'w-full', 'h-full', 'flex', 'pointer-events-none'];
      const [y, x] = textPosition.split('-');
      
      switch (y) {
          case 'top': classes.push('items-start'); break;
          case 'middle': classes.push('items-center'); break;
          case 'bottom': classes.push('items-end'); break;
      }

      switch (x) {
          case 'left': classes.push('justify-start', 'text-left'); break;
          case 'center': classes.push('justify-center', 'text-center'); break;
          case 'right': classes.push('justify-end', 'text-right'); break;
      }
      return classes.join(' ');
  }, [textPosition]);

  const handleDownload = () => {
    if (!editedImageUrl) return;

    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        console.error('Could not get canvas context. Falling back to direct download.');
        const link = document.createElement('a');
        link.href = editedImageUrl;
        link.download = 'edited-image-unfiltered.png';
        link.click();
        return;
      }
      
      if (imageFilterStyle.filter) {
        ctx.filter = imageFilterStyle.filter;
      }

      ctx.drawImage(image, 0, 0);

      // Draw text overlay on canvas if it exists
      if (textOverlay) {
        ctx.filter = 'none'; // Ensure text itself is not filtered
        ctx.font = `${fontSize}px ${fontFamily}`;
        ctx.fillStyle = fontColor;
        
        const [yPos, xPos] = textPosition.split('-');
        const padding = 20;
        let x, y;

        // Set alignment based on position
        switch (xPos) {
            case 'left': ctx.textAlign = 'left'; x = padding; break;
            case 'center': ctx.textAlign = 'center'; x = canvas.width / 2; break;
            case 'right': ctx.textAlign = 'right'; x = canvas.width - padding; break;
            default: ctx.textAlign = 'center'; x = canvas.width / 2;
        }

        switch (yPos) {
            case 'top': ctx.textBaseline = 'top'; y = padding; break;
            case 'middle': ctx.textBaseline = 'middle'; y = canvas.height / 2; break;
            case 'bottom': ctx.textBaseline = 'bottom'; y = canvas.height - padding; break;
            default: ctx.textBaseline = 'bottom'; y = canvas.height - padding;
        }
        
        ctx.fillText(textOverlay, x, y);
      }


      const mimeTypeMatch = editedImageUrl.match(/data:(image\/(jpeg|png));base64/);
      const mimeType = mimeTypeMatch ? mimeTypeMatch[1] : 'image/png';
      const extension = mimeTypeMatch ? mimeTypeMatch[2] : 'png';
      
      const quality = mimeType === 'image/jpeg' ? 0.95 : undefined;
      const filteredDataUrl = canvas.toDataURL(mimeType, quality);

      const link = document.createElement('a');
      link.href = filteredDataUrl;
      link.download = `edited-image.${extension}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    image.onerror = () => {
      console.error("Failed to load image onto canvas for download.");
      alert("Could not process image for download. Please try saving the image directly from the screen.");
    };

    image.src = editedImageUrl;
  };

  const handleZoomIn = () => setTransform(t => ({ ...t, scale: Math.min(t.scale * 1.25, 8) }));
  const handleZoomOut = () => setTransform(t => ({ ...t, scale: Math.max(t.scale / 1.25, 0.5) }));
  const handleReset = () => setTransform({ scale: 1, x: 0, y: 0 });

  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsPanning(true);
    setPanStart({ x: e.clientX - transform.x, y: e.clientY - transform.y });
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isPanning) return;
    setTransform(t => ({ ...t, x: e.clientX - panStart.x, y: e.clientY - panStart.y }));
  };

  const onMouseUpOrLeave = () => setIsPanning(false);

  const onWheel = (e: React.WheelEvent) => {
    if (e.deltaY < 0) handleZoomIn(); else handleZoomOut();
  };
  
  if (!originalImageUrl) {
    return (
      <div className="text-center text-slate-400 flex flex-col items-center justify-center h-full">
        <SparklesIcon className="w-16 h-16 mb-4 text-slate-600"/>
        <h3 className="text-2xl font-bold text-slate-300">Your Edited Photo Will Appear Here</h3>
        <p className="mt-2 max-w-md">Upload a photo and provide an editing prompt to get started. Let's create something amazing!</p>
      </div>
    );
  }

  return (
    <div className="w-full" onMouseMove={onMouseMove} onMouseUp={onMouseUpOrLeave} onMouseLeave={onMouseUpOrLeave}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-center text-slate-400">Original</h3>
          <div 
            className="aspect-square bg-slate-900/50 rounded-xl overflow-hidden flex items-center justify-center cursor-move"
            onMouseDown={onMouseDown}
            onWheel={onWheel}
          >
            <img 
              src={originalImageUrl} 
              alt="Original" 
              className="object-contain transition-transform duration-100 ease-out"
              style={{ 
                transform: `scale(${transform.scale}) translate(${transform.x}px, ${transform.y}px)`,
                width: '100%',
                height: '100%',
              }} 
            />
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-center text-slate-400">Edited</h3>
           <div 
            className="aspect-square bg-slate-900/50 rounded-xl overflow-hidden flex items-center justify-center relative cursor-move"
            onMouseDown={onMouseDown}
            onWheel={onWheel}
           >
            {editedImageUrl ? (
              <>
                <img 
                  src={editedImageUrl} 
                  alt="Edited" 
                  className="object-contain transition-transform duration-100 ease-out"
                  style={{
                    ...imageFilterStyle,
                    transform: `scale(${transform.scale}) translate(${transform.x}px, ${transform.y}px)`,
                    width: '100%',
                    height: '100%',
                  }}
                />
                 {textOverlay && (
                    <div className={textPreviewPositionClasses}>
                        <span style={textPreviewStyle}>{textOverlay}</span>
                    </div>
                )}
                <div className="absolute bottom-3 right-3 flex items-center gap-2 z-10">
                   <button
                    onClick={() => onUseAsOriginal(editedImageUrl)}
                    className="bg-slate-900/70 text-white p-3 rounded-full hover:bg-cyan-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-cyan-500"
                    aria-label="Use edited image as new original"
                    title="Use as Original"
                  >
                    <ReplaceIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleDownload}
                    className="bg-slate-900/70 text-white p-3 rounded-full hover:bg-cyan-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-cyan-500"
                    aria-label="Download edited image"
                    title="Download edited image"
                  >
                    <DownloadIcon className="w-5 h-5" />
                  </button>
                </div>
              </>
            ) : (
                <div className="text-slate-500 text-center p-4">Awaiting generation...</div>
            )}
          </div>
        </div>
      </div>
       {originalImageUrl && (
        <div className="flex justify-center items-center gap-2 mt-4 p-2 bg-slate-900/50 rounded-full max-w-xs mx-auto">
          <button onClick={handleZoomOut} className="p-2 rounded-full hover:bg-slate-700 transition-colors" aria-label="Zoom out" title="Zoom Out">
            <ZoomOutIcon className="w-5 h-5" />
          </button>
          <span className="font-mono text-sm w-16 text-center tabular-nums">{Math.round(transform.scale * 100)}%</span>
          <button onClick={handleZoomIn} className="p-2 rounded-full hover:bg-slate-700 transition-colors" aria-label="Zoom in" title="Zoom In">
            <ZoomInIcon className="w-5 h-5" />
          </button>
          <div className="border-l border-slate-600 h-6 mx-2"></div>
          <button onClick={handleReset} className="p-2 rounded-full hover:bg-slate-700 transition-colors" aria-label="Reset view" title="Reset View">
            <RefreshCwIcon className="w-5 h-5" />
          </button>
        </div>
      )}
      {responseText && (
        <div className="mt-6 bg-slate-900/50 p-4 rounded-xl border border-slate-700">
            <h4 className="font-bold text-cyan-400 mb-2">AI Response:</h4>
            <p className="text-slate-300 text-sm">{responseText}</p>
        </div>
      )}
    </div>
  );
};

export default ImageDisplay;