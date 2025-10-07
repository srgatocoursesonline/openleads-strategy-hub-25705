# ⚡ Início Rápido - Deploy em 5 Minutos

## 🎯 Objetivo

Colocar o site **OpenLeads Strategy Hub** no ar em **menos de 5 minutos**.

---

## 📋 Pré-requisitos

- [x] Conta no [Cloudflare](https://dash.cloudflare.com/sign-up) (gratuito)
- [x] Código no GitHub/GitLab (se usar método 1)

---

## 🚀 Método 1: Deploy Automático (Recomendado)

### 1️⃣ Preparar Código (30 segundos)

```bash
git add .
git commit -m "feat: deploy cloudflare pages"
git push origin main
```

### 2️⃣ Conectar ao Cloudflare (2 minutos)

1. Acesse: **https://dash.cloudflare.com/**
2. Clique: **Workers & Pages**
3. Clique: **Create application** → **Pages**
4. Clique: **Connect to Git**
5. Selecione seu repositório

### 3️⃣ Configurar Build (1 minuto)

```
Project name:           openleads-strategy-hub
Production branch:      main
Framework preset:       Vite
Build command:          npm run build
Build output:           dist
```

### 4️⃣ Deploy! (2 minutos)

- Clique: **Save and Deploy**
- Aguarde o build (~2 minutos)
- **URL gerada:** `https://openleads-strategy-hub.pages.dev`

### ✅ Pronto!

🎉 **Site no ar com:**
- Deploy automático em cada push
- Preview em cada Pull Request
- CDN global
- SSL automático
- DDoS protection

---

## 🚀 Método 2: Deploy via CLI (3 minutos)

### 1️⃣ Instalar Wrangler (1x apenas)

```bash
npm install -g wrangler
```

### 2️⃣ Login

```bash
wrangler login
```

### 3️⃣ Deploy

```bash
npm run deploy:cloudflare
```

### ✅ Pronto!

URL exibida no terminal.

---

## 🌐 Configurar Domínio (Opcional - 5 minutos)

### Após Deploy

1. No projeto CF → **Custom domains**
2. Clique: **Set up a custom domain**
3. Digite: `openleadsstrategy.com`
4. Siga instruções de DNS
5. SSL automático em ~10 minutos

---

## 📝 Comandos Úteis

```bash
# Desenvolvimento local
npm run dev              # http://localhost:8080

# Build e preview
npm run build            # Build de produção
npm run preview          # Preview local

# Deploy
npm run deploy:cloudflare   # Deploy produção
npm run deploy:preview      # Deploy preview
```

---

## 📚 Documentação Completa

Precisa de mais detalhes?

- 📖 [README.md](./README.md) - Visão geral do projeto
- ⚡ [DEPLOY-QUICK-START.md](./DEPLOY-QUICK-START.md) - Guia rápido detalhado
- 📘 [DEPLOY-CLOUDFLARE.md](./DEPLOY-CLOUDFLARE.md) - Documentação completa
- ✅ [SETUP-COMPLETO.md](./SETUP-COMPLETO.md) - Tudo que foi feito

---

## 🆘 Problemas?

### Build Falha

```bash
# Testar localmente primeiro
npm run build

# Ver erros detalhados
# Corrigir e tentar novamente
```

### 404 nas Rotas

- Arquivo `_redirects` já configurado ✅
- Rebuild se necessário: `npm run build:cloudflare`

### Dúvidas

Consulte: [DEPLOY-CLOUDFLARE.md](./DEPLOY-CLOUDFLARE.md)

---

## ✅ Status Atual

- [x] Projeto organizado
- [x] Build testado e funcionando
- [x] Configuração Cloudflare pronta
- [x] Scripts de deploy criados
- [x] Documentação completa
- [x] **Pronto para deploy!** 🚀

---

## 🎯 Próximo Passo

**Escolha um método acima e faça o deploy!**

**Tempo total:** 3-5 minutos  
**Custo:** R$ 0,00 (plano gratuito)

---

**🚀 Vamos colocar seu site no ar!**

