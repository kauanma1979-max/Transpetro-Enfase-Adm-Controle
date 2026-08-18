import React, { useState } from 'react';
import { 
  PARETO_MACRO, 
  PARETO_MESO, 
  PARETO_MICRO, 
  MacroDisciplina, 
  MesoTopico, 
  MicroSubtopico 
} from '../data/paretoData';
import { 
  Target, 
  Flame, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  XCircle, 
  Star, 
  Layers, 
  Search,
  Filter,
  ArrowUpDown,
  BookOpen,
  Info,
  Truck,
  DollarSign,
  FileCheck,
  Laptop
} from 'lucide-react';

export const ParetoMatrix: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<'camada1' | 'camada2' | 'camada3' | 'todas'>('todas');
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>('todas');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Helper for Theme Icons and Colors
  const getThemeMeta = (id: string) => {
    switch (id) {
      case 'processos_adm':
        return {
          icon: <FileCheck className="w-4 h-4" />,
          badgeColor: 'bg-blue-50 text-blue-800 border-blue-200',
          titleColor: 'text-blue-950',
          iconBg: 'bg-blue-100 text-blue-700 border border-blue-200'
        };
      case 'logistica':
        return {
          icon: <Truck className="w-4 h-4" />,
          badgeColor: 'bg-rose-50 text-rose-800 border-rose-200',
          titleColor: 'text-rose-950',
          iconBg: 'bg-rose-100 text-rose-700 border border-rose-200'
        };
      case 'financas':
        return {
          icon: <DollarSign className="w-4 h-4" />,
          badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
          titleColor: 'text-amber-950',
          iconBg: 'bg-amber-100 text-amber-700 border border-amber-200'
        };
      case 'informatica':
      default:
        return {
          icon: <Laptop className="w-4 h-4" />,
          badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
          titleColor: 'text-emerald-950',
          iconBg: 'bg-emerald-100 text-emerald-700 border border-emerald-200'
        };
    }
  };

  // Filter Macro
  const filteredMacro = selectedDiscipline === 'todas'
    ? PARETO_MACRO
    : PARETO_MACRO.filter(m => m.id === selectedDiscipline);

  // Filter Meso
  const filteredMeso = PARETO_MESO.filter(m => {
    const matchesDiscipline = selectedDiscipline === 'todas' || m.disciplinaId === selectedDiscipline;
    const matchesSearch = searchQuery === '' || 
      m.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (m.notaEstrategica && m.notaEstrategica.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesDiscipline && matchesSearch;
  });

  // Filter Micro
  const filteredMicro = PARETO_MICRO.filter(m => {
    const matchesDiscipline = selectedDiscipline === 'todas' || m.disciplinaId === selectedDiscipline;
    const matchesSearch = searchQuery === '' ||
      m.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.detalhes.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDiscipline && matchesSearch;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto py-6 px-4">
      {/* Header Info */}
      <div className="bg-white rounded-2xl p-5 sm:p-7 border border-slate-200/80 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 bg-emerald-100/90 text-emerald-800 rounded-full text-[11px] font-bold uppercase tracking-wider">
                Metodologia Científica
              </span>
              <span className="text-xs text-slate-500 font-semibold">
                Princípio 80/20 Aplicado em 3 Camadas
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
              Mapa de Prioridades Pareto Recursivo
            </h2>
            <p className="text-slate-600 mt-1 text-xs sm:text-sm max-w-3xl leading-relaxed">
              Descubra os <strong>20% dos conteúdos específicos</strong> que geram <strong>80% das questões e pontos de classificação</strong> na prova da Cesgranrio.
            </p>
          </div>

          {/* Layer Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100/80 rounded-xl border border-slate-200/50">
            <button
              id="btn-layer-todas"
              onClick={() => setActiveLayer('todas')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeLayer === 'todas' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Visão Completa
            </button>
            <button
              id="btn-layer-1"
              onClick={() => setActiveLayer('camada1')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeLayer === 'camada1' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Camada 1 (Macro)
            </button>
            <button
              id="btn-layer-2"
              onClick={() => setActiveLayer('camada2')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeLayer === 'camada2' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Camada 2 (Meso)
            </button>
            <button
              id="btn-layer-3"
              onClick={() => setActiveLayer('camada3')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeLayer === 'camada3' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Camada 3 (Micro)
            </button>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 mt-5 pt-4 border-t border-slate-100">
          <div className="sm:col-span-8 flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-bold text-slate-500 mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Disciplina:
            </span>
            <button
              id="filter-disc-todas"
              onClick={() => setSelectedDiscipline('todas')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedDiscipline === 'todas'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Todas (150h)
            </button>
            {PARETO_MACRO.map((m) => (
              <button
                key={m.id}
                id={`filter-disc-${m.id}`}
                onClick={() => setSelectedDiscipline(m.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  selectedDiscipline === m.id
                    ? 'bg-emerald-600 text-white font-semibold shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span>{m.nome}</span>
                <span className={`text-[11px] font-mono px-1.5 py-0.5 rounded-md font-semibold ${
                  selectedDiscipline === m.id ? 'bg-emerald-700/80 text-emerald-100' : 'bg-slate-200/80 text-slate-600'
                }`}>
                  {m.horasAlocadas}h
                </span>
              </button>
            ))}
          </div>

          <div className="sm:col-span-4 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Buscar tópico, artigo ou fórmula..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
            />
          </div>
        </div>
      </div>

      {/* ================= CAMADA 1: MACRO ================= */}
      {(activeLayer === 'todas' || activeLayer === 'camada1') && (
        <div className="space-y-3.5">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2 tracking-tight">
              <span className="w-5 h-5 rounded-full bg-red-100 text-red-700 flex items-center justify-center text-xs font-black">
                1
              </span>
              CAMADA 1 — Macro (Divisão do Tempo Total de 150h nos Específicos)
            </h3>
            <span className="text-xs text-slate-500 font-medium">40 questões / 100% da Classificação</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {filteredMacro.map((m) => {
              const themeStyle = getThemeMeta(m.id);
              return (
                <div 
                  key={m.id} 
                  className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all relative flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span 
                        className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                          m.prioridade === 'PRIORITÁRIA' 
                            ? 'bg-red-50 text-red-700 border border-red-200/80' 
                            : 'bg-emerald-50 text-emerald-700 border border-emerald-200/80'
                        }`}
                      >
                        {m.prioridade}
                      </span>
                      <span className="text-xs font-bold text-slate-400 font-mono">
                        ~{m.questoesEstimadas} questões
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mb-1">
                      <span className={`w-6 h-6 rounded-lg flex items-center justify-center ${themeStyle.iconBg}`}>
                        {themeStyle.icon}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 leading-snug">
                        {m.nome}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed">
                      {m.descricao}
                    </p>

                    {/* Phase & Repetition Badge */}
                    <div className="mt-3 p-2 bg-slate-50 rounded-xl border border-slate-200/70 text-[11px] space-y-1">
                      <div className="flex items-center justify-between font-medium">
                        <span className="text-slate-500">Fases no Cronograma:</span>
                        <span className="font-bold text-slate-800">Fases 1, 2 e 3</span>
                      </div>
                      <div className="flex items-center justify-between text-emerald-700 font-bold">
                        <span>Retomadas Totais:</span>
                        <span>{m.retomadasInfo}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <div className="text-[11px] text-slate-400">Tempo de Estudo</div>
                      <div className="text-sm sm:text-base font-extrabold text-emerald-700 font-mono">
                        {m.horasAlocadas}h <span className="text-xs font-normal text-slate-500">({m.pctTempo}%)</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[11px] text-slate-400">% da Prova</div>
                      <div className="text-sm font-bold text-slate-800 font-mono">
                        {m.pctProva}%
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ================= CAMADA 2: MESO ================= */}
      {(activeLayer === 'todas' || activeLayer === 'camada2') && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2 tracking-tight">
                <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-xs font-black">
                  2
                </span>
                CAMADA 2 — Meso (Tópicos por Frequência, Temperatura e Ordem Estratégica)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Tópicos organizados com título específico por tema, indicação de temperatura e notas estratégicas para a banca Cesgranrio.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-red-50 text-red-700 rounded-md border border-red-200/60 font-semibold">
                🔥 Quente
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-50 text-amber-800 rounded-md border border-amber-200/60 font-semibold">
                🌤️ Morno
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-700 rounded-md border border-blue-200/60 font-semibold">
                ❄️ Frio
              </span>
            </div>
          </div>

          {/* Grouped by Theme with Title per Theme */}
          <div className="space-y-6">
            {filteredMacro.map((macro) => {
              const macroTopics = filteredMeso.filter(t => t.disciplinaId === macro.id);
              if (macroTopics.length === 0) return null;
              const themeStyle = getThemeMeta(macro.id);

              return (
                <div 
                  key={macro.id}
                  className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden transition-all"
                >
                  {/* Theme Header Title Banner */}
                  <div className="p-4 sm:p-5 bg-slate-50/80 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold ${themeStyle.iconBg}`}>
                        {themeStyle.icon}
                      </span>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight">
                            {macro.nome}
                          </h4>
                          <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${themeStyle.badgeColor}`}>
                            {macro.prioridade}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {macro.descricao}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 text-xs self-start sm:self-auto font-mono">
                      <div className="px-2.5 py-1 bg-white rounded-lg border border-slate-200 text-slate-700 font-semibold shadow-2xs">
                        ~{macro.questoesEstimadas} questões ({macro.pctProva}%)
                      </div>
                      <div className="px-2.5 py-1 bg-emerald-50 rounded-lg border border-emerald-200 text-emerald-800 font-bold shadow-2xs">
                        {macro.horasAlocadas}h alocadas
                      </div>
                    </div>
                  </div>

                  {/* Topics Table for this Theme */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-slate-100/50 border-b border-slate-200 text-slate-600 uppercase font-semibold text-[11px]">
                        <tr>
                          <th className="py-2.5 px-4 w-14 text-center">Ordem</th>
                          <th className="py-2.5 px-4">Tópico do Edital</th>
                          <th className="py-2.5 px-4 w-48">Fases & Retomadas</th>
                          <th className="py-2.5 px-4 w-32">Frequência</th>
                          <th className="py-2.5 px-4 w-44">Temperatura</th>
                          <th className="py-2.5 px-4 w-20 text-center">Horas</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-700">
                        {macroTopics.map((t) => (
                          <tr key={t.id} className="hover:bg-slate-50/70 transition-colors">
                            <td className="py-3 px-4 text-center font-bold font-mono text-emerald-700">
                              #{t.ordemEstudo}º
                            </td>
                            <td className="py-3 px-4 font-semibold text-slate-900">
                              <div className="text-slate-900">{t.nome}</div>
                              {t.notaEstrategica && (
                                <div className="text-[11px] font-normal text-amber-900 bg-amber-50/90 p-2.5 rounded-xl mt-1.5 border border-amber-200/70 leading-relaxed shadow-2xs">
                                  💡 <strong>Estratégia Cesgranrio:</strong> {t.notaEstrategica}
                                </div>
                              )}
                            </td>
                            <td className="py-3 px-4">
                              <div className="space-y-1">
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-50 text-blue-800 border border-blue-200/70">
                                  🔄 {t.retomadasQtd}x retomado
                                </span>
                                <div className="text-[10px] font-medium text-slate-500 leading-tight">
                                  {t.fasePresenca}
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-slate-600 whitespace-nowrap font-medium">
                              {t.frequenciaHistorica}
                            </td>
                            <td className="py-3 px-4 whitespace-nowrap">
                              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold inline-flex items-center gap-1 ${
                                t.temperatura === 'quente' ? 'bg-red-50 text-red-700 border border-red-200/80' :
                                t.temperatura === 'morno' ? 'bg-amber-50 text-amber-800 border border-amber-200/80' :
                                'bg-blue-50 text-blue-700 border border-blue-200/80'
                              }`}>
                                {t.temperaturaLabel}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-center font-mono font-bold text-slate-900">
                              {t.horasSugeridas}h
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ================= CAMADA 3: MICRO ================= */}
      {(activeLayer === 'todas' || activeLayer === 'camada3') && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2 tracking-tight">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-black">
                  3
                </span>
                CAMADA 3 — Micro (Subtópicos: Dificuldade, Custo-Benefício e Inclusão)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Critério de corte: Alta Frequência + Fácil/Médio = Prioridade Máxima de Inclusão.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {filteredMacro.map((macro) => {
              const microTopics = filteredMicro.filter(sub => sub.disciplinaId === macro.id);
              if (microTopics.length === 0) return null;
              const themeStyle = getThemeMeta(macro.id);

              return (
                <div key={macro.id} className="space-y-3">
                  <div className="flex items-center gap-2 px-1">
                    <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs ${themeStyle.iconBg}`}>
                      {themeStyle.icon}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900">
                      {macro.nome} ({microTopics.length} subtópicos mapeados)
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    {microTopics.map((sub) => (
                      <div 
                        key={sub.id}
                        className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tight ${
                              sub.incluir === 'Sim' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/80' :
                              sub.incluir === 'Leitura rápida' ? 'bg-amber-50 text-amber-800 border border-amber-200/80' :
                              'bg-red-50 text-red-700 border border-red-200/80'
                            }`}>
                              {sub.incluir === 'Sim' ? '✅ Incluído' : sub.incluir}
                            </span>

                            {/* Star Rating */}
                            <div className="flex items-center gap-0.5 text-amber-400">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`w-3.5 h-3.5 ${
                                    i < sub.custoBeneficio ? 'fill-amber-400 text-amber-400' : 'text-slate-200'
                                  }`} 
                                />
                              ))}
                            </div>
                          </div>

                          <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                            {sub.nome}
                          </h4>
                          <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                            {sub.detalhes}
                          </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <span className="text-slate-500">Dificuldade:</span>
                            <span className="font-semibold text-slate-800">{sub.dificuldade}</span>
                          </div>
                          <div className="flex items-center gap-1 font-mono font-bold text-emerald-700">
                            <Clock className="w-3.5 h-3.5 text-emerald-600" />
                            <span>{sub.horas}h sugeridas</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
