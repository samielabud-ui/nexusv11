
import React from 'react';

interface HeaderProps {
  currentView: 'inicio' | 'questoes' | 'pbl' | 'premium' | 'morfo';
  onNavigate: (view: 'inicio' | 'questoes' | 'pbl' | 'premium' | 'morfo') => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, onNavigate }) => {
  return (
    <header className="border-b border-neutral-800 bg-[#0a0a0a]/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-[1800px] mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer shrink-0" 
          onClick={() => onNavigate('inicio')}
        >
          <div className="w-7 h-7 md:w-8 md:h-8 bg-blue-600 rounded flex items-center justify-center font-bold text-base md:text-lg text-white">N</div>
          <span className="text-lg md:text-xl font-bold tracking-tight text-white">NexusBQ</span>
        </div>
        
        <nav className="flex items-center gap-4 md:gap-8 text-[11px] md:text-sm font-medium overflow-x-auto no-scrollbar py-2 -mb-px">
          <button 
            onClick={() => onNavigate('inicio')}
            className={`transition-colors whitespace-nowrap py-1 px-1 border-b-2 ${currentView === 'inicio' ? 'text-white border-blue-600' : 'text-neutral-400 border-transparent hover:text-white'}`}
          >
            Início
          </button>
          <button 
            onClick={() => onNavigate('pbl')}
            className={`transition-colors whitespace-nowrap py-1 px-1 border-b-2 ${currentView === 'pbl' ? 'text-white border-blue-600' : 'text-neutral-400 border-transparent hover:text-white'}`}
          >
            PBL
          </button>
          <button 
            onClick={() => onNavigate('morfo')}
            className={`transition-colors whitespace-nowrap py-1 px-1 border-b-2 ${currentView === 'morfo' ? 'text-white border-blue-600' : 'text-neutral-400 border-transparent hover:text-white'}`}
          >
            Morfo
          </button>
          <button 
            onClick={() => onNavigate('questoes')}
            className={`transition-colors whitespace-nowrap py-1 px-1 border-b-2 ${currentView === 'questoes' ? 'text-white border-blue-600' : 'text-neutral-400 border-transparent hover:text-white'}`}
          >
            Questões
          </button>
          <button 
            onClick={() => onNavigate('premium')}
            className={`transition-colors whitespace-nowrap py-1 px-1 border-b-2 ${currentView === 'premium' ? 'text-blue-500 border-blue-500' : 'text-neutral-400 border-transparent hover:text-blue-500/50'}`}
          >
            <span className="flex items-center gap-1">
              Premium
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
            </span>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
