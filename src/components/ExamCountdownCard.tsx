import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  Calendar, 
  Target, 
  AlertCircle, 
  ChevronUp, 
  ChevronDown, 
  Flame, 
  CheckCircle2, 
  BookOpen, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface ExamCountdownCardProps {
  onNavigateTab?: (tabKey: string) => void;
  activeTab?: string;
}

// Data oficial da prova: 06 de Dezembro de 2026 às 13h00 (Brasília)
export const EXAM_TARGET_DATE_ISO = '2026-12-06T13:00:00-03:00';
export const EXAM_TARGET_DATE_LABEL = '06/12/2026 (Domingo às 13h00)';

export const ExamCountdownCard: React.FC<ExamCountdownCardProps> = ({ 
  onNavigateTab,
  activeTab 
}) => {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    totalMs: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0, totalMs: 0 });

  const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
    try {
      return localStorage.getItem('transpetro_countdown_collapsed_v1') === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const examTimestamp = new Date(EXAM_TARGET_DATE_ISO).getTime();

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = examTimestamp - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds, totalMs: difference });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, totalMs: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleCollapsed = () => {
    setIsCollapsed(prev => {
      const next = !prev;
      try {
        localStorage.setItem('transpetro_countdown_collapsed_v1', String(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const isExamDayOrPast = timeLeft.totalMs <= 0;
  const weeksRemaining = Math.max(0, Math.ceil(timeLeft.days / 7));

  return (
    <section 
      aria-label="Contagem regressiva oficial para a prova"
      className="mb-6 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white border border-emerald-500/30 shadow-lg shadow-slate-950/20 overflow-hidden relative"
    >
      {/* Decorative background glow accents */}
      <div className="absolute top-0 right-0 w-80 h-40 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-60 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none -ml-10 -mb-10"></div>

      {/* Top Bar with Status and Collapse Toggle */}
      <div className="px-4 py-2.5 sm:px-6 border-b border-slate-800/80 bg-slate-950/60 flex items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1.5 font-bold tracking-tight text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="uppercase text-[11px] tracking-wider">CONTAGEM REGRESSIVA OFICIAL</span>
          </div>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <div className="flex items-center gap-1.5 text-slate-300 font-medium">
            <Calendar className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Data da Prova: <strong className="text-amber-300 font-bold">06/12/2026</strong></span>
            <span className="text-slate-500 hidden md:inline">(Domingo)</span>
          </div>
          <span className="text-slate-600 hidden md:inline">|</span>
          <span className="text-slate-400 hidden lg:inline">
            Fundação Cesgranrio · 4h de Prova · 60 Questões
          </span>
        </div>

        <button
          type="button"
          onClick={toggleCollapsed}
          className="text-slate-400 hover:text-white transition-colors flex items-center gap-1 text-[11px] font-medium px-2 py-1 rounded-md hover:bg-slate-800/60 cursor-pointer"
          title={isCollapsed ? 'Expandir painel de contagem' : 'Recolher painel de contagem'}
        >
          <span className="hidden sm:inline">{isCollapsed ? 'Expandir' : 'Recolher'}</span>
          {isCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
        </button>
      </div>

      {/* Main Content Area */}
      {!isCollapsed ? (
        <div className="p-3.5 sm:p-5 space-y-3.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Left: Highlight Title & Strategic Subtitle */}
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-300 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-md">
                <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400/20" />
                <span>Reta Final: {weeksRemaining} {weeksRemaining === 1 ? 'semana restante' : 'semanas restantes'}</span>
              </div>
              <h2 className="text-lg sm:text-xl font-black tracking-tight text-white flex items-center gap-2">
                Prova Transpetro 2026.3
                <span className="text-emerald-400 font-bold">· 06/12/2026</span>
              </h2>
            </div>

            {/* Right: The 3 Compact Countdown Metric Blocks (Dias, Horas, Minutos) */}
            <div className="grid grid-cols-3 gap-2 sm:gap-2.5 shrink-0 self-start sm:self-center">
              {/* Dias */}
              <div className="bg-slate-950/85 border border-slate-800 rounded-lg px-2.5 py-1.5 sm:px-3 sm:py-2 text-center min-w-[56px] sm:min-w-[68px] shadow-inner">
                <div className="text-lg sm:text-2xl font-bold font-mono text-white tracking-tight">
                  {timeLeft.days}
                </div>
                <div className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Dias
                </div>
              </div>

              {/* Horas */}
              <div className="bg-slate-950/85 border border-slate-800 rounded-lg px-2.5 py-1.5 sm:px-3 sm:py-2 text-center min-w-[56px] sm:min-w-[68px] shadow-inner">
                <div className="text-lg sm:text-2xl font-bold font-mono text-white tracking-tight">
                  {String(timeLeft.hours).padStart(2, '0')}
                </div>
                <div className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Horas
                </div>
              </div>

              {/* Minutos */}
              <div className="bg-slate-950/85 border border-emerald-500/40 rounded-lg px-2.5 py-1.5 sm:px-3 sm:py-2 text-center min-w-[56px] sm:min-w-[68px] shadow-inner">
                <div className="text-lg sm:text-2xl font-bold font-mono text-emerald-400 tracking-tight">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </div>
                <div className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Minutos
                </div>
              </div>
            </div>
          </div>

          {/* Quick Action Navigation Buttons */}
          <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-slate-400 text-[11px]">
              <Target className="w-3.5 h-3.5 text-emerald-400" />
              <span>Ênfase 1: Administração e Controle · Horário Previsto: 13h00 às 17h00</span>
            </div>

            {onNavigateTab && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onNavigateTab('cronograma')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                    activeTab === 'cronograma'
                      ? 'bg-emerald-500 text-slate-950 font-bold'
                      : 'bg-slate-800/90 hover:bg-slate-700 text-slate-200'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Ver Cronograma</span>
                </button>

                <button
                  type="button"
                  onClick={() => onNavigateTab('caderno')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                    activeTab === 'caderno'
                      ? 'bg-amber-400 text-slate-950 font-bold'
                      : 'bg-slate-800/90 hover:bg-slate-700 text-slate-200'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                  <span>Caderno de Erros</span>
                </button>

                <button
                  type="button"
                  onClick={() => onNavigateTab('pareto')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                    activeTab === 'pareto'
                      ? 'bg-emerald-500 text-slate-950 font-bold'
                      : 'bg-slate-800/90 hover:bg-slate-700 text-slate-200'
                  }`}
                >
                  <span>Matriz 80/20</span>
                  <ArrowRight className="w-3 h-3 text-slate-400" />
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Compact Bar when user chooses to collapse */
        <div className="px-4 py-2.5 sm:px-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
            <div className="text-xs sm:text-sm font-medium text-slate-300">
              Tempo restante até a prova (06/12/2026):
            </div>
          </div>

          <div className="flex items-center gap-1.5 font-mono font-bold text-xs sm:text-sm">
            <span className="text-white bg-slate-950 px-2 py-0.5 rounded-md border border-slate-800">
              {timeLeft.days}d
            </span>
            <span className="text-white bg-slate-950 px-2 py-0.5 rounded-md border border-slate-800">
              {String(timeLeft.hours).padStart(2, '0')}h
            </span>
            <span className="text-emerald-400 bg-slate-950 px-2 py-0.5 rounded-md border border-slate-800">
              {String(timeLeft.minutes).padStart(2, '0')}m
            </span>
          </div>
        </div>
      )}
    </section>
  );
};
