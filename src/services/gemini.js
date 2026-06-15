import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY; 
const genAI = new GoogleGenerativeAI(API_KEY);

export const generateIdea = async (industry, audience, extra, mode) => {
  const model = genAI.getGenerativeModel({ 
    model: "gemini-2.5-flash",
    generationConfig: { responseMimeType: "application/json" }
  });
  
 const prompt = `Atue como um consultor de negócios experiente. Gere uma ideia de negócio inovadora para o setor de ${industry}, focada no público ${audience}. Contexto adicional: ${extra}.
  
  REGRA DE IDIOMA OBRIGATÓRIA: TODOS os textos, descrições, frases e valores gerados devem ser ESTRITAMENTE em Português do Brasil (PT-BR). NUNCA misture os idiomas.
  
  MUITO IMPORTANTE - CENÁRIO EDUCACIONAL: "${mode}".
  REGRAS DE ESTILO:
  - Se o cenário for "feira": Use técnicas agressivas de copywriting para jovens da Geração Z. O 'pitch' deve ser inspirador. Mostre que eles podem mudar o mundo.
  - Se for "aula" ou "ideathon": Mantenha o tom analítico e aprofundado para debate acadêmico.
  
  O JSON deve conter EXATAMENTE estas chaves em inglês (mas os valores dentro delas DEVEM ser em PT-BR):
  - title (string)
  - pitch (string: uma frase de impacto curta e comercial)
  - description (string: explicação clara do negócio)
  - innovation_score (número inteiro de 0 a 100)
  - swot (objeto com arrays de strings: strengths, weaknesses, opportunities, threats)
  - canvas (objeto com strings: value_proposition, customer_segments, revenue_streams, channels)
  - finance (objeto com strings: ticket, cac, breakeven)
  - design_thinking (objeto com strings: desirability, feasibility, viability)
  - experiment (string: uma sugestão prática de experimento para testar a ideia)
  - mvp (objeto com strings: feature, market_trend)
  - killer_question (string: uma pergunta provocativa e reflexiva que desafia a ideia)
  - admin_role (string: uma frase curta, direta e de impacto explicando por que estudar Administração é a chave para ser o CEO e fazer ESTA ideia específica enriquecer e escalar)`;

  try {
    const result = await model.generateContent(prompt);
    return JSON.parse(result.response.text());
  } catch (error) {
    console.error("Erro na Forja:", error);
    throw error;
  }
};