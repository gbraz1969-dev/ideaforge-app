import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Landing from './pages/Landing.jsx';
import Dashboard from './pages/Dashboard.jsx';
import { Toaster } from 'sonner';

export default function App() {
  return (
    <BrowserRouter>
      <Toaster richColors position="top-right" />
      <nav className="border-b-4 border-black bg-white p-6 mb-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="text-3xl font-black uppercase tracking-tighter">IdeaForge</Link>
          <div className="flex gap-4">
            <Link to="/" className="font-black uppercase hover:underline">Home</Link>
            <a href={() => navigate('/forge')} className="bg-brand-yellow px-4 py-1 border-2 border-black font-black uppercase shadow-neo">Novo</a>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/forge" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}