# 💎 EducaInvest — Documentação Funcional Completa

---

## 💎 1. Visão Geral do Produto

### Propósito
O **EducaInvest** é uma plataforma de educação financeira gamificada voltada para o público brasileiro iniciante. O objetivo é **democratizar o conhecimento financeiro** através de uma experiência envolvente, sem jargões intimidadores, com foco em termos locais (SELIC, CDI, IPCA).

### Tech Stack

| Camada | Tecnologia |
|---|---|
| Frontend | React 18 (Vite), TypeScript |
| Estilização | Tailwind CSS + Glassmorphism Design System |
| Animações | Framer Motion |
| Gráficos | Recharts |
| UI Components | shadcn/ui (Radix primitives) |
| Backend / Auth | Supabase (PostgreSQL + Auth) |
| IA / Chatbot | n8n (Webhook) + LLM com RAG |
| Automação de Dados | n8n (BrasilAPI + Banco Central) |

### Diferenciais

> 💡 **Diferenciais Competitivos**
> - **Design Glassmorphism Premium**: Fundo `slate-950`, efeitos de blur, bordas brilhantes e gradientes sutis criam uma experiência visual de alta fidelidade.
> - **IA Integrada (Tutor)**: Widget flutuante com tutor financeiro que responde usando base de conhecimento própria (RAG).
> - **Sistema de XP em Tempo Real**: Progressão persistente salva no Supabase com feedback visual imediato (confetes, sons, barras animadas).
> - **Dados de Mercado Reais**: Taxas SELIC, CDI e IPCA atualizadas diariamente via automação n8n.

---

## 🗺️ 2. Arquitetura e Navegação (Sitemap)

### Rotas Principais

| Rota | Página | Acesso |
|---|---|---|
| `/` | Home / Dashboard | Pública (com AuthGuard para dados do user) |
| `/aprender` | Trilha de Aprendizado | Autenticado |
| `/praticar` | Arcade (Jogos) | Autenticado |
| `/simular` | Calculadoras Financeiras | Pública |
| `/ranking` | Classificação Global | Autenticado |
| `/perfil` | Perfil do Usuário | Autenticado |
| `/login` | Login / Cadastro | Pública |

### Lógica de Navegação

- **Header Persistente** (`Header.tsx`): Logo, links de navegação (desktop) e avatar do usuário com menu dropdown.
- **Menu Mobile** (`BottomNav.tsx`): Barra fixa inferior com ícones para as 5 seções principais (Home, Aprender, Praticar, Simular, Ranking).
- **Botão Flutuante de IA** (`ChatWidget.tsx`): Posicionado no canto inferior direito, sempre acessível. Abre em **full-screen no mobile** e **popover 450×600px no desktop**.

### Diagrama de Navegação

```
Header Persistente
├── Home (/)
├── Aprender (/aprender)
├── Praticar (/praticar)
├── Simular (/simular)
├── Ranking (/ranking)
└── Perfil (/perfil)

BottomNav Mobile
├── Home → /
├── Aprender → /aprender
├── Praticar → /praticar
├── Simular → /simular
└── Ranking → /ranking

ChatWidget FAB → Tutor IA Overlay (sempre acessível)
```

---

## 📱 3. Detalhamento das Páginas e Funcionalidades

### 3.1 Home / Dashboard

**Objetivo**: Oferecer uma visão rápida do progresso do usuário e atalhos para as áreas principais.

**Componentes Chave**:
- `MarketTicker`: Fita animada com taxas SELIC, CDI e IPCA em tempo real (dados do Supabase via n8n).
- `HeroSection`: Banner motivacional com CTA para a trilha de aprendizado.
- `DashboardUser`: Card com XP total, nível atual e progresso até o próximo nível.
- `QuickActions`: Grid de atalhos rápidos para Aprender, Praticar e Simular.
- `TipOfTheDay`: Dica financeira diária rotativa.

**Checklist de Funcionalidades**:
- [ ] Exibição do XP total e nível do usuário
- [ ] Ticker de mercado com dados reais atualizados
- [ ] Atalhos rápidos para todas as seções
- [ ] Dica do dia com conteúdo rotativo
- [ ] Indicação da "Jornada Atual" (próxima aula a completar)

---

### 3.2 Aprender (Trilha)

**Objetivo**: Apresentar o conteúdo educacional em formato de trilha gamificada com progressão linear.

