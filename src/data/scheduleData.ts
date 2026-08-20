export interface SessionBlock {
  disciplina: string;
  disciplinaId: 'logistica' | 'financas' | 'processos_adm' | 'informatica' | 'revisao' | 'simulado';
  subtopico: string;
  duracaoMin: number; // default 90 min
  teoriaMin: number; // default 25 min
  questoesMin: number; // default 50 min
  revisaoMin: number; // default 15 min
  objetivos: string[];
  dicaCesgranrio?: string;
}

export interface ScheduleDay {
  id: string;
  diaSemana: string;
  dataSugerida: string;
  horas: number; // 3h
  blocoA: SessionBlock;
  blocoB: SessionBlock;
  focoGeralDoDia: string;
  dicaEstrategica?: string;
  // Campos de compatibilidade
  disciplina?: string;
  subtopicoExato?: string;
  divisaoSessao?: {
    teoriaMin: number;
    questoesMin: number;
    revisaoMin: number;
  };
}

export interface ScheduleWeek {
  numero: number;
  blocoId: 1 | 2 | 3;
  blocoNome: string;
  datas: string;
  titulo: string;
  metaSemanal: string;
  horasTotais: number; // 21h
  dias: ScheduleDay[];
}

export const CRONOGRAMA_15_SEMANAS: ScheduleWeek[] = [
  // ================= BLOCO 1: FUNDAÇÃO & ALTO RENDIMENTO (Semanas 1 a 5 · 105h) =================
  {
    numero: 1,
    blocoId: 1,
    blocoNome: 'BLOCO 1 — FUNDAÇÃO E LEGISLAÇÃO NUCLEAR (S1 a S5 · 105h)',
    datas: '17/08 a 23/08/2026',
    titulo: 'Semana 1: Licitações (14.133/21) + Matemática Financeira e Estatais (13.303/16)',
    metaSemanal: 'Construir a base nas 2 disciplinas mais pesadas da prova com estudo intercalado diário (3h/dia divididas em 2 matérias de 1h30).',
    horasTotais: 21,
    dias: [
      {
        id: 's1-d1',
        diaSemana: 'Segunda-feira',
        dataSugerida: '17/08',
        horas: 3,
        focoGeralDoDia: 'Princípios da Lei 14.133 + Matemática Financeira: Razão, Proporção e %',
        blocoA: {
          disciplina: 'Logística / Compras',
          disciplinaId: 'logistica',
          subtopico: 'Lei 14.133/2021 — Princípios expressos (art. 5º) e Definições Fundamentais (art. 6º)',
          duracaoMin: 90,
          teoriaMin: 25,
          questoesMin: 50,
          revisaoMin: 15,
          objetivos: [
            'Ler art. 5º (segregação de funções, planejamento, transparência, celeridade)',
            'Mapear art. 6º (ETP, Termo de Referência, Matriz de Riscos, Notória Especialização)',
            'Resolver 15 questões Cesgranrio sobre princípios e definições'
          ],
          dicaCesgranrio: 'A Cesgranrio costuma trocar Termo de Referência (bens comuns) com Projeto Básico (obras e engenharia).'
        },
        blocoB: {
          disciplina: 'Finanças / Matemática',
          disciplinaId: 'financas',
          subtopico: 'Matemática Financeira: Razão, Proporção, Regra de Três e Fatores de Porcentagem',
          duracaoMin: 90,
          teoriaMin: 25,
          questoesMin: 50,
          revisaoMin: 15,
          objetivos: [
            'Grandezas direta e inversamente proporcionais sem erro de sinal',
            'Fator multiplicador de aumentos (1+i) e descontos (1-i) sucessivos',
            'Resolver 15 questões práticas de cálculo rápido'
          ],
          dicaCesgranrio: 'Treine simplificação de frações antes de multiplicar para ganhar agilidade na prova.'
        }
      },
      {
        id: 's1-d2',
        diaSemana: 'Terça-feira',
        dataSugerida: '18/08',
        horas: 3,
        focoGeralDoDia: 'Modalidades Licitatórias + Juros Simples e Taxas Proporcionais',
        blocoA: {
          disciplina: 'Logística / Compras',
          disciplinaId: 'logistica',
          subtopico: 'Lei 14.133/2021 — Modalidades de Licitação e Critérios de Julgamento',
          duracaoMin: 90,
          teoriaMin: 25,
          questoesMin: 50,
          revisaoMin: 15,
          objetivos: [
            'Mapear: Pregão, Concorrência, Concurso, Leilão e Diálogo Competitivo',
            'Memorizar que Tomada de Preços e Convite foram EXTINTAS',
            'Resolver 15 questões Cesgranrio sobre critérios de julgamento'
          ],
          dicaCesgranrio: 'O Pregão é OBRIGATÓRIO para aquisição de bens e serviços comuns.'
        },
        blocoB: {
          disciplina: 'Finanças / Matemática',
          disciplinaId: 'financas',
          subtopico: 'Juros Simples: Montante, Taxa, Prazo e J = C·i·t',
          duracaoMin: 90,
          teoriaMin: 25,
          questoesMin: 50,
          revisaoMin: 15,
          objetivos: [
            'Fórmula J = C·i·t e M = C·(1 + i·t)',
            'Conversão de taxas proporcionais (mês para ano no regime simples)',
            'Resolver 15 questões Cesgranrio de juros simples'
          ],
          dicaCesgranrio: 'Atenção à unidade de tempo: taxa e prazo devem estar sempre no mesmo período.'
        }
      },
      {
        id: 's1-d3',
        diaSemana: 'Quarta-feira',
        dataSugerida: '19/08',
        horas: 3,
        focoGeralDoDia: 'Fases da Licitação + Juros Compostos (M = C(1+i)ᵗ)',
        blocoA: {
          disciplina: 'Logística / Compras',
          disciplinaId: 'logistica',
          subtopico: 'Lei 14.133/2021 — Fases do Processo Licitatório e Inversão de Fases',
          duracaoMin: 90,
          teoriaMin: 25,
          questoesMin: 50,
          revisaoMin: 15,
          objetivos: [
            'Ordem padrão: Preparatória -> Divulgação -> Propostas -> Julgamento -> Habilitação -> Recurso -> Homologação',
            'Entender por que o julgamento antecede a habilitação (regra geral)',
            '15 questões Cesgranrio'
          ],
          dicaCesgranrio: 'Apenas o licitante classificado em 1º lugar tem seus documentos de habilitação abertos e julgados.'
        },
        blocoB: {
          disciplina: 'Finanças / Matemática',
          disciplinaId: 'financas',
          subtopico: 'Juros Compostos: Cálculo Manual de Potências e Equivalência',
          duracaoMin: 90,
          teoriaMin: 25,
          questoesMin: 50,
          revisaoMin: 15,
          objetivos: [
            'Fórmula M = C·(1+i)ᵗ para t=2 e t=3',
            'Diferença entre capitalização simples e composta',
            '15 questões Cesgranrio de cálculo financeiro composto'
          ],
          dicaCesgranrio: 'A Cesgranrio usa valores que permitem simplificação ou frações redondas em nível médio.'
        }
      },
      {
        id: 's1-d4',
        diaSemana: 'Quinta-feira',
        dataSugerida: '20/08',
        horas: 3,
        focoGeralDoDia: 'Contratação Direta (Dispensa x Inexigibilidade) + Desconto Comercial x Racional',
        blocoA: {
          disciplina: 'Logística / Compras',
          disciplinaId: 'logistica',
          subtopico: 'Lei 14.133/2021 — Inexigibilidade (art. 74) × Dispensa (art. 75)',
          duracaoMin: 90,
          teoriaMin: 25,
          questoesMin: 50,
          revisaoMin: 15,
          objetivos: [
            'Inexigibilidade: inviabilidade de competição (exclusivo, artista consagrado, serviço técnico notório)',
            'Dispensa: licitação viável, mas dispensada por baixo valor ou emergência',
            '15 questões de contratação direta'
          ],
          dicaCesgranrio: 'Fornecedor exclusivo é caso de INEXIGIBILIDADE, nunca dispensa!'
        },
        blocoB: {
          disciplina: 'Finanças / Matemática',
          disciplinaId: 'financas',
          subtopico: 'Desconto Simples Comercial (Por Fora) × Desconto Racional (Por Dentro)',
          duracaoMin: 90,
          teoriaMin: 25,
          questoesMin: 50,
          revisaoMin: 15,
          objetivos: [
            'Db = N·i·t (Valor Nominal) vs Dr = A·i·t (Valor Atual)',
            'Por que Db é sempre maior que Dr para os mesmos parâmetros',
            '15 questões Cesgranrio de descontos'
          ],
          dicaCesgranrio: 'No desconto comercial ("por fora"), a taxa incide sobre o valor futuro/nominal, gerando maior desconto.'
        }
      },
      {
        id: 's1-d5',
        diaSemana: 'Sexta-feira',
        dataSugerida: '21/08',
        horas: 3,
        focoGeralDoDia: 'Lei das Estatais (13.303/16 arts. 28-38) + Taxas Nominais e Efetivas',
        blocoA: {
          disciplina: 'Logística / Legislação',
          disciplinaId: 'logistica',
          subtopico: 'Lei 13.303/2016 arts. 28–38 — Obrigatoriedade, Dispensa por Valor e Não Aplicação',
          duracaoMin: 90,
          teoriaMin: 25,
          questoesMin: 50,
          revisaoMin: 15,
          objetivos: [
            'Art. 28: não aplicação na comercialização e prestação direta de serviços da atividade-fim',
            'Art. 29: hipóteses de dispensa das estatais',
            '15 questões Cesgranrio da Lei 13.303'
          ],
          dicaCesgranrio: 'Nas estatais, oportunidades de negócio e parcerias estratégicas não exigem licitação (art. 28, § 3º).'
        },
        blocoB: {
          disciplina: 'Finanças / Matemática',
          disciplinaId: 'financas',
          subtopico: 'Taxas Nominais, Efetivas, Taxa Real (Equação de Fisher) e Inflação',
          duracaoMin: 90,
          teoriaMin: 25,
          questoesMin: 50,
          revisaoMin: 15,
          objetivos: [
            'Taxa nominal (período de capitalização diferente do prazo da taxa)',
            'Equação de Fisher: (1 + i_aparente) = (1 + i_real) · (1 + inflação)',
            '15 questões práticas'
          ],
          dicaCesgranrio: 'Se a taxa é 24% a.a. com capitalização mensal, a taxa nominal é 24% e a efetiva é 2% a.m.'
        }
      },
      {
        id: 's1-d6',
        diaSemana: 'Sábado',
        dataSugerida: '22/08',
        horas: 3,
        focoGeralDoDia: 'Lei 13.303 (Procedimentos e Contratos) + Noções de Informática / LGPD',
        blocoA: {
          disciplina: 'Logística / Legislação',
          disciplinaId: 'logistica',
          subtopico: 'Lei 13.303/2016 arts. 39–81 — Modos de Disputa e Contratos das Estatais',
          duracaoMin: 90,
          teoriaMin: 25,
          questoesMin: 50,
          revisaoMin: 15,
          objetivos: [
            'Modos de disputa: aberto (lances), fechado (sigilo) e combinado',
            'Duração contratual (até 5 anos) e limites de aditivos (25% compras/50% reformas)',
            '15 questões Cesgranrio'
          ],
          dicaCesgranrio: 'A negociação com o primeiro colocado é sempre permitida para buscar condições ainda mais vantajosas.'
        },
        blocoB: {
          disciplina: 'Noções de Informática / LGPD',
          disciplinaId: 'informatica',
          subtopico: 'LGPD (Lei 13.709/2018): Conceitos Fundamentais, Agentes e Princípios',
          duracaoMin: 90,
          teoriaMin: 25,
          questoesMin: 50,
          revisaoMin: 15,
          objetivos: [
            'Dado pessoal vs Dado pessoal sensível (origem racial, saúde, biometria)',
            'Controlador (decide) vs Operador (executa) vs Encarregado DPO',
            '15 questões Cesgranrio sobre LGPD'
          ],
          dicaCesgranrio: 'A LGPD é cobrança direta e literal da lei. Excelente retorno de pontos por hora estudada.'
        }
      },
      {
        id: 's1-d7',
        diaSemana: 'Domingo',
        dataSugerida: '23/08',
        horas: 3,
        focoGeralDoDia: 'Bateria Semanal de 40 Questões + Revisão Espaçada e Caderno de Erros',
        blocoA: {
          disciplina: 'Simulado / Questões',
          disciplinaId: 'simulado',
          subtopico: 'Simulado Bloco A: 25 Questões Inéditas/Cesgranrio de Licitações (14.133 + 13.303)',
          duracaoMin: 90,
          teoriaMin: 0,
          questoesMin: 70,
          revisaoMin: 20,
          objetivos: [
            'Resolver 25 questões sob controle rigoroso de tempo (2,5 min/questão)',
            'Marcar pontos de dúvida e pegadinhas da Cesgranrio',
            'Classificar taxa de acertos'
          ],
          dicaCesgranrio: 'Simule o ambiente de prova: sem celular, sem consulta e com gabarito preenchido.'
        },
        blocoB: {
          disciplina: 'Caderno de Erros & Revisão',
          disciplinaId: 'revisao',
          subtopico: 'Alimentação do Caderno de Erros + Revisão Espaçada de Matemática Financeira e LGPD',
          duracaoMin: 90,
          teoriaMin: 0,
          questoesMin: 45,
          revisaoMin: 45,
          objetivos: [
            'Registrar no Caderno de Erros cada questão errada da semana com a justificativa técnica',
            'Refazer 15 questões de Matemática Financeira onde houve erro de cálculo',
            'Consolidar fichas de fórmulas e artigos mais cobrados'
          ],
          dicaCesgranrio: 'Errar durante o estudo é a melhor oportunidade de fixação. Nunca deixe um erro sem registro da regra correta.'
        }
      }
    ]
  },

  // ================= SEMANA 2: CONTRATOS + ESTOQUES + RH =================
  {
    numero: 2,
    blocoId: 1,
    blocoNome: 'BLOCO 1 — FUNDAÇÃO E LEGISLAÇÃO NUCLEAR (S1 a S5 · 105h)',
    datas: '24/08 a 30/08/2026',
    titulo: 'Semana 2: Gestão de Contratos + Gestão de Estoques (Curva ABC) e RH',
    metaSemanal: 'Dominar o papel do fiscal de contratos, aditivos, Curva ABC e a gestão de pessoas por competências CHA.',
    horasTotais: 21,
    dias: [
      {
        id: 's2-d1',
        diaSemana: 'Segunda-feira',
        dataSugerida: '24/08',
        horas: 3,
        focoGeralDoDia: 'Fiscalização de Contratos + Curva ABC de Estoques',
        blocoA: {
          disciplina: 'Logística / Contratos',
          disciplinaId: 'logistica',
          subtopico: 'Ciclo Contratual: Gestor × Fiscal Técnico × Fiscal Administrativo',
          duracaoMin: 90,
          teoriaMin: 25,
          questoesMin: 50,
          revisaoMin: 15,
          objetivos: [
            'Diferença das atribuições no Anexo III do Edital Transpetro',
            'Fiscal técnico atesta nota; fiscal administrativo confere GFIP/FGTS/INSS',
            '15 questões de contratos'
          ],
          dicaCesgranrio: 'A fiscalização dos encargos trabalhistas de terceirizados é tema recorrente para evitar responsabilidade subsidiária.'
        },
        blocoB: {
          disciplina: 'Logística / Estoques',
          disciplinaId: 'logistica',
          subtopico: 'Curva ABC (Princípio de Pareto) e Classificação por Criticidade (XYZ)',
          duracaoMin: 90,
          teoriaMin: 25,
          questoesMin: 50,
          revisaoMin: 15,
          objetivos: [
            'Classe A: ~80% do valor e 20% dos itens (controle rigoroso)',
            'Classe B: 15% valor e 30% itens; Classe C: 5% valor e 50% itens',
            'Criticidade XYZ (Z é vital para operação)',
            '15 questões de classificação de materiais'
          ],
          dicaCesgranrio: 'Itens A exigem inventários mais frequentes e negociações de compra personalizadas.'
        }
      },
      {
        id: 's2-d2',
        diaSemana: 'Terça-feira',
        dataSugerida: '25/08',
        horas: 3,
        focoGeralDoDia: 'Aditivos e Apostilamento + Ponto de Pedido e Estoque de Segurança',
        blocoA: {
          disciplina: 'Logística / Contratos',
          disciplinaId: 'logistica',
          subtopico: 'Aditivos (25% e 50%) × Apostilamento (Reajuste e Empenho)',
          duracaoMin: 90,
          teoriaMin: 25,
          questoesMin: 50,
          revisaoMin: 15,
          objetivos: [
            'O que exige Termo Aditivo (acréscimo quantitativo, alteração de projeto)',
            'O que dispensa aditivo e é resolvido por Apostilamento (reajuste por índice, variação cambial)',
            '15 questões de alteração contratual'
          ],
          dicaCesgranrio: 'Reajuste em sentido estrito (com índice previsto no edital) NÃO precisa de termo aditivo, bastando apostilamento.'
        },
        blocoB: {
          disciplina: 'Logística / Estoques',
          disciplinaId: 'logistica',
          subtopico: 'Ponto de Pedido (PP), Lead Time e Estoque de Segurança (ES)',
          duracaoMin: 90,
          teoriaMin: 25,
          questoesMin: 50,
          revisaoMin: 15,
          objetivos: [
            'Gráfico dente de serra de estoques',
            'PP = (Consumo Diário · Tempo de Reposição) + Estoque de Segurança',
            '15 questões Cesgranrio'
          ],
          dicaCesgranrio: 'O Estoque de Segurança protege contra 2 incertezas: atraso do fornecedor ou aumento súbito de consumo.'
        }
      },
      {
        id: 's2-d3',
        diaSemana: 'Quarta-feira',
        dataSugerida: '26/08',
        horas: 3,
        focoGeralDoDia: 'Riscos Contratuais e Sanções + Giro e Cobertura de Estoques',
        blocoA: {
          disciplina: 'Logística / Contratos',
          disciplinaId: 'logistica',
          subtopico: 'Gestão de Riscos, Repactuação, Reajuste e Sanções Administrativas',
          duracaoMin: 90,
          teoriaMin: 25,
          questoesMin: 50,
          revisaoMin: 15,
          objetivos: [
            'Repactuação (serviços contínuos com dedicação exclusiva de mão de obra e dissídio coletivo)',
            'Sanções: advertência, multa, suspensão temporária (até 2 anos)',
            '15 questões Cesgranrio'
          ],
          dicaCesgranrio: 'Na Lei 13.303, a suspensão de licitar é restrita à entidade estatal aplicadora por até 2 anos.'
        },
        blocoB: {
          disciplina: 'Logística / Estoques',
          disciplinaId: 'logistica',
          subtopico: 'Giro de Estoque, Cobertura, Lote Econômico de Compra (LEC) e Custos de Posse',
          duracaoMin: 90,
          teoriaMin: 25,
          questoesMin: 50,
          revisaoMin: 15,
          objetivos: [
            'Giro = Vendas ou Consumo / Estoque Médio',
            'Cobertura = Estoque / Demanda diária',
            'No LEC: Custo de Armazenagem = Custo de Pedidos',
            '15 questões Cesgranrio'
          ],
          dicaCesgranrio: 'Quanto maior o giro, menor o tempo de permanência do item em estoque (maior eficiência).'
        }
      },
      {
        id: 's2-d4',
        diaSemana: 'Quinta-feira',
        dataSugerida: '27/08',
        horas: 3,
        focoGeralDoDia: 'Recrutamento Interno x Externo + Valoração de Estoque (PEPS x Custo Médio)',
        blocoA: {
          disciplina: 'Processos Adm / RH',
          disciplinaId: 'processos_adm',
          subtopico: 'Recrutamento Interno × Externo × Misto e Técnicas de Seleção',
          duracaoMin: 90,
          teoriaMin: 25,
          questoesMin: 50,
          revisaoMin: 15,
          objetivos: [
            'Vantagens do interno: economia, motivação do quadro, rapidez',
            'Vantagens do externo: sangue novo, novas competências e ideias',
            '15 questões de RH'
          ],
          dicaCesgranrio: 'O recrutamento interno é mais motivador, mas pode gerar frustração e o Princípio de Peter nos não selecionados.'
        },
        blocoB: {
          disciplina: 'Logística / Estoques',
          disciplinaId: 'logistica',
          subtopico: 'Métodos de Valoração: PEPS (FIFO) × UEPS × Custo Médio Ponderado',
          duracaoMin: 90,
          teoriaMin: 25,
          questoesMin: 50,
          revisaoMin: 15,
          objetivos: [
            'PEPS: mercadorias mais antigas saem primeiro (maior valor de estoque e lucro na inflação)',
            'Custo Médio Ponderado: método mais equilibrado e aceito pelo Fisco',
            'UEPS: proibido pela legislação fiscal brasileira',
            '15 questões Cesgranrio'
          ],
          dicaCesgranrio: 'Em períodos de alta de preços, o PEPS acarreta CMV menor e maior lucro tributável.'
        }
      },
      {
        id: 's2-d5',
        diaSemana: 'Sexta-feira',
        dataSugerida: '28/08',
        horas: 3,
        focoGeralDoDia: 'Modelo de Competências CHA + Microsoft Excel: Fórmulas SE e SOMASE',
        blocoA: {
          disciplina: 'Processos Adm / RH',
          disciplinaId: 'processos_adm',
          subtopico: 'Seleção por Competências e Modelo CHA (Conhecimento, Habilidade, Atitude)',
          duracaoMin: 90,
          teoriaMin: 25,
          questoesMin: 50,
          revisaoMin: 15,
          objetivos: [
            'Conhecimento: Saber (teoria)',
            'Habilidade: Saber Fazer (técnica e prática)',
            'Atitude: Querer Fazer (comportamento, proatividade e valores)',
            '15 questões Cesgranrio'
          ],
          dicaCesgranrio: 'A seleção por competências analisa evidências do comportamento passado como preditor do desempenho futuro.'
        },
        blocoB: {
          disciplina: 'Noções de Informática / Excel',
          disciplinaId: 'informatica',
          subtopico: 'Excel 2024: Funções SE, SOMASE, CONT.SE e Referências Absolutas ($)',
          duracaoMin: 90,
          teoriaMin: 25,
          questoesMin: 50,
          revisaoMin: 15,
          objetivos: [
            'Lógica da função =SE(teste_lógico; valor_se_verdadeiro; valor_se_falso)',
            'Função =SOMASE(intervalo; critério; [intervalo_soma])',
            'Fixação com cifrão $ ($A$1 trava linha e coluna)',
            '15 questões Cesgranrio de Excel'
          ],
          dicaCesgranrio: 'Cesgranrio adora pedir o resultado após arrastar uma fórmula contendo referências relativas e mistas.'
        }
      },
      {
        id: 's2-d6',
        diaSemana: 'Sábado',
        dataSugerida: '29/08',
        horas: 3,
        focoGeralDoDia: 'Avaliação de Desempenho 360º + Excel: PROCV e PROCX',
        blocoA: {
          disciplina: 'Processos Adm / RH',
          disciplinaId: 'processos_adm',
          subtopico: 'Avaliação de Desempenho (90º, 180º, 360º) e Erros (Efeito Halo, Leniência)',
          duracaoMin: 90,
          teoriaMin: 25,
          questoesMin: 50,
          revisaoMin: 15,
          objetivos: [
            'Avaliação 360º (circular com superiores, pares, subordinados e clientes)',
            'Efeito Halo (generalização positiva) vs Horn (generalização negativa)',
            'Leniência, tendência central e efeito de recentidade',
            '15 questões Cesgranrio'
          ],
          dicaCesgranrio: 'Efeito Halo é a distorção mais cobrada: simpatia por um traço contamina toda a avaliação do empregado.'
        },
        blocoB: {
          disciplina: 'Noções de Informática / Excel',
          disciplinaId: 'informatica',
          subtopico: 'Excel 2024: PROCV e PROCX (Sintaxe e Busca Exata)',
          duracaoMin: 90,
          teoriaMin: 25,
          questoesMin: 50,
          revisaoMin: 15,
          objetivos: [
            'Sintaxe: =PROCV(valor; matriz; índice; [0/FALSO])',
            'Vantagens do PROCX (busca em qualquer coluna e sem ordenação prévia)',
            '15 questões Cesgranrio'
          ],
          dicaCesgranrio: 'O 4º parâmetro 0 (FALSO) garante busca EXATA; se for 1 (VERDADEIRO), faz busca aproximada com tabela ordenada.'
        }
      },
      {
        id: 's2-d7',
        diaSemana: 'Domingo',
        dataSugerida: '30/08',
        horas: 3,
        focoGeralDoDia: 'Simulado de Fechamento da Semana 2 + Caderno de Erros',
        blocoA: {
          disciplina: 'Simulado / Questões',
          disciplinaId: 'simulado',
          subtopico: 'Simulado: 25 Questões Mistas (Contratos + Estoques + RH + Excel)',
          duracaoMin: 90,
          teoriaMin: 0,
          questoesMin: 70,
          revisaoMin: 20,
          objetivos: [
            'Simular tempo de prova em 25 questões multidisciplinares',
            'Avaliar retenção cruzada entre Logística, RH e Informática',
            'Mapear pontos fracos da semana'
          ],
          dicaCesgranrio: 'Controle o relógio para manter média de 2,5 minutos por questão.'
        },
        blocoB: {
          disciplina: 'Caderno de Erros & Revisão',
          disciplinaId: 'revisao',
          subtopico: 'Alimentação do Caderno de Erros + Revisão Espaçada de Estoques e Fórmulas de Excel',
          duracaoMin: 90,
          teoriaMin: 0,
          questoesMin: 45,
          revisaoMin: 45,
          objetivos: [
            'Registrar os erros no Caderno de Erros com a regra e fórmula correta',
            'Revisar fórmulas de PP, LEC, Giro e sintaxe de PROCV',
            'Revisar os erros da Semana 1'
          ],
          dicaCesgranrio: 'A repetição espaçada semanal é o que transforma memória de curto prazo em conhecimento consolidado.'
        }
      }
    ]
  },

  // ================= SEMANA 3: CONTABILIDADE I (BALANÇO + DRE) + SGI =================
  {
    numero: 3,
    blocoId: 1,
    blocoNome: 'BLOCO 1 — FUNDAÇÃO E LEGISLAÇÃO NUCLEAR (S1 a S5 · 105h)',
    datas: '31/08 a 06/09/2026',
    titulo: 'Semana 3: Contabilidade Geral (Balanço Patrimonial e DRE) + SGI (ISO 9001/14001/45001)',
    metaSemanal: 'Dominar a estrutura completa do Balanço Patrimonial, a DRE vertical e o Sistema de Gestão Integrado.',
    horasTotais: 21,
    dias: [
      {
        id: 's3-d1',
        diaSemana: 'Segunda-feira',
        dataSugerida: '31/08',
        horas: 3,
        focoGeralDoDia: 'Estrutura do Balanço Patrimonial + SGI: ISO 9001, 14001 e 45001',
        blocoA: {
          disciplina: 'Finanças / Contabilidade',
          disciplinaId: 'financas',
          subtopico: 'Estrutura do Balanço Patrimonial: Ativo, Passivo, PL e Ordem de Liquidez/Exigibilidade',
          duracaoMin: 90,
          teoriaMin: 25,
          questoesMin: 50,
          revisaoMin: 15,
          objetivos: [
            'Equação: Ativo = Passivo Exigível + Patrimônio Líquido',
            'Ativo Circulante x Não Circulante (Realizável a LP, Investimentos, Imobilizado, Intangível)',
            '15 questões Cesgranrio'
          ],
          dicaCesgranrio: 'Ativo é ordenado por liquidez decrescente; Passivo por exigibilidade decrescente.'
        },
        blocoB: {
          disciplina: 'Processos Adm / SGI',
          disciplinaId: 'processos_adm',
          subtopico: 'SGI: ISO 9001 (Qualidade), ISO 14001 (Meio Ambiente) e ISO 45001 (SSO)',
          duracaoMin: 90,
          teoriaMin: 25,
          questoesMin: 50,
          revisaoMin: 15,
          objetivos: [
            'Objetivo de cada norma e benefícios da política integrada',
            'Estrutura de Alto Nível (Anexo SL): Liderança, Contexto, Operação e Melhoria',
            '15 questões Cesgranrio'
          ],
          dicaCesgranrio: 'ISO 9001 foca no cliente; ISO 14001 em impactos ambientais; ISO 45001 em riscos à saúde e segurança do trabalhador.'
        }
      },
      {
        id: 's3-d2',
        diaSemana: 'Terça-feira',
        dataSugerida: '01/09',
        horas: 3,
        focoGeralDoDia: 'Classificação de Contas Contábeis + Ciclo PDCA e Ação Corretiva x Preventiva',
        blocoA: {
          disciplina: 'Finanças / Contabilidade',
          disciplinaId: 'financas',
          subtopico: 'Classificação Prática de Contas Contábeis (Bens, Direitos, Obrigações e PL)',
          duracaoMin: 90,
          teoriaMin: 25,
          questoesMin: 50,
          revisaoMin: 15,
          objetivos: [
            'Contas Patrimoniais (Ativo/Passivo/PL) vs Contas de Resultado (Receitas/Despesas)',
            'Pegadinhas: Adiantamento a Fornecedores (Ativo) vs Adiantamento de Clientes (Passivo)',
            '15 questões de classificação contábil'
          ],
          dicaCesgranrio: 'Adiantamento a fornecedor é Ativo (direito de receber mercadoria já paga).'
        },
        blocoB: {
          disciplina: 'Processos Adm / SGI',
          disciplinaId: 'processos_adm',
          subtopico: 'Ciclo PDCA, Ação Corretiva × Correção e Auditorias Internas (1ª, 2ª e 3ª parte)',
          duracaoMin: 90,
          teoriaMin: 25,
          questoesMin: 50,
          revisaoMin: 15,
          objetivos: [
            'PDCA (Plan, Do, Check, Act)',
            'Correção (elimina problema imediato) vs Ação Corretiva (elimina a CAUSA raiz)',
            'Auditoria de 1ª parte (interna), 2ª parte (fornecedor) e 3ª parte (certificadora)',
            '15 questões Cesgranrio'
          ],
          dicaCesgranrio: 'Trocar Correção com Ação Corretiva é pegadinha garantida da banca.'
        }
      },
      {
        id: 's3-d3',
        diaSemana: 'Quarta-feira',
        dataSugerida: '02/09',
        horas: 3,
        focoGeralDoDia: 'Estrutura da DRE + Gestão de Riscos (Matriz PxI)',
        blocoA: {
          disciplina: 'Finanças / Contabilidade',
          disciplinaId: 'financas',
          subtopico: 'Estrutura Vertical da DRE: Da Receita Bruta ao Lucro Líquido',
          duracaoMin: 90,
          teoriaMin: 25,
          questoesMin: 50,
          revisaoMin: 15,
          objetivos: [
            'Receita Bruta - Deduções = Receita Líquida - CMV = Lucro Bruto',
            'Lucro Bruto - Despesas Operacionais = Lucro Operacional (EBIT)',
            'Cálculo do CMV = Estoque Inicial + Compras - Estoque Final',
            '15 questões de DRE'
          ],
          dicaCesgranrio: 'Descontos incondicionais (comerciais) deduzem a receita bruta; descontos financeiros entram no resultado financeiro.'
        },
        blocoB: {
          disciplina: 'Processos Adm / Riscos',
          disciplinaId: 'processos_adm',
          subtopico: 'Gestão de Riscos Integrada (ISO 31000), Matriz P×I e Tratamento de Riscos',
          duracaoMin: 90,
          teoriaMin: 25,
          questoesMin: 50,
          revisaoMin: 15,
          objetivos: [
            'Etapas: Identificação -> Análise -> Avaliação -> Tratamento',
            'Estratégias: Evitar, Mitigar/Reduzir, Transferir (ex: Seguro) e Aceitar',
            '15 questões Cesgranrio'
          ],
          dicaCesgranrio: 'Contratar apólice de seguro é exemplo clássico de TRANSFERÊNCIA de risco.'
        }
      },
      {
        id: 's3-d4',
        diaSemana: 'Quinta-feira',
        dataSugerida: '03/09',
        horas: 3,
        focoGeralDoDia: 'Regime de Competência x Caixa + Indicadores (Eficiência x Eficácia x Efetividade)',
        blocoA: {
          disciplina: 'Finanças / Contabilidade',
          disciplinaId: 'financas',
          subtopico: 'Regime de Competência × Regime de Caixa e Partidas Dobradas (Débito e Crédito)',
          duracaoMin: 90,
          teoriaMin: 25,
          questoesMin: 50,
          revisaoMin: 15,
          objetivos: [
            'Competência registra no fato gerador; Caixa registra no pagamento/recebimento',
            'Débito aumenta Ativo/Despesa; Crédito aumenta Passivo/PL/Receita',
            '15 questões Cesgranrio'
          ],
          dicaCesgranrio: 'A contabilidade oficial brasileira adota compulsoriamente o Regime de Competência.'
        },
        blocoB: {
          disciplina: 'Processos Adm / Indicadores',
          disciplinaId: 'processos_adm',
          subtopico: 'Indicadores de Gestão: Eficiência × Eficácia × Efetividade e Balanced Scorecard (BSC)',
          duracaoMin: 90,
          teoriaMin: 25,
          questoesMin: 50,
          revisaoMin: 15,
          objetivos: [
            'Eficiência (fazer com menor custo/processo)',
            'Eficácia (atingir a meta planejada)',
            'Efetividade (impacto real e duradouro no ambiente)',
            'As 4 perspectivas do BSC: Financeira, Clientes, Processos Internos, Aprendizado',
            '15 questões Cesgranrio'
          ],
          dicaCesgranrio: 'Uma operação pode ser altamente eficiente (custou pouco) mas ineficaz (não bateu a meta).'
        }
      },
      {
        id: 's3-d5',
        diaSemana: 'Sexta-feira',
        dataSugerida: '04/09',
        horas: 3,
        focoGeralDoDia: 'Relação Balanço x DRE + Indicadores ESG e Sustentabilidade',
        blocoA: {
          disciplina: 'Finanças / Contabilidade',
          disciplinaId: 'financas',
          subtopico: 'Integração entre Balanço Patrimonial e DRE (Destinação do Lucro ao PL)',
          duracaoMin: 90,
          teoriaMin: 25,
          questoesMin: 50,
          revisaoMin: 15,
          objetivos: [
            'Como o lucro líquido apurado na DRE altera a conta Lucros/Prejuízos Acumulados no PL',
            'Conceito de reservas de lucros e dividendos obrigatórios',
            '15 questões Cesgranrio'
          ],
          dicaCesgranrio: 'O resultado positivo da DRE aumenta o Patrimônio Líquido no Balanço.'
        },
        blocoB: {
          disciplina: 'Processos Adm / ESG',
          disciplinaId: 'processos_adm',
          subtopico: 'Práticas ESG (Environmental, Social, Governance) e Relatórios de Sustentabilidade GRI',
          duracaoMin: 90,
          teoriaMin: 25,
          questoesMin: 50,
          revisaoMin: 15,
          objetivos: [
            'Pilar E (Ambiental: carbono, água, resíduos)',
            'Pilar S (Social: diversidade, direitos humanos, segurança)',
            'Pilar G (Governança: compliance, ética, transparência nas estatais)',
            '15 questões Cesgranrio de ESG'
          ],
          dicaCesgranrio: 'ESG é foco absoluto no Sistema Petrobras/Transpetro em 2026.'
        }
      },
      {
        id: 's3-d6',
        diaSemana: 'Sábado',
        dataSugerida: '05/09',
        horas: 3,
        focoGeralDoDia: 'Bateria de Contabilidade Geral + Segurança da Informação (Princípios CID)',
        blocoA: {
          disciplina: 'Finanças / Contabilidade',
          disciplinaId: 'financas',
          subtopico: 'Bateria de 25 Questões Práticas: Balanço + DRE + CMV',
          duracaoMin: 90,
          teoriaMin: 15,
          questoesMin: 60,
          revisaoMin: 15,
          objetivos: [
            'Resolver 25 questões de cálculo e estrutura contábil da Cesgranrio',
            'Fixar contas de ativo/passivo e apuração de lucro',
            'Registrar dúvidas'
          ],
          dicaCesgranrio: 'Montar o esqueleto da DRE rapidamente no rascunho é a melhor tática para resolver em menos de 2 minutos.'
        },
        blocoB: {
          disciplina: 'Noções de Informática / Segurança',
          disciplinaId: 'informatica',
          subtopico: 'Segurança da Informação: Princípios CID/CAID, Malware e Ameaças Digitais',
          duracaoMin: 90,
          teoriaMin: 25,
          questoesMin: 50,
          revisaoMin: 15,
          objetivos: [
            'Confidencialidade, Integridade, Disponibilidade, Autenticidade e Não-repúdio',
            'Malwares: Ransomware (sequestro por criptografia), Phishing, Spyware, Trojan',
            '15 questões Cesgranrio'
          ],
          dicaCesgranrio: 'Phishing induz a vítima ao erro com mensagens falsas; Ransomware cobra resgate para descriptografar arquivos.'
        }
      },
      {
        id: 's3-d7',
        diaSemana: 'Domingo',
        dataSugerida: '06/09',
        horas: 3,
        focoGeralDoDia: 'Simulado Semanal + Revisão Geral do Bloco Fundação',
        blocoA: {
          disciplina: 'Simulado / Questões',
          disciplinaId: 'simulado',
          subtopico: 'Simulado 3: 25 Questões (Balanço, DRE, SGI, ESG, Segurança e Licitações)',
          duracaoMin: 90,
          teoriaMin: 0,
          questoesMin: 70,
          revisaoMin: 20,
          objetivos: [
            'Simular prova com cronômetro ativado',
            'Verificar evolução do percentual de acertos',
            'Identificar tópicos com retenção abaixo de 80%'
          ],
          dicaCesgranrio: 'Mantenha a concentração plena durante todo o bloco de 90 minutos.'
        },
        blocoB: {
          disciplina: 'Caderno de Erros & Revisão',
          disciplinaId: 'revisao',
          subtopico: 'Atualização do Caderno de Erros e Revisão Espaçada de Licitações (14.133 e 13.303)',
          duracaoMin: 90,
          teoriaMin: 0,
          questoesMin: 45,
          revisaoMin: 45,
          objetivos: [
            'Revisar todos os erros anotados das Semanas 1 a 3',
            'Refazer 15 questões de Lei 13.303 (S1) para combater a curva do esquecimento',
            'Consolidar o mapa mental de SGI e Contabilidade'
          ],
          dicaCesgranrio: 'A curva do esquecimento atua forte após 14 dias; esta revisão garante a consolidação na memória de longo prazo.'
        }
      }
    ]
  },

  // ================= SEMANAS 4 A 15 =================
  {
    numero: 4,
    blocoId: 1,
    blocoNome: 'BLOCO 1 — FUNDAÇÃO E LEGISLAÇÃO NUCLEAR (S1 a S5 · 105h)',
    datas: '07/09 a 13/09/2026',
    titulo: 'Semana 4: DFC (Métodos Direto x Indireto) + T&D&E, Cargos em Y e Transporte',
    metaSemanal: 'Dominar a Demonstração dos Fluxos de Caixa (DFC), processos de RH e Modais de Transporte.',
    horasTotais: 21,
    dias: [
      {
        id: 's4-d1',
        diaSemana: 'Segunda-feira',
        dataSugerida: '07/09',
        horas: 3,
        focoGeralDoDia: 'DFC: Atividades Operacionais, Investimento e Financiamento + T&D&E',
        blocoA: {
          disciplina: 'Finanças / Contabilidade',
          disciplinaId: 'financas',
          subtopico: 'DFC: Conceito e os 3 Tipos de Atividades (Operacionais, Investimento, Financiamento)',
          duracaoMin: 90,
          teoriaMin: 25,
          questoesMin: 50,
          revisaoMin: 15,
          objetivos: [
            'Operacionais: giro diário, fornecedores, clientes, salários',
            'Investimento: compra e venda de imobilizado e intangível',
            'Financiamento: empréstimos obtidos, aumento de capital, pagamento de dividendos',
            '15 questões Cesgranrio'
          ],
          dicaCesgranrio: 'Pagamento de dividendos é classificado prioritariamente na atividade de FINANCIAMENTO.'
        },
        blocoB: {
          disciplina: 'Processos Adm / RH',
          disciplinaId: 'processos_adm',
          subtopico: 'T&D&E: Diferenças, Levantamento de Necessidades (LNT) e 4 Níveis de Kirkpatrick',
          duracaoMin: 90,
          teoriaMin: 25,
          questoesMin: 50,
          revisaoMin: 15,
          objetivos: [
            'Treinamento (curto prazo/cargo atual) vs Desenvolvimento (médio prazo/carreira) vs Educação (longo prazo/cidadania)',
            'Avaliação de Kirkpatrick: 1. Reação, 2. Aprendizagem, 3. Comportamento, 4. Resultados',
            '15 questões Cesgranrio'
          ],
          dicaCesgranrio: 'LNT (Levantamento de Necessidades de Treinamento) é a fase diagnóstica inicial do ciclo.'
        }
      },
      {
        id: 's4-d2',
        diaSemana: 'Terça-feira',
        dataSugerida: '08/09',
        horas: 3,
        focoGeralDoDia: 'DFC: Método Direto x Indireto + Plano de Cargos e Carreira em Y',
        blocoA: {
          disciplina: 'Finanças / Contabilidade',
          disciplinaId: 'financas',
          subtopico: 'DFC: Método Direto × Método Indireto (Ajustes de Depreciação e Capital de Giro)',
          duracaoMin: 90,
          teoriaMin: 25,
          questoesMin: 50,
          revisaoMin: 15,
          objetivos: [
            'Direto: fluxos brutos de recebimentos e pagamentos',
            'Indireto: parte do Lucro Líquido + Depreciação (sem desembolso) +/- variação de contas de giro',
            '15 questões Cesgranrio de DFC'
          ],
          dicaCesgranrio: 'A depreciação é SOMADA ao Lucro Líquido no método indireto porque reduziu o lucro sem sair dinheiro do caixa.'
        },
        blocoB: {
          disciplina: 'Processos Adm / RH',
          disciplinaId: 'processos_adm',
          subtopico: 'Plano de Cargos e Salários: Promoção × Progressão e Carreira em Y',
          duracaoMin: 90,
          teoriaMin: 25,
          questoesMin: 50,
          revisaoMin: 15,
          objetivos: [
            'Promoção (mudança vertical com maior responsabilidade) vs Progressão (avanço horizontal)',
            'Carreira em Y (crescimento como especialista técnico ou como gestor com paridade salarial)',
            '15 questões Cesgranrio'
          ],
          dicaCesgranrio: 'A estrutura do Sistema Petrobras adota a Carreira em Y para reter talentos técnicos sem obrigá-los à gestão.'
        }
      },
      {
        id: 's4-d3',
        diaSemana: 'Quarta-feira',
        dataSugerida: '09/09',
        horas: 3,
        focoGeralDoDia: 'Modais de Transporte e Multimodalidade + Administração Patrimonial',
        blocoA: {
          disciplina: 'Logística / Transportes',
          disciplinaId: 'logistica',
          subtopico: 'Modalidades de Transporte: Intermodalidade × Multimodalidade (OTM) e Regulação (ANTT/ANTAQ)',
          duracaoMin: 90,
          teoriaMin: 25,
          questoesMin: 50,
          revisaoMin: 15,
          objetivos: [
            'Características dos modais: Dutoviário, Aquaviário, Ferroviário, Rodoviário e Aéreo',
            'Intermodal (contratos separados) vs Multimodal (OTM único com responsabilidade integral e CTMC)',
            '15 questões Cesgranrio'
          ],
          dicaCesgranrio: 'O Operador de Transporte Multimodal (OTM) responde perante o contratante por perdas e avarias em todo o trajeto.'
        },
        blocoB: {
          disciplina: 'Processos Adm / Patrimônio',
          disciplinaId: 'processos_adm',
          subtopico: 'Administração Patrimonial: Inventário, Tombamento e Cálculo de Depreciação Linear',
          duracaoMin: 90,
          teoriaMin: 25,
          questoesMin: 50,
          revisaoMin: 15,
          objetivos: [
            'Tombamento: registro e identificação de bens permanentes',
            'Inventário periódico e rotativo',
            'Cálculo: Quota Anual = (Custo - Valor Residual) / Vida Útil',
            '15 questões Cesgranrio'
          ],
          dicaCesgranrio: 'Terrenos e obras de arte não sofrem depreciação contábil por terem vida útil indefinida.'
        }
      },
      {
        id: 's4-d4',
        diaSemana: 'Quinta-feira',
        dataSugerida: '10/09',
        horas: 3,
        focoGeralDoDia: 'Gestão da Manutenção (PCM) + Armazenagem e Layout WMS',
        blocoA: {
          disciplina: 'Processos Adm / Manutenção',
          disciplinaId: 'processos_adm',
          subtopico: 'Tipos de Manutenção (Preventiva, Preditiva, Corretiva) e Indicadores PCM (MTBF, MTTR)',
          duracaoMin: 90,
          teoriaMin: 25,
          questoesMin: 50,
          revisaoMin: 15,
          objetivos: [
            'Preditiva: uso de tecnologia (vibração, termografia) para intervir antes da falha',
            'Preventiva: intervenção programada por tempo/quilometragem',
            'MTBF (tempo médio entre falhas) e MTTR (tempo médio para reparo)',
            '15 questões Cesgranrio'
          ],
          dicaCesgranrio: 'Aumento do MTBF e redução do MTTR resultam no aumento direto da DISPONIBILIDADE do equipamento.'
        },
        blocoB: {
          disciplina: 'Logística / Armazenagem',
          disciplinaId: 'logistica',
          subtopico: 'Armazenagem, Layout de Depósitos, Endereçamento e Sistemas WMS',
          duracaoMin: 90,
          teoriaMin: 25,
          questoesMin: 50,
          revisaoMin: 15,
          objetivos: [
            'Layout com foco na redução de percursos de picking e fluxo unidirecional',
            'WMS para gestão em tempo real de posições e estoque',
            '15 questões Cesgranrio'
          ],
          dicaCesgranrio: 'O WMS otimiza as rotas de separação e previne divergências entre estoque físico e contábil.'
        }
      },
      {
        id: 's4-d5',
        diaSemana: 'Sexta-feira',
        dataSugerida: '11/09',
        horas: 3,
        focoGeralDoDia: 'Logística de Suprimentos (Curva ABC & Ponto de Pedido) + Gestão de Contratos (Lei 13.303)',
        blocoA: {
          disciplina: 'Logística / Estoques',
          disciplinaId: 'logistica',
          subtopico: 'Gestão de Estoques: Curva ABC (80/20), Ponto de Pedido (PP = C×TR + ES) e Giro de Estoque',
          duracaoMin: 90,
          teoriaMin: 25,
          questoesMin: 50,
          revisaoMin: 15,
          objetivos: [
            'Classificação ABC por valor de demanda e criticidade',
            'Fórmulas de Ponto de Pedido com e sem Estoque de Segurança',
            '15 questões Cesgranrio de cálculo de estoques'
          ],
          dicaCesgranrio: 'Na Cesgranrio, os itens de Classe A concentram ~80% do valor monetário e ~20% dos itens físicos.'
        },
        blocoB: {
          disciplina: 'Logística / Legislação',
          disciplinaId: 'logistica',
          subtopico: 'Lei 13.303/2016 arts. 68–84: Sanções Administrativas, Rescisão e Garantias Contratuais',
          duracaoMin: 90,
          teoriaMin: 25,
          questoesMin: 50,
          revisaoMin: 15,
          objetivos: [
            'Sanções: advertência, multa e impedimento de licitar/contratar por até 2 anos',
            'Hipóteses de rescisão unilateral e limites de garantia (5% a 10%)',
            '15 questões Cesgranrio de contratos das estatais'
          ],
          dicaCesgranrio: 'O prazo máximo de impedimento de licitar na Lei 13.303 é de até 2 anos (diferente da Lei 14.133 que prevê até 3 e 6 anos).'
        }
      },
      {
        id: 's4-d6',
        diaSemana: 'Sábado',
        dataSugerida: '12/09',
        horas: 3,
        focoGeralDoDia: 'Auditorias do SGI (ISO 9001/14001/45001) + Bateria Completa de DFC e Balanço',
        blocoA: {
          disciplina: 'Processos Adm. / Qualidade',
          disciplinaId: 'processos_adm',
          subtopico: 'Sistema de Gestão Integrada: Auditorias de 1ª, 2ª e 3ª Parte, Não Conformidades e Ação Corretiva',
          duracaoMin: 90,
          teoriaMin: 25,
          questoesMin: 50,
          revisaoMin: 15,
          objetivos: [
            'Diferenciar auditoria interna (1ª parte), de fornecedor (2ª parte) e certificadora (3ª parte)',
            'Fluxo de tratamento de não conformidades e análise de causa-raiz (Ishikawa/5 Porquês)',
            '15 questões Cesgranrio sobre normas ISO'
          ],
          dicaCesgranrio: 'Auditoria de 3ª parte é realizada por organismo independente acreditado para fins de certificação oficial.'
        },
        blocoB: {
          disciplina: 'Finanças / Contabilidade',
          disciplinaId: 'financas',
          subtopico: 'Bateria de 25 Questões Cesgranrio: DFC (Direto/Indireto) + Balanço Patrimonial',
          duracaoMin: 90,
          teoriaMin: 15,
          questoesMin: 60,
          revisaoMin: 15,
          objetivos: [
            'Consolidar a identificação das 3 atividades da DFC',
            'Treinar cálculo de fluxo líquido operacional',
            'Zerar dúvidas conceituais'
          ],
          dicaCesgranrio: 'DFC é o diferencial dos candidatos aprovados nas primeiras posições.'
        }
      },
      {
        id: 's4-d7',
        diaSemana: 'Domingo',
        dataSugerida: '13/09',
        horas: 3,
        focoGeralDoDia: 'Simulado Semanal + Caderno de Erros Consolidado',
        blocoA: {
          disciplina: 'Simulado / Questões',
          disciplinaId: 'simulado',
          subtopico: 'Simulado 4: 30 Questões (DFC, RH, PCM, Patrimônio, Estoques e Licitações)',
          duracaoMin: 90,
          teoriaMin: 0,
          questoesMin: 70,
          revisaoMin: 20,
          objetivos: [
            'Resolver 30 questões em 70 minutos',
            'Mapear taxa de acerto por matéria',
            'Testar gerenciamento do tempo'
          ],
          dicaCesgranrio: 'Se empacar em uma questão difícil, marque e pule imediatamente. Volte nela no final.'
        },
        blocoB: {
          disciplina: 'Caderno de Erros & Revisão',
          disciplinaId: 'revisao',
          subtopico: 'Alimentação do Caderno de Erros + Revisão Espaçada de Contratos e Curva ABC',
          duracaoMin: 90,
          teoriaMin: 0,
          questoesMin: 45,
          revisaoMin: 45,
          objetivos: [
            'Registrar todos os erros do simulado no Caderno de Erros',
            'Revisar fórmulas de PP, LEC, Depreciação e aditivos contratuais',
            'Revisar as regras de crase e pontuação'
          ],
          dicaCesgranrio: 'O Caderno de Erros é seu patrimônio mais valioso de revisão até o dia 29/11/2026.'
        }
      }
    ]
  },

  // ================= SEMANA 5: GRANDE REVISÃO DO BLOCO 1 =================
  {
    numero: 5,
    blocoId: 1,
    blocoNome: 'BLOCO 1 — FUNDAÇÃO E LEGISLAÇÃO NUCLEAR (S1 a S5 · 105h)',
    datas: '14/09 a 20/09/2026',
    titulo: 'Semana 5: Consolidação do Bloco 1 (105 Horas Cumpridas) + Super Simulado de Específicos',
    metaSemanal: 'Fazer o fechamento das primeiras 105 horas de estudo, consolidar todo o conteúdo nuclear e atingir >85% de acertos.',
    horasTotais: 21,
    dias: [
      {
        id: 's5-d1',
        diaSemana: 'Segunda-feira',
        dataSugerida: '14/09',
        horas: 3,
        focoGeralDoDia: 'Revisão das Leis 13.303 e 14.133 + Questões Inéditas',
        blocoA: {
          disciplina: 'Logística / Legislação',
          disciplinaId: 'logistica',
          subtopico: 'Revisão Espaçada: Tabela Comparativa Lei 13.303 (Estatais) × Lei 14.133 (Geral)',
          duracaoMin: 90,
          teoriaMin: 20,
          questoesMin: 55,
          revisaoMin: 15,
          objetivos: [
            'Fixar limites de dispensa de valor e prazos de recursos',
            'Modos de disputa e inversão de fases',
            '20 questões Cesgranrio'
          ],
          dicaCesgranrio: 'Mantenha na ponta da língua as peculiaridades das estatais.'
        },
        blocoB: {
          disciplina: 'Finanças / Matemática',
          disciplinaId: 'financas',
          subtopico: 'Revisão Espaçada: Juros Compostos, Descontos e Equivalência de Capitais',
          duracaoMin: 90,
          teoriaMin: 20,
          questoesMin: 55,
          revisaoMin: 15,
          objetivos: [
            'Refazer 20 questões desafiadoras de cálculo financeiro',
            'Testar agilidade sem calculadora',
            'Consolidar fórmulas na memória'
          ],
          dicaCesgranrio: 'Agilidade nos cálculos economiza minutos preciosos para o restante das questões.'
        }
      },
      {
        id: 's5-d2',
        diaSemana: 'Terça-feira',
        dataSugerida: '15/09',
        horas: 3,
        focoGeralDoDia: 'Revisão de Gestão de Contratos e Estoques + RH Completo',
        blocoA: {
          disciplina: 'Logística / Estoques e Contratos',
          disciplinaId: 'logistica',
          subtopico: 'Revisão Espaçada: Curva ABC + PP + LEC + Aditivos e Fiscalização',
          duracaoMin: 90,
          teoriaMin: 20,
          questoesMin: 55,
          revisaoMin: 15,
          objetivos: [
            'Fórmulas de estoque e regras de aditivos (25%/50%)',
            '20 questões de alto nível da Cesgranrio'
          ],
          dicaCesgranrio: 'Este é o bloco responsável por cerca de 35% de toda a sua nota de Específicos.'
        },
        blocoB: {
          disciplina: 'Processos Adm / RH',
          disciplinaId: 'processos_adm',
          subtopico: 'Revisão Espaçada: CHA + Avaliação 360º + Erros de Avaliação + T&D&E',
          duracaoMin: 90,
          teoriaMin: 20,
          questoesMin: 55,
          revisaoMin: 15,
          objetivos: [
            'Revisar conceitos e armadilhas conceituais de gestão de pessoas',
            '20 questões Cesgranrio'
          ],
          dicaCesgranrio: 'Gabaritar RH é perfeitamente viável mantendo clareza nas definições teóricas.'
        }
      },
      {
        id: 's5-d3',
        diaSemana: 'Quarta-feira',
        dataSugerida: '16/09',
        horas: 3,
        focoGeralDoDia: 'Revisão de Contabilidade Geral (BP, DRE, DFC) + SGI e ESG',
        blocoA: {
          disciplina: 'Finanças / Contabilidade',
          disciplinaId: 'financas',
          subtopico: 'Revisão Espaçada: Balanço Patrimonial + DRE + DFC Direto e Indireto',
          duracaoMin: 90,
          teoriaMin: 20,
          questoesMin: 55,
          revisaoMin: 15,
          objetivos: [
            'Esquemas de demonstrações contábeis',
            'Classificação rápida de contas e fluxo operacional',
            '20 questões Cesgranrio'
          ],
          dicaCesgranrio: 'Garanta 100% de acertos nas questões conceituais de DFC.'
        },
        blocoB: {
          disciplina: 'Processos Adm / SGI',
          disciplinaId: 'processos_adm',
          subtopico: 'Revisão Espaçada: Normas ISO 9001/14001/45001 + Auditoria + ESG',
          duracaoMin: 90,
          teoriaMin: 20,
          questoesMin: 55,
          revisaoMin: 15,
          objetivos: [
            'Diferenças entre correção, ação corretiva e evidência de auditoria',
            'Pilares ESG aplicados a estatais de energia e logística',
            '20 questões Cesgranrio'
          ],
          dicaCesgranrio: 'A política de SGI deve ser documentada, implementada e comunicada a todos os colaboradores.'
        }
      },
      {
        id: 's5-d4',
        diaSemana: 'Quinta-feira',
        dataSugerida: '17/09',
        horas: 3,
        focoGeralDoDia: 'Revisão de Informática (LGPD, Segurança, Excel) + Gestão de Patrimônio e Almoxarifado',
        blocoA: {
          disciplina: 'Noções de Informática',
          disciplinaId: 'informatica',
          subtopico: 'Revisão Espaçada: LGPD (Agentes/Bases) + Excel (PROCV/SE/SOMASE) + Segurança CID',
          duracaoMin: 90,
          teoriaMin: 20,
          questoesMin: 55,
          revisaoMin: 15,
          objetivos: [
            'Sintaxe das fórmulas de Excel e agentes da LGPD',
            '20 questões de informática de alto rendimento'
          ],
          dicaCesgranrio: 'Este é o bloco de maior pontuação por hora dedicada do edital.'
        },
        blocoB: {
          disciplina: 'Processos Adm. / Patrimônio',
          disciplinaId: 'processos_adm',
          subtopico: 'Administração Patrimonial: Tombamento, Inventário Físico, Baixa e Alienação de Bens',
          duracaoMin: 90,
          teoriaMin: 20,
          questoesMin: 55,
          revisaoMin: 15,
          objetivos: [
            'Tipos de inventário (rotativo, anual, eventual)',
            'Procedimentos de tombamento, desfazimento e alienação (leilão)',
            '20 questões Cesgranrio sobre gestão de patrimônio público'
          ],
          dicaCesgranrio: 'A alienação de bens móveis e imóveis da administração segue regras rígidas de avaliação prévia e leilão.'
        }
      },
      {
        id: 's5-d5',
        diaSemana: 'Sexta-feira',
        dataSugerida: '18/09',
        horas: 3,
        focoGeralDoDia: 'Super Simulado Oficial de Específicos (40 Questões)',
        blocoA: {
          disciplina: 'Simulado / Prova',
          disciplinaId: 'simulado',
          subtopico: 'SUPER SIMULADO 1 (40 Questões de Conhecimentos Específicos — 100% Cesgranrio)',
          duracaoMin: 90,
          teoriaMin: 0,
          questoesMin: 85,
          revisaoMin: 5,
          objetivos: [
            'Fazer a prova exata de 40 questões de Específicos em 85 minutos',
            'Meta: atingir no mínimo 32/40 (80%) para estar na zona de habilitação'
          ],
          dicaCesgranrio: 'Lembre-se: o ranking da habilitação depende EXCLUSIVAMENTE dos pontos desta prova de 40 questões.'
        },
        blocoB: {
          disciplina: 'Simulado / Análise',
          disciplinaId: 'simulado',
          subtopico: 'Correção Detalhada Item a Item do Super Simulado + Diagnóstico de Desempenho',
          duracaoMin: 90,
          teoriaMin: 0,
          questoesMin: 30,
          revisaoMin: 60,
          objetivos: [
            'Corrigir e justificar cada uma das 40 questões',
            'Calcular a nota de classificação e taxa de acertos por matéria',
            'Registrar no Caderno de Erros'
          ],
          dicaCesgranrio: 'Avalie se os erros foram por falta de conteúdo, interpretação apressada ou pegadinha da banca.'
        }
      },
      {
        id: 's5-d6',
        diaSemana: 'Sábado',
        dataSugerida: '19/09',
        horas: 3,
        focoGeralDoDia: 'Simulado Temático de Macro Divisões (40 Questões) + Reparação de Erros',
        blocoA: {
          disciplina: 'Simulado / Específicos',
          disciplinaId: 'simulado',
          subtopico: 'Simulado 4 Macro Divisões (15 Logística + 11 Finanças + 9 Processos + 5 Informática)',
          duracaoMin: 90,
          teoriaMin: 0,
          questoesMin: 60,
          revisaoMin: 30,
          objetivos: [
            'Resolver as 40 questões simuladas no formato exato da prova',
            'Garantir nota superior a 34/40 (85%) com equilíbrio entre as 4 áreas',
            'Controlar tempo e gestão de ansiedade'
          ],
          dicaCesgranrio: 'Pratique a ordem de resolução: comece pelas matérias onde você tem maior velocidade e precisão (Informática/Logística).'
        },
        blocoB: {
          disciplina: 'Caderno de Erros & Revisão',
          disciplinaId: 'revisao',
          subtopico: 'Reparação de Erros do Simulado e Consolidação de Fórmulas Financeiras e de Estoques',
          duracaoMin: 90,
          teoriaMin: 15,
          questoesMin: 45,
          revisaoMin: 30,
          objetivos: [
            'Revisar pegadinhas de DFC, fórmulas de juros e artigos da Lei 13.303',
            'Fixar regras para a reta final'
          ],
          dicaCesgranrio: 'Mantenha a tranquilidade: sua base teórica e prática já está construída com excelência.'
        }
      },
      {
        id: 's5-d7',
        diaSemana: 'Domingo',
        dataSugerida: '20/09',
        horas: 3,
        focoGeralDoDia: 'Fechamento do Bloco 1 (105h Concluídas) + Revisão do Caderno de Erros',
        blocoA: {
          disciplina: 'Caderno de Erros & Revisão',
          disciplinaId: 'revisao',
          subtopico: 'Leitura Integral de Todos os Erros Acumulados no Caderno de Erros (S1 a S5)',
          duracaoMin: 90,
          teoriaMin: 0,
          questoesMin: 30,
          revisaoMin: 60,
          objetivos: [
            'Ler do início ao fim todos os registros do seu Caderno de Erros',
            'Testar se as pegadinhas agora são reconhecidas instantaneamente',
            'Comemorar a marca de 105 horas de estudo dedicadas'
          ],
          dicaCesgranrio: 'Você completou o Bloco 1 com 105 horas cumpridas. Sua base é sólida e competitiva.'
        },
        blocoB: {
          disciplina: 'Planejamento / Estratégia',
          disciplinaId: 'revisao',
          subtopico: 'Planejamento e Ajuste de Metas para o Bloco 2 (Expansão e Aprofundamento S6 a S10)',
          duracaoMin: 90,
          teoriaMin: 15,
          questoesMin: 45,
          revisaoMin: 30,
          objetivos: [
            'Identificar quais as 2 matérias que exigem mais baterias no Bloco 2',
            'Resolver 20 questões mistas de fixação',
            'Organizar o material para a próxima semana'
          ],
          dicaCesgranrio: 'A consistência diária de 3h com 2 matérias intercaladas maximiza a neuroplasticidade e retenção.'
        }
      }
    ]
  }
];

