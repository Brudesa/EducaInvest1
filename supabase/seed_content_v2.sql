-- Limpa dados existentes para evitar duplicidade e garantir a ordem correta
TRUNCATE TABLE lessons CASCADE;
TRUNCATE TABLE terms CASCADE;

-- Reinicia as sequências de ID para garantir consistência
ALTER SEQUENCE lessons_id_seq RESTART WITH 1;
ALTER SEQUENCE terms_id_seq RESTART WITH 1;

-- =================================================================================
-- MÓDULO 1: O DESPERTAR (FUNDAMENTOS)
-- Foco: Sair da inércia e proteger o que tem.
-- =================================================================================

INSERT INTO lessons (title_short, title_full, level, duration, description, transcript_html, order_index) VALUES
(
    'A "Matrix" do Dinheiro', 
    'A "Matrix" do Dinheiro: Ativos vs Passivos', 
    'fundamentos', 
    '5 min', 
    'Entenda a diferença fundamental entre o que coloca e o que tira dinheiro do seu bolso.',
    '<p>Você já se sentiu preso em um ciclo onde, não importa o quanto ganhe, o dinheiro nunca parece suficiente? Bem-vindo à "Matrix" financeira. A maioria das pessoas vive trabalhando pelo dinheiro, sem entender como fazê-lo trabalhar para elas.</p>
    
    <h2>A Diferença Vital</h2>
    <p>O conceito mais importante que você aprenderá hoje vem de Robert Kiyosaki, autor de "Pai Rico, Pai Pobre". A diferença entre ricos e pobres não é o salário, é o destino do dinheiro.</p>
    
    <ul>
        <li><strong>Ativos:</strong> Tudo aquilo que coloca dinheiro no seu bolso (Ações, Imóveis de aluguel, Títulos Públicos, Negócios).</li>
        <li><strong>Passivos:</strong> Tudo aquilo que tira dinheiro do seu bolso (Carro, Casa própria cara, Assinaturas não usadas, Dívidas de cartão).</li>
    </ul>

    <h2>O Erro Comum</h2>
    <p>A classe média tende a comprar passivos achando que são ativos. "Comprei um carro novo, é um investimento!" — Errado. É um passivo que gera IPVA, gasolina, seguro e depreciação. Não é proibido ter passivos, mas você precisa de ativos para pagá-los.</p>

    <blockquote>"Os ricos compram ativos. Os pobres têm apenas despesas. A classe média compra passivos pensando que são ativos."</blockquote>',
    1
),
(
    'O Vilão Invisível', 
    'O Vilão Invisível: Inflação e Perda de Poder', 
    'fundamentos', 
    '4 min', 
    'Descubra como o dinheiro parado perde valor todos os dias e como se proteger.',
    '<p>Imagine que você guardou R$ 100,00 embaixo do colchão em 1994, no início do Plano Real. Hoje, esse mesmo dinheiro compraria menos de R$ 15,00 em mercadorias daquela época. Onde foi parar o resto? Foi devorado pelo "vilão invisível": a <strong>Inflação</strong>.</p>

    <h2>O que é Inflação?</h2>
    <p>Inflação é o aumento generalizado dos preços. Ela corrói o seu poder de compra. Se o seu dinheiro não está rendendo acima da inflação, você está, literalmente, ficando mais pobre a cada dia.</p>

    <h2>IPCA: O Termômetro</h2>
    <p>No Brasil, medimos a inflação oficial pelo <strong>IPCA</strong>. Se o IPCA é de 5% ao ano e seu investimento rende 4%, seu ganho real foi negativo. Você perdeu poder de compra.</p>
    
    <p><strong>Regra de Ouro:</strong> Seu primeiro objetivo como investidor não é ficar rico, é não ficar pobre. Você precisa bater a inflação.</p>',
    2
),
(
    'O Escudo', 
    'O Escudo: Reserva de Emergência & Liquidez', 
    'fundamentos', 
    '6 min', 
    'Antes de atacar, é preciso saber se defender. Monte sua segurança financeira.',
    '<p>Nenhum general vai para a guerra sem um escudo. No mundo dos investimentos, seu escudo é a <strong>Reserva de Emergência</strong>.</p>

    <h2>Para que serve?</h2>
    <p>O carro quebrou? Perdeu o emprego? Problema de saúde? A Reserva serve para que você não precise se endividar (pegando empréstimos caros) ou vender seus investimentos na hora errada para cobrir imprevistos.</p>

    <h2>Quanto ter?</h2>
    <p>A regra geral é ter de <strong>3 a 6 meses do seu custo de vida mensal</strong> guardados.</p>
    <ul>
        <li>Se você é CLT e tem estabilidade: 3 a 6 meses.</li>
        <li>Se você é autônomo ou empreendedor: 6 a 12 meses.</li>
    </ul>

    <h2>Onde investir a Reserva?</h2>
    <p>Aqui a regra é clara: <strong>Segurança e Liquidez</strong> (facilidade de sacar). Esqueça a rentabilidade alta aqui.</p>
    <ul>
        <li>Tesouro Selic</li>
        <li>CDB de banco grande com Liquidez Diária (que pague 100% do CDI)</li>
    </ul>
    <p>Poupança? Não. Ela perde para a inflação na maioria das vezes. Tesouro Selic e CDBs rendem mais e são tão seguros quanto.</p>',
    3
);

