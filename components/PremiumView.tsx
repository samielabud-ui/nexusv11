
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { UserStats } from '../types';

interface PremiumViewProps {
  userStats: UserStats;
}

interface VideoLesson {
  id: string;
  title: string;
}

interface LastWatched {
  lessonId: string;
  lessonTitle: string;
  courseName: string;
  platformId: string;
}

const EMBRIOLOGIA_LESSONS: VideoLesson[] = [
  { id: 'O9YsUhCQv64', title: 'Fecundação' },
  { id: 'tMXgjHq61wQ', title: 'Gametogênese' },
  { id: '-iuWA5CQCMI', title: 'Zigoto e Blastocisto' },
  { id: 'i29YGecX9UQ', title: 'Âmnio e Celoma' },
  { id: 'HbQ8Zpex0AA', title: 'Córion' },
  { id: 'HVVclowB9qI', title: 'Gastrulação' },
  { id: 'XUD3IUNK7Vk', title: 'Notocorda e Tubo Neural' },
  { id: '7rYQMJzQoYg', title: 'Somitos, Celoma Intra e Sistema Cardiovascular' },
  { id: 'iu5VjWLLoKU', title: 'Organogênese e Dobramento do Embrião' },
  { id: 'tSqOhvdTDnc', title: 'Embriologia da 4ª à 8ª Semana' },
  { id: 'aFEVmlbJ708', title: 'Embriologia da 9ª Semana ao Nascimento' },
  { id: 'L2IZEut6Yok', title: 'Cavidades do Corpo Embrionário' },
  { id: 'CeDWt2Qg3UE', title: 'Desenvolvimento do Diafragma' },
  { id: 'WEzfPk3OJ9o', title: 'Aparelho Faríngeo (Arcos e Derivados)' },
  { id: 'Wxo8xMksxiU', title: 'Aparelho Faríngeo (Bolsas, Sulcos e Membranas)' },
  { id: 'axyh2MK-XDU', title: 'Embriologia do Pescoço' },
  { id: 'fnJnYip6qWA', title: 'Primórdio Respiratório e Faringe' },
  { id: 'iExD4xImT24', title: 'Embriologia da Face' },
  { id: 'xQO9_OJmuCI', title: 'Embriologia do Palato' },
  { id: '7ydEZDWXWmg', title: 'Maturação Pulmonar' },
  { id: 'a3zj8iowhJ8', title: 'Membranas Fetais' },
  { id: 'f2k4ng4kLzQ', title: 'Traqueia, Brônquios e Pulmões' },
  { id: 'IqL5Icry-ZQ', title: 'Intestino Anterior (Bolsa Omental e Duodeno)' },
  { id: 'V3gyiEpoEXA', title: 'Intestino Anterior (Fígado e Sistema Biliar)' },
  { id: 'D4GpR1-IJ5M', title: 'Intestino Anterior (Pâncreas e Baço)' },
  { id: 'BbYOX4kR3vc', title: 'Placenta' },
  { id: 'kDNHoeo5Yio', title: 'Intestino Anterior (Esôfago e Estômago)' },
  { id: 'MvR0FbqGD_Y', title: 'Intestino Médio (Herniação e Rotação)' },
  { id: 'XU-voGzqC_c', title: 'Intestino Médio (Ceco e Apêndice)' },
  { id: 'kCVHiNzogbI', title: 'Intestino Posterior e Cloaca' },
  { id: 'Tow8vrGpf6A', title: 'Sistema Urinário (Bexiga e Defeitos)' },
  { id: 'Sb62GtZf0LY', title: 'Sistema Genital (Gônadas Indiferenciadas)' },
  { id: '8ivU4plbcUw', title: 'Desenvolvimento do Coração e Vasos' },
];

const SANARFLIX_COURSES = [
  "Anatomia do Sistema Locomotor", "Anatomia dos Órgãos e Sistemas", "Antibioticoterapia",
  "Atendimento Pré-Hospitalar", "Biofísica", "Biologia Molecular e Celular",
  "Bioquímica", "Eletrocardiograma (ECG)", "Embriologia", "Exames Laboratoriais",
  "Farmacologia", "Fisiologia", "Genética", "Histologia", "Microbiologia",
  "Neuroanatomia", "Parasitologia", "Patologia", "Primeiros Socorros",
  "Radiologia", "Semiologia", "Sistema Circulatório", "Sistema Digestório",
  "Sistema Endócrino", "Sistema Hematopoiético", "Sistema Imune", "Sistema Nervoso",
  "Sistema Reprodutor", "Sistema Respiratório", "Sistema Urinário e Renal", "Trauma"
];