**Componentes Chave**:
- `JourneyGrid`: Mapa visual de aulas em cards com estado locked/unlocked/completed.
- `LessonSidebar`: Menu lateral com lista de aulas e indicadores de progresso.
- `LessonContent`: Player de conteúdo com transcrição HTML.
- `TermCard`: Glossário de termos financeiros com explicação simplificada e detalhada.
- `PodcastCard`: Player estilo "capa de álbum" com visualizador de áudio animado.
- `CategoryFilter` / `LevelFilter`: Filtros para navegação do glossário.

> 🔒 **Regra de Negócio: Sistema de Trava**
> O usuário só pode acessar a aula `N` se tiver completado a aula `N-1`. A validação é feita via `maxCompletedId` do Supabase. Aulas futuras exibem opacidade reduzida e ícone de cadeado.

> ⏱️ **Regra de Negócio: Timer Anti-Farm**
> O botão "Concluir Aula" possui um delay obrigatório de **30 segundos** para evitar farm de XP.

**Checklist de Funcionalidades**:
- [ ] Mapa de aulas com estados visuais (bloqueada, disponível, concluída)
- [ ] Progressão sequencial obrigatória
- [ ] Player de conteúdo com transcrição
- [ ] Glossário de 30+ termos financeiros com 3 níveis
- [ ] Timer de 30s antes de concluir aula
- [ ] Ganho de XP ao completar aula
- [ ] Acesso direto ao conteúdo (sem modais de introdução)

---

### 3.3 Praticar (Arcade)

**Objetivo**: Reforçar conceitos financeiros através de jogos interativos e gamificados.

#### Tabela de Jogos e Recompensas

| Jogo | Tipo | Descrição | Recompensa XP |
|---|---|---|---|
| **Desafio de Termos** | Jogo da Memória | Parear termos financeiros com suas definições. Feedback visual vibrante com cores únicas por par. | Variável por acertos |
| **O Consultor** | Simulador de Decisões | Cenários de carreira/investimento onde o usuário toma decisões e vê consequências. | Por cenário concluído |
| **Empire Builder** | Idle/Incremental | Construção de patrimônio progressiva. Compra de ativos que geram renda passiva. | Baseado em patrimônio |

**Componentes Chave**:
- `DesafioTermos`: Grid de cards flip com matching de pares e feedback visual (cores vibrantes únicas por par).
- `OConsultor`: Interface de narrativa com escolhas binárias e consequências financeiras.
- `EmpireBuilder`: Dashboard incremental com compra de itens, renda passiva e progressão.
- `GameHelp`: Modal de instruções contextual para cada jogo.

**Checklist de Funcionalidades**:
- [ ] 3 jogos distintos com mecânicas diferentes
- [ ] Feedback visual e sonoro em cada ação
- [ ] Persistência de progresso (localStorage + Supabase)
- [ ] Sistema de XP integrado ao perfil global
- [ ] Instruções acessíveis para cada jogo

---

### 3.4 Simular

**Objetivo**: Oferecer calculadoras financeiras interativas com dados reais do mercado brasileiro.

**Componentes Chave**:
- `CompoundInterestCalculator`: Calculadora de juros compostos com gráfico de área (Recharts) mostrando crescimento do capital ao longo do tempo.
- `InvestmentComparator`: Comparador entre Poupança, CDB (100% CDI) e Tesouro Selic com IR regressivo.

> 📊 **Regra de Negócio: Cálculo da Poupança**
> - Se SELIC > 8.5%: `(1 + TaxaMensal)^12 - 1` (regra antiga anualizada)
> - Se SELIC ≤ 8.5%: `SELIC × 0.70`

> 💰 **Regra de Negócio: Tabela Regressiva de IR**
>
> | Prazo | Alíquota |
> |---|---|
> | Até 180 dias | 22,5% |
> | 181–360 dias | 20,0% |
> | 361–720 dias | 17,5% |
> | 720+ dias | 15,0% |

**Checklist de Funcionalidades**:
- [ ] Calculadora de juros compostos com inputs formatados (BRL)
- [ ] Gráficos de área com gradientes animados
- [ ] Comparador de 3 tipos de investimento
- [ ] Taxas reais do mercado (SELIC, CDI, IPCA via n8n)
- [ ] Inputs numéricos sem setas do navegador
- [ ] Concordância gramatical dinâmica ("1 ano" vs "10 anos")

---

### 3.5 Ranking

**Objetivo**: Classificação global dos usuários por XP total, promovendo competição saudável.

**Checklist de Funcionalidades**:
- [ ] Pódio visual para os Top 3 (ouro, prata, bronze)
- [ ] Lista dinâmica com posição, avatar, nome e XP
- [ ] Destaque da posição do usuário logado
- [ ] Atualização em tempo real

