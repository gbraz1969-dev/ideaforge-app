import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Rocket, Shield, Zap } from 'lucide-react';

export default function Landing() {
  const navigate = useNavigate();
  return (
    <div className="max-w-6xl mx-auto px-4 py-20 text-center">
      <h1 className="text-7xl md:text-9xl font-black uppercase tracking-tighter mb-8">
        Idea<span className="text-brand-blue">Forge</span>
      </h1>
      <p className="text-2xl font-bold mb-10 max-w-2xl mx-auto">
        Transforme conceitos em startups validadas em segundos com IA.
      </p>
      <button onClick={() => navigate('/forge')} className="px-12 py-6 bg-brand-yellow border-4 border-black font-black text-2xl uppercase shadow-neo-lg hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
        Começar a Forjar
      </button>
      <div className="grid md:grid-cols-3 gap-8 mt-24">
        <div className="p-8 border-4 border-black bg-brand-green shadow-neo">
          <Zap size={40} className="mb-4" />
          <h3 className="text-2xl font-black uppercase">Instantâneo</h3>
          <p className="font-bold">Modelos completos em 10 segundos.</p>
        </div>
        <div className="p-8 border-4 border-black bg-brand-red text-white shadow-neo">
          <Shield size={40} className="mb-4" />
          <h3 className="text-2xl font-black uppercase">Estratégico</h3>
          <p className="font-bold">Matriz SWOT e Canvas inclusos.</p>
        </div>
        <div className="p-8 border-4 border-black bg-brand-blue shadow-neo">
          <Rocket size={40} className="mb-4" />
          <h3 className="text-2xl font-black uppercase">Pronto</h3>
          <p className="font-bold">Estrutura pronta para Pitch.</p>
        </div>
      </div>
    </div>
  );
}