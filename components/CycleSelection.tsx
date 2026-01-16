
import React, { useState, useEffect } from 'react';
import { db, auth } from '../lib/firebase';
import { doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

interface CycleSelectionProps {
  onComplete: () => void;
}

const CycleSelection: React.FC<CycleSelectionProps> = ({ onComplete }) => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    const fetchInitialData = async () => {
      if (auth.currentUser) {
        const userRef = doc(db, "users", auth.currentUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setName(userSnap.data().displayName || '');
        }
      }
    };
    fetchInitialData();
  }, []);

  const handleSelect = async (ciclo: string) => {
    if (!auth.currentUser || !name.trim()) {
      alert("Por favor, informe seu nome para prosseguir.");
      return;
    }
    setLoading(true);
    try {
      await setDoc(doc(db, "users", auth.currentUser.uid), {
        displayName: name.trim(),
        ciclo: ciclo,
        setupComplete: true,
        isPremium: false, // Reforçando isPremium false na finalização do setup
        plan: 'basic',    // Reforçando plano básico
        totalAnswered: 0,
        totalCorrect: 0,
        totalErrors: 0,
        points: 0,
        streak: 0,
        questionsToday: 0,
        lastActiveDate: null
      }, { merge: true });
      onComplete();
    } catch (err) {
      console.error("Erro ao salvar ciclo:", err);
    } finally {
      setLoading(false);
    }
  };

  const options = ['Ciclo Básico', 'Ciclo Clínico', 'Internato'];

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] px-4">
      <div className="w-full max-w-lg">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white mb-4">Bem-vindo ao NexusBQ</h2>
          <p className="text-neutral-400 leading-relaxed">
            Personalize seu perfil para começar sua jornada de estudos.
          </p>
        </div>

        <div className="bg-neutral-900/50 border border-neutral-800 p-8 rounded-2xl mb-6">
           <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">Seu Nome ou Apelido</label>
           <input 
              type="text" 
              required
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg py-2.5 px-4 text-sm focus:border-blue-600 focus:outline-none transition-colors text-white mb-6"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: João Silva"
            />

          <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-4">Selecione seu Ciclo Atual</p>
          <div className="grid grid-cols-1 gap-4">
            {options.map((option) => (
              <button
                key={option}
                disabled={loading}
                onClick={() => handleSelect(option)}
                className="bg-neutral-950 border border-neutral-800 p-6 rounded-2xl hover:border-blue-600 hover:bg-neutral-900 transition-all text-left group flex items-center justify-between"
              >
                <div>
                  <span className="block text-lg font-semibold text-white group-hover:text-blue-400">{option}</span>
                  <span className="text-xs text-neutral-500">Toque para selecionar</span>
                </div>
                <div className="w-8 h-8 rounded-full border border-neutral-700 flex items-center justify-center group-hover:border-blue-600 group-hover:bg-blue-600/10">
                  <svg className="w-4 h-4 text-transparent group-hover:text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CycleSelection;
