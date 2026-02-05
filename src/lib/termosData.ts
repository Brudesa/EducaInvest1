import { Level } from "../components/aprender/LevelFilter";
import { Category } from "../components/aprender/CategoryFilter";

// --- TIPAGEM DA AULA ---
export interface Aula {
  id: number;
  titulo: string;         // Título Curto (Menu Lateral)
  tituloCompleto: string; // Título Longo (Cabeçalho da Aula)
  nivel: Level;
  duracao: string;
  descricao: string;
  transcricaoCompleta: string;
}

// --- TIPAGEM DO TERMO ---
export interface Termo {
  id: number;
  sigla: string;
  nome: string;
  explicacaoCompleta: string;
  explicacaoSimplificada: string;
  exemplo: string;
  dicaComoComecar?: string;
  nivelId: Level;
  categoria: Category;
  audioUrl?: string;
  aulaAssociadaId?: number;
}

// =================================================================
// BANCO DE DADOS DAS AULAS (PODCASTS)
// =================================================================
export const aulas: Aula[] = [
  // --- NÍVEL: INTRODUTÓRIO (A BASE) ---
  {
    id: 1,
    titulo: "Quando e como começar?",
    tituloCompleto: "O Primeiro Passo: Organizando a Casa",
    nivel: "iniciante",
    duracao: "5 min",
    descricao: "Organização financeira possível com a regra 50-30-20. Não é sobre sobrar dinheiro, é sobre entender a realidade.",
    transcricaoCompleta: `
      <div class="space-y-6">
        <div class="bg-primary/10 border-l-4 border-primary p-4 rounded-r-lg">
          <span class="text-primary font-bold uppercase text-xs tracking-wider block mb-1">💡 Conceito Chave</span>
          <p class="text-white/90 italic text-sm m-0">A construção da casa. Não dá para colocar o telhado (investir) sem ter o chão (organização).</p>
        </div>

        <div>
          <h3 class="text-xl font-bold text-white mb-2">Abertura</h3>
          <p class="text-muted-foreground leading-relaxed">Muita gente quer começar a investir comprando ações ou criptomoedas. Isso é como querer colocar o telhado de uma casa antes de fazer o alicerce. Vai cair. O começo não é sobre rentabilidade, é sobre <strong>Organização</strong>.</p>
        </div>
        
        <div>
          <h3 class="text-xl font-bold text-white mb-2">Desenvolvimento</h3>
          <p class="text-muted-foreground leading-relaxed mb-4">A maioria de nós não aprendeu a lidar com dinheiro. A gente recebe, paga boleto e reza para sobrar. Para quebrar esse ciclo, precisamos de um mapa.</p>
          <p class="text-muted-foreground leading-relaxed mb-4">Uma ferramenta simples é a <strong class="text-white">Regra 50-30-20</strong>. Imagine seu salário como uma pizza fatiada em três partes:</p>
          <ul class="list-disc pl-5 space-y-2 text-muted-foreground marker:text-primary">
            <li><strong class="text-white">50% (Sobrevivência):</strong> Aluguel, comida, luz. O básico para viver.</li>
            <li><strong class="text-white">30% (Estilo de Vida):</strong> Lazer, um presente, um jantar. Cortar isso é insustentável no longo prazo.</li>
            <li><strong class="text-white">20% (Eu do Futuro):</strong> Dinheiro para seus objetivos e aposentadoria.</li>
          </ul>
          <p class="text-muted-foreground leading-relaxed mt-4"><em>"Mas não sobra nada!"</em>. A realidade do brasileiro é dura. Se não der para guardar 20%, guarde 5%. O objetivo inicial não é ficar rico, é criar o hábito.</p>
          <p class="text-muted-foreground leading-relaxed">Esse dinheiro guardado vai formar sua <strong>Reserva de Emergência</strong>. Pense nela como um "colete salva-vidas". Você não usa o colete para nadar mais rápido, você usa para não se afogar se o barco virar (desemprego, doença). Esse dinheiro precisa ter <strong>liquidez</strong>: tem que estar na mão na hora que o problema acontece.</p>
        </div>
        
        <div class="pt-4 border-t border-white/10">
          <h3 class="text-lg font-bold text-white mb-2">Fechamento</h3>
          <p class="text-muted-foreground">Primeiro você organiza a casa e veste o colete salva-vidas. Só depois você pensa em navegar em alto mar. Um passo de cada vez.</p>
        </div>
      </div>
    `
  },
  {
    id: 2,
    titulo: "Guardar ou Investir?",
    tituloCompleto: "Poupar vs Investir: A Diferença Vital",
    nivel: "iniciante",
    duracao: "5 min",
    descricao: "A despensa vs. A horta. Entenda a diferença entre segurança (poupança) e multiplicação (juros compostos).",
    transcricaoCompleta: `
      <div class="space-y-6">
        <div class="bg-primary/10 border-l-4 border-primary p-4 rounded-r-lg">
          <span class="text-primary font-bold uppercase text-xs tracking-wider block mb-1">💡 Conceito Chave</span>
          <p class="text-white/90 italic text-sm m-0">A despensa vs. A horta. (Segurança vs. Multiplicação).</p>
        </div>

        <div>
          <h3 class="text-xl font-bold text-white mb-2">Abertura</h3>
          <p class="text-muted-foreground leading-relaxed">Você tem dinheiro parado na conta corrente ou na Poupança? Parabéns, você é um poupador. Mas você ainda não é um investidor. E existe uma traça invisível comendo esse dinheiro guardado: a <strong>Inflação</strong>.</p>
        </div>
        
        <div>
          <h3 class="text-xl font-bold text-white mb-2">Desenvolvimento</h3>
          <p class="text-muted-foreground leading-relaxed mb-4">Guardar dinheiro é como estocar comida na despensa. É seguro, está ali quando você precisa. Mas se ficar muito tempo, estraga. No mundo financeiro, quem estraga seu dinheiro é o <strong>IPCA (a inflação)</strong>. R$ 100 hoje compram muito menos do que compravam há 10 anos.</p>
          <p class="text-muted-foreground leading-relaxed mb-4">A Poupança hoje funciona como essa despensa antiga. O rendimento dela é tão baixo que, muitas vezes, apenas empata com a inflação. Você acha que tem o mesmo dinheiro, mas ele vale menos.</p>
          <div class="bg-white/5 p-4 rounded-lg my-4">
            <p class="text-white font-medium mb-2">🌱 A Metáfora da Horta</p>
            <p class="text-muted-foreground text-sm">Investir é pegar a semente e plantar. Você corre riscos? Sim, pode não chover (risco de mercado). Mas é a única forma de a semente virar árvore.</p>
          </div>
          <p class="text-muted-foreground leading-relaxed">É aqui que entra a mágica dos <strong>Juros Compostos</strong>. Eles são o "super adubo" da sua horta. Funciona assim: sua árvore dá frutos. Em vez de comer tudo, você planta esses frutos. Agora você tem duas árvores. Depois quatro, depois oito. É o famoso "juros sobre juros". É a única força capaz de transformar pouco dinheiro em muito patrimônio no longo prazo.</p>
        </div>
        
        <div class="pt-4 border-t border-white/10">
          <h3 class="text-lg font-bold text-white mb-2">Fechamento</h3>
          <p class="text-muted-foreground">Não jogue todo seu dinheiro na horta (risco), nem deixe tudo na despensa (perda de valor). Dinheiro de curto prazo a gente guarda. Dinheiro de longo prazo a gente investe.</p>
        </div>
      </div>
    `
  },
  {
    id: 3,
    titulo: "Tesouro e Renda Fixa",
    tituloCompleto: "Renda Fixa: Segurança e seus Riscos",
    nivel: "iniciante",
    duracao: "6 min",
    descricao: "O contrato de empréstimo e as letras miúdas. Tesouro, CDB e os riscos invisíveis.",
    transcricaoCompleta: `
      <div class="space-y-6">
        <div class="bg-primary/10 border-l-4 border-primary p-4 rounded-r-lg">
          <span class="text-primary font-bold uppercase text-xs tracking-wider block mb-1">💡 Conceito Chave</span>
          <p class="text-white/90 italic text-sm m-0">O contrato de empréstimo e as letras miúdas.</p>
        </div>

        <div>
          <h3 class="text-xl font-bold text-white mb-2">Abertura</h3>
          <p class="text-muted-foreground leading-relaxed">Quando você investe em Renda Fixa, você muda de lado no balcão. Você deixa de ser quem pede dinheiro emprestado e passa a ser o banqueiro: você é quem empresta. Mas para quem você está emprestando?</p>
        </div>
        
        <div>
          <h3 class="text-xl font-bold text-white mb-2">Desenvolvimento</h3>
          <p class="text-muted-foreground leading-relaxed mb-4">Se você empresta para o governo brasileiro, isso se chama <strong>Tesouro Direto</strong>. Se empresta para um banco, chama-se <strong>CDB</strong>. O quanto eles te pagam de juros depende da <strong>Selic</strong> (a taxa mãe da economia) ou do <strong>CDI</strong>. Se a economia vai mal e os juros sobem, você ganha mais.</p>
          <p class="text-muted-foreground leading-relaxed mb-2">"Então é risco zero?" Não. Existem pegadinhas:</p>
          <ul class="list-disc pl-5 space-y-3 text-muted-foreground marker:text-amber-500">
            <li><strong class="text-white">A Impaciência (IOF):</strong> Existe um imposto que é uma multa para quem investe e saca em menos de 30 dias. Se você for ansioso, o governo fica com seu lucro.</li>
            <li><strong class="text-white">O Tempo (Liquidez):</strong> Alguns títulos (como LCI e LCA) são "trancados". Você empresta o dinheiro e o banco só devolve daqui a 2 anos. Se você precisar do dinheiro para uma emergência amanhã, você não consegue sacar.</li>
          </ul>
        </div>
        
        <div class="pt-4 border-t border-white/10">
          <h3 class="text-lg font-bold text-white mb-2">Fechamento</h3>
          <p class="text-muted-foreground">Renda Fixa é segura, mas exige planejamento. Dinheiro que você pode precisar a qualquer momento tem que ficar no Tesouro Selic ou CDB com Liquidez Diária. Para o resto, você pode travar o dinheiro para ganhar mais.</p>
        </div>
      </div>
    `
  },

  // --- NÍVEL: INTERMEDIÁRIO (O MERCADO) ---
  {
    id: 4,
    titulo: "O que é a Bolsa?",
    tituloCompleto: "Desmistificando a Bolsa de Valores",
    nivel: "intermediario",
    duracao: "5 min",
    descricao: "O Supermercado de Empresas. Preço vs Valor e como funciona o mercado.",
    transcricaoCompleta: `
      <div class="space-y-6">
        <div class="bg-amber-500/10 border-l-4 border-amber-500 p-4 rounded-r-lg">
          <span class="text-amber-500 font-bold uppercase text-xs tracking-wider block mb-1">💡 Conceito Chave</span>
          <p class="text-white/90 italic text-sm m-0">O Supermercado de Empresas (Preço vs. Valor).</p>
        </div>

        <div>
          <h3 class="text-xl font-bold text-white mb-2">Abertura</h3>
          <p class="text-muted-foreground leading-relaxed">Esqueça a imagem de homens gritando com telefones na mão. A Bolsa de Valores hoje é silenciosa, digital e funciona exatamente como um supermercado ou uma feira livre.</p>
        </div>
        
        <div>
          <h3 class="text-xl font-bold text-white mb-2">Desenvolvimento</h3>
          <p class="text-muted-foreground leading-relaxed mb-4">A Bolsa (B3) é o lugar onde as empresas vão para vender pedacinhos delas mesmas. Elas fazem isso para captar dinheiro e construir fábricas ou lojas. Nós, investidores, compramos esses pedacinhos esperando que a empresa cresça.</p>
          <p class="text-muted-foreground leading-relaxed mb-4">A diferença para um supermercado comum é que, na Bolsa, os preços das etiquetas mudam a cada segundo. Se sai uma notícia ruim, o preço cai. Se sai uma notícia boa, o preço sobe.</p>
          <div class="bg-white/5 border border-white/10 p-4 rounded-lg">
            <strong class="text-white block mb-1">🚨 O Circuit Breaker</strong>
            <p class="text-muted-foreground text-sm m-0">Às vezes, o mercado entra em pânico coletivo. Para evitar um desastre, existe o Circuit Breaker. É como um disjuntor de segurança: se a bolsa cair 10%, ela "desliga" por 30 minutos para todo mundo beber uma água e acalmar os ânimos.</p>
          </div>
        </div>
        
        <div class="pt-4 border-t border-white/10">
          <h3 class="text-lg font-bold text-white mb-2">Fechamento</h3>
          <p class="text-muted-foreground">A Bolsa é volátil. Ela chacoalha. Mas no longo prazo, ela segue o lucro das empresas. Se as empresas lucram, a bolsa sobe. Não se assuste com o barulho do curto prazo.</p>
        </div>
      </div>
    `
  },
  {
    id: 5,
    titulo: "Sócio ou Apostador?",
    tituloCompleto: "Mentalidade de Sócio: Como Ganhar no Longo Prazo",
    nivel: "intermediario",
    duracao: "5 min",
    descricao: "Ações, ETFs e Fundos. Como virar dono de grandes negócios.",
    transcricaoCompleta: `
      <div class="space-y-6">
        <div class="bg-amber-500/10 border-l-4 border-amber-500 p-4 rounded-r-lg">
          <span class="text-amber-500 font-bold uppercase text-xs tracking-wider block mb-1">💡 Conceito Chave</span>
          <p class="text-white/90 italic text-sm m-0">Comprar ação é comprar CNPJ, não bilhete de loteria.</p>
        </div>

        <div>
          <h3 class="text-xl font-bold text-white mb-2">Abertura</h3>
          <p class="text-muted-foreground leading-relaxed">Imagine que seu amigo te convida para ser sócio de uma padaria. Você colocaria seu dinheiro lá sem saber se o pão é bom, se a padaria dá lucro ou se tem dívidas? Provavelmente não. Então por que você faz isso na Bolsa?</p>
        </div>
        
        <div>
          <h3 class="text-xl font-bold text-white mb-2">Desenvolvimento</h3>
          <p class="text-muted-foreground leading-relaxed mb-4">Comprar uma <strong>Ação</strong> é virar sócio. É ter um CNPJ na carteira. Existem várias formas de fazer isso:</p>
          <ul class="list-disc pl-5 space-y-2 text-muted-foreground marker:text-amber-500">
            <li><strong>Stock Picking:</strong> Você escolhe a dedo as melhores empresas (ex: Petrobras, Itaú).</li>
            <li><strong>ETFs (A Cesta):</strong> Você compra um pacote fechado com as maiores empresas do Brasil (como o BOVA11). É como comprar uma cesta de frutas pronta em vez de escolher uva por uva.</li>
            <li><strong>FIIs (Imóveis):</strong> Você vira sócio de shoppings e escritórios, recebendo aluguel todo mês.</li>
          </ul>
          <p class="text-muted-foreground leading-relaxed mt-4">O grande erro é tratar a ação como um bilhete de loteria. Quem compra achando que vai "estourar" amanhã, geralmente quebra. Quem compra pensando "quero ser dono dessa empresa pelos próximos 10 anos", geralmente enriquece.</p>
        </div>
        
        <div class="pt-4 border-t border-white/10">
          <h3 class="text-lg font-bold text-white mb-2">Fechamento</h3>
          <p class="text-muted-foreground">Antes de comprar uma ação, pergunte-se: <em>"Se a Bolsa fechasse hoje e só reabrisse daqui a 5 anos, eu ficaria feliz em continuar dono dessa empresa?"</em>. Se a resposta for sim, você é um investidor.</p>
        </div>
      </div>
    `
  },

  // --- NÍVEL: AVANÇADO (O JOGO AVANÇADO) ---
  {
    id: 6,
    titulo: "O Preço da Rapidez",
    tituloCompleto: "Trader vs Investidor: O Custo da Velocidade",
    nivel: "avancado",
    duracao: "7 min",
    descricao: "Trader vs Investidor. Volatilidade, Alavancagem e os perigos do curto prazo.",
    transcricaoCompleta: `
      <div class="space-y-6">
        <div class="bg-rose-500/10 border-l-4 border-rose-500 p-4 rounded-r-lg">
          <span class="text-rose-500 font-bold uppercase text-xs tracking-wider block mb-1">💡 Conceito Chave</span>
          <p class="text-white/90 italic text-sm m-0">A diferença entre dirigir seguro na estrada (Investidor) e correr na Fórmula 1 (Trader).</p>
        </div>

        <div>
          <h3 class="text-xl font-bold text-white mb-2">Abertura</h3>
          <p class="text-muted-foreground leading-relaxed">O mercado financeiro tem dois modos de operar: o modo "Maratona", onde você constrói patrimônio devagar por anos, e o modo "Corrida de 100 metros", onde a promessa é ganhar o salário do mês em um único dia. Hoje vamos falar sobre esse segundo modo, e por que a maioria das pessoas derrapa na primeira curva.</p>
        </div>
        
        <div>
          <h3 class="text-xl font-bold text-white mb-2">Desenvolvimento</h3>
          <p class="text-muted-foreground leading-relaxed mb-4">A modalidade mais famosa de curto prazo é o <strong>Day Trade</strong>. É comprar e vender a mesma coisa no mesmo dia. O Day Trader não quer ser sócio da empresa; ele não se importa se a empresa é boa ou ruim. Ele só quer aproveitar o movimento do preço.</p>
          <p class="text-muted-foreground leading-relaxed mb-4">E para ganhar dinheiro rápido, o trader precisa que o preço se mexa muito. O nome disso é <strong>Volatilidade</strong>. Para o investidor comum, volatilidade dá medo. Para o trader, é o oxigênio.</p>
          <div class="bg-rose-900/20 border border-rose-500/20 p-4 rounded-lg my-4">
            <strong class="text-rose-400 block mb-1">⚠️ Perigo: Alavancagem</strong>
            <p class="text-muted-foreground text-sm m-0">A corretora permite que você opere com dinheiro que não tem. É como se você tivesse 100 reais, mas a corretora deixasse você apostar como se tivesse 10 mil. Se o preço subir 1%, você ganha muito. Mas se cair 1%, você perde tudo o que tinha e ainda fica devendo.</p>
          </div>
          <p class="text-muted-foreground leading-relaxed">Enquanto a pessoa física usa essas ferramentas para apostar, os grandes bancos usam ferramentas parecidas, chamadas <strong>Derivativos</strong>, para fazer o oposto: proteção (Hedge).</p>
        </div>
        
        <div class="pt-4 border-t border-white/10">
          <h3 class="text-lg font-bold text-white mb-2">Fechamento</h3>
          <p class="text-muted-foreground">O erro do iniciante é usar ferramentas de profissionais com mentalidade de amador. Se você busca emoção, vá a um parque de diversões. Investimento sério costuma ser entediante, mas é o que funciona.</p>
        </div>
      </div>
    `
  },
  {
    id: 7,
    titulo: "As Letras Miúdas",
    tituloCompleto: "Custos Invisíveis: Taxas que Comem seu Lucro",
    nivel: "avancado",
    duracao: "6 min",
    descricao: "Taxas e Custos. Taxa de Adm, Performance e Spread. Onde seu lucro desaparece.",
    transcricaoCompleta: `
      <div class="space-y-6">
        <div class="bg-rose-500/10 border-l-4 border-rose-500 p-4 rounded-r-lg">
          <span class="text-rose-500 font-bold uppercase text-xs tracking-wider block mb-1">💡 Conceito Chave</span>
          <p class="text-white/90 italic text-sm m-0">A jornada do seu dinheiro e os "pedágios" que ele paga no caminho.</p>
        </div>

        <div>
          <h3 class="text-xl font-bold text-white mb-2">Abertura</h3>
          <p class="text-muted-foreground leading-relaxed">Imagine que você fez um investimento e ele rendeu 10%. Você comemora. Mas quando o dinheiro cai na conta, só chegaram 7%. Onde foi parar o resto? O mercado financeiro é cheio de "sócios invisíveis" que mordem seu lucro sem você ver.</p>
        </div>
        
        <div>
          <h3 class="text-xl font-bold text-white mb-2">Desenvolvimento</h3>
          <p class="text-muted-foreground leading-relaxed mb-4">Vamos acompanhar a jornada do seu dinheiro para encontrar esses furos no balde.</p>
          <ul class="space-y-4">
             <li class="bg-white/5 p-3 rounded-lg">
                <strong class="text-white block">1. A Compra (Emolumentos e Spread)</strong>
                <span class="text-sm text-muted-foreground">É o pedágio da Bolsa. Centavos que viram fortunas se você opera muito. E o Spread é a diferença entre preço de compra e venda.</span>
             </li>
             <li class="bg-white/5 p-3 rounded-lg">
                <strong class="text-white block">2. A Manutenção (Taxa de Adm)</strong>
                <span class="text-sm text-muted-foreground">O salário do gestor do fundo. É cobrado todo ano sobre TODO o seu dinheiro, ganhando ou perdendo.</span>
             </li>
             <li class="bg-white/5 p-3 rounded-lg">
                <strong class="text-white block">3. O Sócio Leão (Come-Cotas)</strong>
                <span class="text-sm text-muted-foreground">Em alguns fundos, o governo não espera você sacar. A cada 6 meses, ele vai lá e pega um pedacinho das suas cotas.</span>
             </li>
          </ul>
        </div>
        
        <div class="pt-4 border-t border-white/10">
          <h3 class="text-lg font-bold text-white mb-2">Fechamento</h3>
          <p class="text-muted-foreground">Investir não é só escolher o que rende mais. É escolher o que custa menos. Um fundo com taxas altas precisa ser excepcionalmente bom só para empatar com um investimento simples e barato. Fique de olho nas letras miúdas.</p>
        </div>
      </div>
    `
  }
];

