
import * as pdfjsLib from 'pdfjs-dist';

export const extractTextFromPdf = async (
  file: File,
  startPageUser?: number,
  endPageUser?: number
): Promise<string> => {
  const arrayBuffer = await file.arrayBuffer();
  // pdfjsLib.GlobalWorkerOptions.workerSrc is already set in index.tsx
  // No need to pass workerSrc here.
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  let fullText = '';

  const actualStartPage = (startPageUser && startPageUser > 0) 
                          ? Math.min(startPageUser, pdf.numPages) 
                          : 1;
  const actualEndPage = (endPageUser && endPageUser > 0 && endPageUser <= pdf.numPages) 
                        ? Math.min(endPageUser, pdf.numPages) 
                        : pdf.numPages;

  // Ensure startPage is not greater than endPage after adjustments
  const finalStartPage = Math.min(actualStartPage, actualEndPage);

  for (let i = finalStartPage; i <= actualEndPage; i++) {
    try {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map(item => ('str' in item ? item.str : '')).join(' ');
      fullText += pageText + '\n\n'; // Add newlines between pages for better separation
    } catch (pageError) {
      console.warn(`Erro ao processar página ${i}:`, pageError);
      // Optionally, collect these errors to show to the user or skip the page
    }
  }

  return fullText.trim();
};