-- =================================================================================
-- MÓDULO 2: A CONSTRUÇÃO (FERRAMENTAS)
-- Foco: Conhecer as opções de investimento.
-- =================================================================================

INSERT INTO lessons (title_short, title_full, level, duration, description, transcript_html, order_index) VALUES
(
    'A Regra do Jogo', 
    'A Regra do Jogo: Selic & Renda Fixa', 
    'pratica', 
    '7 min', 
    'Entenda a taxa mãe da economia e como emprestar dinheiro para o governo e bancos.',
    '<p>Bem-vindo ao mundo da Renda Fixa. Aqui, você é o banco. Na Renda Fixa, você empresta seu dinheiro para alguém (Governo, Bancos ou Empresas) em troca de uma taxa de juros acordada.</p>

    <h2>A Taxa Selic</h2>
    <p>A Selic é a taxa básica de juros da economia, definida pelo Banco Central a cada 45 dias. Ela é o "custo do dinheiro".</p>
    <ul>
        <li><strong>Selic Alta:</strong> Bom para investir em Renda Fixa, ruim para pegar empréstimos e para o consumo.</li>
        <li><strong>Selic Baixa:</strong> Renda Fixa rende pouco, incentiva o consumo e investimentos em Renda Variável (Ações/FIIs).</li>
    </ul>

    <h2>Principais Títulos</h2>
    <ul>
        <li><strong>Tesouro Direto:</strong> Você empresta para o Governo Federal. É o investimento mais seguro do país.</li>
        <li><strong>CDB (Certificado de Depósito Bancário):</strong> Você empresta para um Banco. Tem a garantia do FGC (Fundo Garantidor de Créditos) até R$ 250 mil.</li>
        <li><strong>LCI/LCA:</strong> Empresta para os setores Imobiliário ou Agrícola. São isentos de Imposto de Renda.</li>
    </ul>',
    4
),
(
    'Risco e Retorno', 
    'Risco e Retorno: Renda Variável & Volatilidade', 
    'pratica', 
    '8 min', 
    'Como se tornar sócio de grandes empresas e buscar retornos maiores.',
    '<p>Se na Renda Fixa você empresta dinheiro, na Renda Variável você se torna <strong>sócio</strong>.</p>

    <h2>Ações</h2>
    <p>Comprar uma ação é comprar um pedacinho de uma empresa real (como Petrobras, Vale, Itaú). Você ganha de duas formas:</p>
    <ol>
        <li><strong>Valorização:</strong> A empresa cresce e a ação fica mais cara.</li>
        <li><strong>Dividendos:</strong> A empresa reparte o lucro com os acionistas (isento de IR no Brasil).</li>
    </ol>

    <h2>O Preço da Renda Variável: Volatilidade</h2>
    <p>Não existe almoço grátis. Para ter potencial de ganhos maiores que a Renda Fixa, você precisa aceitar que o preço dos seus ativos vai oscilar (volatilidade). Um dia cai 2%, no outro sobe 3%.</p>
    
    <p><strong>Dica de Ouro:</strong> Na Renda Variável, só se perde dinheiro de verdade quando se vende o ativo na baixa. Se a empresa continua boa, a queda de preço é apenas uma oportunidade de comprar mais barato.</p>',
    5
),
(
    'Ovos na Cesta', 
    'Não coloque todos os ovos na mesma cesta: Diversificação', 
    'pratica', 
    '5 min', 
    'A única técnica capaz de aumentar seu retorno enquanto diminui seu risco.',
    '<p>Imagine que você investiu tudo em uma empresa de guarda-chuvas. Se fizer sol o ano todo, você quebra. Se você investir tudo em uma empresa de protetor solar, e chover o ano todo, você quebra.</p>
    <p>Agora, se você comprar ações das duas empresas, você lucra independentemente do clima. Isso é <strong>Diversificação</strong>.</p>

    <h2>Correlação</h2>
    <p>O segredo é ter ativos descorrelacionados, ou seja, que não se movem juntos para o mesmo lado.</p>
    <ul>
        <li>Renda Fixa (Segurança)</li>
        <li>Ações Brasileiras (Crescimento)</li>
        <li>Ações Americanas/Dólar (Proteção contra crise no Brasil)</li>
        <li>Fundos Imobiliários (Renda mensal)</li>
    </ul>

    <p>Uma carteira bem diversificada é aquela que você nunca está 100% feliz (porque sempre algo está caindo), mas nunca está quebrado.</p>',
    6
);

