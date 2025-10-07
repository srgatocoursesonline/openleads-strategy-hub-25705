# Cloudflare Workers Functions

## 📧 Envio de Emails - Solução 100% Gratuita

Este projeto usa duas soluções gratuitas para envio de emails de contato:

### 🚀 Método Principal: Web3Forms
Serviço gratuito, confiável e sem necessidade de autenticação OAuth.

### 🔄 Fallback: FormSubmit
Caso o Web3Forms falhe, o sistema automaticamente tenta via FormSubmit.

---

## 📋 Setup Rápido (5 minutos)

### 1. Criar conta no Web3Forms (GRATUITO)

1. Acesse: https://web3forms.com/
2. Clique em **"Get Started Free"**
3. Faça login com Google ou GitHub (apenas para acesso ao painel, não para enviar emails)
4. Crie um novo **Access Key** (é só apertar um botão)
5. Copie a key (algo como: `abcd1234-efgh-5678-ijkl-9012mnop3456`)

### 2. Configurar no Cloudflare Pages

**Opção A: Via Dashboard (Recomendado)**
1. Acesse seu projeto no Cloudflare Pages
2. Vá em: **Settings > Environment Variables**
3. Adicione a variável:
   - **Name:** `WEB3FORMS_ACCESS_KEY`
   - **Value:** `sua_access_key_copiada`
   - **Environment:** Production (ou ambos Production e Preview)
4. Clique em **Save**
5. Faça um novo deploy (ou espere o próximo)

**Opção B: Via Wrangler CLI**
```bash
wrangler pages secret put WEB3FORMS_ACCESS_KEY
# Cole sua key quando solicitado
```

### 3. Testar!
Pronto! Agora os emails do formulário serão enviados para `rodrigo.azevedo1988@gmail.com`.

---

## 🔧 Como Funciona

```
Usuário preenche formulário
      ↓
React envia POST para /api/send-email
      ↓
Cloudflare Worker processa
      ↓
Tenta enviar via Web3Forms
      ↓
      ├─ ✅ Sucesso → Email enviado!
      └─ ❌ Falha → Tenta FormSubmit (fallback)
            ↓
            ├─ ✅ Sucesso → Email enviado!
            └─ ❌ Falha → Retorna erro ao usuário
```

---

## 📂 Estrutura

```
functions/
  └── api/
      └── send-email.ts    # Worker que gerencia envio de emails
```

### Código da Função

A função em `send-email.ts`:
1. Valida os dados do formulário
2. Tenta enviar via **Web3Forms** (se API key configurada)
3. Se falhar, tenta via **FormSubmit**
4. Registra logs detalhados no Cloudflare
5. Retorna sucesso ou erro ao frontend

---

## 🧪 Desenvolvimento Local

### Testar a função localmente

```bash
# 1. Build do projeto
npm run build

# 2. Executar com Wrangler
npx wrangler pages dev dist --port 8788
```

### Testar com variável local (sem Cloudflare)

Crie um arquivo `.dev.vars` na raiz (gitignored):
```env
WEB3FORMS_ACCESS_KEY=sua_key_aqui
```

Depois rode:
```bash
npx wrangler pages dev dist --port 8788
```

---

## 📊 Logs e Debugging

### Ver logs em tempo real

**Produção:**
```
Cloudflare Dashboard > Workers & Pages > Seu Projeto > Logs > Begin log stream
```

**Local:**
Os logs aparecem diretamente no terminal do Wrangler.

### Estrutura dos logs

