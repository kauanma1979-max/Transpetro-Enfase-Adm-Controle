export interface ParConceitual {
  id: string;
  disciplina: string;
  termoA: string;
  definicaoA: string;
  termoB: string;
  definicaoB: string;
  termoC?: string;
  definicaoC?: string;
  diferencaChave: string;
  pegadinhaBanca: string;
  exemploPratico: string;
}

export interface BancaAlerta {
  caracteristica: string;
  oQueSignifica: string;
  estrategiaRecomendada: string;
}

export const ALERTAS_CESGRANRIO: BancaAlerta[] = [
  {
    caracteristica: '5 Alternativas (A–E) com 1 única correta',
    oQueSignifica: 'Não há penalização de erro (uma errada não anula uma certa, como no Cebraspe). O chute aleatório tem 20% de probabilidade matemática de acerto.',
    estrategiaRecomendada: 'NUNCA deixe questão em branco! Se não souber, elimine as 2 ou 3 absurdas e aumente sua probabilidade para 33% ou 50%.'
  },
  {
    caracteristica: 'Enunciados longos com casos concretos simulados',
    oQueSignifica: 'A banca cria histórias reais com empresas fictícias ("A empresa TransLog realizou a contratação de...") para testar a aplicação prática do conceito.',
    estrategiaRecomendada: 'Treine leitura rápida: leia primeiro o comando final da questão (última frase) para saber exatamente o que procurar no texto do enunciado.'
  },
  {
    caracteristica: 'Cobrança literal de lei quando há delimitação de artigos',
    oQueSignifica: 'O edital delimitou os artigos 28 ao 91 da Lei 13.303/2016. A banca costuma trocar palavras isoladas ("vedado" por "permitido", prazos de 5 para 10 dias, etc.).',
    estrategiaRecomendada: 'Faça pelo menos 2 leituras atentas da lei seca desses artigos específicos e monte um quadro sinóptico de prazos e percentuais.'
  },
  {
    caracteristica: 'Paixão por "Diferenciar Conceitos Próximos" (Pares Irmãos)',
    oQueSignifica: 'A Cesgranrio quase nunca faz pegadinhas de erudição obscura. Ela testa se você realmente sabe a fronteira entre dois conceitos que parecem iguais mas não são.',
    estrategiaRecomendada: 'Domine a nossa Folha de Pares Conceituais Irmãos. É o melhor antídoto contra as armadilhas clássicas da Cesgranrio.'
  },
  {
    caracteristica: 'Repetição de padrões de questões anteriores',
    oQueSignifica: 'O estilo de cobrança para carreiras de administração de estatais repete com precisão o que foi cobrado no Concurso Transpetro 2023, Petrobras 2023/2024 e Banco do Brasil.',
    estrategiaRecomendada: 'Filtre seu banco de questões exclusivamente por Banca = Fundação Cesgranrio!'
  }
];

