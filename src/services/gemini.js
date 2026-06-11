import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyBkZ6iLsa8pj2hJW997LKceMBlAql4hpbE"; // <-- COLOQUE SUA CHAVE AQUI
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