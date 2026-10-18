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
  X,
  Truck,
  DollarSign,
  FileCheck,
  Laptop,
  PenTool,
  Hash,
  ChevronRight,
  ShieldAlert,
  ArrowRight
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

export interface DisciplinaCorrelation {
  id: string;
  nome: string;
  nomeCurto: string;
  filtroKey: string;
  categoria: 'Conhecimentos Gerais (Pedágio)' | 'Conhecimentos Específicos';
  questoesInfo: string;
  relevancia: string;
  colorTheme: {
    bg: string;
    border: string;
    badgeBg: string;
    badgeText: string;
    iconColor: string;
  };
  subtopicosFrequentes: string[];
}

export const CORRELACOES_DISCIPLINAS: DisciplinaCorrelation[] = [
  {
    id: 'portugues',
    nome: 'Língua Portuguesa',
    nomeCurto: 'Português',
    filtroKey: 'Português',
    categoria: 'Conhecimentos Gerais (Pedágio)',
    questoesInfo: '10 questões · Pedágio eliminatório (proibido zerar)',
    relevancia: 'Fase 2 (Pedágio Eliminatório)',
    colorTheme: {
      bg: 'bg-blue-50/50',
      border: 'border-blue-200',
      badgeBg: 'bg-blue-100',
      badgeText: 'text-blue-800',
      iconColor: 'text-blue-600'
    },
    subtopicosFrequentes: [
      'Crase — Casos Proibitivos, Obrigatórios e Diante de Pronomes',
      'Concordância Verbal com Partícula Apassivadora "SE" (VTD vs VTI)',
      'Regência Verbal e Nominal (visar, assistir, implicar, aspirar)',
      'Pontuação — Emprego da Vírgula em Orações Subordinadas e Aposto/Vocativo',
      'Conjunções Coordenativas e Subordinativas (Coesão e Sentido)',
      'Colocação Pronominal — Próclise Obrigatória e Ênclise no Início de Oração',
      'Interpretação e Tipologia Textual Cesgranrio'
    ]
  },
  {
    id: 'matematica',
    nome: 'Matemática',
    nomeCurto: 'Matemática',
    filtroKey: 'Matemática',
    categoria: 'Conhecimentos Gerais (Pedágio)',
    questoesInfo: '10 questões · Pedágio eliminatório (proibido zerar)',
    relevancia: 'Fase 2 (Pedágio Eliminatório)',
    colorTheme: {
      bg: 'bg-indigo-50/50',
      border: 'border-indigo-200',
      badgeBg: 'bg-indigo-100',
      badgeText: 'text-indigo-800',
      iconColor: 'text-indigo-600'
    },
    subtopicosFrequentes: [
      'Porcentagem e Variações Percentuais Sucessivas (Fator Multiplicador)',
      'Regra de Três Composta e Grandezas Inversamente Proporcionais',
      'Razão, Proporção e Divisão em Partes Diretamente/Inversamente Proporcionais',
      'Princípio Fundamental da Contagem e Combinações Simples',
      'Probabilidade em Eventos Sucessivos e Espaço Amostral',
      'Médias Aritméticas (Simples e Ponderada) e Noções de Estatística Básica',
      'Equações do 1º e 2º Graus e Problemas com Sistemas Lineares'
    ]
  },
  {
    id: 'logistica',
    nome: 'Logística / Compras',
    nomeCurto: 'Logística & Compras',
    filtroKey: 'Logística',
    categoria: 'Conhecimentos Específicos',
    questoesInfo: '14 a 16 questões · Maior peso no corte',
    relevancia: 'Fase 1 (Classificação)',
    colorTheme: {
      bg: 'bg-emerald-50/50',
      border: 'border-emerald-200',
      badgeBg: 'bg-emerald-100',
      badgeText: 'text-emerald-800',
      iconColor: 'text-emerald-600'
    },
    subtopicosFrequentes: [
      'Lei 14.133/2021 — Pregão e Contratação Direta (Dispensa/Inexigibilidade)',
      'Lei 13.303/2016 — Licitações em Estatais e Sanções Administrativas',
      'Fiscalização Técnica vs Administrativa de Contratos',
      'Curva ABC e Ponto de Pedido (Estoque de Segurança)',
      'Modais de Transporte, Intermodalidade e Cabotagem',
      'Custos de Armazenagem e Lote Econômico de Compra (LEC)'
    ]
  },
  {
    id: 'financas',
    nome: 'Finanças e Contabilidade',
    nomeCurto: 'Finanças & Contabilidade',
    filtroKey: 'Finanças',
    categoria: 'Conhecimentos Específicos',
    questoesInfo: '10 a 12 questões · Fórmulas exatas',
    relevancia: 'Fase 1 (Classificação)',
    colorTheme: {
      bg: 'bg-amber-50/50',
      border: 'border-amber-200',
      badgeBg: 'bg-amber-100',
      badgeText: 'text-amber-800',
      iconColor: 'text-amber-600'
    },
    subtopicosFrequentes: [
      'Desconto Simples Comercial (Por Fora) vs Racional (Por Dentro)',
      'Juros Compostos e Equivalência de Taxas',
      'Balanço Patrimonial por Liquidez e Exigibilidade',
      'DFC: Fluxos Operacionais, Investimento e Financiamento (CPC 03)',
      'DRE e Apuração do Lucro Líquido (Lei 6.404/76)',
      'Índices de Liquidez (Corrente, Seca, Imediata e Geral)'
    ]
  },
  {
    id: 'processos',
    nome: 'Processos Administrativos',
    nomeCurto: 'Processos Adm. & SGI',
    filtroKey: 'Processos',
    categoria: 'Conhecimentos Específicos',
    questoesInfo: '10 a 12 questões · Governança e Operação',
    relevancia: 'Fase 1 (Classificação)',
    colorTheme: {
      bg: 'bg-purple-50/50',
      border: 'border-purple-200',
      badgeBg: 'bg-purple-100',
      badgeText: 'text-purple-800',
      iconColor: 'text-purple-600'
    },
    subtopicosFrequentes: [
      'SGI: ISO 9001 (Qualidade), ISO 14001 (Meio Ambiente) e ISO 45001 (SST)',
      'Auditorias de 1ª, 2ª e 3ª Parte e Ação Corretiva vs Correção',
      'Modelo de Competências CHA e Recrutamento Interno/Externo',
      'Avaliação de Desempenho 360º e Vieses (Efeito Halo/Horn)',
      'Manutenção Preventiva, Preditiva e Corretiva',
      'ESG, Balanced Scorecard (BSC) e Metas SMART'
    ]
  },
  {
    id: 'informatica',
    nome: 'Noções de Informática',
    nomeCurto: 'Informática & Segurança',
    filtroKey: 'Informática',
    categoria: 'Conhecimentos Específicos',
    questoesInfo: '4 a 6 questões · Melhor custo/benefício',
    relevancia: 'Fase 1 (Classificação)',
    colorTheme: {
      bg: 'bg-cyan-50/50',
      border: 'border-cyan-200',
      badgeBg: 'bg-cyan-100',
      badgeText: 'text-cyan-800',
      iconColor: 'text-cyan-600'
    },
    subtopicosFrequentes: [
      'LGPD (Lei 13.709/2018): Dados Pessoais, Sensíveis, Controlador e DPO',
      'Princípios de Segurança CID: Confidencialidade, Integridade e Disponibilidade',
      'Ameaças: Ransomware, Phishing, Spyware e Política de Backup',
      'Microsoft Excel: Fórmulas PROCV, PROCX, SOMASE, SE e Travamento ($)',
      'Navegação Segura, Computação em Nuvem e Redes Corporativas'
    ]
  }
];

