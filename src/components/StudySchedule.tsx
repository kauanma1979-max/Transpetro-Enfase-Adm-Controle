import React, { useState, useEffect } from 'react';
import { 
  CRONOGRAMA_15_SEMANAS, 
  ScheduleWeek, 
  ScheduleDay,
  SessionBlock,
  TOTAL_SEMANAS_ESTUDO,
  TOTAL_HORAS_ESTUDO,
  DATA_INICIO_ESTUDOS,
  DATA_ENCERRAMENTO_ESTUDOS
} from '../data/scheduleData';
import { 
  CheckCircle2, 
  Circle, 
  Calendar, 
  Clock, 
  Play, 
  Award, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight,
  Lightbulb,
  CheckSquare,
  BookOpen,
  HelpCircle,
  RotateCw,
  Layers,
  Flame,
  FileSpreadsheet,
  Save,
  Check,
  ChevronDown,
  ChevronUp,
  FileText,
  Trash2,
  Database
} from 'lucide-react';
import { exportFullBackup, notifyDataUpdated, STORAGE_KEYS } from '../utils/backupStorage';

interface StudyScheduleProps {
  completedDays: string[];
  onToggleDay: (dayId: string) => void;
  onOpenSessionTimer: (day: ScheduleDay) => void;
  onNavigateToVerticalizado?: () => void;
}

