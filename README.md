# OpenLeads Strategy Hub

> Website institucional da **OpenLeads Strategy** - Agência de Marketing Digital e OSINT

📚 **[Ver índice completo de documentação →](./DOCUMENTACAO-INDEX.md)**

## 📋 Sobre o Projeto

Site institucional moderno e responsivo desenvolvido para a OpenLeads Strategy, uma agência especializada em inteligência estratégica (OSINT) e marketing digital data-driven.

### ✨ Características

- 🎨 Design moderno com dark mode
- 📱 Totalmente responsivo
- ⚡ Performance otimizada com Vite
- 🎭 Animações suaves com Framer Motion
- 🧩 Componentes reutilizáveis com shadcn/ui
- 🎯 SEO otimizado

## 🛠️ Tecnologias

Este projeto utiliza:

- **React 18** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Framework CSS utility-first
- **shadcn/ui** - Componentes acessíveis
- **Framer Motion** - Animações
- **React Router** - Roteamento
- **Lucide React** - Ícones

## 🚀 Como Rodar o Projeto

### Pré-requisitos

- Node.js 18+ instalado
- npm ou yarn

### Instalação

```bash
# 1. Clone o repositório
git clone <URL_DO_REPOSITORIO>

# 2. Entre na pasta do projeto
cd openleads-strategy-hub-25705

# 3. Instale as dependências
npm install

# 4. Execute o projeto em desenvolvimento
npm run dev
```

O projeto estará disponível em `http://localhost:8080`

## 📦 Scripts Disponíveis

```bash
npm run dev              # Inicia o servidor de desenvolvimento
npm run dev:wrangler     # Dev com Cloudflare Workers (para testar emails)
npm run build            # Build de produção
npm run build:dev        # Build em modo desenvolvimento
npm run preview          # Preview do build de produção
npm run lint             # Executa o linter
npm run deploy:cloudflare # Deploy direto para Cloudflare Pages
```

## 📧 Formulário de Contato - 100% Gratuito

O formulário de contato está totalmente funcional e envia emails via **Web3Forms** (serviço gratuito).

### 🚀 Setup Rápido (5 minutos)

1. **Crie conta gratuita no Web3Forms**  
   Acesse: https://web3forms.com/ e clique em "Get Started Free"

2. **Copie sua Access Key**  
   No painel, crie uma nova key (1 clique)

3. **Configure no Cloudflare Pages**  
   - Vá em: Settings > Environment Variables
   - Adicione: `WEB3FORMS_ACCESS_KEY` = `sua_key_aqui`

4. **Faça deploy!**  
   Pronto! Os emails chegarão em `rodrigo.azevedo1988@gmail.com`

### Como Funciona

1. Usuário preenche o formulário no site
2. Dados são validados (Zod schema)
3. Requisição enviada para `/api/send-email` (Cloudflare Worker)
4. Email enviado via **Web3Forms** (ou fallback para FormSubmit)
5. Você recebe o email no Gmail!

### Testar Localmente

```bash
# 1. Crie arquivo .dev.vars na raiz
echo "WEB3FORMS_ACCESS_KEY=sua_key_aqui" > .dev.vars

# 2. Build e execute com Wrangler
npm run build
npx wrangler pages dev dist --port 8788

# 3. Acesse: http://localhost:8788
```

### Fallback Automático

Se o Web3Forms falhar, o sistema automaticamente tenta via **FormSubmit** (sem configuração adicional).

**Importante:** Verifique a pasta de spam ao testar pela primeira vez.

📚 **[Documentação completa →](./functions/README.md)** (troubleshooting, logs, alternativas)

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes React
│   ├── ui/             # Componentes do shadcn/ui
│   ├── Header.tsx      # Cabeçalho
│   ├── Footer.tsx      # Rodapé
│   ├── Hero.tsx        # Seção hero
│   ├── About.tsx       # Sobre nós
│   ├── Services.tsx    # Serviços
│   ├── Differentials.tsx # Diferenciais (OSINT)
│   ├── WhyUs.tsx       # Por que nós
│   ├── Contact.tsx     # Contato
│   └── ...
├── pages/              # Páginas
│   ├── Index.tsx       # Página principal
│   └── NotFound.tsx    # Página 404
├── hooks/              # Custom hooks
├── lib/                # Utilitários
├── App.tsx             # Componente principal
└── main.tsx            # Entry point
```

## 🎨 Design System

O projeto utiliza o **shadcn/ui** com Tailwind CSS, garantindo:

- Componentes acessíveis (WCAG AA+)
- Design consistente
- Dark mode integrado
- Tokens de design customizáveis

## 🔧 Configuração

### Variáveis de Ambiente

Para o formulário de contato funcionar, você precisa configurar:

**Cloudflare Pages (Produção):**
```
Settings > Environment Variables:
WEB3FORMS_ACCESS_KEY = sua_access_key_do_web3forms
```

**Desenvolvimento Local (opcional):**
```bash
# Crie arquivo .dev.vars na raiz
WEB3FORMS_ACCESS_KEY=sua_access_key_aqui
```

🔑 **Como obter:** Acesse https://web3forms.com/ e crie uma conta gratuita

### Personalização

- **Cores**: Edite `tailwind.config.ts`
- **Fontes**: Configuradas em `index.html` (Inter e Space Grotesk)
- **Componentes**: Componentes shadcn em `src/components/ui/`

## 📝 Convenções de Código

- **Estilo**: ESLint + Prettier configurados
- **TypeScript**: Modo estrito habilitado
- **Componentes**: Funcionais com hooks
- **Nomenclatura**: camelCase para variáveis, PascalCase para componentes
- **Idioma**: Código e comentários em inglês, UI em português

## 🚀 Deploy

### Cloudflare Pages (Recomendado)

Este projeto está configurado para deploy no Cloudflare Pages.

**Deploy Rápido:**
```bash
# Via Dashboard (conectar repositório Git)
# Acesse: https://dash.cloudflare.com/
# Configure: Build command = npm run build, Output = dist

# Via CLI
npm install -g wrangler
wrangler login
npm run deploy:cloudflare
```

📚 **Guias de Deploy:**
- [Guia Rápido](./DEPLOY-QUICK-START.md) - 5 minutos
- [Guia Completo](./DEPLOY-CLOUDFLARE.md) - Documentação detalhada

### Build de Produção

```bash
# Build padrão
npm run build

# Build com arquivos Cloudflare
npm run build:cloudflare

# Preview local do build
npm run preview
```

Os arquivos otimizados estarão em `/dist`

### Outros Servidores

Também compatível com:
- Vercel
- Netlify  
- GitHub Pages
- AWS S3 + CloudFront

## 📄 Licença

© 2025 OpenLeads Strategy. Todos os direitos reservados.

## 🤝 Contato

- **Email**: contato@openleadsstrategy.com
- **Instagram**: [@openleadsstrategy](https://instagram.com/openleadsstrategy)
- **LinkedIn**: [OpenLeads Strategy](https://linkedin.com/company/openleadsstrategy)

---

**Desenvolvido com ❤️ para OpenLeads Strategy**
