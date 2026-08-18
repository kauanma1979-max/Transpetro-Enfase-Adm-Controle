export interface PoloVagas {
  polo: string;
  imediataAC: number;
  imediataPCD: number;
  imediataPN: number;
  imediataPI: number;
  imediataPQ: number;
  imediataTotal: number;
  crAC: number;
  crPCD: number;
  crPN: number;
  crPI: number;
  crPQ: number;
  crTotal: number;
  totalVagasMaisCR: number;
  cidadesPolo: string[];
}

export interface CronogramaItem {
  evento: string;
  data: string;
  destaque?: boolean;
  status: 'concluido' | 'vigente' | 'futuro';
}

export const EDITAL_INFO = {
  numeroEdital: 'Edital nº 03 – TRANSPETRO/PSP/TERRA/NÍVEL MÉDIO – 2026.3',
  dataPublicacao: '11 de Agosto de 2026',
  orgao: 'PETROBRAS TRANSPORTE S.A. – TRANSPETRO',
  banca: 'Fundação Cesgranrio',
  siteBanca: 'www.cesgranrio.org.br',
  cargo: 'Profissional Transpetro de Nível Técnico - Júnior',
  enfase: 'Ênfase 1: Administração e Controle',
  escolaridade: 'Curso de Nível Médio Completo (Não exige técnico específico)',
  regime: 'Consolidação das Leis do Trabalho (CLT) - Estágio experimental de 90 dias',
  remuneracao: {
    salarioBasico: 'R$ 3.776,64',
    rmnrGarantida: 'R$ 6.539,54',
    descricaoRMNR: 'Garantia de Remuneração Mínima por Nível e Região (RMNR)',
    beneficios: [
      'Plano de Saúde e Odontológico (AMS/Petrobras Saúde)',
      'Previdência Complementar (Fundação Petros)',
      'Auxílio-Alimentação e Vale-Refeição',
      'Auxílio-Creche / Pré-escolar para dependentes',
      'Participação nos Lucros e Resultados (PLR)',
      'Programa de Desenvolvimento e Treinamento Corporativo (DRH)'
    ]
  },
  taxaInscricao: 'R$ 81,50',
  isencaoTaxa: '12 a 19/08/2026 (CadÚnico ou Doador de Medula Óssea)',
  periodoInscricoes: '12/08/2026 a 14/09/2026 (até às 23h59)',
  dataProva: '29/11/2026 (Domingo)',
  duracaoProva: '4 (quatro) horas',
  formatoProva: '60 questões de múltipla escolha (A, B, C, D, E) com 1 única resposta correta',
  divisaoQuestoes: {
    totalQuestoes: 60,
    especificosQtd: 40,
    especificosPontos: '40 pontos (100% da classificação na habilitação)',
    geraisQtd: 20,
    geraisPontos: '20 pontos (Apenas pedágio eliminatório de 10/20)'
  },
  atribuicoes: `Atuar na análise, conferência e execução de atividades administrativas, procedendo de acordo com os padrões técnicos estabelecidos, normas corporativas e requisitos legais. Executar a fiscalização técnica e administrativa dos contratos de bens e serviços.`,
  regrasEliminacao: [
    {
      regra: 'Mínimo de Específicos',
      detalhe: 'Obter menos de 50% (20 de 40 questões) na Fase 1 (Conhecimentos Específicos) = ELIMINADO.',
      impacto: 'Crítico'
    },
    {
      regra: 'Mínimo de Gerais',
      detalhe: 'Obter menos de 50% (10 de 20 questões) na Fase 2 (Conhecimentos Gerais) = ELIMINADO.',
      impacto: 'Pedágio'
    },
    {
      regra: 'Nota Zero em Disciplina Geral',
      detalhe: 'Tirar grau zero em Português OU em Matemática = ELIMINADO sumariamente.',
      impacto: 'Trava'
    },
    {
      regra: 'Corte de Habilitação (O Funil)',
      detalhe: 'Só passam para as etapas seguintes os candidatos ranqueados até 2x (vagas + CR) por ênfase/polo/cota. O ranking desta etapa utiliza EXCLUSIVAMENTE a nota da Prova de Específicos (Fase 1). A nota de Gerais de quem não passar desse corte é desconsiderada.',
      impacto: 'Classificação Pura'
    },
    {
      regra: 'Equiparação de Gênero',
      detalhe: 'O concurso busca no mínimo 50% de mulheres (incluindo trans/travestis) habilitadas para a Fase 2 em cada polo e modalidade.',
      impacto: 'Ação Afirmativa'
    }
  ],
  cotasReserva: [
    { modalidade: 'Ampla Concorrência (AC)', percentual: '60%' },
    { modalidade: 'Pessoas Negras (PN - Pretas ou Pardas)', percentual: '25%' },
    { modalidade: 'Pessoas com Deficiência (PcD)', percentual: '10%' },
    { modalidade: 'Pessoas Indígenas (PI)', percentual: '3%' },
    { modalidade: 'Pessoas Quilombolas (PQ)', percentual: '2%' }
  ]
};

