
import React, { useState } from 'react';
import { auth, db } from '../lib/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const AuthView: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const getFriendlyErrorMessage = (errorCode: string) => {
    switch (errorCode) {
      case 'auth/invalid-credential':
        return 'Email ou senha incorretos. Verifique os dados ou crie uma conta.';
      case 'auth/email-already-in-use':
        return 'Este email já está cadastrado em outra conta.';
      case 'auth/weak-password':
        return 'A senha deve ter pelo menos 6 caracteres.';
      case 'auth/invalid-email':
        return 'O endereço de email informado não é válido.';
      default:
        return 'Erro ao processar. Tente novamente.';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setError('');
    setLoading(true);

    const cleanEmail = email.trim();
    const cleanPassword = password.trim();
    const cleanName = name.trim();

    if (!isLogin && !cleanName) {
      setError('Por favor, informe seu nome.');
      setLoading(false);
      return;
    }

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, cleanEmail, cleanPassword);
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, cleanEmail, cleanPassword);
        // Criar documento do usuário imediatamente após cadastro com o nome e flags de premium/plano
        await setDoc(doc(db, "users", userCredential.user.uid), {
          displayName: cleanName,
          email: cleanEmail,
          setupComplete: false, 
          isPremium: false, // Garantindo o valor false no cadastro
          plan: 'basic',    // Definindo plano inicial como básico
          totalAnswered: 0,
          totalCorrect: 0,
          totalErrors: 0,
          points: 0,
          streak: 0,
          questionsToday: 0
        });
      }
    } catch (err: any) {
      setError(getFriendlyErrorMessage(err.code));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] px-4">
      <div className="w-full max-w-md bg-neutral-900/50 border border-neutral-800 p-8 rounded-2xl shadow-2xl animate-in fade-in zoom-in duration-300">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center font-bold text-3xl text-white mx-auto mb-4 shadow-lg shadow-blue-600/20">N</div>
          <h1 className="text-2xl font-bold text-white tracking-tight">NexusBQ</h1>
          <p className="text-neutral-400 text-sm mt-2 font-light">Questões de Medicina focadas em PBL</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div className="animate-in slide-in-from-top-2 duration-300">
              <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-[0.2em] mb-2">Seu Nome</label>
              <input 
                type="text" 
                required
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl py-3 px-4 text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600/50 focus:outline-none transition-all text-white placeholder:text-neutral-700"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Como quer ser chamado?"
              />
            </div>
          )}
          
          <div>
            <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-[0.2em] mb-2">Endereço de Email</label>
            <input 
              type="email" 
              required
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl py-3 px-4 text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600/50 focus:outline-none transition-all text-white placeholder:text-neutral-700"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
            />
          </div>
          
          <div>
            <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-[0.2em] mb-2">Senha de Acesso</label>
            <input 
              type="password" 
              required
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl py-3 px-4 text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600/50 focus:outline-none transition-all text-white placeholder:text-neutral-700"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-xl">
              <p className="text-red-500 text-[11px] text-center font-medium">{error}</p>
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className={`w-full font-bold py-3.5 rounded-xl transition-all text-sm flex items-center justify-center gap-2 ${
              loading 
                ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-500 text-white active:scale-[0.98]'
            }`}
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-neutral-500 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <span>{isLogin ? 'Acessar Plataforma' : 'Criar minha Conta'}</span>
            )}
          </button>
        </form>

        <div className="mt-8 text-center border-t border-neutral-800 pt-6">
          <button 
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
            }}
            className="text-neutral-500 hover:text-white text-xs font-medium transition-colors"
          >
            {isLogin ? (
              <span>Não tem uma conta? <span className="text-blue-500 hover:underline">Cadastre-se grátis</span></span>
            ) : (
              <span>Já possui acesso? <span className="text-blue-500 hover:underline">Faça login</span></span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthView;
