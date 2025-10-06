import React from 'react';
import { MagicWandIcon, SparklesIcon } from './icons';

interface ControlPanelProps {
  prompt: string;
  onPromptChange: (prompt: string) => void;
  onGenerate: (promptOverride?: string) => void;
  isLoading: boolean;
  isReady: boolean;
  outputFormat: string;
  onOutputFormatChange: (format: string) => void;
  isEdited: boolean;
  blurAmount: number;
  onBlurChange: (value: number) => void;
  enhanceAmount: number;
  onEnhanceChange: (value: number) => void;
  textOverlay: string;
  onTextOverlayChange: (value: string) => void;
  fontFamily: string;
  onFontFamilyChange: (value: string) => void;
  fontSize: number;
  onFontSizeChange: (value: number) => void;
  fontColor: string;
  onFontColorChange: (value: string) => void;
  textPosition: string;
  onTextPositionChange: (value: string) => void;
}

const suggestions = [
    'Add a vintage, sepia-toned feel',
    'Enhance colors and make it more vibrant',
    'Convert to a black and white pencil sketch',
    'Make the background blurry (bokeh effect)',
    'Give it a dramatic, cinematic look with cool tones',
    'Change the season to winter with snow on the ground',
    'Add a magical glow to the subject',
];

const autoEnhancePrompt = 'Subtly enhance the lighting, color balance, and sharpness of this photo for a professional, crisp look. Do not make any other stylistic changes.';

const fontOptions = [
    'Arial', 'Verdana', 'Georgia', 'Times New Roman',
    'Courier New', 'Lucida Console', 'Impact', 'Comic Sans MS',
    "'Brush Script MT', cursive",
];

const positionOptions = {
    'top-left': 'Top Left', 'top-center': 'Top Center', 'top-right': 'Top Right',
    'middle-left': 'Middle Left', 'middle-center': 'Middle Center', 'middle-right': 'Middle Right',
    'bottom-left': 'Bottom Left', 'bottom-center': 'Bottom Center', 'bottom-right': 'Bottom Right',
};


