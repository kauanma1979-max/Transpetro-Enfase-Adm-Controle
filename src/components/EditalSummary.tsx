import React, { useState } from 'react';
import { 
  EDITAL_INFO, 
  POLOS_VAGAS_ENFASE_1, 
  CRONOGRAMA_OFICIAL, 
  CIDADES_APLICACAO_PROVA 
} from '../data/editalData';
import { MaterialLinksSection } from './MaterialLinksSection';
import { 
  Building2, 
  Calendar, 
  DollarSign, 
  MapPin, 
  ShieldAlert, 
  Award, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  FileCheck,
  Users,
  Search,
  ChevronRight,
  ExternalLink,
  BookOpen,
  FolderOpen,
  Link as LinkIcon
} from 'lucide-react';

export const EditalSummary: React.FC = () => {
  const [selectedPolo, setSelectedPolo] = useState<string>('Rio de Janeiro');
  const [citySearch, setCitySearch] = useState<string>('');

  const currentPoloData = POLOS_VAGAS_ENFASE_1.find(p => p.polo === selectedPolo) || POLOS_VAGAS_ENFASE_1[0];

  const filteredCities = CIDADES_APLICACAO_PROVA.filter(c => 
    c.toLowerCase().includes(citySearch.toLowerCase())
  );

  return (
    <div className="space-y-8 max-w-7xl mx-auto py-6 px-4">
      {/* Central de Acesso Rápido a Materiais e Links no Topo da Página */}
      <div className="bg-white rounded-2xl p-5 sm:p-7 border border-slate-200/80 shadow-xs">
        <MaterialLinksSection 
          moduloId="todos" 
          showAllModulesFilter={true} 
        />
      </div>

      {/* Hero Executive Card */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-emerald-50/80 via-teal-50/40 to-transparent rounded-full blur-3xl -z-0 opacity-70 pointer-events-none" />
        
        <div className="relative z-10">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-2.5 py-0.5 bg-emerald-100/90 text-emerald-800 rounded-full text-[11px] font-bold tracking-wide uppercase">
              Resumo Oficial do Edital
            </span>
            <span className="px-2.5 py-0.5 bg-slate-100 text-slate-700 rounded-full text-[11px] font-semibold border border-slate-200/60">
              Edital nº 03/2026
            </span>
            <span className="px-2.5 py-0.5 bg-amber-50 text-amber-800 rounded-full text-[11px] font-semibold flex items-center gap-1 border border-amber-200/60">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-600" /> Nível Médio Regular (Sem Técnico Exigido)
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
            TRANSPETRO 2026.3 — Ênfase 1: Administração e Controle
          </h2>
          <p className="text-slate-600 mt-2 text-xs sm:text-sm max-w-4xl leading-relaxed">
            Processo Seletivo Público para preenchimento de vagas e formação de cadastro de reserva da Petrobras Transporte S.A. Organizado pela <strong className="text-slate-900 font-semibold">Fundação Cesgranrio</strong> com prova objetiva em <strong className="text-emerald-700 font-semibold">29 de Novembro de 2026</strong>.
          </p>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 mt-6">
            <div className="bg-slate-50/90 p-4 rounded-xl border border-slate-200/80 hover:border-slate-300 transition-colors">
              <div className="flex items-center gap-1.5 text-emerald-600 mb-1">
                <DollarSign className="w-4 h-4" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">RMNR Garantida</span>
              </div>
              <div className="text-lg sm:text-xl font-bold text-slate-900 font-mono tracking-tight">
                {EDITAL_INFO.remuneracao.rmnrGarantida}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">Básico: {EDITAL_INFO.remuneracao.salarioBasico}</div>
            </div>

            <div className="bg-slate-50/90 p-4 rounded-xl border border-slate-200/80 hover:border-slate-300 transition-colors">
              <div className="flex items-center gap-1.5 text-blue-600 mb-1">
                <Calendar className="w-4 h-4" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Data da Prova</span>
              </div>
              <div className="text-lg sm:text-xl font-bold text-slate-900 font-mono tracking-tight">
                29/11/2026
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">Domingo · 4h de duração</div>
            </div>

            <div className="bg-slate-50/90 p-4 rounded-xl border border-slate-200/80 hover:border-slate-300 transition-colors">
              <div className="flex items-center gap-1.5 text-amber-600 mb-1">
                <Users className="w-4 h-4" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Vagas Ênfase 1</span>
              </div>
              <div className="text-lg sm:text-xl font-bold text-slate-900 font-mono tracking-tight">
                75 Vagas
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">5 Imediatas + 70 CR (RJ, SP, Sul)</div>
            </div>

            <div className="bg-slate-50/90 p-4 rounded-xl border border-slate-200/80 hover:border-slate-300 transition-colors">
              <div className="flex items-center gap-1.5 text-purple-600 mb-1">
                <Building2 className="w-4 h-4" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Banca Examinadora</span>
              </div>
              <div className="text-base sm:text-lg font-bold text-slate-900 truncate">
                {EDITAL_INFO.banca}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">Taxa de R$ 81,50</div>
            </div>
          </div>
        </div>
      </div>

      {/* Regra do Jogo (A Conclusão Pareto mais Crítica) */}
      <div className="bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/30 rounded-2xl p-5 sm:p-6 relative shadow-xs">
        <div className="flex items-start gap-3.5">
          <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                A Regra de Ouro do Edital (Item 7.1.2 "d" c/c 7.1.4.2.1)
              </h3>
              <span className="bg-amber-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                Crítico
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              O corte de habilitação para a próxima fase convoca apenas os candidatos ranqueados até <strong>2× (Vagas + Cadastro de Reserva)</strong> por polo. 
              Esse ranking utiliza <strong>EXCLUSIVAMENTE A NOTA DA PROVA DE CONHECIMENTOS ESPECÍFICOS (40 questões)</strong>.
            </p>
            <div className="bg-white/95 p-3.5 rounded-xl border border-amber-200/80 text-xs text-slate-800 space-y-1 font-medium shadow-xs">
              <p className="text-amber-900 font-bold">
                🎯 Conclusão Prática para a sua Estratégia de Estudos:
              </p>
              <p>
                • <strong>Conhecimentos Específicos</strong> responde por <strong>100% do seu poder de ranqueamento e classificação</strong> para a habilitação.
              </p>
              <p>
                • As matérias gerais (Português e Matemática) são apenas um <em>pedágio eliminatório</em> de 10/20.
              </p>
              <p>
                • Por isso, este aplicativo foca <strong>100% nas matérias específicas</strong> (Logística/SCM, Finanças/Contabilidade, Processos Adm/Legislação e Noções de Informática), maximizando os pontos que realmente te colocam dentro das vagas!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Polos & Vagas + Atribuições e Salário */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Polos & Vagas Explorer (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-4 mb-4">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2 tracking-tight">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  Quadro de Vagas por Polo (Ênfase 1)
                </h3>
                <p className="text-xs text-slate-500">
                  Consulte as vagas imediatas, CR e localidades de cada polo de trabalho
                </p>
              </div>
            </div>

            {/* Polo Selector Tabs */}
            <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100/80 rounded-xl mb-4 border border-slate-200/50">
              {POLOS_VAGAS_ENFASE_1.map((p) => (
                <button
                  key={p.polo}
                  id={`btn-polo-${p.polo.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => setSelectedPolo(p.polo)}
                  className={`py-1.5 px-2.5 rounded-lg text-xs font-semibold transition-all ${
                    selectedPolo === p.polo
                      ? 'bg-white text-emerald-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Polo {p.polo}
                </button>
              ))}
            </div>

            {/* Selected Polo Stats Card */}
            <div className="bg-slate-50/80 rounded-xl p-4 border border-slate-200/80">
              <div className="flex items-center justify-between border-b border-slate-200/70 pb-3 mb-3">
                <div>
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Polo Selecionado</span>
                  <div className="text-base sm:text-lg font-bold text-slate-900">{currentPoloData.polo}</div>
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider">Total Oportunidades</span>
                  <div className="text-lg sm:text-xl font-bold text-emerald-700 font-mono">
                    {currentPoloData.totalVagasMaisCR} vagas
                  </div>
                  <span className="text-[10px] text-slate-400">
                    Corte Habilitação: até {currentPoloData.totalVagasMaisCR * 2}º lugar
                  </span>
                </div>
              </div>

              {/* Table of Quotas */}
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="border-b border-slate-200/80 text-slate-500">
                      <th className="py-2 font-semibold">Modalidade</th>
                      <th className="py-2 font-semibold text-center">Imediatas</th>
                      <th className="py-2 font-semibold text-center">Cadastro Reserva</th>
                      <th className="py-2 font-semibold text-right font-bold text-slate-900">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200/50 text-slate-700">
                    <tr className="hover:bg-white/60 transition-colors">
                      <td className="py-2 font-medium">Ampla Concorrência (AC)</td>
                      <td className="py-2 text-center font-mono">{currentPoloData.imediataAC}</td>
                      <td className="py-2 text-center font-mono">{currentPoloData.crAC}</td>
                      <td className="py-2 text-right font-bold font-mono text-slate-900">{currentPoloData.imediataAC + currentPoloData.crAC}</td>
                    </tr>
                    <tr className="hover:bg-white/60 transition-colors">
                      <td className="py-2 font-medium">Pessoas Negras (PN - 25%)</td>
                      <td className="py-2 text-center font-mono">{currentPoloData.imediataPN}</td>
                      <td className="py-2 text-center font-mono">{currentPoloData.crPN}</td>
                      <td className="py-2 text-right font-bold font-mono text-slate-900">{currentPoloData.imediataPN + currentPoloData.crPN}</td>
                    </tr>
                    <tr className="hover:bg-white/60 transition-colors">
                      <td className="py-2 font-medium">Pessoas com Deficiência (PcD - 10%)</td>
                      <td className="py-2 text-center font-mono">{currentPoloData.imediataPCD}</td>
                      <td className="py-2 text-center font-mono">{currentPoloData.crPCD}</td>
                      <td className="py-2 text-right font-bold font-mono text-slate-900">{currentPoloData.imediataPCD + currentPoloData.crPCD}</td>
                    </tr>
                    <tr className="hover:bg-white/60 transition-colors">
                      <td className="py-2 font-medium">Pessoas Indígenas (PI - 3%)</td>
                      <td className="py-2 text-center font-mono">{currentPoloData.imediataPI}</td>
                      <td className="py-2 text-center font-mono">{currentPoloData.crPI}</td>
                      <td className="py-2 text-right font-bold font-mono text-slate-900">{currentPoloData.imediataPI + currentPoloData.crPI}</td>
                    </tr>
                    <tr className="hover:bg-white/60 transition-colors">
                      <td className="py-2 font-medium">Pessoas Quilombolas (PQ - 2%)</td>
                      <td className="py-2 text-center font-mono">{currentPoloData.imediataPQ}</td>
                      <td className="py-2 text-center font-mono">{currentPoloData.crPQ}</td>
                      <td className="py-2 text-right font-bold font-mono text-slate-900">{currentPoloData.imediataPQ + currentPoloData.crPQ}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Localidades do Polo */}
              <div className="mt-4 pt-3 border-t border-slate-200/70">
                <div className="text-[11px] font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">
                  Unidades e Localidades Abrangidas neste Polo:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {currentPoloData.cidadesPolo.map((cidade) => (
                    <span key={cidade} className="px-2 py-0.5 bg-white rounded-md text-[11px] border border-slate-200 text-slate-700">
                      {cidade}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cargo, Atribuições & Requisitos (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Card Atribuições */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-xs">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2 mb-2 tracking-tight">
              <FileCheck className="w-4 h-4 text-blue-600" />
              Atribuições da Ênfase 1
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed bg-blue-50/50 p-3 rounded-xl border border-blue-100 font-medium">
              "{EDITAL_INFO.atribuicoes}"
            </p>
            <div className="mt-3.5 space-y-2 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>Escolaridade:</strong> Nível Médio regular completo (sem técnico).</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>Regime Jurídico:</strong> CLT com Plano de Cargos e Remuneração (PCR).</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>Jornada:</strong> 40 horas semanais em regime administrativo ou operacional.</span>
              </div>
            </div>
          </div>

          {/* Benefícios */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-2 tracking-tight">
              <Award className="w-4 h-4 text-amber-500" />
              Vantagens & Benefícios Petrobras
            </h3>
            <ul className="space-y-1.5 text-xs text-slate-600">
              {EDITAL_INFO.remuneracao.beneficios.map((b, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Cronograma Oficial Timeline */}
      <div className="bg-white rounded-2xl p-5 sm:p-7 border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2 tracking-tight">
              <Clock className="w-4 h-4 text-emerald-600" />
              Cronograma Oficial Completo (Anexo V)
            </h3>
            <p className="text-xs text-slate-500">
              Acompanhe todas as datas de inscrições, provas, gabaritos e convocações
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {CRONOGRAMA_OFICIAL.map((item, idx) => (
            <div 
              key={idx}
              className={`p-3.5 rounded-xl border transition-all ${
                item.destaque 
                  ? 'bg-emerald-50/60 border-emerald-300 ring-1 ring-emerald-400/20'
                  : 'bg-slate-50/70 border-slate-200/80 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-mono font-bold text-emerald-800 bg-emerald-100/90 px-2 py-0.5 rounded text-[11px]">
                  {item.data}
                </span>
                <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${
                  item.status === 'concluido' ? 'bg-slate-200 text-slate-600' :
                  item.status === 'vigente' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {item.status}
                </span>
              </div>
              <div className="text-xs font-semibold text-slate-900 mt-1">
                {item.evento}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cidades de Aplicação de Prova */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2 tracking-tight">
              <MapPin className="w-4 h-4 text-slate-700" />
              Cidades Onde a Prova Será Aplicada (29 Cidades - Anexo II)
            </h3>
            <p className="text-xs text-slate-500">
              Você pode realizar a prova em qualquer uma dessas cidades, independente do polo escolhido
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Buscar sua cidade..."
              value={citySearch}
              onChange={(e) => setCitySearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto p-1">
          {filteredCities.map((cidade) => (
            <span 
              key={cidade}
              className="px-2.5 py-1 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-700 rounded-lg text-xs border border-slate-200/70 transition-colors"
            >
              {cidade}
            </span>
          ))}
          {filteredCities.length === 0 && (
            <div className="text-xs text-slate-400 italic py-2">
              Nenhuma cidade encontrada com "{citySearch}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
