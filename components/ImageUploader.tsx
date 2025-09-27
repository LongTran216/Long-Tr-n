
import React, { useCallback, useRef } from 'react';
import { UploadIcon } from './icons';

interface ImageUploaderProps {
  onImageChange: (file: File | null) => void;
  currentImageUrl: string | null;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageChange, currentImageUrl }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageChange(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleDrop = useCallback((event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
        onImageChange(file);
    }
  }, [onImageChange]);

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
      />
      <label
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="cursor-pointer bg-slate-700/50 border-2 border-dashed border-slate-600 rounded-xl p-4 flex flex-col items-center justify-center text-center hover:border-cyan-400 hover:bg-slate-700 transition-colors duration-300 aspect-square"
      >
        {currentImageUrl ? (
          <img src={currentImageUrl} alt="Uploaded preview" className="max-h-full max-w-full object-contain rounded-lg" />
        ) : (
          <div className="space-y-2">
            <UploadIcon className="w-10 h-10 mx-auto text-slate-400" />
            <p className="text-slate-300 font-semibold">Click to upload</p>
            <p className="text-xs text-slate-500">or drag and drop</p>
          </div>
        )}
      </label>
    </div>
  );
};

export default ImageUploader;
