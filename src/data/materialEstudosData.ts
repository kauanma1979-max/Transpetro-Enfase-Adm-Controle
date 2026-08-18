export interface FormulaVariavel {
  simbolo: string;
  significado: string;
}

export interface FormulaItem {
  nome: string;
  formula: string;
  variaveis: FormulaVariavel[];
  exemploPratico?: string;
  tipoCalculo?: 'ponto_pedido' | 'lec' | 'juros_simples' | 'juros_compostos' | 'desconto_comercial' | 'desconto_racional' | 'mtbf_mttr' | 'giro_estoque';
}

export interface TabelaDestaque {
  colunas: string[];
  linhas: string[][];
}

export interface SecaoMaterial {
  id: string;
  titulo: string;
  badge?: string;
  conteudoMarkdown: string;
  tabelaDestaque?: TabelaDestaque;
  formulas?: FormulaItem[];
  pontosDeProva: string[];
}

export interface ModuloEstudo {
  id: string;
  titulo: string;
  subtitulo: string;
  icone?: string;
  secoes: SecaoMaterial[];
}

export const MATERIAL_ESTUDOS: ModuloEstudo[] = [
  {
    id: 'proc-adm',
    titulo: 'Processos Adm. & Legislação',
    subtitulo: 'Lei das Estatais (13.303/16), Lei 14.133/21, Fiscalização Contratual, RH e SGI',
    secoes: [
      {
        id: 'estatais-13303',
        titulo: 'Lei das Estatais (Lei nº 13.303/2016) — Arts. 28 a 91',
        badge: 'Top 1 Incidência Cesgranrio',
        conteudoMarkdown: `A Lei 13.303/2016 é o estatuto jurídico próprio das empresas públicas e sociedades de economia mista (como a Transpetro e a Petrobras). A Fundação Cesgranrio cobra a distinção rígida entre a Lei das Estatais e a Lei 14.133/2021.

**1. Âmbito de Aplicação e Regime Licitatório:**
- As Estatais realizam licitação para obras, serviços, compras e alienações (art. 28).
- **Inaplicabilidade da Lei 14.133 para atividade-fim**: Contratos com vínculo direto à comercialização e prestação de serviços no mercado competitivo não se submetem ao rito licitatório tradicional se constituírem oportunidade de negócio (art. 28, § 3º, II).

**2. Hipóteses de Dispensa de Licitação (Art. 29):**
- **Obras e serviços de engenharia**: até **R$ 100.000,00** (valor original da lei, atualizado periodicamente por decreto).
- **Outros serviços e compras**: até **R$ 50.000,00**.
- **Inexecução anterior com rescisão**: contratação de remanescente de obra ou serviço.
- **Emergência ou calamidade pública**: caracterizada urgência de atendimento para parcelas necessárias.

**3. Hipóteses de Inexigibilidade de Licitação (Art. 30):**
- **Inviabilidade de competição**, em especial:
  - Fornecedor exclusivo (atestado por órgão de registro do comércio).
  - Serviços técnicos de natureza singular com profissionais de notória especialização (advocacia, pareceres, auditorias, treinamento). É **vedada** a inexigibilidade para publicidade e divulgação.

**4. Modos de Disputa (Art. 52):**
- **Aberto**: propostas sucessivas com lances públicos.
- **Fechado**: sigilo das propostas até a abertura oficial.
- **Combinado**: aberto seguido de fechado, ou fechado seguido de aberto.`,
        tabelaDestaque: {
          colunas: ['Critério', 'Lei das Estatais (13.303/16)', 'Nova Lei de Licitações (14.133/21)'],
          linhas: [
            ['Aplicabilidade', 'Empresas Públicas e Sociedades de Economia Mista', 'Adm. Direta, Autarquias e Fundações Públicas'],
            ['Modalidades Licitatórias', 'Não adota modalidades formais (Usa Modos Aberto/Fechado)', 'Pregão, Concorrência, Concurso, Leilão, Diálogo Competitivo'],
            ['Inexigibilidade Notória Especialização', 'Permitida (vedada para publicidade/divulgação)', 'Permitida (vedada para publicidade/divulgação)'],
            ['Matriz de Riscos', 'Obrigatória em contratações de grande vulto', 'Obrigatória em contratações de grande vulto / RPI'],
            ['Inversão de Fases (Julgamento antes de Habilitação)', 'Regra geral obrigatória', 'Regra geral obrigatória']
          ]
        },
        pontosDeProva: [
          'A Cesgranrio costuma trocar as hipóteses de Dispensa (taxativas / valor / emergência) por Inexigibilidade (inviabilidade de competição / singularidade).',
          'A inversão de fases (julgar propostas de preço antes de abrir envelopes de habilitação) é a regra na 13.303/16.',
          'É expressamente proibida a inexigibilidade de licitação para serviços de publicidade e propaganda.'
        ]
      },
      {
        id: 'gestao-contratos',
        titulo: 'Gestão e Fiscalização de Contratos Administrativos',
        badge: 'Decisivo na Cesgranrio',
        conteudoMarkdown: `Na estrutura operacional da Transpetro, a execução dos contratos exige separação clara de responsabilidades entre os fiscais e o gestor do contrato.

**1. Papéis e Atribuições:**
- **Gestor do Contrato**: Responsável pela coordenação geral, controle de prazos de vigência, prorrogações, aplicações de penalidades e equilíbrio econômico-financeiro.
- **Fiscal Técnico**: Acompanha a execução física in loco, qualidade dos materiais e serviços, conformidade das entregas e medições.
- **Fiscal Administrativo**: Verifica o cumprimento das obrigações trabalhistas, previdenciárias e fiscais da contratada (FGTS, INSS, folha de pagamento) para evitar responsabilidade subsidiária da estatal (Súmula 331 TST).

**2. Alterações Contratuais e Limites:**
- **Unilaterais (Pela Administração)**: Modificações de projeto/especificações ou acréscimo/diminuição quantitativa.
  - Limite geral: até **25%** do valor inicial atualizado do contrato.
  - Reformas de edifícios ou equipamentos: até **50%** para acréscimos.
- **Por Acordo entre as Partes (Bilateral)**: Substituição de garantia, modificação do regime de execução, restabelecimento do equilíbrio econômico-financeiro (Reajuste em sentido estrito, Repactuação ou Revisão/Reequilíbrio).

**3. Apostilamento vs. Termo Aditivo:**
- **Apostilamento**: Registro de variações financeiras previstas no próprio contrato (reajuste anual de preços por índice oficial, atualizações monetárias, alterações de dotação orçamentária). Não altera cláusulas nem requer assinatura bilateral.
- **Termo Aditivo**: Modificação contratual substancial (prorrogação de prazo, acréscimos/supressões de quantitativo, alteração de objeto).`,
        tabelaDestaque: {
          colunas: ['Instrumento', 'Quando Utilizar', 'Exige Aditivo?'],
          linhas: [
            ['Reajuste por Índice (ex: IPCA/IGP-M)', 'Variação periódica de custos após 12 meses prevista em edital', 'Não (Basta Apostilamento)'],
            ['Repactuação de Preços', 'Contratos de serviços contínuos com dedicação exclusiva de mão de obra', 'Sim (Termo Aditivo ou Apostilamento formal)'],
            ['Acréscimo Quantitativo (até 25%)', 'Aumento na quantidade demandada do serviço ou fornecimento', 'Sim (Termo Aditivo Obrigatório)'],
            ['Revisão / Reequilíbrio (Teoria da Imprevisão)', 'Fato imprevisível ou previsível de consequências incalculáveis (álea extraordinária)', 'Sim (Termo Aditivo Obrigatório)']
          ]
        },
        pontosDeProva: [
          'Apostilamento NÃO serve para prorrogar prazo de vigência nem para acrescer itens; serve para reajustes por índice e compensações orçamentárias.',
          'O limite de acréscimo para reforma de prédios ou equipamentos é de até 50%; para serviços e compras comuns é de até 25% (vedada a compensação entre acréscimos e supressões para burlar o limite).',
          'A responsabilidade da Administração Pública pelas verbas trabalhistas de empresas terceirizadas depende de comprovação de culpa in vigilando (falha na fiscalização administrativa).'
        ]
      },
      {
        id: 'recursos-humanos-sgi',
        titulo: 'Gestão de Pessoas, Avaliação de Desempenho e Normas SGI',
        badge: 'Conceitos Clássicos',
        conteudoMarkdown: `**1. Gestão por Competências (Modelo CHA):**
- **C**onhecimento: Saber teórico (saber o que e por que fazer).
- **H**abilidade: Saber prático / técnico (saber como fazer com destreza).
- **A**titude: Querer fazer / postura comportamental (proatividade, ética, compromisso).

**2. Avaliação de Desempenho e Vieses Comuns:**
- **Avaliação 360 Graus**: O colaborador é avaliado por chefes, pares/colegas, subordinados, clientes internos e autoavaliação.
- **Efeito Halo**: Tendência de generalizar uma característica positiva do avaliado para todos os demais aspectos do seu desempenho.
- **Efeito Horn**: Tendência inversa, em que um único traço negativo prejudica toda a avaliação do funcionário.
- **Tendência Central**: O avaliador evita notas extremas (muito altas ou muito baixas) e avalia todos na média para evitar atritos.

**3. Normas do Sistema de Gestão Integrado (SGI):**
- **ISO 9001:2015**: Gestão da Qualidade (Foco no cliente, liderança, abordagem por processos, melhoria contínua, pensamento baseado em riscos).
- **ISO 14001:2015**: Gestão Ambiental (Identificação de aspectos e impactos ambientais, prevenção da poluição, conformidade legal, ciclo de vida).
- **ISO 45001:2018**: Gestão de Saúde e Segurança Ocupacional - SSO (Perigos e riscos no trabalho, eliminação de perigos, ambiente seguro).
- **Ciclo PDCA**: Plan (Planejar) $\\rightarrow$ Do (Executar) $\\rightarrow$ Check (Verificar/Auditar) $\\rightarrow$ Act (Agir corretivamente e padronizar).`,
        tabelaDestaque: {
          colunas: ['Tipo de Auditoria SGI', 'Auditor', 'Finalidade'],
          linhas: [
            ['Auditoria de 1ª Parte (Interna)', 'A própria organização em seus processos', 'Autoavaliação e melhoria contínua'],
            ['Auditoria de 2ª Parte (Externa de Fornecedor)', 'Cliente ou empresa compradora nos fornecedores', 'Qualificação, homologação e conformidade de suprimentos'],
            ['Auditoria de 3ª Parte (Certificação)', 'Organismo Certificador Independente e Acreditado (ex: INMETRO)', 'Concessão, manutenção ou renovação do selo de certificação ISO']
          ]
        },
        pontosDeProva: [
          'A Cesgranrio costuma trocar o conceito de Efeito Halo pelo de Tendência Central ou Recência.',
          'Em auditorias SGI: 1ª parte = interna; 2ª parte = fornecedor/cliente; 3ª parte = organismo certificador externo independente.',
          'O ciclo PDCA atua como o motor metodológico comum de todas as normas ISO integradas.'
        ]
      }
    ]
  },
  {
    id: 'logistica-scm',
    titulo: 'Logística & Gestão de Suprimentos',
    subtitulo: 'Curva ABC, Estoques, Ponto de Pedido, Lote Econômico (LEC) e Modais de Transporte',
    secoes: [
      {
        id: 'curva-abc-estoques',
        titulo: 'Curva ABC (Princípio de Pareto) e Dimensionamento de Estoques',
        badge: 'Cálculo e Teoria Frequente',
        conteudoMarkdown: `A Gestão de Estoques busca o equilíbrio entre o custo de manter estoque e o risco de ruptura operacional (desabastecimento).

**1. Classificação ABC (80/20 de Pareto):**
- **Classe A**: Alto valor monetário acumulado (~80% do valor total de estoque), representando um número reduzido de itens (~20% da quantidade total). Exige controle rigoroso diário, inventários frequentes e negociação detalhada.
- **Classe B**: Valor monetário intermediário (~15% do valor total), representando número médio de itens (~30% da quantidade total). Controle normal periódico.
- **Classe C**: Baixo valor monetário (~5% do valor total), representando a maioria física dos itens (~50% do total). Controle simplificado em lotes maiores.

**2. Níveis e Parâmetros de Estoque:**
- **Estoque de Segurança ($ES$ ou Estoque Mínimo)**: Margem de proteção contra atrasos na entrega do fornecedor ou picos inesperados de demanda.
- **Tempo de Reposição ($TR$ ou Lead Time)**: Tempo decorrido entre a emissão da solicitação de compra e a efetiva entrada física dos materiais no armazém.
- **Consumo Médio Diário ($C$)**: Demanda média de itens por unidade de tempo.
- **Ponto de Pedido ($PP$)**: Nível de estoque que, ao ser atingido, dispara o gatilho para emissão de um novo pedido de compra.
$$PP = (C \\times TR) + ES$$
- **Estoque Máximo ($E_{max}$)**: Soma do Lote de Compra ($Q$) com o Estoque de Segurança ($ES$).`,
        formulas: [
          {
            nome: 'Ponto de Pedido (PP)',
            formula: 'PP = (ConsumoDiario * LeadTime) + EstoqueSeguranca',
            variaveis: [
              { simbolo: 'ConsumoDiario', significado: 'Demanda média consumida por dia' },
              { simbolo: 'LeadTime (TR)', significado: 'Tempo de reposição / entrega em dias' },
              { simbolo: 'EstoqueSeguranca', significado: 'Estoque mínimo de proteção contra oscilações' }
            ],
            exemploPratico: 'Consumo = 20 un/dia, TR = 10 dias, ES = 50 un. PP = (20 * 10) + 50 = 250 unidades.',
            tipoCalculo: 'ponto_pedido'
          },
          {
            nome: 'Lote Econômico de Compras (LEC / EOQ)',
            formula: 'LEC = sqrt((2 * DemandaAnual * CustoPedido) / CustoArmazenagemUnitario)',
            variaveis: [
              { simbolo: 'DemandaAnual (D)', significado: 'Demanda total do item no período de 1 ano' },
              { simbolo: 'CustoPedido (Cp)', significado: 'Custo fixo administrativo para emitir cada pedido' },
              { simbolo: 'CustoArmazenagem (Ca)', significado: 'Custo anual para manter 1 unidade guardada em estoque' }
            ],
            exemploPratico: 'D = 10.000 un/ano, Cp = R$ 50,00, Ca = R$ 4,00/un.ano. LEC = sqrt((2 * 10000 * 50) / 4) = sqrt(250.000) = 500 unidades.',
            tipoCalculo: 'lec'
          },
          {
            nome: 'Giro de Estoque e Cobertura',
            formula: 'Giro = CustoMercadoriasVendidas / EstoqueMedio',
            variaveis: [
              { simbolo: 'CMV', significado: 'Custo total das mercadorias consumidas/vendidas no período' },
              { simbolo: 'EstoqueMedio', significado: 'Média de estoque no período = (EstoqueInicial + EstoqueFinal) / 2' }
            ],
            exemploPratico: 'CMV = R$ 1.200.000, Estoque Médio = R$ 200.000. Giro = 6 vezes por ano (cobertura média de 60 dias).',
            tipoCalculo: 'giro_estoque'
          }
        ],
        pontosDeProva: [
          'No cálculo do Ponto de Pedido, não se esqueça de somar o Estoque de Segurança.',
          'No LEC, o ponto de lote ótimo é exatamente onde o Custo Total de Pedir se iguala ao Custo Total de Estocar.',
          'Itens Classe A exigem controle rigoroso individualizado, enquanto itens Classe C usam controle visual simplificado (ex: sistema de duas gavetas).'
        ]
      },
      {
        id: 'modais-transporte',
        titulo: 'Modais de Transporte e Operações da Transpetro',
        badge: 'Foco Operacional',
        conteudoMarkdown: `A Transpetro opera dutos, terminais e frota de navios para o transporte seguro de petróleo, derivados, gás e biocombustíveis.

**1. Características dos Modais:**
- **Dutoviário (Oleodutos, Gasodutos, Polidutos)**: Altíssimo custo inicial de implantação (infraestrutura fixa), mas baixíssimo custo operacional variável por volume transportado. Altíssima segurança, fluxo contínuo e imunidade a congestionamentos viários.
- **Aquaviário / Marítimo / Cabotagem**: Alta capacidade de carga, indicado para grandes volumes a longas distâncias com baixo custo por tonelada-quilômetro ($t.km$). Velocidade moderada e flexibilidade restrita a rotas e portos.
- **Ferroviário**: Grande capacidade de carga a distâncias médias e longas com baixo consumo energético em granéis.
- **Rodoviário**: Maior flexibilidade e capilaridade porta-a-porta, alta agilidade em curtas distâncias, mas maior custo operacional e maior emissão de poluentes.

**2. Métodos de Valoração de Estoques:**
- **PEPS (FIFO - Primeiro que Entra, Primeiro que Sai)**: Itens mais antigos saem primeiro. Em períodos de inflação, gera menor CMV e **maior lucro contábil reportado**, resultando em valor de estoque final mais próximo do mercado.
- **UEPS (LIFO - Último que Entra, Primeiro que Sai)**: Itens mais recentes saem primeiro. **Não é aceito pela legislação fiscal brasileira** nem pelas normas contábeis internacionais (CPC 16 / IFRS), pois subavalia o estoque final e reduz a base de imposto de renda.
- **Custo Médio Ponderado Móvel**: A cada nova entrada de compras, recalcula-se o custo médio unitário do estoque. É o método padrão mais utilizado no Brasil.`,
        tabelaDestaque: {
          colunas: ['Método de Avaliação', 'Efeito no Estoque Final (Inflação)', 'Efeito no Lucro Contábil', 'Aceito pelo Fisco?'],
          linhas: [
            ['PEPS (FIFO)', 'Fica mais Alto (preços recentes)', 'Maior Lucro Reportado', 'Sim (Aceito)'],
            ['Custo Médio Móvel', 'Fica Intermediário / Ponderado', 'Lucro Moderado / Realista', 'Sim (Padrão Aceito)'],
            ['UEPS (LIFO)', 'Fica Subavaliado (preços antigos)', 'Menor Lucro Reportado', 'Não (Proibido pelo RIR e CPC 16)']
          ]
        },
        pontosDeProva: [
          'A Cesgranrio adora perguntar qual método NÃO é aceito no Brasil para fins fiscais: a resposta é o UEPS (LIFO).',
          'O modal dutoviário destaca-se pela regularidade, fluxo contínuo e menor risco de contaminação e perda em relação ao modal rodoviário.'
        ]
      }
    ]
  },
  {
    id: 'financas-contabilidade',
    titulo: 'Finanças & Contabilidade',
    subtitulo: 'Matemática Financeira, DFC, Balanço Patrimonial e Demonstrações Contábeis',
    secoes: [
      {
        id: 'matematica-financeira',
        titulo: 'Matemática Financeira: Juros e Descontos',
        badge: 'Fórmulas Indispensáveis',
        conteudoMarkdown: `Na prova da Cesgranrio, os cálculos devem ser feitos manualmente sem calculadora. Memorize as manipulações algébricas clássicas.

**1. Juros Simples:**
O rendimento incide sempre sobre o capital inicial original ($C$):
$$J = C \\times i \\times t$$
$$M = C + J = C \\times (1 + i \\times t)$$

**2. Juros Compostos (Juros sobre Juros):**
O rendimento de cada período é incorporado ao principal para o cálculo do período seguinte:
$$M = C \\times (1 + i)^t$$

**3. Desconto Comercial Simples (Bancário ou "Por Fora"):**
Calculado sobre o **Valor Nominal ($N$)** do título (valor de face futuro):
$$D_c = N \\times d \\times t$$
$$V_c = N - D_c = N \\times (1 - d \\times t)$$

**4. Desconto Racional Simples (Verdadeiro ou "Por Dentro"):**
Calculado sobre o **Valor Atual / Presente ($V_r$)** do título:
$$D_r = \\frac{N \\times d \\times t}{1 + d \\times t}$$
$$V_r = \\frac{N}{1 + d \\times t}$$
*Propriedade Fundamental*: Para as mesmas taxas e prazos, o Desconto Comercial é sempre maior que o Desconto Racional ($D_c > D_r$).`,
        formulas: [
          {
            nome: 'Juros Simples e Montante',
            formula: 'J = C * i * t | M = C * (1 + i * t)',
            variaveis: [
              { simbolo: 'C', significado: 'Capital inicial investido / financiado' },
              { simbolo: 'i', significado: 'Taxa unitária de juros por período (ex: 5% a.m. = 0,05)' },
              { simbolo: 't', significado: 'Número de períodos de tempo (meses, anos)' }
            ],
            exemploPratico: 'C = R$ 5.000, i = 2% a.m. (0,02), t = 6 meses. J = 5000 * 0,02 * 6 = R$ 600. Montante = R$ 5.600.',
            tipoCalculo: 'juros_simples'
          },
          {
            nome: 'Juros Compostos',
            formula: 'M = C * (1 + i)^t',
            variaveis: [
              { simbolo: 'C', significado: 'Capital principal inicial' },
              { simbolo: 'i', significado: 'Taxa unitária periódica' },
              { simbolo: 't', significado: 'Expoente temporal (períodos)' }
            ],
            exemploPratico: 'C = R$ 1.000, i = 10% a.a. (0,10), t = 2 anos. M = 1000 * (1,10)^2 = 1000 * 1,21 = R$ 1.210.',
            tipoCalculo: 'juros_compostos'
          },
          {
            nome: 'Desconto Comercial ("Por Fora")',
            formula: 'Dc = N * d * t | Vc = N * (1 - d * t)',
            variaveis: [
              { simbolo: 'N', significado: 'Valor Nominal / de Face do título' },
              { simbolo: 'd', significado: 'Taxa de desconto comercial por período' },
              { simbolo: 't', significado: 'Prazo de antecipação' }
            ],
            exemploPratico: 'N = R$ 10.000, d = 3% a.m., t = 2 meses. Dc = 10000 * 0,03 * 2 = R$ 600. Valor liberado = R$ 9.400.',
            tipoCalculo: 'desconto_comercial'
          },
          {
            nome: 'Desconto Racional ("Por Dentro")',
            formula: 'Dr = (N * d * t) / (1 + d * t) | Vr = N / (1 + d * t)',
            variaveis: [
              { simbolo: 'N', significado: 'Valor Nominal do título' },
              { simbolo: 'd', significado: 'Taxa periódica de desconto' },
              { simbolo: 't', significado: 'Prazo de antecipação' }
            ],
            exemploPratico: 'N = R$ 10.600, d = 6% no período. Vr = 10600 / 1,06 = R$ 10.000. Dr = R$ 600.',
            tipoCalculo: 'desconto_racional'
          }
        ],
        pontosDeProva: [
          'Lembre-se sempre de converter a taxa e o tempo para a mesma unidade (se a taxa é mensal, o tempo deve estar em meses).',
          'O Desconto Comercial incide sobre o Valor Nominal ($N$); o Desconto Racional incide sobre o Valor Atual ($V$).',
          'Taxas Proporcionais ocorrem no regime simples (ex: 2% a.m. = 24% a.a.); no regime composto usam-se Taxas Equivalentes.'
        ]
      },
      {
        id: 'demonstracoes-contabeis-dfc',
        titulo: 'Demonstração dos Fluxos de Caixa (DFC) e Balanço Patrimonial',
        badge: 'Tema de Alto Peso',
        conteudoMarkdown: `**1. Estrutura do Balanço Patrimonial (Lei 6.404/76 e CPC 00):**
- **Ativo**: Recursos econômicos controlados pela entidade, derivados de eventos passados, dos quais se espera geração de benefícios econômicos futuros.
  - *Ativo Circulante*: Bens e direitos realizáveis até o término do exercício social seguinte (12 meses) por ordem decrescente de liquidez (Caixa, Bancos, Aplicações, Clientes, Estoques).
  - *Ativo Não Circulante*: Realizável a Longo Prazo, Investimentos, Imobilizado (bens corpóreos) e Intangível (bens incorpóreos como patentes e softwares).
- **Passivo e Patrimônio Líquido**:
  - *Passivo Circulante*: Obrigações exigíveis no curto prazo (Fornecedores, Salários, Tributos).
  - *Passivo Não Circulante*: Obrigações de longo prazo (> 12 meses).
  - *Patrimônio Líquido (PL)*: Capital Social, Reservas de Capital, Reservas de Lucros e Ajustes de Avaliação Patrimonial.
  $$Ativo = Passivo + Patrimônio Líquido$$

**2. Demonstração dos Fluxos de Caixa (DFC - NBC TG 03 / CPC 03):**
A DFC evidencia as entradas e saídas de caixa e equivalentes de caixa divididas em 3 atividades:
- **Atividades Operacionais (FCO)**: Fluxos decorrentes da atividade-fim e geração diária de receitas da empresa (recebimento de vendas de produtos/serviços, pagamento a fornecedores, salários, tributos).
- **Atividades de Investimento (FCI)**: Aquisição ou alienação de ativos não circulantes (compra/venda de navios, tanques, máquinas, terrenos, softwares).
- **Atividades de Financiamento (FCF)**: Captação e amortização de empréstimos/financiamentos bancários, emissão de debêntures, aumento de capital em dinheiro e pagamento de dividendos/JCP aos sócios.

**3. Métodos de Elaboração da DFC:**
- **Método Direto**: Apresenta diretamente os principais componentes dos recebimentos e pagamentos operacionais brutos.
- **Método Indireto (da Reconciliação)**: Parte do **Lucro Líquido do Exercício** da DRE e ajusta-o somando itens que não afetam o caixa (como despesas de Depreciação e Amortização) e variações no capital de giro.`,
        tabelaDestaque: {
          colunas: ['Evento Econômico', 'Classificação na DFC (CPC 03)', 'Impacto no Caixa'],
          linhas: [
            ['Recebimento de Clientes por Venda de Serviços', 'Atividade Operacional (FCO)', 'Entrada (+)'],
            ['Pagamento de Salários e Fornecedores', 'Atividade Operacional (FCO)', 'Saída (-)'],
            ['Compra de Equipamentos e Navios (Imobilizado)', 'Atividade de Investimento (FCI)', 'Saída (-)'],
            ['Venda de Imóvel antigo com recebimento à vista', 'Atividade de Investimento (FCI)', 'Entrada (+)'],
            ['Captação de Empréstimo Bancário de Longo Prazo', 'Atividade de Financiamento (FCF)', 'Entrada (+)'],
            ['Pagamento de Dividendos aos Acionistas', 'Atividade de Financiamento (FCF)', 'Saída (-)'],
            ['Despesa de Depreciação do Exercício', 'Ajuste do Lucro no Método Indireto', 'Sem impacto no caixa (+ no ajuste)']
          ]
        },
        pontosDeProva: [
          'A despesa de depreciação reduz o lucro na DRE, mas NÃO consome caixa; por isso, é somada de volta no método indireto da DFC.',
          'Pagamento de fornecedores e recebimento de duplicatas são SEMPRE Atividades Operacionais.',
          'Compra e venda de imobilizado/intangível pertencem às Atividades de Investimento.',
          'Empréstimos bancários e pagamentos de dividendos pertencem às Atividades de Financiamento.'
        ]
      }
    ]
  },
  {
    id: 'informatica-lgpd',
    titulo: 'Informática & Segurança de Dados',
    subtitulo: 'LGPD (Lei 13.709/2018), Segurança da Informação (CID) e Funções do Excel 2024',
    secoes: [
      {
        id: 'lgpd-seguranca',
        titulo: 'LGPD (Lei nº 13.709/2018) e Segurança da Informação (Princípios CID)',
        badge: 'Custo-Benefício Máximo',
        conteudoMarkdown: `**1. Lei Geral de Proteção de Dados (LGPD):**
- **Dado Pessoal**: Informação relacionada a pessoa natural identificada ou identificável (Nome, CPF, RG, E-mail, IP).
- **Dado Pessoal Sensível**: Dado pessoal sobre origem racial ou étnica, convicção religiosa, opinião política, filiação a sindicato ou organização religiosa/filosófica, dado referente à saúde ou à vida sexual, dado genético ou biométrico.
- **Agentes de Tratamento**:
  - **Controlador**: Pessoa física ou jurídica a quem competem as decisões referentes ao tratamento de dados pessoais.
  - **Operador**: Pessoa física ou jurídica que realiza o tratamento de dados pessoais em nome do controlador.
  - **Encarregado (DPO - Data Protection Officer)**: Canal de comunicação entre o controlador, os titulares dos dados e a Autoridade Nacional de Proteção de Dados (ANPD).

**2. Princípios da Segurança da Informação (Tríade CID):**
- **Confidencialidade**: Garantia de que a informação é acessível somente por pessoas devidamente autorizadas (Criptografia, senhas fortes, controle de acesso).
- **Integridade**: Garantia da exatidão e completude da informação e dos métodos de processamento (Funções Hash, assinaturas digitais, prevenção contra alterações não autorizadas).
- **Disponibilidade**: Garantia de que os usuários autorizados tenham acesso à informação e aos ativos correspondentes sempre que necessário (Backups regulares, redundância de servidores, planos de continuidade de negócios).

**3. Principais Ameaças Digitais:**
- **Ransomware**: Malware que criptografa os arquivos do usuário e exige resgate (normalmente em criptomoedas) para fornecer a chave de descriptografia.
- **Phishing**: Técnica de engenharia social que utiliza e-mails, mensagens ou sites fraudulentos imitando instituições legítimas para induzir a vítima a fornecer credenciais, senhas ou dados bancários.
- **Spyware / Keylogger**: Malware projetado para monitorar secretamente a atividade do usuário e registrar teclas digitadas.`,
        tabelaDestaque: {
          colunas: ['Conceito LGPD', 'Definição e Exemplo Prático', 'Artigo na Lei'],
          linhas: [
            ['Dado Pessoal Comum', 'Nome, CPF, CNH, Endereço residencial, Endereço IP', 'Art. 5º, I'],
            ['Dado Pessoal Sensível', 'Biometria, Atestado de Saúde, Exames médicos periódicos, Filiação sindical', 'Art. 5º, II'],
            ['Anonimização', 'Uso de meios técnicos razoáveis pelos quais um dado perde a possibilidade de associação com seu titular', 'Art. 5º, XI'],
            ['Consentimento', 'Manifestação livre, informada e inequívoca pela qual o titular concorda com o tratamento', 'Art. 7º, I']
          ]
        },
        pontosDeProva: [
          'A Cesgranrio costuma colocar dados como "filiação a sindicato" ou "biometria facial" como dados comuns: são DADOS SENSÍVEIS com regras rígidas de tratamento.',
          'O Encarregado (DPO) atua como ponte oficial de comunicação entre o titular, o controlador e a ANPD.',
          'O princípio da Integridade protege contra modificação não autorizada; a Confidencialidade protege contra visualização não autorizada.'
        ]
      },
      {
        id: 'excel-formulas-avancadas',
        titulo: 'Microsoft Excel 2024: Fórmulas Chave e Sintaxe Cesgranrio',
        badge: 'Prático e Recorrente',
        conteudoMarkdown: `A banca Cesgranrio adora apresentar tabelas de planilhas e perguntar o resultado exato de fórmulas com referências absolutas.

**1. Fórmulas de Busca e Procura:**
- **PROCV(valor_procurado; matriz_tabela; num_indice_coluna; [procurar_intervalo])**: Procura um valor na primeira coluna à esquerda e retorna o valor na mesma linha de uma coluna especificada. Se o quarto argumento for \`FALSO\` ou \`0\`, realiza busca exata.
- **PROCX(pesquisa_valor; matriz_pesquisa; matriz_retorno; [se_não_encontrada]; [modo_correspondência])**: Versão moderna mais poderosa do PROCV, procura tanto na vertical quanto na horizontal sem exigir que o índice esteja à direita.

**2. Fórmulas Condicionais:**
- **SE(teste_lógico; valor_se_verdadeiro; valor_se_falso)**: Retorna um valor se a condição for atendida e outro se não for.
- **SOMASE(intervalo; critérios; [intervalo_soma])**: Soma as células em um intervalo que atendem a um critério especificado.
- **CONT.SE(intervalo; critérios)**: Conta o número de células em um intervalo que atendem a um critério.

**3. Referências Relativas vs. Absolutas (O Cifrão $):**
- \`A1\`: Relativa total (ao arrastar para o lado ou para baixo, linha e coluna mudam).
- \`$A$1\`: Absoluta total (linha e coluna travadas; não mudam ao arrastar).
- \`$A1\`: Coluna travada, linha relativa.
- \`A$1\`: Linha travada, coluna relativa.`,
        tabelaDestaque: {
          colunas: ['Fórmula Excel', 'Exemplo de Sintaxe', 'Resultado / Comportamento'],
          linhas: [
            ['=PROCV("Diesel"; A2:D100; 3; FALSO)', 'Busca "Diesel" na col A e traz o valor da col C (3ª col)', 'Retorna o preço unitário correspondente com busca exata'],
            ['=SOMASE(B2:B50; "Transpetro"; C2:C50)', 'Soma valores de C2:C50 onde B2:B50 for "Transpetro"', 'Total financeiro consolidado'],
            ['=CONT.SE(D2:D100; ">=1000")', 'Conta quantas células na coluna D têm valor maior ou igual a 1000', 'Número inteiro de ocorrências'],
            ['=SE(E2>=70; "Aprovado"; "Reprovado")', 'Testa nota do candidato na célula E2', 'Exibe o texto condicional']
          ]
        },
        pontosDeProva: [
          'Atenção ao quarto argumento do PROCV: se omitido ou VERDADEIRO, ele faz busca aproximada (e exige ordem crescente); para busca exata deve ser FALSO.',
          'Em fórmulas arrastadas, identifique onde está o cifrão ($): se estiver antes do número, a linha não muda; se estiver antes da letra, a coluna não muda.'
        ]
      }
    ]
  }
];