export const POLOS_VAGAS_ENFASE_1: PoloVagas[] = [
  {
    polo: 'Rio de Janeiro',
    imediataAC: 2,
    imediataPCD: 0,
    imediataPN: 1,
    imediataPI: 0,
    imediataPQ: 0,
    imediataTotal: 3,
    crAC: 27,
    crPCD: 5,
    crPN: 11,
    crPI: 1,
    crPQ: 1,
    crTotal: 45,
    totalVagasMaisCR: 48,
    cidadesPolo: [
      'Angra dos Reis/RJ',
      'Duque de Caxias/RJ',
      'Japeri/RJ',
      'Macaé/RJ',
      'Rio das Flores/RJ',
      'Rio de Janeiro/RJ',
      'Volta Redonda/RJ'
    ]
  },
  {
    polo: 'São Paulo',
    imediataAC: 1,
    imediataPCD: 0,
    imediataPN: 0,
    imediataPI: 0,
    imediataPQ: 0,
    imediataTotal: 1,
    crAC: 8,
    crPCD: 2,
    crPN: 4,
    crPI: 1,
    crPQ: 0,
    crTotal: 15,
    totalVagasMaisCR: 16,
    cidadesPolo: [
      'Barueri/SP',
      'Caraguatatuba/SP',
      'Cubatão/SP',
      'Guararema/SP',
      'Guarulhos/SP',
      'Mauá/SP',
      'Paulínia/SP',
      'Porto Ferreira/SP',
      'Ribeirão Preto/SP',
      'Santos/SP',
      'São Caetano do Sul/SP',
      'São José dos Campos/SP',
      'São Paulo/SP',
      'São Sebastião/SP',
      'Taubaté/SP'
    ]
  },
  {
    polo: 'Sul',
    imediataAC: 1,
    imediataPCD: 0,
    imediataPN: 0,
    imediataPI: 0,
    imediataPQ: 0,
    imediataTotal: 1,
    crAC: 4,
    crPCD: 2,
    crPN: 3,
    crPI: 1,
    crPQ: 0,
    crTotal: 10,
    totalVagasMaisCR: 11,
    cidadesPolo: [
      'Biguaçu/SC',
      'Guaramirim/SC',
      'Itajaí/SC',
      'São Francisco do Sul/SC',
      'Araucária/PR',
      'Guaratuba/PR',
      'Paranaguá/PR',
      'Canoas/RS',
      'Osório/RS',
      'Rio Grande/RS'
    ]
  }
];

export const CIDADES_APLICACAO_PROVA = [
  'Aracaju/SE', 'Belém/PA', 'Belo Horizonte/MG', 'Boa Vista/RR', 'Brasília/DF',
  'Campo Grande/MS', 'Cuiabá/MT', 'Curitiba/PR', 'Florianópolis/SC', 'Fortaleza/CE',
  'Goiânia/GO', 'João Pessoa/PB', 'Macapá/AP', 'Maceió/AL', 'Manaus/AM',
  'Natal/RN', 'Niterói/RJ', 'Nova Iguaçu/RJ', 'Palmas/TO', 'Porto Alegre/RS',
  'Porto Velho/RO', 'Recife/PE', 'Rio Branco/AC', 'Rio de Janeiro/RJ', 'Rio Grande/RS',
  'Salvador/BA', 'Santos/SP', 'São Luís/MA', 'São Paulo/SP', 'Senador Canedo/GO',
  'Teresina/PI', 'Vitória/ES'
];

export const CRONOGRAMA_OFICIAL: CronogramaItem[] = [
  { evento: 'Publicação do Edital nº 03/2026', data: '11/08/2026', status: 'concluido' },
  { evento: 'Período de Inscrições Online', data: '12/08 a 14/09/2026', status: 'vigente' },
  { evento: 'Solicitação de Isenção da Taxa', data: '12 a 19/08/2026', status: 'concluido' },
  { evento: 'Resultado Preliminar de Isenção', data: '27/08/2026', status: 'concluido' },
  { evento: 'Resultado Final de Isenções', data: '09/09/2026', status: 'concluido' },
  { evento: 'Consulta Final de Inscrições Especiais / Cotas', data: '07/10/2026', status: 'vigente' },
  { evento: 'Cartão de Confirmação de Inscrição (Locais de Prova)', data: '24/11/2026', destaque: true, status: 'futuro' },
  { evento: 'APLICAÇÃO DAS PROVAS OBJETIVAS (4 horas)', data: '29/11/2026', destaque: true, status: 'futuro' },
  { evento: 'Divulgação dos Gabaritos Preliminares', data: '30/11/2026', status: 'futuro' },
  { evento: 'Prazo para Recursos contra Gabaritos', data: '30/11 e 01/12/2026', status: 'futuro' },
  { evento: 'Divulgação das Notas da Prova Objetiva', data: '22/01/2027', destaque: true, status: 'futuro' },
  { evento: 'Convocação para Heteroidentificação e Avaliação PcD', data: '29/01/2027', status: 'futuro' },
  { evento: 'Realização dos Procedimentos Complementares (PcD/PN/PI/PQ)', data: '13 a 15/02/2027', status: 'futuro' },
  { evento: 'Previsão de Divulgação dos Resultados Finais', data: '23/03/2027', destaque: true, status: 'futuro' }
];
