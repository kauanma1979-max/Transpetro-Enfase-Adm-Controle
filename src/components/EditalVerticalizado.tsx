import React, { useState, useEffect, useMemo } from 'react';
import { 
  EDITAL_VERTICALIZADO_DATA, 
  MACRO_DIVISOES,
  MacroDivisaoId,
  MacroDivisaoInfo,
  EditalVerticalItem, 
  PrioridadeNivel 
} from '../data/verticalSyllabusData';
import { 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  BookOpen, 
  HelpCircle, 
  PenTool, 
  Sparkles, 
  Flame, 
  ChevronDown, 
  ChevronUp, 
  CheckSquare, 
  Square,
  BarChart3,
  Award,
  Layers,
  FileSpreadsheet,
  Download,
  RotateCcw,
  Tag,
  Truck,
  DollarSign,
  FileCheck,
  Laptop,
  Target,
  ArrowRight,
  Save,
  Check,
  Database,
  Trash2
} from 'lucide-react';
import { exportFullBackup, notifyDataUpdated, STORAGE_KEYS } from '../utils/backupStorage';

interface TopicProgress {
  teoria: boolean;
  questoes: boolean;
  revisao: boolean;
  questoesFeitas: number;
  questoesAcertos: number;
  status: 'pendente' | 'em_andamento' | 'concluido' | 'dominado';
  notas: string;
}

const STORAGE_KEY = 'transpetro_edital_verticalizado_progress_v2';

