import React, { useRef } from 'react';
import { UploadCloudIcon, FONT_TITLE } from '../constants';

interface PdfUploadButtonProps {
  onFileSelect: (file: File) => void;
  disabled?: boolean;
}

export const PdfUploadButton: React.FC<PdfUploadButtonProps> = ({ onFileSelect, disabled }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      onFileSelect(file);
    } else if (file) {
      alert('Por favor, selecione um arquivo PDF.');
    }
    if(event.target) {
      event.target.value = '';
    }
  };

  return (
    <>
      <input
        type="file"
        accept="application/pdf"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        disabled={disabled}
      />
      <button
        onClick={handleButtonClick}
        disabled={disabled}
        className={`w-full bg-accent-yellow hover:bg-amber-600 dark:bg-amber-500 dark:hover:bg-amber-400 text-accent-cta-text dark:text-slate-900 font-bold py-4 px-6 rounded-lg text-xl transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-400 dark:focus:ring-amber-300 focus:ring-opacity-75 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center ${FONT_TITLE}`}
        aria-label="Carregar arquivo PDF"
      >
        <UploadCloudIcon className="h-8 w-8 mr-3" />
        Carregar PDF
      </button>
    </>
  );
};