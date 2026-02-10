-- Expansão do Catálogo do Empire Builder
-- Deleta itens antigos e insere a nova progressão linear de 30 itens

TRUNCATE TABLE public.empire_items RESTART IDENTITY;

INSERT INTO public.empire_items (name, type, base_cost, base_income, description) VALUES
-- ATIVOS (Renda por Clique - Progressão de Carreira)
('Vender Limonada', 'active', 10, 1, 'O clássico começo de todo empreendedor.'),
('Lavar Carros', 'active', 100, 6, 'Um trabalho braçal que ensina o valor do esforço.'),
('Garçom de Eventos', 'active', 500, 25, 'Ganhando gorjetas e aprendendo sobre pessoas.'),
('Assistente Virtual', 'active', 2000, 90, 'Organizando agendas na era digital.'),
('Programador Freelancer', 'active', 8000, 320, 'Codando soluções e ganhando por entrega.'),
('Analista Jr em Wall St', 'active', 30000, 1100, 'Agora os números ficaram sérios.'),
('Programador Senior', 'active', 120000, 4200, 'Especialista em resolver problemas complexos.'),
('Gerente de Projetos', 'active', 500000, 16000, 'Coordenando talentos para grandes resultados.'),
('CTO de Startup', 'active', 2000000, 60000, 'Liderando a tecnologia de uma empresa unicórnio.'),
('Sócio de Multinacional', 'active', 10000000, 250000, 'Participação direta nos lucros globais.'),
('Consultor de Bilionários', 'active', 50000000, 1200000, 'Sua palavra vale ouro no mercado.'),
('CEO Magnata', 'active', 250000000, 5000000, 'Comandando o destino de setores inteiros.'),
('Imperador Econômico', 'active', 1000000000, 20000000, 'A influência máxima no sistema financeiro.'),
('Visionário Global', 'active', 5000000000, 100000000, 'Seus projetos mudam o curso da humanidade.'),
('Lenda do Capitalismo', 'active', 25000000000, 500000000, 'Um nome que será lembrado por séculos.'),

-- PASSIVOS (Renda Automática - Investimentos)
('Cofrinho de Moedas', 'passive', 150, 2, 'Pequenas economias que começam a render.'),
('Poupança Digital', 'passive', 900, 12, 'O primeiro passo para sair do zero.'),
('Tesouro Selic', 'passive', 4000, 45, 'Segurança do governo rendendo todo segundo.'),
('Fundo de Renda Fixa', 'passive', 15000, 160, 'Gestão profissional para suas sobras.'),
('CDB 110% do CDI', 'passive', 60000, 600, 'Aproveitando as taxas bancárias a seu favor.'),
('Cotas de FIIs', 'passive', 200000, 1800, 'Recebendo aluguéis de prédios comerciais.'),
('Ações de Dividendos', 'passive', 750000, 6500, 'Parte dos lucros das maiores empresas.'),
('Imóvel para Aluguel', 'passive', 3000000, 25000, 'Renda sólida garantida por tijolos.'),
('Anjo Investidor', 'passive', 12000000, 90000, 'Apostando em startups promissoras.'),
('Franquia de Fast Food', 'passive', 45000000, 320000, 'Um modelo de negócio que roda sozinho.'),
('Rede de Hotéis', 'passive', 180000000, 1200000, 'Hospedando o mundo e lucrando dormindo.'),
('Porto Comercial', 'passive', 800000000, 5000000, 'Onde o comércio global se encontra.'),
('Plataforma de Petróleo', 'passive', 4000000000, 25000000, 'Dominando a energia e o fluxo de caixa.'),
('Empresa de Satélites', 'passive', 15000000000, 90000000, 'Conectando o planeta do espaço.'),
('Banco Central Privado', 'passive', 75000000000, 400000000, 'O ápice do poder e da renda passiva.');
