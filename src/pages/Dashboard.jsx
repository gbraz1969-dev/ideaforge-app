import React, { useState, useEffect } from 'react';
import { generateIdea } from '../services/gemini';
import { 
  Loader2, Sparkles, History, Zap, Shield, 
  Target, LayoutDashboard, Printer, Rocket, HelpCircle, TrendingUp, DollarSign 
} from 'lucide-react';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';
export default function Dashboard() {
  const [form, setForm] = useState({ industry: '', audience: '', extra: '', mode: 'aula' });
  const [loading, setLoading] = useState(false);
  const [idea, setIdea] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('forge_history');
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  const handleRun = async (e) => {
    e.preventDefault();
    if (!form.industry || !form.audience) return toast.error("Preencha os campos obrigatórios!");
    
    setLoading(true);
    try {
      const data = await generateIdea(form.industry, form.audience, form.extra, form.mode);
      setIdea(data);
      
      const newHistory = [data, ...history].slice(0, 5);
      setHistory(newHistory);
      localStorage.setItem('forge_history', JSON.stringify(newHistory));
      
      toast.success("Ideia forjada com sucesso!");
      
      // A explosão festiva com as cores da sua marca!
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#FFDE59', '#38B6FF', '#FF5757', '#000000'] 
      });
    } catch (err) {
      toast.error("Erro na forja. Verifique a sua conexão.");
      console.error(err);
    } finally {
    setLoading(false);
    }
    
  };

  const handlePrint = () => window.print();

  // Função para definir a cor do termômetro baseado no score
  const getScoreColor = (score) => {
    if (score > 80) return 'bg-[#FF5757]'; // Muito Disruptivo (Vermelho)
    if (score > 50) return 'bg-[#38B6FF]'; // Inovador (Azul)
    return 'bg-[#7ED957]'; // Estável (Verde)
  };

  return (
    <div className="max-w-7xl mx-auto p-6 grid lg:grid-cols-12 gap-8 pb-20">
      
      {/* COLUNA ESQUERDA */}
      <div className="lg:col-span-4 space-y-6 print:hidden">
        <form onSubmit={handleRun} className="border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-4">
          <h2 className="text-2xl font-black uppercase flex items-center gap-2 italic">
            <Zap className="fill-current text-[#FFDE59]" /> Lab de Ideias
          </h2>

          {/* SELETOR DE MODO */}
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-wider">Modo de Operação</label>
            <select 
              className="w-full border-4 border-black p-3 font-black bg-white focus:bg-[#FFDE59] outline-none cursor-pointer text-xs"
              value={form.mode}
              onChange={e => setForm({...form, mode: e.target.value})}
            >
              <option value="feira">🟢 FEIRA DE CURSOS (Pop & Inspirador)</option>
              <option value="aula">🟡 SALA DE AULA (Equilibrado & Pedagógico)</option>
              <option value="ideathon">🔴 IDEATHON (Rigoroso & Competitivo)</option>
            </select>
          </div>
          
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-wider">Setor</label>
            <input className="w-full border-4 border-black p-3 font-bold focus:bg-[#FFDE59] outline-none" placeholder="Ex: Fintech" onChange={e => setForm({...form, industry: e.target.value})} />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-wider">Público</label>
            <input className="w-full border-4 border-black p-3 font-bold focus:bg-[#FFDE59] outline-none" placeholder="Ex: Universitários" onChange={e => setForm({...form, audience: e.target.value})} />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-wider">Contexto</label>
            <textarea className="w-full border-4 border-black p-3 font-bold h-24 focus:bg-[#FFDE59] outline-none resize-none" placeholder="Opcional..." onChange={e => setForm({...form, extra: e.target.value})} />
          </div>

          <button disabled={loading} className="w-full bg-[#FFDE59] border-4 border-black p-4 font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:shadow-none transition-all flex justify-center">
            {loading ? <Loader2 className="animate-spin" /> : "FORJAR AGORA"}
          </button>
        </form>

        {history.length > 0 && (
          <div className="border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="text-lg font-black uppercase flex items-center gap-2 mb-4"><History size={20} /> Histórico</h3>
            <div className="space-y-2">
              {history.map((item, idx) => (
                <button key={idx} onClick={() => setIdea(item)} className="w-full text-left p-3 border-2 border-black bg-[#F4F4F0] font-bold text-xs hover:bg-[#38B6FF] truncate transition-all">
                  {item.title}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* COLUNA DIREITA */}
      <div className="lg:col-span-8 print:col-span-12">
        {idea ? (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            
            <div className="flex justify-end print:hidden">
              <button onClick={handlePrint} className="bg-black text-white px-6 py-2 font-black uppercase text-sm flex items-center gap-2 shadow-[4px_4px_0px_0px_rgba(56,182,255,1)] hover:translate-x-1 transition-all">
                <Printer size={18} /> Salvar PDF
              </button>
            </div>

            {/* Cabeçalho com Termômetro de Inovação */}
            <div className="border-4 border-black bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <div className="mb-6">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                    <TrendingUp size={14}/> Grau de Inovação
                  </span>
                  <span className="font-black text-xl">{idea.innovation_score}%</span>
                </div>
                <div className="w-full h-6 border-4 border-black bg-[#F4F4F0] overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-1000 ${getScoreColor(idea.innovation_score)}`} 
                    style={{ width: `${idea.innovation_score}%` }}
                  />
                </div>
              </div>

              <h2 className="text-5xl font-black uppercase leading-tight mb-4">{idea.title}</h2>
              <span className="bg-[#38B6FF] px-3 py-1 border-2 border-black font-black uppercase text-sm">{idea.pitch}</span>
              <p className="text-xl font-bold mt-6 text-black/80">{idea.description}</p>
            </div>
            
            {/* SWOT */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border-4 border-black bg-[#7ED957] p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <h4 className="font-black uppercase border-b-2 border-black mb-3 flex items-center gap-2"><Target size={20}/> SWOT: Positivo</h4>
                <ul className="text-sm font-bold space-y-1">
                  {idea.swot?.strengths?.map((s,i)=><li key={i}>✓ {s}</li>)}
                  {idea.swot?.opportunities?.map((o,i)=><li key={i} className="opacity-60">★ {o}</li>)}
                </ul>
              </div>
              <div className="border-4 border-black bg-[#FF5757] text-white p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <h4 className="font-black uppercase border-b-2 border-white mb-3 flex items-center gap-2"><Shield size={20}/> SWOT: Crítico</h4>
                <ul className="text-sm font-bold space-y-1">
                  {idea.swot?.weaknesses?.map((w,i)=><li key={i}>⚠ {w}</li>)}
                  {idea.swot?.threats?.map((t,i)=><li key={i} className="opacity-60">✖ {t}</li>)}
                </ul>
              </div>
            </div>

            {/* FINANCEIRO */}
            {idea.finance && (
              <div className="border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <h3 className="text-2xl font-black uppercase mb-4 flex items-center gap-2 border-b-4 border-black pb-2">
                  <DollarSign size={22} /> Projeção Financeira
                </h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-3 border-2 border-black bg-[#F4F4F0]">
                    <h5 className="text-[10px] font-black uppercase opacity-60">Ticket Médio</h5>
                    <p className="font-black text-lg">{idea.finance.ticket}</p>
                  </div>
                  <div className="p-3 border-2 border-black bg-[#F4F4F0]">
                    <h5 className="text-[10px] font-black uppercase opacity-60">CAC Est.</h5>
                    <p className="font-black text-lg">{idea.finance.cac}</p>
                  </div>
                  <div className="p-3 border-2 border-black bg-[#F4F4F0]">
                    <h5 className="text-[10px] font-black uppercase opacity-60">Breakeven</h5>
                    <p className="font-black text-lg">{idea.finance.breakeven}</p>
                  </div>
                </div>
              </div>
            )}

            {/* VALIDAÇÃO DESIGN THINKING */}
            {idea.design_thinking && (
              <div className="border-4 border-black bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-8">
                <h3 className="text-2xl font-black uppercase mb-6 flex items-center gap-2 border-b-4 border-black pb-2">
                  <Sparkles className="text-[#FFDE59] fill-current" /> Validação Design Thinking
                </h3>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="border-2 border-black p-4 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <span className="text-[10px] font-black uppercase text-[#38B6FF]">Desejabilidade</span>
                    <p className="text-xs font-bold mt-2 leading-tight">{idea.design_thinking.desirability}</p>
                  </div>
                  
                  <div className="border-2 border-black p-4 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <span className="text-[10px] font-black uppercase text-[#7ED957]">Praticidade</span>
                    <p className="text-xs font-bold mt-2 leading-tight">{idea.design_thinking.feasibility}</p>
                  </div>
                  
                  <div className="border-2 border-black p-4 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <span className="text-[10px] font-black uppercase text-[#FF5757]">Viabilidade</span>
                    <p className="text-xs font-bold mt-2 leading-tight">{idea.design_thinking.viability}</p>
                  </div>
                </div>

                {/* SUGESTÃO DE EXPERIMENTO PRÁTICO */}
                <div className="mt-6 p-5 border-4 border-black border-dashed bg-[#FFDE59]/10">
                  <h4 className="font-black uppercase text-sm flex items-center gap-2 mb-2">
                    <Target size={18} /> Próximo Passo: O Experimento
                  </h4>
                  <p className="font-bold text-md italic">
                    "{idea.experiment}"
                  </p>
                </div>
              </div>
            )}

            {/* CANVAS */}
            <div className="border-4 border-black bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] page-break-before">
              <h3 className="text-2xl font-black uppercase mb-6 flex items-center gap-2"><LayoutDashboard /> Business Model Canvas</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="border-2 border-black p-4 bg-[#FFDE59]/10"><h5 className="font-black uppercase text-[10px] mb-1">Proposta de Valor</h5><p className="font-bold text-sm">{idea.canvas?.value_proposition}</p></div>
                <div className="border-2 border-black p-4 bg-[#38B6FF]/10"><h5 className="font-black uppercase text-[10px] mb-1">Segmentos</h5><p className="font-bold text-sm">{idea.canvas?.customer_segments}</p></div>
                <div className="border-2 border-black p-4 bg-[#7ED957]/10"><h5 className="font-black uppercase text-[10px] mb-1">Canais</h5><p className="font-bold text-sm">{idea.canvas?.channels}</p></div>
                <div className="border-2 border-black p-4 bg-[#FF5757]/10"><h5 className="font-black uppercase text-[10px] mb-1">Receitas</h5><p className="font-bold text-sm">{idea.canvas?.revenue_streams}</p></div>
              </div>
            </div>

            {/* MVP E KILLER QUESTION */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border-4 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <h4 className="font-black uppercase flex items-center gap-2 mb-2 text-[#38B6FF]"><Rocket size={20} /> MVP Core</h4>
                <p className="text-sm font-bold">{idea.mvp?.feature}</p>
                <p className="text-[10px] font-black mt-2 bg-[#FFDE59] inline-block px-2 border-2 border-black">Custo: {idea.mvp?.cost}</p>
              </div>
              <div className="border-4 border-black bg-black text-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <h4 className="font-black uppercase flex items-center gap-2 mb-2 text-[#FF5757]"><HelpCircle size={20} /> Killer Question</h4>
                <p className="text-sm font-bold italic">"{idea.killer_question}"</p>
              </div>
            </div>

          </div>
        ) : (
          <div className="border-4 border-black border-dashed h-full min-h-[600px] flex flex-col items-center justify-center bg-white/30 text-center">
            <Sparkles size={80} className="mb-6 opacity-10 animate-pulse text-black" />
            <h3 className="text-4xl font-black uppercase opacity-20 tracking-tighter">Pronto para Forjar</h3>
          </div>
        )}
      </div>
    </div>
  );
}