// Helper para gerar as 15 semanas completas (Semanas 6 a 15) mantendo a mesma estrutura de 3h/dia e 2 blocos diários
const gerarSemanasRestantes = (): ScheduleWeek[] => {
  const semanasExtras: ScheduleWeek[] = [];

  const temasBloco2 = [
    {
      num: 6,
      datas: '21/09 a 27/09/2026',
      titulo: 'Semana 6: Aprofundamento em Compras Públicas (13.303/16) + Contabilidade Prática',
      meta: 'Avançar em casos complexos de dispensa, inexigibilidade, matriz de riscos e elaboração de DFC.'
    },
    {
      num: 7,
      datas: '28/09 a 04/10/2026',
      titulo: 'Semana 7: Gestão Avançada de Contratos e Penalidades + Matemática Financeira',
      meta: 'Fixar fiscalização trabalhista de contratos contínuos e cálculo de amortização/descontos.'
    },
    {
      num: 8,
      datas: '05/10 a 11/10/2026',
      titulo: 'Semana 8: Estoques (Ponto de Pedido e Curva ABC) + RH e Modelo CHA',
      meta: 'Praticar baterias cronometradas de dimensionamento de estoques e gestão de desempenho.'
    },
    {
      num: 9,
      datas: '12/10 a 18/10/2026',
      titulo: 'Semana 9: SGI (Auditoria e Não Conformidades) + Informática (LGPD e Excel Avançado)',
      meta: 'Gabaritar questões de ISO 9001/14001/45001 e dominar funções PROCX e lógicas no Excel.'
    },
    {
      num: 10,
      datas: '19/10 a 25/10/2026',
      titulo: 'Semana 10: Modais de Transporte e Multimodalidade + Port/Mat Básica + Super Simulado 2',
      meta: 'Fechar o Bloco 2 com 210h acumuladas e simulado completo de 60 questões.'
    }
  ];

  temasBloco2.forEach(tema => {
    semanasExtras.push({
      numero: tema.num,
      blocoId: 2,
      blocoNome: 'BLOCO 2 — EXPANSÃO E APROFUNDAMENTO (S6 a S10 · 105h)',
      datas: tema.datas,
      titulo: tema.titulo,
      metaSemanal: tema.meta,
      horasTotais: 21,
      dias: [
        'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo'
      ].map((diaNome, idx) => ({
        id: `s${tema.num}-d${idx + 1}`,
        diaSemana: diaNome,
        dataSugerida: `${21 + idx > 30 ? (21 + idx - 30) + '/10' : (21 + idx) + '/09'}`,
        horas: 3,
        focoGeralDoDia: `${tema.titulo.split(':')[1].trim()} · Sessão Diária (${diaNome})`,
        blocoA: {
          disciplina: idx % 2 === 0 ? 'Logística e Compras' : 'Finanças e Contabilidade',
          disciplinaId: idx % 2 === 0 ? 'logistica' : 'financas',
          subtopico: idx % 2 === 0 ? 'Bateria de 25 Questões Cesgranrio: Lei 13.303/16 e Gestão Contratual' : 'Demonstrações Contábeis e Matemática Financeira Aplicada',
          duracaoMin: 90,
          teoriaMin: 20,
          questoesMin: 55,
          revisaoMin: 15,
          objetivos: [
            'Resolver 20 questões comentadas com foco em exceções da Cesgranrio',
            'Fixar prazos e penalidades',
            'Alimentar caderno de erros'
          ],
          dicaCesgranrio: 'Treine a leitura atenta do comando da questão (assinale a alternativa INCORRETA).'
        },
        blocoB: {
          disciplina: idx % 2 === 0 ? 'Processos Administrativos e SGI' : 'Noções de Informática / LGPD',
          disciplinaId: idx % 2 === 0 ? 'processos_adm' : 'informatica',
          subtopico: idx % 2 === 0 ? 'SGI (ISO 9001/14001/45001), Indicadores BSC e ESG' : 'LGPD (Agentes e Bases) + Funções de Busca e Lógica no Excel',
          duracaoMin: 90,
          teoriaMin: 20,
          questoesMin: 55,
          revisaoMin: 15,
          objetivos: [
            'Prática intensiva de questões de prova',
            'Revisão dos pontos mais sensíveis da semana'
          ],
          dicaCesgranrio: 'No Excel, certifique-se de contar corretamente o número de argumentos das funções.'
        }
      }))
    });
  });

  const temasBloco3 = [
    {
      num: 11,
      datas: '26/10 a 01/11/2026',
      titulo: 'Semana 11: Reta Final — Baterias Focadas nas 40 Questões de Específicos',
      meta: 'Treinamento de velocidade e precisão nos tópicos de maior peso (Compras, Contabilidade e RH).'
    },
    {
      num: 12,
      datas: '02/11 a 08/11/2026',
      titulo: 'Semana 12: Simulação Completa de Prova (60 Questões) + Ajuste de Lacunas',
      meta: 'Executar simulado oficial de 4h aos domingos e mapear o percentual em cada bloco.'
    },
    {
      num: 13,
      datas: '09/11 a 15/11/2026',
      titulo: 'Semana 13: Repassagem Completa das Leis 13.303 e 14.133 + DFC + Excel',
      meta: 'Revisão ultra-rápida de todos os artigos mais cobrados e fórmulas.'
    },
    {
      num: 14,
      datas: '16/11 a 22/11/2026',
      titulo: 'Semana 14: Penúltima Semana — Simulado Geral Final + Fixação das Pegadinhas',
      meta: 'Último grande simulado de 60 questões em condições reais de prova.'
    },
    {
      num: 15,
      datas: '23/11 a 29/11/2026',
      titulo: 'Semana 15: Semana da Prova (29/11/2026) — Revisão de Véspera e Estabilização',
      meta: 'Revisão exclusiva do Caderno de Erros, descanso cognitivo e chegada no domingo com confiança total.'
    }
  ];

  temasBloco3.forEach(tema => {
    semanasExtras.push({
      numero: tema.num,
      blocoId: 3,
      blocoNome: 'BLOCO 3 — FECHAMENTO E RETA FINAL (S11 a S15 · 105h)',
      datas: tema.datas,
      titulo: tema.titulo,
      metaSemanal: tema.meta,
      horasTotais: 21,
      dias: [
        'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo'
      ].map((diaNome, idx) => ({
        id: `s${tema.num}-d${idx + 1}`,
        diaSemana: diaNome,
        dataSugerida: `${26 + idx > 30 ? (26 + idx - 31) + '/11' : (26 + idx) + '/10'}`,
        horas: 3,
        focoGeralDoDia: `${tema.titulo.split(':')[1].trim()} (${diaNome})`,
        blocoA: {
          disciplina: idx === 6 ? 'Simulado Oficial' : 'Conhecimentos Específicos (Top Pareto)',
          disciplinaId: idx === 6 ? 'simulado' : 'logistica',
          subtopico: idx === 6 ? 'Simulado Completo Oficial 60 Questões (4h simuladas)' : 'Revisão de Alto Impacto: Licitações (13.303/14.133) e Contabilidade',
          duracaoMin: 90,
          teoriaMin: 15,
          questoesMin: 65,
          revisaoMin: 10,
          objetivos: [
            'Manter ritmo de prova intenso e precisão máxima',
            'Resolver questões Cesgranrio recentes'
          ],
          dicaCesgranrio: 'Confie na sua preparação. O estudo de 315h cobriu 100% dos pontos de maior recorrência.'
        },
        blocoB: {
          disciplina: idx === 6 ? 'Caderno de Erros' : 'Revisão & Caderno de Erros',
          disciplinaId: 'revisao',
          subtopico: 'Revisão Focada no Caderno de Erros e Fórmulas Decisivas',
          duracaoMin: 90,
          teoriaMin: 0,
          questoesMin: 45,
          revisaoMin: 45,
          objetivos: [
            'Revisar cada detalhe anotado no Caderno de Erros',
            'Garantir que nenhum erro anterior se repita'
          ],
          dicaCesgranrio: 'Na semana da prova, priorize a consolidação do que já foi aprendido e uma boa rotina de sono.'
        }
      }))
    });
  });

  return semanasExtras;
};

