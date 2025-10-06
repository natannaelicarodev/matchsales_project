# 🧪 Gerenciamento de Usuários - Match Sales Frontend

Uma aplicação completa de gerenciamento de usuários desenvolvida como parte do desafio técnico para desenvolvedor front-end, utilizando as mais modernas tecnologias do ecossistema React.

## 🎯 Sobre o Projeto

Esta aplicação demonstra a implementação de um sistema CRUD (Create, Read, Update, Delete) para gerenciamento de usuários, consumindo dados da API JSONPlaceholder e implementando funcionalidades avançadas de interface e experiência do usuário.

### ✨ Funcionalidades Implementadas

**Funcionalidades Principais:**
- **Listagem de Usuários**: Visualização em cards responsivos com informações completas
- **Busca e Filtros**: Sistema de busca em tempo real por nome, email ou cidade
- **Criação de Usuários**: Formulário completo com validação em tempo real
- **Edição de Usuários**: Modal de edição com todos os campos editáveis
- **Exclusão de Usuários**: Confirmação de exclusão com feedback visual
- **Dashboard de Estatísticas**: Análise visual dos dados dos usuários

**Funcionalidades Extras:**
- **Tema Claro/Escuro**: Alternância entre temas com persistência local
- **Estados de Loading**: Indicadores visuais durante operações assíncronas
- **Tratamento de Erros**: Feedback adequado para diferentes cenários de erro
- **Interface Responsiva**: Design adaptativo para mobile, tablet e desktop
- **Micro-interações**: Animações e transições suaves
- **Acessibilidade**: Componentes acessíveis seguindo padrões WCAG

## 🛠️ Stack Tecnológica

### Tecnologias Obrigatórias
- **React 19.1.0** - Biblioteca principal para construção da interface
- **Vite 6.3.5** - Build tool e servidor de desenvolvimento
- **React Query (TanStack Query) 5.90.2** - Gerenciamento de estado servidor e cache
- **React Hook Form 7.56.3** - Gerenciamento de formulários performático
- **Zod 3.24.4** - Validação de esquemas e tipos
- **ShadcnUI** - Biblioteca de componentes acessíveis
- **Tailwind CSS 4.1.7** - Framework CSS utilitário

### Dependências Adicionais
- **React Router DOM 7.6.1** - Roteamento client-side
- **Lucide React 0.510.0** - Ícones SVG otimizados
- **Sonner 2.0.3** - Sistema de notificações toast
- **Framer Motion 12.15.0** - Animações e transições
- **Date-fns 4.1.0** - Manipulação de datas

## 📦 Instalação e Execução

### Pré-requisitos
- Node.js 18+ 
- pnpm (recomendado) ou npm

