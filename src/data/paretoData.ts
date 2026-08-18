export interface MacroDisciplina {
  id: string;
  nome: string;
  questoesEstimadas: number;
  pctProva: number;
  pctClassificacao: number;
  prioridade: 'PRIORITÁRIA' | 'COMPLEMENTAR' | 'RESIDUAL';
  pctTempo: number;
  horasAlocadas: number;
  cor: string;
  descricao: string;
  fasesPresenca: string; // e.g. 'Fase 1 (S1-S5) · Fase 2 (S6-S10) · Fase 3 (S11-S15)'
  retomadasInfo: string; // e.g. '5 a 7 Retomadas ao longo dos 100 dias'
  distribuicaoFases: { fase: string; semanas: string; foco: string }[];
}

export interface MesoTopico {
  id: string;
  disciplinaId: string;
  numero: number;
  nome: string;
  frequenciaHistorica: string;
  temperatura: 'quente' | 'morno' | 'frio';
  temperaturaLabel: string;
  ordemEstudo: number;
  horasSugeridas: number;
  notaEstrategica?: string;
  fasePresenca: string; // e.g. 'Fases 1, 2 e 3 (S1, S6, S11)'
  retomadasQtd: number; // e.g. 6
}

export interface MicroSubtopico {
  id: string;
  topicoId: string;
  disciplinaId: string;
  nome: string;
  frequencia: 'Alta' | 'Média-Alta' | 'Média' | 'Média-Baixa' | 'Baixa';
  dificuldade: 'Fácil' | 'Médio' | 'Médio-Difícil' | 'Difícil';
  custoBeneficio: number; // 1 to 5 stars
  incluir: 'Sim' | 'Leitura rápida' | 'Corte';
  horas: number;
  detalhes: string;
  faseRecomendada?: string;
}

export const PARETO_MACRO: MacroDisciplina[] = [
  {
    id: 'processos_adm',
    nome: 'Processos Adm. & Legislação',
    questoesEstimadas: 10,
    pctProva: 25,
    pctClassificacao: 25,
    prioridade: 'PRIORITÁRIA',
    pctTempo: 24,
    horasAlocadas: 36,
    cor: '#3b82f6', // blue
    descricao: 'Gestão de Recursos Humanos (R&S, avaliação 360º, cargos), SGI (ISO 9001/14001/45001), Gestão de Riscos, Indicadores ESG/BSC e Gestão de Manutenção/Patrimônio.',
    fasesPresenca: 'Presente nas 3 Fases (S1 a S15)',
    retomadasInfo: '5 Retomadas ao longo dos 100 dias',
    distribuicaoFases: [
      { fase: 'Fase 1 (S1-S5)', semanas: 'Sem. 3, 4 e 5', foco: 'Fundação Teórica + 1ª Passada' },
      { fase: 'Fase 2 (S6-S10)', semanas: 'Sem. 8, 9 e 10', foco: 'Engenharia Reversa & Aprofundamento Cesgranrio' },
      { fase: 'Fase 3 (S11-S15)', semanas: 'Sem. 13, 14 e 15', foco: 'Super Simulados & Reta Final' }
    ]
  },
  {
    id: 'logistica',
    nome: 'Logística & Gestão de Suprimentos',
    questoesEstimadas: 14,
    pctProva: 35,
    pctClassificacao: 35,
    prioridade: 'PRIORITÁRIA',
    pctTempo: 36,
    horasAlocadas: 54,
    cor: '#ef4444', // red
    descricao: 'Coração da ênfase (8 tópicos no Anexo IV). Envolve Compras Públicas (Lei 13.303 e 14.133), Gestão de Contratos e Estoques. Representa o maior volume e peso da prova.',
    fasesPresenca: 'Presente nas 3 Fases (S1 a S15)',
    retomadasInfo: '7 Retomadas ao longo dos 100 dias',
    distribuicaoFases: [
      { fase: 'Fase 1 (S1-S5)', semanas: 'Sem. 1, 2, 4 e 5', foco: 'Fundação Teórica + 1ª Passada' },
      { fase: 'Fase 2 (S6-S10)', semanas: 'Sem. 6, 7, 9 e 10', foco: 'Engenharia Reversa & Aprofundamento Cesgranrio' },
      { fase: 'Fase 3 (S11-S15)', semanas: 'Sem. 11, 12, 14 e 15', foco: 'Super Simulados & Reta Final' }
    ]
  },
  {
    id: 'financas',
    nome: 'Finanças & Contabilidade',
    questoesEstimadas: 10,
    pctProva: 25,
    pctClassificacao: 25,
    prioridade: 'PRIORITÁRIA',
    pctTempo: 26,
    horasAlocadas: 39,
    cor: '#f97316', // orange
    descricao: 'Matemática Financeira (descontos, juros simples e compostos) e Contabilidade prática (Balanço Patrimonial, DRE e Fluxo de Caixa direto x indireto).',
    fasesPresenca: 'Presente nas 3 Fases (S1 a S15)',
    retomadasInfo: '6 Retomadas ao longo dos 100 dias',
    distribuicaoFases: [
      { fase: 'Fase 1 (S1-S5)', semanas: 'Sem. 1, 3 e 5', foco: 'Fundação Teórica + 1ª Passada' },
      { fase: 'Fase 2 (S6-S10)', semanas: 'Sem. 6, 8 e 10', foco: 'Engenharia Reversa & Aprofundamento Cesgranrio' },
      { fase: 'Fase 3 (S11-S15)', semanas: 'Sem. 11, 13 e 15', foco: 'Super Simulados & Reta Final' }
    ]
  },
  {
    id: 'informatica',
    nome: 'Informática & Segurança de Dados',
    questoesEstimadas: 6,
    pctProva: 15,
    pctClassificacao: 15,
    prioridade: 'COMPLEMENTAR',
    pctTempo: 14,
    horasAlocadas: 21,
    cor: '#10b981', // emerald
    descricao: 'Bloco de altíssimo custo-benefício: LGPD (Lei 13.709/18), Segurança da Informação (CID, malware) e fórmulas do Excel (PROCV/PROCX, SE, SOMASE).',
    fasesPresenca: 'Presente nas 3 Fases (S1 a S15)',
    retomadasInfo: '4 Retomadas ao longo dos 100 dias',
    distribuicaoFases: [
      { fase: 'Fase 1 (S1-S5)', semanas: 'Sem. 2 e 5', foco: 'Fundação Teórica + 1ª Passada' },
      { fase: 'Fase 2 (S6-S10)', semanas: 'Sem. 7 e 10', foco: 'Engenharia Reversa & Aprofundamento Cesgranrio' },
      { fase: 'Fase 3 (S11-S15)', semanas: 'Sem. 12 e 15', foco: 'Super Simulados & Reta Final' }
    ]
  }
];

