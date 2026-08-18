export type PrioridadeNivel = 'ALTA' | 'MEDIA' | 'BAIXA' | 'CORTE';

export type MacroDivisaoId = 'logistica' | 'financas' | 'processos_adm' | 'informatica';

export interface MacroDivisaoInfo {
  id: MacroDivisaoId;
  numero: number;
  nome: string;
  nomeCurto: string;
  subtitulo: string;
  questoesEstimadas: string;
  pesoParetoGeral: string;
  icone: string; // 'Truck' | 'DollarSign' | 'FileCheck' | 'Laptop'
  descricao: string;
  focoPrincipal: string[];
  destaqueLegislacao?: string;
}

export const MACRO_DIVISOES: MacroDivisaoInfo[] = [
  {
    id: 'processos_adm',
    numero: 1,
    nome: 'Processos Adm. & Legislação',
    nomeCurto: 'Processos Adm. & Legislação',
    subtitulo: 'Gestão de RH, Sistema Integrado (ISO 9001/14001/45001), Indicadores ESG e Patrimônio',
    questoesEstimadas: '10 a 12 questões na prova',
    pesoParetoGeral: '25% do total da prova',
    icone: 'FileCheck',
    descricao: 'Tópicos essenciais sobre a governança e operação diária: Modelo CHA, Avaliação 360º, normas do SGI, auditorias de 1ª/2ª/3ª parte, Balanced Scorecard, metas SMART, práticas ESG, tombamento e manutenção.',
    focoPrincipal: [
      'Modelo de Competências CHA e Recrutamento Interno/Externo',
      'Avaliação de Desempenho (360º) e Efeito Halo/Horn',
      'SGI: ISO 9001, ISO 14001 e ISO 45001 (Ciclo PDCA)',
      'Auditorias de 1ª, 2ª e 3ª Parte e Ação Corretiva',
      'Indicadores (Eficiência, Eficácia, Efetividade) e ESG'
    ],
    destaqueLegislacao: 'Normas ISO 9001/14001/45001 & ESG'
  },
  {
    id: 'logistica',
    numero: 2,
    nome: 'Logística & Gestão de Suprimentos',
    nomeCurto: 'Logística & Gestão de Suprimentos',
    subtitulo: 'Gestão da Cadeia de Suprimentos, Compras Públicas, Contratos e Estoques',
    questoesEstimadas: '14 a 16 questões na prova',
    pesoParetoGeral: '37,5% do total da prova',
    icone: 'Truck',
    descricao: 'Macroárea central das atribuições da Transpetro. Concentra os tópicos de maior peso da prova: Lei das Estatais (13.303), Nova Lei de Licitações (14.133), Fiscalização de Contratos, Curva ABC e Ponto de Pedido.',
    focoPrincipal: [
      'Lei das Estatais nº 13.303/2016 (arts. 28-91)',
      'Nova Lei de Licitações nº 14.133/2021',
      'Fiscalização Técnica vs Administrativa de Contratos',
      'Curva ABC, Estoque de Segurança e Ponto de Pedido (PP)',
      'Modalidades de Transporte e Intermodalidade'
    ],
    destaqueLegislacao: 'Lei 13.303/16 (arts. 28-91) & Lei 14.133/21'
  },
  {
    id: 'financas',
    numero: 3,
    nome: 'Finanças & Contabilidade',
    nomeCurto: 'Finanças & Contabilidade',
    subtitulo: 'Matemática Financeira, DFC, Balanço Patrimonial, DRE e Princípios Contábeis',
    questoesEstimadas: '10 a 12 questões na prova',
    pesoParetoGeral: '27,5% do total da prova',
    icone: 'DollarSign',
    descricao: 'Área com alto índice de repetição e fórmulas exatas na Cesgranrio. O domínio de DFC (Métodos Direto x Indireto), estrutura do Balanço/DRE e cálculos de Juros e Descontos garante pontos decisivos.',
    focoPrincipal: [
      'Juros Simples e Compostos sem calculadora',
      'Desconto Comercial (Por Fora) vs Racional (Por Dentro)',
      'DFC: Fluxos Operacionais, Investimento e Financiamento',
      'Balanço Patrimonial por ordem de Liquidez e Exigibilidade',
      'DRE e Apuração do Lucro Líquido (Lei 6.404/76)'
    ],
    destaqueLegislacao: 'NBC TG 03 / CPC 03 & Lei 6.404/76'
  },
  {
    id: 'informatica',
    numero: 4,
    nome: 'Informática & Segurança de Dados',
    nomeCurto: 'Informática & Segurança de Dados',
    subtitulo: 'LGPD (Lei 13.709/2018), Segurança da Informação, Excel 2024 e Sistemas Operacionais',
    questoesEstimadas: '4 a 6 questões na prova',
    pesoParetoGeral: '10% do total da prova',
    icone: 'Laptop',
    descricao: 'O melhor custo/benefício do edital: conteúdo enxuto com alto índice de acerto. Prioridade total na LGPD (artigos 5º e 7º), princípios CID, ameaças cibernéticas (Ransomware/Phishing) e fórmulas do Excel (PROCV, PROCX, SOMASE, SE).',
    focoPrincipal: [
      'LGPD nº 13.709/2018: Dado Sensível, Controlador, Operador, DPO',
      'Princípios CID: Confidencialidade, Integridade, Disponibilidade',
      'Ameaças: Ransomware, Phishing, Spyware e Política de Backup',
      'Microsoft Excel 2024: PROCV, PROCX, SOMASE, SE e Fixação ($)'
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
  // ================= 1. LOGÍSTICA E GESTÃO DA CADEIA DE SUPRIMENTOS =================
  {
    id: 'ev-log-1',
    codigoEdital: 'Esp. 7.3',
    disciplina: 'Logística / Compras',
    disciplinaMacro: 'logistica',
    topicoPrincipal: '7. Gestão de Compras e Contratações',
    subtopico: 'Lei das Estatais (Lei nº 13.303/2016) — arts. 28 a 91 (Regime Jurídico, Licitações e Contratos)',
    prioridade: 'ALTA',
    prioridadeLabel: '🔥 Prioridade Máxima (Top 1 da Prova)',
    pesoPareto: 10,
    incidenciaEstimada: '100% de Certeza (4-6 questões)',
    dificuldade: 'Média',
    artigoOuNorma: 'Lei 13.303/2016 arts. 28-91',
    resumoEstrategico: 'Único tópico do Anexo IV que cita artigos específicos de lei. Focar em: dispensa por valor (art. 29), não aplicação na atividade-fim (art. 28), modos de disputa aberto/fechado, inversão de fases e limites de aditivos (25%/50%).',
    palavrasChave: ['13.303', 'estatais', 'dispensa', 'inexigibilidade', 'aditivos 25%', 'modos de disputa']
  },
  {
    id: 'ev-log-2',
    codigoEdital: 'Esp. 7.1 / 7.2',
    disciplina: 'Logística / Compras',
    disciplinaMacro: 'logistica',
    topicoPrincipal: '7. Gestão de Compras e Contratações',
    subtopico: 'Nova Lei de Licitações (Lei nº 14.133/2021) — Princípios, Modalidades, Critérios de Julgamento e Contratação Direta',
    prioridade: 'ALTA',
    prioridadeLabel: '🔥 Prioridade Máxima (Essencial)',
    pesoPareto: 9,
    incidenciaEstimada: 'Muito Alta (3-4 questões)',
    dificuldade: 'Média',
    artigoOuNorma: 'Lei 14.133/2021 arts. 5º, 6º, 28, 74, 75',
    resumoEstrategico: 'Dominar as 5 modalidades (Pregão, Concorrência, Concurso, Leilão, Diálogo Competitivo), Inexigibilidade (art. 74 - inviabilidade de competição) vs Dispensa (art. 75 - baixo valor/emergência).',
    palavrasChave: ['14.133', 'pregão', 'diálogo competitivo', 'inexigibilidade', 'dispensa', 'princípios']
  },
  {
    id: 'ev-log-3',
    codigoEdital: 'Esp. 8.1 / 8.2',
    disciplina: 'Logística / Contratos',
    disciplinaMacro: 'logistica',
    topicoPrincipal: '8. Gestão de Contratos',
    subtopico: 'Ciclo de Vida do Contrato, Fiscalização Técnica × Administrativa e Gestor do Contrato',
    prioridade: 'ALTA',
    prioridadeLabel: '🔥 Prioridade Máxima (Atribuição do Cargo)',
    pesoPareto: 9,
    incidenciaEstimada: 'Muito Alta (2-3 questões)',
    dificuldade: 'Fácil',
    artigoOuNorma: 'Anexo III Edital / Lei 13.303 art. 68+',
    resumoEstrategico: 'Atribuição nuclear no edital da Transpetro. Fiscal técnico avalia execução/qualidade; Fiscal administrativo avalia encargos trabalhistas/previdenciários; Gestor coordena aditivos e penalidades.',
    palavrasChave: ['fiscalização', 'fiscal técnico', 'fiscal administrativo', 'gestor', 'ateste nota fiscal']
  },
  {
    id: 'ev-log-4',
    codigoEdital: 'Esp. 8.3 / 8.4',
    disciplina: 'Logística / Contratos',
    disciplinaMacro: 'logistica',
    topicoPrincipal: '8. Gestão de Contratos',
    subtopico: 'Alterações Contratuais, Aditivos (25%/50%), Apostilamento, Reajuste, Repactuação e Equilíbrio Econômico',
    prioridade: 'ALTA',
    prioridadeLabel: '🔥 Prioridade Alta',
    pesoPareto: 8,
    incidenciaEstimada: 'Alta (2 questões)',
    dificuldade: 'Média',
    artigoOuNorma: 'Lei 13.303 / 14.133',
    resumoEstrategico: 'Diferenciar Termo Aditivo (alteração substantiva com limite de 25% em compras/serviços e 50% em reformas) de Apostilamento (simples registro de reajuste por índice contratual, sem alterar cláusula).',
    palavrasChave: ['aditivo', 'apostilamento', 'reajuste', 'repactuação', '25%', '50%']
  },
  {
    id: 'ev-log-5',
    codigoEdital: 'Esp. 3.1 / 3.2',
    disciplina: 'Logística / Estoques',
    disciplinaMacro: 'logistica',
    topicoPrincipal: '3. Gestão de Estoques',
    subtopico: 'Curva ABC (Princípio de Pareto) e Classificação por Criticidade (XYZ) e Perecibilidade (PQR)',
    prioridade: 'ALTA',
    prioridadeLabel: '🔥 Prioridade Alta (Questão Certa)',
    pesoPareto: 9,
    incidenciaEstimada: 'Muito Alta (2 questões)',
    dificuldade: 'Fácil',
    resumoEstrategico: 'Classe A: 80% do valor e 20% dos itens (controle rígido); Classe B: 15% valor e 30% itens; Classe C: 5% valor e 50% itens (controle simples). XYZ: Z é vital para a operação da Transpetro.',
    palavrasChave: ['curva ABC', 'pareto 80/20', 'classe A', 'classe B', 'classe C', 'criticidade XYZ']
  },
  {
    id: 'ev-log-6',
    codigoEdital: 'Esp. 3.3 / 3.4',
    disciplina: 'Logística / Estoques',
    disciplinaMacro: 'logistica',
    topicoPrincipal: '3. Gestão de Estoques',
    subtopico: 'Ponto de Pedido (PP), Estoque de Segurança (ES), Lead Time, Giro e Cobertura de Estoques',
    prioridade: 'ALTA',
    prioridadeLabel: '🔥 Prioridade Alta',
    pesoPareto: 8,
    incidenciaEstimada: 'Alta (1-2 questões)',
    dificuldade: 'Média',
    resumoEstrategico: 'Fórmula: PP = (Consumo Médio Diário × Tempo de Reposição) + Estoque de Segurança. Giro = Consumo / Estoque Médio. Cobertura = Estoque / Demanda por período.',
    palavrasChave: ['ponto de pedido', 'lead time', 'estoque de segurança', 'giro de estoque', 'cobertura']
  },
  {
    id: 'ev-log-7',
    codigoEdital: 'Esp. 3.5 / 3.6',
    disciplina: 'Logística / Estoques',
    disciplinaMacro: 'logistica',
    topicoPrincipal: '3. Gestão de Estoques',
    subtopico: 'Lote Econômico de Compra (LEC / EOQ) e Métodos de Valoração (PEPS / FIFO, UEPS, Custo Médio)',
    prioridade: 'MEDIA',
    prioridadeLabel: '⚡ Prioridade Média (Cálculo Direto)',
    pesoPareto: 7,
    incidenciaEstimada: 'Média-Alta (1 questão)',
    dificuldade: 'Média',
    resumoEstrategico: 'No LEC, Custo de Pedido = Custo de Armazenagem/Posse. PEPS: primeiro a entrar é o primeiro a sair (em inflação, gera maior lucro contábil). Custo Médio Ponderado é o mais adotado no Brasil.',
    palavrasChave: ['LEC', 'EOQ', 'PEPS', 'FIFO', 'custo médio ponderado', 'custo de posse']
  },
  {
    id: 'ev-log-8',
    codigoEdital: 'Esp. 1.1 / 1.2',
    disciplina: 'Logística / SCM',
    disciplinaMacro: 'logistica',
    topicoPrincipal: '1. Conceitos de Logística e SCM',
    subtopico: 'Supply Chain Management Integrado, Logística Reversa, Logística Verde e Tecnologias Emergentes',
    prioridade: 'MEDIA',
    prioridadeLabel: '⚡ Prioridade Média',
    pesoPareto: 6,
    incidenciaEstimada: 'Média (1 questão)',
    dificuldade: 'Fácil',
    resumoEstrategico: 'Logística Verde foca na redução de carbono e embalagens sustentáveis. Logística reversa: pós-venda (garantia/defeitos) vs pós-consumo (descarte ecológico e reciclagem).',
    palavrasChave: ['SCM', 'logística reversa', 'logística verde', 'RFID', 'rastreabilidade']
  },
  {
    id: 'ev-log-9',
    codigoEdital: 'Esp. 2.1 / 2.2',
    disciplina: 'Logística / Transportes',
    disciplinaMacro: 'logistica',
    topicoPrincipal: '2. Modalidades de Transporte',
    subtopico: 'Modais de Transporte, Intermodalidade × Multimodalidade (OTM) e Órgãos Reguladores (ANTT, ANTAQ)',
    prioridade: 'MEDIA',
    prioridadeLabel: '⚡ Prioridade Média',
    pesoPareto: 6,
    incidenciaEstimada: 'Média (1 questão)',
    dificuldade: 'Fácil',
    resumoEstrategico: 'Intermodal: mais de um modal com contratos separados e múltiplos CT-e. Multimodal: Operador de Transporte Multimodal (OTM) com responsabilidade única porta-a-porta e CTMC.',
    palavrasChave: ['intermodal', 'multimodal', 'OTM', 'dutoviário', 'aquaviário', 'ANTT', 'ANTAQ']
  },
  {
    id: 'ev-log-10',
    codigoEdital: 'Esp. 4.1 / 4.2',
    disciplina: 'Logística / Armazenagem',
    disciplinaMacro: 'logistica',
    topicoPrincipal: '4. Armazenagem de Materiais',
    subtopico: 'Tipos de Armazéns, Layout Físico, Endereçamento e Sistemas WMS (Warehouse Management System)',
    prioridade: 'BAIXA',
    prioridadeLabel: '❄️ Prioridade Baixa (Leitura Rápida)',
    pesoPareto: 4,
    incidenciaEstimada: 'Baixa (0-1 questão)',
    dificuldade: 'Fácil',
    resumoEstrategico: 'Conceito de WMS para controle de posições e picking. Layout focado em redução de distância percorrida e fluxo contínuo.',
    palavrasChave: ['WMS', 'armazém', 'layout', 'endereçamento', 'picking']
  },
  {
    id: 'ev-log-11',
    codigoEdital: 'Esp. 5 / 6',
    disciplina: 'Logística / Embalagem',
    disciplinaMacro: 'logistica',
    topicoPrincipal: '5 e 6. Manuseio, Embalagem e Unitização',
    subtopico: 'Equipamentos de Movimentação, Paletes PBR, Contêineres e Unitização de Cargas',
    prioridade: 'CORTE',
    prioridadeLabel: '❌ Corte / Trade-off (Não Perder Horas)',
    pesoPareto: 2,
    incidenciaEstimada: 'Rara (<5%)',
    dificuldade: 'Fácil',
    resumoEstrategico: 'Apenas saber que palete PBR é 1000x1200mm e unitização agrupa mercadorias para facilitar movimentação. Não estudar catálogos de empilhadeiras ou guindastes.',
    palavrasChave: ['palete PBR', 'unitização', 'contêiner']
  },

  // ================= 2. FINANÇAS E CONTABILIDADE =================
  {
    id: 'ev-fin-1',
    codigoEdital: 'Esp. 9.1',
    disciplina: 'Finanças / Matemática Financeira',
    disciplinaMacro: 'financas',
    topicoPrincipal: '9. Matemática Financeira',
    subtopico: 'Juros Simples (J = C·i·t, M = C + J) e Juros Compostos (M = C·(1+i)ᵗ)',
    prioridade: 'ALTA',
    prioridadeLabel: '🔥 Prioridade Máxima (Cálculo Obrigatório)',
    pesoPareto: 9,
    incidenciaEstimada: 'Muito Alta (2 questões)',
    dificuldade: 'Fácil',
    resumoEstrategico: 'Garantir que a taxa e o tempo estejam na mesma unidade. Treinar potências para t=2 e t=3 sem calculadora. Regra de três e porcentagem aplicadas.',
    palavrasChave: ['juros simples', 'juros compostos', 'montante', 'capital', 'taxa', 'tempo']
  },
  {
    id: 'ev-fin-2',
    codigoEdital: 'Esp. 9.2',
    disciplina: 'Finanças / Matemática Financeira',
    disciplinaMacro: 'financas',
    topicoPrincipal: '9. Matemática Financeira',
    subtopico: 'Desconto Simples Comercial / Bancário (Por Fora) × Desconto Simples Racional (Por Dentro)',
    prioridade: 'ALTA',
    prioridadeLabel: '🔥 Prioridade Alta (Pegadinha Típica)',
    pesoPareto: 8,
    incidenciaEstimada: 'Alta (1-2 questões)',
    dificuldade: 'Média',
    resumoEstrategico: 'Comercial (Db = N·i·t, sobre o valor nominal). Racional (Dr = A·i·t, sobre o valor atual). Para o mesmo título, Db é sempre maior que Dr.',
    palavrasChave: ['desconto comercial', 'desconto racional', 'por fora', 'por dentro', 'valor nominal', 'valor atual']
  },
  {
    id: 'ev-fin-3',
    codigoEdital: 'Esp. 9.3',
    disciplina: 'Finanças / Matemática Financeira',
    disciplinaMacro: 'financas',
    topicoPrincipal: '9. Matemática Financeira',
    subtopico: 'Taxas Equivalentes, Nominais, Efetivas e Taxa Real (Inflação / Equação de Fisher)',
    prioridade: 'MEDIA',
    prioridadeLabel: '⚡ Prioridade Média',
    pesoPareto: 7,
    incidenciaEstimada: 'Média (1 questão)',
    dificuldade: 'Média',
    resumoEstrategico: 'Taxa nominal possui período de capitalização diferente do prazo enunciado (ex: 12% a.a. com capitalização mensal = 1% a.m. efetiva). (1 + i_aparente) = (1 + i_real) · (1 + inflação).',
    palavrasChave: ['taxa nominal', 'taxa efetiva', 'taxa real', 'inflação', 'taxas proporcionais']
  },
  {
    id: 'ev-fin-4',
    codigoEdital: 'Esp. 12.1',
    disciplina: 'Finanças / Contabilidade',
    disciplinaMacro: 'financas',
    topicoPrincipal: '12. Balanço Patrimonial e DRE',
    subtopico: 'Estrutura do Balanço Patrimonial: Ativo (Ordem de Liquidez), Passivo (Exigibilidade) e Patrimônio Líquido',
    prioridade: 'ALTA',
    prioridadeLabel: '🔥 Prioridade Máxima',
    pesoPareto: 9,
    incidenciaEstimada: 'Muito Alta (2 questões)',
    dificuldade: 'Fácil',
    artigoOuNorma: 'Lei 6.404/76 e NBC TG',
    resumoEstrategico: 'Ativo Circulante, Realizável a Longo Prazo, Investimentos, Imobilizado e Intangível. Ativo é ordenado por liquidez decrescente; Passivo por ordem decrescente de exigibilidade.',
    palavrasChave: ['balanço patrimonial', 'ativo circulante', 'não circulante', 'passivo', 'patrimônio líquido', 'liquidez']
  },
  {
    id: 'ev-fin-5',
    codigoEdital: 'Esp. 12.2',
    disciplina: 'Finanças / Contabilidade',
    disciplinaMacro: 'financas',
    topicoPrincipal: '12. Balanço Patrimonial e DRE',
    subtopico: 'Estrutura da DRE (Demonstração do Resultado do Exercício) e Apuração do Lucro Líquido',
    prioridade: 'ALTA',
    prioridadeLabel: '🔥 Prioridade Alta',
    pesoPareto: 8,
    incidenciaEstimada: 'Alta (1-2 questões)',
    dificuldade: 'Fácil',
    artigoOuNorma: 'Lei 6.404/76 art. 187',
    resumoEstrategico: 'Receita Bruta - Deduções = Receita Líquida - CMV = Lucro Bruto - Despesas Operacionais = Lucro Operacional (EBIT) +/- Resultado Financeiro = LAIR - IR/CSLL = Lucro Líquido.',
    palavrasChave: ['DRE', 'receita líquida', 'CMV', 'lucro bruto', 'lucro operacional', 'lucro líquido']
  },
  {
    id: 'ev-fin-6',
    codigoEdital: 'Esp. 11.1 / 11.2',
    disciplina: 'Finanças / Contabilidade',
    disciplinaMacro: 'financas',
    topicoPrincipal: '11. Demonstração dos Fluxos de Caixa (DFC)',
    subtopico: 'DFC: Classificação das Atividades (Operacionais, Investimento, Financiamento) e Métodos Direto × Indireto',
    prioridade: 'ALTA',
    prioridadeLabel: '🔥 Prioridade Máxima (Certeza na Prova)',
    pesoPareto: 9,
    incidenciaEstimada: 'Muito Alta (2 questões)',
    dificuldade: 'Média',
    artigoOuNorma: 'NBC TG 03 / CPC 03',
    resumoEstrategico: 'Operacionais: dia a dia da empresa; Investimento: compra/venda de imobilizado/intangível; Financiamento: empréstimos, aporte de capital, pagamento de dividendos. Indireto: Lucro Líquido + Depreciação (sem saída de caixa) +/- variação de capital de giro.',
    palavrasChave: ['DFC', 'método direto', 'método indireto', 'atividades operacionais', 'investimento', 'financiamento']
  },
  {
    id: 'ev-fin-7',
    codigoEdital: 'Esp. 10.1 / 10.2',
    disciplina: 'Finanças / Contabilidade',
    disciplinaMacro: 'financas',
    topicoPrincipal: '10. Registros Contábeis e Princípios',
    subtopico: 'Método das Partidas Dobradas (Débito e Crédito) e Regime de Competência × Regime de Caixa',
    prioridade: 'MEDIA',
    prioridadeLabel: '⚡ Prioridade Média',
    pesoPareto: 7,
    incidenciaEstimada: 'Média (1 questão)',
    dificuldade: 'Fácil',
    resumoEstrategico: 'Débito: aplicação de recursos (aumenta Ativo e Despesa). Crédito: origem de recursos (aumenta Passivo, PL e Receita). Regime de Competência registra na ocorrência do fato gerador, independentemente do pagamento.',
    palavrasChave: ['partidas dobradas', 'débito', 'crédito', 'regime de competência', 'regime de caixa']
  },

  // ================= 3. PROCESSOS ADMINISTRATIVOS E LEGISLAÇÃO =================
  {
    id: 'ev-proc-1',
    codigoEdital: 'Esp. 13.1 / 13.2',
    disciplina: 'Processos Adm / RH',
    disciplinaMacro: 'processos_adm',
    topicoPrincipal: '13. Gestão de Recursos Humanos',
    subtopico: 'Recrutamento Interno × Externo, Técnicas de Seleção e Modelo de Competências CHA (Conhecimento, Habilidade, Atitude)',
    prioridade: 'ALTA',
    prioridadeLabel: '🔥 Prioridade Máxima',
    pesoPareto: 9,
    incidenciaEstimada: 'Muito Alta (2 questões)',
    dificuldade: 'Fácil',
    resumoEstrategico: 'Interno: valoriza quadro, econômico, mas pode criar estagnação. Externo: renovação e inovação, mas mais demorado e caro. CHA: Conhecimento (Saber), Habilidade (Saber fazer), Atitude (Querer fazer).',
    palavrasChave: ['recrutamento interno', 'recrutamento externo', 'CHA', 'seleção por competências']
  },
  {
    id: 'ev-proc-2',
    codigoEdital: 'Esp. 13.3 / 13.4',
    disciplina: 'Processos Adm / RH',
    disciplinaMacro: 'processos_adm',
    topicoPrincipal: '13. Gestão de Recursos Humanos',
    subtopico: 'Avaliação de Desempenho (90º, 180º, 360º), Erros de Avaliação (Efeito Halo/Horn) e T&D&E (Treinamento × Desenvolvimento × Educação)',
    prioridade: 'ALTA',
    prioridadeLabel: '🔥 Prioridade Alta',
    pesoPareto: 8,
    incidenciaEstimada: 'Alta (2 questões)',
    dificuldade: 'Fácil',
    resumoEstrategico: 'Avaliação 360º envolve superiores, pares, subordinados e clientes. Efeito Halo: generalizar um ponto positivo para toda a nota. Treinamento: foco no cargo atual (curto prazo); Desenvolvimento: foco na carreira (médio prazo); Educação: cidadania e visão integral (longo prazo).',
    palavrasChave: ['avaliação 360 graus', 'efeito halo', 'leniência', 'treinamento', 'desenvolvimento', 'LNT']
  },
  {
    id: 'ev-proc-3',
    codigoEdital: 'Esp. 13.5',
    disciplina: 'Processos Adm / RH',
    disciplinaMacro: 'processos_adm',
    topicoPrincipal: '13. Gestão de Recursos Humanos',
    subtopico: 'Plano de Cargos, Salários e Carreira: Promoção × Progressão e Carreira em Y',
    prioridade: 'MEDIA',
    prioridadeLabel: '⚡ Prioridade Média',
    pesoPareto: 6,
    incidenciaEstimada: 'Média (1 questão)',
    dificuldade: 'Fácil',
    resumoEstrategico: 'Carreira em Y permite ao profissional ascender profissionalmente como Especialista Técnico ou como Gestor/Líder de Pessoas com remuneração equivalente.',
    palavrasChave: ['carreira em Y', 'promoção', 'progressão', 'especialista técnico']
  },
  {
    id: 'ev-proc-4',
    codigoEdital: 'Esp. 14.1 / 14.2',
    disciplina: 'Processos Adm / SGI',
    disciplinaMacro: 'processos_adm',
    topicoPrincipal: '14. Sistema de Gestão Integrado (SGI)',
    subtopico: 'Normas ISO 9001 (Qualidade), ISO 14001 (Meio Ambiente) e ISO 45001 (Saúde e Segurança Ocupacional)',
    prioridade: 'ALTA',
    prioridadeLabel: '🔥 Prioridade Alta (Essencial na Transpetro)',
    pesoPareto: 8,
    incidenciaEstimada: 'Alta (1-2 questões)',
    dificuldade: 'Fácil',
    resumoEstrategico: 'ISO 9001: foco na satisfação do cliente; ISO 14001: aspectos e impactos ambientais; ISO 45001: perigos e riscos de segurança e saúde no trabalho. Estrutura de Alto Nível (Anexo SL) compartilhada.',
    palavrasChave: ['ISO 9001', 'ISO 14001', 'ISO 45001', 'SGI', 'política integrada']
  },
  {
    id: 'ev-proc-5',
    codigoEdital: 'Esp. 14.3 / 14.4',
    disciplina: 'Processos Adm / SGI',
    disciplinaMacro: 'processos_adm',
    topicoPrincipal: '14. Sistema de Gestão Integrado (SGI)',
    subtopico: 'Ciclo PDCA, Auditorias Internas (1ª, 2ª e 3ª Parte) e Ação Corretiva × Correção',
    prioridade: 'ALTA',
    prioridadeLabel: '🔥 Prioridade Alta',
    pesoPareto: 8,
    incidenciaEstimada: 'Alta (1 questão)',
    dificuldade: 'Fácil',
    resumoEstrategico: 'Correção: eliminação imediata da não conformidade. Ação Corretiva: eliminação da causa-raiz para evitar repetição. Auditoria 1ª parte (interna), 2ª parte (em fornecedores) e 3ª parte (certificação oficial).',
    palavrasChave: ['PDCA', 'ação corretiva', 'correção', 'não conformidade', 'auditoria interna']
  },
  {
    id: 'ev-proc-6',
    codigoEdital: 'Esp. 17.1 / 17.2',
    disciplina: 'Processos Adm / Indicadores e ESG',
    disciplinaMacro: 'processos_adm',
    topicoPrincipal: '17. Indicadores de Gestão e Sustentabilidade',
    subtopico: 'Indicadores (Eficiência × Eficácia × Efetividade, KPIs, SMART, Balanced Scorecard) e Práticas ESG',
    prioridade: 'ALTA',
    prioridadeLabel: '🔥 Prioridade Alta (Tema do Momento)',
    pesoPareto: 9,
    incidenciaEstimada: 'Muito Alta (2 questões)',
    dificuldade: 'Fácil',
    resumoEstrategico: 'Eficiência (fazer com menor custo/processos), Eficácia (atingir a meta/resultados), Efetividade (impacto real transformador). BSC: 4 perspectivas (Financeira, Clientes, Processos, Aprendizado). ESG: Ambiental, Social e Governança.',
    palavrasChave: ['eficiência', 'eficácia', 'efetividade', 'BSC', 'ESG', 'KPI', 'sustentabilidade']
  },
  {
    id: 'ev-proc-7',
    codigoEdital: 'Esp. 15.1',
    disciplina: 'Processos Adm / Patrimônio',
    disciplinaMacro: 'processos_adm',
    topicoPrincipal: '15. Administração Patrimonial',
    subtopico: 'Inventário Patrimonial, Tombamento, Classificação de Bens e Cálculo de Depreciação Linear',
    prioridade: 'MEDIA',
    prioridadeLabel: '⚡ Prioridade Média',
    pesoPareto: 6,
    incidenciaEstimada: 'Média (1 questão)',
    dificuldade: 'Fácil',
    resumoEstrategico: 'Tombamento: identificação e registro individual do bem permanente. Depreciação Linear = (Custo de Aquisição - Valor Residual) / Vida Útil.',
    palavrasChave: ['tombamento', 'inventário patrimonial', 'depreciação linear', 'vida útil', 'valor residual']
  },
  {
    id: 'ev-proc-8',
    codigoEdital: 'Esp. 16.1',
    disciplina: 'Processos Adm / Manutenção',
    disciplinaMacro: 'processos_adm',
    topicoPrincipal: '16. Gestão da Manutenção',
    subtopico: 'Tipos de Manutenção (Preventiva, Preditiva, Corretiva, Detectiva) e Indicadores PCM (MTBF, MTTR, Disponibilidade)',
    prioridade: 'MEDIA',
    prioridadeLabel: '⚡ Prioridade Média',
    pesoPareto: 6,
    incidenciaEstimada: 'Média (1 questão)',
    dificuldade: 'Fácil',
    resumoEstrategico: 'Preditiva usa medições técnicas (vibração, termografia) antes da falha. MTBF = Tempo Médio Entre Falhas (quanto maior, melhor). MTTR = Tempo Médio para Reparo (quanto menor, melhor).',
    palavrasChave: ['manutenção preditiva', 'manutenção preventiva', 'MTBF', 'MTTR', 'disponibilidade']
  },

  // ================= 4. NOÇÕES DE INFORMÁTICA =================
  {
    id: 'ev-inf-1',
    codigoEdital: 'Esp. 21.1',
    disciplina: 'Noções de Informática / LGPD',
    disciplinaMacro: 'informatica',
    topicoPrincipal: '21. Segurança da Informação e LGPD',
    subtopico: 'LGPD (Lei nº 13.709/2018) — Conceitos, Dado Pessoal × Sensível, Controlador × Operador e Encarregado (DPO)',
    prioridade: 'ALTA',
    prioridadeLabel: '🔥 Prioridade Máxima (Melhor Custo/Benefício)',
    pesoPareto: 10,
    incidenciaEstimada: 'Muito Alta (2 questões)',
    dificuldade: 'Fácil',
    artigoOuNorma: 'Lei 13.709/2018 arts. 5º e 7º',
    resumoEstrategico: 'Dado pessoal sensível: origem racial, convicção religiosa, saúde, genética/biometria. Controlador toma as decisões; Operador realiza o tratamento em nome do controlador. ANPD é a autoridade nacional.',
    palavrasChave: ['LGPD', 'dado sensível', 'controlador', 'operador', 'DPO', 'ANPD', 'consentimento']
  },
  {
    id: 'ev-inf-2',
    codigoEdital: 'Esp. 21.2',
    disciplina: 'Noções de Informática / Segurança',
    disciplinaMacro: 'informatica',
    topicoPrincipal: '21. Segurança da Informação e LGPD',
    subtopico: 'Princípios da Segurança (CID/CAID), Ameaças (Ransomware, Phishing, Spyware, Trojan) e Backup',
    prioridade: 'ALTA',
    prioridadeLabel: '🔥 Prioridade Alta',
    pesoPareto: 8,
    incidenciaEstimada: 'Alta (1-2 questões)',
    dificuldade: 'Fácil',
    resumoEstrategico: 'Confidencialidade, Integridade, Disponibilidade, Autenticidade e Não-repúdio. Ransomware sequestra dados criptografando-os. Phishing usa e-mails/páginas falsas para roubo de senhas.',
    palavrasChave: ['confidencialidade', 'integridade', 'disponibilidade', 'ransomware', 'phishing', 'backup 3-2-1']
  },
  {
    id: 'ev-inf-3',
    codigoEdital: 'Esp. 19.1 / 19.2',
    disciplina: 'Noções de Informática / Excel',
    disciplinaMacro: 'informatica',
    topicoPrincipal: '19. Microsoft Excel 2024 / Planilhas',
    subtopico: 'Fórmulas e Funções: SE, E, OU, SOMASE, CONT.SE, MÉDIA e Referências Absolutas ($A$1)',
    prioridade: 'ALTA',
    prioridadeLabel: '🔥 Prioridade Máxima',
    pesoPareto: 9,
    incidenciaEstimada: 'Muito Alta (2 questões)',
    dificuldade: 'Média',
    resumoEstrategico: 'O uso de cifrão $ trava a coluna ($A1), a linha (A$1) ou ambos ($A$1) ao arrastar fórmulas. Sintaxe de SOMASE(intervalo; critérios; [intervalo_soma]) e funções condicionais.',
    palavrasChave: ['excel', 'SE', 'SOMASE', 'CONT.SE', 'referência absoluta $', 'funções']
  },
  {
    id: 'ev-inf-4',
    codigoEdital: 'Esp. 19.3',
    disciplina: 'Noções de Informática / Excel',
    disciplinaMacro: 'informatica',
    topicoPrincipal: '19. Microsoft Excel 2024 / Planilhas',
    subtopico: 'Busca e Referência: PROCV e PROCX (Sintaxe e Parâmetros de Correspondência Exata / Aproximada)',
    prioridade: 'ALTA',
    prioridadeLabel: '🔥 Prioridade Alta',
    pesoPareto: 8,
    incidenciaEstimada: 'Alta (1 questão)',
    dificuldade: 'Média',
    resumoEstrategico: 'PROCV(valor_procurado; matriz_tabela; num_indice_coluna; [procurar_intervalo]). Lembre-se: 0 ou FALSO para correspondência exata. PROCX busca em qualquer direção sem restrição à primeira coluna.',
    palavrasChave: ['PROCV', 'PROCX', 'correspondência exata', 'matriz tabela', 'índice']
  },
  {
    id: 'ev-inf-5',
    codigoEdital: 'Esp. 18 / 20',
    disciplina: 'Noções de Informática / Geral',
    disciplinaMacro: 'informatica',
    topicoPrincipal: '18 e 20. Sistema Operacional e Navegadores',
    subtopico: 'Windows 11 (Atalhos, Gerenciador de Tarefas), Navegadores (Cookies, Cache, Aba Anônima) e Nuvem',
    prioridade: 'BAIXA',
    prioridadeLabel: '❄️ Prioridade Baixa (Leitura de Fixação)',
    pesoPareto: 4,
    incidenciaEstimada: 'Baixa (0-1 questão)',
    dificuldade: 'Fácil',
    resumoEstrategico: 'Aba anônima não salva histórico, cookies nem dados de formulário no dispositivo local, mas não oculta a navegação do provedor de internet ou administrador da rede.',
    palavrasChave: ['windows 11', 'aba anônima', 'cookies', 'cache', 'atalhos']
  }
];