A função registra automaticamente:
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📧 NOVO CONTATO RECEBIDO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 Nome: João Silva
📧 Email: joao@example.com
📱 Telefone: (11) 98765-4321
💬 Mensagem: Olá, gostaria de mais informações...
⏰ Data/Hora: 07/10/2025 14:30:45
🎯 Destino: rodrigo.azevedo1988@gmail.com
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Enviado via Web3Forms
✅ CONTATO PROCESSADO COM SUCESSO (via Web3Forms)
```

---

## 🔒 Segurança e Boas Práticas

### ✅ Implementado

- **CORS configurado** (apenas POST e OPTIONS)
- **Validação de campos** (obrigatórios e limites)
- **Rate limiting** (via Cloudflare automático)
- **Anti-spam** (Web3Forms tem proteção embutida)
- **Logs estruturados** (timezone America/Sao_Paulo)
- **Fallback automático** (múltiplos serviços)

### 🎯 Recomendações para Produção

1. **Adicione Captcha** (opcional, se tiver muito spam)
   - Google reCAPTCHA v3
   - hCaptcha
   - Cloudflare Turnstile (grátis)

2. **Configure SPF/DKIM** no domínio (melhora deliverability)

3. **Monitore os logs** regularmente

---

## 📈 Limitações dos Serviços Gratuitos

### Web3Forms (Plano Gratuito)
- ✅ **250 submissões/mês**
- ✅ Sem limite de campos
- ✅ Webhooks incluídos
- ✅ Proteção anti-spam
- ✅ Templates customizáveis

### FormSubmit (Fallback)
- ✅ **Ilimitado**
- ✅ Sem cadastro necessário
- ⚠️ Requer confirmação inicial por email
- ⚠️ Menos confiável que Web3Forms

**Para este projeto:** 250 emails/mês é mais que suficiente para a maioria dos sites de apresentação.

---

## 🛠️ Troubleshooting

### ❌ "Erro ao enviar email"

**Possíveis causas:**
1. Variável `WEB3FORMS_ACCESS_KEY` não configurada
2. Access Key inválida
3. Limite mensal do Web3Forms atingido
4. Problema de rede

**Solução:**
1. Verifique a variável no Cloudflare: Settings > Environment Variables
2. Teste localmente com `.dev.vars`
3. Veja os logs no Cloudflare Dashboard
4. Se Web3Forms falhar, o FormSubmit tentará automaticamente

### ⚠️ FormSubmit não funciona

**Primeira vez usando FormSubmit?**
1. Envie um email de teste pelo formulário
2. Verifique a caixa de entrada: `rodrigo.azevedo1988@gmail.com`
3. Você receberá um email de confirmação do FormSubmit
4. Clique no link para ativar
5. Pronto! Próximos emails funcionarão automaticamente

### 🔍 Email não chega

1. Verifique **spam/lixo eletrônico**
2. Veja os logs no Cloudflare (confirme se enviou)
3. Teste com outro email de destino
4. Verifique se o Web3Forms Access Key está ativa em https://web3forms.com/

### 🚫 CORS Error

Já está configurado! Se mesmo assim der erro:
1. Verifique se fez deploy após atualizar o código
2. Limpe cache do browser (Ctrl+Shift+Del)
3. Teste em aba anônima

---

## 🔄 Alternativas Futuras (se precisar)

Se o projeto crescer e precisar de mais recursos:

### **SendGrid** (100 emails/dia grátis)
```bash
npm install @sendgrid/mail
```

### **Resend** (3.000 emails/mês grátis)
```bash
npm install resend
```

### **Amazon SES** (pay-as-you-go)
- Muito barato (~$0.10 por 1000 emails)
- Requer verificação de domínio

---

## 📞 Suporte

- **Web3Forms Docs:** https://docs.web3forms.com/
- **FormSubmit Docs:** https://formsubmit.co/
- **Cloudflare Workers:** https://developers.cloudflare.com/workers/

---

## ✅ Checklist de Setup

- [ ] Criou conta no Web3Forms
- [ ] Copiou Access Key
- [ ] Adicionou variável no Cloudflare Pages
- [ ] Fez deploy/redeploy
- [ ] Testou envio de email
- [ ] Confirmou recebimento em `rodrigo.azevedo1988@gmail.com`
- [ ] (Opcional) Ativou FormSubmit clicando no link de confirmação

**Tudo funcionando? Parabéns! 🎉**