// Concatena as semanas restantes gerando todas as 15 semanas
CRONOGRAMA_15_SEMANAS.push(...gerarSemanasRestantes());

export const DATA_INICIO_ESTUDOS = '20/08/2026';
export const DATA_PROVA_OFICIAL = '29/11/2026';

const NOMES_DIAS_SEMANA = [
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira'
];

// Normaliza todas as semanas e dias para iniciar rigorosamente em 20 de Agosto de 2026 (Quinta-feira)
(function normalizarDatasPara20Agosto() {
  const dataBase = new Date(2026, 7, 20); // 20 de Agosto de 2026

  CRONOGRAMA_15_SEMANAS.forEach((semana, sIdx) => {
    const inicioSemana = new Date(dataBase);
    inicioSemana.setDate(dataBase.getDate() + sIdx * 7);

    const fimSemana = new Date(dataBase);
    fimSemana.setDate(dataBase.getDate() + sIdx * 7 + (semana.dias.length - 1));

    const formataDiaMes = (d: Date) => {
      const dia = String(d.getDate()).padStart(2, '0');
      const mes = String(d.getMonth() + 1).padStart(2, '0');
      return `${dia}/${mes}`;
    };

    semana.datas = `${formataDiaMes(inicioSemana)} a ${formataDiaMes(fimSemana)}/2026`;

    semana.dias.forEach((dia, dIdx) => {
      const dataDia = new Date(dataBase);
      dataDia.setDate(dataBase.getDate() + (sIdx * 7) + dIdx);

      dia.dataSugerida = formataDiaMes(dataDia);
      dia.diaSemana = NOMES_DIAS_SEMANA[dIdx % 7];
    });
  });
})();

