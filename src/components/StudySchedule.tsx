import React, { useState, useEffect } from 'react';
import { 
  CRONOGRAMA_15_SEMANAS, 
  ScheduleWeek, 
  ScheduleDay,
  SessionBlock
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
  const [selectedWeekNum, setSelectedWeekNum] = useState<number>(1);
  const [activeBlocoFilter, setActiveBlocoFilter] = useState<number | 'todos'>('todos');
  const [expandedNotes, setExpandedNotes] = useState<Record<string, boolean>>({});
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
  const weekCompletedCount = currentWeek.dias.filter(d => completedDays.includes(d.id)).length;
  const weekProgressPct = Math.round((weekCompletedCount / currentWeek.dias.length) * 100);

  return (
    <div className="space-y-6 max-w-7xl mx-auto py-2">
      {/* Overview & Block Filter */}
      <div className="bg-white rounded-2xl p-5 sm:p-7 border border-slate-200 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-full text-[11px] font-bold uppercase tracking-wider">
                15 Semanas · 315 Horas
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
                Todas (1-15)
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
                Bloco 2 (S6-S10 · 105h)
              </button>
              <button
                id="btn-bloco-3"
                onClick={() => { setActiveBlocoFilter(3); setSelectedWeekNum(11); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeBlocoFilter === 3 ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Bloco 3 (S11-S15 · 105h)
              </button>
            </div>
          </div>
        </div>

        {/* Week Selector Horizontal Scroller */}
        <div className="mt-5 pt-4 border-t border-slate-100">
          <div className="text-[11px] font-bold text-slate-500 mb-2 uppercase tracking-wider flex items-center justify-between">
            <span>Navegar pelas 15 Semanas (7 Dias por Semana):</span>
            <span className="text-emerald-700 font-mono font-semibold">Semana {selectedWeekNum} de 15</span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {filteredWeeks.map((week) => {
              const isSelected = selectedWeekNum === week.numero;
              const completedInWeek = week.dias.filter(d => completedDays.includes(d.id)).length;
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
          const isDone = completedDays.includes(dia.id);

          return (
            <div 
              key={dia.id}
              className={`bg-white rounded-2xl p-5 sm:p-6 border transition-all shadow-xs ${
                isDone 
                  ? 'border-emerald-300 bg-emerald-50/20' 
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              {/* Day Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <button
                    id={`btn-check-${dia.id}`}
                    onClick={() => onToggleDay(dia.id)}
                    className={`rounded-xl p-0.5 transition-transform active:scale-95 shrink-0 ${
                      isDone 
                        ? 'text-emerald-600 hover:text-emerald-700' 
                        : 'text-slate-300 hover:text-slate-400'
                    }`}
                    title={isDone ? 'Marcar como não concluído' : 'Marcar 3h como concluídas'}
                  >
                    {isDone ? (
                      <CheckCircle2 className="w-7 h-7 fill-emerald-100" />
                    ) : (
                      <Circle className="w-7 h-7" />
                    )}
                  </button>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-mono font-bold uppercase text-slate-900">
                        {dia.diaSemana} · {dia.dataSugerida}
                      </span>
                      <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-emerald-100 text-emerald-800">
                        3 Horas Diárias (2x 1h30)
                      </span>
                      {isDone && (
                        <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-emerald-600 text-white">
                          ✓ Concluído
                        </span>
                      )}
                    </div>
                    <h4 className={`text-sm sm:text-base font-bold text-slate-800 mt-0.5 ${
                      isDone ? 'line-through text-slate-400' : ''
                    }`}>
                      {dia.focoGeralDoDia}
                    </h4>
                  </div>
                </div>

                <button
                  id={`btn-timer-${dia.id}`}
                  onClick={() => onOpenSessionTimer(dia)}
                  className="self-start sm:self-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs transition-colors flex items-center gap-1.5 shadow-xs"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Abrir Cronômetro (3h)</span>
                </button>
              </div>

              {/* 2 Subject Blocks Side-by-Side (Bloco A & Bloco B) with individual Details & Notes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {/* Bloco A: Matéria 1 */}
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 flex flex-col justify-between space-y-3">
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase bg-emerald-100 text-emerald-800">
                        Bloco 1 · 1h30 (90 min)
                      </span>
                      <span className="text-xs font-bold text-slate-600">
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
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 flex flex-col justify-between space-y-3">
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase bg-blue-100 text-blue-800">
                        Bloco 2 · 1h30 (90 min)
                      </span>
                      <span className="text-xs font-bold text-slate-600">
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
