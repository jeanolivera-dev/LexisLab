import React, { useState, useCallback, useEffect } from 'react';
import { PdfUploadButton } from './components/PdfUploadButton';
import { LoadingOverlay } from './components/LoadingOverlay';
import { Header } from './components/Header';
import { HelpModal } from './components/HelpModal';
import { extractTextFromPdf } from './services/pdfProcessor';
import { generateDidacticMaterial, generateInteractivePage } from './services/geminiService';
import { 
  BookOpenIcon, AlertTriangleIcon, DocumentTextIcon, CogIcon, ArrowPathIcon,
  InteractiveLearningIcon, // Added new icon
  FONT_BODY, FONT_TITLE
} from './constants';
import * as pdfjsLib from 'pdfjs-dist';

const App: React.FC = () => {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfName, setPdfName] = useState<string | null>(null);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [startPage, setStartPage] = useState<string>('1');
  const [endPage, setEndPage] = useState<string>('');

  const [didacticMaterial, setDidacticMaterial] = useState<string | null>(null);
  const [generatedHtml, setGeneratedHtml] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

  const resetStateForNewFile = () => {
    setPdfFile(null);
    setPdfName(null);
    setNumPages(null);
    setStartPage('1');
    setEndPage('');
    setDidacticMaterial(null);
    setGeneratedHtml(null);
    setError(null);
    setIsLoading(false);
    setLoadingMessage('');
  };

  const handleFileSelected = useCallback(async (file: File) => {
    resetStateForNewFile();
    setPdfFile(file);
    setPdfName(file.name);
    setIsLoading(true);
    setLoadingMessage('Lendo informações do PDF...');
    setError(null);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      setNumPages(pdfDoc.numPages);
      setStartPage('1');
      setEndPage(String(pdfDoc.numPages));
    } catch (err) {
      console.error("Erro ao ler informações do PDF:", err);
      setError(err instanceof Error ? `Erro ao ler PDF: ${err.message}` : 'Erro desconhecido ao ler PDF.');
      resetStateForNewFile();
    } finally {
      setIsLoading(false);
      setLoadingMessage('');
    }
  }, []);

  const handleProcessRequest = useCallback(async () => {
    if (!pdfFile || !numPages) {
      setError("Nenhum arquivo PDF selecionado ou informações do PDF ausentes.");
      return;
    }

    const sPage = parseInt(startPage, 10);
    const ePage = parseInt(endPage, 10);

    if (isNaN(sPage) || isNaN(ePage) || sPage < 1 || ePage > numPages || sPage > ePage) {
      setError(`Intervalo de páginas inválido. Por favor, insira valores entre 1 e ${numPages}, com Início <= Fim.`);
      return;
    }

    setError(null);
    setDidacticMaterial(null);
    setGeneratedHtml(null);
    setIsLoading(true);

    try {
      setLoadingMessage(`Extraindo texto do PDF (páginas ${sPage}-${ePage})...`);
      const pdfText = await extractTextFromPdf(pdfFile, sPage, ePage);
      if (!pdfText.trim()) {
        throw new Error('O intervalo de páginas selecionado parece estar vazio ou não contém texto legível.');
      }

      setLoadingMessage('Gerando material didático com IA (Agente 1)...');
      const material = await generateDidacticMaterial(pdfText);
      setDidacticMaterial(material);

      setLoadingMessage('Gerando página web interativa com IA (Agente 2)...');
      const htmlContent = await generateInteractivePage(material);
      setGeneratedHtml(htmlContent);

    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Ocorreu um erro desconhecido.');
    } finally {
      setIsLoading(false);
      setLoadingMessage('');
    }
  }, [pdfFile, startPage, endPage, numPages]);

  const openGeneratedMaterial = () => {
    if (generatedHtml) {
      const newWindow = window.open();
      if (newWindow) {
        newWindow.document.write(generatedHtml);
        newWindow.document.close();
      } else {
        setError('Não foi possível abrir o material em uma nova janela. Verifique as configurações do seu navegador (bloqueador de pop-ups).');
      }
    }
  };
  
  const isPageRangeValid = () => {
    if (!numPages) return false;
    const sPage = parseInt(startPage, 10);
    const ePage = parseInt(endPage, 10);
    return !isNaN(sPage) && !isNaN(ePage) && sPage >= 1 && ePage <= numPages && sPage <= ePage;
  };

  return (
    <div className={`min-h-screen flex flex-col ${FONT_BODY}`}>
      {isLoading && <LoadingOverlay message={loadingMessage} />}
      <Header onHelpClick={() => setIsHelpModalOpen(true)} />
      
      <main className="flex-grow flex flex-col items-center justify-center p-4 py-8">
        <div className="bg-content-bg-light dark:bg-content-bg-dark shadow-xl dark:shadow-2xl rounded-xl p-6 md:p-10 w-full max-w-4xl text-text-light-primary dark:text-text-dark-primary border border-slate-200 dark:border-slate-700/60">
          
          {!pdfFile && (
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 text-center md:text-left py-4 md:py-8">
              <div className="md:w-2/5 flex justify-center items-center">
                <InteractiveLearningIcon className="w-40 h-40 md:w-56 md:h-56 text-accent-blue dark:text-sky-400" />
              </div>
              <div className="md:w-3/5">
                <h2 className={`${FONT_TITLE} text-3xl md:text-4xl font-bold text-slate-700 dark:text-slate-100 mb-4`}>
                  Crie Materiais Didáticos Incríveis
                </h2>
                <p className={`mb-8 text-text-light-secondary dark:text-text-dark-secondary text-lg ${FONT_BODY}`}>
                  Envie seu PDF e deixe nossa IA transformá-lo em conteúdo interativo e uma página web elegante em instantes.
                </p>
                <PdfUploadButton onFileSelect={handleFileSelected} disabled={isLoading} />
              </div>
            </div>
          )}

          {pdfFile && numPages && !generatedHtml && (
            <div className="space-y-6">
              <div className="bg-slate-100 dark:bg-slate-700/80 p-4 rounded-lg border border-slate-200 dark:border-slate-600/80">
                <div className="flex items-center text-lg font-semibold mb-2 text-sky-600 dark:text-sky-400">
                  <DocumentTextIcon className="h-6 w-6 mr-2 flex-shrink-0" />
                  <span className={`${FONT_TITLE} truncate`} title={pdfName || ""}>{pdfName}</span>
                </div>
                <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">Total de páginas: {numPages}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="startPage" className={`block text-sm font-medium text-text-light-secondary dark:text-text-dark-secondary mb-1 ${FONT_BODY}`}>Página Inicial:</label>
                  <input
                    type="number"
                    id="startPage"
                    name="startPage"
                    value={startPage}
                    onChange={(e) => setStartPage(e.target.value)}
                    min="1"
                    max={numPages || 1}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-text-light-primary dark:text-text-dark-primary focus:ring-2 focus:ring-accent-blue focus:border-accent-blue"
                    disabled={isLoading}
                    aria-label="Página inicial para processamento"
                  />
                </div>
                <div>
                  <label htmlFor="endPage" className={`block text-sm font-medium text-text-light-secondary dark:text-text-dark-secondary mb-1 ${FONT_BODY}`}>Página Final:</label>
                  <input
                    type="number"
                    id="endPage"
                    name="endPage"
                    value={endPage}
                    onChange={(e) => setEndPage(e.target.value)}
                    min={startPage || 1}
                    max={numPages || 1}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-text-light-primary dark:text-text-dark-primary focus:ring-2 focus:ring-accent-blue focus:border-accent-blue"
                    disabled={isLoading}
                    aria-label="Página final para processamento"
                  />
                </div>
              </div>
              
              <button
                onClick={handleProcessRequest}
                disabled={isLoading || !isPageRangeValid()}
                className={`w-full bg-accent-green hover:bg-emerald-600 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-150 ease-in-out transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-emerald-400 dark:focus:ring-emerald-300 focus:ring-opacity-75 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center ${FONT_TITLE}`}
              >
                <CogIcon className="h-6 w-6 mr-2" />
                Gerar Material Didático
              </button>
               <button
                onClick={resetStateForNewFile}
                disabled={isLoading}
                className={`w-full mt-3 bg-slate-500 hover:bg-slate-600 dark:bg-slate-600 dark:hover:bg-slate-500 text-white font-medium py-2.5 px-6 rounded-lg text-md transition duration-150 ease-in-out flex items-center justify-center ${FONT_BODY}`}
              >
                <ArrowPathIcon className="h-5 w-5 mr-2" />
                Carregar Outro PDF
              </button>
            </div>
          )}

          {error && (
            <div className="mt-6 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-500/50 text-red-700 dark:text-red-300 p-4 rounded-lg flex items-start text-sm" role="alert">
              <AlertTriangleIcon className="h-5 w-5 mr-2.5 flex-shrink-0 mt-0.5 text-red-500 dark:text-red-400" />
              <p>{error}</p>
            </div>
          )}

          {generatedHtml && !error && (
            <div className="mt-8 text-center">
              <p className={`text-xl text-accent-green dark:text-emerald-400 font-semibold mb-4 ${FONT_TITLE}`}>Material didático gerado com sucesso!</p>
              <button
                onClick={openGeneratedMaterial}
                className={`w-full bg-accent-blue hover:bg-blue-600 dark:bg-blue-500 dark:hover:bg-blue-400 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-150 ease-in-out transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-sky-400 dark:focus:ring-sky-300 focus:ring-opacity-75 flex items-center justify-center ${FONT_TITLE}`}
              >
                <BookOpenIcon className="h-6 w-6 mr-2" />
                Visualizar Material Interativo
              </button>
              <button
                onClick={resetStateForNewFile}
                className={`mt-4 w-full bg-slate-500 hover:bg-slate-600 dark:bg-slate-600 dark:hover:bg-slate-500 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-150 ease-in-out ${FONT_TITLE}`}
              >
                 <ArrowPathIcon className="h-6 w-6 mr-2" />
                Gerar Novo Material com Outro PDF
              </button>
            </div>
          )}
        </div>
      </main>
       <footer className={`py-6 text-center text-xs text-text-light-secondary dark:text-text-dark-secondary ${FONT_BODY} border-t border-slate-200 dark:border-slate-700/60`}>
          <p>&copy; {new Date().getFullYear()} LexisLab. Potencializado por IA Gemini.</p>
      </footer>
      <HelpModal isOpen={isHelpModalOpen} onClose={() => setIsHelpModalOpen(false)} />
    </div>
  );
};

export default App;