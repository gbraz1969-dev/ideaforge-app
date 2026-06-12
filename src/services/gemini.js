import { GoogleGenerativeAI } from "@google/generative-ai";

// Puxando a chave do cofre invisível!
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY; 
const genAI = new GoogleGenerativeAI(API_KEY);

export const generateIdea = async (industry, audience, extra, mode) => {
  // Usando a versão oficial e estável 1.5
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
  const prompt = `Atue como um consultor de negócios experiente. Gere uma ideia de negócio inovadora para o setor de ${industry}, focada no público ${audience}. Contexto adicional: ${extra}.
  
  MUITO IMPORTANTE: O nível de complexidade e o tom desta ideia devem ser ajustados para o seguinte cenário educacional: "${mode}".
  
  Retorne ESTRITAMENTE um objeto JSON válido, sem formatação markdown em volta. O JSON deve conter EXATAMENTE estas chaves em inglês:
  - title (string)
  - pitch (string: uma frase de impacto curta e comercial)
  - description (string: explicação clara do negócio)
  - innovation_score (número inteiro de 0 a 100)
  - swot (objeto com arrays de strings: strengths, weaknesses, opportunities, threats)
  - canvas (objeto com strings: value_proposition, customer_segments, revenue_streams, channels)
  - finance (objeto com strings: ticket, cac, breakeven)
  - design_thinking (objeto com strings: desirability, feasibility, viability)
  - experiment (string: uma sugestão prática de experimento para testar a ideia)
  - mvp (objeto com strings: feature, cost)
  - killer_question (string: uma pergunta provocativa e reflexiva que desafia a ideia)`;

  try {
    const result = await model.generateContent(prompt);
    // Limpeza pesada caso a IA mande formatação de bloco de código
    const text = result.response.text().replace(/```json/gi, "").replace(/```/g, "").trim();
    return JSON.parse(text);
  } catch (error) {
    console.error("Erro na Forja:", error);
    throw error;
  }
};