export const PARETO_MESO: MesoTopico[] = [
  // LOGÍSTICA
  {
    id: 'log-7',
    disciplinaId: 'logistica',
    numero: 7,
    nome: 'Gestão de Compras — Lei 13.303/2016 (arts. 28–91) e Lei 14.133/2021',
    frequenciaHistorica: 'Alta (Quase 100% de incidência)',
    temperatura: 'quente',
    temperaturaLabel: '🔥🔥 FERVENDO (Top 1 da prova)',
    ordemEstudo: 1,
    horasSugeridas: 18,
    fasePresenca: 'Presente nas 3 Fases (S1, S2, S6, S7, S11, S15)',
    retomadasQtd: 7,
    notaEstrategica: 'O item 7.3 é o único ponto do edital que cita artigos específicos de lei ("arts 28 ao 91" da 13.303). A banca Cesgranrio sempre cobra a literalidade dessas regras para estatais!'
  },
  {
    id: 'log-3',
    disciplinaId: 'logistica',
    numero: 3,
    nome: 'Gestão de Estoques (Curva ABC, políticas, nível de serviço, LEC)',
    frequenciaHistorica: 'Alta',
    temperatura: 'quente',
    temperaturaLabel: '🔥🔥 QUENTE',
    ordemEstudo: 2,
    horasSugeridas: 10,
    fasePresenca: 'Presente nas 3 Fases (S2, S4, S7, S9, S12)',
    retomadasQtd: 5,
    notaEstrategica: 'Curva ABC, ponto de pedido, estoque de segurança e cálculo de giro/cobertura são cobranças clássicas e de resolução direta.'
  },
  {
    id: 'log-8',
    disciplinaId: 'logistica',
    numero: 8,
    nome: 'Gestão de Contratos (Ciclo de vida, fiscalização, aditivos, riscos)',
    frequenciaHistorica: 'Alta',
    temperatura: 'quente',
    temperaturaLabel: '🔥 QUENTE',
    ordemEstudo: 3,
    horasSugeridas: 9,
    fasePresenca: 'Presente nas 3 Fases (S2, S5, S7, S10, S14)',
    retomadasQtd: 5,
    notaEstrategica: 'A atribuição do cargo no Anexo III é literalmente "Executar a fiscalização técnica e administrativa dos contratos". Conhecer limites de aditivos (25%/50%) e apostilamento é essencial.'
  },
  {
    id: 'log-1',
    disciplinaId: 'logistica',
    numero: 1,
    nome: 'Logística e SCM — Conceitos, logística verde e tecnologias emergentes',
    frequenciaHistorica: 'Alta',
    temperatura: 'quente',
    temperaturaLabel: '🔥 QUENTE',
    ordemEstudo: 4,
    horasSugeridas: 6,
    fasePresenca: 'Fase 1 (S1) · Fase 2 (S6) · Fase 3 (S11)',
    retomadasQtd: 3
  },
  {
    id: 'log-2',
    disciplinaId: 'logistica',
    numero: 2,
    nome: 'Modalidades de Transporte (Intermodalidade e Multimodalidade, ANTT/ANTAQ)',
    frequenciaHistorica: 'Média-Alta',
    temperatura: 'quente',
    temperaturaLabel: '🔥 QUENTE',
    ordemEstudo: 5,
    horasSugeridas: 4,
    fasePresenca: 'Fase 1 (S1) · Fase 2 (S6) · Fase 3 (S11)',
    retomadasQtd: 3,
    notaEstrategica: 'A Cesgranrio adora diferenciar transporte intermodal (múltiplos contratos/CT-e) de multimodal (um único OTM e conhecimento único).'
  },
  {
    id: 'log-4',
    disciplinaId: 'logistica',
    numero: 4,
    nome: 'Armazenagem (Tipos de armazéns, layout, organização e WMS)',
    frequenciaHistorica: 'Média',
    temperatura: 'morno',
    temperaturaLabel: '🌤️ MORNO',
    ordemEstudo: 6,
    horasSugeridas: 3,
    fasePresenca: 'Fase 1 (S2) · Fase 2 (S7) · Fase 3 (S12)',
    retomadasQtd: 3
  },
  {
    id: 'log-6',
    disciplinaId: 'logistica',
    numero: 6,
    nome: 'Embalagem e Unitização de Cargas (Pallets, contêineres, sustentabilidade)',
    frequenciaHistorica: 'Média-Baixa',
    temperatura: 'morno',
    temperaturaLabel: '🌤️ MORNO',
    ordemEstudo: 7,
    horasSugeridas: 2,
    fasePresenca: 'Fase 1 (S4) · Fase 2 (S9)',
    retomadasQtd: 2
  },
  {
    id: 'log-5',
    disciplinaId: 'logistica',
    numero: 5,
    nome: 'Manuseio de Materiais / Equipamentos de Movimentação e Automação',
    frequenciaHistorica: 'Baixa',
    temperatura: 'frio',
    temperaturaLabel: '❄️ FRIO',
    ordemEstudo: 8,
    horasSugeridas: 2,
    fasePresenca: 'Fase 1 (S4) · Fase 2 (S9)',
    retomadasQtd: 2
  },

  // FINANÇAS E CONTABILIDADE
  {
    id: 'fin-1',
    disciplinaId: 'financas',
    numero: 1,
    nome: 'Matemática Financeira (Descontos Simples/Compostos, Juros, Taxas e %)',
    frequenciaHistorica: 'Alta',
    temperatura: 'quente',
    temperaturaLabel: '🔥🔥 FERVENDO',
    ordemEstudo: 1,
    horasSugeridas: 14,
    fasePresenca: 'Presente nas 3 Fases (S1, S3, S5, S6, S8, S11, S13)',
    retomadasQtd: 7,
    notaEstrategica: 'Desconto comercial (por fora) x desconto racional (por dentro), juros simples, compostos e taxas nominais x efetivas rendem pontos rápidos.'
  },
  {
    id: 'fin-4',
    disciplinaId: 'financas',
    numero: 4,
    nome: 'Balanço Patrimonial e DRE (Estrutura, ordem de liquidez, relação)',
    frequenciaHistorica: 'Alta',
    temperatura: 'quente',
    temperaturaLabel: '🔥🔥 QUENTE',
    ordemEstudo: 2,
    horasSugeridas: 11,
    fasePresenca: 'Presente nas 3 Fases (S3, S5, S8, S10, S13)',
    retomadasQtd: 5,
    notaEstrategica: 'Entender a ordem de liquidez decrescente no Ativo e exigibilidade no Passivo, além de como o resultado da DRE vai para o PL no Balanço.'
  },
  {
    id: 'fin-3',
    disciplinaId: 'financas',
    numero: 3,
    nome: 'Demonstração dos Fluxos de Caixa (DFC: Método Direto × Indireto, Atividades)',
    frequenciaHistorica: 'Alta',
    temperatura: 'quente',
    temperaturaLabel: '🔥 QUENTE',
    ordemEstudo: 3,
    horasSugeridas: 8,
    fasePresenca: 'Presente nas 3 Fases (S3, S4, S8, S9, S13)',
    retomadasQtd: 5,
    notaEstrategica: 'Cesgranrio sempre pergunta a classificação das atividades (Operacionais, Investimento e Financiamento) e a diferença entre direto e indireto.'
  },
  {
    id: 'fin-2',
    disciplinaId: 'financas',
    numero: 2,
    nome: 'Registros Contábeis / Partidas Dobradas / Regime de Competência × Caixa',
    frequenciaHistorica: 'Média',
    temperatura: 'morno',
    temperaturaLabel: '🌤️ MORNO',
    ordemEstudo: 4,
    horasSugeridas: 6,
    fasePresenca: 'Fase 1 (S3) · Fase 2 (S8) · Fase 3 (S13)',
    retomadasQtd: 3
  },

  // PROCESSOS ADMINISTRATIVOS E LEGISLAÇÃO
  {
    id: 'proc-1',
    disciplinaId: 'processos_adm',
    numero: 1,
    nome: 'Recursos Humanos (R&S, Plano de Cargos, T&D&E, Desempenho 360º, CHA)',
    frequenciaHistorica: 'Alta',
    temperatura: 'quente',
    temperaturaLabel: '🔥🔥 QUENTE',
    ordemEstudo: 1,
    horasSugeridas: 12,
    fasePresenca: 'Presente nas 3 Fases (S3, S5, S8, S10, S13, S15)',
    retomadasQtd: 6,
    notaEstrategica: 'Recrutamento interno x externo, distinção entre Treinamento x Desenvolvimento x Educação e erros de avaliação (efeito halo, leniência).'
  },
  {
    id: 'proc-5',
    disciplinaId: 'processos_adm',
    numero: 5,
    nome: 'Gestão de Indicadores e ESG (Eficiência x Eficácia x Efetividade, KPI, BSC, ESG)',
    frequenciaHistorica: 'Média-Alta (Tema da Moda)',
    temperatura: 'quente',
    temperaturaLabel: '🔥 QUENTE / TEMA DO MOMENTO',
    ordemEstudo: 2,
    horasSugeridas: 8,
    fasePresenca: 'Presente nas 3 Fases (S4, S5, S9, S10, S14)',
    retomadasQtd: 5,
    notaEstrategica: 'ESG (Environmental, Social, Governance) é prioridade máxima em estatais como Transpetro e Petrobras. Saiba os 3 pilares e indicadores GRI.'
  },
  {
    id: 'proc-2',
    disciplinaId: 'processos_adm',
    numero: 2,
    nome: 'Sistema de Gestão Integrado (SGI: ISO 9001/14001/45001, Auditoria e Riscos)',
    frequenciaHistorica: 'Média-Alta',
    temperatura: 'quente',
    temperaturaLabel: '🔥 QUENTE',
    ordemEstudo: 3,
    horasSugeridas: 7,
    fasePresenca: 'Presente nas 3 Fases (S4, S9, S14)',
    retomadasQtd: 4,
    notaEstrategica: 'Pegadinha clássica: Ação corretiva (elimina a causa da não conformidade) vs Correção (ação imediata para conter o problema).'
  },
  {
    id: 'proc-3',
    disciplinaId: 'processos_adm',
    numero: 3,
    nome: 'Administração Patrimonial (Inventário, tombamento, depreciação linear)',
    frequenciaHistorica: 'Média',
    temperatura: 'morno',
    temperaturaLabel: '🌤️ MORNO',
    ordemEstudo: 4,
    horasSugeridas: 5,
    fasePresenca: 'Fase 1 (S4, S5) · Fase 2 (S9, S10) · Fase 3 (S14)',
    retomadasQtd: 4
  },
  {
    id: 'proc-4',
    disciplinaId: 'processos_adm',
    numero: 4,
    nome: 'Gestão da Manutenção (Preventiva × Corretiva × Preditiva × Detectiva, PCM)',
    frequenciaHistorica: 'Média',
    temperatura: 'morno',
    temperaturaLabel: '🌤️ MORNO',
    ordemEstudo: 5,
    horasSugeridas: 4,
    fasePresenca: 'Fase 1 (S4) · Fase 2 (S9) · Fase 3 (S14)',
    retomadasQtd: 3,
    notaEstrategica: 'MTBF (tempo médio entre falhas) e MTTR (tempo médio para reparo) e disponibilidade.'
  },

  // NOÇÕES DE INFORMÁTICA
  {
    id: 'inf-2',
    disciplinaId: 'informatica',
    numero: 2,
    nome: 'Microsoft Excel 2024 (Planilhas, Fórmulas SE, SOMASE, PROCV/PROCX, $)',
    frequenciaHistorica: 'Alta',
    temperatura: 'quente',
    temperaturaLabel: '🔥🔥 QUENTE',
    ordemEstudo: 1,
    horasSugeridas: 8,
    fasePresenca: 'Presente nas 3 Fases (S2, S5, S7, S10, S12, S15)',
    retomadasQtd: 6,
    notaEstrategica: 'Fórmulas lógicas, busca PROCV/PROCX e fixação de células com $ (referência absoluta e mista) caem em todas as provas de nível médio.'
  },
  {
    id: 'inf-4',
    disciplinaId: 'informatica',
    numero: 4,
    nome: 'Segurança da Informação + LGPD (Lei 13.709/2018 - Conceitos, Agentes, Bases)',
    frequenciaHistorica: 'Alta',
    temperatura: 'quente',
    temperaturaLabel: '🔥🔥 QUENTE (Melhor C/B)',
    ordemEstudo: 2,
    horasSugeridas: 7,
    fasePresenca: 'Presente nas 3 Fases (S2, S5, S7, S10, S12, S15)',
    retomadasQtd: 6,
    notaEstrategica: 'A LGPD é lei curta, cai de forma literal (dado pessoal x sensível, controlador x operador, ANPD). Alto retorno em pontos por hora!'
  },
  {
    id: 'inf-3',
    disciplinaId: 'informatica',
    numero: 3,
    nome: 'Internet, Intranet, Extranet e Navegadores (Atalhos, cookies, aba anônima)',
    frequenciaHistorica: 'Média',
    temperatura: 'morno',
    temperaturaLabel: '🌤️ MORNO',
    ordemEstudo: 3,
    horasSugeridas: 3,
    fasePresenca: 'Fase 1 (S2) · Fase 2 (S7) · Fase 3 (S12)',
    retomadasQtd: 3
  },
  {
    id: 'inf-1',
    disciplinaId: 'informatica',
    numero: 1,
    nome: 'Hardware/Software, Windows 11 e Manipulação de Arquivos',
    frequenciaHistorica: 'Média',
    temperatura: 'morno',
    temperaturaLabel: '🌤️ MORNO',
    ordemEstudo: 4,
    horasSugeridas: 3,
    fasePresenca: 'Fase 1 (S2) · Fase 2 (S7)',
    retomadasQtd: 2
  }
];