export const StudySchedule: React.FC<StudyScheduleProps> = ({
  completedDays,
  onToggleDay,
  onOpenSessionTimer,
  onNavigateToVerticalizado
}) => {
  const [selectedWeekNum, setSelectedWeekNum] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('transpetro_schedule_selected_week');
      if (saved) {
        const parsed = parseInt(saved, 10);
        if (!isNaN(parsed) && parsed >= 1 && parsed <= TOTAL_SEMANAS_ESTUDO) {
          return parsed;
        }
      }
    } catch {
      // ignore
    }
    return 1;
  });

  const [activeBlocoFilter, setActiveBlocoFilter] = useState<number | 'todos'>(() => {
    try {
      const saved = localStorage.getItem('transpetro_schedule_bloco_filter');
      if (saved) {
        if (saved === 'todos') return 'todos';
        const parsed = parseInt(saved, 10);
        if (!isNaN(parsed)) return parsed;
      }
    } catch {
      // ignore
    }
    return 'todos';
  });

  useEffect(() => {
    try {
      localStorage.setItem('transpetro_schedule_selected_week', String(selectedWeekNum));
    } catch {
      // ignore
    }
  }, [selectedWeekNum]);

  useEffect(() => {
    try {
      localStorage.setItem('transpetro_schedule_bloco_filter', String(activeBlocoFilter));
    } catch {
      // ignore
    }
  }, [activeBlocoFilter]);
  const [expandedNotes, setExpandedNotes] = useState<Record<string, boolean>>({});
  const [completedBlocks, setCompletedBlocks] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('transpetro_completed_blocks_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {}
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem('transpetro_completed_blocks_v1', JSON.stringify(completedBlocks));
    } catch {}
  }, [completedBlocks]);

  const handleToggleDayWrapper = (dayId: string) => {
    const isDone = Array.isArray(completedDays) && completedDays.includes(dayId);
    if (!isDone) {
      // Marcar dia e ambos os blocos
      setCompletedBlocks(prev => {
        const set = new Set(prev);
        set.add(`${dayId}_blocoA`);
        set.add(`${dayId}_blocoB`);
        return Array.from(set);
      });
    } else {
      // Desmarcar dia e ambos os blocos
      setCompletedBlocks(prev => prev.filter(k => k !== `${dayId}_blocoA` && k !== `${dayId}_blocoB`));
    }
    onToggleDay(dayId);
  };

  const handleToggleBlock = (dayId: string, blockKey: 'blocoA' | 'blocoB') => {
    const fullKey = `${dayId}_${blockKey}`;
    const otherKey = `${dayId}_${blockKey === 'blocoA' ? 'blocoB' : 'blocoA'}`;
    const isBlockDone = completedBlocks.includes(fullKey);
    const isOtherBlockDone = completedBlocks.includes(otherKey);

    let nextBlocks: string[];
    if (isBlockDone) {
      nextBlocks = completedBlocks.filter(k => k !== fullKey);
      if (Array.isArray(completedDays) && completedDays.includes(dayId)) {
        onToggleDay(dayId);
      }
    } else {
      nextBlocks = [...completedBlocks, fullKey];
      if (isOtherBlockDone && Array.isArray(completedDays) && !completedDays.includes(dayId)) {
        onToggleDay(dayId);
      }
    }
    setCompletedBlocks(nextBlocks);
  };

  const [subjectNotes, setSubjectNotes] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SCHEDULE_DAY_NOTES);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [savedNoteToasts, setSavedNoteToasts] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SCHEDULE_DAY_NOTES, JSON.stringify(subjectNotes));
    } catch (e) {
      console.error('Error saving schedule subject notes', e);
    }
  }, [subjectNotes]);

  // Listen to external data restore (from JSON backup import only)
  useEffect(() => {
    const handleStorageRestore = () => {
      try {
        const saved = localStorage.getItem(STORAGE_KEYS.SCHEDULE_DAY_NOTES);
        if (saved) {
          setSubjectNotes(JSON.parse(saved));
        }
      } catch (e) {
        // ignore
      }
    };
    window.addEventListener('transpetro_data_restored', handleStorageRestore);
    return () => window.removeEventListener('transpetro_data_restored', handleStorageRestore);
  }, []);

  const handleUpdateNote = (key: string, text: string) => {
    setSubjectNotes(prev => {
      const updated = { ...prev, [key]: text };
      try {
        localStorage.setItem(STORAGE_KEYS.SCHEDULE_DAY_NOTES, JSON.stringify(updated));
      } catch (e) {
        // ignore
      }
      return updated;
    });
  };

  const handleClearNote = (key: string) => {
    handleUpdateNote(key, '');
    setSavedNoteToasts(prev => ({ ...prev, [key]: false }));
  };

  const handleSaveNoteExplicit = (key: string) => {
    const currentText = subjectNotes[key] || '';
    handleUpdateNote(key, currentText);
    setSavedNoteToasts(prev => ({ ...prev, [key]: true }));
    setTimeout(() => {
      setSavedNoteToasts(prev => ({ ...prev, [key]: false }));
    }, 2500);
  };

  const handleToggleNoteExpand = (key: string) => {
    setExpandedNotes(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const currentWeek = CRONOGRAMA_15_SEMANAS.find(w => w.numero === selectedWeekNum) || CRONOGRAMA_15_SEMANAS[0];

  const filteredWeeks = activeBlocoFilter === 'todos' 
    ? CRONOGRAMA_15_SEMANAS 
    : CRONOGRAMA_15_SEMANAS.filter(w => w.blocoId === activeBlocoFilter);

  // Calculate week completion (7 days per week)
  const weekCompletedCount = currentWeek.dias.filter(d => Array.isArray(completedDays) && completedDays.includes(d.id)).length;
  const weekProgressPct = Math.round((weekCompletedCount / currentWeek.dias.length) * 100);

  return (
    <div className="space-y-6 max-w-7xl mx-auto py-2">
      {/* Overview & Block Filter */}
      <div className="bg-white rounded-2xl p-5 sm:p-7 border border-slate-200 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-full text-[11px] font-bold uppercase tracking-wider">
                {TOTAL_SEMANAS_ESTUDO} Semanas · {TOTAL_HORAS_ESTUDO} Horas
              </span>
              <span className="text-xs text-slate-500 font-semibold">
                3h/dia · 7 dias/semana (21h/sem)
              </span>
              <span className="px-2.5 py-0.5 bg-blue-50 text-blue-700 rounded-full text-[11px] font-bold">
                2 Matérias Intercaladas / Dia (1h30 + 1h30)
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
              Cronograma Diário de Estudos — 3h / 7 Dias
            </h2>
            <p className="text-slate-600 mt-1 text-xs sm:text-sm max-w-3xl leading-relaxed">
              Cada dia é dividido em <strong>2 matérias de 1h30 cada</strong>, seguindo a metodologia do Pareto Recursivo.
              Em cada matéria: <strong>25 min Teoria</strong> + <strong>50 min Questões Cesgranrio</strong> + <strong>15 min Revisão/Caderno de Erros</strong>.
            </p>
          </div>

          {/* Bloco Filter & Backup Buttons */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <button
              id="btn-schedule-backup-json"
              onClick={() => exportFullBackup()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-xs"
              title="Baixar backup completo de todos os dados do cronograma e anotações"
            >
              <Database className="w-3.5 h-3.5" />
              <span>Salvar Backup JSON</span>
            </button>

            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200">
              <button
                id="btn-bloco-todos"
                onClick={() => setActiveBlocoFilter('todos')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeBlocoFilter === 'todos' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Todas (1-{TOTAL_SEMANAS_ESTUDO})
              </button>
              <button
                id="btn-bloco-1"
                onClick={() => { setActiveBlocoFilter(1); setSelectedWeekNum(1); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeBlocoFilter === 1 ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Bloco 1 (S1-S5 · 105h)
              </button>
              <button
                id="btn-bloco-2"
                onClick={() => { setActiveBlocoFilter(2); setSelectedWeekNum(6); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeBlocoFilter === 2 ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Bloco 2 (S6-S9 · 84h)
              </button>
              <button
                id="btn-bloco-3"
                onClick={() => { setActiveBlocoFilter(3); setSelectedWeekNum(10); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeBlocoFilter === 3 ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Bloco 3 (S10-S14 · 99h)
              </button>
            </div>
          </div>
        </div>

        {/* Week Selector Horizontal Scroller */}
        <div className="mt-5 pt-4 border-t border-slate-100">
          <div className="text-[11px] font-bold text-slate-500 mb-2 uppercase tracking-wider flex items-center justify-between">
            <span>Navegar pelas {TOTAL_SEMANAS_ESTUDO} Semanas ({DATA_INICIO_ESTUDOS} até {DATA_ENCERRAMENTO_ESTUDOS}):</span>
            <span className="text-emerald-700 font-mono font-semibold">Semana {selectedWeekNum} de {TOTAL_SEMANAS_ESTUDO}</span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {filteredWeeks.map((week) => {
              const isSelected = selectedWeekNum === week.numero;
              const completedInWeek = week.dias.filter(d => Array.isArray(completedDays) && completedDays.includes(d.id)).length;
              const isWeekFull = completedInWeek === week.dias.length;

              return (
                <button
                  key={week.numero}
                  id={`btn-select-week-${week.numero}`}
                  onClick={() => setSelectedWeekNum(week.numero)}
                  className={`flex flex-col items-center justify-center min-w-[76px] py-2 px-2.5 rounded-xl border text-xs transition-all relative ${
                    isSelected
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xs font-bold'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {isWeekFull && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 absolute top-1 right-1" />
                  )}
                  <span className="text-[10px] opacity-75">Semana</span>
                  <span className="text-sm font-extrabold font-mono">{week.numero}</span>
                  <span className="text-[9px] opacity-60 mt-0.5">{completedInWeek}/7 dias</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Selected Week Header Card */}
      <div className="bg-slate-900 text-white rounded-2xl p-5 sm:p-6 border border-slate-800 shadow-xs relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold font-mono">
                {currentWeek.blocoId === 1 && 'Fase 1 · Fundação & 1ª Passada Teórica'}
                {currentWeek.blocoId === 2 && 'Fase 2 · Engenharia Reversa (2ª/3ª Passadas)'}
                {currentWeek.blocoId === 3 && 'Fase 3 · Reta Final & Super Simulados'}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {currentWeek.datas}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[11px] font-mono">
                21 Horas / Semana
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white">
              {currentWeek.titulo}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
              🎯 <strong>Meta da Semana:</strong> {currentWeek.metaSemanal}
            </p>
          </div>

          {/* Week Progress Metric */}
          <div className="bg-slate-800/95 p-3.5 rounded-xl border border-slate-700 min-w-[170px] text-right shrink-0">
            <div className="text-[11px] text-slate-400">Progresso da Semana</div>
            <div className="text-base sm:text-lg font-bold text-emerald-400 font-mono">
              {weekCompletedCount} de 7 dias ({weekProgressPct}%)
            </div>
            <div className="w-full bg-slate-950 h-1.5 rounded-full mt-1.5 overflow-hidden border border-slate-700/50">
              <div 
                className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${weekProgressPct}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Daily Study Cards (Segunda a Domingo · 7 Dias) */}
      <div className="space-y-4">
        {currentWeek.dias.map((dia) => {
          const isDone = Array.isArray(completedDays) && completedDays.includes(dia.id);
          const isBlockADone = isDone || completedBlocks.includes(`${dia.id}_blocoA`);
          const isBlockBDone = isDone || completedBlocks.includes(`${dia.id}_blocoB`);

          return (
            <div 
              key={dia.id}
              className={`bg-white rounded-2xl p-5 sm:p-6 border transition-all shadow-xs ${
                isDone 
                  ? 'border-emerald-300 bg-emerald-50/25 ring-1 ring-emerald-200/60' 
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              {/* Day Header - Fully interactive */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div 
                  role="button"
                  tabIndex={0}
                  onClick={() => handleToggleDayWrapper(dia.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleToggleDayWrapper(dia.id);
                    }
                  }}
                  className="flex items-center gap-3.5 cursor-pointer group select-none text-left flex-1"
                  title={isDone ? 'Clique para desmarcar dia e matérias' : 'Clique na bolinha ou no título para marcar dia como concluído'}
                >
                  <button
                    type="button"
                    id={`btn-check-${dia.id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleDayWrapper(dia.id);
                    }}
                    className={`rounded-xl p-1 transition-all active:scale-90 shrink-0 cursor-pointer ${
                      isDone 
                        ? 'text-emerald-600 hover:text-emerald-700' 
                        : 'text-slate-300 hover:text-emerald-600 group-hover:text-emerald-500'
                    }`}
                    title={isDone ? 'Marcar como não concluído' : 'Marcar dia e matérias como concluídos'}
                  >
                    {isDone ? (
                      <CheckCircle2 className="w-8 h-8 fill-emerald-100 text-emerald-600 drop-shadow-xs" />
                    ) : (
                      <Circle className="w-8 h-8 text-slate-300 group-hover:text-emerald-500 transition-colors" />
                    )}
                  </button>

                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-mono font-bold uppercase text-slate-900">
                        {dia.diaSemana} · {dia.dataSugerida}
                      </span>
                      <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-emerald-100 text-emerald-800">
                        3 Horas Diárias (2x 1h30)
                      </span>
                      {isDone ? (
                        <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-emerald-600 text-white flex items-center gap-1 shadow-2xs">
                          <Check className="w-3.5 h-3.5 stroke-[3]" /> Concluído
                        </span>
                      ) : (
                        <span className="text-[11px] text-slate-400 group-hover:text-emerald-600 font-medium transition-colors">
                          Clique na bolinha para concluir
                        </span>
                      )}
                    </div>
                    <h4 className={`text-sm sm:text-base font-bold text-slate-800 mt-1 transition-all ${
                      isDone ? 'line-through text-slate-400 opacity-75' : 'group-hover:text-emerald-950'
                    }`}>
                      {dia.focoGeralDoDia}
                    </h4>
                  </div>
                </div>

                <button
                  type="button"
                  id={`btn-timer-${dia.id}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenSessionTimer(dia);
                  }}
                  className="self-start sm:self-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer shrink-0"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Abrir Cronômetro (3h)</span>
                </button>
              </div>

              {/* 2 Subject Blocks Side-by-Side (Bloco A & Bloco B) with individual Details & Notes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {/* Bloco A: Matéria 1 */}
                <div className={`rounded-xl p-4 border flex flex-col justify-between space-y-3 transition-colors ${
                  isBlockADone 
                    ? 'bg-emerald-50/30 border-emerald-200' 
                    : 'bg-slate-50 border-slate-200/80'
                }`}>
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase bg-emerald-100 text-emerald-800">
                          Bloco 1 · 1h30 (90 min)
                        </span>
                        <button
                          type="button"
                          id={`btn-check-${dia.id}-blocoA`}
                          onClick={() => handleToggleBlock(dia.id, 'blocoA')}
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold transition-all cursor-pointer border ${
                            isBlockADone
                              ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs'
                              : 'bg-white text-slate-600 hover:text-emerald-700 border-slate-200 hover:border-emerald-300'
                          }`}
                          title={isBlockADone ? 'Desmarcar matéria 1' : 'Concluir estudo desta matéria (1h30)'}
                        >
                          {isBlockADone ? (
                            <>
                              <Check className="w-3 h-3 stroke-[3]" />
                              <span>Concluído</span>
                            </>
                          ) : (
                            <>
                              <Circle className="w-3 h-3 text-slate-400" />
                              <span>Marcar Estudo</span>
                            </>
                          )}
                        </button>
                      </div>
                      <span className="text-xs font-bold text-slate-600 truncate">
                        {dia.blocoA?.disciplina || 'Matéria 1'}
                      </span>
                    </div>

                    <h5 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                      {dia.blocoA?.subtopico}
                    </h5>

                    {/* Objectives list */}
                    <ul className="space-y-1 text-xs text-slate-600 pt-1">
                      {dia.blocoA?.objetivos?.map((obj, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-emerald-600 font-bold">•</span>
                          <span>{obj}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Cesgranrio tip */}
                    {dia.blocoA?.dicaCesgranrio && (
                      <div className="text-[11px] text-amber-900 bg-amber-50/90 border border-amber-200/80 p-2 rounded-lg leading-relaxed">
                        <strong>Dica Banca:</strong> {dia.blocoA.dicaCesgranrio}
                      </div>
                    )}

                    {/* Division pills */}
                    <div className="grid grid-cols-3 gap-1 pt-1 text-center text-[10px] font-mono font-semibold">
                      <div className="bg-white p-1 rounded-md border border-slate-200 text-blue-700">Teoria: {dia.blocoA?.teoriaMin || 25}m</div>
                      <div className="bg-white p-1 rounded-md border border-slate-200 text-emerald-700">Questões: {dia.blocoA?.questoesMin || 50}m</div>
                      <div className="bg-white p-1 rounded-md border border-slate-200 text-purple-700">Revisão: {dia.blocoA?.revisaoMin || 15}m</div>
                    </div>
                  </div>

                  {/* Subject 1: Collapsible Details & Personal Notes Section */}
                  <div className="pt-3 border-t border-slate-200/80">
                    <div className="flex items-center justify-between">
                      <button
                        type="button"
                        id={`btn-toggle-note-${dia.id}-blocoA`}
                        onClick={() => handleToggleNoteExpand(`${dia.id}_blocoA`)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-emerald-700 transition-colors cursor-pointer py-1"
                      >
                        <FileText className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Detalhes & Anotações: {dia.blocoA?.disciplina || 'Matéria 1'}</span>
                        {expandedNotes[`${dia.id}_blocoA`] ? (
                          <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                        )}
                      </button>

                      {subjectNotes[`${dia.id}_blocoA`] && !expandedNotes[`${dia.id}_blocoA`] && (
                        <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          ✓ Salvo
                        </span>
                      )}
                    </div>

                    {expandedNotes[`${dia.id}_blocoA`] && (
                      <div className="mt-2.5 p-3 bg-white rounded-xl border border-slate-200 space-y-2.5 shadow-2xs">
                        <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                          <span>Registro de Dúvidas, Macetes & Rendimento</span>
                          {savedNoteToasts[`${dia.id}_blocoA`] ? (
                            <span className="text-[10px] text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1 animate-pulse">
                              <Check className="w-3 h-3" /> Salvo no Backup!
                            </span>
                          ) : (
                            <span className="text-[10px] text-slate-400 font-normal">Persistido no JSON</span>
                          )}
                        </div>

                        <textarea
                          id={`textarea-note-${dia.id}-blocoA`}
                          value={subjectNotes[`${dia.id}_blocoA`] || ''}
                          onChange={(e) => handleUpdateNote(`${dia.id}_blocoA`, e.target.value)}
                          placeholder={`Ex: Anotações de ${dia.blocoA?.disciplina || 'estudo'} (${dia.blocoA?.subtopico || ''}), pegadinhas Cesgranrio, fórmulas e dúvidas...`}
                          rows={3}
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
                        />

                        <div className="flex items-center justify-between pt-1">
                          <button
                            type="button"
                            id={`btn-save-note-${dia.id}-blocoA`}
                            onClick={() => handleSaveNoteExplicit(`${dia.id}_blocoA`)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer shadow-2xs"
                          >
                            <Save className="w-3.5 h-3.5" />
                            <span>Salvar Anotação da Matéria</span>
                          </button>

                          {subjectNotes[`${dia.id}_blocoA`] && (
                            <button
                              type="button"
                              id={`btn-clear-note-${dia.id}-blocoA`}
                              onClick={() => handleClearNote(`${dia.id}_blocoA`)}
                              className="text-slate-400 hover:text-red-500 text-[11px] flex items-center gap-1 transition-colors p-1 cursor-pointer"
                              title="Limpar anotações desta matéria"
                            >
                              <Trash2 className="w-3 h-3" />
                              <span>Limpar</span>
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Bloco B: Matéria 2 */}
                <div className={`rounded-xl p-4 border flex flex-col justify-between space-y-3 transition-colors ${
                  isBlockBDone 
                    ? 'bg-blue-50/30 border-blue-200' 
                    : 'bg-slate-50 border-slate-200/80'
                }`}>
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase bg-blue-100 text-blue-800">
                          Bloco 2 · 1h30 (90 min)
                        </span>
                        <button
                          type="button"
                          id={`btn-check-${dia.id}-blocoB`}
                          onClick={() => handleToggleBlock(dia.id, 'blocoB')}
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold transition-all cursor-pointer border ${
                            isBlockBDone
                              ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                              : 'bg-white text-slate-600 hover:text-blue-700 border-slate-200 hover:border-blue-300'
                          }`}
                          title={isBlockBDone ? 'Desmarcar matéria 2' : 'Concluir estudo desta matéria (1h30)'}
                        >
                          {isBlockBDone ? (
                            <>
                              <Check className="w-3 h-3 stroke-[3]" />
                              <span>Concluído</span>
                            </>
                          ) : (
                            <>
                              <Circle className="w-3 h-3 text-slate-400" />
                              <span>Marcar Estudo</span>
                            </>
                          )}
                        </button>
                      </div>
                      <span className="text-xs font-bold text-slate-600 truncate">
                        {dia.blocoB?.disciplina || 'Matéria 2'}
                      </span>
                    </div>

                    <h5 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                      {dia.blocoB?.subtopico}
                    </h5>

                    {/* Objectives list */}
                    <ul className="space-y-1 text-xs text-slate-600 pt-1">
                      {dia.blocoB?.objetivos?.map((obj, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-blue-600 font-bold">•</span>
                          <span>{obj}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Cesgranrio tip */}
                    {dia.blocoB?.dicaCesgranrio && (
                      <div className="text-[11px] text-amber-900 bg-amber-50/90 border border-amber-200/80 p-2 rounded-lg leading-relaxed">
                        <strong>Dica Banca:</strong> {dia.blocoB.dicaCesgranrio}
                      </div>
                    )}

                    {/* Division pills */}
                    <div className="grid grid-cols-3 gap-1 pt-1 text-center text-[10px] font-mono font-semibold">
                      <div className="bg-white p-1 rounded-md border border-slate-200 text-blue-700">Teoria: {dia.blocoB?.teoriaMin || 25}m</div>
                      <div className="bg-white p-1 rounded-md border border-slate-200 text-emerald-700">Questões: {dia.blocoB?.questoesMin || 50}m</div>
                      <div className="bg-white p-1 rounded-md border border-slate-200 text-purple-700">Revisão: {dia.blocoB?.revisaoMin || 15}m</div>
                    </div>
                  </div>

                  {/* Subject 2: Collapsible Details & Personal Notes Section */}
                  <div className="pt-3 border-t border-slate-200/80">
                    <div className="flex items-center justify-between">
                      <button
                        type="button"
                        id={`btn-toggle-note-${dia.id}-blocoB`}
                        onClick={() => handleToggleNoteExpand(`${dia.id}_blocoB`)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-blue-700 transition-colors cursor-pointer py-1"
                      >
                        <FileText className="w-3.5 h-3.5 text-blue-600" />
                        <span>Detalhes & Anotações: {dia.blocoB?.disciplina || 'Matéria 2'}</span>
                        {expandedNotes[`${dia.id}_blocoB`] ? (
                          <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                        )}
                      </button>

                      {subjectNotes[`${dia.id}_blocoB`] && !expandedNotes[`${dia.id}_blocoB`] && (
                        <span className="text-[11px] font-medium text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                          ✓ Salvo
                        </span>
                      )}
                    </div>

                    {expandedNotes[`${dia.id}_blocoB`] && (
                      <div className="mt-2.5 p-3 bg-white rounded-xl border border-slate-200 space-y-2.5 shadow-2xs">
                        <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                          <span>Registro de Dúvidas, Macetes & Rendimento</span>
                          {savedNoteToasts[`${dia.id}_blocoB`] ? (
                            <span className="text-[10px] text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1 animate-pulse">
                              <Check className="w-3 h-3" /> Salvo no Backup!
                            </span>
                          ) : (
                            <span className="text-[10px] text-slate-400 font-normal">Persistido no JSON</span>
                          )}
                        </div>

                        <textarea
                          id={`textarea-note-${dia.id}-blocoB`}
                          value={subjectNotes[`${dia.id}_blocoB`] || ''}
                          onChange={(e) => handleUpdateNote(`${dia.id}_blocoB`, e.target.value)}
                          placeholder={`Ex: Anotações de ${dia.blocoB?.disciplina || 'estudo'} (${dia.blocoB?.subtopico || ''}), pegadinhas Cesgranrio, fórmulas e dúvidas...`}
                          rows={3}
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
                        />

                        <div className="flex items-center justify-between pt-1">
                          <button
                            type="button"
                            id={`btn-save-note-${dia.id}-blocoB`}
                            onClick={() => handleSaveNoteExplicit(`${dia.id}_blocoB`)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer shadow-2xs"
                          >
                            <Save className="w-3.5 h-3.5" />
                            <span>Salvar Anotação da Matéria</span>
                          </button>

                          {subjectNotes[`${dia.id}_blocoB`] && (
                            <button
                              type="button"
                              id={`btn-clear-note-${dia.id}-blocoB`}
                              onClick={() => handleClearNote(`${dia.id}_blocoB`)}
                              className="text-slate-400 hover:text-red-500 text-[11px] flex items-center gap-1 transition-colors p-1 cursor-pointer"
                              title="Limpar anotações desta matéria"
                            >
                              <Trash2 className="w-3 h-3" />
                              <span>Limpar</span>
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-2">
        <button
          id="btn-prev-week"
          disabled={selectedWeekNum === 1}
          onClick={() => setSelectedWeekNum(prev => Math.max(1, prev - 1))}
          className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 shadow-xs"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Semana Anterior</span>
        </button>

        <span className="text-xs text-slate-500 font-mono font-medium">
          Semana {selectedWeekNum} de 15 (21 Horas / Semana)
        </span>

        <button
          id="btn-next-week"
          disabled={selectedWeekNum === 15}
          onClick={() => setSelectedWeekNum(prev => Math.min(15, prev + 1))}
          className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 shadow-xs"
        >
          <span>Próxima Semana</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
