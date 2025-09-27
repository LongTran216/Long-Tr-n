
import React from 'react';
import { MagicWandIcon } from './icons';

interface ControlPanelProps {
  prompt: string;
  onPromptChange: (prompt: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
  isReady: boolean;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ prompt, onPromptChange, onGenerate, isLoading, isReady }) => {
  return (
    <div className="space-y-4">
      <textarea
        value={prompt}
        onChange={(e) => onPromptChange(e.target.value)}
        placeholder="e.g., Make the sky a vibrant sunset"
        className="w-full h-28 p-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors duration-300 text-slate-100 placeholder-slate-400 resize-none"
        disabled={isLoading}
      />
      <button
        onClick={onGenerate}
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
            <span>Generate</span>
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
