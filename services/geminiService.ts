
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { 
  GEMINI_MODEL_TEXT, 
  SYSTEM_PROMPT_AGENT1, USER_PROMPT_AGENT1_TEMPLATE,
  SYSTEM_PROMPT_AGENT2, USER_PROMPT_AGENT2_TEMPLATE 
} from '../constants';

// Ensure process.env.API_KEY is defined.
// In a real production app, this key should be handled securely and not exposed client-side
// without proper safeguards or a backend proxy. For MakerSuite projects, process.env.API_KEY
// is assumed to be available in the execution environment.
const apiKey = process.env.API_KEY;
if (!apiKey) {
  throw new Error("API_KEY não definida. Verifique suas variáveis de ambiente.");
}

const ai = new GoogleGenAI({ apiKey });

export const generateDidacticMaterial = async (pdfText: string): Promise<string> => {
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: GEMINI_MODEL_TEXT,
      contents: USER_PROMPT_AGENT1_TEMPLATE(pdfText),
      config: {
        systemInstruction: SYSTEM_PROMPT_AGENT1,
        temperature: 0.7, // Adjust for creativity vs. factualness
      }
    });
    return response.text;
  } catch (error) {
    console.error("Erro ao gerar material didático (Agente 1):", error);
    if (error instanceof Error && error.message.includes('API_KEY_INVALID')) {
        throw new Error("Chave de API inválida. Verifique sua configuração.");
    }
    throw new Error(`Falha na comunicação com a IA (Agente 1): ${error instanceof Error ? error.message : String(error)}`);
  }
};

export const generateInteractivePage = async (didacticMaterial: string): Promise<string> => {
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: GEMINI_MODEL_TEXT,
      contents: USER_PROMPT_AGENT2_TEMPLATE(didacticMaterial),
      config: {
        systemInstruction: SYSTEM_PROMPT_AGENT2,
        temperature: 0.5, // Lower temperature for more structured HTML output
        // responseMimeType: "text/html" - Not a standard config, ensure prompt handles HTML generation correctly.
                          // The prompt explicitly asks for HTML and Tailwind CDN.
      }
    });
    
    // The response.text should be the raw HTML string
    let htmlContent = response.text;

    // Minimal validation/cleanup: ensure it looks like HTML
    // The prompt guides the AI to output only HTML.
    // Basic check if it's wrapped in ```html ... ``` (sometimes LLMs do this)
    const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
    const match = htmlContent.match(fenceRegex);
    if (match && match[2]) {
        htmlContent = match[2].trim(); 
    }

    if (!htmlContent.toLowerCase().includes("<html") || !htmlContent.toLowerCase().includes("</body>")) {
        console.warn("Resposta da IA (Agente 2) não parece ser um documento HTML completo. Verifique o prompt e a saída do modelo.");
        // Potentially throw an error or attempt a fallback if critical
    }

    return htmlContent;

  } catch (error) {
    console.error("Erro ao gerar página interativa (Agente 2):", error);
    if (error instanceof Error && error.message.includes('API_KEY_INVALID')) {
        throw new Error("Chave de API inválida. Verifique sua configuração.");
    }
    throw new Error(`Falha na comunicação com a IA (Agente 2): ${error instanceof Error ? error.message : String(error)}`);
  }
};
