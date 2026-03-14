
import { GoogleGenAI } from "@google/genai";

// Helper function to safely access environment variables
const getEnvVar = (key: string) => {
  try {
    // @ts-ignore
    if (typeof import.meta !== 'undefined' && import.meta.env) {
      // @ts-ignore
      return import.meta.env[key];
    }
    // Fallback for process.env
    // @ts-ignore
    if (typeof process !== 'undefined' && process.env) {
      // @ts-ignore
      return process.env[key];
    }
  } catch (e) {
    console.warn('Error accessing environment variable:', key);
  }
  return '';
};

// Initialize Gemini
// We access the variable safely via our helper
const apiKey = getEnvVar('VITE_GOOGLE_API_KEY');

const ai = new GoogleGenAI({ apiKey: apiKey || '' });

export const askConcierge = async (
  query: string,
  context?: string
): Promise<string> => {
  if (!apiKey) {
    return "Estoy en modo demostración. Por favor configure la variable VITE_GOOGLE_API_KEY en Netlify para habilitar mi inteligencia.";
  }

  try {
    const model = "gemini-3-flash-preview"; 
    
    // Construct a prompt that includes context about the real estate platform
    const fullPrompt = `
      Eres el "Concierge Casa de Alba", un asistente de bienes raíces de ultra-lujo altamente sofisticado, educado y conocedor.
      Tu tono es exclusivo, profesional y servicial. Debes responder SIEMPRE EN ESPAÑOL, a menos que el usuario te hable explícitamente en otro idioma.
      
      Contexto de la página/propiedad actual:
      ${context || "El usuario está navegando en la plataforma principal de Casa de Alba."}

      Consulta del Usuario: "${query}"

      Responde de manera concisa (máx 100 palabras) pero elegante. Enfócate en el estilo de vida, valor de inversión y detalles arquitectónicos. Evita términos genéricos.
    `;

    // We use the search tool if the query implies needing external info, 
    // but for this simple interface, we'll keep it standard unless necessary.
    
    const response = await ai.models.generateContent({
      model: model,
      contents: fullPrompt,
      config: {
        tools: [{ googleSearch: {} }], // Enable grounding for market trends etc.
      }
    });

    return response.text || "Mis disculpas, no pude recuperar esa información en este momento.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Actualmente estoy experimentando una alta demanda. Por favor, inténtelo de nuevo en breve.";
  }
};
