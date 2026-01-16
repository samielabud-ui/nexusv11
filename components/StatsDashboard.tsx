
import React from 'react';

interface RankingUser {
  rank: number;
  name: string;
  points: number;
  isCurrentUser: boolean;
}

interface StatsDashboardProps {
  stats: {
    totalAnswered: number;
    totalCorrect: number;
    totalErrors: number;
    streak: number;
    points: number;
  };
  ranking: RankingUser[];
}

const StatsDashboard: React.FC<StatsDashboardProps> = ({ stats, ranking }) => {
  const getLevel = (count: number) => {
    if (count < 50) return "Iniciante";
    if (count < 150) return "Intermediário";
    if (count < 300) return "Avançado";
    return "Veterano";
  };

  const getNextLevelInfo = (count: number) => {
    if (count < 50) return { next: "Intermediário", target: 50 };
    if (count < 150) return { next: "Avançado", target: 150 };
    if (count < 300) return { next: "Veterano", target: 300 };
    return { next: "Mestre", target: 1000 };
  };

  const level = getLevel(stats.totalAnswered);
  const nextInfo = getNextLevelInfo(stats.totalAnswered);
  const accuracy = stats.totalAnswered > 0 
    ? Math.round((stats.totalCorrect / stats.totalAnswered) * 100) 
    : 0;

  const currentUserRank = ranking.find(u => u.isCurrentUser);

  return (
    <div className="animate-in fade-in duration-500">
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <div className="bg-neutral-900/40 border border-neutral-800 p-5 md:p-6 rounded-2xl flex flex-col justify-between">
          <span className="text-neutral-500 text-[10px] font-bold uppercase tracking-wider mb-2">Questões</span>
          <div className="flex items-end gap-2">
            <span className="text-2xl md:text-3xl font-bold text-white">{stats.totalAnswered}</span>
          </div>
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-[10px] font-mono">
            <span className="text-emerald-500">ACERTOS: {stats.totalCorrect}</span>
            <span className="text-red-500">ERROS: {stats.totalErrors}</span>
          </div>
        </div>

        <div className="bg-neutral-900/40 border border-neutral-800 p-5 md:p-6 rounded-2xl flex flex-col justify-between">
          <span className="text-neutral-500 text-[10px] font-bold uppercase tracking-wider mb-2">Desempenho</span>
          <div className="flex items-end gap-2">
            <span className="text-2xl md:text-3xl font-bold text-white">{accuracy}%</span>
          </div>
          <div className="w-full bg-neutral-800 h-1.5 rounded-full mt-4 overflow-hidden">
            <div 
              className="bg-blue-600 h-1.5 rounded-full transition-all duration-1000" 
              style={{ width: `${accuracy}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-neutral-900/40 border border-neutral-800 p-5 md:p-6 rounded-2xl flex flex-col justify-between">
          <span className="text-neutral-500 text-[10px] font-bold uppercase tracking-wider mb-2">Nível</span>
          <div className="flex items-center gap-2">
            <span className="text-lg md:text-xl font-bold text-white">{level}</span>
            <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 border border-blue-500/20">
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
            </div>
          </div>
          <p className="text-neutral-500 text-[10px] mt-4 uppercase tracking-tighter">
            Próximo: {nextInfo.next} ({nextInfo.target - stats.totalAnswered} questões)
          </p>
        </div>

        <div className="bg-neutral-900/40 border border-neutral-800 p-5 md:p-6 rounded-2xl flex flex-col justify-between group">
          <span className="text-neutral-500 text-[10px] font-bold uppercase tracking-wider mb-2">Streak</span>
          <div className="flex items-center gap-2">
            <span className="text-2xl md:text-3xl font-bold text-white">{stats.streak}d</span>
            <div className={`text-orange-500 ${stats.streak > 0 ? 'animate-bounce' : 'opacity-20'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.507 14.303l-2.127 2.127c-.46.46-.46 1.205 0 1.665.46.46 1.205.46 1.665 0l2.127-2.127c.46-.46.46-1.205 0-1.665-.46-.46-1.205-.46-1.665 0zM12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm4.243-12.243l-2.122 2.122c-.46.46-.46 1.204 0 1.664.46.46 1.204.46 1.664 0l2.122-2.122c.46-.46.46-1.204 0-1.664-.46-.46-1.204-.46-1.664 0zM7.757 14.243l2.122-2.122c.46-.46.46-1.204 0-1.664-.46-.46-1.204-.46-1.664 0l-2.122 2.122c-.46.46-.46 1.204 0 1.664.46.46 1.204.46 1.664 0z"/></svg>
            </div>
          </div>
          <p className="text-neutral-500 text-[10px] mt-4 uppercase">Responda hoje para manter!</p>
        </div>
      </section>

      <section className="bg-neutral-900/20 border border-neutral-800 rounded-2xl overflow-hidden">
        <div className="p-5 md:p-6 border-b border-neutral-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 bg-neutral-900/40">
          <h3 className="font-semibold text-neutral-200">Ranking do Ciclo</h3>
          <span className="text-xs text-neutral-500 uppercase tracking-widest font-bold">Posição: {currentUserRank ? currentUserRank.rank : '-'}º</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-neutral-500 border-b border-neutral-800">
                <th className="px-5 md:px-6 py-3 font-medium uppercase text-[10px] tracking-widest">Posição</th>
                <th className="px-5 md:px-6 py-3 font-medium uppercase text-[10px] tracking-widest">Estudante</th>
                <th className="px-5 md:px-6 py-3 font-medium uppercase text-[10px] tracking-widest text-right">Diferença</th>
              </tr>
            </thead>
            <tbody>
              {ranking.map((user, idx) => {
                const isAbove = currentUserRank && user.rank < currentUserRank.rank;
                const difference = currentUserRank ? (user.points - currentUserRank.points) : 0;

                return (
                  <tr 
                    key={idx} 
                    className={`border-b border-neutral-800/50 transition-colors ${user.isCurrentUser ? 'bg-blue-600/10' : 'hover:bg-neutral-800/30'}`}
                  >
                    <td className="px-5 md:px-6 py-4 font-mono text-neutral-400">
                      {user.rank}º
                    </td>
                    <td className={`px-5 md:px-6 py-4 font-medium whitespace-nowrap ${user.isCurrentUser ? 'text-blue-400' : 'text-neutral-300'}`}>
                      {user.isCurrentUser ? 'Você' : user.name}
                    </td>
                    <td className="px-5 md:px-6 py-4 text-right font-mono text-[10px]">
                      {user.isCurrentUser ? (
                        <span className="text-blue-500 font-bold uppercase">VOCÊ</span>
                      ) : (
                        <span className={isAbove ? "text-orange-400" : "text-neutral-600"}>
                          {isAbove ? `+${difference} pts` : `-${Math.abs(difference)} pts`}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default StatsDashboard;
