import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY; 
const genAI = new GoogleGenerativeAI(API_KEY);

export const generateIdea = async (industry, audience, extra, mode) => {
  // Atualizando para o motor atual e mais veloz do Gemini
  const model = genAI.getGenerativeModel({ 
    model: "gemini-2.5-flash",
    generationConfig: { responseMimeType: "application/json" }
  });
  
 const prompt = `Atue como um consultor de negócios experiente. Gere uma ideia de negócio inovadora para o setor de ${industry}, focada no público ${audience}. Contexto adicional: ${extra}.
  
   MUITO IMPORTANTE - CENÁRIO EDUCACIONAL: "${mode}".
  REGRAS DE ESTILO:
  - Se o cenário for "Feira": Use técnicas agressivas de copywriting publicitário. O 'pitch' deve ser um slogan explosivo e inesquecível. O custo deve ser substituido por "Área da Administração Focada" (Marketing, Logística, Finanças, RH). A 'killer_question' tem que ser um soco no estômago que faça o visitante duvidar do status quo.
  - Se for "Aula" ou "Ideathon": Mantenha o tom analítico e aprofundado para debate acadêmico.
  
  O JSON deve conter EXATAMENTE estas chaves em inglês:
  - title (string)
  - pitch (string: uma frase de impacto curta e comercial)
  - description (string: explicação clara do negócio)
  - innovation_score (número inteiro de 0 a 100)
  - swot (objeto com arrays de strings: strengths, weaknesses, opportunities, threats)
  - canvas (objeto com strings: value_proposition, customer_segments, revenue_streams, channels)
  - finance (objeto com strings: ticket, cac, breakeven)
  - design_thinking (objeto com strings: desirability, feasibility, viability)
  - experiment (string: uma sugestão prática de experimento para testar a ideia)
  - mvp (objeto com strings: feature, market_trend) // market_trend deve ser uma característica do mercado (ex: Estagnado, Crescimento Acelerado, Oceano Azul)
  - killer_question (string: uma pergunta provocativa e reflexiva que desafia a ideia)`;

  try {
    const result = await model.generateContent(prompt);
    return JSON.parse(result.response.text());
  } catch (error) {
    console.error("Erro na Forja:", error);
    throw error;
  }
};