-- =================================================================================
-- MÓDULO 3: A ESTRATÉGIA (EFICIÊNCIA)
-- Nota: Mudança de "Avançado" para "Estratégia".
-- =================================================================================

INSERT INTO lessons (title_short, title_full, level, duration, description, transcript_html, order_index) VALUES
(
    'O Tempo é Aliado', 
    'O Tempo é seu aliado: Juros Compostos no Longo Prazo', 
    'alta_performance', 
    '6 min', 
    'A oitava maravilha do mundo segundo Einstein. Veja o efeito bola de neve.',
    '<p>Albert Einstein teria dito: "Os juros compostos são a força mais poderosa do universo". Exagero ou não, matematicamente é verdade no mundo das finanças.</p>

    <h2>A Curva Exponencial</h2>
    <p>Nos primeiros anos, o ganho parece pequeno. É a fase de acumulação. Mas existe um "ponto de virada" (hockey stick) onde os juros que seu dinheiro gera começam a ser maiores que seus próprios aportes mensais.</p>

    <h2>A Fórmula Mágica</h2>
    <p>Não é Mágica, é Tempo. A fórmula dos juros compostos é <code>M = C (1+i)^t</code>. Repare que o "t" (tempo) é um expoente. Ele potencializa tudo.</p>
    
    <p>Investir R$ 500 por mês por 10 anos é bom. Por 30 anos, é milionário. Começar cedo é mais importante do que começar com muito dinheiro.</p>',
    7
),
(
    'O Leão e as Taxas', 
    'O Leão e as Taxas: Custos, IR e como pagar menos', 
    'alta_performance', 
    '8 min', 
    'Não deixe seus lucros serem comidos por taxas e impostos desnecessários.',
    '<p>Muitos investidores focam apenas na rentabilidade bruta e esquecem do que realmente importa: o dinheiro líquido no bolso.</p>

    <h2>Taxas Administrativas</h2>
    <p>Fuja de fundos de investimento com taxas de administração altas (acima de 1,5% a.a.) que não superam o CDI. Fuja de Títulos de Capitalização e Previdências Privadas ruins cheias de taxas de carregamento.</p>

    <h2>Imposto de Renda (O Leão)</h2>
    <ul>
        <li><strong>Renda Fixa:</strong> Segue a tabela regressiva (22,5% até 15%). Quanto mais tempo deixar, menos paga.</li>
        <li><strong>Ações:</strong> Vendas de até R$ 20 mil no mês são <strong>ISENTAS</strong> de IR (para swing trade). Use isso a seu favor!</li>
        <li><strong>FIIs:</strong> Dividendos são <strong>ISENTOS</strong> para pessoa física, mas o lucro na venda da cota paga 20% de IR.</li>
    </ul>
    
    <p>A melhor estratégia tributária é o longo prazo (Buy and Hold), pois você adia o pagamento de impostos sobre o ganho de capital indefinidamente.</p>',
    8
);

-- =================================================================================
-- TRILHAS EXTRAS (ESPECIALISTA)
-- Desbloqueadas após o curso base ou interações específicas.
-- =================================================================================

