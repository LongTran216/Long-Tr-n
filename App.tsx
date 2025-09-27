
import React, { useState, useCallback } from 'react';
import { editImageWithNanoBanana } from './services/geminiService';
import type { EditedImageResponse } from './types';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import ImageDisplay from './components/ImageDisplay';
import ControlPanel from './components/ControlPanel';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';
import { fileToBase64 } from './utils/fileUtils';

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);
  const [editedImageUrl, setEditedImageUrl] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [responseText, setResponseText] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = (file: File | null) => {
    if (file) {
      setOriginalImage(file);
      setOriginalImageUrl(URL.createObjectURL(file));
      setEditedImageUrl(null);
      setResponseText(null);
      setError(null);
    }
  };

  const handleGenerate = useCallback(async () => {
    if (!originalImage || !prompt) {
      setError('Please upload an image and enter a prompt.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setEditedImageUrl(null);
    setResponseText(null);

    try {
      const { base64, mimeType } = await fileToBase64(originalImage);
      const result: EditedImageResponse = await editImageWithNanoBanana(base64, mimeType, prompt);
      
      if (result.editedImageBase64) {
          setEditedImageUrl(`data:${mimeType};base64,${result.editedImageBase64}`);
      } else {
        setError("The AI did not return an image. It might have refused the request. Try a different prompt.");
      }
      setResponseText(result.responseText);

    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [originalImage, prompt]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 xl:col-span-3 space-y-6">
            <div className="bg-slate-800 p-6 rounded-2xl shadow-lg">
                <h2 className="text-xl font-bold mb-4 text-cyan-400">1. Upload Photo</h2>
                <ImageUploader onImageChange={handleImageChange} currentImageUrl={originalImageUrl} />
            </div>
             <div className="bg-slate-800 p-6 rounded-2xl shadow-lg">
                 <h2 className="text-xl font-bold mb-4 text-cyan-400">2. Describe Edit</h2>
                <ControlPanel
                    prompt={prompt}
                    onPromptChange={setPrompt}
                    onGenerate={handleGenerate}
                    isLoading={isLoading}
                    isReady={!!originalImage}
                />
            </div>
          </div>
          <div className="lg:col-span-8 xl:col-span-9">
            <div className="bg-slate-800 p-6 rounded-2xl shadow-lg relative min-h-[300px] lg:min-h-[600px] flex flex-col justify-center items-center">
              {isLoading && <Loader />}
              {error && !isLoading && <ErrorMessage message={error} />}
              
              {!isLoading && !error && (
                <ImageDisplay
                  originalImageUrl={originalImageUrl}
                  editedImageUrl={editedImageUrl}
                  responseText={responseText}
                />
              )}
            </div>
          </div>
        </div>
      </main>
       <footer className="text-center p-4 text-slate-500 text-sm">
        <p>Powered by Gemini. Built with React & Tailwind CSS.</p>
      </footer>
    </div>
  );
};

export default App;
