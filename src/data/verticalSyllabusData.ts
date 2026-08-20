export type PrioridadeNivel = 'ALTA' | 'MEDIA' | 'BAIXA' | 'CORTE';

export type MacroDivisaoId = 'processos_adm' | 'financas' | 'logistica' | 'informatica';

export interface MacroDivisaoInfo {
  id: MacroDivisaoId;
  numero: number;
  nome: string;
  nomeCurto: string;
  subtitulo: string;
  questoesEstimadas: string;
  pesoParetoGeral: string;
  icone: string; // 'FileCheck' | 'DollarSign' | 'Truck' | 'Laptop'
  descricao: string;
  focoPrincipal: string[];
  destaqueLegislacao?: string;
}

export const MACRO_DIVISOES: MacroDivisaoInfo[] = [
  {
    id: 'processos_adm',
    numero: 1,
    nome: 'Processos Administrativos e Legislação',
    nomeCurto: 'Processos Adm. & Legislação',
    subtitulo: 'Recursos Humanos, Sistema de Gestão Integrado (SGI), Patrimônio, Manutenção e Indicadores ESG',
    questoesEstimadas: '10 a 12 questões na prova',
    pesoParetoGeral: '25% do total da prova',
    icone: 'FileCheck',
    descricao: 'Tópicos essenciais sobre a governança e operação diária: Modelo CHA, Avaliação 360º, normas do SGI (ISO 9001/14001/45001), auditorias de 1ª/2ª/3ª parte, Balanced Scorecard, metas SMART, práticas ESG, tombamento e manutenção.',
    focoPrincipal: [
      'Modelo de Competências CHA e Recrutamento Interno/Externo',
      'Avaliação de Desempenho (360º) e Efeito Halo/Horn',
      'SGI: ISO 9001, ISO 14001 e ISO 45001 (Ciclo PDCA)',
      'Auditorias de 1ª, 2ª e 3ª Parte e Ação Corretiva vs Correção',
      'Indicadores (Eficiência, Eficácia, Efetividade) e ESG'
    ],
    destaqueLegislacao: 'Normas ISO 9001/14001/45001 & ESG'
  },
  {
    id: 'financas',
    numero: 2,
    nome: 'Finanças e Contabilidade',
    nomeCurto: 'Finanças & Contabilidade',
    subtitulo: 'Matemática Financeira, Registros Contábeis, Fluxo de Caixa (DFC) e Balanço Patrimonial / DRE',
    questoesEstimadas: '10 a 12 questões na prova',
    pesoParetoGeral: '27,5% do total da prova',
    icone: 'DollarSign',
    descricao: 'Área com alto índice de repetição e fórmulas exatas na Cesgranrio. O domínio de DFC (Métodos Direto x Indireto), estrutura do Balanço/DRE e cálculos de Juros e Descontos garante pontos decisivos.',
    focoPrincipal: [
      'Juros Simples e Compostos e Porcentagem sem calculadora',
      'Desconto Comercial (Por Fora) vs Racional (Por Dentro)',
      'DFC: Fluxos Operacionais, Investimento e Financiamento',
      'Balanço Patrimonial por ordem de Liquidez e Exigibilidade',
      'DRE e Apuração do Lucro Líquido (Lei 6.404/76)'
    ],
    destaqueLegislacao: 'NBC TG 03 / CPC 03 & Lei 6.404/76'
  },
  {
    id: 'logistica',
    numero: 3,
    nome: 'Logística e Gestão da Cadeia de Suprimentos',
    nomeCurto: 'Logística & SCM',
    subtitulo: 'SCM, Modais de Transporte, Gestão de Estoques, Armazenagem, Manuseio, Embalagem, Compras e Contratos',
    questoesEstimadas: '14 a 16 questões na prova',
    pesoParetoGeral: '37,5% do total da prova',
    icone: 'Truck',
    descricao: 'Macroárea central das atribuições da Transpetro. Concentra os tópicos de maior peso da prova: Lei das Estatais (13.303), Nova Lei de Licitações (14.133), Fiscalização de Contratos, Curva ABC e Ponto de Pedido.',
    focoPrincipal: [
      'Lei das Estatais nº 13.303/2016 (arts. 28 a 91)',
      'Nova Lei de Licitações nº 14.133/2021',
      'Fiscalização Técnica vs Administrativa de Contratos',
      'Curva ABC, Estoque de Segurança e Ponto de Pedido (PP)',
      'Modalidades de Transporte e Intermodalidade'
    ],
    destaqueLegislacao: 'Lei 13.303/16 (arts. 28-91) & Lei 14.133/21'
  },
  {
    id: 'informatica',
    numero: 4,
    nome: 'Noções de Informática',
    nomeCurto: 'Informática & Segurança',
    subtitulo: 'Fundamentos de Computação, Microsoft Office 2024, Internet/Intranet, Segurança da Informação e LGPD',
    questoesEstimadas: '4 a 6 questões na prova',
    pesoParetoGeral: '10% do total da prova',
    icone: 'Laptop',
    descricao: 'O melhor custo/benefício do edital: conteúdo enxuto com alto índice de acerto. Prioridade total na LGPD (artigos 5º e 7º), princípios CID, ameaças cibernéticas (Ransomware/Phishing) e fórmulas do Excel (PROCV, PROCX, SOMASE, SE).',
    focoPrincipal: [
      'LGPD nº 13.709/2018: Dado Sensível, Controlador, Operador, DPO',
      'Princípios CID: Confidencialidade, Integridade, Disponibilidade',
      'Ameaças: Ransomware, Phishing, Spyware e Política de Backup',
      'Microsoft Office 2024 (Excel): PROCV, PROCX, SOMASE, SE e Fixação ($)'
    ],
    destaqueLegislacao: 'Lei 13.709/2018 (LGPD)'
  }
];

export interface EditalVerticalItem {
  id: string;
  codigoEdital: string;
  disciplina: string;
  disciplinaMacro: MacroDivisaoId;
  topicoPrincipal: string;
  subtopico: string;
  prioridade: PrioridadeNivel;
  prioridadeLabel: string;
  pesoPareto: number; // 1 to 10
  incidenciaEstimada: string;
  dificuldade: 'Fácil' | 'Média' | 'Difícil';
  artigoOuNorma?: string;
  resumoEstrategico: string;
  palavrasChave: string[];
}

