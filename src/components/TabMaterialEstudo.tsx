import React, { useState } from 'react';
import { MATERIAL_ESTUDOS } from '../data/materialEstudosData';
import { 
  BookOpen, 
  Calculator, 
  Bookmark, 
  Search, 
  Lightbulb, 
  Table, 
  ChevronRight
} from 'lucide-react';

interface TabMaterialEstudoProps {
  onOpenCalculator: (formulaNome?: string) => void;
}

export const TabMaterialEstudo: React.FC<TabMaterialEstudoProps> = ({ onOpenCalculator }) => {
  const [moduloAtivo, setModuloAtivo] = useState<string>('proc-adm');
  const [busca, setBusca] = useState<string>('');

  const moduloSelecionado = MATERIAL_ESTUDOS.find(m => m.id === moduloAtivo) || MATERIAL_ESTUDOS[0];

  const secoesFiltradas = moduloSelecionado.secoes.filter(s => {
    if (!busca) return true;
    const termo = busca.toLowerCase();
    return s.titulo.toLowerCase().includes(termo) || s.conteudoMarkdown.toLowerCase().includes(termo);
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner with Quick Actions */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold text-blue-700 uppercase tracking-wider mb-1">
              <span className="w-2 h-5 bg-blue-600 rounded-full"></span>
              <BookOpen className="w-4 h-4" />
              <span>Material de Estudo Oficial Condensado</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">Conhecimentos Específicos & Legislação Aplicada</h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mt-1 leading-relaxed">
              Síntese teórica, quadros comparativos, normas ISO/CONAMA, fórmulas matemáticas e pontos focais de prova para a Ênfase 1.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => onOpenCalculator()}
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 shadow-xs cursor-pointer transition"
            >
              <Calculator className="w-4 h-4" />
              <span>Calculadora de Fórmulas</span>
            </button>
          </div>
        </div>

        {/* Module Selector Pills */}
        <div className="mt-6 flex flex-wrap gap-2 border-t border-slate-100 pt-4">
          {MATERIAL_ESTUDOS.map((mod) => (
            <button
              key={mod.id}
              onClick={() => {
                setModuloAtivo(mod.id);
                setBusca('');
              }}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer flex items-center gap-2 ${
                moduloAtivo === mod.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <span>{mod.titulo}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="space-y-6">
        {/* Module Subtitle & Search */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div>
            <h3 className="text-base font-bold text-slate-900">{moduloSelecionado.titulo}</h3>
            <p className="text-xs text-slate-500">{moduloSelecionado.subtitulo}</p>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar no módulo..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-blue-600"
            />
          </div>
        </div>

        {/* Sections List */}
        <div className="space-y-6">
          {secoesFiltradas.map((secao) => (
            <div
              key={secao.id}
              id={`secao-${secao.id}`}
              className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-100 pb-3">
                <h4 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Bookmark className="w-5 h-5 text-blue-600" />
                  {secao.titulo}
                </h4>
                {secao.badge && (
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 w-fit">
                    {secao.badge}
                  </span>
                )}
              </div>

              {/* Main Content Render */}
              <div className="text-sm text-slate-700 leading-relaxed space-y-3 whitespace-pre-line font-sans">
                {secao.conteudoMarkdown}
              </div>

              {/* Optional Table */}
              {secao.tabelaDestaque && (
                <div className="mt-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="flex items-center space-x-2 text-xs font-bold text-slate-800 mb-3">
                    <Table className="w-4 h-4 text-blue-600" />
                    <span>Quadro de Referência Rápida:</span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-slate-100 text-slate-600 border-b border-slate-200 font-semibold">
                          {secao.tabelaDestaque.colunas.map((col, cIdx) => (
                            <th key={cIdx} className="p-2.5">{col}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {secao.tabelaDestaque.linhas.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-slate-100/50">
                            {row.map((cell, cellIdx) => (
                              <td key={cellIdx} className="p-2.5 text-slate-700 font-medium">{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Optional Formulas Cards */}
              {secao.formulas && secao.formulas.length > 0 && (
                <div className="mt-4 space-y-3">
                  <div className="text-xs font-bold text-blue-700 flex items-center gap-1.5">
                    <Calculator className="w-4 h-4 text-blue-600" />
                    <span>Fórmulas Chave do Tópico:</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {secao.formulas.map((f, fIdx) => (
                      <div key={fIdx} className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex flex-col justify-between shadow-xs">
                        <div>
                          <div className="font-bold text-xs text-slate-900 mb-1">{f.nome}</div>
                          <div className="font-mono text-xs text-blue-700 bg-white p-2 rounded-lg border border-slate-200 font-bold">
                            {f.formula}
                          </div>
                          <div className="mt-2 space-y-0.5 text-[11px] text-slate-600">
                            {f.variaveis.map((v, vIdx) => (
                              <div key={vIdx}>
                                <strong className="text-slate-800">{v.simbolo}:</strong> {v.significado}
                              </div>
                            ))}
                          </div>
                        </div>
                        <button
                          onClick={() => onOpenCalculator(f.nome)}
                          className="mt-3 w-full py-1.5 rounded-lg bg-blue-50 hover:bg-blue-600 text-xs font-semibold text-blue-700 hover:text-white border border-blue-200 transition cursor-pointer flex items-center justify-center gap-1.5"
                        >
                          <Calculator className="w-3.5 h-3.5" />
                          <span>Simular na Calculadora</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Pontos de Prova / Dicas Finais */}
              <div className="mt-4 bg-amber-50/80 border border-amber-200 rounded-xl p-4 space-y-2">
                <div className="flex items-center space-x-2 text-xs font-bold text-amber-800">
                  <Lightbulb className="w-4 h-4 text-amber-600" />
                  <span>Pontos de Atenção para a Prova (Fundação Cesgranrio):</span>
                </div>
                <ul className="space-y-1 text-xs text-slate-700">
                  {secao.pontosDeProva.map((ponto, pIdx) => (
                    <li key={pIdx} className="flex items-start space-x-2">
                      <ChevronRight className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                      <span>{ponto}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}

          {secoesFiltradas.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl border border-slate-200 shadow-xs">
              <p className="text-slate-500 text-sm">Nenhum conteúdo encontrado para a busca "{busca}".</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
