
import React from 'react';
import { BananaIcon } from './icons';

const Header: React.FC = () => {
  return (
    <header className="bg-slate-800/50 backdrop-blur-sm sticky top-0 z-10 border-b border-slate-700">
      <div className="container mx-auto px-4 md:px-8 py-4 flex items-center gap-4">
        <BananaIcon className="w-8 h-8 text-yellow-300"/>
        <div>
            <h1 className="text-2xl font-bold text-white">AI Photo Editor</h1>
            <p className="text-sm text-slate-400">Edit your photos with the power of Nano Banana AI.</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
