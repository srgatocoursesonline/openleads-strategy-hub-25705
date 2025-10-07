# 🚀 Deploy Rápido - Cloudflare Pages

## ⚡ Início Rápido (5 minutos)

### Opção 1: Deploy via Dashboard (Mais Fácil)

```bash
# 1. Commit e push do código
git add .
git commit -m "feat: preparar para deploy"
git push origin main

# 2. Acesse: https://dash.cloudflare.com/
# 3. Workers & Pages → Create application → Pages → Connect to Git
# 4. Configure:
#    - Build command: npm run build
#    - Build output: dist
# 5. Deploy!
```

### Opção 2: Deploy via CLI (Automático)

```bash
# 1. Instalar Wrangler (apenas uma vez)
npm install -g wrangler

# 2. Login no Cloudflare
wrangler login

# 3. Deploy!
npm run deploy:cloudflare
```

## 📝 Comandos Disponíveis

```bash
# Desenvolvimento
npm run dev                    # Servidor local (porta 8080)

# Build
npm run build                  # Build de produção
npm run build:cloudflare       # Build + copia arquivos CF
npm run preview               # Preview do build local

# Deploy
npm run deploy:cloudflare     # Deploy produção
npm run deploy:preview        # Deploy preview
```

## ✅ URLs Após Deploy

- **Produção:** `https://openleads-strategy-hub.pages.dev`
- **Preview:** `https://[branch].openleads-strategy-hub.pages.dev`
- **Custom:** Configure seu domínio no Dashboard

## 🔧 Configuração Inicial (Primeira vez)

### 1. Criar Projeto no Cloudflare

**Via Dashboard:**
1. Acesse https://dash.cloudflare.com/
2. Clique em "Workers & Pages"
3. "Create application" → "Pages" → "Connect to Git"
4. Selecione o repositório
5. Configure:
   ```
   Project name: openleads-strategy-hub
   Production branch: main
   Build command: npm run build
   Build output directory: dist
   Framework preset: Vite
   ```

**Via Wrangler:**
```bash
# Login
wrangler login

# Deploy primeira vez
npm run build
wrangler pages deploy dist --project-name=openleads-strategy-hub
```

### 2. Configurar Domínio Customizado (Opcional)

1. No projeto Cloudflare → "Custom domains"
2. "Set up a custom domain"
3. Digite: `openleadsstrategy.com`
4. Siga instruções de DNS
5. SSL automático em ~10 minutos

### 3. Variáveis de Ambiente (Se necessário)

**Via Dashboard:**
- Settings → Environment variables
- Adicione: `VITE_API_URL`, etc.

**Via CLI:**
```bash
wrangler pages secret put VITE_API_URL
# Digite o valor quando solicitado
```

## 🎯 Workflow Recomendado

### Deploy Automático (GitHub)

```bash
# 1. Faça alterações
git add .
git commit -m "feat: nova funcionalidade"

# 2. Push
git push origin main

# 3. Cloudflare faz deploy automaticamente!
# Aguarde ~2 minutos
```

### Deploy Manual (CLI)

```bash
# 1. Build e deploy em um comando
npm run deploy:cloudflare

# 2. Aguarde finalização
# URL será exibida no terminal
```

### Deploy de Preview (Testar antes)

```bash
# 1. Criar branch
git checkout -b nova-feature

# 2. Fazer alterações e commit
git add .
git commit -m "feat: testar nova feature"

# 3. Deploy preview
npm run deploy:preview

# 4. Testar URL de preview
# 5. Merge se OK
```

## 📊 Verificar Deploy

### Via Dashboard
1. Acesse projeto no Cloudflare
2. Veja "Deployments"
3. Status: Building → Success
4. Clique na URL para acessar

### Via CLI
```bash
# Listar deploys
wrangler pages deployment list

# Ver logs
wrangler pages deployment tail
```

## 🐛 Solução Rápida de Problemas

### Build falha
```bash
# Testar build localmente
npm run build

# Ver erros detalhados
# Corrigir e tentar novamente
```

### 404 em rotas
```bash
# Verificar se _redirects está no dist
ls dist/_redirects

# Rebuild se necessário
npm run build:cloudflare
```

### Variáveis não carregam
```bash
# Verificar prefixo VITE_
# Rebuild após adicionar variáveis
npm run build
```

## 📈 Próximos Passos

Após deploy bem-sucedido:

- [ ] Configurar domínio customizado
- [ ] Ativar Web Analytics
- [ ] Adicionar Google Analytics
- [ ] Configurar alertas de uptime
- [ ] Otimizar imagens (WebP)
- [ ] Configurar CDN cache

## 🔗 Links Úteis

- [Dashboard Cloudflare](https://dash.cloudflare.com/)
- [Documentação CF Pages](https://developers.cloudflare.com/pages/)
- [Status do Serviço](https://www.cloudflarestatus.com/)
- [Guia Completo](./DEPLOY-CLOUDFLARE.md)

---

**✨ Deploy completo em menos de 5 minutos!**

