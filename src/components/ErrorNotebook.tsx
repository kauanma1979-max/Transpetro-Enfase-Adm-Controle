import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Plus, 
  Trash2, 
  Download, 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  Calculator, 
  Sparkles,
  Filter,
  FileText,
  Edit,
  Save,
  Check,
  Database,
  X
} from 'lucide-react';
import { exportFullBackup, notifyDataUpdated, STORAGE_KEYS } from '../utils/backupStorage';

export interface ErrorEntry {
  id: string;
  data: string;
  disciplina: string;
  subtopico: string;
  enunciadoResumido: string;
  motivoErro: string;
  regraCorreta: string;
  revisado: boolean;
}

const INITIAL_SAMPLE_ERRORS: ErrorEntry[] = [
  {
    id: 'err-1',
    data: '18/08/2026',
    disciplina: 'Logística / Compras',
    subtopico: 'Lei 14.133/2021 — Pregão e Serviços Comuns',
    enunciadoResumido: 'Questão perguntava se obras especiais de engenharia poderiam ser licitadas por pregão.',
    motivoErro: 'Esqueci que pregão é estrito a bens e serviços comuns, vedado para obras comuns e especiais de engenharia.',
    regraCorreta: 'O Pregão é exclusivo para bens e serviços comuns. Para obras, deve-se usar Concorrência (art. 29 c/c art. 6º da 14.133).',
    revisado: true
  },
  {
    id: 'err-2',
    data: '25/08/2026',
    disciplina: 'Logística / Compras',
    subtopico: 'Lei 13.303/2016 — Sanções Administrativas',
    enunciadoResumido: 'A questão perguntava o prazo máximo da suspensão temporária de participação em licitação nas estatais.',
    motivoErro: 'Confundi o prazo de 2 anos da Lei 13.303 com o prazo de até 3 anos do impedimento da Lei 14.133.',
    regraCorreta: 'Na Lei 13.303 (art. 83, III), a suspensão temporária é de até 2 (dois) anos e restrita à própria estatal sancionadora.',
    revisado: false
  },
  {
    id: 'err-3',
    data: '10/09/2026',
    disciplina: 'Finanças e Contabilidade',
    subtopico: 'Desconto Simples Comercial × Racional',
    enunciadoResumido: 'Cálculo do valor de resgate em desconto comercial com taxa de 5% ao mês em 2 meses.',
    motivoErro: 'Apliquei a fórmula do desconto racional dividindo por (1+in) em vez de multiplicar direto no valor nominal.',
    regraCorreta: 'Desconto Comercial Simples: Db = N . i . n. Valor Atual Comercial = N . (1 - i . n). Db é SEMPRE calculado sobre o valor de face (Nominal).',
    revisado: true
  },
  {
    id: 'err-4',
    data: '13/10/2026',
    disciplina: 'Processos Administrativos / SGI',
    subtopico: 'Qualidade — Ação Corretiva vs Correção',
    enunciadoResumido: 'Cesgranrio perguntava se limpar o óleo derramado no piso era uma Ação Corretiva.',
    motivoErro: 'Confundi correção imediata com ação corretiva.',
    regraCorreta: 'Limpar o óleo é simples CORREÇÃO (elimina o efeito imediato). AÇÃO CORRETIVA elimina a causa raiz do vazamento para não se repetir.',
    revisado: false
  }
];

