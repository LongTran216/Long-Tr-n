
import React from 'react';
import { SparklesIcon } from './icons';

interface ImageDisplayProps {
  originalImageUrl: string | null;
  editedImageUrl: string | null;
  responseText: string | null;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ originalImageUrl, editedImageUrl, responseText }) => {
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
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-center text-slate-400">Original</h3>
          <div className="aspect-square bg-slate-900/50 rounded-xl overflow-hidden flex items-center justify-center">
            <img src={originalImageUrl} alt="Original" className="max-h-full max-w-full object-contain" />
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-center text-slate-400">Edited</h3>
           <div className="aspect-square bg-slate-900/50 rounded-xl overflow-hidden flex items-center justify-center">
            {editedImageUrl ? (
                <img src={editedImageUrl} alt="Edited" className="max-h-full max-w-full object-contain" />
            ) : (
                <div className="text-slate-500 text-center p-4">Awaiting generation...</div>
            )}
          </div>
        </div>
      </div>
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