export const EditalVerticalizado: React.FC = () => {
  const [progressState, setProgressState] = useState<Record<string, TopicProgress>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMacro, setSelectedMacro] = useState<MacroDivisaoId | 'todas'>('todas');
  const [selectedPrioridade, setSelectedPrioridade] = useState<string>('todas');
  const [selectedStatus, setSelectedStatus] = useState<string>('todos');
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const [collapsedMacroSections, setCollapsedMacroSections] = useState<Record<string, boolean>>({});
  const [savedTopicToasts, setSavedTopicToasts] = useState<Record<string, boolean>>({});
  const [globalSaveFeedback, setGlobalSaveFeedback] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progressState));
      notifyDataUpdated(STORAGE_KEY);
    } catch (e) {
      console.error('Error saving progress to localStorage', e);
    }
  }, [progressState]);

  // Listen to external data restore events
  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          setProgressState(JSON.parse(saved));
        }
      } catch (e) {
        // ignore
      }
    };
    window.addEventListener('transpetro_storage_changed', handleStorageChange);
    return () => window.removeEventListener('transpetro_storage_changed', handleStorageChange);
  }, []);

  const getTopicProgress = (id: string): TopicProgress => {
    return progressState[id] || {
      teoria: false,
      questoes: false,
      revisao: false,
      questoesFeitas: 0,
      questoesAcertos: 0,
      status: 'pendente',
      notas: ''
    };
  };

  const updateTopicProgress = (id: string, updates: Partial<TopicProgress>) => {
    setProgressState(prev => {
      const current = prev[id] || {
        teoria: false,
        questoes: false,
        revisao: false,
        questoesFeitas: 0,
        questoesAcertos: 0,
        status: 'pendente',
        notas: ''
      };
      const updated = { ...current, ...updates };
      
      // Auto-update status if all checked
      if (updates.teoria !== undefined || updates.questoes !== undefined || updates.revisao !== undefined) {
        const isTeoria = updates.teoria ?? current.teoria;
        const isQuestoes = updates.questoes ?? current.questoes;
        const isRevisao = updates.revisao ?? current.revisao;
        
        if (isTeoria && isQuestoes && isRevisao) {
          updated.status = 'dominado';
        } else if (isTeoria || isQuestoes || isRevisao) {
          updated.status = 'em_andamento';
        } else {
          updated.status = 'pendente';
        }
      }

      return { ...prev, [id]: updated };
    });
  };

  const handleExplicitSaveTopic = (id: string) => {
    const current = getTopicProgress(id);
    updateTopicProgress(id, { ...current });
    setSavedTopicToasts(prev => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setSavedTopicToasts(prev => ({ ...prev, [id]: false }));
    }, 2500);
  };

  const handleMarkTopicFullyCompleted = (id: string) => {
    updateTopicProgress(id, {
      teoria: true,
      questoes: true,
      revisao: true,
      status: 'dominado'
    });
    setSavedTopicToasts(prev => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setSavedTopicToasts(prev => ({ ...prev, [id]: false }));
    }, 2500);
  };

  const handleClearTopicNotes = (id: string) => {
    if (window.confirm('Deseja limpar as anotações deste tópico?')) {
      updateTopicProgress(id, { notas: '' });
      setSavedTopicToasts(prev => ({ ...prev, [id]: true }));
      setTimeout(() => {
        setSavedTopicToasts(prev => ({ ...prev, [id]: false }));
      }, 2500);
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedTopics(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleExpandAllInView = () => {
    const next: Record<string, boolean> = {};
    filteredItems.forEach(i => {
      next[i.id] = true;
    });
    setExpandedTopics(next);
  };

  const handleCollapseAllInView = () => {
    setExpandedTopics({});
  };

  const toggleMacroSection = (macroId: string) => {
    setCollapsedMacroSections(prev => ({ ...prev, [macroId]: !prev[macroId] }));
  };

  const handleDownloadBackupJson = () => {
    exportFullBackup();
    setGlobalSaveFeedback('Arquivo de backup JSON gerado com sucesso!');
    setTimeout(() => setGlobalSaveFeedback(null), 3000);
  };

  // Helper for Macro icons
  const getMacroIcon = (macroId: MacroDivisaoId, className: string = 'w-5 h-5') => {
    switch (macroId) {
      case 'logistica':
        return <Truck className={className} />;
      case 'financas':
        return <DollarSign className={className} />;
      case 'processos_adm':
        return <FileCheck className={className} />;
      case 'informatica':
      default:
        return <Laptop className={className} />;
    }
  };

  // Helper for Macro theme styling
  const getMacroTheme = (macroId: MacroDivisaoId) => {
    switch (macroId) {
      case 'logistica':
        return {
          bgBadge: 'bg-emerald-100 text-emerald-800 border-emerald-200',
          accent: 'emerald',
          border: 'border-emerald-300',
          headerBg: 'bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 text-white',
          iconBg: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
        };
      case 'financas':
        return {
          bgBadge: 'bg-blue-100 text-blue-800 border-blue-200',
          accent: 'blue',
          border: 'border-blue-300',
          headerBg: 'bg-gradient-to-r from-blue-950 via-slate-900 to-slate-950 text-white',
          iconBg: 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
        };
      case 'processos_adm':
        return {
          bgBadge: 'bg-purple-100 text-purple-800 border-purple-200',
          accent: 'purple',
          border: 'border-purple-300',
          headerBg: 'bg-gradient-to-r from-purple-950 via-slate-900 to-slate-950 text-white',
          iconBg: 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
        };
      case 'informatica':
      default:
        return {
          bgBadge: 'bg-amber-100 text-amber-800 border-amber-200',
          accent: 'amber',
          border: 'border-amber-300',
          headerBg: 'bg-gradient-to-r from-amber-950 via-slate-900 to-slate-950 text-white',
          iconBg: 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
        };
    }
  };

  // Filter items
  const filteredItems = useMemo(() => {
    return EDITAL_VERTICALIZADO_DATA.filter(item => {
      // Search text
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = item.subtopico.toLowerCase().includes(q);
        const matchMain = item.topicoPrincipal.toLowerCase().includes(q);
        const matchCode = item.codigoEdital.toLowerCase().includes(q);
        const matchKeywords = item.palavrasChave.some(k => k.toLowerCase().includes(q));
        const matchResumo = item.resumoEstrategico.toLowerCase().includes(q);
        if (!matchTitle && !matchMain && !matchCode && !matchKeywords && !matchResumo) {
          return false;
        }
      }

      // Macro filter
      if (selectedMacro !== 'todas' && item.disciplinaMacro !== selectedMacro) {
        return false;
      }

      // Prioridade
      if (selectedPrioridade !== 'todas' && item.prioridade !== selectedPrioridade) {
        return false;
      }

      // Status
      if (selectedStatus !== 'todos') {
        const prog = getTopicProgress(item.id);
        if (prog.status !== selectedStatus) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, selectedMacro, selectedPrioridade, selectedStatus, progressState]);

  // Group filtered items by macro division
  const groupedByMacro = useMemo(() => {
    const groups: Record<MacroDivisaoId, EditalVerticalItem[]> = {
      logistica: [],
      financas: [],
      processos_adm: [],
      informatica: []
    };

    filteredItems.forEach(item => {
      if (groups[item.disciplinaMacro]) {
        groups[item.disciplinaMacro].push(item);
      }
    });

    return groups;
  }, [filteredItems]);

  // Statistics calculation
  const totalItems = EDITAL_VERTICALIZADO_DATA.length;
  const altaPrioridadeItems = EDITAL_VERTICALIZADO_DATA.filter(i => i.prioridade === 'ALTA');
  
  const completedCount = EDITAL_VERTICALIZADO_DATA.filter(item => {
    const p = getTopicProgress(item.id);
    return p.status === 'concluido' || p.status === 'dominado';
  }).length;

  const altaCompletedCount = altaPrioridadeItems.filter(item => {
    const p = getTopicProgress(item.id);
    return p.status === 'concluido' || p.status === 'dominado';
  }).length;

  const progressList = Object.values(progressState) as TopicProgress[];
  const totalQuestoesFeitas = progressList.reduce((acc, curr) => acc + (Number(curr?.questoesFeitas) || 0), 0);
  const totalQuestoesAcertos = progressList.reduce((acc, curr) => acc + (Number(curr?.questoesAcertos) || 0), 0);
  const taxaAcertoGlobal = totalQuestoesFeitas > 0 ? Math.round((totalQuestoesAcertos / totalQuestoesFeitas) * 100) : 0;

  const overallProgressPct = Math.round((completedCount / totalItems) * 100);
  const altaProgressPct = Math.round((altaCompletedCount / altaPrioridadeItems.length) * 100);

  // Per macro statistics
  const getMacroStats = (macroId: MacroDivisaoId) => {
    const allMacroItems = EDITAL_VERTICALIZADO_DATA.filter(i => i.disciplinaMacro === macroId);
    const macroDone = allMacroItems.filter(item => {
      const p = getTopicProgress(item.id);
      return p.status === 'concluido' || p.status === 'dominado';
    }).length;
    const macroAlta = allMacroItems.filter(i => i.prioridade === 'ALTA');
    const macroAltaDone = macroAlta.filter(item => {
      const p = getTopicProgress(item.id);
      return p.status === 'concluido' || p.status === 'dominado';
    }).length;

    const pct = allMacroItems.length > 0 ? Math.round((macroDone / allMacroItems.length) * 100) : 0;
    return {
      total: allMacroItems.length,
      done: macroDone,
      altaTotal: macroAlta.length,
      altaDone: macroAltaDone,
      pct
    };
  };

  const handleMarkAllAlta = () => {
    if (confirm('Deseja marcar todas as etapas de teoria para os itens de Alta Prioridade?')) {
      setProgressState(prev => {
        const next = { ...prev };
        altaPrioridadeItems.forEach(item => {
          const cur = next[item.id] || {
            teoria: false,
            questoes: false,
            revisao: false,
            questoesFeitas: 0,
            questoesAcertos: 0,
            status: 'pendente',
            notas: ''
          };
          next[item.id] = { ...cur, teoria: true, status: cur.status === 'pendente' ? 'em_andamento' : cur.status };
        });
        return next;
      });
    }
  };

  const handleResetProgress = () => {
    if (confirm('Tem certeza de que deseja resetar todo o progresso do edital verticalizado? Esta ação não pode ser desfeita.')) {
      setProgressState({});
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const handleExportCsv = () => {
    const headers = ['MacroDivisao', 'Codigo', 'Disciplina', 'Subtopico', 'Prioridade', 'Incidencia', 'Teoria', 'Questoes', 'Revisao', 'QuestoesFeitas', 'Acertos', 'Status'];
    const rows = EDITAL_VERTICALIZADO_DATA.map(item => {
      const p = getTopicProgress(item.id);
      const macroInfo = MACRO_DIVISOES.find(m => m.id === item.disciplinaMacro);
      return [
        `"${macroInfo?.nome || item.disciplinaMacro}"`,
        `"${item.codigoEdital}"`,
        `"${item.disciplina}"`,
        `"${item.subtopico.replace(/"/g, '""')}"`,
        `"${item.prioridade}"`,
        `"${item.incidenciaEstimada}"`,
        p.teoria ? 'SIM' : 'NAO',
        p.questoes ? 'SIM' : 'NAO',
        p.revisao ? 'SIM' : 'NAO',
        p.questoesFeitas || 0,
        p.questoesAcertos || 0,
        `"${p.status}"`
      ].join(',');
    });

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `edital_verticalizado_transpetro_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getPriorityBadge = (p: PrioridadeNivel) => {
    switch (p) {
      case 'ALTA':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
            <Flame className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            <span>ALTA PRIORIDADE</span>
          </span>
        );
      case 'MEDIA':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>MÉDIA PRIORIDADE</span>
          </span>
        );
      case 'BAIXA':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            <span>BAIXA PRIORIDADE</span>
          </span>
        );
      case 'CORTE':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-zinc-100 text-zinc-500 border border-zinc-200 line-through">
            <span>CORTE / RESIDUAL</span>
          </span>
        );
    }
  };

  const getStatusBadge = (status: TopicProgress['status']) => {
    switch (status) {
      case 'dominado':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span>Dominado (100%)</span>
          </span>
        );
      case 'concluido':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800 border border-blue-300">
            <CheckCircle2 className="w-3 h-3 text-blue-600" />
            <span>Concluído</span>
          </span>
        );
      case 'em_andamento':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
            <Clock className="w-3 h-3 text-amber-600" />
            <span>Em Andamento</span>
          </span>
        );
      case 'pendente':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 text-slate-600 border border-slate-200">
            <span>Pendente</span>
          </span>
        );
    }
  };

  // Visible macro divisions list
  const visibleMacroList = selectedMacro === 'todas'
    ? MACRO_DIVISOES
    : MACRO_DIVISOES.filter(m => m.id === selectedMacro);

  return (
    <div className="space-y-6">
      {/* Top Banner & Strategy Summary */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-bold bg-emerald-100 text-emerald-800">
                <FileSpreadsheet className="w-3.5 h-3.5" />
                Edital 2026.3 · Ênfase 1: Adm e Controle
              </span>
              <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-blue-50 text-blue-700 border border-blue-100">
                4 Macro Divisões Específicas (40 Questões Decisivas)
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Edital Verticalizado por Macro Divisão
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
              O conteúdo programático foi estruturado nas <strong>4 Macro Divisões Decisivas</strong> de Conhecimentos Específicos (Ênfase 1: Administração e Controle).
              Acompanhe seu rendimento com sinalização de prioridade Pareto (🔥 Alta, ⚡ Média, ❄️ Baixa, ❌ Corte).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              id="btn-download-backup-json"
              onClick={handleDownloadBackupJson}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
              title="Baixar arquivo JSON de backup com todas as anotações e progresso"
            >
              <Database className="w-4 h-4" />
              <span>Salvar Backup JSON</span>
            </button>
            <button
              id="btn-export-vertical-csv"
              onClick={handleExportCsv}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl border border-slate-300 transition-colors shadow-xs cursor-pointer"
              title="Baixar planilha CSV"
            >
              <Download className="w-4 h-4" />
              <span>Exportar CSV</span>
            </button>
            <button
              id="btn-activate-alta-priority"
              onClick={handleMarkAllAlta}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold text-xs rounded-xl border border-rose-200 transition-colors shadow-xs cursor-pointer"
              title="Marcar teoria de todos os itens de alta prioridade"
            >
              <Flame className="w-4 h-4 text-rose-500" />
              <span>Ativar Alta Prioridade</span>
            </button>
            <button
              id="btn-reset-vertical-progress"
              onClick={handleResetProgress}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              title="Resetar progresso"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {globalSaveFeedback && (
          <div className="mt-3 p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 font-semibold flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>{globalSaveFeedback}</span>
          </div>
        )}

        {/* Global Progress Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-6 pt-5 border-t border-slate-100">
          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5">
            <div className="flex items-center justify-between text-xs text-slate-500 font-medium mb-1">
              <span>Cobertura Geral</span>
              <span className="font-bold text-slate-900">{overallProgressPct}%</span>
            </div>
            <div className="text-xl font-bold text-slate-900 mb-1.5">
              {completedCount} <span className="text-xs font-normal text-slate-500">/ {totalItems} tópicos</span>
            </div>
            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${overallProgressPct}%` }}
              />
            </div>
          </div>

          <div className="bg-rose-50/50 border border-rose-200/80 rounded-xl p-3.5">
            <div className="flex items-center justify-between text-xs text-rose-700 font-medium mb-1">
              <span className="flex items-center gap-1">
                <Flame className="w-3 h-3 text-rose-500" /> Alta Prioridade
              </span>
              <span className="font-bold text-rose-900">{altaProgressPct}%</span>
            </div>
            <div className="text-xl font-bold text-rose-900 mb-1.5">
              {altaCompletedCount} <span className="text-xs font-normal text-rose-700">/ {altaPrioridadeItems.length} tópicos</span>
            </div>
            <div className="w-full bg-rose-200 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-rose-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${altaProgressPct}%` }}
              />
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5">
            <div className="flex items-center justify-between text-xs text-slate-500 font-medium mb-1">
              <span>Questões Resolvidas</span>
              <span className="font-bold text-blue-600">{totalQuestoesFeitas} un</span>
            </div>
            <div className="text-xl font-bold text-slate-900 mb-1.5">
              {totalQuestoesAcertos} <span className="text-xs font-normal text-slate-500">acertos</span>
            </div>
            <div className="text-[11px] text-slate-500">
              Taxa de acertos: <strong className="text-slate-800">{taxaAcertoGlobal}%</strong>
            </div>
          </div>

          <div className="bg-emerald-50/50 border border-emerald-200/80 rounded-xl p-3.5">
            <div className="text-xs text-emerald-800 font-medium mb-1">
              Rotina & Foco
            </div>
            <div className="text-xl font-bold text-emerald-900 mb-1.5">
              3h / dia <span className="text-xs font-normal text-emerald-700">· 7d/sem</span>
            </div>
            <div className="text-[11px] text-emerald-700">
              2 matérias intercaladas (1h30 + 1h30)
            </div>
          </div>
        </div>
      </div>

      {/* Macro Divisions Interactive Grid Cards (Quick Nav & Stats) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {MACRO_DIVISOES.map(macro => {
          const stats = getMacroStats(macro.id);
          const isSelected = selectedMacro === macro.id;

          return (
            <button
              key={macro.id}
              id={`card-macro-${macro.id}`}
              onClick={() => setSelectedMacro(isSelected ? 'todas' : macro.id)}
              className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                isSelected
                  ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-emerald-500/50'
                  : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300 hover:shadow-xs'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${
                    isSelected ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {getMacroIcon(macro.id, 'w-4 h-4')}
                  </span>
                  <span className={`text-[11px] font-mono px-2 py-0.5 rounded-md font-bold ${
                    isSelected ? 'bg-slate-800 text-emerald-300' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {macro.questoesEstimadas}
                  </span>
                </div>

                <div className={`text-[11px] font-bold uppercase tracking-wider mb-0.5 ${
                  isSelected ? 'text-emerald-400' : 'text-slate-400'
                }`}>
                  Macro {macro.numero}
                </div>
                <h3 className="text-sm sm:text-base font-extrabold tracking-tight leading-snug">
                  {macro.nome}
                </h3>
                <p className={`text-xs mt-1 line-clamp-2 ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                  {macro.subtitulo}
                </p>
              </div>

              {/* Progress Bar & Items Count */}
              <div className="mt-4 pt-3 border-t border-slate-100/20">
                <div className="flex items-center justify-between text-[11px] font-mono mb-1.5">
                  <span className={isSelected ? 'text-slate-400' : 'text-slate-500'}>
                    {stats.done}/{stats.total} tópicos
                  </span>
                  <span className={`font-bold ${isSelected ? 'text-emerald-300' : 'text-emerald-700'}`}>
                    {stats.pct}%
                  </span>
                </div>
                <div className={`w-full h-1.5 rounded-full overflow-hidden ${isSelected ? 'bg-slate-800' : 'bg-slate-100'}`}>
                  <div 
                    className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                    style={{ width: `${stats.pct}%` }}
                  />
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Macro Division Filter Tabs + Global Search Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-3.5">
        {/* Macro Selection Segmented Control */}
        <div>
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>Visualizar por Macro Divisão:</span>
            {selectedMacro !== 'todas' && (
              <button 
                onClick={() => setSelectedMacro('todas')}
                className="text-emerald-700 hover:text-emerald-800 font-semibold"
              >
                Ver Todas as Macro Divisões
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <button
              id="tab-macro-todas"
              onClick={() => setSelectedMacro('todas')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                selectedMacro === 'todas'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Todas as 4 Macros ({totalItems})</span>
            </button>

            {MACRO_DIVISOES.map(macro => {
              const isActive = selectedMacro === macro.id;
              const stats = getMacroStats(macro.id);

              return (
                <button
                  key={macro.id}
                  id={`tab-macro-btn-${macro.id}`}
                  onClick={() => setSelectedMacro(macro.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {getMacroIcon(macro.id, 'w-3.5 h-3.5')}
                  <span>{macro.nome}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-md font-mono ${
                    isActive ? 'bg-emerald-700 text-white' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {stats.total}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Search and Secondary Filter Controls */}
        <div className="flex flex-col md:flex-row items-center gap-2.5 pt-3 border-t border-slate-100">
          {/* Search Input */}
          <div className="relative w-full md:flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="input-search-vertical"
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Filtrar tópicos (ex: 13.303, DFC, Balanço, Curva ABC, Excel, ISO, Crase)..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            />
          </div>

          <div className="w-full md:w-auto flex items-center gap-2">
            {/* Prioridade Selector */}
            <select
              id="select-priority-filter"
              value={selectedPrioridade}
              onChange={e => setSelectedPrioridade(e.target.value)}
              className="w-full md:w-auto px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-hidden focus:border-emerald-500"
            >
              <option value="todas">Todas as Prioridades</option>
              <option value="ALTA">🔥 Alta Prioridade</option>
              <option value="MEDIA">⚡ Média Prioridade</option>
              <option value="BAIXA">❄️ Baixa Prioridade</option>
              <option value="CORTE">❌ Corte / Residual</option>
            </select>

            {/* Status Selector */}
            <select
              id="select-status-filter"
              value={selectedStatus}
              onChange={e => setSelectedStatus(e.target.value)}
              className="w-full md:w-auto px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-hidden focus:border-emerald-500"
            >
              <option value="todos">Todos os Status</option>
              <option value="pendente">Pendente</option>
              <option value="em_andamento">Em Andamento</option>
              <option value="concluido">Concluído</option>
              <option value="dominado">Dominado</option>
            </select>
          </div>
        </div>

        {/* Results Counter & Bulk Expand Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-500 pt-1">
          <div>
            Exibindo <strong>{filteredItems.length}</strong> de {totalItems} tópicos
          </div>
          
          <div className="flex items-center gap-3">
            <button
              id="btn-expand-all-topics"
              onClick={handleExpandAllInView}
              className="text-emerald-700 hover:text-emerald-800 font-semibold cursor-pointer flex items-center gap-1"
            >
              <ChevronDown className="w-3.5 h-3.5" />
              <span>Expandir Todos</span>
            </button>
            <span className="text-slate-300">|</span>
            <button
              id="btn-collapse-all-topics"
              onClick={handleCollapseAllInView}
              className="text-slate-600 hover:text-slate-800 font-semibold cursor-pointer flex items-center gap-1"
            >
              <ChevronUp className="w-3.5 h-3.5" />
              <span>Recolher Todos</span>
            </button>

            {(searchQuery || selectedMacro !== 'todas' || selectedPrioridade !== 'todas' || selectedStatus !== 'todos') && (
              <>
                <span className="text-slate-300">|</span>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedMacro('todas');
                    setSelectedPrioridade('todas');
                    setSelectedStatus('todos');
                  }}
                  className="text-rose-600 hover:text-rose-700 font-semibold"
                >
                  Limpar Filtros
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Macro Sections Container (Separado por Macro Divisão) */}
      <div className="space-y-8">
        {visibleMacroList.map(macro => {
          const itemsInThisMacro = groupedByMacro[macro.id] || [];
          const isSectionCollapsed = collapsedMacroSections[macro.id] ?? false;
          const stats = getMacroStats(macro.id);
          const theme = getMacroTheme(macro.id);

          if (itemsInThisMacro.length === 0) {
            return null;
          }

          return (
            <section
              key={macro.id}
              id={`macro-section-${macro.id}`}
              className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden"
            >
              {/* Macro Section Header */}
              <div className={`${theme.headerBg} p-5 sm:p-6 relative overflow-hidden`}>
                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold font-mono ${theme.iconBg}`}>
                        Macro Divisão {macro.numero}
                      </span>
                      <span className="text-xs font-bold text-slate-300 font-mono">
                        {macro.questoesEstimadas}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[11px] bg-slate-800 text-slate-300 font-mono">
                        Peso: {macro.pesoParetoGeral}
                      </span>
                      {macro.destaqueLegislacao && (
                        <span className="px-2 py-0.5 rounded-full text-[11px] bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold">
                          {macro.destaqueLegislacao}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3 pt-1">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${theme.iconBg} shrink-0`}>
                        {getMacroIcon(macro.id, 'w-5 h-5')}
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white">
                          {macro.nome}
                        </h3>
                        <p className="text-xs text-slate-300">
                          {macro.subtitulo}
                        </p>
                      </div>
                    </div>

                    <p className="text-xs text-slate-400 pt-1 leading-relaxed max-w-3xl">
                      {macro.descricao}
                    </p>
                  </div>

                  {/* Section Right Stats & Collapse Toggle */}
                  <div className="flex items-center gap-3 shrink-0 self-end lg:self-center">
                    <div className="bg-slate-800/90 p-3 rounded-xl border border-slate-700 min-w-[140px] text-right">
                      <div className="text-[11px] text-slate-400 font-medium">Progresso da Macro</div>
                      <div className="text-base font-bold text-emerald-400 font-mono">
                        {stats.done} de {stats.total} ({stats.pct}%)
                      </div>
                      <div className="w-full bg-slate-950 h-1.5 rounded-full mt-1 overflow-hidden">
                        <div 
                          className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                          style={{ width: `${stats.pct}%` }}
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => toggleMacroSection(macro.id)}
                      className="p-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-300 hover:text-white transition-colors"
                      title={isSectionCollapsed ? 'Expandir tópicos' : 'Recolher tópicos'}
                    >
                      {isSectionCollapsed ? <ChevronDown className="w-5 h-5" /> : <ChevronUp className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Macro Key Foci Pills Bar */}
              <div className="bg-slate-50 px-5 py-2.5 border-b border-slate-200/80 flex flex-wrap items-center gap-2 text-xs">
                <span className="font-bold text-slate-600 flex items-center gap-1">
                  <Target className="w-3.5 h-3.5 text-emerald-600" /> Focos Principais Cesgranrio:
                </span>
                {macro.focoPrincipal.map((foco, idx) => (
                  <span key={idx} className="bg-white border border-slate-200 text-slate-700 px-2 py-0.5 rounded-md font-medium text-[11px]">
                    {foco}
                  </span>
                ))}
              </div>

              {/* Topics List within this Macro */}
              {!isSectionCollapsed && (
                <div className="p-4 sm:p-5 space-y-6">
                  {(() => {
                    // Group items by topicoPrincipal within this macro
                    const topicMap = new Map<string, typeof itemsInThisMacro>();
                    itemsInThisMacro.forEach(item => {
                      if (!topicMap.has(item.topicoPrincipal)) {
                        topicMap.set(item.topicoPrincipal, []);
                      }
                      topicMap.get(item.topicoPrincipal)!.push(item);
                    });

                    return Array.from(topicMap.entries()).map(([topicoNome, subitems]) => (
                      <div key={topicoNome} className="space-y-3">
                        {/* Topic Group Header */}
                        <div className="flex items-center justify-between pb-1.5 border-b border-slate-200/80">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                            <h4 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                              {topicoNome}
                            </h4>
                            <span className="text-[11px] font-medium text-slate-500 font-mono">
                              ({subitems.length} {subitems.length === 1 ? 'item' : 'itens'})
                            </span>
                          </div>
                        </div>

                        {/* Subtopics Cards */}
                        <div className="space-y-3">
                          {subitems.map(item => {
                            const prog = getTopicProgress(item.id);
                            const isExpanded = expandedTopics[item.id] ?? false;

                            return (
                              <div
                                key={item.id}
                                id={`topic-card-${item.id}`}
                                className={`bg-white border rounded-2xl transition-all shadow-xs overflow-hidden ${
                                  item.prioridade === 'ALTA'
                                    ? 'border-slate-200 hover:border-rose-300'
                                    : 'border-slate-200 hover:border-slate-300'
                                }`}
                              >
                                {/* Main Card Header */}
                                <div className="p-4 sm:p-5">
                                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                                    <div className="space-y-1.5 flex-1">
                                      {/* Tags row */}
                                      <div className="flex flex-wrap items-center gap-2">
                                        <span className="px-2 py-0.5 rounded-md text-[11px] font-mono font-bold bg-slate-900 text-white">
                                          {item.codigoEdital}
                                        </span>
                                        {getPriorityBadge(item.prioridade)}
                                        <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 text-slate-700">
                                          {item.disciplina}
                                        </span>
                                        {item.artigoOuNorma && (
                                          <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-100">
                                            {item.artigoOuNorma}
                                          </span>
                                        )}
                                        {getStatusBadge(prog.status)}
                                      </div>

                                      {/* Title */}
                                      <h5 className="text-base font-bold text-slate-900 tracking-tight leading-snug">
                                        {item.subtopico}
                                      </h5>

                                      {/* Macro category & incidence */}
                                      <div className="text-xs text-slate-500">
                                        Tópico: <span className="font-semibold text-slate-700">{item.topicoPrincipal}</span> · Incidência Estimada: <span className="font-semibold text-emerald-700">{item.incidenciaEstimada}</span>
                                      </div>
                                    </div>

                                    {/* Expand / Quick Action Toggle */}
                                    <div className="flex items-center gap-2 self-end sm:self-start">
                                      <button
                                        id={`btn-toggle-details-${item.id}`}
                                        onClick={() => toggleExpand(item.id)}
                                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                                      >
                                        <span>{isExpanded ? 'Recolher' : 'Detalhes & Anotações'}</span>
                                        {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                                      </button>
                                    </div>
                                  </div>

                                  {/* Quick 3-Step Mini Checklist */}
                                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-100">
                                    <label className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50/80 hover:bg-slate-100 cursor-pointer transition-colors text-xs font-medium text-slate-700">
                                      <input
                                        id={`check-teoria-${item.id}`}
                                        type="checkbox"
                                        checked={prog.teoria}
                                        onChange={e => updateTopicProgress(item.id, { teoria: e.target.checked })}
                                        className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                                      />
                                      <span className="flex items-center gap-1">
                                        <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                                        1. Teoria & Lei Seca
                                      </span>
                                    </label>

                                    <label className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50/80 hover:bg-slate-100 cursor-pointer transition-colors text-xs font-medium text-slate-700">
                                      <input
                                        id={`check-questoes-${item.id}`}
                                        type="checkbox"
                                        checked={prog.questoes}
                                        onChange={e => updateTopicProgress(item.id, { questoes: e.target.checked })}
                                        className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                                      />
                                      <span className="flex items-center gap-1">
                                        <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
                                        2. Questões Cesgranrio
                                      </span>
                                    </label>

                                    <label className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50/80 hover:bg-slate-100 cursor-pointer transition-colors text-xs font-medium text-slate-700">
                                      <input
                                        id={`check-revisao-${item.id}`}
                                        type="checkbox"
                                        checked={prog.revisao}
                                        onChange={e => updateTopicProgress(item.id, { revisao: e.target.checked })}
                                        className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                                      />
                                      <span className="flex items-center gap-1">
                                        <PenTool className="w-3.5 h-3.5 text-purple-600" />
                                        3. Caderno de Erros
                                      </span>
                                    </label>
                                  </div>
                                </div>

                                {/* Expanded Strategic Drawer */}
                                {isExpanded && (
                                  <div className="bg-slate-50 p-4 sm:p-5 border-t border-slate-200 space-y-4">
                                    {/* Strategic Summary & Advice */}
                                    <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
                                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                                        <Sparkles className="w-4 h-4 text-amber-500" />
                                        <span>Resumo Estratégico & Foco da Prova (Cesgranrio)</span>
                                      </div>
                                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                                        {item.resumoEstrategico}
                                      </p>

                                      {/* Keywords pills */}
                                      <div className="flex flex-wrap items-center gap-1.5 pt-2">
                                        <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                                          <Tag className="w-3 h-3" /> Termos-chave:
                                        </span>
                                        {item.palavrasChave.map(k => (
                                          <span key={k} className="px-2 py-0.5 rounded-md text-[11px] bg-slate-100 text-slate-700 font-mono">
                                            {k}
                                          </span>
                                        ))}
                                      </div>
                                    </div>

                                    {/* Quantitative Question Tracker & Notes */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                      {/* Questions Tracker */}
                                      <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-3">
                                        <div className="text-xs font-bold text-slate-900 flex items-center justify-between">
                                          <span>Registro de Questões Realizadas</span>
                                          <span className="text-[11px] font-normal text-slate-500">Cesgranrio / Inéditas</span>
                                        </div>
                                        
                                        <div className="grid grid-cols-2 gap-2">
                                          <div>
                                            <label className="block text-[11px] text-slate-500 mb-1">Total de Questões:</label>
                                            <input
                                              id={`input-questoes-${item.id}`}
                                              type="number"
                                              min="0"
                                              value={prog.questoesFeitas || ''}
                                              onChange={e => updateTopicProgress(item.id, { questoesFeitas: parseInt(e.target.value) || 0 })}
                                              placeholder="Ex: 25"
                                              className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-900"
                                            />
                                          </div>
                                          <div>
                                            <label className="block text-[11px] text-slate-500 mb-1">Total de Acertos:</label>
                                            <input
                                              id={`input-acertos-${item.id}`}
                                              type="number"
                                              min="0"
                                              max={prog.questoesFeitas || 999}
                                              value={prog.questoesAcertos || ''}
                                              onChange={e => updateTopicProgress(item.id, { questoesAcertos: parseInt(e.target.value) || 0 })}
                                              placeholder="Ex: 22"
                                              className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-emerald-700"
                                            />
                                          </div>
                                        </div>

                                        {prog.questoesFeitas > 0 && (
                                          <div className="text-[11px] text-slate-600 flex items-center justify-between pt-1">
                                            <span>Aproveitamento neste tópico:</span>
                                            <strong className={
                                              Math.round((prog.questoesAcertos / prog.questoesFeitas) * 100) >= 80 
                                                ? 'text-emerald-700' 
                                                : 'text-amber-700'
                                            }>
                                              {Math.round((prog.questoesAcertos / prog.questoesFeitas) * 100)}% de acertos
                                            </strong>
                                          </div>
                                        )}
                                      </div>

                                      {/* Notes Input & Explicit Save Controls */}
                                      <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-2 flex flex-col justify-between">
                                        <div>
                                          <div className="text-xs font-bold text-slate-900 flex items-center justify-between mb-1">
                                            <span>Minhas Anotações & Pontos de Atenção</span>
                                            {savedTopicToasts[item.id] ? (
                                              <span className="text-[10px] text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1 animate-pulse">
                                                <Check className="w-3 h-3" /> Salvo no Backup!
                                              </span>
                                            ) : (
                                              <span className="text-[10px] text-slate-400">Gravado no JSON</span>
                                            )}
                                          </div>
                                          <textarea
                                            id={`textarea-notas-${item.id}`}
                                            value={prog.notas || ''}
                                            onChange={e => updateTopicProgress(item.id, { notas: e.target.value })}
                                            placeholder="Ex: Pegadinha no art. 29 da 13.303 (dispensa até 100k em compras comuns); DFC indireto soma depreciação..."
                                            rows={3}
                                            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
                                          />
                                        </div>

                                        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100">
                                          <div className="flex items-center gap-1.5">
                                            <button
                                              type="button"
                                              id={`btn-save-topic-${item.id}`}
                                              onClick={() => handleExplicitSaveTopic(item.id)}
                                              className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer shadow-2xs"
                                            >
                                              <Save className="w-3.5 h-3.5" />
                                              <span>Salvar</span>
                                            </button>
                                            <button
                                              type="button"
                                              id={`btn-complete-topic-${item.id}`}
                                              onClick={() => handleMarkTopicFullyCompleted(item.id)}
                                              className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-xs font-semibold transition-colors cursor-pointer border border-blue-200"
                                              title="Marcar Teoria, Questões e Revisão como concluídas"
                                            >
                                              <CheckCircle2 className="w-3.5 h-3.5" />
                                              <span>Concluir 3 Etapas</span>
                                            </button>
                                          </div>

                                          {prog.notas && (
                                            <button
                                              type="button"
                                              onClick={() => handleClearTopicNotes(item.id)}
                                              className="text-slate-400 hover:text-red-500 text-[11px] flex items-center gap-1 transition-colors p-1"
                                              title="Limpar anotações"
                                            >
                                              <Trash2 className="w-3 h-3" />
                                              <span>Limpar</span>
                                            </button>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ));
                  })()}
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
};
