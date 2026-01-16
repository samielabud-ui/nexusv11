
import React, { useState } from 'react';

const MorfoView: React.FC = () => {
  const [selectedMed, setSelectedMed] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<'Anatomia' | 'Histologia' | null>(null);
  const [selectedModule, setSelectedModule] = useState<number | null>(null);

  const meds = Array.from({ length: 8 }, (_, i) => i + 1);

  const getModulesForMed = (med: number) => {
    const start = (med - 1) * 3 + 1;
    return [start, start + 1, start + 2];
  };

  const resetToMeds = () => {
    setSelectedMed(null);
    setSelectedCategory(null);
    setSelectedModule(null);
  };

  const resetToCategories = () => {
    setSelectedCategory(null);
    setSelectedModule(null);
  };

  const resetToModules = () => {
    setSelectedModule(null);
  };

  if (selectedMed === null) {
    return (
      <div className="max-w-[1600px] mx-auto animate-in fade-in duration-500 px-4">
        <header className="mb-10 md:mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tighter italic">Morfo</h2>
          <p className="text-neutral-400 text-lg md:text-xl font-light max-w-2xl leading-relaxed">
            Área dedicada ao estudo morfofuncional. Selecione seu período para começar.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {meds.map((m) => (
            <div 
              key={m} 
              onClick={() => setSelectedMed(m)}
              className="bg-neutral-900/30 border border-neutral-800 p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] cursor-pointer hover:bg-neutral-900 hover:border-blue-600/50 hover:scale-[1.02] transition-all group flex flex-col justify-between h-48 md:h-64 shadow-xl"
            >
              <div className="flex justify-between items-start">
                <span className="text-[9px] md:text-[10px] font-black text-blue-500 uppercase tracking-[0.4em]">Período</span>
                <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-600/10 rounded-xl flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                </div>
              </div>
              <div>
                <h4 className="text-3xl md:text-4xl font-black text-white tracking-tight">Med {m}</h4>
                <p className="text-neutral-500 text-[10px] mt-2 uppercase tracking-widest font-bold group-hover:text-neutral-300 transition-colors italic">Ver Módulos →</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (selectedCategory === null) {
    return (
      <div className="max-w-[1200px] mx-auto animate-in slide-in-from-right-4 duration-500 px-4">
        <button onClick={resetToMeds} className="mb-8 flex items-center gap-2 text-neutral-500 hover:text-white transition-colors group">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform"><path d="m15 18-6-6 6-6"/></svg>
          <span className="text-xs font-medium uppercase tracking-widest">Escolher outro Med</span>
        </button>

        <header className="mb-10 md:mb-12">
          <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em] mb-2 block">Med {selectedMed}</span>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">O que você vai estudar hoje?</h2>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div 
            onClick={() => setSelectedCategory('Anatomia')}
            className="bg-neutral-900/40 border border-neutral-800 p-10 md:p-12 rounded-[2rem] md:rounded-[3rem] cursor-pointer hover:bg-neutral-900 hover:border-indigo-500 transition-all group h-[300px] md:h-[400px] flex flex-col justify-center items-center text-center shadow-xl"
          >
            <div className="w-16 h-16 md:w-24 md:h-24 bg-indigo-500/10 rounded-full flex items-center justify-center text-indigo-500 mb-6 md:mb-8 group-hover:scale-110 group-hover:bg-indigo-500 group-hover:text-white transition-all shadow-2xl">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20"/><path d="M2 12h20"/><path d="M12 2a14.5 14.5 0 0 0 0 20"/><path d="M2 12h20"/></svg>
            </div>
            <h3 className="text-2xl md:text-4xl font-black text-white mb-2 md:mb-4 tracking-tight">Anatomia</h3>
            <p className="text-neutral-500 text-[10px] md:text-sm max-w-[200px] md:max-w-xs leading-relaxed">Atlas integrados, resumos e questões.</p>
          </div>

          <div 
            onClick={() => setSelectedCategory('Histologia')}
            className="bg-neutral-900/40 border border-neutral-800 p-10 md:p-12 rounded-[2rem] md:rounded-[3rem] cursor-pointer hover:bg-neutral-900 hover:border-emerald-500 transition-all group h-[300px] md:h-[400px] flex flex-col justify-center items-center text-center shadow-xl"
          >
            <div className="w-16 h-16 md:w-24 md:h-24 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500 mb-6 md:mb-8 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white transition-all shadow-2xl">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20"/><path d="M2 12h20"/><path d="M12 2a14.5 14.5 0 0 0 0 20"/><path d="M2 12h20"/></svg>
            </div>
            <h3 className="text-2xl md:text-4xl font-black text-white mb-2 md:mb-4 tracking-tight">Histologia</h3>
            <p className="text-neutral-500 text-[10px] md:text-sm max-w-[200px] md:max-w-xs leading-relaxed">Lâminas digitais e tecidos integrados.</p>
          </div>
        </div>
      </div>
    );
  }

  if (selectedModule === null) {
    const modules = getModulesForMed(selectedMed);
    return (
      <div className="max-w-[1200px] mx-auto animate-in slide-in-from-right-4 duration-500 px-4">
        <button onClick={resetToCategories} className="mb-8 flex items-center gap-2 text-neutral-500 hover:text-white transition-colors group">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform"><path d="m15 18-6-6 6-6"/></svg>
          <span className="text-xs font-medium uppercase tracking-widest">Mudar Disciplina</span>
        </button>

        <header className="mb-10 md:mb-12">
          <div className="flex items-center flex-wrap gap-2 md:gap-4 mb-2">
            <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em]">Med {selectedMed}</span>
            <span className="text-neutral-700">/</span>
            <span className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.4em]">{selectedCategory}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">Escolha o Módulo</h2>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {modules.map((mod) => (
            <div 
              key={mod} 
              onClick={() => setSelectedModule(mod)}
              className="bg-neutral-900/30 border border-neutral-800 p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] cursor-pointer hover:bg-neutral-900 hover:border-blue-500 transition-all flex flex-col justify-between h-40 md:h-48 group shadow-lg"
            >
              <div>
                <span className="text-[9px] md:text-[10px] font-black text-neutral-600 uppercase tracking-widest block mb-1">Morfofuncional</span>
                <h4 className="text-xl md:text-2xl font-black text-white tracking-tight">Módulo {mod}</h4>
              </div>
              <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest group-hover:underline italic">Acessar Conteúdo →</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1000px] mx-auto animate-in fade-in duration-500 px-4">
      <button onClick={resetToModules} className="mb-8 flex items-center gap-2 text-neutral-500 hover:text-white transition-colors group">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform"><path d="m15 18-6-6 6-6"/></svg>
        <span className="text-xs font-medium uppercase tracking-widest">Voltar para Módulos</span>
      </button>

      <div className="bg-neutral-900/30 border border-neutral-800 p-8 md:p-16 rounded-[2rem] md:rounded-[3rem] text-center border-dashed">
        <div className="w-16 h-16 md:w-20 md:h-20 bg-neutral-800 rounded-full flex items-center justify-center text-neutral-600 mx-auto mb-6 md:mb-8">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
        </div>
        <h3 className="text-xl md:text-2xl font-black text-white mb-4 tracking-tight">Conteúdo em Processamento</h3>
        <p className="text-neutral-500 text-sm md:text-base max-w-md mx-auto leading-relaxed">
          Estamos organizando os resumos, PDFs e lâminas digitais para o <span className="text-white font-bold">Módulo {selectedModule}</span> de <span className="text-white font-bold">{selectedCategory}</span>.
        </p>
        <div className="mt-8 md:mt-12 flex flex-wrap justify-center gap-3">
           <div className="px-5 py-2 bg-neutral-950 border border-neutral-800 rounded-full text-[9px] md:text-[10px] font-black uppercase text-neutral-600 tracking-widest">Resumos</div>
           <div className="px-5 py-2 bg-neutral-950 border border-neutral-800 rounded-full text-[9px] md:text-[10px] font-black uppercase text-neutral-600 tracking-widest">Atlas PDF</div>
           <div className="px-5 py-2 bg-neutral-950 border border-neutral-800 rounded-full text-[9px] md:text-[10px] font-black uppercase text-neutral-600 tracking-widest">Videoaulas</div>
        </div>
      </div>
    </div>
  );
};

export default MorfoView;
