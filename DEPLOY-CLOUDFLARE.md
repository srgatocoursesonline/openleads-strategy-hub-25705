# 🚀 Guia de Deploy - Cloudflare Pages

Este guia mostra como fazer deploy do **OpenLeads Strategy Hub** no Cloudflare Pages.

---

## 📋 Pré-requisitos

Antes de começar, você precisa:

- ✅ Conta no [Cloudflare](https://dash.cloudflare.com/sign-up)
- ✅ Repositório Git (GitHub, GitLab ou Bitbucket)
- ✅ Código commitado e enviado para o repositório
- ✅ Node.js 18+ instalado localmente (para testes)

---

## 🎯 Método 1: Deploy via Dashboard (Recomendado)

### Passo 1: Preparar o Repositório

```bash
# 1. Certifique-se de que o código está commitado
git add .
git commit -m "feat: preparar projeto para deploy no Cloudflare Pages"

# 2. Envie para o repositório remoto
git push origin main
```

### Passo 2: Configurar no Cloudflare

1. **Acesse o Dashboard**
   - Vá para [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - Entre na sua conta

2. **Criar Novo Projeto**
   - Clique em **"Workers & Pages"** no menu lateral
   - Clique em **"Create application"**
   - Selecione a aba **"Pages"**
   - Clique em **"Connect to Git"**

3. **Conectar Repositório**
   - Autorize o Cloudflare a acessar seu GitHub/GitLab
   - Selecione o repositório do projeto
   - Clique em **"Begin setup"**

4. **Configurar Build**

   Use estas configurações:

   ```
   Project name:           openleads-strategy-hub
   Production branch:      main
   Build command:          npm run build
   Build output directory: dist
   ```

   **Framework preset:** Selecione **"Vite"** ou **"None"**

5. **Variáveis de Ambiente (Opcional)**
   
   Se necessário, adicione variáveis de ambiente:
   - Clique em **"Environment variables"**
   - Adicione suas variáveis (ex: `VITE_API_URL`)

6. **Deploy!**
   - Clique em **"Save and Deploy"**
   - Aguarde o build (geralmente 1-3 minutos)

### Passo 3: Verificar Deploy

Após o build:
- ✅ URL de produção será gerada automaticamente
- ✅ Formato: `https://openleads-strategy-hub.pages.dev`
- ✅ Acesse a URL para verificar o site

---

## 🔧 Método 2: Deploy via Wrangler CLI

### Instalação do Wrangler

```bash
# Instalar Wrangler globalmente
npm install -g wrangler

# Ou como dependência do projeto
npm install -D wrangler
```

### Login no Cloudflare

```bash
# Fazer login
wrangler login

# Verificar autenticação
wrangler whoami
```

### Deploy Direto

```bash
# 1. Build do projeto
npm run build

# 2. Deploy para Cloudflare Pages
npx wrangler pages deploy dist --project-name=openleads-strategy-hub

# Ou se instalado globalmente
wrangler pages deploy dist --project-name=openleads-strategy-hub
```

### Deploy com Script Automatizado

Adicionei um script no `package.json`:

```bash
# Deploy de produção
npm run deploy:cloudflare
```

---

## 🌐 Método 3: Deploy Drag & Drop

Para testes rápidos:

1. **Build Local**
   ```bash
   npm run build
   ```

2. **Upload Manual**
   - Acesse [Cloudflare Pages](https://pages.cloudflare.com/)
   - Clique em **"Create a project"**
   - Selecione **"Direct Upload"**
   - Arraste a pasta `dist` para o upload
   - Aguarde o deploy

⚠️ **Nota:** Este método não é recomendado para produção.

---

## ⚙️ Configuração Avançada

### Custom Domain (Domínio Próprio)

1. **Adicionar Domínio**
   - No projeto do Cloudflare Pages
   - Vá em **"Custom domains"**
   - Clique em **"Set up a custom domain"**
   - Digite: `openleadsstrategy.com`

2. **Configurar DNS**
   - Adicione um registro CNAME:
     ```
     CNAME  @  openleads-strategy-hub.pages.dev
     ```
   - Ou use Cloudflare como DNS (recomendado)

3. **SSL Automático**
   - Cloudflare ativa SSL automaticamente
   - Aguarde 5-10 minutos para propagação

### Preview Deployments

Cloudflare cria automaticamente deploys de preview para:
- ✅ Cada Pull Request
- ✅ Cada branch (opcional)

Formato da URL: `https://[branch].[project].pages.dev`

### Variáveis de Ambiente

**Via Dashboard:**
1. Vá em **Settings** → **Environment variables**
2. Adicione variável: `VITE_API_URL`
3. Valor: `https://api.openleadsstrategy.com`
4. Escolha ambiente: Production/Preview

**Via Wrangler:**
```bash
# Definir variável
wrangler pages secret put VITE_API_URL

# Listar variáveis
wrangler pages secret list
```

### Rollback de Deploy

Se algo der errado:

1. **Via Dashboard:**
   - Vá em **Deployments**
   - Encontre o deploy anterior estável
   - Clique em **"Rollback to this deployment"**

2. **Via CLI:**
   ```bash
   wrangler pages deployment list
   wrangler pages deployment rollback [deployment-id]
   ```

---

## 📊 Performance e Otimizações

### Cache Headers

Os arquivos `_headers` e `wrangler.toml` já configuram:
- ✅ Cache de 1 ano para assets estáticos
- ✅ Headers de segurança
- ✅ Revalidação para HTML

### Analytics

Ativar Cloudflare Web Analytics:
1. No Dashboard do projeto
2. Vá em **"Web Analytics"**
3. Clique em **"Enable Web Analytics"**
4. Adicione o script no `index.html` (opcional)

---

## 🔄 CI/CD Automático

### GitHub Actions (Opcional)

Crie `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Cloudflare Pages

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        
      - name: Deploy to Cloudflare Pages
        uses: cloudflare/pages-action@v1
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          projectName: openleads-strategy-hub
          directory: dist
          gitHubToken: ${{ secrets.GITHUB_TOKEN }}
```

---

## ✅ Checklist Pré-Deploy

Antes de fazer deploy em produção:

- [ ] Testar build local: `npm run build && npm run preview`
- [ ] Verificar todas as páginas funcionam
- [ ] Atualizar informações de contato reais
- [ ] Adicionar logo e imagens otimizadas
- [ ] Configurar variáveis de ambiente
- [ ] Verificar meta tags e SEO
- [ ] Testar formulário de contato
- [ ] Verificar links das redes sociais
- [ ] Remover console.logs de debug
- [ ] Executar `npm audit fix`

---

## 🐛 Troubleshooting

### Erro: Build Failed

**Problema:** Build falha no Cloudflare

**Solução:**
```bash
# Testar build localmente primeiro
npm run build

# Verificar logs no Dashboard
# Cloudflare mostra logs detalhados
```

### Erro: 404 em rotas do React Router

**Problema:** Rotas SPA não funcionam

**Solução:**
- ✅ Verifique se `_redirects` está na pasta `dist`
- ✅ Ou configure redirect no `wrangler.toml` (já configurado)

### Erro: Variáveis de ambiente não carregam

**Problema:** `import.meta.env` retorna undefined

**Solução:**
- ✅ Variáveis DEVEM começar com `VITE_`
- ✅ Rebuild após adicionar variáveis
- ✅ Verifique no Dashboard se estão configuradas

---

## 📞 Suporte

### Recursos Úteis

- 📚 [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- 💬 [Cloudflare Community](https://community.cloudflare.com/)
- 🎓 [Vite Deploy Guide](https://vitejs.dev/guide/static-deploy.html)

### Status do Serviço

- [Cloudflare Status](https://www.cloudflarestatus.com/)

---

## 🎉 Deploy Realizado!

Após o deploy bem-sucedido:

1. **URL de Produção:** `https://openleads-strategy-hub.pages.dev`
2. **Domínio Custom:** Configure `openleadsstrategy.com`
3. **SSL:** Automático e gratuito
4. **CDN Global:** Distribuído automaticamente
5. **DDoS Protection:** Incluído gratuitamente

### Próximos Passos

- [ ] Configurar domínio customizado
- [ ] Ativar Web Analytics
- [ ] Configurar alertas de uptime
- [ ] Adicionar Google Analytics
- [ ] Configurar Search Console

---

**🚀 Seu site está no ar com performance global da Cloudflare!**

---

**Última atualização:** Outubro 2025

