// src/lib/termosData.ts
import { Level } from "../components/aprender/LevelFilter";
import { Category } from "../components/aprender/CategoryFilter";

export interface Termo {
  id: number;
  sigla: string;
  nome: string;
  explicacaoCompleta: string;
  explicacaoSimplificada: string;
  exemplo: string;
  nivelId: Level;
  categoria: Category;
  audioUrl?: string;
}

export const listaCompletaTermos: Termo[] = [
  // --- NÍVEL: INICIANTE ---
  {
    id: 1,
    sigla: "SELIC",
    nome: "Taxa Básica de Juros",
    explicacaoCompleta: "É a taxa básica de juros da economia brasileira, definida pelo Banco Central a cada 45 dias. Ela serve de referência para todas as outras taxas de juros do mercado.",
    explicacaoSimplificada: "É a 'Taxa Mãe'. Ela manda no dinheiro do país. Se ela sobe, os investimentos de Renda Fixa rendem mais, mas pegar empréstimo fica mais caro.",
    exemplo: "Imagine que a Selic é o 'preço do aluguel do dinheiro'. Se o aluguel sobe, quem tem imóvel (dinheiro) ganha mais, e quem precisa alugar (pegar empréstimo) paga mais.",
    nivelId: "iniciante",
    categoria: "indicadores"
  },
  {
    id: 2,
    sigla: "CDI",
    nome: "Certificado de Depósito Interbancário",
    explicacaoCompleta: "É a taxa média de juros cobrada nos empréstimos que os bancos fazem entre si por um prazo de um dia. É o principal benchmark da Renda Fixa.",
    explicacaoSimplificada: "É a meta que seu dinheiro tem que bater. Se um investimento paga '100% do CDI', ele está pagando o justo. Menos que isso, desconfie.",
    exemplo: "Pense no CDI como a velocidade média da estrada. Se o seu carro (investimento) está a 50% do CDI, você está andando na metade da velocidade dos outros.",
    nivelId: "iniciante",
    categoria: "indicadores"
  },
  {
    id: 3,
    sigla: "IPCA",
    nome: "Índice Nacional de Preços ao Consumidor Amplo",
    explicacaoCompleta: "É o índice oficial de inflação do Brasil. Ele mede a variação média dos preços de uma cesta de produtos e serviços consumidos pelas famílias.",
    explicacaoSimplificada: "É o vilão invisível que faz o seu dinheiro valer menos. Se seu investimento render MENOS que o IPCA, você perdeu poder de compra.",
    exemplo: "Se hoje você enche o carrinho com R$ 100 e a inflação for 10%, ano que vem precisará de R$ 110 para as mesmas coisas. Dinheiro parado perde valor.",
    nivelId: "iniciante",
    categoria: "indicadores"
  },
  {
    id: 4,
    sigla: "CDB",
    nome: "Certificado de Depósito Bancário",
    explicacaoCompleta: "Título de renda fixa privado emitido por bancos para captar recursos. Em troca, o banco devolve o valor corrigido por uma taxa de juros.",
    explicacaoSimplificada: "Você vira o banqueiro. Em vez de pedir dinheiro emprestado, VOCÊ empresta para o banco. Ele usa seu dinheiro e te devolve com juros.",
    exemplo: "Igual quando você empresta dinheiro para um amigo e combina: 'Me devolve mês que vem com 10 reais a mais?'. Só que o amigo é o Banco.",
    nivelId: "iniciante",
    categoria: "renda_fixa"
  },
  {
    id: 5,
    sigla: "Tesouro Selic",
    nome: "Título Público Pós-fixado",
    explicacaoCompleta: "Título emitido pelo Governo Federal cuja rentabilidade acompanha a variação da taxa Selic. Possui liquidez diária e o menor risco de crédito.",
    explicacaoSimplificada: "O investimento mais seguro do Brasil. Você empresta dinheiro pro Governo. Ideal para Reserva de Emergência.",
    exemplo: "É o 'cofre forte' do país. Melhor que a Poupança, rende todo dia útil e você pode sacar quando quiser.",
    nivelId: "iniciante",
    categoria: "renda_fixa"
  },
  {
    id: 6,
    sigla: "Poupança",
    nome: "Caderneta de Poupança",
    explicacaoCompleta: "Aplicação financeira tradicional com regras de rendimento fixadas em lei (70% da Selic + TR).",
    explicacaoSimplificada: "O investimento mais famoso e um dos piores. Perde para a inflação com frequência e só rende no dia do aniversário mensal.",
    exemplo: "Se você sacar o dinheiro um dia antes do aniversário da conta, perdeu o rendimento do mês inteiro. No Tesouro, você ganharia proporcional.",
    nivelId: "iniciante",
    categoria: "renda_fixa"
  },
  {
    id: 7,
    sigla: "IOF",
    nome: "Imposto sobre Operações Financeiras",
    explicacaoCompleta: "Tributo federal que inc
