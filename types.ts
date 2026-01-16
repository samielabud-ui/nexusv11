
export interface Question {
  id: string;
  ciclo: string;
  modalidade: string;
  modulo: string;
  tema: string;
  problema: number;
  enunciado: string;
  alternativas: string[];
  gabarito: number;
}

export interface UserStats {
  displayName: string;
  totalAnswered: number;
  totalCorrect: number;
  totalErrors: number;
  streak: number;
  points: number;
  ciclo: string;
  isPremium: boolean;
  plan: 'basic' | 'premium';
  questionsToday: number;
  lastDailyReset?: string; // Data ISO da última atualização diária
}
