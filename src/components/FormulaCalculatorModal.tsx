import React, { useState, useEffect } from 'react';
import { 
  X, 
  Calculator, 
  RotateCcw, 
  HelpCircle, 
  CheckCircle2, 
  ArrowRight,
  TrendingUp,
  Percent,
  Layers,
  Sparkles
} from 'lucide-react';

interface FormulaCalculatorModalProps {
  initialFormulaNome?: string;
  onClose: () => void;
}

type CalculatorType = 
  | 'ponto_pedido' 
  | 'lec' 
  | 'juros_simples' 
  | 'juros_compostos' 
  | 'desconto_comercial' 
  | 'desconto_racional' 
  | 'giro_estoque';

export const FormulaCalculatorModal: React.FC<FormulaCalculatorModalProps> = ({
  initialFormulaNome,
  onClose
}) => {
  const [calcType, setCalcType] = useState<CalculatorType>('ponto_pedido');

  // Input states
  // Ponto de Pedido
  const [ppConsumo, setPpConsumo] = useState<number>(20);
  const [ppLeadTime, setPpLeadTime] = useState<number>(10);
  const [ppEstoqueSeg, setPpEstoqueSeg] = useState<number>(50);

  // LEC
  const [lecDemanda, setLecDemanda] = useState<number>(10000);
  const [lecCustoPedido, setLecCustoPedido] = useState<number>(50);
  const [lecCustoArmaz, setLecCustoArmaz] = useState<number>(4);

  // Juros Simples
  const [jsCapital, setJsCapital] = useState<number>(5000);
  const [jsTaxa, setJsTaxa] = useState<number>(2); // 2% a.m.
  const [jsPeriodos, setJsPeriodos] = useState<number>(6); // 6 meses

  // Juros Compostos
  const [jcCapital, setJcCapital] = useState<number>(1000);
  const [jcTaxa, setJcTaxa] = useState<number>(10); // 10% a.a.
  const [jcPeriodos, setJcPeriodos] = useState<number>(2); // 2 anos

  // Desconto Comercial
  const [dcNominal, setDcNominal] = useState<number>(10000);
  const [dcTaxa, setDcTaxa] = useState<number>(3); // 3% a.m.
  const [dcPeriodos, setDcPeriodos] = useState<number>(2);

  // Desconto Racional
  const [drNominal, setDrNominal] = useState<number>(10600);
  const [drTaxa, setDrTaxa] = useState<number>(6); // 6% no periodo
  const [drPeriodos, setDrPeriodos] = useState<number>(1);

  // Giro de Estoque
  const [geCmv, setGeCmv] = useState<number>(1200000);
  const [geEstoqueMedio, setGeEstoqueMedio] = useState<number>(200000);

  useEffect(() => {
    if (initialFormulaNome) {
      const lower = initialFormulaNome.toLowerCase();
      if (lower.includes('pedido') || lower.includes('pp')) setCalcType('ponto_pedido');
      else if (lower.includes('lote') || lower.includes('lec') || lower.includes('eoq')) setCalcType('lec');
      else if (lower.includes('composto')) setCalcType('juros_compostos');
      else if (lower.includes('simples') || lower.includes('juros')) setCalcType('juros_simples');
      else if (lower.includes('comercial') || lower.includes('fora')) setCalcType('desconto_comercial');
      else if (lower.includes('racional') || lower.includes('dentro')) setCalcType('desconto_racional');
      else if (lower.includes('giro')) setCalcType('giro_estoque');
    }
  }, [initialFormulaNome]);

  // Calculations
  const calcPontoPedidoResult = () => {
    const consumoTotalNoTr = ppConsumo * ppLeadTime;
    const pontoPedido = consumoTotalNoTr + ppEstoqueSeg;
    return { consumoTotalNoTr, pontoPedido };
  };

  const calcLecResult = () => {
    if (lecCustoArmaz <= 0) return { lec: 0, pedidosAno: 0 };
    const valor = (2 * lecDemanda * lecCustoPedido) / lecCustoArmaz;
    const lec = Math.round(Math.sqrt(valor));
    const pedidosAno = lec > 0 ? (lecDemanda / lec).toFixed(1) : '0';
    return { lec, pedidosAno };
  };

  const calcJurosSimplesResult = () => {
    const i = jsTaxa / 100;
    const juros = jsCapital * i * jsPeriodos;
    const montante = jsCapital + juros;
    return { juros, montante };
  };

  const calcJurosCompostosResult = () => {
    const i = jcTaxa / 100;
    const montante = jcCapital * Math.pow(1 + i, jcPeriodos);
    const juros = montante - jcCapital;
    return { juros, montante };
  };

  const calcDescontoComercialResult = () => {
    const d = dcTaxa / 100;
    const desconto = dcNominal * d * dcPeriodos;
    const valorAtual = dcNominal - desconto;
    return { desconto, valorAtual };
  };

  const calcDescontoRacionalResult = () => {
    const d = drTaxa / 100;
    const divisor = 1 + (d * drPeriodos);
    const valorAtual = divisor > 0 ? drNominal / divisor : 0;
    const desconto = drNominal - valorAtual;
    return { desconto, valorAtual };
  };

  const calcGiroResult = () => {
    const giro = geEstoqueMedio > 0 ? (geCmv / geEstoqueMedio).toFixed(2) : '0';
    const coberturaDias = Number(giro) > 0 ? Math.round(365 / Number(giro)) : 0;
    return { giro, coberturaDias };
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full border border-slate-200 shadow-2xl overflow-hidden my-auto animate-fadeIn">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-slate-950 text-white p-5 sm:p-6 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-white shadow-md">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2">
                Calculadora de Fórmulas Transpetro
              </h3>
              <p className="text-xs text-slate-400">
                Simulador interativo das fórmulas mais cobradas na Cesgranrio
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Formula Selector Tabs */}
        <div className="bg-slate-50 p-3 border-b border-slate-200 overflow-x-auto flex items-center gap-1.5 scrollbar-none">
          {[
            { id: 'ponto_pedido', label: 'Ponto de Pedido (PP)' },
            { id: 'lec', label: 'Lote Econômico (LEC)' },
            { id: 'juros_simples', label: 'Juros Simples' },
            { id: 'juros_compostos', label: 'Juros Compostos' },
            { id: 'desconto_comercial', label: 'Desc. Comercial ("Por Fora")' },
            { id: 'desconto_racional', label: 'Desc. Racional ("Por Dentro")' },
            { id: 'giro_estoque', label: 'Giro de Estoque' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setCalcType(tab.id as CalculatorType)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                calcType === tab.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-6">
          {/* Ponto de Pedido Form */}
          {calcType === 'ponto_pedido' && (() => {
            const res = calcPontoPedidoResult();
            return (
              <div className="space-y-5">
                <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-4 text-xs text-blue-900 space-y-1">
                  <div className="font-bold flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-blue-600" />
                    <span>Fórmula: Ponto de Pedido (PP) = (Consumo Diário × Lead Time) + Estoque de Segurança</span>
                  </div>
                  <p className="text-slate-600">
                    O Ponto de Pedido indica a quantidade em estoque que dispara a necessidade de emitir um novo pedido para não zerar o estoque.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Consumo Médio Diário (C):</label>
                    <input
                      type="number"
                      value={ppConsumo}
                      onChange={e => setPpConsumo(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900"
                    />
                    <span className="text-[10px] text-slate-400">Ex: 20 unidades/dia</span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Lead Time / Reposição (TR):</label>
                    <input
                      type="number"
                      value={ppLeadTime}
                      onChange={e => setPpLeadTime(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900"
                    />
                    <span className="text-[10px] text-slate-400">Ex: 10 dias úteis</span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Estoque de Segurança (ES):</label>
                    <input
                      type="number"
                      value={ppEstoqueSeg}
                      onChange={e => setPpEstoqueSeg(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900"
                    />
                    <span className="text-[10px] text-slate-400">Ex: 50 unidades de reserva</span>
                  </div>
                </div>

                {/* Calculation Result */}
                <div className="bg-slate-900 text-white rounded-xl p-5 space-y-3">
                  <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                    Passo a Passo do Cálculo:
                  </div>
                  <div className="font-mono text-xs text-slate-300 space-y-1 bg-slate-950 p-3 rounded-lg border border-slate-800">
                    <div>1. Consumo no Lead Time = {ppConsumo} × {ppLeadTime} = {res.consumoTotalNoTr} unidades</div>
                    <div>2. Ponto de Pedido = {res.consumoTotalNoTr} + {ppEstoqueSeg} = <span className="text-emerald-400 font-bold">{res.pontoPedido} unidades</span></div>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                    <span className="text-sm font-bold text-slate-200">Gatilho de Compra (PP):</span>
                    <span className="text-2xl font-extrabold text-emerald-400 font-mono">
                      {res.pontoPedido} unidades
                    </span>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* LEC Form */}
          {calcType === 'lec' && (() => {
            const res = calcLecResult();
            return (
              <div className="space-y-5">
                <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-4 text-xs text-blue-900 space-y-1">
                  <div className="font-bold flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-blue-600" />
                    <span>Fórmula: LEC = √[(2 × D × Cp) / Ca]</span>
                  </div>
                  <p className="text-slate-600">
                    Determina a quantidade ideal de compra que minimiza a soma do custo anual de pedir e do custo de manter o estoque.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Demanda Anual (D):</label>
                    <input
                      type="number"
                      value={lecDemanda}
                      onChange={e => setLecDemanda(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900"
                    />
                    <span className="text-[10px] text-slate-400">Ex: 10.000 un/ano</span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Custo por Pedido (Cp):</label>
                    <input
                      type="number"
                      value={lecCustoPedido}
                      onChange={e => setLecCustoPedido(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900"
                    />
                    <span className="text-[10px] text-slate-400">Ex: R$ 50,00</span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Custo Armazenagem/un (Ca):</label>
                    <input
                      type="number"
                      value={lecCustoArmaz}
                      onChange={e => setLecCustoArmaz(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900"
                    />
                    <span className="text-[10px] text-slate-400">Ex: R$ 4,00/un.ano</span>
                  </div>
                </div>

                {/* Calculation Result */}
                <div className="bg-slate-900 text-white rounded-xl p-5 space-y-3">
                  <div className="font-mono text-xs text-slate-300 space-y-1 bg-slate-950 p-3 rounded-lg border border-slate-800">
                    <div>1. Numerador = 2 × {lecDemanda} × {lecCustoPedido} = {(2 * lecDemanda * lecCustoPedido).toLocaleString('pt-BR')}</div>
                    <div>2. Divisão por Ca = {(2 * lecDemanda * lecCustoPedido) / lecCustoArmaz}</div>
                    <div>3. Raiz Quadrada = <span className="text-emerald-400 font-bold">{res.lec} unidades</span></div>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                    <span className="text-sm font-bold text-slate-200">Lote Econômico Ótimo (LEC):</span>
                    <span className="text-2xl font-extrabold text-emerald-400 font-mono">
                      {res.lec} un (~{res.pedidosAno} pedidos/ano)
                    </span>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Juros Simples */}
          {calcType === 'juros_simples' && (() => {
            const res = calcJurosSimplesResult();
            return (
              <div className="space-y-5">
                <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-4 text-xs text-blue-900 space-y-1">
                  <div className="font-bold flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-blue-600" />
                    <span>Fórmulas: J = C × i × t &nbsp;|&nbsp; M = C × (1 + i × t)</span>
                  </div>
                  <p className="text-slate-600">
                    Juros constantes incidentes sempre sobre o capital inicial original.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Capital Inicial (C):</label>
                    <input
                      type="number"
                      value={jsCapital}
                      onChange={e => setJsCapital(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900"
                    />
                    <span className="text-[10px] text-slate-400">Ex: R$ 5.000,00</span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Taxa de Juros % (i):</label>
                    <input
                      type="number"
                      value={jsTaxa}
                      onChange={e => setJsTaxa(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900"
                    />
                    <span className="text-[10px] text-slate-400">Ex: 2% a.m. (0,02)</span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Prazo / Períodos (t):</label>
                    <input
                      type="number"
                      value={jsPeriodos}
                      onChange={e => setJsPeriodos(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900"
                    />
                    <span className="text-[10px] text-slate-400">Ex: 6 meses</span>
                  </div>
                </div>

                <div className="bg-slate-900 text-white rounded-xl p-5 space-y-3">
                  <div className="font-mono text-xs text-slate-300 space-y-1 bg-slate-950 p-3 rounded-lg border border-slate-800">
                    <div>1. Juros (J) = {jsCapital} × {(jsTaxa / 100)} × {jsPeriodos} = <span className="text-emerald-400 font-bold">R$ {res.juros.toFixed(2)}</span></div>
                    <div>2. Montante (M) = {jsCapital} + {res.juros.toFixed(2)} = <span className="text-emerald-400 font-bold">R$ {res.montante.toFixed(2)}</span></div>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                    <span className="text-sm font-bold text-slate-200">Montante Final (M):</span>
                    <span className="text-2xl font-extrabold text-emerald-400 font-mono">
                      R$ {res.montante.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Juros Compostos */}
          {calcType === 'juros_compostos' && (() => {
            const res = calcJurosCompostosResult();
            return (
              <div className="space-y-5">
                <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-4 text-xs text-blue-900 space-y-1">
                  <div className="font-bold flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-blue-600" />
                    <span>Fórmula: M = C × (1 + i)^t</span>
                  </div>
                  <p className="text-slate-600">
                    Juros acumulados periodicamente com capitalização exponencial.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Capital Inicial (C):</label>
                    <input
                      type="number"
                      value={jcCapital}
                      onChange={e => setJcCapital(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Taxa de Juros % (i):</label>
                    <input
                      type="number"
                      value={jcTaxa}
                      onChange={e => setJcTaxa(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Prazo / Períodos (t):</label>
                    <input
                      type="number"
                      value={jcPeriodos}
                      onChange={e => setJcPeriodos(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900"
                    />
                  </div>
                </div>

                <div className="bg-slate-900 text-white rounded-xl p-5 space-y-3">
                  <div className="font-mono text-xs text-slate-300 space-y-1 bg-slate-950 p-3 rounded-lg border border-slate-800">
                    <div>1. Fator Acumulado = (1 + {jcTaxa / 100})^{jcPeriodos} = {Math.pow(1 + jcTaxa / 100, jcPeriodos).toFixed(4)}</div>
                    <div>2. Montante = {jcCapital} × {Math.pow(1 + jcTaxa / 100, jcPeriodos).toFixed(4)} = <span className="text-emerald-400 font-bold">R$ {res.montante.toFixed(2)}</span></div>
                    <div>3. Total de Juros = <span className="text-amber-400">R$ {res.juros.toFixed(2)}</span></div>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                    <span className="text-sm font-bold text-slate-200">Montante Final (M):</span>
                    <span className="text-2xl font-extrabold text-emerald-400 font-mono">
                      R$ {res.montante.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Desconto Comercial */}
          {calcType === 'desconto_comercial' && (() => {
            const res = calcDescontoComercialResult();
            return (
              <div className="space-y-5">
                <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-4 text-xs text-blue-900 space-y-1">
                  <div className="font-bold flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-blue-600" />
                    <span>Fórmulas: Dc = N × d × t &nbsp;|&nbsp; Vc = N × (1 - d × t)</span>
                  </div>
                  <p className="text-slate-600">
                    Desconto "Por Fora": calculado diretamente sobre o Valor Nominal ($N$) futuro.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Valor Nominal (N):</label>
                    <input
                      type="number"
                      value={dcNominal}
                      onChange={e => setDcNominal(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Taxa de Desconto % (d):</label>
                    <input
                      type="number"
                      value={dcTaxa}
                      onChange={e => setDcTaxa(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Prazo de Antecipação (t):</label>
                    <input
                      type="number"
                      value={dcPeriodos}
                      onChange={e => setDcPeriodos(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900"
                    />
                  </div>
                </div>

                <div className="bg-slate-900 text-white rounded-xl p-5 space-y-3">
                  <div className="font-mono text-xs text-slate-300 space-y-1 bg-slate-950 p-3 rounded-lg border border-slate-800">
                    <div>1. Desconto Comercial (Dc) = {dcNominal} × {(dcTaxa / 100)} × {dcPeriodos} = <span className="text-rose-400 font-bold">R$ {res.desconto.toFixed(2)}</span></div>
                    <div>2. Valor Líquido Liberado (Vc) = {dcNominal} - {res.desconto.toFixed(2)} = <span className="text-emerald-400 font-bold">R$ {res.valorAtual.toFixed(2)}</span></div>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                    <span className="text-sm font-bold text-slate-200">Valor Atual Líquido:</span>
                    <span className="text-2xl font-extrabold text-emerald-400 font-mono">
                      R$ {res.valorAtual.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Desconto Racional */}
          {calcType === 'desconto_racional' && (() => {
            const res = calcDescontoRacionalResult();
            return (
              <div className="space-y-5">
                <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-4 text-xs text-blue-900 space-y-1">
                  <div className="font-bold flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-blue-600" />
                    <span>Fórmulas: Vr = N / (1 + d × t) &nbsp;|&nbsp; Dr = N - Vr</span>
                  </div>
                  <p className="text-slate-600">
                    Desconto "Por Dentro" (Verdadeiro): calculado sobre o Valor Atual Real ($V_r$).
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Valor Nominal (N):</label>
                    <input
                      type="number"
                      value={drNominal}
                      onChange={e => setDrNominal(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Taxa de Desconto % (d):</label>
                    <input
                      type="number"
                      value={drTaxa}
                      onChange={e => setDrTaxa(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Prazo de Antecipação (t):</label>
                    <input
                      type="number"
                      value={drPeriodos}
                      onChange={e => setDrPeriodos(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900"
                    />
                  </div>
                </div>

                <div className="bg-slate-900 text-white rounded-xl p-5 space-y-3">
                  <div className="font-mono text-xs text-slate-300 space-y-1 bg-slate-950 p-3 rounded-lg border border-slate-800">
                    <div>1. Divisor = 1 + ({(drTaxa / 100)} × {drPeriodos}) = {(1 + (drTaxa / 100) * drPeriodos).toFixed(4)}</div>
                    <div>2. Valor Atual Racional (Vr) = {drNominal} / {(1 + (drTaxa / 100) * drPeriodos).toFixed(4)} = <span className="text-emerald-400 font-bold">R$ {res.valorAtual.toFixed(2)}</span></div>
                    <div>3. Desconto Racional (Dr) = <span className="text-rose-400 font-bold">R$ {res.desconto.toFixed(2)}</span></div>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                    <span className="text-sm font-bold text-slate-200">Valor Atual Racional:</span>
                    <span className="text-2xl font-extrabold text-emerald-400 font-mono">
                      R$ {res.valorAtual.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Giro de Estoque */}
          {calcType === 'giro_estoque' && (() => {
            const res = calcGiroResult();
            return (
              <div className="space-y-5">
                <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-4 text-xs text-blue-900 space-y-1">
                  <div className="font-bold flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-blue-600" />
                    <span>Fórmula: Giro = CMV / Estoque Médio &nbsp;|&nbsp; Cobertura = 365 / Giro</span>
                  </div>
                  <p className="text-slate-600">
                    Avalia a velocidade com que o estoque é renovado ao longo de um período anual.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Custo das Mercadorias Vendidas (CMV):</label>
                    <input
                      type="number"
                      value={geCmv}
                      onChange={e => setGeCmv(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900"
                    />
                    <span className="text-[10px] text-slate-400">Ex: R$ 1.200.000,00</span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Estoque Médio:</label>
                    <input
                      type="number"
                      value={geEstoqueMedio}
                      onChange={e => setGeEstoqueMedio(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900"
                    />
                    <span className="text-[10px] text-slate-400">Ex: R$ 200.000,00</span>
                  </div>
                </div>

                <div className="bg-slate-900 text-white rounded-xl p-5 space-y-3">
                  <div className="font-mono text-xs text-slate-300 space-y-1 bg-slate-950 p-3 rounded-lg border border-slate-800">
                    <div>1. Giro = {geCmv.toLocaleString('pt-BR')} / {geEstoqueMedio.toLocaleString('pt-BR')} = <span className="text-emerald-400 font-bold">{res.giro} vezes/ano</span></div>
                    <div>2. Tempo Médio de Cobertura = 365 / {res.giro} = <span className="text-emerald-400 font-bold">~{res.coberturaDias} dias</span></div>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                    <span className="text-sm font-bold text-slate-200">Rotatividade Anual:</span>
                    <span className="text-2xl font-extrabold text-emerald-400 font-mono">
                      {res.giro} giros/ano
                    </span>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-5 py-4 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Dica: Na Cesgranrio, treine cálculos rápidos com números arredondados.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition cursor-pointer"
          >
            Fechar Calculadora
          </button>
        </div>
      </div>
    </div>
  );
};
