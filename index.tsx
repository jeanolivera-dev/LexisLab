
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import * as pdfjsLib from 'pdfjs-dist'; // Import to access GlobalWorkerOptions and version

// PDF.js worker configuration:
// Dynamically get the version of pdfjs-dist that was loaded via import map.
const pdfjsVersion = pdfjsLib.version;

// Explicitly set the workerSrc to point to the ES module worker script
// on esm.sh, matching the version of the main pdfjs-dist library.
// The path 'build/pdf.worker.mjs' is for the module worker.
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://esm.sh/pdfjs-dist@${pdfjsVersion}/build/pdf.worker.mjs`;

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);