export const EDITAL_VERTICALIZADO_DATA: EditalVerticalItem[] = [
  // =========================================================================
  // 1. PROCESSOS ADMINISTRATIVOS E LEGISLAÇÃO
  // =========================================================================

  // --- Recursos Humanos ---
  {
    id: 'ev-proc-1-1',
    codigoEdital: '1.1',
    disciplina: 'Recursos Humanos',
    disciplinaMacro: 'processos_adm',
    topicoPrincipal: 'Recursos Humanos',
    subtopico: '1.1 Recrutamento e seleção',
    prioridade: 'ALTA',
    prioridadeLabel: '🔥 Alta Prioridade',
    pesoPareto: 9,
    incidenciaEstimada: 'Muito Alta (2 questões)',
    dificuldade: 'Fácil',
    resumoEstrategico: 'Recrutamento Interno (econômico, motiva quadro, mas gera estagnação/conflito) × Externo (sangue novo, renova ideias, mas é mais caro e demorado). Seleção por competências (CHA: Conhecimento, Habilidade, Atitude), testes situacionais e entrevistas.',
    palavrasChave: ['recrutamento interno', 'recrutamento externo', 'CHA', 'seleção por competências', 'fontes de recrutamento']
  },
  {
    id: 'ev-proc-1-2',
    codigoEdital: '1.2',
    disciplina: 'Recursos Humanos',
    disciplinaMacro: 'processos_adm',
    topicoPrincipal: 'Recursos Humanos',
    subtopico: '1.2 Plano de cargos e carreira',
    prioridade: 'MEDIA',
    prioridadeLabel: '⚡ Média Prioridade',
    pesoPareto: 6,
    incidenciaEstimada: 'Média (1 questão)',
    dificuldade: 'Fácil',
    resumoEstrategico: 'Estrutura salarial, descrição e análise de cargos. Progressão funcional (horizontal por mérito/antiguidade) × Promoção (vertical para novo cargo/nível). Carreira em Y: permite ascensão equivalente técnica (especialista) ou gerencial (líder).',
    palavrasChave: ['plano de cargos', 'carreira em Y', 'progressão', 'promoção', 'descrição de cargos']
  },
  {
    id: 'ev-proc-1-3',
    codigoEdital: '1.3',
    disciplina: 'Recursos Humanos',
    disciplinaMacro: 'processos_adm',
    topicoPrincipal: 'Recursos Humanos',
    subtopico: '1.3 Treinamento, desenvolvimento e educação',
    prioridade: 'ALTA',
    prioridadeLabel: '🔥 Alta Prioridade',
    pesoPareto: 8,
    incidenciaEstimada: 'Alta (1-2 questões)',
    dificuldade: 'Fácil',
    resumoEstrategico: 'Diferenciação temporal da Cesgranrio: Treinamento (curto prazo, foco no cargo atual e execução operacional); Desenvolvimento (médio prazo, foco na carreira e competências futuras); Educação (longo prazo, formação integral e cidadania). LNT (Levantamento das Necessidades de Treinamento).',
    palavrasChave: ['T&D&E', 'treinamento', 'desenvolvimento', 'educação corporativa', 'LNT', 'avaliação de reação']
  },
  {
    id: 'ev-proc-1-4',
    codigoEdital: '1.4',
    disciplina: 'Recursos Humanos',
    disciplinaMacro: 'processos_adm',
    topicoPrincipal: 'Recursos Humanos',
    subtopico: '1.4 Gerenciamento de desempenho e gestão de competências',
    prioridade: 'ALTA',
    prioridadeLabel: '🔥 Alta Prioridade',
    pesoPareto: 9,
    incidenciaEstimada: 'Muito Alta (2 questões)',
    dificuldade: 'Fácil',
    resumoEstrategico: 'Métodos de avaliação: 90º (chefe direto), 180º (chefe + autoavaliação), 360º (circular: chefe, pares, subordinados e clientes). Erros de avaliação clássicos da Cesgranrio: Efeito Halo/Horn (generalização de um traço), Leniência (dar notas altas para todos), Tendência Central e Recenticidade.',
    palavrasChave: ['avaliação 360 graus', 'efeito halo', 'efeito horn', 'leniência', 'gestão por competências']
  },
  {
    id: 'ev-proc-1-5',
    codigoEdital: '1.5',
    disciplina: 'Recursos Humanos',
    disciplinaMacro: 'processos_adm',
    topicoPrincipal: 'Recursos Humanos',
    subtopico: '1.5 Relações de trabalho e benefícios',
    prioridade: 'MEDIA',
    prioridadeLabel: '⚡ Média Prioridade',
    pesoPareto: 6,
    incidenciaEstimada: 'Média (1 questão)',
    dificuldade: 'Fácil',
    resumoEstrategico: 'Clima organizacional, negociação coletiva (acordo coletivo vs convenção coletiva), benefícios legais (obrigatórios) vs espontâneos/flexíveis, qualidade de vida no trabalho (QVT) e motivação (Teoria de Herzberg: Fatores Higiênicos vs Motivacionais).',
    palavrasChave: ['relações de trabalho', 'benefícios flexíveis', 'QVT', 'clima organizacional', 'Herzberg']
  },

  // --- Sistema de Gestão Integrado ---
  {
    id: 'ev-proc-2-1',
    codigoEdital: '2.1',
    disciplina: 'Sistema de Gestão Integrado',
    disciplinaMacro: 'processos_adm',
    topicoPrincipal: 'Sistema de Gestão Integrado',
    subtopico: '2.1 Princípios de integração de sistemas de gestão',
    prioridade: 'ALTA',
    prioridadeLabel: '🔥 Alta Prioridade',
    pesoPareto: 9,
    incidenciaEstimada: 'Muito Alta (2 questões)',
    dificuldade: 'Fácil',
    artigoOuNorma: 'ISO 9001, ISO 14001, ISO 45001',
    resumoEstrategico: 'SGI unifica ISO 9001 (Qualidade - foco no cliente), ISO 14001 (Meio Ambiente - aspectos e impactos) e ISO 45001 (Saúde e Segurança Ocupacional - perigos e riscos) sob uma única Política Integrada e a Estrutura de Alto Nível (Anexo SL). Reduz custos e elimina redundâncias operacionais.',
    palavrasChave: ['SGI', 'ISO 9001', 'ISO 14001', 'ISO 45001', 'política integrada', 'anexo SL']
  },
  {
    id: 'ev-proc-2-2',
    codigoEdital: '2.2',
    disciplina: 'Sistema de Gestão Integrado',
    disciplinaMacro: 'processos_adm',
    topicoPrincipal: 'Sistema de Gestão Integrado',
    subtopico: '2.2 Auditorias internas e ações corretivas/preventivas',
    prioridade: 'ALTA',
    prioridadeLabel: '🔥 Alta Prioridade',
    pesoPareto: 8,
    incidenciaEstimada: 'Alta (1-2 questões)',
    dificuldade: 'Fácil',
    resumoEstrategico: 'Auditorias: 1ª parte (interna, pela própria empresa), 2ª parte (externa em fornecedores/clientes), 3ª parte (independente, órgão certificador). Pegadinha clássica: Correção (ação imediata para conter a não conformidade) × Ação Corretiva (elimina a causa-raiz para evitar a repetição).',
    palavrasChave: ['auditoria interna', 'auditoria 1ª 2ª 3ª parte', 'ação corretiva', 'correção', 'não conformidade']
  },
  {
    id: 'ev-proc-2-3',
    codigoEdital: '2.3',
    disciplina: 'Sistema de Gestão Integrado',
    disciplinaMacro: 'processos_adm',
    topicoPrincipal: 'Sistema de Gestão Integrado',
    subtopico: '2.3 Melhoria contínua e gestão de riscos integrada',
    prioridade: 'ALTA',
    prioridadeLabel: '🔥 Alta Prioridade',
    pesoPareto: 8,
    incidenciaEstimada: 'Alta (1 questão)',
    dificuldade: 'Fácil',
    artigoOuNorma: 'ISO 31000 & PDCA',
    resumoEstrategico: 'Ciclo PDCA (Plan: planejar, Do: executar, Check: checar/auditar, Act: agir corretivamente/padronizar). Gestão de riscos integrada conforme ISO 31000: identificação, análise (probabilidade × impacto), avaliação, tratamento (mitigar, transferir, evitar ou aceitar) e monitoramento contínuo.',
    palavrasChave: ['melhoria contínua', 'PDCA', 'gestão de riscos', 'ISO 31000', 'mitigação']
  },

  // --- Função Administração Patrimonial ---
  {
    id: 'ev-proc-3-1',
    codigoEdital: '3.1',
    disciplina: 'Administração Patrimonial',
    disciplinaMacro: 'processos_adm',
    topicoPrincipal: 'Função Administração Patrimonial',
    subtopico: '3.1 Controle e inventário patrimonial',
    prioridade: 'MEDIA',
    prioridadeLabel: '⚡ Média Prioridade',
    pesoPareto: 6,
    incidenciaEstimada: 'Média (1 questão)',
    dificuldade: 'Fácil',
    resumoEstrategico: 'Tombamento (emplacamento e registro individual do bem permanente com número de patrimônio e termo de responsabilidade). Inventário físico: geral, rotativo ou extraordinário. Baixa patrimonial (alienação, sucata, doação, sinistro).',
    palavrasChave: ['tombamento', 'inventário patrimonial', 'termo de responsabilidade', 'baixa patrimonial']
  },
  {
    id: 'ev-proc-3-2',
    codigoEdital: '3.2',
    disciplina: 'Administração Patrimonial',
    disciplinaMacro: 'processos_adm',
    topicoPrincipal: 'Função Administração Patrimonial',
    subtopico: '3.2 Classificação, avaliação e depreciação de bens',
    prioridade: 'MEDIA',
    prioridadeLabel: '⚡ Média Prioridade',
    pesoPareto: 7,
    incidenciaEstimada: 'Média (1 questão)',
    dificuldade: 'Fácil',
    resumoEstrategico: 'Classificação em Bens Móveis × Imóveis e de Consumo × Permanentes. Cálculo da Depreciação Linear: Quota Anual = (Custo de Aquisição - Valor Residual) / Vida Útil. Amortização (intangíveis) e Exaustão (recursos minerais/florestais).',
    palavrasChave: ['depreciação linear', 'valor residual', 'vida útil', 'amortização', 'exaustão', 'bens permanentes']
  },
  {
    id: 'ev-proc-3-3',
    codigoEdital: '3.3',
    disciplina: 'Administração Patrimonial',
    disciplinaMacro: 'processos_adm',
    topicoPrincipal: 'Função Administração Patrimonial',
    subtopico: '3.3 Gestão de ativos',
    prioridade: 'MEDIA',
    prioridadeLabel: '⚡ Média Prioridade',
    pesoPareto: 6,
    incidenciaEstimada: 'Média (1 questão)',
    dificuldade: 'Fácil',
    artigoOuNorma: 'ISO 55000',
    resumoEstrategico: 'Ciclo de vida dos ativos (aquisição, operação, manutenção e alienação/descarte). Maximização do valor do ativo, alinhamento com a estratégia corporativa e conformidade com a norma ISO 55000.',
    palavrasChave: ['gestão de ativos', 'ISO 55000', 'ciclo de vida de ativos', 'custo total de propriedade (TCO)']
  },

  // --- Gestão da manutenção ---
  {
    id: 'ev-proc-4-1',
    codigoEdital: '4.1',
    disciplina: 'Gestão da Manutenção',
    disciplinaMacro: 'processos_adm',
    topicoPrincipal: 'Gestão da manutenção',
    subtopico: '4.1 Manutenções preventiva, corretiva e preditiva',
    prioridade: 'MEDIA',
    prioridadeLabel: '⚡ Média Prioridade',
    pesoPareto: 7,
    incidenciaEstimada: 'Média (1 questão)',
    dificuldade: 'Fácil',
    resumoEstrategico: 'Corretiva: após a quebra (não planejada ou planejada). Preventiva: periódica por tempo ou uso pré-determinado. Preditiva: baseada no monitoramento do estado real por instrumentos (análise de vibração, óleo, termografia). Detectiva: testes em sistemas de proteção.',
    palavrasChave: ['manutenção corretiva', 'manutenção preventiva', 'manutenção preditiva', 'termografia', 'vibração']
  },
  {
    id: 'ev-proc-4-2',
    codigoEdital: '4.2',
    disciplina: 'Gestão da Manutenção',
    disciplinaMacro: 'processos_adm',
    topicoPrincipal: 'Gestão da manutenção',
    subtopico: '4.2 Planejamento e controle da manutenção',
    prioridade: 'MEDIA',
    prioridadeLabel: '⚡ Média Prioridade',
    pesoPareto: 6,
    incidenciaEstimada: 'Média (1 questão)',
    dificuldade: 'Fácil',
    resumoEstrategico: 'PCM (Planejamento e Controle da Manutenção), Ordem de Serviço (OS), Cronograma, Backlog. Indicadores essenciais: MTBF = Tempo Médio Entre Falhas (deve ser alto), MTTR = Tempo Médio para Reparo (deve ser baixo) e Disponibilidade Operacional = MTBF / (MTBF + MTTR).',
    palavrasChave: ['PCM', 'MTBF', 'MTTR', 'disponibilidade operacional', 'backlog', 'ordem de serviço']
  },

  // --- Gestão de Indicadores ---
  {
    id: 'ev-proc-5-1',
    codigoEdital: '5.1',
    disciplina: 'Gestão de Indicadores',
    disciplinaMacro: 'processos_adm',
    topicoPrincipal: 'Gestão de Indicadores',
    subtopico: '5.1 Acompanhamento de indicadores',
    prioridade: 'ALTA',
    prioridadeLabel: '🔥 Alta Prioridade',
    pesoPareto: 8,
    incidenciaEstimada: 'Alta (1-2 questões)',
    dificuldade: 'Fácil',
    resumoEstrategico: 'Conceito dos 3Es: Eficiência (uso ótimo dos recursos/custo-benefício nos processos), Eficácia (alcance da meta/resultado planejado) e Efetividade (impacto real e duradouro na sociedade/organização). Painéis de bordo (Dashboards) e periodicidade de coleta.',
    palavrasChave: ['eficiência', 'eficácia', 'efetividade', '3Es', 'dashboards', 'acompanhamento de indicadores']
  },
  {
    id: 'ev-proc-5-2',
    codigoEdital: '5.2',
    disciplina: 'Gestão de Indicadores',
    disciplinaMacro: 'processos_adm',
    topicoPrincipal: 'Gestão de Indicadores',
    subtopico: '5.2 Análise de indicadores para tomada de decisão',
    prioridade: 'ALTA',
    prioridadeLabel: '🔥 Alta Prioridade',
    pesoPareto: 8,
    incidenciaEstimada: 'Alta (1-2 questões)',
    dificuldade: 'Fácil',
    resumoEstrategico: 'Metodologia SMART (Específica, Mensurável, Atingível, Relevante e Temporal). Balanced Scorecard (BSC): Mapa estratégico com 4 perspectivas equilibradas (Financeira, Clientes, Processos Internos, Aprendizado e Crescimento). Relação de causa e efeito.',
    palavrasChave: ['SMART', 'Balanced Scorecard', 'BSC', 'mapa estratégico', 'tomada de decisão', 'KPI']
  },
  {
    id: 'ev-proc-5-3',
    codigoEdital: '5.3',
    disciplina: 'Gestão de Indicadores',
    disciplinaMacro: 'processos_adm',
    topicoPrincipal: 'Gestão de Indicadores',
    subtopico: '5.3 Indicadores de desempenho ESG',
    prioridade: 'ALTA',
    prioridadeLabel: '🔥 Alta Prioridade (Tema do Momento)',
    pesoPareto: 9,
    incidenciaEstimada: 'Muito Alta (2 questões)',
    dificuldade: 'Fácil',
    resumoEstrategico: 'Tríade ESG / ASG: Environmental (Emissões de carbono, descarbonização na Transpetro, gestão de resíduos, água), Social (Diversidade, inclusão, direitos humanos, segurança do trabalhador) e Governance (Transparência, compliance, ética, anticorrupção, conselho independente). Padrões GRI.',
    palavrasChave: ['ESG', 'ASG', 'sustentabilidade', 'governança', 'GRI', 'pegada de carbono', 'compliance']
  },

  // =========================================================================
  // 2. FINANÇAS E CONTABILIDADE
  // =========================================================================

  // --- Matemática Financeira ---
  {
    id: 'ev-fin-1-1',
    codigoEdital: '1.1',
    disciplina: 'Matemática Financeira',
    disciplinaMacro: 'financas',
    topicoPrincipal: 'Matemática Financeira',
    subtopico: '1.1 Descontos, Juros Simples, Juros Compostos e Porcentagem',
    prioridade: 'ALTA',
    prioridadeLabel: '🔥 Alta Prioridade (Cálculo Decisivo)',
    pesoPareto: 10,
    incidenciaEstimada: 'Muito Alta (3-4 questões)',
    dificuldade: 'Média',
    resumoEstrategico: 'Juros Simples: J = C·i·t e M = C·(1 + i·t). Juros Compostos: M = C·(1 + i)ᵗ. Desconto Comercial/Bancário (Por Fora): Db = N·i·t, Valor Atual Comercial Ab = N·(1 - i·t). Desconto Racional (Por Dentro): Dr = A·i·t, A = N / (1 + i·t). Lembre-se: para os mesmos dados, Db > Dr sempre!',
    palavrasChave: ['juros simples', 'juros compostos', 'desconto comercial', 'desconto racional', 'por fora', 'por dentro', 'porcentagem']
  },

  // --- Registros contábeis ---
  {
    id: 'ev-fin-2-1',
    codigoEdital: '2.1',
    disciplina: 'Registros Contábeis',
    disciplinaMacro: 'financas',
    topicoPrincipal: 'Registros contábeis',
    subtopico: '2.1 Princípios e práticas contábeis fundamentais',
    prioridade: 'MEDIA',
    prioridadeLabel: '⚡ Média Prioridade',
    pesoPareto: 7,
    incidenciaEstimada: 'Média (1-2 questões)',
    dificuldade: 'Fácil',
    artigoOuNorma: 'NBC TG Estrutura Conceitual',
    resumoEstrategico: 'Princípios fundamentais: Entidade (autonomia do patrimônio da empresa vs sócios), Continuidade, Oportunidade, Prudência. Método das Partidas Dobradas: todo débito possui um crédito de igual valor. Débito aumenta Ativo/Despesas; Crédito aumenta Passivo/PL/Receitas. Regime de Competência.',
    palavrasChave: ['partidas dobradas', 'débito', 'crédito', 'regime de competência', 'princípio da entidade', 'continuidade']
  },
  {
    id: 'ev-fin-2-2',
    codigoEdital: '2.2',
    disciplina: 'Registros Contábeis',
    disciplinaMacro: 'financas',
    topicoPrincipal: 'Registros contábeis',
    subtopico: '2.2 Obrigações acessórias e controle fiscal',
    prioridade: 'MEDIA',
    prioridadeLabel: '⚡ Média Prioridade',
    pesoPareto: 6,
    incidenciaEstimada: 'Média (1 questão)',
    dificuldade: 'Fácil',
    resumoEstrategico: 'Obrigação principal (pagar o tributo) × Obrigação acessória (fazer ou deixar de fazer no interesse da fiscalização: emitir nota fiscal, SPED, DCTF, EFD). Retenções tributárias na fonte em contratos com estatais (IRRF, PIS, COFINS, CSLL e ISS).',
    palavrasChave: ['obrigação acessória', 'obrigação principal', 'SPED', 'retenção na fonte', 'controle fiscal']
  },

  // --- Fluxo de caixa ---
  {
    id: 'ev-fin-3-1',
    codigoEdital: '3.1',
    disciplina: 'Fluxo de Caixa',
    disciplinaMacro: 'financas',
    topicoPrincipal: 'Fluxo de caixa',
    subtopico: '3.1 Conceitos e tipos de fluxo de caixa',
    prioridade: 'ALTA',
    prioridadeLabel: '🔥 Alta Prioridade',
    pesoPareto: 8,
    incidenciaEstimada: 'Alta (1 questão)',
    dificuldade: 'Fácil',
    resumoEstrategico: 'Conceito de liquidez e solvência. Fluxo de caixa projetado/orçado (previsão) × realizado. Fluxo de caixa livre para a empresa e para o acionista. Importância do caixa no equilíbrio operacional.',
    palavrasChave: ['fluxo de caixa', 'liquidez', 'solvência', 'caixa livre', 'entradas e saídas']
  },
  {
    id: 'ev-fin-3-2',
    codigoEdital: '3.2',
    disciplina: 'Fluxo de Caixa',
    disciplinaMacro: 'financas',
    topicoPrincipal: 'Fluxo de caixa',
    subtopico: '3.2 Elaboração e análise do fluxo de caixa direto e indireto',
    prioridade: 'ALTA',
    prioridadeLabel: '🔥 Alta Prioridade (Certeza na Prova)',
    pesoPareto: 10,
    incidenciaEstimada: 'Muito Alta (2 questões)',
    dificuldade: 'Média',
    artigoOuNorma: 'NBC TG 03 / CPC 03',
    resumoEstrategico: 'DFC nas 3 Atividades: 1) Operacionais (ligadas à atividade principal: recebimento de clientes, pagamento a fornecedores/salários); 2) Investimento (aquisição e venda de imobilizado/intangível); 3) Financiamento (empréstimos, debêntures, aumento de capital, pagamento de dividendos). Método Direto (entradas e saídas brutas) × Indireto (Lucro Líquido ajustado por depreciação e variações de capital de giro).',
    palavrasChave: ['DFC', 'método direto', 'método indireto', 'atividades operacionais', 'investimento', 'financiamento', 'depreciação']
  },
  {
    id: 'ev-fin-3-3',
    codigoEdital: '3.3',
    disciplina: 'Fluxo de Caixa',
    disciplinaMacro: 'financas',
    topicoPrincipal: 'Fluxo de caixa',
    subtopico: '3.3 Gestão de entradas e saídas',
    prioridade: 'ALTA',
    prioridadeLabel: '🔥 Alta Prioridade',
    pesoPareto: 8,
    incidenciaEstimada: 'Alta (1 questão)',
    dificuldade: 'Fácil',
    resumoEstrategico: 'Gestão de contas a pagar e a receber. Prazos médios: PME (Prazo Médio de Estocagem), PMR (Prazo Médio de Recebimento de Clientes), PMP (Prazo Médio de Pagamento a Fornecedores). Ciclo Operacional = PME + PMR. Ciclo Financeiro/Caixa = Ciclo Operacional - PMP.',
    palavrasChave: ['ciclo financeiro', 'ciclo operacional', 'PMR', 'PMP', 'PME', 'capital de giro']
  },
  {
    id: 'ev-fin-3-4',
    codigoEdital: '3.4',
    disciplina: 'Fluxo de Caixa',
    disciplinaMacro: 'financas',
    topicoPrincipal: 'Fluxo de caixa',
    subtopico: '3.4 Integração com orçamento e projeções financeiras',
    prioridade: 'MEDIA',
    prioridadeLabel: '⚡ Média Prioridade',
    pesoPareto: 6,
    incidenciaEstimada: 'Média (1 questão)',
    dificuldade: 'Fácil',
    resumoEstrategico: 'Orçamento empresarial (orçamento de vendas, produção, compras, mão de obra e investimentos). Orçamento Base Zero (OBZ: justificativa de cada gasto sem base histórica) × Orçamento Incremental. Análise de variações orçamentárias.',
    palavrasChave: ['orçamento empresarial', 'OBZ', 'projeções financeiras', 'orçamento incremental']
  },

  // --- Balanço Patrimonial e DRE ---
  {
    id: 'ev-fin-4-1',
    codigoEdital: '4.1',
    disciplina: 'Balanço e DRE',
    disciplinaMacro: 'financas',
    topicoPrincipal: 'Balanço Patrimonial e Demonstrativo de Resultados do Exercício',
    subtopico: '4.1 Estrutura do Balanço Patrimonial, estrutura da DRE',
    prioridade: 'ALTA',
    prioridadeLabel: '🔥 Alta Prioridade (Cobrança Clássica)',
    pesoPareto: 9,
    incidenciaEstimada: 'Muito Alta (2 questões)',
    dificuldade: 'Média',
    artigoOuNorma: 'Lei 6.404/76 arts. 178 e 187',
    resumoEstrategico: 'Balanço: Ativo ordenado por liquidez decrescente (Circulante e Não Circulante: Realizável a Longo Prazo, Investimentos, Imobilizado, Intangível) e Passivo por exigibilidade decrescente + Patrimônio Líquido. DRE: Receita Bruta - Deduções = Receita Líquida - CMV = Lucro Bruto - Despesas Operacionais = EBIT/LAJIR +/- Resultado Financeiro = LAIR - IR/CSLL = Lucro Líquido.',
    palavrasChave: ['balanço patrimonial', 'DRE', 'ativo circulante', 'passivo circulante', 'patrimônio líquido', 'lucro líquido', 'CMV']
  },
  {
    id: 'ev-fin-4-2',
    codigoEdital: '4.2',
    disciplina: 'Balanço e DRE',
    disciplinaMacro: 'financas',
    topicoPrincipal: 'Balanço Patrimonial e Demonstrativo de Resultados do Exercício',
    subtopico: '4.2 Relação entre balanço, DRE e demais demonstrações contábeis',
    prioridade: 'ALTA',
    prioridadeLabel: '🔥 Alta Prioridade',
    pesoPareto: 8,
    incidenciaEstimada: 'Alta (1-2 questões)',
    dificuldade: 'Média',
    artigoOuNorma: 'Lei 6.404/76 e NBC TG',
    resumoEstrategico: 'Integração contábil: O resultado apurado na DRE (Lucro ou Prejuízo Líquido) é transferido para o Patrimônio Líquido no Balanço (Reserva de Lucros/Lucros Acumulados). Conexão com a DMPL (Demonstração das Mutações do PL) e DFC.',
    palavrasChave: ['relação balanço DRE', 'transferência de lucro', 'DMPL', 'patrimônio líquido', 'demonstrações contábeis']
  },

  // =========================================================================
  // 3. LOGÍSTICA E GESTÃO DA CADEIA DE SUPRIMENTOS
  // =========================================================================

  // --- Logística e Gestão da Cadeia de Suprimentos ---
  {
    id: 'ev-log-1-1',
    codigoEdital: '1.1',
    disciplina: 'Logística e SCM',
    disciplinaMacro: 'logistica',
    topicoPrincipal: 'Logística e Gestão da Cadeia de Suprimentos',
    subtopico: '1.1 Conceitos e aplicações',
    prioridade: 'MEDIA',
    prioridadeLabel: '⚡ Média Prioridade',
    pesoPareto: 7,
    incidenciaEstimada: 'Média (1 questão)',
    dificuldade: 'Fácil',
    resumoEstrategico: 'Conceito de Logística Integrada (Suprimentos, Produção e Distribuição). Cadeia de Suprimentos (SCM - visão holística do fornecedor do fornecedor até o cliente final). Nível de serviço logístico (OTIF: On-Time In-Full) e trade-off de custos (transporte vs estoque).',
    palavrasChave: ['SCM', 'logística integrada', 'OTIF', 'nível de serviço', 'trade-off']
  },
  {
    id: 'ev-log-1-2',
    codigoEdital: '1.2',
    disciplina: 'Logística e SCM',
    disciplinaMacro: 'logistica',
    topicoPrincipal: 'Logística e Gestão da Cadeia de Suprimentos',
    subtopico: '1.2 Sustentabilidade e logística verde',
    prioridade: 'MEDIA',
    prioridadeLabel: '⚡ Média Prioridade',
    pesoPareto: 6,
    incidenciaEstimada: 'Média (1 questão)',
    dificuldade: 'Fácil',
    resumoEstrategico: 'Logística Verde (Green Logistics): redução da pegada de carbono, rotas ecológicas, frotas sustentáveis, materiais biodegradáveis. Logística Reversa: canais reversos de pós-venda (garantia, recall) × canais de pós-consumo (descarte ecológico, reciclagem, remanufatura).',
    palavrasChave: ['logística verde', 'sustentabilidade', 'logística reversa', 'pós-venda', 'pós-consumo']
  },
  {
    id: 'ev-log-1-3',
    codigoEdital: '1.3',
    disciplina: 'Logística e SCM',
    disciplinaMacro: 'logistica',
    topicoPrincipal: 'Logística e Gestão da Cadeia de Suprimentos',
    subtopico: '1.3 Tecnologias emergentes para logística',
    prioridade: 'MEDIA',
    prioridadeLabel: '⚡ Média Prioridade',
    pesoPareto: 6,
    incidenciaEstimada: 'Média (1 questão)',
    dificuldade: 'Fácil',
    resumoEstrategico: 'RFID (Identificação por Radiofrequência para rastreamento sem linha de visada), TMS (Transportation Management System), WMS, IoT (sensores em cargas e dutos), Inteligência Artificial para roteirização e Blockchain para rastreabilidade de cadeias.',
    palavrasChave: ['RFID', 'TMS', 'IoT', 'rastreabilidade', 'automação logística']
  },

  // --- Modalidades de transporte ---
  {
    id: 'ev-log-2-1',
    codigoEdital: '2.1',
    disciplina: 'Modalidades de Transporte',
    disciplinaMacro: 'logistica',
    topicoPrincipal: 'Modalidades de transporte',
    subtopico: '2.1 Tipos de transporte',
    prioridade: 'MEDIA',
    prioridadeLabel: '⚡ Média Prioridade',
    pesoPareto: 7,
    incidenciaEstimada: 'Média (1 questão)',
    dificuldade: 'Fácil',
    resumoEstrategico: 'Comparativo dos modais: Rodoviário (porta a porta, alta flexibilidade, frete médio, poluente); Ferroviário (grandes volumes e distâncias, baixo frete por tonelada, baixa flexibilidade); Aquaviário/Cabotagem (altíssima capacidade, custo baixo, lento - central na Transpetro); Dutoviário (transporte contínuo de fluidos e gás, altíssimo custo inicial, baixíssimo custo operacional e risco reduzido); Aéreo (altíssima velocidade, alto custo, cargas urgentes/valiosas).',
    palavrasChave: ['modal rodoviário', 'modal aquaviário', 'modal dutoviário', 'cabotagem', 'modal ferroviário']
  },
  {
    id: 'ev-log-2-2',
    codigoEdital: '2.2',
    disciplina: 'Modalidades de Transporte',
    disciplinaMacro: 'logistica',
    topicoPrincipal: 'Modalidades de transporte',
    subtopico: '2.2 Intermodalidade e multimodalidade',
    prioridade: 'MEDIA',
    prioridadeLabel: '⚡ Média Prioridade (Pegadinha Clássica)',
    pesoPareto: 7,
    incidenciaEstimada: 'Média (1 questão)',
    dificuldade: 'Fácil',
    artigoOuNorma: 'Lei 9.611/98 (OTM)',
    resumoEstrategico: 'Intermodalidade: utilização de dois ou mais modais de transporte com contratos individuais e documentos de transporte separados para cada trecho. Multimodalidade: utilização de dois ou mais modais sob a responsabilidade de um único Operador de Transporte Multimodal (OTM), com documento único (CTMC).',
    palavrasChave: ['intermodalidade', 'multimodalidade', 'OTM', 'CTMC', 'contrato único']
  },
  {
    id: 'ev-log-2-3',
    codigoEdital: '2.3',
    disciplina: 'Modalidades de Transporte',
    disciplinaMacro: 'logistica',
    topicoPrincipal: 'Modalidades de transporte',
    subtopico: '2.3 Regulação e legislação do transporte',
    prioridade: 'MEDIA',
    prioridadeLabel: '⚡ Média Prioridade',
    pesoPareto: 6,
    incidenciaEstimada: 'Média (1 questão)',
    dificuldade: 'Fácil',
    resumoEstrategico: 'Papel das agências reguladoras no Brasil: ANTT (Agência Nacional de Transportes Terrestres - rodovias, ferrovias, dutos terrestres), ANTAQ (Agência Nacional de Transportes Aquaviários - portos, cabotagem e navegação), ANAC (aviação) e ANP (regulação técnica de petróleo, derivados e biocombustíveis).',
    palavrasChave: ['ANTT', 'ANTAQ', 'ANP', 'regulação de transportes', 'concessões']
  },

  // --- Gestão de Estoques ---
  {
    id: 'ev-log-3-1',
    codigoEdital: '3.1',
    disciplina: 'Gestão de Estoques',
    disciplinaMacro: 'logistica',
    topicoPrincipal: 'Gestão de Estoques',
    subtopico: '3.1 Classificação e métodos de gestão de estoques',
    prioridade: 'ALTA',
    prioridadeLabel: '🔥 Alta Prioridade (Questão Certa)',
    pesoPareto: 9,
    incidenciaEstimada: 'Muito Alta (2 questões)',
    dificuldade: 'Fácil',
    resumoEstrategico: 'Curva ABC (Princípio de Pareto 80/20): Classe A (80% do valor e 20% dos itens - controle rigoroso), Classe B (15% valor e 30% itens), Classe C (5% valor e 50% itens). Criticidade XYZ (Z é vital). Perecibilidade PQR. Métodos de valoração: PEPS/FIFO, UEPS/LIFO (não permitido fiscalmente no Brasil) e Custo Médio Ponderado.',
    palavrasChave: ['curva ABC', 'criticidade XYZ', 'PEPS', 'FIFO', 'custo médio ponderado', 'classificação de estoques']
  },
  {
    id: 'ev-log-3-2',
    codigoEdital: '3.2',
    disciplina: 'Gestão de Estoques',
    disciplinaMacro: 'logistica',
    topicoPrincipal: 'Gestão de Estoques',
    subtopico: '3.2 Políticas de estoque e níveis de serviço',
    prioridade: 'ALTA',
    prioridadeLabel: '🔥 Alta Prioridade (Fórmulas Exatas)',
    pesoPareto: 9,
    incidenciaEstimada: 'Muito Alta (2 questões)',
    dificuldade: 'Média',
    resumoEstrategico: 'Ponto de Pedido (PP) = (Consumo Médio Diário × Lead Time) + Estoque de Segurança. Estoque de Segurança (protege contra oscilações de demanda e atrasos no suprimento). Lote Econômico de Compra (LEC / EOQ): ponto onde o Custo de Pedido se iguala ao Custo de Armazenagem/Posse. Giro de Estoque = Consumo / Estoque Médio. Cobertura.',
    palavrasChave: ['ponto de pedido', 'estoque de segurança', 'LEC', 'EOQ', 'lead time', 'giro de estoque', 'nível de serviço']
  },
  {
    id: 'ev-log-3-3',
    codigoEdital: '3.3',
    disciplina: 'Gestão de Estoques',
    disciplinaMacro: 'logistica',
    topicoPrincipal: 'Gestão de Estoques',
    subtopico: '3.3 Tecnologias para automação do controle de estoque',
    prioridade: 'MEDIA',
    prioridadeLabel: '⚡ Média Prioridade',
    pesoPareto: 6,
    incidenciaEstimada: 'Média (1 questão)',
    dificuldade: 'Fácil',
    resumoEstrategico: 'Sistemas ERP integrados, código de barras (EAN-13, Datamatrix), etiquetas RFID para leitura simultânea em massa sem contato visual, coletores de dados, sistemas de inventário contínuo e inventário por amostragem/rotativo.',
    palavrasChave: ['RFID', 'código de barras', 'automação de estoques', 'inventário rotativo', 'coletores de dados']
  },

  // --- Armazenagem ---
  {
    id: 'ev-log-4-1',
    codigoEdital: '4.1',
    disciplina: 'Armazenagem',
    disciplinaMacro: 'logistica',
    topicoPrincipal: 'Armazenagem',
    subtopico: '4.1 Tipos de armazéns e suas funções',
    prioridade: 'BAIXA',
    prioridadeLabel: '❄️ Baixa Prioridade',
    pesoPareto: 4,
    incidenciaEstimada: 'Baixa (0-1 questão)',
    dificuldade: 'Fácil',
    resumoEstrategico: 'Armazéns próprios, públicos, contratados/terceirizados e alfandegados. Centro de Distribuição (CD). Funções essenciais: recebimento, conferência, armazenagem, separação de pedidos (picking) e expedição.',
    palavrasChave: ['tipos de armazéns', 'centro de distribuição', 'CD', 'picking', 'expedição']
  },
  {
    id: 'ev-log-4-2',
    codigoEdital: '4.2',
    disciplina: 'Armazenagem',
    disciplinaMacro: 'logistica',
    topicoPrincipal: 'Armazenagem',
    subtopico: '4.2 Layout e organização do armazém',
    prioridade: 'BAIXA',
    prioridadeLabel: '❄️ Baixa Prioridade',
    pesoPareto: 4,
    incidenciaEstimada: 'Baixa (0-1 questão)',
    dificuldade: 'Fácil',
    resumoEstrategico: 'Layout físico (fluxo em U, fluxo em linha reta ou L), endereçamento logístico (rua, bloco, nível, vão), cross-docking (mercadoria entra e sai direto sem estocagem intermediária) e verticalização do espaço.',
    palavrasChave: ['layout de armazém', 'cross-docking', 'endereçamento', 'fluxo em U', 'verticalização']
  },
  {
    id: 'ev-log-4-3',
    codigoEdital: '4.3',
    disciplina: 'Armazenagem',
    disciplinaMacro: 'logistica',
    topicoPrincipal: 'Armazenagem',
    subtopico: '4.3 Tecnologias',
    prioridade: 'BAIXA',
    prioridadeLabel: '❄️ Baixa Prioridade',
    pesoPareto: 4,
    incidenciaEstimada: 'Baixa (0-1 questão)',
    dificuldade: 'Fácil',
    resumoEstrategico: 'WMS (Warehouse Management System), voice picking (separação por comando de voz), pick-to-light (separação por luzes indicadoras), transelevadores automáticos e AGVs (veículos autoguiados).',
    palavrasChave: ['WMS', 'voice picking', 'pick-to-light', 'transelevador', 'automação de armazéns']
  },

  // --- Manuseio de Materiais ---
  {
    id: 'ev-log-5-1',
    codigoEdital: '5.1',
    disciplina: 'Manuseio de Materiais',
    disciplinaMacro: 'logistica',
    topicoPrincipal: 'Manuseio de Materiais',
    subtopico: '5.1 Equipamentos de movimentação de materiais',
    prioridade: 'BAIXA',
    prioridadeLabel: '❄️ Baixa Prioridade',
    pesoPareto: 4,
    incidenciaEstimada: 'Baixa (0-1 questão)',
    dificuldade: 'Fácil',
    resumoEstrategico: 'Equipamentos manuais e motorizados: carrinhos hidráulicos (transpaleteiras), empilhadeiras (a combustão, elétricas, retráteis), pontes rolantes, guindastes e transportadores contínuos (esteiras de roletes).',
    palavrasChave: ['empilhadeira', 'transpaleteira', 'ponte rolante', 'esteira rolante', 'movimentação de materiais']
  },
  {
    id: 'ev-log-5-2',
    codigoEdital: '5.2',
    disciplina: 'Manuseio de Materiais',
    disciplinaMacro: 'logistica',
    topicoPrincipal: 'Manuseio de Materiais',
    subtopico: '5.2 Princípios de movimentação eficiente',
    prioridade: 'BAIXA',
    prioridadeLabel: '❄️ Baixa Prioridade',
    pesoPareto: 3,
    incidenciaEstimada: 'Baixa (<5%)',
    dificuldade: 'Fácil',
    resumoEstrategico: 'Princípios clássicos de manuseio: Princípio do Planejamento, Princípio da Carga Unitária, Princípio da Gravidade (aproveitar gravidade sempre que possível), Princípio do Espaço, Princípio da Padronização e Princípio da Ergonomia/Segurança.',
    palavrasChave: ['princípios de movimentação', 'carga unitária', 'ergonomia', 'padronização']
  },
  {
    id: 'ev-log-5-3',
    codigoEdital: '5.3',
    disciplina: 'Manuseio de Materiais',
    disciplinaMacro: 'logistica',
    topicoPrincipal: 'Manuseio de Materiais',
    subtopico: '5.3 Tecnologias de automação do manuseio de materiais',
    prioridade: 'BAIXA',
    prioridadeLabel: '❄️ Baixa Prioridade',
    pesoPareto: 3,
    incidenciaEstimada: 'Baixa (<5%)',
    dificuldade: 'Fácil',
    resumoEstrategico: 'Sistemas AS/RS (Automated Storage and Retrieval Systems), robôs móveis autônomos (AMR) e sensores de segurança operacional em terminais de carga.',
    palavrasChave: ['AS/RS', 'AMR', 'robótica logística', 'automação de manuseio']
  },

  // --- Embalagem ---
  {
    id: 'ev-log-6-1',
    codigoEdital: '6.1',
    disciplina: 'Embalagem e Cargas',
    disciplinaMacro: 'logistica',
    topicoPrincipal: 'Embalagem',
    subtopico: '6.1 Tipos e funções da embalagem',
    prioridade: 'BAIXA',
    prioridadeLabel: '❄️ Baixa Prioridade',
    pesoPareto: 4,
    incidenciaEstimada: 'Baixa (0-1 questão)',
    dificuldade: 'Fácil',
    resumoEstrategico: 'Níveis de embalagem: Primária (contato direto com o produto), Secundária (protege a primária/unidade de venda), Terciária (caixas para transporte), Quaternária (palete unitizado) e Quinquenária (contêiner de transporte marítimo). Funções: contenção, proteção, comunicação e movimentação.',
    palavrasChave: ['embalagem primária', 'embalagem secundária', 'embalagem terciária', 'funções da embalagem']
  },
  {
    id: 'ev-log-6-2',
    codigoEdital: '6.2',
    disciplina: 'Embalagem e Cargas',
    disciplinaMacro: 'logistica',
    topicoPrincipal: 'Embalagem',
    subtopico: '6.2 Sustentabilidade na escolha de materiais de embalagem',
    prioridade: 'BAIXA',
    prioridadeLabel: '❄️ Baixa Prioridade',
    pesoPareto: 4,
    incidenciaEstimada: 'Baixa (0-1 questão)',
    dificuldade: 'Fácil',
    resumoEstrategico: 'Ecodesign de embalagens: redução de volume e peso (lightweighting), materiais recicláveis, biodegradáveis, reutilizáveis e eliminação de plásticos de uso único.',
    palavrasChave: ['ecodesign', 'embalagem sustentável', 'reciclabilidade', 'biodegradável']
  },
  {
    id: 'ev-log-6-3',
    codigoEdital: '6.3',
    disciplina: 'Embalagem e Cargas',
    disciplinaMacro: 'logistica',
    topicoPrincipal: 'Embalagem',
    subtopico: '6.3 Unitização de cargas',
    prioridade: 'BAIXA',
    prioridadeLabel: '❄️ Baixa Prioridade',
    pesoPareto: 5,
    incidenciaEstimada: 'Baixa-Média (0-1 questão)',
    dificuldade: 'Fácil',
    resumoEstrategico: 'Conceito de unitização: agrupar volumes menores em uma única unidade de carga para facilitar a movimentação rápida. Padrão de Palete PBR (1000 mm × 1200 mm), Europallet (800 mm × 1200 mm), filme stretch, cintas e contêineres padrão ISO (20 e 40 pés / TEU).',
    palavrasChave: ['unitização', 'palete PBR 1000x1200', 'filme stretch', 'TEU', 'contêiner ISO']
  },
  {
    id: 'ev-log-6-4',
    codigoEdital: '6.4',
    disciplina: 'Embalagem e Cargas',
    disciplinaMacro: 'logistica',
    topicoPrincipal: 'Embalagem',
    subtopico: '6.4 Segurança no transporte',
    prioridade: 'BAIXA',
    prioridadeLabel: '❄️ Baixa Prioridade',
    pesoPareto: 4,
    incidenciaEstimada: 'Baixa (0-1 questão)',
    dificuldade: 'Fácil',
    resumoEstrategico: 'Simbologia internacional de embalagens (frágil, este lado para cima, proteger da umidade, empilhamento máximo), amarração e estivagem de cargas em veículos e navios.',
    palavrasChave: ['simbologia de embalagem', 'estivagem', 'amarração de cargas', 'segurança no transporte']
  },

  // --- Gestão de Compras ---
  {
    id: 'ev-log-7-1',
    codigoEdital: '7.1',
    disciplina: 'Gestão de Compras',
    disciplinaMacro: 'logistica',
    topicoPrincipal: 'Gestão de Compras',
    subtopico: '7.1 Modalidades de compras e orçamento',
    prioridade: 'ALTA',
    prioridadeLabel: '🔥 Alta Prioridade',
    pesoPareto: 8,
    incidenciaEstimada: 'Alta (1-2 questões)',
    dificuldade: 'Fácil',
    resumoEstrategico: 'Estrutura do setor de compras: centralizadas × descentralizadas. Compras rotineiras, de emergência, por catálogo e orçamentos estimativos. Pesquisa de preços (painel de preços, contratos similares, cotações de mercado).',
    palavrasChave: ['compras centralizadas', 'compras descentralizadas', 'pesquisa de preços', 'orçamento estimativo']
  },
  {
    id: 'ev-log-7-2',
    codigoEdital: '7.2',
    disciplina: 'Gestão de Compras',
    disciplinaMacro: 'logistica',
    topicoPrincipal: 'Gestão de Compras',
    subtopico: '7.2 Planejamento de compras',
    prioridade: 'ALTA',
    prioridadeLabel: '🔥 Alta Prioridade',
    pesoPareto: 8,
    incidenciaEstimada: 'Alta (1-2 questões)',
    dificuldade: 'Fácil',
    resumoEstrategico: 'Plano de Contratações Anual (PCA), Termo de Referência (TR), Estudo Técnico Preliminar (ETP), especificação técnica sem direcionamento e matriz de riscos de suprimentos.',
    palavrasChave: ['ETP', 'termo de referência', 'PCA', 'planejamento de compras', 'especificação técnica']
  },
  {
    id: 'ev-log-7-3',
    codigoEdital: '7.3',
    disciplina: 'Gestão de Compras / Legislação',
    disciplinaMacro: 'logistica',
    topicoPrincipal: 'Gestão de Compras',
    subtopico: '7.3 Lei nº 13.303/2016 (artigos 28 ao 91), Nova lei geral de licitações nº 14.133/2021',
    prioridade: 'ALTA',
    prioridadeLabel: '🔥🔥 PRIORIDADE MÁXIMA (Top 1 da Prova)',
    pesoPareto: 10,
    incidenciaEstimada: '100% de Certeza (4-6 questões)',
    dificuldade: 'Média',
    artigoOuNorma: 'Lei 13.303/2016 (arts. 28-91) & Lei 14.133/2021',
    resumoEstrategico: 'Único ponto do edital que especifica artigos exatos de lei! Lei 13.303/16 (Estatais): Dispensa de licitação (art. 29), Inexigibilidade (art. 30), Modos de Disputa (aberto, fechado, combinado), Inversão de Fases (julga proposta antes da habilitação), Critérios de Julgamento, Pré-qualificação permanente e Contratação Semi-integrada/Integrada. Lei 14.133/21: 5 modalidades (Pregão, Concorrência, Concurso, Leilão, Diálogo Competitivo).',
    palavrasChave: ['13.303', 'estatais', 'art 28 ao 91', '14.133', 'dispensa art 29', 'inexigibilidade art 30', 'inversão de fases', 'modos de disputa']
  },

  // --- Gestão de Contratos ---
  {
    id: 'ev-log-8-1',
    codigoEdital: '8.1',
    disciplina: 'Gestão de Contratos',
    disciplinaMacro: 'logistica',
    topicoPrincipal: 'Gestão de Contratos',
    subtopico: '8.1 Ciclo de vida do contrato',
    prioridade: 'ALTA',
    prioridadeLabel: '🔥 Alta Prioridade',
    pesoPareto: 8,
    incidenciaEstimada: 'Alta (1-2 questões)',
    dificuldade: 'Fácil',
    resumoEstrategico: 'Fases do contrato: Planejamento, Seleção do Fornecedor, Assinatura e Publicação, Execução e Fiscalização, Recebimento Provisório e Definitivo, Liquidação da Despesa, Pagamento e Encerramento/Extinção.',
    palavrasChave: ['ciclo de vida do contrato', 'recebimento provisório', 'recebimento definitivo', 'liquidação', 'extinção contratual']
  },
  {
    id: 'ev-log-8-2',
    codigoEdital: '8.2',
    disciplina: 'Gestão de Contratos',
    disciplinaMacro: 'logistica',
    topicoPrincipal: 'Gestão de Contratos',
    subtopico: '8.2 Fiscalização e gestão de contratos',
    prioridade: 'ALTA',
    prioridadeLabel: '🔥 Alta Prioridade (Atribuição Nuclear)',
    pesoPareto: 9,
    incidenciaEstimada: 'Muito Alta (2-3 questões)',
    dificuldade: 'Fácil',
    artigoOuNorma: 'Anexo III Edital / Lei 13.303',
    resumoEstrategico: 'Atribuição descrita no edital para o cargo! Fiscal Técnico (acompanha execução física, prazos, qualidade e ateste de nota fiscal); Fiscal Administrativo (acompanha obrigações trabalhistas, previdenciárias e fiscais da contratada); Gestor do Contrato (coordena os fiscais, aditivos, aplicação de sanções).',
    palavrasChave: ['fiscal técnico', 'fiscal administrativo', 'gestor do contrato', 'ateste de notas', 'fiscalização de contratos']
  },
  {
    id: 'ev-log-8-3',
    codigoEdital: '8.3',
    disciplina: 'Gestão de Contratos',
    disciplinaMacro: 'logistica',
    topicoPrincipal: 'Gestão de Contratos',
    subtopico: '8.3 Gestão de riscos e aditivos contratuais',
    prioridade: 'ALTA',
    prioridadeLabel: '🔥 Alta Prioridade (Pegadinha Típica)',
    pesoPareto: 9,
    incidenciaEstimada: 'Muito Alta (2 questões)',
    dificuldade: 'Média',
    artigoOuNorma: 'Lei 13.303 art. 81 / Lei 14.133',
    resumoEstrategico: 'Limites de Aditivos Unilaterais: até 25% para acréscimos e supressões em obras, compras e serviços, e até 50% para acréscimos em reformas de edifícios. Termo Aditivo (alteração substantiva) × Apostilamento (simples registro de reajuste de preço por índice já previsto, sem alterar cláusulas). Equilíbrio econômico-financeiro (Reajuste, Repactuação, Revisão).',
    palavrasChave: ['aditivos contratuais', 'limite de 25%', 'limite de 50%', 'apostilamento', 'reajuste', 'repactuação', 'reequilíbrio']
  },
  {
    id: 'ev-log-8-4',
    codigoEdital: '8.4',
    disciplina: 'Gestão de Contratos',
    disciplinaMacro: 'logistica',
    topicoPrincipal: 'Gestão de Contratos',
    subtopico: '8.4 Contratos digitais e integração com sistemas de gestão',
    prioridade: 'MEDIA',
    prioridadeLabel: '⚡ Média Prioridade',
    pesoPareto: 6,
    incidenciaEstimada: 'Média (1 questão)',
    dificuldade: 'Fácil',
    resumoEstrategico: 'Assinatura digital padrão ICP-Brasil (assinatura eletrônica qualificada, avançada e simples conforme Lei 14.063/2020), sistemas de CLM (Contract Lifecycle Management) e integração com ERP (SAP).',
    palavrasChave: ['contratos digitais', 'assinatura ICP-Brasil', 'CLM', 'gestão eletrônica de documentos']
  },

  // =========================================================================
  // 4. NOÇÕES DE INFORMÁTICA
  // =========================================================================

  // --- Fundamentos de computação ---
  {
    id: 'ev-inf-1-1',
    codigoEdital: '1.1',
    disciplina: 'Fundamentos de Computação',
    disciplinaMacro: 'informatica',
    topicoPrincipal: 'Fundamentos de computação',
    subtopico: '1.1 Componentes de um computador (hardware e software)',
    prioridade: 'BAIXA',
    prioridadeLabel: '❄️ Baixa Prioridade',
    pesoPareto: 4,
    incidenciaEstimada: 'Baixa (0-1 questão)',
    dificuldade: 'Fácil',
    resumoEstrategico: 'Hardware (parte física): CPU/Processador (ULA, UC, Registradores), Memória Principal (RAM - volátil, ROM/BIOS - não volátil), Memória Secundária (SSD NVMe, HD), Periféricos de entrada/saída. Software (básico, utilitário, aplicativo).',
    palavrasChave: ['hardware', 'software', 'RAM', 'ROM', 'SSD', 'CPU', 'periféricos']
  },
  {
    id: 'ev-inf-1-2',
    codigoEdital: '1.2',
    disciplina: 'Fundamentos de Computação',
    disciplinaMacro: 'informatica',
    topicoPrincipal: 'Fundamentos de computação',
    subtopico: '1.2 Características dos principais processadores do mercado',
    prioridade: 'BAIXA',
    prioridadeLabel: '❄️ Baixa Prioridade',
    pesoPareto: 3,
    incidenciaEstimada: 'Baixa (<5%)',
    dificuldade: 'Fácil',
    resumoEstrategico: 'Arquiteturas x86 (32 bits), x64 (64 bits) e ARM. Núcleos (Cores), Threads, Clock (GHz), Memória Cache (L1, L2, L3). Principais famílias: Intel (Core i3, i5, i7, i9, Xeon) e AMD (Ryzen 3, 5, 7, 9, Epyc).',
    palavrasChave: ['processadores', 'núcleos', 'threads', 'cache L1 L2 L3', 'clock', 'x64', 'ARM']
  },
  {
    id: 'ev-inf-1-3',
    codigoEdital: '1.3',
    disciplina: 'Fundamentos de Computação / Windows',
    disciplinaMacro: 'informatica',
    topicoPrincipal: 'Fundamentos de computação',
    subtopico: '1.3 Sistemas operacionais — utilitários, aplicativos e manipulação de arquivos nos ambientes Windows (Windows 11)',
    prioridade: 'MEDIA',
    prioridadeLabel: '⚡ Média Prioridade',
    pesoPareto: 6,
    incidenciaEstimada: 'Média (1 questão)',
    dificuldade: 'Fácil',
    resumoEstrategico: 'Windows 11: Explorador de Arquivos (atalhos: Ctrl+C, Ctrl+X, Ctrl+V, Ctrl+Z, F2 renomear, Shift+Delete exclusão permanente), Gerenciador de Tarefas (Ctrl+Shift+Esc), Configurações, Área de Transferência com Histórico (Win+V), múltiplos desktops (Win+Tab) e painel Snap Layouts.',
    palavrasChave: ['Windows 11', 'explorador de arquivos', 'atalhos de teclado', 'gerenciador de tarefas', 'snap layouts', 'Win+V']
  },

  // --- Principais aplicativos comerciais ---
  {
    id: 'ev-inf-2-1',
    codigoEdital: '2.1',
    disciplina: 'Aplicativos Comerciais / Office',
    disciplinaMacro: 'informatica',
    topicoPrincipal: 'Principais aplicativos comerciais',
    subtopico: '2.1 Edição de textos, planilhas e geração de material escrito e multimídia (Microsoft Office 2024)',
    prioridade: 'ALTA',
    prioridadeLabel: '🔥 Alta Prioridade (Foco em Excel 2024)',
    pesoPareto: 9,
    incidenciaEstimada: 'Muito Alta (2 questões)',
    dificuldade: 'Média',
    resumoEstrategico: 'Microsoft Office 2024: Word (formatação de estilos, controle de alterações, mala direta), PowerPoint (slides mestres, transições) e principalmente EXCEL 2024: Fórmulas essenciais: PROCV, PROCX, SE, E, OU, SOMASE, CONT.SE, MÉDIA e Fixação de referências com Cifrão ($A$1 absoluta, $A1 mista coluna, A$1 mista linha).',
    palavrasChave: ['Microsoft Office 2024', 'Excel', 'PROCV', 'PROCX', 'SOMASE', 'CONT.SE', 'função SE', 'referência absoluta $', 'Word']
  },

  // --- Conceito de internet e intranet e principais navegadores ---
  {
    id: 'ev-inf-3-1',
    codigoEdital: '3.1',
    disciplina: 'Internet e Navegadores',
    disciplinaMacro: 'informatica',
    topicoPrincipal: 'Conceito de internet e intranet e principais navegadores',
    subtopico: '3.1 Conceito de internet e intranet e principais navegadores',
    prioridade: 'MEDIA',
    prioridadeLabel: '⚡ Média Prioridade',
    pesoPareto: 6,
    incidenciaEstimada: 'Média (1 questão)',
    dificuldade: 'Fácil',
    resumoEstrategico: 'Internet (rede pública mundial baseada em TCP/IP) × Intranet (rede corporativa interna com acesso restrito a colaboradores) × Extranet (extensão segura para fornecedores e parceiros). Navegadores (Microsoft Edge, Google Chrome, Mozilla Firefox): Atalhos de navegação (Ctrl+T nova aba, Ctrl+Shift+N/P janela anônima, Ctrl+H histórico), Cookies, Cache e Nuvem (OneDrive).',
    palavrasChave: ['internet', 'intranet', 'extranet', 'Edge', 'Chrome', 'janela anônima', 'cookies', 'cache', 'TCP/IP']
  },

  // --- Segurança da informação e LGPD ---
  {
    id: 'ev-inf-4-1',
    codigoEdital: '4.1',
    disciplina: 'Segurança da Informação e LGPD',
    disciplinaMacro: 'informatica',
    topicoPrincipal: 'Noções sobre segurança da informação e Lei Geral de Proteção de Dados Pessoais — LGPD (Lei nº 13.709, de 14 de agosto de 2018, e suas alterações)',
    subtopico: '4.1 Noções sobre segurança da informação e Lei Geral de Proteção de Dados Pessoais — LGPD (Lei nº 13.709/2018)',
    prioridade: 'ALTA',
    prioridadeLabel: '🔥🔥 PRIORIDADE MÁXIMA (Melhor Custo/Benefício)',
    pesoPareto: 10,
    incidenciaEstimada: 'Muito Alta (2-3 questões)',
    dificuldade: 'Fácil',
    artigoOuNorma: 'Lei 13.709/2018 (LGPD) e Princípios CID',
    resumoEstrategico: 'Segurança: Princípios CID (Confidencialidade, Integridade, Disponibilidade, Autenticidade, Não-repúdio), Ameaças (Ransomware - criptografia/resgate, Phishing - engenharia social/páginas falsas, Spyware, Trojan), Política de Backup 3-2-1. LGPD (Lei 13.709/18): Dado pessoal vs Dado pessoal sensível (origem racial, religião, saúde, biometria/genética); Agentes de tratamento: Controlador (decide) e Operador (executa); Encarregado/DPO (canal de comunicação); Autoridade Nacional (ANPD); Bases legais do tratamento (consentimento, cumprimento de obrigação legal).',
    palavrasChave: ['LGPD', 'Lei 13.709', 'dado sensível', 'controlador', 'operador', 'DPO', 'ANPD', 'confidencialidade', 'integridade', 'disponibilidade', 'ransomware', 'phishing']
  }
];
