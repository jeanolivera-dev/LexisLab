import React from 'react';
import { XMarkIcon, FONT_TITLE, FONT_BODY } from '../constants';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-slate-900 bg-opacity-50 dark:bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="help-modal-title"
    >
      <div 
        className={`bg-content-bg-light dark:bg-content-bg-dark text-text-light-primary dark:text-text-dark-primary p-6 md:p-8 rounded-lg shadow-2xl w-full max-w-lg max-h-[80vh] overflow-y-auto ${FONT_BODY}`}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        <div className="flex justify-between items-center mb-4">
          <h2 id="help-modal-title" className={`${FONT_TITLE} text-2xl font-semibold text-accent-blue dark:text-sky-400`}>
            Central de Ajuda
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400"
            aria-label="Fechar modal de ajuda"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        
        <div className="space-y-4 text-sm md:text-base">
          <section>
            <h3 className={`${FONT_TITLE} text-lg font-medium mb-1 text-accent-green dark:text-emerald-400`}>Como usar?</h3>
            <ol className="list-decimal list-inside space-y-1 pl-2">
              <li>Clique em "Carregar PDF" para selecionar um arquivo do seu computador.</li>
              <li>Após o carregamento, as informações do PDF (nome, total de páginas) serão exibidas.</li>
              <li>Defina o intervalo de páginas que deseja processar (Página Inicial e Página Final).</li>
              <li>Clique em "Gerar Material Didático". A IA irá processar o texto e criar dois outputs:</li>
                <ul className="list-disc list-inside pl-4 space-y-0.5 mt-1">
                    <li>Um material didático textual (base para o próximo passo).</li>
                    <li>Uma página web interativa baseada nesse material.</li>
                </ul>
              <li>Após a geração, clique em "Visualizar Material Interativo" para abrir a página HTML em uma nova aba.</li>
              <li>Para processar outro PDF, clique em "Carregar Outro PDF" ou "Gerar Novo Material...".</li>
            </ol>
          </section>

          <section>
            <h3 className={`${FONT_TITLE} text-lg font-medium mb-1 text-accent-yellow dark:text-yellow-400`}>Dicas</h3>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>Certifique-se que o PDF selecionado contém texto legível (não apenas imagens escaneadas sem OCR).</li>
              <li>Para melhores resultados, escolha um intervalo de páginas focado em um tópico específico.</li>
              <li>A qualidade do material gerado depende da clareza e organização do texto no PDF original.</li>
              <li>Se a nova janela com o material não abrir, verifique se seu navegador está bloqueando pop-ups.</li>
            </ul>
          </section>
          
          <section>
            <h3 className={`${FONT_TITLE} text-lg font-medium mb-1 text-slate-600 dark:text-slate-300`}>Solução de Problemas</h3>
             <ul className="list-disc list-inside space-y-1 pl-2">
                <li><strong>Erro ao ler PDF:</strong> Verifique se o arquivo é um PDF válido e não está corrompido. Tente abrir com um leitor de PDF comum.</li>
                <li><strong>Intervalo de páginas vazio:</strong> Certifique-se que as páginas selecionadas contêm texto. PDFs com muitas imagens ou gráficos podem resultar em pouco texto extraído.</li>
                <li><strong>Falha na comunicação com IA:</strong> Verifique sua conexão com a internet. Se o problema persistir, pode ser uma instabilidade temporária no serviço da IA. Tente novamente mais tarde.</li>
                <li><strong>Chave de API inválida:</strong> Este erro indica um problema com a configuração da chave de API do Gemini. Se você for o desenvolvedor, verifique as variáveis de ambiente.</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};
