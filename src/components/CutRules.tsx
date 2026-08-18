import React from 'react';
import { REGRAS_DE_CORTE, TRADE_OFF_EXPLICITO } from '../data/cutRulesData';
import { 
  Scissors, 
  AlertOctagon, 
  Clock, 
  CheckCircle2, 
  HelpCircle, 
  Zap, 
  ArrowRight,
  ShieldCheck,
  TrendingUp
} from 'lucide-react';

export const CutRules: React.FC = () => {
  const cortesTotais = REGRAS_DE_CORTE.filter(r => r.tipo === 'corte_total');
  const estudarUltimo = REGRAS_DE_CORTE.filter(r => r.tipo === 'estudar_ultimo');

  return (
    <div className="space-y-8 max-w-7xl mx-auto py-6 px-4">
      {/* Header Card */}
      <div className="bg-white rounded-2xl p-5 sm:p-7 border border-slate-200/80 shadow-xs">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="px-2.5 py-0.5 bg-red-100/90 text-red-800 rounded-full text-[11px] font-bold uppercase tracking-wider">
            Estratégia de Alto Rendimento
          </span>
          <span className="text-xs text-slate-500 font-semibold">
            O que NÃO Estudar e Otimização de Tempo
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
          Regra de Corte & Trade-offs Explícitos
        </h2>
        <p className="text-slate-600 mt-2 text-xs sm:text-sm max-w-3xl leading-relaxed">
          Para quem tem <strong>150 horas disponíveis</strong> e nível inicial baixo, tentar estudar 100% de todo o edital é garantia de mediocridade geral. 
          Saber <strong>o que descartar</strong> é o que permite você gabaritar os 80% que caem.
        </p>
      </div>

      {/* O Trade-Off Central (Hero Card) */}
      <div className="bg-slate-900 text-white rounded-2xl p-5 sm:p-7 border border-slate-800 shadow-xs relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 flex items-center justify-center shrink-0">
            <Zap className="w-5 h-5" />
          </div>
          <div className="space-y-4 flex-1">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                {TRADE_OFF_EXPLICITO.titulo}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                {TRADE_OFF_EXPLICITO.premissa}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
              <div className="bg-slate-800/90 p-4 rounded-xl border border-slate-700">
                <div className="flex items-center gap-2 text-red-400 font-bold text-xs uppercase mb-1">
                  <Scissors className="w-3.5 h-3.5" /> Decisão Estratégica
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {TRADE_OFF_EXPLICITO.decisaoEstrategica}
                </p>
              </div>

              <div className="bg-slate-800/90 p-4 rounded-xl border border-slate-700">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase mb-1">
                  <TrendingUp className="w-3.5 h-3.5" /> Ganho Líquido Projetado
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {TRADE_OFF_EXPLICITO.ganhoEstimado}
                </p>
              </div>
            </div>

            <div className="bg-emerald-950/70 border border-emerald-500/30 p-3.5 rounded-xl text-xs text-emerald-200">
              <strong>🏆 {TRADE_OFF_EXPLICITO.regraDeOuro}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Tabela 1: Cortes Totais (0h) */}
      <div className="space-y-3.5">
        <div className="flex items-center justify-between">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2 tracking-tight">
            <span className="w-5 h-5 rounded-full bg-red-100 text-red-700 flex items-center justify-center text-xs font-black">
              ❌
            </span>
            Corte Total (0 Hora de Estudo) — Não Perca Tempo
          </h3>
          <span className="text-xs text-red-600 font-bold">Economia: +64 horas</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {cortesTotais.map((corte) => (
            <div 
              key={corte.id}
              className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-200/80">
                    Corte Total (0h)
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                    Poupa {corte.horasEconomizadas}
                  </span>
                </div>

                <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                  {corte.item}
                </h4>

                <div className="mt-3 space-y-2 text-xs">
                  <div className="bg-slate-50/90 p-2.5 rounded-xl border border-slate-200/60 text-slate-700 leading-relaxed">
                    <strong className="text-slate-900">Por que cortar:</strong> {corte.motivoCorte}
                  </div>
                  <div className="bg-emerald-50/50 p-2.5 rounded-xl border border-emerald-100 text-emerald-900 leading-relaxed">
                    <strong className="text-emerald-950">Trade-off aceito:</strong> {corte.tradeOffAceito}
                  </div>
                </div>
              </div>

              <div className="mt-3 pt-2 text-[11px] text-slate-400 font-mono">
                Área: {corte.disciplina}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabela 2: Estudar por Último */}
      <div className="space-y-3.5">
        <div className="flex items-center justify-between">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2 tracking-tight">
            <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-xs font-black">
              ⏳
            </span>
            Estudar por Último (Apenas Leitura Rápida de Fechamento)
          </h3>
          <span className="text-xs text-amber-700 font-semibold">Tópicos residuais ou frios</span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-600 uppercase font-semibold text-[11px]">
                <tr>
                  <th className="py-2.5 px-4">Tópico Residual</th>
                  <th className="py-2.5 px-4">Disciplina</th>
                  <th className="py-2.5 px-4">Por que fica no final?</th>
                  <th className="py-2.5 px-4 text-center">Tempo Máximo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {estudarUltimo.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-2.5 px-4 font-bold text-slate-900">
                      {item.item}
                    </td>
                    <td className="py-2.5 px-4 text-slate-600 whitespace-nowrap">
                      {item.disciplina}
                    </td>
                    <td className="py-2.5 px-4 text-slate-600">
                      {item.motivoCorte}
                    </td>
                    <td className="py-2.5 px-4 text-center font-mono font-bold text-amber-700 whitespace-nowrap">
                      {item.horasEconomizadas}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
