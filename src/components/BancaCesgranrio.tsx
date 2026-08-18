import React, { useState } from 'react';
import { 
  ALERTAS_CESGRANRIO, 
  PARES_CONCEITUAIS_IRMAOS, 
  ParConceitual 
} from '../data/bancaData';
import { 
  AlertTriangle, 
  HelpCircle, 
  Layers, 
  CheckCircle, 
  XCircle, 
  Sparkles, 
  Search, 
  BookOpen,
  ArrowRight,
  Flame,
  Lightbulb
} from 'lucide-react';

export const BancaCesgranrio: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>('todas');
  const [openCardId, setOpenCardId] = useState<string | null>(null);

  const filteredPares = PARES_CONCEITUAIS_IRMAOS.filter(par => {
    const matchesSearch = searchTerm === '' ||
      par.termoA.toLowerCase().includes(searchTerm.toLowerCase()) ||
      par.termoB.toLowerCase().includes(searchTerm.toLowerCase()) ||
      par.diferencaChave.toLowerCase().includes(searchTerm.toLowerCase()) ||
      par.pegadinhaBanca.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDisc = selectedDiscipline === 'todas' || par.disciplina.toLowerCase().includes(selectedDiscipline.toLowerCase());

    return matchesSearch && matchesDisc;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto py-6 px-4">
      {/* Header */}
      <div className="bg-white rounded-2xl p-5 sm:p-7 border border-slate-200/80 shadow-xs">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="px-2.5 py-0.5 bg-amber-100/90 text-amber-800 rounded-full text-[11px] font-bold uppercase tracking-wider">
            Perfil da Banca Examinadora
          </span>
          <span className="text-xs text-slate-500 font-semibold">
            Fundação Cesgranrio · Análise Comportamental
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
          Raio-X da Banca Cesgranrio & Pares Conceituais
        </h2>
        <p className="text-slate-600 mt-2 text-xs sm:text-sm max-w-3xl leading-relaxed">
          A Cesgranrio não faz pegadinhas filosóficas ou rebuscadas; ela testa se o candidato domina a <strong className="text-slate-900 font-semibold">definição exata</strong> e a <strong className="text-slate-900 font-semibold">diferença entre termos irmãos</strong>.
        </p>
      </div>

      {/* Alertas da Banca Grid */}
      <div className="space-y-3.5">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2 tracking-tight">
          <AlertTriangle className="w-4 h-4 text-amber-500" />
          5 Regras Comportamentais da Cesgranrio
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {ALERTAS_CESGRANRIO.map((alerta, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-1 font-mono">
                  REGRA #{idx + 1}
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                  {alerta.caracteristica}
                </h4>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {alerta.oQueSignifica}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 bg-emerald-50/70 p-2.5 rounded-xl text-xs text-emerald-950 font-medium leading-relaxed">
                <strong className="text-emerald-800">Sua Ação:</strong> {alerta.estrategiaRecomendada}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Folha de Pares Conceituais Irmãos (Interactive Tool) */}
      <div className="bg-white rounded-2xl p-5 sm:p-7 border border-slate-200/80 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2 tracking-tight">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                Dicionário Interativo de "Pares Conceituais Irmãos"
              </h3>
              <span className="bg-emerald-100/90 text-emerald-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                {filteredPares.length} pares mapeados
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Os conceitos mais frequentemente confundidos nas opções A, B, C, D e E da Cesgranrio
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Buscar par conceitual (ex: DFC, Dispensa...)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
            />
          </div>
        </div>

        {/* Pairs Grid */}
        <div className="grid grid-cols-1 gap-3.5">
          {filteredPares.map((par) => {
            const isOpen = openCardId === par.id;

            return (
              <div 
                key={par.id}
                className="bg-slate-50/80 rounded-2xl p-4 sm:p-5 border border-slate-200/80 hover:border-slate-300 transition-all shadow-xs"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-200/70 pb-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono font-bold text-emerald-700 bg-emerald-100/90 px-2 py-0.5 rounded-md">
                      {par.disciplina}
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                      {par.termoA} <span className="text-slate-400">×</span> {par.termoB} {par.termoC && <><span className="text-slate-400">×</span> {par.termoC}</>}
                    </h4>
                  </div>

                  <button
                    id={`btn-toggle-par-${par.id}`}
                    onClick={() => setOpenCardId(isOpen ? null : par.id)}
                    className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 self-start md:self-auto transition-colors"
                  >
                    <span>{isOpen ? 'Ocultar Detalhes' : 'Ver Análise Completa'}</span>
                  </button>
                </div>

                {/* Compare Blocks */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-xs">
                    <div className="font-bold text-blue-700 mb-1 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-500" />
                      {par.termoA}
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      {par.definicaoA}
                    </p>
                  </div>

                  <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-xs">
                    <div className="font-bold text-amber-700 mb-1 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                      {par.termoB}
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      {par.definicaoB}
                    </p>
                  </div>
                </div>

                {/* Expanded Details */}
                {isOpen && (
                  <div className="mt-4 pt-3 border-t border-slate-200/80 space-y-2 text-xs">
                    <div className="bg-emerald-50/80 p-3 rounded-xl border border-emerald-100 text-emerald-950 leading-relaxed">
                      <strong className="text-emerald-900">🎯 A Diferença-Chave para a Prova:</strong> {par.diferencaChave}
                    </div>

                    <div className="bg-red-50/80 p-3 rounded-xl border border-red-100 text-red-950 leading-relaxed">
                      <strong className="text-red-900">⚠️ A Pegadinha Típica da Cesgranrio:</strong> {par.pegadinhaBanca}
                    </div>

                    <div className="bg-slate-100/90 p-3 rounded-xl text-slate-700 leading-relaxed">
                      <strong className="text-slate-900">🏢 Exemplo Prático Transpetro:</strong> {par.exemploPratico}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {filteredPares.length === 0 && (
            <div className="text-center py-8 text-slate-400 text-sm italic">
              Nenhum par conceitual encontrado para "{searchTerm}".
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