const INITIAL_SAMPLE_ERRORS: ErrorEntry[] = [
  // Português (Conhecimentos Gerais - Pedágio Eliminatório)
  {
    id: 'err-port-1',
    data: '20/08/2026',
    disciplina: 'Língua Portuguesa',
    subtopico: 'Crase — Casos Proibitivos e Pronomes',
    enunciadoResumido: 'Cesgranrio cobrava ocorrência de crase nas sentenças: "O gerente dirigiu-se a ela com presteza" e "Vendas a prazo não têm desconto".',
    motivoErro: 'Confundi a regência do verbo dirigir-se (exige preposição A) e esqueci que pronomes pessoais e palavras masculinas não aceitam crase.',
    regraCorreta: 'Crase = preposição "a" + artigo "a". Diante de pronomes pessoais (ela, nós, mim) e de termos masculinos (a prazo, a pé, a bordo), NÃO há crase por ausência de artigo feminino definido.',
    revisado: true
  },
  {
    id: 'err-port-2',
    data: '28/08/2026',
    disciplina: 'Língua Portuguesa',
    subtopico: 'Concordância Verbal — Partícula Apassivadora "SE"',
    enunciadoResumido: 'Questão solicitava a identificação da frase correta quanto à norma culta: "Aluga-se salas" ou "Alugam-se salas".',
    motivoErro: 'Tratei "salas" como objeto direto e mantive o verbo no singular por achar que o sujeito era indeterminado.',
    regraCorreta: 'Com Verbo Transitivo Direto (VTD) acompanhado do pronome SE, temos Voz Passiva Sintética. O termo paciente ("salas") é o SUJEITO e o verbo concorda no plural: "Alugam-se salas". O SE só é índice de indeterminação do sujeito com VTI, VI ou VL (onde o verbo fica no singular: "Precisa-se de técnicos").',
    revisado: false
  },
  // Matemática (Conhecimentos Gerais - Pedágio Eliminatório)
  {
    id: 'err-mat-1',
    data: '22/08/2026',
    disciplina: 'Matemática',
    subtopico: 'Porcentagem — Aumentos e Descontos Sucessivos',
    enunciadoResumido: 'Cesgranrio pedia o impacto percentual final após um aumento de 20% seguido imediatamente de um desconto de 20%.',
    motivoErro: 'Subtraí algebricamente 20% - 20% = 0%, supondo que o preço retornaria ao valor inicial.',
    regraCorreta: 'Variações sucessivas incidem em efeito cascata sobre a base atualizada. Fator resultante: 1,20 × 0,80 = 0,96, representando uma REDUÇÃO REAL de 4% em relação ao preço inicial. Nunca se somam variações percentuais sucessivas.',
    revisado: true
  },
  {
    id: 'err-mat-2',
    data: '02/09/2026',
    disciplina: 'Matemática',
    subtopico: 'Regra de Três Composta — Grandezas Inversamente Proporcionais',
    enunciadoResumido: 'Problema clássico da Cesgranrio: 6 operadores descarregam um duto em 10 dias operando 8h/dia. Quantos dias levariam 8 operadores operando 6h/dia?',
    motivoErro: 'Montei as frações como proporcionais diretas sem inverter as grandezas inversas de operadores e horas.',
    regraCorreta: 'Mais operadores = MENOS dias (inversa: 8/6 vira 6/8). Menos horas/dia = MAIS dias (inversa: 6/8 vira 8/6). Dias = 10 × (6/8) × (8/6) = 10 dias. Em regra de três composta, analise cada grandeza isoladamente com a coluna da incógnita.',
    revisado: false
  },
  // Conhecimentos Específicos
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
  },
  {
    id: 'err-5',
    data: '15/10/2026',
    disciplina: 'Noções de Informática',
    subtopico: 'LGPD — Dados Pessoais Sensíveis vs Comuns',
    enunciadoResumido: 'Cesgranrio pedia para identificar qual dado era legalmente classificado como sensível pela LGPD.',
    motivoErro: 'Achei que número de CPF e RG fossem dados sensíveis por serem documentos sigilosos.',
    regraCorreta: 'CPF e RG são dados pessoais comuns. São SENSÍVEIS (art. 5º, II da LGPD): origem racial/étnica, convicção religiosa, opinião política, filiação sindical, dado de saúde, genético/biométrico ou vida sexual.',
    revisado: true
  }
];