const ControlPanel: React.FC<ControlPanelProps> = ({ 
  prompt, 
  onPromptChange, 
  onGenerate, 
  isLoading, 
  isReady, 
  outputFormat, 
  onOutputFormatChange,
  isEdited,
  blurAmount,
  onBlurChange,
  enhanceAmount,
  onEnhanceChange,
  textOverlay,
  onTextOverlayChange,
  fontFamily,
  onFontFamilyChange,
  fontSize,
  onFontSizeChange,
  fontColor,
  onFontColorChange,
  textPosition,
  onTextPositionChange
}) => {
  return (
    <div className="space-y-4">
       <button
        onClick={() => onGenerate(autoEnhancePrompt)}
        disabled={isLoading || !isReady}
        className="w-full flex items-center justify-center gap-2 bg-slate-700 text-cyan-300 font-semibold py-2.5 px-4 rounded-lg hover:bg-slate-600 transition-all duration-300 disabled:bg-slate-600 disabled:text-slate-400 disabled:cursor-not-allowed transform hover:scale-105 active:scale-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-500"
       >
        <SparklesIcon className="w-5 h-5" />
        <span>Auto-Enhance ✨</span>
      </button>

      <div className="relative flex items-center">
        <div className="w-full h-[1px] bg-slate-700"></div>
        <span className="absolute left-1/2 -translate-x-1/2 bg-slate-800 px-2 text-xs text-slate-500">OR</span>
      </div>

      <textarea
        value={prompt}
        onChange={(e) => onPromptChange(e.target.value)}
        placeholder="e.g., Make the sky a vibrant sunset"
        className="w-full h-28 p-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors duration-300 text-slate-100 placeholder-slate-400 resize-none"
        disabled={isLoading}
      />
       <div className="space-y-2">
        <label htmlFor="suggestion-select" className="block text-sm font-medium text-slate-300">
          Prompt Suggestions
        </label>
        <select
          id="suggestion-select"
          value=""
          onChange={(e) => {
            if (e.target.value) {
              onPromptChange(e.target.value);
            }
          }}
          disabled={isLoading}
          className="w-full p-2 bg-slate-700/50 border border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors duration-300 text-slate-100"
        >
          <option value="">Choose an idea...</option>
           {suggestions.map((suggestion, index) => (
            <option key={index} value={suggestion}>
              {suggestion}
            </option>
          ))}
        </select>
      </div>
      <div className="space-y-2">
        <label htmlFor="format-select" className="block text-sm font-medium text-slate-300">
          Output Format
        </label>
        <select
          id="format-select"
          value={outputFormat}
          onChange={(e) => onOutputFormatChange(e.target.value)}
          disabled={isLoading}
          className="w-full p-2 bg-slate-700/50 border border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors duration-300 text-slate-100"
        >
          <option value="image/png">PNG</option>
          <option value="image/jpeg">JPEG</option>
        </select>
      </div>
       <div className="space-y-4 pt-4 border-t border-slate-700/50">
        <h3 className="text-sm font-medium text-slate-300">Post-processing Adjustments</h3>
        <div className="space-y-2">
            <label htmlFor="blur-slider" className="flex justify-between text-sm font-medium text-slate-400">
                <span>Blur</span>
                <span className="font-mono text-xs bg-slate-700 px-1.5 py-0.5 rounded">{blurAmount.toFixed(1)}px</span>
            </label>
            <input
                id="blur-slider"
                type="range"
                min="0"
                max="10"
                step="0.1"
                value={blurAmount}
                onChange={(e) => onBlurChange(parseFloat(e.target.value))}
                disabled={isLoading || !isEdited}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-cyan-500"
            />
        </div>
        <div className="space-y-2">
            <label htmlFor="enhance-slider" className="flex justify-between text-sm font-medium text-slate-400">
                <span>Enhance</span>
                <span className="font-mono text-xs bg-slate-700 px-1.5 py-0.5 rounded">{enhanceAmount.toFixed(0)}</span>
            </label>
            <input
                id="enhance-slider"
                type="range"
                min="0"
                max="100"
                step="1"
                value={enhanceAmount}
                onChange={(e) => onEnhanceChange(parseFloat(e.target.value))}
                disabled={isLoading || !isEdited}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-cyan-500"
            />
        </div>
    </div>
    <div className="space-y-4 pt-4 border-t border-slate-700/50">
        <h3 className="text-sm font-medium text-slate-300">Text Overlay</h3>
        <div className="space-y-3">
          <textarea
            value={textOverlay}
            onChange={(e) => onTextOverlayChange(e.target.value)}
            placeholder="Add text to your image..."
            className="w-full h-20 p-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors duration-300 text-slate-100 placeholder-slate-400 resize-none"
            disabled={isLoading || !isEdited}
          />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="font-family-select" className="block text-xs font-medium text-slate-400 mb-1">Font</label>
              <select
                id="font-family-select"
                value={fontFamily}
                onChange={(e) => onFontFamilyChange(e.target.value)}
                disabled={isLoading || !isEdited}
                className="w-full p-2 bg-slate-700/50 border border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-sm"
              >
                {fontOptions.map(font => <option key={font} value={font}>{font.split(',')[0].replace(/'/g, '')}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="font-color-picker" className="block text-xs font-medium text-slate-400 mb-1">Color</label>
              <input
                id="font-color-picker"
                type="color"
                value={fontColor}
                onChange={(e) => onFontColorChange(e.target.value)}
                disabled={isLoading || !isEdited}
                className="w-full h-[42px] p-1 bg-slate-700/50 border border-slate-600 rounded-lg cursor-pointer"
              />
            </div>
          </div>
          <div>
            <label htmlFor="font-size-slider" className="flex justify-between text-xs font-medium text-slate-400 mb-1">
              <span>Size</span>
              <span className="font-mono text-xs bg-slate-700 px-1.5 py-0.5 rounded">{fontSize}px</span>
            </label>
            <input
              id="font-size-slider"
              type="range"
              min="10"
              max="200"
              step="1"
              value={fontSize}
              onChange={(e) => onFontSizeChange(parseInt(e.target.value, 10))}
              disabled={isLoading || !isEdited}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-cyan-500"
            />
          </div>
          <div>
            <label htmlFor="position-select" className="block text-xs font-medium text-slate-400 mb-1">Position</label>
            <select
              id="position-select"
              value={textPosition}
              onChange={(e) => onTextPositionChange(e.target.value)}
              disabled={isLoading || !isEdited}
              className="w-full p-2 bg-slate-700/50 border border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-sm"
            >
              {Object.entries(positionOptions).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
            </select>
          </div>
        </div>
      </div>
      <button
        onClick={() => onGenerate()}
        disabled={isLoading || !isReady || !prompt}
        className="w-full flex items-center justify-center gap-2 bg-cyan-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-cyan-500 transition-all duration-300 disabled:bg-slate-600 disabled:text-slate-400 disabled:cursor-not-allowed transform hover:scale-105 active:scale-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-500"
      >
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Generating...</span>
          </>
        ) : (
          <>
            <MagicWandIcon className="w-5 h-5" />
            <span>Generate with Prompt</span>
          </>
        )}
      </button>
      {!isReady && (
        <p className="text-xs text-center text-slate-500">Please upload an image to enable generation.</p>
      )}
    </div>
  );
};

export default ControlPanel;