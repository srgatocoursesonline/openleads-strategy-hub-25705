# Arquitetura do Projeto - OpenLeads Strategy Hub

## 📐 Estrutura de Pastas

### Estrutura Geral

```
openleads-strategy-hub-25705/
├── public/                 # Arquivos estáticos
│   ├── favicon.ico
│   ├── placeholder.svg
│   └── robots.txt
│
├── src/
│   ├── components/        # Componentes React
│   │   ├── layout/       # Componentes de layout
│   │   │   ├── Header.tsx
│   │   │   └── Footer.tsx
│   │   │
│   │   ├── sections/     # Seções da página
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Services.tsx
│   │   │   ├── Differentials.tsx
│   │   │   ├── WhyUs.tsx
│   │   │   └── Contact.tsx
│   │   │
│   │   ├── common/       # Componentes reutilizáveis
│   │   │   ├── ScrollProgressBar.tsx
│   │   │   ├── ScrollToTop.tsx
│   │   │   └── WhatsAppButton.tsx
│   │   │
│   │   └── ui/          # Componentes shadcn/ui
│   │       └── ... (40+ componentes)
│   │
│   ├── pages/           # Páginas da aplicação
│   │   ├── Index.tsx
│   │   └── NotFound.tsx
│   │
│   ├── hooks/           # Custom React Hooks
│   │   ├── use-mobile.tsx
│   │   └── use-toast.ts
│   │
│   ├── lib/             # Utilitários
│   │   └── utils.ts
│   │
│   ├── App.tsx          # Componente raiz
│   ├── main.tsx         # Entry point
│   └── index.css        # Estilos globais
│
├── index.html           # Template HTML
├── package.json         # Dependências
├── vite.config.ts       # Configuração Vite
├── tailwind.config.ts   # Configuração Tailwind
├── tsconfig.json        # Configuração TypeScript
└── README.md            # Documentação
```

## 🏗️ Decisões Arquiteturais

### Organização de Componentes

#### 1. **Layout** (`components/layout/`)
Componentes que definem a estrutura base da aplicação:
- `Header.tsx` - Navegação principal e menu mobile
- `Footer.tsx` - Rodapé com links e informações de contato

#### 2. **Sections** (`components/sections/`)
Seções específicas da landing page, cada uma representando um bloco de conteúdo:
- `Hero.tsx` - Seção hero com call-to-action principal
- `About.tsx` - Sobre a empresa
- `Services.tsx` - Catálogo de serviços
- `Differentials.tsx` - Diferenciais e OSINT
- `WhyUs.tsx` - Razões para escolher a empresa
- `Contact.tsx` - Formulário de contato

#### 3. **Common** (`components/common/`)
Componentes reutilizáveis que podem ser usados em múltiplas páginas:
- `ScrollProgressBar.tsx` - Barra de progresso de scroll
- `ScrollToTop.tsx` - Botão para voltar ao topo
- `WhatsAppButton.tsx` - Botão flutuante do WhatsApp

#### 4. **UI** (`components/ui/`)
Componentes do design system (shadcn/ui) - primitivos reutilizáveis

### Stack Tecnológica

#### Frontend
- **React 18** - Biblioteca UI com componentes funcionais e hooks
- **TypeScript** - Tipagem estática para maior segurança
- **Vite** - Build tool moderna e rápida
- **React Router DOM** - Roteamento client-side

#### Estilização
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Componentes acessíveis e customizáveis
- **Framer Motion** - Biblioteca de animações

#### Ferramentas
- **ESLint** - Linting de código
- **TypeScript ESLint** - Regras específicas para TS
- **PostCSS** - Processamento de CSS

## 🎨 Design System

### Tokens de Design
Configurados em `tailwind.config.ts`:
- Cores customizadas (accent, background, etc.)
- Tipografia (Inter, Space Grotesk)
- Animações e transições
- Breakpoints responsivos

### Acessibilidade
- Componentes seguem WCAG 2.1 AA
- Labels apropriados
- Suporte a navegação por teclado
- Contraste adequado de cores

## 🔄 Fluxo de Dados

### Estado Global
- **React Query** - Cache e gerenciamento de dados assíncronos
- **Context API** - Estado compartilhado quando necessário

### Formulários
- Validação via `zod`
- Gerenciamento com `react-hook-form`

## 🚀 Build e Deploy

### Desenvolvimento
```bash
npm run dev      # Servidor local na porta 8080
```

### Produção
```bash
npm run build    # Build otimizado para produção
npm run preview  # Preview do build
```

### Otimizações
- Code splitting automático
- Tree shaking
- Minificação
- Lazy loading de componentes

## 📝 Convenções de Código

### Nomenclatura
- **Componentes**: PascalCase (`Header.tsx`)
- **Utilitários**: camelCase (`utils.ts`)
- **Constantes**: UPPER_SNAKE_CASE
- **CSS Classes**: kebab-case ou Tailwind utilities

### Estrutura de Componentes
```tsx
// Imports
import { useState } from "react";
import { Button } from "@/components/ui/button";

// Tipos/Interfaces
interface ComponentProps {
  title: string;
}

// Componente
const Component = ({ title }: ComponentProps) => {
  // Hooks
  const [state, setState] = useState();
  
  // Handlers
  const handleClick = () => {};
  
  // Render
  return <div>{title}</div>;
};

// Export
export default Component;
```

### Importações
- Usar path alias `@/` para imports absolutos
- Agrupar imports por categoria (externos, internos, tipos)

## 🔐 Segurança

- Variáveis de ambiente para dados sensíveis
- Validação de inputs no client e server
- CSP (Content Security Policy) configurado
- HTTPS obrigatório em produção

## 📊 Performance

### Métricas Alvo
- First Contentful Paint (FCP) < 1.5s
- Largest Contentful Paint (LCP) < 2.5s
- Time to Interactive (TTI) < 3.5s

### Estratégias
- Lazy loading de imagens
- Prefetch de rotas críticas
- Memoização de componentes pesados
- Bundle size otimizado

## 🧪 Testes (Futuro)

Estrutura planejada para testes:
```
tests/
├── unit/           # Testes unitários
├── integration/    # Testes de integração
└── e2e/           # Testes end-to-end
```

## 📚 Documentação Relacionada

- [README.md](./README.md) - Guia de início rápido
- [Tailwind Docs](https://tailwindcss.com)
- [shadcn/ui Docs](https://ui.shadcn.com)
- [React Docs](https://react.dev)

---

**Última atualização:** Outubro 2025

