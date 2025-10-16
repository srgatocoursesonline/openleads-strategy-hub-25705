# 📧 Guia de Setup - Formulário de Contato

## 🎯 Objetivo

Configurar o envio de emails do formulário de contato do seu site de forma **100% gratuita**, **sem autenticação OAuth** e **sem custo**.

## ⏱️ Tempo estimado: 5 minutos

---

## 📝 Passo a Passo

### 1️⃣ Criar conta no Web3Forms (Gratuito)

1. Acesse: https://web3forms.com/
2. Clique em **"Get Started Free"**
3. Faça login com:
   - Google
   - GitHub
   - Email

> **Nota:** O login é apenas para acessar o painel de controle. O serviço não requer autenticação OAuth para enviar emails.

### 2️⃣ Obter sua Access Key

1. No painel do Web3Forms, você verá a seção **"Access Keys"**
2. Clique em **"Create New Access Key"**
3. (Opcional) Dê um nome: "OpenLeads Strategy Hub"
4. Copie a key gerada (formato: `abcd1234-efgh-5678-ijkl-9012mnop3456`)

### 3️⃣ Configurar no Cloudflare Pages

#### Opção A: Via Dashboard (Recomendado)

1. Acesse o [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Vá em: **Workers & Pages** > Seu projeto
3. Clique na aba: **Settings**
4. Role até: **Environment Variables**
5. Clique em: **Add variable**
6. Preencha:
   ```
   Variable name: WEB3FORMS_ACCESS_KEY
   Value: [cole sua access key aqui]
   ```
7. Selecione os ambientes:
   - ✅ Production
   - ✅ Preview (opcional)
8. Clique em: **Save**

#### Opção B: Via Wrangler CLI

```bash
# 1. Instale o Wrangler (se ainda não tiver)
npm install -g wrangler

# 2. Faça login no Cloudflare
wrangler login

# 3. Adicione o segredo
wrangler pages secret put WEB3FORMS_ACCESS_KEY --project-name=seu-projeto

# 4. Cole sua access key quando solicitado
```

### 4️⃣ Fazer Deploy

```bash
# Se ainda não fez o primeiro deploy
npm run build
npm run deploy:cloudflare

# Ou simplesmente faça um git push (se tiver CI/CD configurado)
git push origin main
```

### 5️⃣ Testar!

1. Acesse seu site em produção
2. Preencha o formulário de contato
3. Clique em "Enviar Mensagem"
4. Verifique o email: `rodrigo.azevedo1988@gmail.com`

> **Dica:** Caso não apareça na caixa de entrada, verifique **spam/lixo eletrônico** na primeira vez.

---

## 🧪 Testar Localmente (Opcional)

Se quiser testar o envio de emails no ambiente local:

### 1. Criar arquivo de variáveis locais

Crie um arquivo `.dev.vars` na raiz do projeto:

```bash
# Windows (PowerShell)
New-Item .dev.vars -ItemType File

# Mac/Linux
touch .dev.vars
```

### 2. Adicionar a variável

Edite `.dev.vars` e adicione:

```env
WEB3FORMS_ACCESS_KEY=sua_access_key_aqui
```

> **⚠️ IMPORTANTE:** O arquivo `.dev.vars` já está no `.gitignore`. NUNCA faça commit dele!

### 3. Rodar com Wrangler

```bash
# 1. Build do projeto
npm run build

# 2. Executar com Wrangler (simula Cloudflare Workers)
npx wrangler pages dev dist --port 8788

# 3. Acesse: http://localhost:8788
```

---

## ✅ Checklist de Verificação

Antes de considerar concluído, verifique:

- [ ] Criou conta no Web3Forms
- [ ] Copiou a Access Key
- [ ] Adicionou variável `WEB3FORMS_ACCESS_KEY` no Cloudflare
- [ ] Fez deploy (ou redeploy) do projeto
- [ ] Testou o formulário em produção
- [ ] Recebeu o email de teste em `rodrigo.azevedo1988@gmail.com`
- [ ] Email não caiu no spam (ou moveu para caixa de entrada)

---

## 🔍 Como Verificar se Está Funcionando

### Verificar variável no Cloudflare

1. Cloudflare Dashboard > Workers & Pages > Seu projeto
2. Settings > Environment Variables
3. Deve aparecer: `WEB3FORMS_ACCESS_KEY` (valor oculto com `***`)

### Verificar logs em tempo real

1. Cloudflare Dashboard > Workers & Pages > Seu projeto
2. Clique na aba: **Logs**
3. Clique em: **Begin log stream**
4. Envie um teste pelo formulário
5. Você verá logs como:

```
📧 NOVO CONTATO RECEBIDO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 Nome: João Silva
📧 Email: joao@example.com
📱 Telefone: (11) 98765-4321
💬 Mensagem: Teste de contato
⏰ Data/Hora: 07/10/2025 14:30:45
🎯 Destino: rodrigo.azevedo1988@gmail.com
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Enviado via Web3Forms
✅ CONTATO PROCESSADO COM SUCESSO (via Web3Forms)
```

---

## 🛟 Troubleshooting

### ❌ Erro: "Erro ao enviar email"

**Possíveis causas:**
1. Variável `WEB3FORMS_ACCESS_KEY` não configurada
2. Access Key inválida ou expirada
3. Não fez redeploy após adicionar a variável

**Solução:**
1. Verifique se a variável existe no Cloudflare Dashboard
2. Teste a key fazendo um curl manual (ver abaixo)
3. Faça um novo deploy: `git commit --allow-empty -m "trigger rebuild" && git push`

### 🧪 Testar Web3Forms diretamente

```bash
curl -X POST https://api.web3forms.com/submit \
  -H "Content-Type: application/json" \
  -d '{
    "access_key": "sua_key_aqui",
    "email": "rodrigo.azevedo1988@gmail.com",
    "name": "Teste",
    "message": "Teste direto via curl"
  }'
```

Se retornar `{"success": true}`, a key está válida.

### 📧 Email não chega

1. **Verifique spam/lixo eletrônico** (muito comum na primeira vez)
2. Veja os logs no Cloudflare Dashboard
3. Confirme que o email no código está correto: `rodrigo.azevedo1988@gmail.com`
4. Teste com outro email (Gmail, Outlook, etc.)

### ⚠️ Fallback para FormSubmit

Se o Web3Forms não estiver configurado, o sistema usa **FormSubmit** como fallback.

**Primeira vez usando FormSubmit?**
1. Envie um teste
2. Abra o email: `rodrigo.azevedo1988@gmail.com`
3. Você receberá um email do FormSubmit pedindo confirmação
4. Clique no link de ativação
5. Pronto! Próximos emails funcionarão automaticamente

---

## 📊 Limites do Plano Gratuito

### Web3Forms Free Tier
- ✅ 250 submissões/mês
- ✅ Sem limite de campos
- ✅ Webhooks incluídos
- ✅ Proteção anti-spam
- ✅ Templates customizáveis
- ✅ Notificações por email

### FormSubmit (Fallback)
- ✅ Ilimitado
- ⚠️ Requer confirmação inicial
- ⚠️ Menos confiável

**Para este projeto:** 250 emails/mês é mais que suficiente para um site institucional.

---

## 🔄 Alternativas Futuras

Se o projeto crescer e você precisar de mais recursos:

### SendGrid
- 100 emails/dia (grátis)
- Boa reputação de entrega
- Requer configuração de DNS

### Resend
- 3.000 emails/mês (grátis)
- API moderna
- Ótima entrega

### Amazon SES
- Pay-as-you-go
- ~$0.10 por 1.000 emails
- Requer verificação de domínio

---

## 📞 Suporte

### Web3Forms
- **Docs:** https://docs.web3forms.com/
- **Dashboard:** https://web3forms.com/dashboard
- **Status:** https://status.web3forms.com/

### FormSubmit
- **Docs:** https://formsubmit.co/
- **FAQ:** https://formsubmit.co/help

### Cloudflare Workers
- **Docs:** https://developers.cloudflare.com/workers/
- **Community:** https://discord.gg/cloudflaredev

---

## ✨ Conclusão

Pronto! Agora você tem um formulário de contato funcionando:

- ✅ **100% gratuito**
- ✅ **Sem autenticação OAuth**
- ✅ **Fallback automático**
- ✅ **Logs detalhados**
- ✅ **Proteção anti-spam**

Se tiver dúvidas, consulte a [documentação completa](./functions/README.md).

**Happy coding! 🚀**