### Passos para Instalação

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd matchsales_project
```

2. **Instale as dependências**
```bash
pnpm install
# ou
npm install
```

3. **Execute o servidor de desenvolvimento**
```bash
pnpm run dev
# ou
npm run dev
```

4. **Acesse a aplicação**
```
http://localhost:5173
```

### Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `pnpm run dev` | Inicia o servidor de desenvolvimento |
| `pnpm run build` | Gera build de produção |
| `pnpm run preview` | Visualiza build de produção localmente |
| `pnpm run lint` | Executa linting do código |

## 🏗️ Arquitetura do Projeto

### Estrutura de Diretórios

```
src/
├── components/          # Componentes reutilizáveis
│   ├── ui/             # Componentes base do ShadcnUI
│   ├── Layout.jsx      # Layout principal da aplicação
│   ├── UserCard.jsx    # Card de exibição de usuário
│   ├── UserForm.jsx    # Formulário de usuário
│   ├── UserStats.jsx   # Dashboard de estatísticas
│   ├── SearchInput.jsx # Componente de busca
│   ├── EditUserModal.jsx # Modal de edição
│   └── theme-provider.jsx # Provedor de tema
├── hooks/              # Hooks customizados
│   └── useUsers.js     # Hook para operações de usuário
├── lib/                # Utilitários e configurações
│   └── validations.js  # Esquemas de validação Zod
├── pages/              # Páginas da aplicação
│   ├── UsersPage.jsx   # Página principal de usuários
│   └── NewUserPage.jsx # Página de criação de usuário
├── assets/             # Recursos estáticos
├── App.jsx             # Componente raiz
├── App.css             # Estilos globais
└── main.jsx            # Ponto de entrada
```

### Padrões de Desenvolvimento

**Gerenciamento de Estado:**
- React Query para estado servidor (cache, sincronização, loading states)
- React Hook Form para estado de formulários
- Context API para tema global

**Validação de Dados:**
- Esquemas Zod para validação de formulários
- Validação em tempo real com feedback visual
- Transformação e sanitização de dados

**Estilização:**
- Tailwind CSS para estilização utilitária
- CSS Variables para sistema de cores
- Componentes ShadcnUI para consistência visual

## 🔧 Funcionalidades Técnicas Detalhadas

### Sistema de Usuários

**Listagem de Usuários:**
- Consumo da API JSONPlaceholder (`/users`)
- Cache inteligente com React Query (5 minutos de stale time)
- Estados de loading, erro e sucesso
- Busca em tempo real com debounce (300ms)
- Filtros por nome, email e cidade

**Criação de Usuários:**
- Formulário com validação Zod
- Campos obrigatórios: nome (mín. 2 chars) e email (formato válido)
- Campos opcionais: cidade
- Preview em tempo real dos dados inseridos
- Simulação de API com delay realístico

**Edição de Usuários:**
- Modal responsivo com todos os campos editáveis
- Validação idêntica à criação
- Atualização otimista do cache
- Feedback visual de sucesso/erro

**Exclusão de Usuários:**
- Confirmação obrigatória via AlertDialog
- Remoção otimista do cache
- Estados de loading durante operação

### Dashboard de Estatísticas

**Métricas Calculadas:**
- Total de usuários cadastrados
- Percentual de usuários com cidade

**Análises Avançadas:**
- Top 5 cidades mais comuns
- Visualização em cards responsivos

### Sistema de Temas

**Implementação:**
- Context API para gerenciamento global
- Persistência no localStorage
- Suporte a tema automático (system)
- Transições suaves entre temas

**Cores Disponíveis:**
- Tema claro com paleta neutra
- Tema escuro com contraste otimizado
- Variáveis CSS para consistência

## 🎨 Design e UX

### Princípios de Design

**Hierarquia Visual:**
- Tipografia escalável com pesos adequados
- Espaçamento consistente usando sistema Tailwind
- Cores semânticas para diferentes estados

**Responsividade:**
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px)
- Grid adaptativo para diferentes tamanhos de tela

**Micro-interações:**
- Hover states em todos os elementos interativos
- Transições suaves (300ms) para mudanças de estado
- Loading spinners e skeleton screens
- Animações de entrada/saída para modais

### Acessibilidade

**Implementações:**
- Componentes ShadcnUI com suporte ARIA
- Navegação por teclado completa
- Contraste adequado em ambos os temas
- Labels descritivos para screen readers
- Focus indicators visíveis

## 🧪 Decisões Técnicas

### Escolha do React Query

**Motivação:**
React Query para gerenciar o estado servidor devido às suas capacidades avançadas de cache, sincronização automática e gerenciamento de estados de loading/erro. Isso elimina a necessidade de Redux para este caso de uso específico.

**Benefícios Implementados:**
- Cache automático com invalidação inteligente
- Refetch em background para dados sempre atualizados
- Estados de loading/erro padronizados
- Otimistic updates para melhor UX

### Arquitetura de Componentes

**Estratégia:**
Adotei uma arquitetura baseada em composição, onde componentes menores e focados são combinados para formar interfaces complexas. Isso facilita manutenção e reutilização.

**Padrões Utilizados:**
- Compound Components para formulários complexos
- Render Props para lógica reutilizável
- Custom Hooks para abstração de lógica de negócio

### Validação com Zod

**Implementação:**
Zod foi integrado com React Hook Form através do resolver oficial, permitindo validação type-safe e mensagens de erro personalizadas.

**Vantagens:**
- Schema único para validação e tipos
- Transformação automática de dados
- Validação em tempo real sem re-renders desnecessários

## 🚀 Deploy e Produção

### Build de Produção

```bash
npm run build
```

O comando gera uma build otimizada na pasta `dist/` com:
- Minificação de JavaScript e CSS
- Tree-shaking para remoção de código não utilizado
- Otimização de assets e imagens
- Chunking automático para melhor cache

## 👨‍💻 Processo de Desenvolvimento

### Metodologia

O desenvolvimento seguiu uma abordagem iterativa, priorizando funcionalidades core antes de implementar melhorias. Cada feature foi desenvolvida com foco em qualidade e experiência do usuário.

**Fases do Desenvolvimento:**
1. **Setup e Configuração** - Estrutura base e dependências
2. **Componentes Base** - Layout e sistema de design
3. **Funcionalidades Core** - CRUD de usuários
4. **Melhorias UX** - Validações, feedback e micro-interações
5. **Features Extras** - Dashboard, temas e otimizações

## 📝 Conclusão

Esta aplicação demonstra a implementação de um sistema completo de gerenciamento de usuários utilizando as melhores práticas do desenvolvimento React moderno. O projeto combina performance, acessibilidade e experiência do usuário em uma solução robusta e escalável.

**Principais Conquistas:**
- Interface moderna e responsiva
- Validação robusta com feedback em tempo real
- Gerenciamento de estado eficiente
- Código limpo e bem estruturado
- Documentação completa e detalhada

---

**Desenvolvido por:** Natannael Icaro  
**Tecnologias:** React + React Query + React Hook Form + Zod + ShadcnUI + Tailwind CSS  
**Licença:** MIT