---

### 3.6 Perfil

**Objetivo**: Gestão de conta e visualização detalhada de estatísticas do usuário.

**Checklist de Funcionalidades**:
- [ ] Exibição de avatar, nome e email
- [ ] Estatísticas detalhadas: XP total, nível, aulas concluídas
- [ ] Estatísticas dos jogos (Desafio de Termos, O Consultor, Empire Builder)
- [ ] Opções de Hard Reset granular:
  - Reset de XP apenas
  - Reset de Aulas apenas
  - Reset Geral (tudo)
- [ ] Logout

---

## 🎮 4. Mecânicas de Gamificação (Core Loop)

### Sistema de XP

| Ação | XP Ganho |
|---|---|
| Completar uma aula | Variável (definido por aula) |
| Vitória no Desafio de Termos | Por acerto |
| Cenário no O Consultor | Por decisão correta |
| Conversa com Tutor IA | Bônus por interação |

### Níveis de Progressão

| Nível | Faixa de XP | Ícone |
|---|---|---|
| Iniciante | 0 – X | 🌱 |
| Investidor | X – Y | 📈 |
| Magnata | Y+ | 💎 |

### Feedback Visual

- **Confetes** (`canvas-confetti`): Disparados ao completar aula ou subir de nível.
- **Barras de Progresso Animadas**: Transição suave com Framer Motion.
- **Sons de Sucesso**: Efeitos sonoros via `useSound` hook.
- **Cores Dinâmicas**: Cards de termos e jogos com cores vibrantes contextuais.

---

## 🤖 5. Sistema de IA (Chat Tutor)

### Descrição
Widget flutuante (`ChatWidget.tsx`) com tutor financeiro alimentado por IA via n8n.

### Comportamento Responsivo
- **Mobile**: Overlay full-screen com header fixo.
- **Desktop**: Popover 450×600px no canto inferior direito com bordas arredondadas (24px).

### Integração Técnica

```
Usuário → ChatWidget (React) → POST /webhook (n8n) → LLM com RAG → Resposta JSON → Renderização Markdown
```

### Funcionalidades
- **Formatação Markdown em tempo real**: Respostas renderizadas via `react-markdown` com suporte a código, listas e formatação rica.
- **Scroll Inteligente**: Auto-scroll para o início da resposta do assistente (não para o final).
- **Tratamento de Erros (RAG)**: Quando a base de conhecimento não contém a resposta, exibe mensagem amigável sugerindo reformulação.
- **Indicador de Loading**: Animação "Consultando base de conhecimento..." durante processamento.
- **Parsing Robusto**: Tratamento de respostas em múltiplos formatos (array, objeto, string, double-serialization).

> ⚙️ **Configuração Necessária**
> A variável de ambiente `VITE_N8N_WEBHOOK_URL` deve estar configurada no `.env` para que o chat funcione. Caso contrário, uma mensagem de configuração pendente é exibida.

---

## 🔐 6. Autenticação e Dados

### Login/Cadastro
- Autenticação via **Supabase Auth** (email/senha).
- Página de login com design premium (glassmorphism).
- Redirecionamento automático após login.
- `AuthGuard` component protege rotas que exigem autenticação.

### Persistência de Dados

| Dado | Armazenamento | Sincronização |
|---|---|---|
| XP Total | Supabase (`profiles`) | Tempo real |
| Progresso de Aulas | Supabase (`user_progress`) | Tempo real |
| Save do Empire Builder | localStorage | Local |
| Stats do O Consultor | localStorage | Local |
| Stats do Desafio de Termos | localStorage | Local |
| Taxas de Mercado | Supabase (`dados_mercado`) | Diária (n8n 06:00) |

### Sincronização Real-time
- Atualização de XP reflete instantaneamente no Dashboard e Sidebar.
- Progresso de aulas atualiza o mapa visual da trilha imediatamente.

---

## 📐 7. Design System

### Tokens Principais
- **Background**: `slate-950` (fundo principal)
- **Cards**: `white/5` a `white/10` com `backdrop-blur`
- **Bordas**: `white/10` com brilho no hover (`white/20`)
- **Texto**: `white` (principal), `slate-400` (secundário), `muted-foreground`
- **Accent**: `primary` (azul) com gradientes `from-primary to-blue-600`
- **Sucesso**: `emerald-500`

### Fontes
- **Display**: Font family `font-display` para títulos
- **Body**: Font family padrão do sistema

---

*Documento gerado em 10/02/2026. Versão 1.0.*
