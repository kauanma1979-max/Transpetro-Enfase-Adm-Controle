export interface CutRuleItem {
  id: string;
  item: string;
  motivoCorte: string;
  tradeOffAceito: string;
  tipo: 'corte_total' | 'estudar_ultimo';
  horasEconomizadas: string;
  disciplina: string;
}

export const REGRAS_DE_CORTE: CutRuleItem[] = [
  // CORTES TOTAIS (0 HORAS)
  {
    id: 'corte-1',
    item: 'Jurisprudência do TCU e Decisões sobre Licitações',
    motivoCorte: 'Não consta expressamente no edital. Prova de nível médio cobra a literalidade da lei e conceitos práticos, nunca jurisprudência aprofundada de tribunais superiores.',
    tradeOffAceito: 'Nenhum risco real. Risco zero para prova de nível médio.',
    tipo: 'corte_total',
    horasEconomizadas: '8 horas',
    disciplina: 'Logística / Legislação'
  },
  {
    id: 'corte-2',
    item: 'Texto Integral das Normas ABNT ISO 9001 / 14001 / 45001',
    motivoCorte: 'O edital pede apenas "princípios de integração de sistemas de gestão", não o texto integral das normas da ABNT (que é pago e gigantesco). Estude apenas os conceitos de alto nível, escopos e auditoria.',
    tradeOffAceito: 'Nenhum risco. Questões de nível médio cobram apenas o propósito de cada norma e auditoria.',
    tipo: 'corte_total',
    horasEconomizadas: '12 horas',
    disciplina: 'Processos Administrativos'
  },
  {
    id: 'corte-3',
    item: 'Legislação Trabalhista / CLT Aprofundada (Cálculos de rescisão, convenções)',
    motivoCorte: 'O edital cita apenas "relações de trabalho e benefícios", que é um tópico de Gestão de Pessoas (RH), não de Direito do Trabalho jurídico.',
    tradeOffAceito: 'Nenhum. Evita perder dias decorando artigos da CLT.',
    tipo: 'corte_total',
    horasEconomizadas: '10 horas',
    disciplina: 'Processos Administrativos'
  },
  {
    id: 'corte-4',
    item: 'Contabilidade Avançada: DMPL, DVA, Impairment, Consolidação e Lançamentos Complexos',
    motivoCorte: 'O edital para Administração e Controle pede a "estrutura do Balanço Patrimonial e DRE", e não a escrituração contábil ou elaboração de relatórios avançados de nível superior.',
    tradeOffAceito: 'Se vier 1 questão isolada de DVA ou impairment, você chuta com 20% de chance. O tempo economizado garante os 8-10 pontos de BP, DRE e DFC.',
    tipo: 'corte_total',
    horasEconomizadas: '15 horas',
    disciplina: 'Finanças e Contabilidade'
  },
  {
    id: 'corte-5',
    item: 'Redes, Protocolos de TI Corporativa e Arquitetura de Servidores',
    motivoCorte: 'Fora do Anexo IV da Ênfase 1. O edital pede apenas informática aplicada de usuário (Windows 11, Office 2024, Internet/Intranet, Segurança e LGPD).',
    tradeOffAceito: 'Nenhum risco.',
    tipo: 'corte_total',
    horasEconomizadas: '6 horas',
    disciplina: 'Noções de Informática'
  },
  {
    id: 'corte-6',
    item: 'História/Geografia do Setor de Petróleo e "Conhecimentos sobre a Transpetro"',
    motivoCorte: 'Não existe no Anexo IV deste edital. Muitos candidatos perdem dezenas de horas lendo o relatório anual da companhia sem nenhuma questão correspondente.',
    tradeOffAceito: 'Nenhum. Foco 100% no conteúdo programático oficial.',
    tipo: 'corte_total',
    horasEconomizadas: '8 horas',
    disciplina: 'Geral'
  },
  {
    id: 'corte-7',
    item: 'Modelos Matemáticos Avançados de Previsão de Demanda (Séries Temporais/Regressão)',
    motivoCorte: 'Em Gestão de Estoques, o edital exige classificação ABC, ponto de pedido e lote econômico. Modelos estatísticos pesados não aparecem em nível médio.',
    tradeOffAceito: 'Nenhum risco.',
    tipo: 'corte_total',
    horasEconomizadas: '5 horas',
    disciplina: 'Logística / Estoques'
  },

  // ESTUDAR POR ÚLTIMO (SÓ SE SOBRAR TEMPO)
  {
    id: 'ultimo-1',
    item: 'Manuseio de Materiais / Equipamentos de Movimentação (Item 5 de Logística)',
    motivoCorte: 'É o tópico mais frio do bloco mais pesado. Geralmente tem baixa incidência em comparação com Compras (item 7) e Estoques (item 3).',
    tradeOffAceito: 'Estudar no fim da preparação em leitura rápida de 1 a 2 horas.',
    tipo: 'estudar_ultimo',
    horasEconomizadas: 'Alocar máx. 2h',
    disciplina: 'Logística'
  },
  {
    id: 'ultimo-2',
    item: 'Microsoft Word e PowerPoint 2024',
    motivoCorte: 'O Excel domina mais de 80% das questões de pacote Office na Cesgranrio. Word e PPT raramente caem e possuem interface intuitiva.',
    tradeOffAceito: 'Dedicar 1h apenas para atalhos de salvar e exportar.',
    tipo: 'estudar_ultimo',
    horasEconomizadas: 'Alocar máx. 1h',
    disciplina: 'Noções de Informática'
  },
  {
    id: 'ultimo-3',
    item: 'Teorias Motivacionais Clássicas (Maslow, Herzberg, McGregor)',
    motivoCorte: 'Não estão literais no edital de Processos Administrativos (que foca em R&S, T&D&E, Desempenho e Cargos).',
    tradeOffAceito: 'Leitura rápida de 30 minutos em caso de sobrar tempo.',
    tipo: 'estudar_ultimo',
    horasEconomizadas: 'Alocar máx. 30min',
    disciplina: 'Processos Administrativos'
  },
  {
    id: 'ultimo-4',
    item: 'Obrigações Acessórias e Controle Fiscal Profundo (SPED / EFD)',
    motivoCorte: 'Muito técnico para nível médio. Cobrança costuma ser apenas conceitual sobre a existência e finalidade do SPED.',
    tradeOffAceito: 'Leitura rápida de 30 minutos.',
    tipo: 'estudar_ultimo',
    horasEconomizadas: 'Alocar máx. 30min',
    disciplina: 'Finanças e Contabilidade'
  },
  {
    id: 'ultimo-5',
    item: 'TPM (Manutenção Produtiva Total) e RCM (Manutenção Centrada em Confiabilidade)',
    motivoCorte: 'Conceitos de nicho. O foco central da banca é a diferenciação entre Preventiva, Preditiva, Corretiva e MTBF/MTTR.',
    tradeOffAceito: 'Apenas fixação de definição de 1 parágrafo.',
    tipo: 'estudar_ultimo',
    horasEconomizadas: 'Alocar máx. 30min',
    disciplina: 'Processos Administrativos'
  }
];

export const TRADE_OFF_EXPLICITO = {
  titulo: 'O Trade-off Central do Método Pareto Recursivo',
  premissa: 'Você possui 150 horas disponíveis (2h/dia × 5 dias/semana × 15 semanas) e nível autodeclarado BAIXO em todas as matérias. Não há tempo para cobrir 100% do edital com a mesma profundidade.',
  decisaoEstrategica: 'O plano corta 7 tópicos de baixa relevância e relega 5 para leitura final rápida, liberando mais de 60 horas para você dominar com maestria absoluta os 8 tópicos de altíssimo retorno que respondem por ~80% das 40 questões de Conhecimentos Específicos.',
  ganhoEstimado: 'Ganho líquido de +8 a 12 questões garantidas na prova objetiva, com perda estimada de no máximo 1 a 2 questões residuais nos cortes.',
  regraDeOuro: 'Lembre-se: O edital estabelece no item 7.1.2 "d" c/c 7.1.4.2.1 que a nota de habilitação é 100% definida pela Prova de Específicos. Quem domina Específicos entra na lista dos aprovados!'
};