INSERT INTO lessons (title_short, title_full, level, duration, description, transcript_html, order_index) VALUES
-- TRILHA FIIs
(
    'Tijolo vs Papel', 
    'O que são Tijolo e Papel?', 
    'especialista-fii', 
    '5 min', 
    'Fundos Imobiliários: Entenda as duas grandes categorias.',
    '<p>Nos Fundos Imobiliários (FIIs), existem dois tipos principais de ativos:</p>
    <h2>FIIs de Tijolo</h2>
    <p>São fundos que compram imóveis reais: shoppings, galpões logísticos, prédios comerciais. Você ganha com o aluguel desses imóveis.</p>
    <ul>
        <li>Vantagem: Proteção contra inflação (imóveis valorizam) e contratos de aluguel reajustados.</li>
    </ul>
    <h2>FIIs de Papel</h2>
    <p>São fundos que investem em títulos de dívida imobiliária (CRI, LCI). Eles não têm imóveis, têm "papéis" que pagam juros.</p>
    <ul>
        <li>Vantagem: Costumam pagar dividendos mais altos e constantes.</li>
        <li>Risco: Não têm a valorização do imóvel físico.</li>
    </ul>',
    9
),
(
    'Relatório Gerencial', 
    'Como ler um Relatório Gerencial', 
    'especialista-fii', 
    '7 min', 
    'O documento mais importante para o investidor de FIIs.',
    '<p>Não compre um FII apenas pelo seu Dividend Yield. Leia o Relatório Gerencial mensal.</p>
    <h2>O que procurar?</h2>
    <ul>
        <li><strong>Vacância:</strong> Quantos % dos imóveis estão vagos? (Menor é melhor)</li>
        <li><strong>Inadimplência:</strong> Os inquilinos estão pagando em dia?</li>
        <li><strong>Vencimento dos Contratos:</strong> Os contratos vão acabar logo? Há risco de saída?</li>
    </ul>',
    10
),
(
    'Dividend Yield vs Valorização', 
    'Dividend Yield vs Valorização: A Ilusão', 
    'especialista-fii', 
    '6 min', 
    'Cuidado com dividendos altos artificialmente.',
    '<p>Um DY (Dividend Yield) muito alto pode ser uma armadilha. Se um fundo paga 15% ao ano, mas a cota cai 20%, você perdeu dinheiro.</p>
    <p>Muitas vezes, um DY alto reflete um risco alto (ninguém quer comprar a cota, o preço cai, o yield sobe matematicamente) ou um pagamento não-recorrente (o fundo vendeu um imóvel).</p>',
    11
),

-- TRILHA AÇÕES (MASTER)
(
    'Indicadores Básicos', 
    'P/L, ROE e P/VP (Indicadores)', 
    'especialista-acao', 
    '8 min', 
    'A sopa de letrinhas da análise fundamentalista.',
    '<p>Como saber se uma ação está barata ou cara?</p>
    <h2>P/L (Preço sobre Lucro)</h2>
    <p>Em quantos anos a empresa se "paga" com o lucro atual? Um P/L de 10 significa que o preço da ação equivale a 10 anos de lucro. Históricamente, P/L muito alto pode indicar ação cara.</p>
    <h2>P/VP (Preço sobre Valor Patrimonial)</h2>
    <p>Quanto o mercado paga pelo patrimônio líquido da empresa. Abaixo de 1.0, a empresa vale na bolsa menos do que o patrimônio dela (desconto).</p>
    <h2>ROE (Retorno sobre Patrimônio)</h2>
    <p>Mede a eficiência. Quanto lucro a empresa gera para cada real que os sócios investiram. ROE alto e constante é sinal de qualidade (ex: acima de 15%).</p>',
    12
),
(
    'Small Caps vs Blue Chips', 
    'Small Caps vs Blue Chips', 
    'especialista-acao', 
    '5 min', 
    'Gigantes estáveis ou pequenas promessas explosivas?',
    '<h2>Blue Chips</h2>
    <p>São as empresas gigantes, líderes de mercado, com lucros consolidados (Ex: Banco do Brasil, Vale, Ambev). Oferecem mais segurança e dividendos, mas crescem mais devagar.</p>
    <h2>Small Caps</h2>
    <p>Empresas com menor valor de mercado. Têm potencial de crescimento explosivo (multiplicar por 2x, 3x, 10x), mas embutem um risco muito maior e maior volatilidade.</p>',
    13
),
(
    'Análise de Setores', 
    'Análise de Setores: Cíclicos e Perenes', 
    'especialista-acao', 
    '6 min', 
    'Entenda onde você está pisando.',
    '<h2>Setores Perenes</h2>
    <p>Necessidades básicas que nunca acabam: Energia Elétrica, Saneamento, Seguros, Bancos. Ótimos para carteiras previdenciárias e dividendos.</p>
    <h2>Setores Cíclicos</h2>
    <p>Dependem da economia: Varejo, Construção Civil, Turismo. Ótimos para ganhar com a valorização na retomada da economia, mas perigosos em crises.</p>',
    14
),

