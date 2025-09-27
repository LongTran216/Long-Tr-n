
import React from 'react';
import { AlertTriangleIcon } from './icons';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="w-full max-w-md text-center p-6 bg-red-900/20 border-2 border-red-500/50 rounded-2xl flex flex-col items-center justify-center">
      <AlertTriangleIcon className="w-12 h-12 text-red-400 mb-3" />
      <p className="font-bold text-red-300">An Error Occurred</p>
      <p className="text-sm text-red-400 mt-1">{message}</p>
    </div>
  );
};

export default ErrorMessage;