// =================================================================
// LISTA DE TERMOS (Vinculada às Aulas)
// =================================================================
export const listaCompletaTermos: Termo[] = [
  // --- AULA 01: Quando e como começar? ---
  {
    id: 8,
    sigla: "Reserva de Emergência",
    nome: "Reserva Emergencial",
    explicacaoCompleta: "Montante financeiro acumulado para cobrir despesas imprevistas, equivalente a 6 a 12 meses do custo de vida.",
    explicacaoSimplificada: "O colchão de segurança. Dinheiro para quando o carro quebra ou você perde o emprego. Não é para ganhar dinheiro, é para não se endividar.",
    exemplo: "Se você gasta R$ 2.000,00 por mês, sua reserva deve ser de pelo menos R$ 12.000,00 em um lugar seguro.",
    dicaComoComecar: "Comece guardando qualquer valor (ex: R$ 50,00) todo mês em um Tesouro Selic ou CDB Liquidez Diária.",
    nivelId: "iniciante",
    categoria: "conceitos",
    aulaAssociadaId: 1
  },
  {
    id: 9,
    sigla: "Liquidez",
    nome: "Velocidade de Resgate",
    explicacaoCompleta: "Capacidade de converter um ativo em dinheiro corrente sem perda significativa de valor.",
    explicacaoSimplificada: "Quão rápido o dinheiro cai na sua mão? Liquidez alta = dinheiro na hora. Liquidez baixa = dinheiro preso.",
    exemplo: "Dinheiro na conta é líquido (água). Uma casa é pouco líquida (gelo), pois demora para vender e virar dinheiro na mão.",
    dicaComoComecar: "Para sua reserva de emergência, exija 'Liquidez Diária' ou 'D+0'.",
    nivelId: "iniciante",
    categoria: "conceitos",
    aulaAssociadaId: 1
  },

  // --- AULA 02: Guardar ou Investir? ---
  {
    id: 6,
    sigla: "Poupança",
    nome: "Caderneta de Poupança",
    explicacaoCompleta: "Aplicação financeira tradicional com regras de rendimento fixadas em lei (70% da Selic + TR).",
    explicacaoSimplificada: "O investimento mais famoso e um dos piores. Perde para a inflação com frequência.",
    exemplo: "Se você sacar o dinheiro um dia antes do aniversário da conta, perdeu o rendimento do mês inteiro.",
    dicaComoComecar: "A dica aqui é: Saia dela! O primeiro passo é testar o Tesouro Selic.",
    nivelId: "iniciante",
    categoria: "renda_fixa",
    aulaAssociadaId: 2
  },
  {
    id: 3,
    sigla: "IPCA",
    nome: "Índice Nacional de Preços ao Consumidor Amplo",
    explicacaoCompleta: "É o índice oficial de inflação do Brasil. Ele mede a variação média dos preços de uma cesta de produtos.",
    explicacaoSimplificada: "O vilão invisível que faz o seu dinheiro valer menos. Se render MENOS que o IPCA, você perdeu poder de compra.",
    exemplo: "Se hoje você enche o carrinho com R$ 100,00 e a inflação for 10%, ano que vem precisará de R$ 110,00.",
    nivelId: "iniciante",
    categoria: "indicadores",
    aulaAssociadaId: 2
  },
  {
    id: 10,
    sigla: "Juros Compostos",
    nome: "Capitalização Composta",
    explicacaoCompleta: "Regime de juros onde os juros de cada período são somados ao capital para o cálculo de novos juros nos períodos seguintes.",
    explicacaoSimplificada: "Juros sobre juros. A bola de neve do bem. Você ganha dinheiro sobre o dinheiro investido E sobre o lucro que já teve.",
    exemplo: "Mês 1: Ganhou R$ 10,00. Mês 2: Você ganha juros sobre o seu dinheiro original + juros sobre os R$ 10,00 que ganhou.",
    dicaComoComecar: "O maior aliado dos juros compostos é o tempo. Comece cedo.",
    nivelId: "iniciante",
    categoria: "conceitos",
    aulaAssociadaId: 2
  },

  // --- AULA 03: Tesouro e Renda Fixa ---
  {
    id: 1,
    sigla: "SELIC",
    nome: "Taxa Básica de Juros",
    explicacaoCompleta: "É a taxa básica de juros da economia brasileira, definida pelo Banco Central a cada 45 dias.",
    explicacaoSimplificada: "A 'Taxa Mãe'. Ela comanda o dinheiro do país. Se ela sobe, a Renda Fixa rende mais.",
    exemplo: "Imagine que a Selic é o 'preço do aluguel do dinheiro'. Se o aluguel sobe, quem tem dinheiro ganha mais.",
    nivelId: "iniciante",
    categoria: "indicadores",
    aulaAssociadaId: 3
  },
  {
    id: 2,
    sigla: "CDI",
    nome: "Certificado de Depósito Interbancário",
    explicacaoCompleta: "É a taxa média de juros cobrada nos empréstimos que os bancos fazem entre si.",
    explicacaoSimplificada: "A meta que seu dinheiro tem que bater. Se paga '100% do CDI', é justo. Menos que isso, desconfie.",
    exemplo: "Pense no CDI como a velocidade média da estrada. Se seu investimento está a 50% do CDI, você está lento.",
    nivelId: "iniciante",
    categoria: "indicadores",
    aulaAssociadaId: 3
  },
  {
    id: 5,
    sigla: "Tesouro Selic",
    nome: "Título Público Pós-fixado",
    explicacaoCompleta: "Título emitido pelo Governo Federal cuja rentabilidade acompanha a variação da taxa Selic.",
    explicacaoSimplificada: "O investimento mais seguro do Brasil. Você empresta dinheiro pro Governo.",
    exemplo: "É o 'cofre forte' do país. Melhor que a Poupança, rende todo dia útil.",
    dicaComoComecar: "Busque por 'Tesouro Direto' na sua corretora.",
    nivelId: "iniciante",
    categoria: "renda_fixa",
    aulaAssociadaId: 3
  },
  {
    id: 4,
    sigla: "CDB",
    nome: "Certificado de Depósito Bancário",
    explicacaoCompleta: "Título de renda fixa privado emitido por bancos para captar recursos.",
    explicacaoSimplificada: "Você vira o banqueiro. VOCÊ empresta para o banco e ele te devolve com juros.",
    exemplo: "Igual emprestar dinheiro para um amigo (o banco) e combinar de receber com juros depois.",
    dicaComoComecar: "Procure CDBs que paguem pelo menos 100% do CDI.",
    nivelId: "iniciante",
    categoria: "renda_fixa",
    aulaAssociadaId: 3
  },
  {
    id: 7,
    sigla: "IOF",
    nome: "Imposto sobre Operações Financeiras",
    explicacaoCompleta: "Tributo federal que incide sobre resgates inferiores a 30 dias.",
    explicacaoSimplificada: "O imposto dos apressadinhos. Ele só existe se você tirar o dinheiro em menos de um mês.",
    exemplo: "Colocou R$ 1.000 hoje e tirou amanhã? O governo morde quase todo o lucro.",
    dicaComoComecar: "Planeje seus investimentos para ficarem aplicados por pelo menos 30 dias.",
    nivelId: "iniciante",
    categoria: "taxas",
    aulaAssociadaId: 3
  },
  {
    id: 11,
    sigla: "LCI / LCA",
    nome: "Letras de Crédito (Imob./Agro)",
    explicacaoCompleta: "Títulos isentos de Imposto de Renda para pessoa física, usados para financiar imóveis e agro.",
    explicacaoSimplificada: "As primas ricas do CDB. O dinheiro financia casas ou plantações. Isento de IR.",
    exemplo: "Rende mais no seu bolso que um CDB de mesma taxa, porque o Leão não morde.",
    dicaComoComecar: "Procure na corretora. Geralmente exigem valor inicial maior (ex: R$ 1.000).",
    nivelId: "intermediario",
    categoria: "renda_fixa",
    aulaAssociadaId: 3
  },

  // --- AULA 04: O que é a Bolsa? ---
  {
    id: 30,
    sigla: "Circuit Breaker",
    nome: "Mecanismo de Interrupção",
    explicacaoCompleta: "Mecanismo que interrompe o pregão da bolsa quando há quedas bruscas (10%, 15%).",
    explicacaoSimplificada: "O freio de mão. Quando o mercado entra em pânico, a bolsa 'puxa a tomada' por 30min.",
    exemplo: "Imagine um estádio pegando fogo. O Circuit Breaker fecha as portas para organizar a saída.",
    dicaComoComecar: "Se acontecer, não venda no desespero. Desligue o computador.",
    nivelId: "avancado",
    categoria: "conceitos",
    aulaAssociadaId: 4
  },
  {
    id: 13,
    sigla: "Tesouro IPCA+",
    nome: "Título Indexado à Inflação",
    explicacaoCompleta: "Título público que paga uma taxa fixa mais a variação da inflação (IPCA).",
    explicacaoSimplificada: "Garante ganho acima da inflação. Ótimo para aposentadoria. Cuidado se vender antes.",
    exemplo: "Não importa se o arroz triplicar de preço, esse título rende a inflação + lucro extra.",
    dicaComoComecar: "Escolha um vencimento próximo de quando quer usar o dinheiro (ex: 2035).",
    nivelId: "intermediario",
    categoria: "renda_fixa",
    aulaAssociadaId: 4
  },
  {
    id: 12,
    sigla: "Debêntures",
    nome: "Títulos de Dívida Corporativa",
    explicacaoCompleta: "Títulos de dívida emitidos por empresas para financiar projetos.",
    explicacaoSimplificada: "Emprestar dinheiro para empresas (como a Vale) fazerem obras. Risco maior que banco.",
    exemplo: "Emprestar pro dono da padaria reformar a loja. Se a padaria falir, não tem garantia.",
    dicaComoComecar: "Prefira 'Debêntures Incentivadas' (isentas de IR).",
    nivelId: "intermediario",
    categoria: "renda_fixa",
    aulaAssociadaId: 4
  },

  // --- AULA 05: Sócio ou Apostador? ---
  {
    id: 19,
    sigla: "Ações",
    nome: "Ações Ordinárias/Preferenciais",
    explicacaoCompleta: "Valores mobiliários representativos de unidade do capital social de uma empresa.",
    explicacaoSimplificada: "Você vira sócio. Se ela lucrar, recebe parte. Se falir, perde.",
    exemplo: "Ter uma ação da Apple é ser dono de um pedacinho da empresa.",
    dicaComoComecar: "Comece estudando empresas sólidas (Blue Chips) que dão lucro há anos.",
    nivelId: "avancado",
    categoria: "renda_variavel",
    aulaAssociadaId: 5
  },
  {
    id: 15,
    sigla: "ETFs",
    nome: "Exchange Traded Funds",
    explicacaoCompleta: "Fundos de índice negociados em bolsa.",
    explicacaoSimplificada: "Uma 'cesta básica' de ações. Compra a cesta inteira de uma vez.",
    exemplo: "Comprar 'BOVA11' é comprar pedacinhos das maiores empresas do Brasil de uma vez.",
    dicaComoComecar: "Busque por 'IVVB11' (EUA) ou 'BOVA11' (Brasil).",
    nivelId: "intermediario",
    categoria: "renda_variavel",
    aulaAssociadaId: 5
  },
  {
    id: 14,
    sigla: "FIIs",
    nome: "Fundos Imobiliários",
    explicacaoCompleta: "Fundos para aplicação em empreendimentos imobiliários. Pagam aluguel mensal.",
    explicacaoSimplificada: "Como ser dono de shopping sem dor de cabeça. Recebe aluguel isento de IR.",
    exemplo: "Com R$ 10 você compra uma cota e recebe centavos de aluguel todo mês.",
    dicaComoComecar: "Compre 1 cota (ex: MXRF11) para ver o aluguel cair.",
    nivelId: "intermediario",
    categoria: "renda_variavel",
    aulaAssociadaId: 5
  },
  {
    id: 22,
    sigla: "Small Caps",
    nome: "Empresas de Baixa Capitalização",
    explicacaoCompleta: "Ações de empresas menores com maior potencial de crescimento.",
    explicacaoSimplificada: "As empresas 'adolescentes'. Podem crescer muito, mas têm mais risco.",
    exemplo: "Petrobras é um transatlântico (seguro). Small Cap é uma lancha (rápida e balança).",
    dicaComoComecar: "Invista via ETF 'SMAL11' para diluir o risco.",
    nivelId: "avancado",
    categoria: "renda_variavel",
    aulaAssociadaId: 5
  },
  {
    id: 20,
    sigla: "BDRs",
    nome: "Brazilian Depositary Receipts",
    explicacaoCompleta: "Certificados no Brasil que representam ações do exterior.",
    explicacaoSimplificada: "Investir no exterior sem tirar dinheiro do Brasil.",
    exemplo: "Usar Reais para comprar recibos da Disney ou Apple.",
    dicaComoComecar: "Busque códigos com final 34 (ex: AAPL34).",
    nivelId: "avancado",
    categoria: "renda_variavel",
    aulaAssociadaId: 5
  },

  // --- AULA 06: O Preço da Rapidez ---
  {
    id: 26,
    sigla: "Day Trade",
    nome: "Operações Intradiárias",
    explicacaoCompleta: "Compra e venda do mesmo ativo no mesmo dia.",
    explicacaoSimplificada: "Comprar de manhã e vender à tarde. Arriscado.",
    exemplo: "Comprar por 20 e vender por 20,20 minutos depois.",
    dicaComoComecar: "95% perdem dinheiro. Use apenas dinheiro que aceita perder.",
    nivelId: "avancado",
    categoria: "conceitos",
    aulaAssociadaId: 6
  },
  {
    id: 23,
    sigla: "Volatilidade",
    nome: "Desvio Padrão / Risco",
    explicacaoCompleta: "Medida do risco de oscilação do preço.",
    explicacaoSimplificada: "A intensidade do sobe-e-desce.",
    exemplo: "Poupança é reta. Bitcoin é montanha-russa.",
    dicaComoComecar: "Equilibre ativos voláteis com Renda Fixa segura.",
    nivelId: "avancado",
    categoria: "conceitos",
    aulaAssociadaId: 6
  },
  {
    id: 24,
    sigla: "Alavancagem",
    nome: "Operar Alavancado",
    explicacaoCompleta: "Usar capital de terceiros para aumentar o retorno (e o risco).",
    explicacaoSimplificada: "Investir 'fiado'. Potencializa lucro e prejuízo.",
    exemplo: "Operar como se tivesse 10x mais dinheiro do que tem na conta.",
    dicaComoComecar: "Evite no início. Risco de quebrar a conta.",
    nivelId: "avancado",
    categoria: "conceitos",
    aulaAssociadaId: 6
  },
  {
    id: 25,
    sigla: "Hedge",
    nome: "Proteção Financeira",
    explicacaoCompleta: "Operação para reduzir riscos de preço.",
    explicacaoSimplificada: "O seguro do investidor. Aposta contrária para proteger.",
    exemplo: "Comprar Dólar para proteger ações brasileiras de uma crise.",
    dicaComoComecar: "Tenha parte em Dólar ou Ouro.",
    nivelId: "avancado",
    categoria: "conceitos",
    aulaAssociadaId: 6
  },
  {
    id: 21,
    sigla: "Derivativos",
    nome: "Opções e Futuros",
    explicacaoCompleta: "Instrumentos cujo valor deriva de outro ativo.",
    explicacaoSimplificada: "Apostas sobre o preço futuro de algo.",
    exemplo: "Combinar o preço da saca de milho para o mês que vem.",
    dicaComoComecar: "Estude para proteção, não especulação.",
    nivelId: "avancado",
    categoria: "renda_variavel",
    aulaAssociadaId: 6
  },

  // --- AULA 07: As Letras Miúdas ---
  {
    id: 17,
    sigla: "Taxa de Adm",
    nome: "Taxa de Administração",
    explicacaoCompleta: "Percentual cobrado anualmente pelos gestores de fundos.",
    explicacaoSimplificada: "O salário do gestor. Cobrado sobre todo o seu dinheiro.",
    exemplo: "2% ao ano vai para o banco, ganhando ou perdendo.",
    dicaComoComecar: "Evite taxas acima de 2% para ações e 0,5% para renda fixa.",
    nivelId: "intermediario",
    categoria: "taxas",
    aulaAssociadaId: 7
  },
  {
    id: 27,
    sigla: "Taxa de Performance",
    nome: "Bônus de Resultado",
    explicacaoCompleta: "Taxa sobre o lucro que excede o benchmark.",
    explicacaoSimplificada: "Prêmio se o gestor for muito bem.",
    exemplo: "Se render mais que o combinado, o gestor fica com um pedaço do extra.",
    dicaComoComecar: "Não é ruim, indica que o fundo superou a meta.",
    nivelId: "avancado",
    categoria: "taxas",
    aulaAssociadaId: 7
  },
  {
    id: 28,
    sigla: "Emolumentos",
    nome: "Taxas da B3",
    explicacaoCompleta: "Taxas cobradas pela Bolsa sobre operações.",
    explicacaoSimplificada: "O pedágio da Bolsa para comprar e vender.",
    exemplo: "Centavos cobrados a cada operação.",
    dicaComoComecar: "Confira sempre na Nota de Corretagem.",
    nivelId: "avancado",
    categoria: "taxas",
    aulaAssociadaId: 7
  },
  {
    id: 29,
    sigla: "Spread",
    nome: "Diferença Compra/Venda",
    explicacaoCompleta: "Diferença entre preço de compra e venda.",
    explicacaoSimplificada: "O ágio. A diferença entre o preço que pagam e o que vendem.",
    exemplo: "Casa de câmbio compra dólar a 5,00 e vende a 5,50.",
    dicaComoComecar: "Evite ativos com pouca liquidez, o spread costuma ser alto.",
    nivelId: "avancado",
    categoria: "taxas",
    aulaAssociadaId: 7
  },
  {
    id: 16,
    sigla: "Come-Cotas",
    nome: "Antecipação de IR",
    explicacaoCompleta: "Recolhimento semestral automático de IR em fundos.",
    explicacaoSimplificada: "O governo pega a parte dele do lucro a cada 6 meses.",
    exemplo: "O leão morde um pedaço do fundo em maio e novembro.",
    dicaComoComecar: "Prefira fundos de ações ou títulos diretos para evitar.",
    nivelId: "intermediario",
    categoria: "taxas",
    aulaAssociadaId: 7
  },
  {
    id: 18,
    sigla: "IGP-M",
    nome: "Índice Geral de Preços - Mercado",
    explicacaoCompleta: "Índice de inflação sensível ao dólar (aluguéis).",
    explicacaoSimplificada: "A 'Inflação do Aluguel'.",
    exemplo: "Se dispara, o aluguel sobe.",
    nivelId: "intermediario",
    categoria: "indicadores",
    aulaAssociadaId: 7
  }
];