export const ErrorNotebook: React.FC = () => {
  const [errors, setErrors] = useState<ErrorEntry[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ERROR_NOTEBOOK);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_SAMPLE_ERRORS;
      }
    }
    return INITIAL_SAMPLE_ERRORS;
  });

  const [filterDisc, setFilterDisc] = useState<string>('todas');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [editingError, setEditingError] = useState<ErrorEntry | null>(null);
  const [saveToast, setSaveToast] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState<{
    disciplina: string;
    subtopico: string;
    enunciadoResumido: string;
    motivoErro: string;
    regraCorreta: string;
  }>({
    disciplina: 'Logística / Compras',
    subtopico: '',
    enunciadoResumido: '',
    motivoErro: '',
    regraCorreta: ''
  });

  // Simulator State (40 questões específicas)
  const [simAcertosLog, setSimAcertosLog] = useState<number>(12); // de 14
  const [simAcertosFin, setSimAcertosFin] = useState<number>(8);  // de 10
  const [simAcertosProc, setSimAcertosProc] = useState<number>(8); // de 10
  const [simAcertosInf, setSimAcertosInf] = useState<number>(5);  // de 6

  const totalSimAcertos = simAcertosLog + simAcertosFin + simAcertosProc + simAcertosInf;
  const totalSimPct = Math.round((totalSimAcertos / 40) * 100);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ERROR_NOTEBOOK, JSON.stringify(errors));
    notifyDataUpdated(STORAGE_KEYS.ERROR_NOTEBOOK);
  }, [errors]);

  // Listen to external data restore
  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const saved = localStorage.getItem(STORAGE_KEYS.ERROR_NOTEBOOK);
        if (saved) {
          setErrors(JSON.parse(saved));
        }
      } catch (e) {
        // ignore
      }
    };
    window.addEventListener('transpetro_storage_changed', handleStorageChange);
    return () => window.removeEventListener('transpetro_storage_changed', handleStorageChange);
  }, []);

  const handleAddError = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.subtopico || !formData.regraCorreta) return;

    const todayStr = new Date().toLocaleDateString('pt-BR');
    const newEntry: ErrorEntry = {
      id: `err-${Date.now()}`,
      data: todayStr,
      disciplina: formData.disciplina,
      subtopico: formData.subtopico,
      enunciadoResumido: formData.enunciadoResumido,
      motivoErro: formData.motivoErro,
      regraCorreta: formData.regraCorreta,
      revisado: false
    };

    setErrors([newEntry, ...errors]);
    setFormData({
      disciplina: 'Logística / Compras',
      subtopico: '',
      enunciadoResumido: '',
      motivoErro: '',
      regraCorreta: ''
    });
    setShowAddModal(false);
    setSaveToast('Novo erro gravado com sucesso no Caderno & Backup!');
    setTimeout(() => setSaveToast(null), 3000);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingError) return;

    setErrors(errors.map(err => err.id === editingError.id ? editingError : err));
    setEditingError(null);
    setSaveToast('Alterações salvas com sucesso no Backup JSON!');
    setTimeout(() => setSaveToast(null), 3000);
  };

  const handleToggleRevisado = (id: string) => {
    setErrors(errors.map(err => 
      err.id === id ? { ...err, revisado: !err.revisado } : err
    ));
  };

  const handleDeleteError = (id: string) => {
    if (window.confirm('Deseja excluir este registro de erro?')) {
      setErrors(errors.filter(err => err.id !== id));
      setSaveToast('Registro excluído do Caderno.');
      setTimeout(() => setSaveToast(null), 3000);
    }
  };

  const handleExportCSV = () => {
    const headers = ['Data', 'Disciplina', 'Subtópico', 'Enunciado Resumido', 'Por que errei', 'Regra Correta', 'Revisado'];
    const rows = errors.map(e => [
      `"${e.data}"`,
      `"${e.disciplina}"`,
      `"${e.subtopico.replace(/"/g, '""')}"`,
      `"${e.enunciadoResumido.replace(/"/g, '""')}"`,
      `"${e.motivoErro.replace(/"/g, '""')}"`,
      `"${e.regraCorreta.replace(/"/g, '""')}"`,
      `"${e.revisado ? 'Sim' : 'Não'}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `caderno_erros_transpetro_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredErrors = errors.filter(err => {
    const matchesDisc = filterDisc === 'todas' || err.disciplina.toLowerCase().includes(filterDisc.toLowerCase());
    const matchesSearch = searchTerm === '' ||
      err.subtopico.toLowerCase().includes(searchTerm.toLowerCase()) ||
      err.motivoErro.toLowerCase().includes(searchTerm.toLowerCase()) ||
      err.regraCorreta.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDisc && matchesSearch;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto py-6 px-4">
      {/* Header */}
      <div className="bg-white rounded-2xl p-5 sm:p-7 border border-slate-200/80 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 bg-purple-100/90 text-purple-800 rounded-full text-[11px] font-bold uppercase tracking-wider">
                Ferramenta Essencial de Aprovação
              </span>
              <span className="text-xs text-slate-500 font-semibold">
                Registro de Erros & Aprendizado Ativo
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
              Caderno de Erros Digital & Simulador
            </h2>
            <p className="text-slate-600 mt-1 text-xs sm:text-sm max-w-3xl leading-relaxed">
              <strong>Regra Inegociável de Pareto:</strong> Você nunca só lê. Todo dia termina com questões e todo erro vai para o caderno de erros (uma linha: enunciado resumido + por que errei + regra correta).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              id="btn-error-backup-json"
              onClick={() => exportFullBackup()}
              className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
              title="Baixar backup completo de todos os erros e dados em JSON"
            >
              <Database className="w-3.5 h-3.5" />
              <span>Salvar Backup JSON</span>
            </button>
            <button
              id="btn-export-csv-errors"
              onClick={handleExportCSV}
              className="px-3 py-2 bg-slate-100/80 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors border border-slate-200/60 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Exportar CSV</span>
            </button>
            <button
              id="btn-open-add-error"
              onClick={() => setShowAddModal(true)}
              className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Novo Registro de Erro</span>
            </button>
          </div>
        </div>

        {saveToast && (
          <div className="mt-3 p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 font-semibold flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>{saveToast}</span>
          </div>
        )}
      </div>

      {/* Simulador de Meta de Específicos (40 Questões) */}
      <div className="bg-slate-900 text-white rounded-2xl p-5 sm:p-7 border border-slate-800 shadow-xs relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase font-mono">
                <Calculator className="w-4 h-4" /> Simulador de Acertos em Específicos (40 Questões)
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Sua Projeção de Nota para Bater o Corte da Cesgranrio
              </h3>
              <p className="text-xs text-slate-300 max-w-xl">
                Ajuste as barras com base no seu desempenho em questões para ver sua estimativa de classificação.
              </p>
            </div>

            {/* Result Widget */}
            <div className="bg-slate-800/90 p-4 rounded-xl border border-slate-700 flex items-center gap-4 shrink-0 shadow-xs">
              <div>
                <div className="text-[11px] text-slate-400">Pontuação Total Estimada</div>
                <div className="text-2xl font-black text-emerald-400 font-mono">
                  {totalSimAcertos} / 40 <span className="text-xs font-normal text-slate-400">({totalSimPct}%)</span>
                </div>
              </div>
              <div className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono ${
                totalSimAcertos >= 32 ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' :
                totalSimAcertos >= 24 ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                'bg-red-500/20 text-red-300 border border-red-500/40'
              }`}>
                {totalSimAcertos >= 32 ? '🟢 ZONA DE APROVAÇÃO (Top Polos)' :
                 totalSimAcertos >= 24 ? '🟡 DENTRO DO CR (Aperto)' : '🔴 RISCO DE CORTE (<50%)'}
              </div>
            </div>
          </div>

          {/* Sliders Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-5 pt-4 border-t border-slate-800 text-xs">
            <div>
              <div className="flex justify-between font-medium text-slate-300 mb-1">
                <span>Logística / Compras:</span>
                <span className="font-bold text-emerald-400 font-mono">{simAcertosLog}/14</span>
              </div>
              <input 
                type="range" min="0" max="14" value={simAcertosLog}
                onChange={(e) => setSimAcertosLog(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between font-medium text-slate-300 mb-1">
                <span>Finanças / Contab:</span>
                <span className="font-bold text-emerald-400 font-mono">{simAcertosFin}/10</span>
              </div>
              <input 
                type="range" min="0" max="10" value={simAcertosFin}
                onChange={(e) => setSimAcertosFin(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between font-medium text-slate-300 mb-1">
                <span>Processos Adm / RH:</span>
                <span className="font-bold text-emerald-400 font-mono">{simAcertosProc}/10</span>
              </div>
              <input 
                type="range" min="0" max="10" value={simAcertosProc}
                onChange={(e) => setSimAcertosProc(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between font-medium text-slate-300 mb-1">
                <span>Noções Informática:</span>
                <span className="font-bold text-emerald-400 font-mono">{simAcertosInf}/6</span>
              </div>
              <input 
                type="range" min="0" max="6" value={simAcertosInf}
                onChange={(e) => setSimAcertosInf(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Erros List Toolbar */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs font-bold text-slate-500 mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Filtrar:
            </span>
            {['todas', 'Logística', 'Finanças', 'Processos', 'Informática'].map((disc) => (
              <button
                key={disc}
                onClick={() => setFilterDisc(disc)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                  filterDisc === disc
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100/80 text-slate-600 hover:bg-slate-200 border border-slate-200/60'
                }`}
              >
                {disc}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Buscar no caderno de erros..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
            />
          </div>
        </div>

        {/* Errors Table */}
        <div className="space-y-3">
          {filteredErrors.map((err) => (
            <div 
              key={err.id}
              className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                err.revisado 
                  ? 'bg-slate-50/60 border-slate-200 opacity-80' 
                  : 'bg-white border-slate-200/80 hover:border-slate-300 shadow-xs'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2.5 mb-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    {err.data}
                  </span>
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded">
                    {err.disciplina}
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                    {err.subtopico}
                  </h4>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <button
                    onClick={() => setEditingError(err)}
                    className="text-xs px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1 bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
                    title="Editar Anotações e Detalhes do Erro"
                  >
                    <Edit className="w-3.5 h-3.5 text-slate-600" />
                    <span>Editar / Detalhes</span>
                  </button>
                  <button
                    onClick={() => handleToggleRevisado(err.id)}
                    className={`text-xs px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                      err.revisado
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{err.revisado ? 'Revisado' : 'Marcar Revisado'}</span>
                  </button>
                  <button
                    onClick={() => handleDeleteError(err.id)}
                    className="p-1 text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
                    title="Excluir Registro"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Error Content */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                {err.enunciadoResumido && (
                  <div className="bg-slate-50/90 p-3 rounded-xl text-slate-700 border border-slate-200/60 leading-relaxed">
                    <div className="font-bold text-slate-900 mb-1">Questão / Enunciado:</div>
                    <p>{err.enunciadoResumido}</p>
                  </div>
                )}
                <div className="bg-red-50/70 p-3 rounded-xl text-red-900 border border-red-100 leading-relaxed">
                  <div className="font-bold text-red-950 mb-1">Por que errei?</div>
                  <p>{err.motivoErro}</p>
                </div>
                <div className="bg-emerald-50/70 p-3 rounded-xl text-emerald-950 md:col-span-1 border border-emerald-100 leading-relaxed">
                  <div className="font-bold text-emerald-900 mb-1">Regra Correta / Gabarito:</div>
                  <p>{err.regraCorreta}</p>
                </div>
              </div>
            </div>
          ))}

          {filteredErrors.length === 0 && (
            <div className="text-center py-10 text-slate-400 text-sm italic">
              Nenhum erro registrado neste filtro. Clique em "Novo Registro de Erro" após resolver questões do dia!
            </div>
          )}
        </div>
      </div>

      {/* Add Error Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-600" />
              Novo Registro no Caderno de Erros
            </h3>

            <form onSubmit={handleAddError} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Disciplina:</label>
                <select
                  value={formData.disciplina}
                  onChange={(e) => setFormData({ ...formData, disciplina: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 font-medium"
                >
                  <option value="Logística / Compras">Logística e Gestão de Suprimentos (Lei 13.303/14.133, Estoques)</option>
                  <option value="Finanças e Contabilidade">Finanças e Contabilidade (Mat. Financeira, Balanço, DRE, DFC)</option>
                  <option value="Processos Administrativos">Processos Administrativos e Legislação (RH, SGI, ESG, Manutenção)</option>
                  <option value="Noções de Informática">Noções de Informática (LGPD, Segurança, Excel 2024)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Subtópico Exato:</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Lei 14.133 art. 75 - Hipóteses de Dispensa"
                  value={formData.subtopico}
                  onChange={(e) => setFormData({ ...formData, subtopico: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Resumo do Enunciado (opcional):</label>
                <input
                  type="text"
                  placeholder="Ex: Questão sobre dispensa de licitação em compras de pequeno valor..."
                  value={formData.enunciadoResumido}
                  onChange={(e) => setFormData({ ...formData, enunciadoResumido: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block font-bold text-red-700 mb-1">Por que errei? (Causa raiz do erro):</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Confundi os limites de dispensa de obras com os de compras..."
                  value={formData.motivoErro}
                  onChange={(e) => setFormData({ ...formData, motivoErro: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block font-bold text-emerald-700 mb-1">Regra Correta / O que memorizar para a prova:</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Ex: Para compras e outros serviços, o limite de dispensa é R$ 50.000 (atualizado anualmente). Para obras e serviços de engenharia é R$ 100.000..."
                  value={formData.regraCorreta}
                  onChange={(e) => setFormData({ ...formData, regraCorreta: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold transition-colors cursor-pointer"
                >
                  Salvar Registro
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Error Modal */}
      {editingError && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Edit className="w-5 h-5 text-emerald-600" />
                Editar Detalhes & Anotações do Erro
              </h3>
              <button
                type="button"
                onClick={() => setEditingError(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Disciplina:</label>
                <select
                  value={editingError.disciplina}
                  onChange={(e) => setEditingError({ ...editingError, disciplina: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 font-medium"
                >
                  <option value="Logística / Compras">Logística e Gestão de Suprimentos</option>
                  <option value="Finanças e Contabilidade">Finanças e Contabilidade</option>
                  <option value="Processos Administrativos">Processos Administrativos e Legislação</option>
                  <option value="Noções de Informática">Noções de Informática</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Subtópico Exato:</label>
                <input
                  type="text"
                  required
                  value={editingError.subtopico}
                  onChange={(e) => setEditingError({ ...editingError, subtopico: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Resumo do Enunciado:</label>
                <textarea
                  rows={2}
                  value={editingError.enunciadoResumido}
                  onChange={(e) => setEditingError({ ...editingError, enunciadoResumido: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block font-bold text-red-700 mb-1">Por que errei? (Diagnóstico):</label>
                <textarea
                  rows={2}
                  required
                  value={editingError.motivoErro}
                  onChange={(e) => setEditingError({ ...editingError, motivoErro: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block font-bold text-emerald-700 mb-1">Regra Correta / Macete para Prova:</label>
                <textarea
                  required
                  rows={3}
                  value={editingError.regraCorreta}
                  onChange={(e) => setEditingError({ ...editingError, regraCorreta: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingError(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold transition-colors cursor-pointer shadow-xs"
                >
                  <Save className="w-4 h-4" />
                  <span>Salvar Alterações no Backup</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
