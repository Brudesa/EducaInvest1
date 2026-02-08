# CONTEXTO DO PROJETO: EDUCAINVEST (Simulador & Aprender)

## 1. Visão Geral
Este projeto é uma plataforma de educação financeira gamificada ("EducaInvest") contendo duas áreas principais:
- **Aprender:** Trilhas de conteúdo com gamificação (XP, níveis).
- **Simular:** Calculadoras financeiras interativas.

## 2. Decisões de Design (UI/UX)
- **Estilo Visual:** Glassmorphism profundo, fundo `slate-950`, gradientes sutis, bordas brilhantes no hover.
- **Componentes Chave:**
  - `TermCard`: Cards com efeito de brilho e ícones dinâmicos (Lucide-react) baseados no tipo de termo.
  - `PodcastCard`: Player estilo "capa de álbum" com visualizador de áudio animado e transcrição expansível.
  - `CompoundInterestCalculator`: Gráficos de área (Recharts) com gradientes e inputs editáveis padronizados.

## 3. Regras de Negócio Implementadas

### A. Módulo "Aprender" (Gamificação)
- **Sistema de Trava (Lock):** O usuário só pode acessar a aula `N` se tiver completado a `N-1`.
- **Validação:** O menu lateral verifica o `maxCompletedId` vindo do Supabase. Aulas futuras ficam com opacidade reduzida e ícone de cadeado.
- **Timer:** Botão de "Concluir Aula" tem um delay de 30s para evitar farm de XP.

### B. Módulo "Simular" (Cálculos Financeiros)
- **Fonte de Dados:** Integração via n8n (webhook diário às 06:00) que alimenta o Supabase com taxas reais (Selic, CDI, IPCA).
- **Cálculo da Poupança:**
  - Se Selic > 8.5%: `(1 + TaxaMensal)^12 - 1` (Regra antiga anualizada).
  - Se Selic <= 8.5%: `Selic * 0.70`.
- **Comparador de Investimentos:**
  - Compara Poupança (Isenta), CDB (100% CDI, IR Regressivo) e Tesouro Selic (Selic, IR Regressivo).
  - **Tabela Regressiva de IR:**
    - Até 180 dias: 22.5%
    - 181-360 dias: 20%
    - 361-720 dias: 17.5%
    - 720+ dias: 15%

## 4. Estrutura Técnica
- **Frontend:** React, Tailwind CSS, Framer Motion, Recharts, Shadcn/ui.
- **Backend:** Supabase (Tabela `dados_mercado` com Upsert via `ticker`).
- **Automação:** n8n busca dados na BrasilAPI e Banco Central e atualiza o banco.

## 5. Instruções para a IA
- Ao editar componentes, manter sempre a padronização de inputs numéricos (sem setas do navegador, formatação BRL automática).
- Manter a concordância gramatical nos inputs de tempo ("1 ano" vs "10 anos").
- Sempre usar 2 casas decimais para valores monetários nos inputs e displays.