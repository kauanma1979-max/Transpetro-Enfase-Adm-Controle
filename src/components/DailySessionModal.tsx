import React, { useState, useEffect } from 'react';
import { ScheduleDay, SessionBlock } from '../data/scheduleData';
import { 
  X, 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle2, 
  BookOpen, 
  HelpCircle, 
  PenTool, 
  FastForward,
  Sparkles,
  Layers,
  Clock
} from 'lucide-react';

interface DailySessionModalProps {
  day: ScheduleDay | null;
  onClose: () => void;
  onCompleteDay: (dayId: string) => void;
}

export const DailySessionModal: React.FC<DailySessionModalProps> = ({
  day,
  onClose,
  onCompleteDay
}) => {
  if (!day) return null;

  const [activeBlockTab, setActiveBlockTab] = useState<'blocoA' | 'blocoB'>('blocoA');

  // If old structure day without blocoA, fallback gracefully
  const currentBlock: SessionBlock = activeBlockTab === 'blocoA' 
    ? (day.blocoA || {
        disciplina: day.disciplina || 'Conhecimentos Específicos',
        disciplinaId: 'logistica',
        subtopico: day.subtopicoExato || 'Estudo Focado',
        duracaoMin: 90,
        teoriaMin: day.divisaoSessao?.teoriaMin || 25,
        questoesMin: day.divisaoSessao?.questoesMin || 50,
        revisaoMin: day.divisaoSessao?.revisaoMin || 15,
        objetivos: ['Revisar tópicos teóricos', 'Resolver questões Cesgranrio']
      })
    : (day.blocoB || {
        disciplina: 'Segunda Disciplina do Dia',
        disciplinaId: 'financas',
        subtopico: 'Estudo Intercalado Complementar',
        duracaoMin: 90,
        teoriaMin: 25,
        questoesMin: 50,
        revisaoMin: 15,
        objetivos: ['Praticar resolução cronometrada', 'Alimentar caderno de erros']
      });

  const phases = [
    { name: 'Teoria Focada', durationMin: currentBlock.teoriaMin, icon: BookOpen, desc: 'Leitura sintética da lei seca, resumos estruturados e conceitos essenciais.' },
    { name: 'Questões Cesgranrio', durationMin: currentBlock.questoesMin, icon: HelpCircle, desc: 'Resolução intensiva de questões de prova sem consulta prévia ao gabarito.' },
    { name: 'Revisão & Caderno de Erros', durationMin: currentBlock.revisaoMin, icon: PenTool, desc: 'Registro obrigatório no Caderno de Erros e fixação das pegadinhas da banca.' }
  ].filter(p => p.durationMin > 0);

  const [currentPhaseIdx, setCurrentPhaseIdx] = useState<number>(0);
  const [secondsRemaining, setSecondsRemaining] = useState<number>((phases[0]?.durationMin || 25) * 60);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // Reset timer when switching block tabs
  const handleSwitchTab = (tab: 'blocoA' | 'blocoB') => {
    setActiveBlockTab(tab);
    setCurrentPhaseIdx(0);
    const block = tab === 'blocoA' ? day.blocoA : day.blocoB;
    const firstDuration = block?.teoriaMin || 25;
    setSecondsRemaining(firstDuration * 60);
    setIsActive(false);
  };

  const currentPhase = phases[currentPhaseIdx] || phases[0];

  useEffect(() => {
    let interval: any = null;
    if (isActive && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining(sec => sec - 1);
      }, 1000);
    } else if (secondsRemaining === 0 && isActive) {
      if (currentPhaseIdx < phases.length - 1) {
        const nextIdx = currentPhaseIdx + 1;
        setCurrentPhaseIdx(nextIdx);
        setSecondsRemaining(phases[nextIdx].durationMin * 60);
      } else {
        setIsActive(false);
        setIsCompleted(true);
        onCompleteDay(day.id);
      }
    }
    return () => clearInterval(interval);
  }, [isActive, secondsRemaining, currentPhaseIdx, phases, day, onCompleteDay]);

  const handleNextPhase = () => {
    if (currentPhaseIdx < phases.length - 1) {
      const nextIdx = currentPhaseIdx + 1;
      setCurrentPhaseIdx(nextIdx);
      setSecondsRemaining(phases[nextIdx].durationMin * 60);
    } else {
      setIsActive(false);
      setIsCompleted(true);
      onCompleteDay(day.id);
    }
  };

  const handleResetPhase = () => {
    setIsActive(false);
    setSecondsRemaining((currentPhase?.durationMin || 25) * 60);
  };

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const PhaseIcon = currentPhase?.icon || BookOpen;

  const totalPhaseSec = (currentPhase?.durationMin || 25) * 60;
  const phaseProgressPct = Math.round(((totalPhaseSec - secondsRemaining) / totalPhaseSec) * 100);

  return (
    <div className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-slate-900 text-white rounded-2xl max-w-2xl w-full p-5 sm:p-7 shadow-2xl border border-slate-800 relative my-8 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header */}
        <div className="pr-8">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono font-bold text-emerald-400 mb-1">
            <span>{day.diaSemana} · {day.dataSugerida}</span>
            <span>•</span>
            <span className="px-2 py-0.5 rounded-md bg-emerald-950 text-emerald-300 border border-emerald-800">
              3 Horas Diárias (2 Matérias de 1h30)
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-bold tracking-tight text-white leading-snug">
            {day.focoGeralDoDia || 'Sessão Diária de Estudos'}
          </h3>
        </div>

        {/* Block Switcher (Materia 1 vs Materia 2) */}
        <div className="grid grid-cols-2 gap-2 mt-4 p-1 bg-slate-950 rounded-xl border border-slate-800">
          <button
            onClick={() => handleSwitchTab('blocoA')}
            className={`p-2.5 rounded-lg text-left transition-all ${
              activeBlockTab === 'blocoA'
                ? 'bg-slate-800 text-white shadow-xs border border-emerald-500/50'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <div className="flex items-center justify-between text-[10px] font-mono uppercase font-bold text-emerald-400">
              <span>Bloco 1 (1h30)</span>
              <span>1º Turno</span>
            </div>
            <div className="text-xs font-bold truncate mt-0.5">
              {day.blocoA?.disciplina || 'Matéria 1'}
            </div>
          </button>

          <button
            onClick={() => handleSwitchTab('blocoB')}
            className={`p-2.5 rounded-lg text-left transition-all ${
              activeBlockTab === 'blocoB'
                ? 'bg-slate-800 text-white shadow-xs border border-emerald-500/50'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <div className="flex items-center justify-between text-[10px] font-mono uppercase font-bold text-blue-400">
              <span>Bloco 2 (1h30)</span>
              <span>2º Turno</span>
            </div>
            <div className="text-xs font-bold truncate mt-0.5">
              {day.blocoB?.disciplina || 'Matéria 2'}
            </div>
          </button>
        </div>

        {/* Active Block Info */}
        <div className="mt-4 p-3.5 bg-slate-800/60 rounded-xl border border-slate-800 space-y-1">
          <div className="text-xs font-semibold text-emerald-400">
            {currentBlock.disciplina}
          </div>
          <div className="text-sm font-bold text-white">
            {currentBlock.subtopico}
          </div>
          {currentBlock.dicaCesgranrio && (
            <div className="text-xs text-amber-300 flex items-start gap-1.5 pt-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
              <span>Dica Cesgranrio: {currentBlock.dicaCesgranrio}</span>
            </div>
          )}
        </div>

        {/* Phase Stepper */}
        <div className="grid grid-cols-3 gap-2 mt-4">
          {phases.map((p, idx) => {
            const isCurrent = idx === currentPhaseIdx;
            const isDone = idx < currentPhaseIdx || isCompleted;

            return (
              <div 
                key={p.name}
                className={`p-2.5 rounded-xl border text-center transition-all ${
                  isCurrent 
                    ? 'bg-slate-800/90 border-emerald-500 ring-1 ring-emerald-500/50 shadow-xs' 
                    : isDone
                    ? 'bg-slate-800/40 border-slate-700 text-slate-400'
                    : 'bg-slate-900 border-slate-800 text-slate-600'
                }`}
              >
                <div className="text-[10px] font-mono font-bold uppercase">
                  {isDone ? '✓ ' : `Fase ${idx + 1}: `}{p.durationMin}m
                </div>
                <div className={`text-xs font-bold truncate mt-0.5 ${isCurrent ? 'text-white' : ''}`}>
                  {p.name.split(' ')[0]}
                </div>
              </div>
            );
          })}
        </div>

        {/* Timer Display */}
        {!isCompleted ? (
          <div className="my-6 text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-300">
              <PhaseIcon className="w-4 h-4 text-emerald-400" />
              <span>{currentPhase?.name} ({activeBlockTab === 'blocoA' ? 'Bloco 1' : 'Bloco 2'})</span>
            </div>

            <div className="text-5xl sm:text-6xl font-black font-mono tracking-tight text-white">
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </div>

            <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
              {currentPhase?.desc}
            </p>

            {/* Progress Bar */}
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden border border-slate-700 max-w-md mx-auto">
              <div 
                className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${phaseProgressPct}%` }}
              />
            </div>
          </div>
        ) : (
          <div className="my-6 text-center space-y-3 py-4 bg-emerald-950/40 border border-emerald-500/30 rounded-2xl">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
            <h4 className="text-lg font-bold text-white">Sessão Diária de 3 Horas Concluída!</h4>
            <p className="text-xs text-slate-300 max-w-md mx-auto">
              Excelente trabalho! O dia foi registrado no seu cronograma de 315 horas (21h/semana · 7 dias).
            </p>
          </div>
        )}

        {/* Controls */}
        <div className="flex items-center justify-center gap-3 pt-2">
          {!isCompleted ? (
            <>
              <button
                onClick={handleResetPhase}
                className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-colors border border-slate-700"
                title="Reiniciar Fase"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsActive(!isActive)}
                className={`px-7 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 shadow-xs transition-transform active:scale-95 ${
                  isActive 
                    ? 'bg-amber-600 hover:bg-amber-500 text-white' 
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                }`}
              >
                {isActive ? (
                  <>
                    <Pause className="w-4 h-4 fill-white" />
                    <span>Pausar</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-white" />
                    <span>Iniciar Cronômetro</span>
                  </>
                )}
              </button>

              <button
                onClick={handleNextPhase}
                className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-colors border border-slate-700"
                title="Avançar para Próxima Fase"
              >
                <FastForward className="w-4 h-4" />
              </button>
            </>
          ) : (
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs sm:text-sm shadow-xs"
            >
              Fechar e Salvar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
