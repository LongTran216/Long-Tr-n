
import React from 'react';
import { SparklesIcon } from './icons';

const Loader: React.FC = () => {
  return (
    <div className="absolute inset-0 bg-slate-800/80 backdrop-blur-sm flex flex-col items-center justify-center z-10 rounded-2xl">
      <SparklesIcon className="w-16 h-16 text-cyan-400 animate-pulse" />
      <p className="mt-4 text-xl font-semibold text-slate-200">AI is thinking...</p>
      <p className="text-slate-400">This may take a moment.</p>
    </div>
  );
};

export default Loader;