const normalizeStr = (str: string) => {
  if (!str) return '';
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
};

export const ErrorNotebook: React.FC = () => {
  const [errors, setErrors] = useState<ErrorEntry[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ERROR_NOTEBOOK);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          // Merge newly introduced sample errors (like Português and Matemática) if absent
          const existingIds = new Set(parsed.map(p => p.id));
          const missingSamples = INITIAL_SAMPLE_ERRORS.filter(s => !existingIds.has(s.id));
          if (missingSamples.length > 0 && parsed.every(p => p.id.startsWith('err-'))) {
            return [...parsed, ...missingSamples];
          }
          return parsed;
        }
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
    disciplina: 'Língua Portuguesa',
    subtopico: '',
    enunciadoResumido: '',
    motivoErro: '',
    regraCorreta: ''
  });

  // Simulator State - 40 questões específicas (Classificação)
  const [simAcertosLog, setSimAcertosLog] = useState<number>(12); // de 14
  const [simAcertosFin, setSimAcertosFin] = useState<number>(8);  // de 10
  const [simAcertosProc, setSimAcertosProc] = useState<number>(8); // de 10
  const [simAcertosInf, setSimAcertosInf] = useState<number>(5);  // de 6

  // Simulator State - 20 questões gerais (Pedágio Eliminatório)
  const [simAcertosPort, setSimAcertosPort] = useState<number>(8); // de 10
  const [simAcertosMat, setSimAcertosMat] = useState<number>(7);   // de 10

  const totalSimEspec = simAcertosLog + simAcertosFin + simAcertosProc + simAcertosInf;
  const totalSimEspecPct = Math.round((totalSimEspec / 40) * 100);

  const totalSimGerais = simAcertosPort + simAcertosMat;
  const totalSimGeraisPct = Math.round((totalSimGerais / 20) * 100);
  const isGeraisEliminado = totalSimGerais < 10 || simAcertosPort === 0 || simAcertosMat === 0;

  const totalProva = totalSimEspec + totalSimGerais;
  const totalProvaPct = Math.round((totalProva / 60) * 100);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ERROR_NOTEBOOK, JSON.stringify(errors));
    } catch (e) {
      console.error('Error saving error notebook', e);
    }
  }, [errors]);

  // Listen to external data restore (from JSON backup import only)
  useEffect(() => {
    const handleStorageRestore = () => {
      try {
        const saved = localStorage.getItem(STORAGE_KEYS.ERROR_NOTEBOOK);
        if (saved) {
          setErrors(JSON.parse(saved));
        }
      } catch (e) {
        // ignore
      }
    };
    window.addEventListener('transpetro_data_restored', handleStorageRestore);
    return () => window.removeEventListener('transpetro_data_restored', handleStorageRestore);
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
      disciplina: formData.disciplina,
      subtopico: '',
      enunciadoResumido: '',
      motivoErro: '',
      regraCorreta: ''
    });
    setShowAddModal(false);
    setSaveToast('Novo erro gravado com sucesso no Caderno & Backup!');
    setTimeout(() => setSaveToast(null), 3000);
  };

  const handleOpenAddForDiscipline = (disciplinaNome: string, subtopicoInicial = '') => {
    setFormData({
      disciplina: disciplinaNome,
      subtopico: subtopicoInicial,
      enunciadoResumido: '',
      motivoErro: '',
      regraCorreta: ''
    });
    setShowAddModal(true);
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
    setErrors(prev => prev.filter(err => err.id !== id));
    setSaveToast('Registro de erro removido com sucesso!');
    setTimeout(() => setSaveToast(null), 3000);
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
    const normDisc = normalizeStr(err.disciplina);
    const normFilter = normalizeStr(filterDisc);
    const matchesDisc = filterDisc === 'todas' || normDisc.includes(normFilter);

    const normSearch = normalizeStr(searchTerm);
    const matchesSearch = searchTerm === '' ||
      normalizeStr(err.subtopico).includes(normSearch) ||
      normalizeStr(err.motivoErro).includes(normSearch) ||
      normalizeStr(err.regraCorreta).includes(normSearch) ||
      normDisc.includes(normSearch);

    return matchesDisc && matchesSearch;
  });

  const getDisciplineBadge = (disc: string) => {
    const norm = normalizeStr(disc);
    if (norm.includes('portug')) {
      return { bg: 'bg-blue-100 text-blue-900 border-blue-200', label: 'Português' };
    }
    if (norm.includes('matemat')) {
      return { bg: 'bg-indigo-100 text-indigo-900 border-indigo-200', label: 'Matemática' };
    }
    if (norm.includes('logist')) {
      return { bg: 'bg-emerald-100 text-emerald-900 border-emerald-200', label: 'Logística' };
    }
    if (norm.includes('finan')) {
      return { bg: 'bg-amber-100 text-amber-900 border-amber-200', label: 'Finanças' };
    }
    if (norm.includes('proc')) {
      return { bg: 'bg-purple-100 text-purple-900 border-purple-200', label: 'Processos' };
    }
    if (norm.includes('inform')) {
      return { bg: 'bg-cyan-100 text-cyan-900 border-cyan-200', label: 'Informática' };
    }
    return { bg: 'bg-slate-100 text-slate-800 border-slate-200', label: disc };
  };

  const currentFormCorrelations = CORRELACOES_DISCIPLINAS.find(c => 
    normalizeStr(c.nome) === normalizeStr(formData.disciplina) ||
    normalizeStr(formData.disciplina).includes(normalizeStr(c.filtroKey))
  )?.subtopicosFrequentes || [];

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
                Registro de Erros & Aprendizado Ativo (Todas as 6 Disciplinas)
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
              Caderno de Erros Digital & Simulador
            </h2>
            <p className="text-slate-600 mt-1 text-xs sm:text-sm max-w-3xl leading-relaxed">
              <strong>Regra Inegociável de Pareto:</strong> Você nunca só lê. Todo dia termina com questões e todo erro vai para o caderno de erros (uma linha: enunciado resumido + por que errei + regra correta). Agora com cadernos dedicados para <strong>Língua Portuguesa</strong> e <strong>Matemática</strong> e suas correlações com a Cesgranrio.
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

      {/* Grid de Cadernos de Erros por Disciplina & Suas Correlações */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-emerald-600" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 font-mono">
              Cadernos de Erros por Matéria & Correlações Cesgranrio
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            Clique em uma matéria para filtrar ou em um subtópico para registrar
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {CORRELACOES_DISCIPLINAS.map((disc) => {
            const countErros = errors.filter(e => normalizeStr(e.disciplina).includes(normalizeStr(disc.filtroKey))).length;
            const countRevisados = errors.filter(e => normalizeStr(e.disciplina).includes(normalizeStr(disc.filtroKey)) && e.revisado).length;
            const isAtivo = normalizeStr(filterDisc).includes(normalizeStr(disc.filtroKey));

            return (
              <div 
                key={disc.id}
                className={`bg-white rounded-2xl p-4 sm:p-5 border transition-all shadow-xs flex flex-col justify-between ${
                  isAtivo ? 'ring-2 ring-emerald-500 border-emerald-300' : 'border-slate-200/80 hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2.5">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase font-mono ${disc.colorTheme.badgeBg} ${disc.colorTheme.badgeText}`}>
                        {disc.categoria}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      {countErros} {countErros === 1 ? 'erro' : 'erros'} ({countRevisados} rev.)
                    </span>
                  </div>

                  <h4 className="text-sm sm:text-base font-extrabold text-slate-900 mb-1">
                    Caderno de {disc.nomeCurto}
                  </h4>
                  <p className="text-xs text-slate-500 mb-3 font-medium">
                    {disc.questoesInfo}
                  </p>

                  {/* Subtópicos & Correlações Frequentes */}
                  <div className="mb-4">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5 font-mono">
                      Correlações de Prova mais Cobradas:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {disc.subtopicosFrequentes.slice(0, 3).map((sub, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleOpenAddForDiscipline(disc.nome, sub)}
                          className="text-[10px] text-left px-2 py-0.5 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded border border-slate-200/70 transition-colors cursor-pointer truncate max-w-full"
                          title={`Adicionar erro em: ${sub}`}
                        >
                          + {sub.split('—')[0].trim()}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => setFilterDisc(disc.filtroKey)}
                    className={`text-xs px-2.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                      isAtivo 
                        ? 'bg-slate-900 text-white' 
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {isAtivo ? 'Filtrando este Caderno' : 'Ver Erros Registrados'}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleOpenAddForDiscipline(disc.nome)}
                    className="text-xs px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold transition-colors cursor-pointer flex items-center gap-1"
                    title={`Adicionar erro no caderno de ${disc.nomeCurto}`}
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Anotar Erro</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Simulador Completo: Específicos (Classificação) + Conhecimentos Gerais (Pedágio Eliminatório) */}
      <div className="bg-slate-900 text-white rounded-2xl p-5 sm:p-7 border border-slate-800 shadow-xs relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase font-mono">
                <Calculator className="w-4 h-4" /> Simulador Oficial Cesgranrio (60 Questões)
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Sua Projeção de Acertos: Específicos (40) + Pedágio de Gerais (20)
              </h3>
              <p className="text-xs text-slate-300 max-w-xl">
                Português e Matemática compõem o <strong>pedágio eliminatório</strong> de 20 questões (exige mínimo de 10 acertos e é <em>terminantemente proibido zerar</em> qualquer uma delas). A nota de Específicos define o ranking final da Transpetro.
              </p>
            </div>

            {/* Result Widget */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              {/* Específicos Widget */}
              <div className="bg-slate-800/90 p-3.5 rounded-xl border border-slate-700 shadow-xs">
                <div className="text-[10px] font-mono uppercase text-slate-400">Fase 1 · Específicos</div>
                <div className="text-xl font-black text-emerald-400 font-mono">
                  {totalSimEspec} / 40 <span className="text-xs font-normal text-slate-400">({totalSimEspecPct}%)</span>
                </div>
                <div className="text-[10px] text-slate-300">
                  {totalSimEspec >= 32 ? '🟢 Zona de Top Polos' : totalSimEspec >= 24 ? '🟡 Dentro do CR' : '🔴 <50% (Eliminado)'}
                </div>
              </div>

              {/* Gerais (Pedágio) Widget */}
              <div className="bg-slate-800/90 p-3.5 rounded-xl border border-slate-700 shadow-xs">
                <div className="text-[10px] font-mono uppercase text-slate-400">Fase 2 · Pedágio Gerais</div>
                <div className={`text-xl font-black font-mono ${isGeraisEliminado ? 'text-red-400' : 'text-blue-400'}`}>
                  {totalSimGerais} / 20 <span className="text-xs font-normal text-slate-400">({totalSimGeraisPct}%)</span>
                </div>
                <div className={`text-[10px] font-bold ${isGeraisEliminado ? 'text-red-300' : 'text-emerald-300'}`}>
                  {isGeraisEliminado ? '🔴 ELIMINADO NO PEDÁGIO' : '🟢 PEDÁGIO APROVADO'}
                </div>
              </div>

              {/* Total Prova */}
              <div className="bg-emerald-950/60 border border-emerald-500/40 p-3.5 rounded-xl">
                <div className="text-[10px] font-mono uppercase text-emerald-300">Total da Prova</div>
                <div className="text-xl font-black text-white font-mono">
                  {totalProva} / 60 <span className="text-xs font-normal text-emerald-300">({totalProvaPct}%)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sliders Grid: Conhecimentos Gerais (Português & Matemática) */}
          <div className="mt-5 pt-4 border-t border-slate-800">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider font-mono block mb-2">
              1. Conhecimentos Básicos / Gerais (Pedágio Eliminatório · 20 Questões — Proibido Zerar):
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-slate-800/50 p-3.5 rounded-xl border border-slate-700/80">
              <div>
                <div className="flex justify-between font-medium text-slate-200 mb-1">
                  <span>✍️ Língua Portuguesa:</span>
                  <span className={`font-bold font-mono ${simAcertosPort === 0 ? 'text-red-400' : 'text-blue-400'}`}>
                    {simAcertosPort}/10 {simAcertosPort === 0 ? '(Eliminado - Grau Zero)' : ''}
                  </span>
                </div>
                <input 
                  type="range" min="0" max="10" value={simAcertosPort}
                  onChange={(e) => setSimAcertosPort(Number(e.target.value))}
                  className="w-full accent-blue-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between font-medium text-slate-200 mb-1">
                  <span>📐 Matemática:</span>
                  <span className={`font-bold font-mono ${simAcertosMat === 0 ? 'text-red-400' : 'text-indigo-400'}`}>
                    {simAcertosMat}/10 {simAcertosMat === 0 ? '(Eliminado - Grau Zero)' : ''}
                  </span>
                </div>
                <input 
                  type="range" min="0" max="10" value={simAcertosMat}
                  onChange={(e) => setSimAcertosMat(Number(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Sliders Grid: Conhecimentos Específicos (40 Questões) */}
          <div className="mt-4 pt-3 border-t border-slate-800">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider font-mono block mb-2">
              2. Conhecimentos Específicos (Classificação e Habilitação · 40 Questões):
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div>
                <div className="flex justify-between font-medium text-slate-300 mb-1">
                  <span>🚚 Logística / Compras:</span>
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
                  <span>💰 Finanças / Contab:</span>
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
                  <span>📋 Processos Adm / RH:</span>
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
                  <span>💻 Noções Informática:</span>
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
      </div>

      {/* Erros List Toolbar */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs font-bold text-slate-500 mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Filtrar Caderno:
            </span>
            {['todas', 'Português', 'Matemática', 'Logística', 'Finanças', 'Processos', 'Informática'].map((disc) => {
              const isSelected = filterDisc === disc;
              const badgeCount = disc === 'todas'
                ? errors.length
                : errors.filter(e => normalizeStr(e.disciplina).includes(normalizeStr(disc))).length;

              return (
                <button
                  key={disc}
                  id={`btn-filter-disc-${normalizeStr(disc)}`}
                  onClick={() => setFilterDisc(disc)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100/80 text-slate-600 hover:bg-slate-200 border border-slate-200/60'
                  }`}
                >
                  <span>{disc === 'todas' ? 'Todos os Cadernos' : disc}</span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {badgeCount}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Buscar em todos os cadernos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
            />
          </div>
        </div>

        {/* Errors Table */}
        <div className="space-y-3">
          {filteredErrors.map((err) => {
            const discTheme = getDisciplineBadge(err.disciplina);

            return (
              <div 
                key={err.id}
                className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                  err.revisado 
                    ? 'bg-slate-50/60 border-slate-200 opacity-80' 
                    : 'bg-white border-slate-200/80 hover:border-slate-300 shadow-xs'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2.5 mb-2.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      {err.data}
                    </span>
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded border ${discTheme.bg}`}>
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
                      <div className="font-bold text-slate-900 mb-1">Questão / Enunciado Cesgranrio:</div>
                      <p>{err.enunciadoResumido}</p>
                    </div>
                  )}
                  <div className="bg-red-50/70 p-3 rounded-xl text-red-900 border border-red-100 leading-relaxed">
                    <div className="font-bold text-red-950 mb-1">Por que errei? (Causa Raiz):</div>
                    <p>{err.motivoErro}</p>
                  </div>
                  <div className="bg-emerald-50/70 p-3 rounded-xl text-emerald-950 md:col-span-1 border border-emerald-100 leading-relaxed">
                    <div className="font-bold text-emerald-900 mb-1">Regra Correta / Gabarito Definitivo:</div>
                    <p>{err.regraCorreta}</p>
                  </div>
                </div>
              </div>
            );
          })}

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
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-600" />
              Novo Registro no Caderno de Erros
            </h3>

            <form onSubmit={handleAddError} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Caderno / Disciplina:</label>
                <select
                  value={formData.disciplina}
                  onChange={(e) => setFormData({ ...formData, disciplina: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 font-medium"
                >
                  <option value="Língua Portuguesa">Língua Portuguesa (Crase, Concordância, Regência, Pontuação, Sintaxe)</option>
                  <option value="Matemática">Matemática (Porcentagem, Proporção, Regra de Três, Combinatória, Probabilidade)</option>
                  <option value="Logística / Compras">Logística e Gestão de Suprimentos (Lei 13.303/14.133, Estoques)</option>
                  <option value="Finanças e Contabilidade">Finanças e Contabilidade (Mat. Financeira, Balanço, DRE, DFC)</option>
                  <option value="Processos Administrativos">Processos Administrativos e Legislação (RH, SGI, ESG, Manutenção)</option>
                  <option value="Noções de Informática">Noções de Informática (LGPD, Segurança, Excel 2024)</option>
                </select>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block font-bold text-slate-700">Subtópico Exato / Correlação:</label>
                  <span className="text-[10px] text-slate-400">Sugestões frequentes da Cesgranrio abaixo</span>
                </div>
                <input
                  type="text"
                  required
                  placeholder="Ex: Crase — Diante de Pronomes de Tratamento"
                  value={formData.subtopico}
                  onChange={(e) => setFormData({ ...formData, subtopico: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 mb-1.5"
                />

                {/* Correlações Rápidas */}
                {currentFormCorrelations.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {currentFormCorrelations.slice(0, 4).map((top, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setFormData({ ...formData, subtopico: top })}
                        className="text-[10px] px-2 py-0.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded cursor-pointer border border-slate-200/70"
                      >
                        {top.split('—')[0].trim()}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Resumo do Enunciado Cesgranrio (opcional):</label>
                <input
                  type="text"
                  placeholder="Ex: Questão sobre dispensa de licitação ou orações subordinadas..."
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
                  placeholder="Ex: Confundi os limites de dispensa ou achei que pronome pessoal aceitava crase..."
                  value={formData.motivoErro}
                  onChange={(e) => setFormData({ ...formData, motivoErro: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block font-bold text-emerald-700 mb-1">Regra Correta / Macete para não errar na prova:</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Ex: Diante de pronome pessoal não ocorre crase porque não há artigo feminino definido. Troque por palavra masculina com 'ao' para testar..."
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
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold transition-colors cursor-pointer shadow-xs"
                >
                  Salvar Registro no Caderno
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
                <label className="block font-bold text-slate-700 mb-1">Caderno / Disciplina:</label>
                <select
                  value={editingError.disciplina}
                  onChange={(e) => setEditingError({ ...editingError, disciplina: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 font-medium"
                >
                  <option value="Língua Portuguesa">Língua Portuguesa (Crase, Concordância, Regência, Pontuação, Sintaxe)</option>
                  <option value="Matemática">Matemática (Porcentagem, Proporção, Regra de Três, Combinatória, Probabilidade)</option>
                  <option value="Logística / Compras">Logística e Gestão de Suprimentos</option>
                  <option value="Finanças e Contabilidade">Finanças e Contabilidade</option>
                  <option value="Processos Administrativos">Processos Administrativos e Legislação</option>
                  <option value="Noções de Informática">Noções de Informática</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Subtópico Exato / Correlação:</label>
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
