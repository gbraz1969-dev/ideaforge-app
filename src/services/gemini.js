import { GoogleGenerativeAI } from "@google/generative-ai";

// Agora o código puxa a chave de forma oculta!
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY; 
const genAI = new GoogleGenerativeAI(API_KEY);

export const generateIdea = async (industry, audience, extra) => {
  const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
  
  const prompt = `Atue como um consultor de negócios. Gere uma ideia de negócio inovadora para o setor de ${industry}, focada no público ${audience}. Contexto adicional: ${extra}.
  Retorne ESTRITAMENTE um objeto JSON válido com: title, pitch, description, swot (objeto com strengths, weaknesses, opportunities, threats - arrays), canvas (objeto com value_proposition, customer_segments, revenue_streams, channels).`;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text().replace(/```json|```/g, "");
    return JSON.parse(text);
  } catch (error) {
    console.error("Erro Gemini:", error);
    throw error;
  }
};