const PREMIUM_PLATFORMS = [
  { id: 'sanarflix', title: 'Sanarflix', description: 'Plataforma oficial Sanarflix.', image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600' },
  { id: 'medcurso', title: 'Medcurso', description: 'Preparatório para Residência Médica.', image: 'https://images.unsplash.com/photo-1581594632702-52c1138395c5?auto=format&fit=crop&q=80&w=600' },
  { id: 'eumedico', title: 'Eu Médico Residente', description: 'Especialização e Prática Clínica.', image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=600' },
  { id: 'estrategiamed', title: 'EstratégiaMED', description: 'Foco total em aprovação e revisões.', image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=600' }
];

const PremiumView: React.FC<PremiumViewProps> = ({ userStats }) => {
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [activeVideo, setActiveVideo] = useState<VideoLesson | null>(null);
  const [search, setSearch] = useState('');
  const [isMuted, setIsMuted] = useState(true);
  const [watchedVideos, setWatchedVideos] = useState<string[]>([]);
  const [lastWatched, setLastWatched] = useState<LastWatched | null>(null);
  
  const videoRef = useRef<HTMLIFrameElement>(null);

  // Carregar progresso
  useEffect(() => {
    const userId = userStats.displayName || 'default';
    const savedWatched = localStorage.getItem(`nexus_watched_${userId}`);
    const savedLast = localStorage.getItem(`nexus_last_v2_${userId}`);
    if (savedWatched) setWatchedVideos(JSON.parse(savedWatched));
    if (savedLast) setLastWatched(JSON.parse(savedLast));
  }, [userStats.displayName]);

  const markAsWatched = (id: string) => {
    const userId = userStats.displayName || 'default';
    const newWatched = watchedVideos.includes(id) 
      ? watchedVideos.filter(v => v !== id)
      : [...watchedVideos, id];
    setWatchedVideos(newWatched);
    localStorage.setItem(`nexus_watched_${userId}`, JSON.stringify(newWatched));
  };

  const handleLessonSelect = (lesson: VideoLesson) => {
    setActiveVideo(lesson);
    const userId = userStats.displayName || 'default';
    const lastData: LastWatched = {
      lessonId: lesson.id,
      lessonTitle: lesson.title,
      courseName: selectedCourse || 'Embriologia',
      platformId: selectedPlatform || 'sanarflix'
    };
    setLastWatched(lastData);
    localStorage.setItem(`nexus_last_v2_${userId}`, JSON.stringify(lastData));
  };

  const toggleMute = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    if (videoRef.current?.contentWindow) {
      videoRef.current.contentWindow.postMessage(JSON.stringify({
        method: 'setVolume', value: newMutedState ? 0 : 1
      }), '*');
    }
  };

  const filteredPlatforms = useMemo(() => 
    PREMIUM_PLATFORMS.filter(p => p.title.toLowerCase().includes(search.toLowerCase())), 
  [search]);

  const filteredCourses = useMemo(() => 
    SANARFLIX_COURSES.filter(c => c.toLowerCase().includes(search.toLowerCase())), 
  [search]);

  const filteredLessons = useMemo(() => 
    EMBRIOLOGIA_LESSONS.filter(l => l.title.toLowerCase().includes(search.toLowerCase())), 
  [search]);

  if (!userStats.isPremium) {
    return (
      <div className="max-w-[1200px] mx-auto pt-10 pb-32 px-4 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-600/10 border border-blue-600/30 px-4 py-1.5 rounded-full mb-8">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
            <span className="text-blue-500 text-[10px] font-black uppercase tracking-widest">Upgrade Disponível</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter leading-none">
            Estude sem limites com o <span className="text-blue-600">Nexus Premium</span>
          </h1>
          <p className="text-neutral-400 text-lg md:text-2xl font-light max-w-3xl mx-auto leading-relaxed">
            A ferramenta definitiva para quem leva a medicina a sério. Vá além das questões e domine o método PBL.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            { title: "Plataformas de Elite", desc: "Acesso direto ao catálogo de gigantes como Sanarflix e Medcurso.", icon: "💎" },
            { title: "Streaming Educacional", desc: "Assista onde e quando quiser com controle de progresso inteligente.", icon: "▶" },
            { title: "Foco Total em Medicina", desc: "Conteúdo estruturado por ciclos para sua aprovação.", icon: "🩺" }
          ].map((feat, i) => (
            <div key={i} className="bg-neutral-900/30 border border-neutral-800 p-10 rounded-[2.5rem] hover:border-blue-600/30 transition-all group shadow-xl">
              <div className="text-4xl text-blue-600 mb-6 font-bold opacity-50 group-hover:opacity-100 transition-opacity">{feat.icon}</div>
              <h3 className="text-xl font-black text-white mb-4 tracking-tight">{feat.title}</h3>
              <p className="text-neutral-500 text-sm leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-1 rounded-[3.5rem] shadow-2xl shadow-blue-600/20">
          <div className="bg-[#0a0a0a] rounded-[3.3rem] p-10 md:p-20 text-center">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-8 tracking-tight">Pronto para o próximo nível?</h2>
            <button className="bg-blue-600 hover:bg-blue-500 text-white font-black py-5 px-12 rounded-2xl transition-all shadow-xl shadow-blue-600/30 text-lg uppercase tracking-widest active:scale-95">
              Assinar Agora
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-700 pb-20 w-full">
      {/* Banner Principal (Só aparece na Home do Premium) */}
      {!selectedPlatform && (
        <section className="relative w-full h-[60vh] md:h-[80vh] mb-12 overflow-hidden rounded-[1.5rem] md:rounded-[3rem] group mx-auto max-w-[1800px]">
          <div className="absolute inset-0 w-full h-full pointer-events-none scale-[1.35]">
            <iframe 
              ref={videoRef}
              src="https://player.vimeo.com/video/1155181147?autoplay=1&loop=1&muted=1&background=1&controls=0&badge=0&autopause=0&player_id=0&app_id=58479" 
              className="w-full h-full object-cover"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              title="Banner Video"
            ></iframe>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>
          <button onClick={toggleMute} className="absolute top-10 right-10 z-20 w-12 h-12 bg-black/30 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-black/50 transition-all shadow-2xl">
            {isMuted ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="1" y1="1" x2="23" y2="23"/><path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a2 2 0 0 0-3.54-1.3l-3.32 3.32"/><path d="M3 13H5l4 4V10"/><path d="M15.54 10.76a2 2 0 0 1 0 2.48"/><path d="M19.07 14.29a5 5 0 0 0 0-4.58"/></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
            )}
          </button>
          <div className="absolute left-6 md:left-16 bottom-10 md:bottom-20 max-w-2xl z-10">
            <span className="bg-blue-600 text-white text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-widest mb-4 inline-block">Destaque da Semana</span>
            <h1 className="text-5xl md:text-8xl font-black text-white mb-6 tracking-tighter italic leading-none">Sanarflix</h1>
            <p className="text-neutral-300 text-lg md:text-xl font-light mb-8 leading-relaxed">
              O maior ecossistema de ensino médico do Brasil. Domine o Ciclo Básico e Clínico com aulas didáticas e objetivas.
            </p>
            <button onClick={() => setSelectedPlatform('sanarflix')} className="bg-white text-black font-black py-4 px-10 rounded-xl hover:bg-blue-600 hover:text-white transition-all text-base uppercase tracking-widest flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              Explorar Catálogo
            </button>
          </div>
        </section>
      )}

      <div className="max-w-[1800px] mx-auto px-4 md:px-8">
        {/* Continuar Assistindo (Só na Home) */}
        {!selectedPlatform && lastWatched && (
          <section className="mb-16 animate-in fade-in slide-in-from-left-4 duration-500">
            <h3 className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.4em] mb-6 flex items-center gap-4">
              Continuar Assistindo <div className="h-px flex-grow bg-neutral-800/50"></div>
            </h3>
            <div 
              onClick={() => { setSelectedPlatform(lastWatched.platformId); setSelectedCourse(lastWatched.courseName); }}
              className="group relative max-w-sm aspect-video bg-neutral-900 rounded-3xl overflow-hidden border border-neutral-800 hover:border-blue-600 transition-all cursor-pointer shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
              <img src={`https://img.youtube.com/vi/${lastWatched.lessonId}/maxresdefault.jpg`} alt="Last" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 bg-white/10 backdrop-blur rounded-full flex items-center justify-center text-white border border-white/20 group-hover:bg-blue-600 transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                </div>
              </div>
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[8px] font-black text-blue-500 uppercase tracking-widest mb-1 block">{lastWatched.courseName}</span>
                <h4 className="text-white font-bold text-lg leading-tight line-clamp-1">{lastWatched.lessonTitle}</h4>
              </div>
            </div>
          </section>
        )}

        {/* Header de Navegação / Título */}
        <header className="mb-10">
          <div className="flex flex-wrap items-center gap-2 text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-4">
            <button onClick={() => { setSelectedPlatform(null); setSelectedCourse(null); setActiveVideo(null); }} className="hover:text-white transition-colors">Catálogo Premium</button>
            {selectedPlatform && (
              <>
                <span>/</span>
                <button onClick={() => { setSelectedCourse(null); setActiveVideo(null); }} className="text-neutral-300 hover:text-white">{PREMIUM_PLATFORMS.find(p => p.id === selectedPlatform)?.title}</button>
              </>
            )}
            {selectedCourse && (
              <>
                <span>/</span>
                <span className="text-blue-500">{selectedCourse}</span>
              </>
            )}
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter">
              {selectedCourse ? selectedCourse : (selectedPlatform ? `Cursos: ${selectedPlatform.toUpperCase()}` : "Plataformas Disponíveis")}
            </h2>
            <div className="relative w-full md:w-80">
              <input 
                type="text" 
                placeholder="Pesquisar..." 
                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl py-3 px-10 text-xs text-white focus:border-blue-600 outline-none transition-all placeholder:text-neutral-700"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-600" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </div>
          </div>
        </header>

        {/* NÍVEL 1: Plataformas */}
        {!selectedPlatform && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 animate-in fade-in duration-500">
            {filteredPlatforms.map((p) => (
              <div key={p.id} onClick={() => setSelectedPlatform(p.id)} className="group relative aspect-video rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-800 hover:border-blue-500 transition-all cursor-pointer shadow-2xl">
                <img src={p.image} alt={p.title} className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-all duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                   <h3 className="text-2xl font-black text-white tracking-tight mb-2 group-hover:text-blue-500 transition-colors">{p.title}</h3>
                   <p className="text-neutral-400 text-xs font-light leading-relaxed mb-4">{p.description}</p>
                   <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 group-hover:translate-x-2 transition-transform inline-block">Acessar →</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* NÍVEL 2: Cursos (Sanarflix) */}
        {selectedPlatform === 'sanarflix' && !selectedCourse && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 animate-in fade-in duration-500">
            {filteredCourses.map((course, idx) => (
              <div 
                key={idx} 
                onClick={() => setSelectedCourse(course)}
                className="group relative aspect-[2/3] md:aspect-video rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800 hover:border-blue-500/50 transition-all cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 to-black opacity-60"></div>
                <div className="absolute inset-0 p-4 flex flex-col justify-end bg-gradient-to-t from-black via-transparent to-transparent">
                  <span className="text-[8px] font-black text-blue-500 uppercase tracking-widest mb-1 opacity-0 group-hover:opacity-100 transition-all">Sanarflix</span>
                  <h3 className="text-white font-bold text-xs md:text-sm leading-tight group-hover:text-blue-400 transition-colors">{course}</h3>
                </div>
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-10 h-10 bg-white/10 backdrop-blur rounded-full flex items-center justify-center text-white border border-white/20 scale-75 group-hover:scale-100 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* NÍVEL 3: Aulas (Exemplo: Embriologia) */}
        {selectedCourse === 'Embriologia' && (
          <div className="flex flex-col lg:flex-row gap-12 animate-in fade-in duration-500">
            <div className="flex-grow lg:w-2/3">
              <div className="sticky top-24">
                {activeVideo ? (
                  <div className="w-full bg-black aspect-video rounded-[2rem] overflow-hidden shadow-2xl border border-neutral-800">
                    <iframe src={`https://www.youtube.com/embed/${activeVideo.id}?autoplay=1`} className="w-full h-full" frameBorder="0" allowFullScreen title={activeVideo.title}></iframe>
                  </div>
                ) : (
                  <div className="w-full aspect-video bg-neutral-900/40 rounded-[2rem] flex flex-col items-center justify-center border-2 border-dashed border-neutral-800 text-center p-8">
                    <div className="w-16 h-16 bg-neutral-800 rounded-full flex items-center justify-center text-neutral-600 mb-6"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg></div>
                    <h4 className="text-white font-bold mb-2">Selecione uma aula</h4>
                    <p className="text-neutral-500 text-sm">Escolha um tema na lista ao lado.</p>
                  </div>
                )}
                {activeVideo && (
                  <div className="mt-8 flex justify-between items-center p-8 bg-neutral-900/40 rounded-[2rem] border border-neutral-800">
                    <div><span className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-1 block">Aula Atual</span><h3 className="text-2xl font-black text-white tracking-tight">{activeVideo.title}</h3></div>
                    <button onClick={() => markAsWatched(activeVideo.id)} className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${watchedVideos.includes(activeVideo.id) ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-600/30' : 'bg-white text-black hover:bg-emerald-500 hover:text-white'}`}>
                      {watchedVideos.includes(activeVideo.id) ? '✓ Assistida' : 'Marcar como Assistida'}
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="w-full lg:w-1/3 max-h-[80vh] overflow-y-auto no-scrollbar space-y-3">
              <h3 className="text-[10px] font-black text-neutral-600 uppercase tracking-widest px-4 mb-4">Grade do Curso ({filteredLessons.length})</h3>
              {filteredLessons.map((lesson, idx) => (
                <div key={lesson.id} onClick={() => handleLessonSelect(lesson)} className={`group p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-4 ${activeVideo?.id === lesson.id ? 'bg-blue-600/10 border-blue-600/50' : 'bg-neutral-900/30 border-neutral-800 hover:border-neutral-700'}`}>
                  <div className="relative w-24 aspect-video rounded-lg overflow-hidden shrink-0 bg-neutral-800">
                    <img src={`https://img.youtube.com/vi/${lesson.id}/default.jpg`} alt="T" className="w-full h-full object-cover opacity-50" />
                    {watchedVideos.includes(lesson.id) && <div className="absolute top-1 right-1 bg-emerald-500 rounded-full p-0.5"><svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div>}
                    <div className="absolute inset-0 flex items-center justify-center"><svg className={`w-6 h-6 ${activeVideo?.id === lesson.id ? 'text-blue-500' : 'text-white/40'}`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg></div>
                  </div>
                  <div className="flex-grow min-w-0">
                    <h4 className={`text-xs md:text-sm font-bold line-clamp-2 ${activeVideo?.id === lesson.id ? 'text-blue-400' : 'text-neutral-300'}`}>{idx + 1}. {lesson.title}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Placeholder para outros cursos */}
        {selectedCourse && selectedCourse !== 'Embriologia' && (
          <div className="py-20 text-center border-2 border-dashed border-neutral-800 rounded-[3rem] animate-in fade-in duration-500">
             <div className="w-16 h-16 bg-neutral-900 rounded-full flex items-center justify-center text-neutral-700 mx-auto mb-6"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg></div>
             <h3 className="text-2xl font-black text-white mb-2">Conteúdo em Processamento</h3>
             <p className="text-neutral-500">A equipe Nexus está organizando as aulas do curso <span className="text-white">{selectedCourse}</span>.</p>
             <button onClick={() => setSelectedCourse(null)} className="mt-8 text-blue-500 font-bold uppercase tracking-widest text-xs hover:underline">Voltar ao catálogo</button>
          </div>
        )}

        {/* Placeholder para outras plataformas */}
        {selectedPlatform && selectedPlatform !== 'sanarflix' && (
          <div className="py-20 text-center border-2 border-dashed border-neutral-800 rounded-[3rem] animate-in fade-in duration-500">
             <div className="w-16 h-16 bg-neutral-900 rounded-full flex items-center justify-center text-neutral-700 mx-auto mb-6"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg></div>
             <h3 className="text-2xl font-black text-white mb-2">Acesso Temporário Restrito</h3>
             <p className="text-neutral-500">Esta plataforma estará disponível em breve no catálogo Premium.</p>
             <button onClick={() => setSelectedPlatform(null)} className="mt-8 text-blue-500 font-bold uppercase tracking-widest text-xs hover:underline">Voltar ao Início</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PremiumView;