export const PARES_CONCEITUAIS_IRMAOS: ParConceitual[] = [
  {
    id: 'par-1',
    disciplina: 'Processos Administrativos / Manutenção',
    termoA: 'Manutenção Preventiva',
    definicaoA: 'Realizada em intervalos pré-determinados de tempo ou horas de uso para reduzir a probabilidade de falha (ex: troca de óleo a cada 10.000 km).',
    termoB: 'Manutenção Preditiva',
    definicaoB: 'Baseada no monitoramento contínuo da condição física real do equipamento por meio de instrumentos (vibração, termografia, análise de óleo).',
    termoC: 'Manutenção Corretiva',
    definicaoC: 'Realizada após a ocorrência da falha para restabelecer a capacidade funcional do ativo.',
    diferencaChave: 'A preventiva obedece a um calendário/cronograma fixo; a preditiva obedece ao estado real de desgaste medido por sensores antes que a quebra aconteça.',
    pegadinhaBanca: 'Dizer que trocar uma peça porque o sensor de vibração acusou anomalia é manutenção preventiva. Na verdade, é PREDITIVA!',
    exemploPratico: 'Na Transpetro: medir a espessura da parede de um duto com ultrassom para prever corrosão é manutenção Preditiva.'
  },
  {
    id: 'par-2',
    disciplina: 'Processos Administrativos / SGI',
    termoA: 'Ação Corretiva',
    definicaoA: 'Ação para eliminar a CAUSA RAIZ de uma não conformidade identificada ou de outra situação indesejável, a fim de evitar sua reincidência.',
    termoB: 'Correção (Ação Imediata)',
    definicaoB: 'Ação tomada imediatamente para conter ou sanar a não conformidade identificada no momento.',
    termoC: 'Ação Preventiva',
    definicaoC: 'Ação para eliminar a causa de uma potencial não conformidade que ainda não ocorreu.',
    diferencaChave: 'A Correção apaga o fogo na hora; a Ação Corretiva investiga o motivo pelo qual o fogo começou e altera o processo para que nunca mais pegue fogo.',
    pegadinhaBanca: 'Afirmar que consertar um vazamento de válvula é uma ação corretiva. Trata-se de CORREÇÃO imediata; ação corretiva seria auditar o lote de vedações e trocar o fornecedor.',
    exemploPratico: 'Limpar o chão molhado é correção. Consertar a goteira no teto é ação corretiva.'
  },
  {
    id: 'par-3',
    disciplina: 'Finanças e Contabilidade / DFC',
    termoA: 'DFC — Método Direto',
    definicaoA: 'Apresenta as entradas e saídas brutas de dinheiro categorizadas diretamente (Recebimento de Clientes, Pagamento a Fornecedores, Salários, Impostos).',
    termoB: 'DFC — Método Indireto',
    definicaoB: 'Parte do Lucro Líquido apurado na DRE e faz a reconciliação (ajustes de receitas/despesas não caixa como depreciação e variações nas contas de ativo/passivo circulante).',
    diferencaChave: 'O Direto mostra o fluxo real dos recebimentos e pagamentos operacionais; o Indireto reconcilia o regime de competência da DRE com o regime de caixa.',
    pegadinhaBanca: 'Dizer que o método indireto calcula o fluxo de caixa somando apenas as receitas e subtraindo as despesas. O indireto SEMPRE parte do Lucro Líquido!',
    exemploPratico: 'No método indireto, a despesa de depreciação de R$ 50.000 é SOMADA de volta ao Lucro Líquido porque não representou saída física de dinheiro.'
  },
  {
    id: 'par-4',
    disciplina: 'Processos Administrativos / Indicadores',
    termoA: 'Eficiência',
    definicaoA: 'Relação entre os recursos empregados (custos, tempo, insumos) e as saídas obtidas. Fazer as coisas da maneira certa com menor desperdício.',
    termoB: 'Eficácia',
    definicaoB: 'Grau de atingimento dos objetivos e metas estabelecidos. Fazer as coisas certas para alcançar o resultado pretendido.',
    termoC: 'Efetividade',
    definicaoC: 'Impacto real, transformação duradoura e benefícios gerados para o público-alvo ou organização no longo prazo.',
    diferencaChave: 'Eficiência = Foco nos MEIOS (custo/economia). Eficácia = Foco nos RESULTADOS (metas). Efetividade = Foco no IMPACTO (transformação social/estratégica).',
    pegadinhaBanca: 'Dizer que um processo que atingiu 100% da meta de transporte de combustíveis foi eficiente. Ele foi EFICAZ; para ser eficiente, precisa saber se gastou o mínimo de recursos.',
    exemploPratico: 'Uma campanha de vacinação pode ser eficaz (vacinou 1 milhão de pessoas) e efetiva (zerou as internações pela doença no município).'
  },
  {
    id: 'par-5',
    disciplina: 'Logística / Compras e Licitações',
    termoA: 'Dispensa de Licitação',
    definicaoA: 'Situação em que a licitação seria plenamente POSSÍVEL (há competição viável), mas a lei autoriza ou determina a contratação direta por conveniência pública (baixo valor, emergência, guerra).',
    termoB: 'Inexigibilidade de Licitação',
    definicaoB: 'Situação em que a licitação é MATERIALMENTE IMPOSSÍVEL por inexistência de competição (fornecedor exclusivo, profissional de notória especialização para serviços técnicos singulares, artista consagrado).',
    diferencaChave: 'Dispensa = Competição POSSÍVEL, mas dispensada por lei. Inexigibilidade = Competição IMPOSSÍVEL por natureza.',
    pegadinhaBanca: 'Classificar contratação de representante comercial exclusivo como caso de dispensa. É INEXIGIBILIDADE!',
    exemploPratico: 'Contratar serviço de R$ 30.000 (baixo valor) = Dispensa. Comprar peças de reposição que só a fabricante do navio produz = Inexigibilidade.'
  },
  {
    id: 'par-6',
    disciplina: 'Processos Administrativos / Recursos Humanos',
    termoA: 'Promoção',
    definicaoA: 'Movimentação VERTICAL do colaborador para um cargo ou nível de maior complexidade, maior responsabilidade e remuneração superior.',
    termoB: 'Progressão Funcional / Salarial',
    definicaoB: 'Movimentação HORIZONTAL dentro do mesmo cargo/nível, com aumento de salário por antiguidade (tempo de serviço) ou mérito/desempenho.',
    diferencaChave: 'Promoção muda de patamar hierárquico e atribuições; Progressão mantém o mesmo cargo e apenas sobe degraus salariais na faixa.',
    pegadinhaBanca: 'Afirmar que receber um aumento salarial por completar 3 anos de casa sem mudar de função é promoção. É PROGRESSÃO!',
    exemploPratico: 'Passar de Técnico Nível 1 para Técnico Nível 2 na mesma função = Progressão. Passar de Técnico para Coordenador = Promoção.'
  },
  {
    id: 'par-7',
    disciplina: 'Logística / Modais de Transporte',
    termoA: 'Transporte Intermodal',
    definicaoA: 'Utilização de dois ou mais modais de transporte em que cada trecho é regido por um CONTRATO INDEPENDENTE e responsabilidade individual de cada transportador.',
    termoB: 'Transporte Multimodal',
    definicaoB: 'Utilização de dois ou mais modais regido por um ÚNICO CONTRATO e emitido um único Conhecimento de Transporte Multimodal (CTMC) sob a responsabilidade exclusiva do Operador de Transporte Multimodal (OTM).',
    diferencaChave: 'Intermodal = Múltiplos contratos e múltiplos responsáveis. Multimodal = Um único contrato, um único documento e um único responsável (OTM porta a porta).',
    pegadinhaBanca: 'Dizer que transportar carga por caminhão e navio é sempre multimodal. Só será multimodal se houver um OTM emitindo documento único!',
    exemploPratico: 'Se o combustível vai de trem e depois de navio com duas transportadoras contratadas separadamente = Intermodal.'
  },
  {
    id: 'par-8',
    disciplina: 'Finanças e Contabilidade',
    termoA: 'Regime de Competência',
    definicaoA: 'As receitas e despesas são reconhecidas no período contábil em que ocorrem os fatos geradores, INDEPENDENTEMENTE do efetivo recebimento ou pagamento financeiro.',
    termoB: 'Regime de Caixa',
    definicaoB: 'As receitas e despesas são reconhecidas estritamente no momento em que o dinheiro entra ou sai fisicamente do caixa da empresa.',
    diferencaChave: 'Competência obedece à data da prestação do serviço/venda; Caixa obedece à data da movimentação bancária.',
    pegadinhaBanca: 'A DRE e o Balanço Patrimonial são elaborados pelo Regime de Competência. A DFC é a demonstração que espelha o Regime de Caixa.',
    exemploPratico: 'Uma venda a prazo realizada em dezembro para receber em março gera receita em DEZEMBRO pelo regime de competência.'
  },
  {
    id: 'par-9',
    disciplina: 'Noções de Informática / LGPD',
    termoA: 'Dado Pessoal Comum',
    definicaoA: 'Informação relacionada a pessoa natural identificada ou identificável (ex: Nome, RG, CPF, endereço, e-mail, geolocalização).',
    termoB: 'Dado Pessoal Sensível',
    definicaoB: 'Dado pessoal sobre origem racial/étnica, convicção religiosa, opinião política, filiação a sindicato, dados de saúde, vida sexual, dado genético ou biométrico.',
    diferencaChave: 'Dados sensíveis têm potencial discriminatório e exigem camadas adicionais de segurança e hipóteses mais restritas de tratamento.',
    pegadinhaBanca: 'Dizer que salário, CPF ou cartão de crédito são dados sensíveis. Na LGPD, esses dados são PESSOAIS COMUNS!',
    exemploPratico: 'O registro da biometria digital para entrada nos terminais da Transpetro é um Dado Pessoal Sensível.'
  },
  {
    id: 'par-10',
    disciplina: 'Noções de Informática / LGPD',
    termoA: 'Controlador de Dados',
    definicaoA: 'Pessoa natural ou jurídica a quem competem as DECISÕES referentes ao tratamento de dados pessoais.',
    termoB: 'Operador de Dados',
    definicaoB: 'Pessoa natural ou jurídica que realiza o tratamento de dados pessoais EM NOME do controlador e seguindo suas instruções.',
    diferencaChave: 'Controlador decide o que, por que e como fazer; Operador apenas executa as ordens técnicas do controlador.',
    pegadinhaBanca: 'A empresa prestadora de serviços de nuvem contratada para guardar os cadastros atua como OPERADORA da contratante (Controladora).',
    exemploPratico: 'A Transpetro decide quais dados coletar dos inscritos (Controladora); a Fundação Cesgranrio processa os cadastros (Operadora).'
  },
  {
    id: 'par-11',
    disciplina: 'Processos Administrativos / Recursos Humanos',
    termoA: 'Avaliação 180º',
    definicaoA: 'Avaliação mútua realizada em conjunto entre o colaborador e seu superior hierárquico direto (autoavaliação + avaliação do gestor).',
    termoB: 'Avaliação 360º (Feedback Circular)',
    definicaoB: 'Avaliação abrangente feita por todas as pessoas que interagem com o avaliado: gestor, pares/colegas, subordinados e clientes internos/externos.',
    diferencaChave: '180º é bilateral (chefe e subordinado); 360º é circular e inclui pares, equipe e clientes.',
    pegadinhaBanca: 'Afirmar que na avaliação 180 graus os colegas de mesmo nível avaliam o profissional. Isso ocorre na de 360 graus!',
    exemploPratico: 'Avaliação 360º é padrão em empresas de alta maturidade gerencial para identificar pontos cegos de liderança.'
  },
  {
    id: 'par-12',
    disciplina: 'Logística / Contratos',
    termoA: 'Termo Aditivo',
    definicaoA: 'Instrumento formal que altera o conteúdo das cláusulas do contrato original (modificação de prazo de execução, acréscimo/supressão de objeto até 25%/50%).',
    termoB: 'Apostilamento (Registro em Apostila)',
    definicaoB: 'Simples anotação administrativa unilateral que não altera a substância do pacto contratual (reajuste anual por índice previsto, empenho de nova verba, mudança de endereço).',
    diferencaChave: 'Aditivo altera o acordo de vontades e exige nova manifestação das partes; Apostilamento apenas formaliza direito já previamente pactuado no edital.',
    pegadinhaBanca: 'A aplicação do índice IPCA previsto no contrato para reajuste anual de preços NÃO exige termo aditivo: faz-se por simples apostilamento.',
    exemploPratico: 'Aumentar a quantidade de refeições em 15% = Termo Aditivo. Aplicar reajuste inflacionário do 12º mês = Apostilamento.'
  }
];