-- TRILHA RENDA FIXA TURBINADA
(
    'Marcação a Mercado', 
    'Marcação a Mercado: Ganhando com a queda dos juros', 
    'especialista-rf', 
    '9 min', 
    'O segredo para ter retornos de Bolsa na Renda Fixa.',
    '<p>Você sabia que seu Tesouro IPCA pode valorizar 30% ou 40% em um ano? Isso acontece devido à <strong>Marcação a Mercado</strong>.</p>
    <p>Quando a expectativa de juros futuros CAI, o preço do título que você já tem (que paga uma taxa antiga mais alta) SOBE. É possível vender antecipadamente com lucro.</p>
    <p>Mas cuidado: O contrário também ocorre. Se os juros sobem, seu título desvaloriza temporariamente.</p>',
    15
),
(
    'Debêntures e Crédito', 
    'Debêntures e Risco de Crédito', 
    'especialista-rf', 
    '6 min', 
    'Emprestando para empresas, não para bancos.',
    '<p>Debêntures são títulos de dívida emitidos por empresas (não bancos). Ao comprar uma debênture, você empresta dinheiro para a empresa financiar projetos.</p>
    <h2>Risco x Retorno</h2>
    <p>Como não têm garantia do FGC (igual os bancos), as debêntures pagam taxas maiores (Prêmio de Risco). É essencial analisar a saúde financeira da empresa emissora (Rating).</p>
    <p><strong>Debêntures Incentivadas:</strong> São isentas de Imposto de Renda (geralmente ligadas a infraestrutura).</p>',
    16
);

-- INSERIR TERMOS (EXEMPLOS SELECIONADOS PARA POPULAR)
-- Nota: Limparemos e inseriremos apenas alguns essenciais para compatibilidade.
-- O usuário pode pedir para popular mais termos depois.
INSERT INTO terms (acronym, name, explanation_simple, explanation_full, category, lesson_id, example, tip) VALUES
('IPCA', 'Índice Nacional de Preços ao Consumidor Amplo', 'A inflação oficial do Brasil.', 'Mede a variação de preços de uma cesta de produtos e serviços consumidos pelas famílias.', 'economia', 2, 'Se o IPCA é 10%, seu dinheiro compra 10% menos coisas.', 'Busque investimentos IPCA+ para se proteger.'),
('CDI', 'Certificado de Depósito Interbancário', 'A taxa que os bancos usam entre si.', 'Muitos investimentos de Renda Fixa rendem uma % do CDI. Ele anda sempre muito próximo da Selic.', 'economia', 4, 'Um CDB 100% do CDI rende praticamente a mesma coisa que a Selic.', NULL),
('FGC', 'Fundo Garantidor de Créditos', 'O seguro dos investimentos.', 'Garante até R$ 250 mil por CPF por instituição financeira em caso de falência do banco.', 'seguranca', 4, 'Se o banco quebrar, o FGC devolve seu dinheiro investido em CDB, LCI ou LCA.', 'Tesouro Direto não tem FGC, pois é garantido pelo Tesouro Nacional (o que é ainda mais seguro).'),
('ROE', 'Return on Equity', 'Retorno sobre o Patrimônio.', 'Mede a capacidade da empresa de agregar valor a partir de seus próprios recursos.', 'indicadores', 12, 'ROE de 20% significa que a cada R$ 100 investidos, a empresa lucra R$ 20.', 'Busque empresas com ROE acima de 15%.');