export const PARETO_MICRO: MicroSubtopico[] = [
  // COMPRAS E LICITAÇÕES (LOGÍSTICA)
  {
    id: 'sub-log-1',
    topicoId: 'log-7',
    disciplinaId: 'logistica',
    nome: 'Lei 14.133/2021 — Princípios fundamentais e definições (arts. 5º e 6º)',
    frequencia: 'Alta',
    dificuldade: 'Fácil',
    custoBeneficio: 5,
    incluir: 'Sim',
    horas: 3,
    detalhes: 'Conceitos de estudo técnico preliminar, matriz de riscos, seguro-garantia e novos princípios expressos (segregação de funções, planejamento).'
  },
  {
    id: 'sub-log-2',
    topicoId: 'log-7',
    disciplinaId: 'logistica',
    nome: 'Lei 14.133/2021 — Modalidades e critérios de julgamento',
    frequencia: 'Alta',
    dificuldade: 'Médio',
    custoBeneficio: 5,
    incluir: 'Sim',
    horas: 4,
    detalhes: 'Pregão (obrigatório para bens comuns), Concorrência, Concurso, Leilão e Diálogo Competitivo. Critérios de menor preço, maior desconto, etc.'
  },
  {
    id: 'sub-log-3',
    topicoId: 'log-7',
    disciplinaId: 'logistica',
    nome: 'Lei 14.133/2021 — Fases da licitação e inversão de fases',
    frequencia: 'Alta',
    dificuldade: 'Médio',
    custoBeneficio: 5,
    incluir: 'Sim',
    horas: 3,
    detalhes: 'Fase preparatória, divulgação do edital, apresentação de propostas, julgamento, habilitação, recursal e homologação.'
  },
  {
    id: 'sub-log-4',
    topicoId: 'log-7',
    disciplinaId: 'logistica',
    nome: 'Lei 14.133/2021 — Contratação direta: Dispensa × Inexigibilidade',
    frequencia: 'Alta',
    dificuldade: 'Médio',
    custoBeneficio: 5,
    incluir: 'Sim',
    horas: 4,
    detalhes: 'Inexigibilidade (inviabilidade de competição, fornecedor exclusivo, serviço técnico especializado) vs Dispensa (rol taxativo, limites de valor, emergência).'
  },
  {
    id: 'sub-log-5',
    topicoId: 'log-7',
    disciplinaId: 'logistica',
    nome: 'Lei 13.303/2016 arts. 28–41 — Licitação nas Estatais, Dispensa e Não Aplicação',
    frequencia: 'Alta',
    dificuldade: 'Médio',
    custoBeneficio: 5,
    incluir: 'Sim',
    horas: 4,
    detalhes: 'Regras específicas para Petrobras e Transpetro: hipóteses de não aplicação (atividade-fim, parcerias) e limites de dispensa de valor.'
  },
  {
    id: 'sub-log-6',
    topicoId: 'log-7',
    disciplinaId: 'logistica',
    nome: 'Lei 13.303/2016 arts. 42–67 — Procedimento, modos de disputa e matriz de riscos',
    frequencia: 'Alta',
    dificuldade: 'Médio-Difícil',
    custoBeneficio: 4,
    incluir: 'Sim',
    horas: 4,
    detalhes: 'Modos de disputa aberto, fechado ou combinado. Inversão automática de fases nas estatais.'
  },
  {
    id: 'sub-log-7',
    topicoId: 'log-7',
    disciplinaId: 'logistica',
    nome: 'Lei 13.303/2016 arts. 68–91 — Contratos, formalização, alterações e fiscalização',
    frequencia: 'Alta',
    dificuldade: 'Médio',
    custoBeneficio: 5,
    incluir: 'Sim',
    horas: 4,
    detalhes: 'Cláusulas obrigatórias, garantias, aditivos contratuais, sanções administrativas e rescisão.'
  },

  // GESTÃO DE ESTOQUES (LOGÍSTICA)
  {
    id: 'sub-log-8',
    topicoId: 'log-3',
    disciplinaId: 'logistica',
    nome: 'Curva ABC e classificação de materiais por valor e criticidade (XYZ/PQR)',
    frequencia: 'Alta',
    dificuldade: 'Fácil',
    custoBeneficio: 5,
    incluir: 'Sim',
    horas: 2.5,
    detalhes: 'Classe A (80% do valor, 20% dos itens), Classe B (15% valor, 30% itens), Classe C (5% valor, 50% itens).'
  },
  {
    id: 'sub-log-9',
    topicoId: 'log-3',
    disciplinaId: 'logistica',
    nome: 'Ponto de pedido, estoque de segurança, tempo de reposição (Lead Time)',
    frequencia: 'Alta',
    dificuldade: 'Médio',
    custoBeneficio: 5,
    incluir: 'Sim',
    horas: 3,
    detalhes: 'Fórmulas: PP = (Consumo Médio Diário x Lead Time) + Estoque de Segurança. Conceito de ruptura.'
  },
  {
    id: 'sub-log-10',
    topicoId: 'log-3',
    disciplinaId: 'logistica',
    nome: 'Giro e cobertura de estoques (fórmulas e interpretação)',
    frequencia: 'Alta',
    dificuldade: 'Fácil',
    custoBeneficio: 5,
    incluir: 'Sim',
    horas: 2,
    detalhes: 'Giro = Consumo / Estoque Médio; Cobertura = 1 / Giro (ou Estoque / Consumo por período).'
  },
  {
    id: 'sub-log-11',
    topicoId: 'log-3',
    disciplinaId: 'logistica',
    nome: 'Custos de estoque e Lote Econômico de Compra (LEC / EOQ)',
    frequencia: 'Média-Alta',
    dificuldade: 'Médio',
    custoBeneficio: 4,
    incluir: 'Sim',
    horas: 2.5,
    detalhes: 'Custo de armazenagem (posse) x Custo de pedido. Ponto de equilíbrio onde os dois custos se igualam.'
  },
  {
    id: 'sub-log-12',
    topicoId: 'log-3',
    disciplinaId: 'logistica',
    nome: 'Métodos de valoração de estoque: PEPS (FIFO), UEPS (LIFO) e Custo Médio Ponderado',
    frequencia: 'Média',
    dificuldade: 'Fácil',
    custoBeneficio: 4,
    incluir: 'Sim',
    horas: 2,
    detalhes: 'Impacto da inflação no lucro e no valor do estoque final com PEPS vs Custo Médio (UEPS não é aceito pelo fisco brasileiro).'
  },

  // GESTÃO DE CONTRATOS
  {
    id: 'sub-log-13',
    topicoId: 'log-8',
    disciplinaId: 'logistica',
    nome: 'Ciclo de vida contratual: Gestor do Contrato × Fiscal do Contrato',
    frequencia: 'Alta',
    dificuldade: 'Fácil',
    custoBeneficio: 5,
    incluir: 'Sim',
    horas: 3,
    detalhes: 'Diferença de atribuições: o fiscal atesta a execução e registra ocorrências; o gestor coordena os aspectos administrativos e aditivos.'
  },
  {
    id: 'sub-log-14',
    topicoId: 'log-8',
    disciplinaId: 'logistica',
    nome: 'Aditivos contratuais: Limites de 25% e 50% (reforma) e Apostilamento',
    frequencia: 'Alta',
    dificuldade: 'Médio',
    custoBeneficio: 5,
    incluir: 'Sim',
    horas: 3,
    detalhes: 'O que pode ser alterado por aditivo (qualitativo/quantitativo) vs o que é simples apostilamento (reajuste previsto, variação cambial).'
  },
  {
    id: 'sub-log-15',
    topicoId: 'log-8',
    disciplinaId: 'logistica',
    nome: 'Gestão de riscos contratuais, matriz de riscos e contratos digitais',
    frequencia: 'Média-Alta',
    dificuldade: 'Médio',
    custoBeneficio: 4,
    incluir: 'Sim',
    horas: 3,
    detalhes: 'Alocação de riscos entre contratante e contratado, equilíbrio econômico-financeiro.'
  },

  // MATEMÁTICA FINANCEIRA (FINANÇAS)
  {
    id: 'sub-fin-1',
    topicoId: 'fin-1',
    disciplinaId: 'financas',
    nome: 'Juros Simples e Juros Compostos (Cálculo de montante, taxa e prazo)',
    frequencia: 'Alta',
    dificuldade: 'Fácil',
    custoBeneficio: 5,
    incluir: 'Sim',
    horas: 4,
    detalhes: 'J = C.i.t / M = C(1+i)^t. Resolução rápida sem calculadora.'
  },
  {
    id: 'sub-fin-2',
    topicoId: 'fin-1',
    disciplinaId: 'financas',
    nome: 'Desconto Simples Comercial (por fora) × Desconto Simples Racional (por dentro)',
    frequencia: 'Alta',
    dificuldade: 'Médio',
    custoBeneficio: 5,
    incluir: 'Sim',
    horas: 4,
    detalhes: 'Db = N.i.t (aplicado sobre o valor nominal) vs Dr = A.i.t (aplicado sobre o valor atual).'
  },
  {
    id: 'sub-fin-3',
    topicoId: 'fin-1',
    disciplinaId: 'financas',
    nome: 'Taxas equivalentes, nominais, efetivas e taxa real (Fórmula de Fisher)',
    frequencia: 'Média-Alta',
    dificuldade: 'Médio',
    custoBeneficio: 4,
    incluir: 'Sim',
    horas: 3,
    detalhes: 'Conversão de taxas em regime composto e efeito da inflação sobre o ganho real.'
  },
  {
    id: 'sub-fin-4',
    topicoId: 'fin-1',
    disciplinaId: 'financas',
    nome: 'Porcentagem: Aumentos e descontos sucessivos, margens',
    frequencia: 'Alta',
    dificuldade: 'Fácil',
    custoBeneficio: 5,
    incluir: 'Sim',
    horas: 3,
    detalhes: 'Fatores multiplicadores (1+i) e (1-i), relação lucro sobre o custo x lucro sobre a venda.'
  },

  // CONTABILIDADE E BALANÇO (FINANÇAS)
  {
    id: 'sub-fin-5',
    topicoId: 'fin-4',
    disciplinaId: 'financas',
    nome: 'Estrutura do Balanço Patrimonial: Ativo, Passivo e PL',
    frequencia: 'Alta',
    dificuldade: 'Fácil',
    custoBeneficio: 5,
    incluir: 'Sim',
    horas: 4,
    detalhes: 'Ordem decrescente de liquidez no Ativo (Circulante, Realizável a Longo Prazo, Investimentos, Imobilizado, Intangível) e exigibilidade no Passivo.'
  },
  {
    id: 'sub-fin-6',
    topicoId: 'fin-4',
    disciplinaId: 'financas',
    nome: 'Estrutura da DRE: Da Receita Bruta ao Lucro Líquido',
    frequencia: 'Alta',
    dificuldade: 'Fácil',
    custoBeneficio: 5,
    incluir: 'Sim',
    horas: 4,
    detalhes: 'Receita Bruta - Deduções = Receita Líquida - CMV = Lucro Bruto - Despesas Operacionais = EBIT/LAJIR - Desp. Financeiras = LAIR - IR/CSLL = Lucro Líquido.'
  },
  {
    id: 'sub-fin-7',
    topicoId: 'fin-3',
    disciplinaId: 'financas',
    nome: 'Demonstração dos Fluxos de Caixa (DFC) Método Direto × Indireto',
    frequencia: 'Alta',
    dificuldade: 'Médio',
    custoBeneficio: 5,
    incluir: 'Sim',
    horas: 4,
    detalhes: 'No direto evidencia-se recebimentos e pagamentos brutos; no indireto parte-se do Lucro Líquido ajustando por itens que não afetam o caixa (depreciação).'
  },
  {
    id: 'sub-fin-8',
    topicoId: 'fin-2',
    disciplinaId: 'financas',
    nome: 'Classificação de contas, partidas dobradas (Débito e Crédito) e Regime de Competência',
    frequencia: 'Média-Alta',
    dificuldade: 'Fácil',
    custoBeneficio: 4,
    incluir: 'Sim',
    horas: 3,
    detalhes: 'Regra de ouro das contas: Débito aumenta Ativo e Despesa; Crédito aumenta Passivo, PL e Receita. Fatos contábeis permutativos e modificativos.'
  },

  // RECURSOS HUMANOS (PROCESSOS ADM)
  {
    id: 'sub-proc-1',
    topicoId: 'proc-1',
    disciplinaId: 'processos_adm',
    nome: 'Recrutamento Interno × Externo × Misto: Vantagens e desvantagens',
    frequencia: 'Alta',
    dificuldade: 'Fácil',
    custoBeneficio: 5,
    incluir: 'Sim',
    horas: 3,
    detalhes: 'Interno: mais barato, rápido, motiva o quadro; Externo: traz sangue novo, ideias inovadoras, custo maior.'
  },
  {
    id: 'sub-proc-2',
    topicoId: 'proc-1',
    disciplinaId: 'processos_adm',
    nome: 'Seleção por Competências e Modelo CHA (Conhecimento, Habilidade, Atitude)',
    frequencia: 'Alta',
    dificuldade: 'Fácil',
    custoBeneficio: 5,
    incluir: 'Sim',
    horas: 3,
    detalhes: 'Conhecimento (Saber), Habilidade (Saber fazer), Atitude (Querer fazer). Instrumentos de seleção.'
  },
  {
    id: 'sub-proc-3',
    topicoId: 'proc-1',
    disciplinaId: 'processos_adm',
    nome: 'Avaliação de Desempenho (90º, 180º, 360º) e Erros de Avaliação (Efeito Halo, Leniência)',
    frequencia: 'Alta',
    dificuldade: 'Médio',
    custoBeneficio: 5,
    incluir: 'Sim',
    horas: 3,
    detalhes: 'Efeito Halo (generalização positiva) / Horn (generalização negativa), tendência central, efeito de recentidade e leniência.'
  },
  {
    id: 'sub-proc-4',
    topicoId: 'proc-1',
    disciplinaId: 'processos_adm',
    nome: 'T&D&E: Diferença entre Treinamento × Desenvolvimento × Educação e Ciclo LNT',
    frequencia: 'Alta',
    dificuldade: 'Fácil',
    custoBeneficio: 5,
    incluir: 'Sim',
    horas: 3,
    detalhes: 'Treinamento (foco no cargo atual, curto prazo), Desenvolvimento (foco na carreira/futuro), Educação (visão holística/cidadã). Ciclo: LNT -> Desenho -> Execução -> Avaliação.'
  },

  // SGI, INDICADORES E ESG
  {
    id: 'sub-proc-5',
    topicoId: 'proc-2',
    disciplinaId: 'processos_adm',
    nome: 'Sistema de Gestão Integrado (SGI): Normas ISO 9001, ISO 14001 e ISO 45001',
    frequencia: 'Alta',
    dificuldade: 'Fácil',
    custoBeneficio: 5,
    incluir: 'Sim',
    horas: 2.5,
    detalhes: 'ISO 9001 (Qualidade), ISO 14001 (Gestão Ambiental), ISO 45001 (Saúde e Segurança Ocupacional). Estrutura de alto nível compartilhada.'
  },
  {
    id: 'sub-proc-6',
    topicoId: 'proc-2',
    disciplinaId: 'processos_adm',
    nome: 'Ciclo PDCA, Ação Corretiva × Preventiva × Correção e Auditoria Interna',
    frequencia: 'Alta',
    dificuldade: 'Fácil',
    custoBeneficio: 5,
    incluir: 'Sim',
    horas: 2.5,
    detalhes: 'PDCA (Plan, Do, Check, Act). Auditoria de 1ª parte (interna), 2ª parte (fornecedor/cliente) e 3ª parte (certificadora externa).'
  },
  {
    id: 'sub-proc-7',
    topicoId: 'proc-5',
    disciplinaId: 'processos_adm',
    nome: 'Indicadores de Desempenho: Eficiência × Eficácia × Efetividade, KPIs, SMART e BSC',
    frequencia: 'Alta',
    dificuldade: 'Fácil',
    custoBeneficio: 5,
    incluir: 'Sim',
    horas: 3,
    detalhes: 'Eficiência (fazer certo com menos recursos), Eficácia (atingir a meta), Efetividade (impacto real/mudança no ambiente). 4 perspectivas do BSC (Financeira, Clientes, Processos Internos, Aprendizado).'
  },
  {
    id: 'sub-proc-8',
    topicoId: 'proc-5',
    disciplinaId: 'processos_adm',
    nome: 'Indicadores ESG (Environmental, Social, Governance) e Relatórios GRI',
    frequencia: 'Média-Alta',
    dificuldade: 'Fácil',
    custoBeneficio: 5,
    incluir: 'Sim',
    horas: 2.5,
    detalhes: 'Os 3 pilares da sustentabilidade corporativa, métricas de pegada de carbono, equidade, governança corporativa e integridade.'
  },

  // PATRIMÔNIO E MANUTENÇÃO
  {
    id: 'sub-proc-9',
    topicoId: 'proc-3',
    disciplinaId: 'processos_adm',
    nome: 'Administração Patrimonial: Inventário, tombamento e depreciação linear (cálculo)',
    frequencia: 'Média-Alta',
    dificuldade: 'Fácil',
    custoBeneficio: 4,
    incluir: 'Sim',
    horas: 2.5,
    detalhes: 'Cálculo de depreciação linear: (Custo de Aquisição - Valor Residual) / Vida Útil. Conciliação físico-contábil.'
  },
  {
    id: 'sub-proc-10',
    topicoId: 'proc-4',
    disciplinaId: 'processos_adm',
    nome: 'Tipos de Manutenção: Preventiva × Preditiva × Corretiva × Detectiva e Indicadores PCM',
    frequencia: 'Média-Alta',
    dificuldade: 'Fácil',
    custoBeneficio: 4,
    incluir: 'Sim',
    horas: 2.5,
    detalhes: 'Preditiva (com sensores/vibração/termografia), Preventiva (por tempo/horas de uso), Corretiva (após falha). MTBF e MTTR.'
  },

  // INFORMÁTICA
  {
    id: 'sub-inf-1',
    topicoId: 'inf-4',
    disciplinaId: 'informatica',
    nome: 'LGPD (Lei 13.709/2018): Conceitos, dado pessoal × sensível, agentes e bases legais',
    frequencia: 'Alta',
    dificuldade: 'Fácil',
    custoBeneficio: 5,
    incluir: 'Sim',
    horas: 4,
    detalhes: 'Dado pessoal sensível (origem racial, saúde, biometria, etc.). Controlador (toma decisões) x Operador (executa). 10 bases legais e direitos do titular.'
  },
  {
    id: 'sub-inf-2',
    topicoId: 'inf-4',
    disciplinaId: 'informatica',
    nome: 'Segurança da Informação: Princípios CID, Malware (Ransomware, Phishing) e Backup',
    frequencia: 'Alta',
    dificuldade: 'Fácil',
    custoBeneficio: 5,
    incluir: 'Sim',
    horas: 3,
    detalhes: 'Confidencialidade, Integridade, Disponibilidade, Autenticidade, Não Repúdio. Diferença entre Phishing, Spyware e Ransomware.'
  },
  {
    id: 'sub-inf-3',
    topicoId: 'inf-2',
    disciplinaId: 'informatica',
    nome: 'Excel 2024: Fórmulas SE, SOMASE, CONT.SE, MÉDIA e Referências ($A$1)',
    frequencia: 'Alta',
    dificuldade: 'Médio',
    custoBeneficio: 5,
    incluir: 'Sim',
    horas: 4,
    detalhes: 'Uso do cifrão $ para travar linha ou coluna no arraste de fórmulas. Lógica condicional e contagens.'
  },
  {
    id: 'sub-inf-4',
    topicoId: 'inf-2',
    disciplinaId: 'informatica',
    nome: 'Excel 2024: PROCV e PROCX (sintaxe, busca exata vs aproximada)',
    frequencia: 'Alta',
    dificuldade: 'Médio',
    custoBeneficio: 5,
    incluir: 'Sim',
    horas: 4,
    detalhes: 'Sintaxe: =PROCV(valor_procurado; matriz_tabela; num_indice_coluna; [procurar_intervalo]). Vantagens do PROCX.'
  },
  {
    id: 'sub-inf-5',
    topicoId: 'inf-3',
    disciplinaId: 'informatica',
    nome: 'Windows 11, Navegadores (Atalhos, aba anônima, cookies) e Conceitos de Internet/Intranet',
    frequencia: 'Média',
    dificuldade: 'Fácil',
    custoBeneficio: 4,
    incluir: 'Sim',
    horas: 3,
    detalhes: 'Atalhos essenciais do teclado (Ctrl+Shift+N, Win+E, Win+D), diferença entre internet (pública) e intranet (privada corporativa).'
  }
];
