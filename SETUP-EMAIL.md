# 📧 Setup do Sistema de Email

## Visão Geral

O formulário de contato do site está configurado para enviar emails automaticamente via **Cloudflare Workers** + **MailChannels**.

## ✅ O que foi Implementado

### 1. Função Cloudflare Worker
- **Arquivo**: `functions/api/send-email.ts`
- **Endpoint**: `/api/send-email`
- **Método**: POST
- **Serviço**: MailChannels (gratuito para Cloudflare Workers)

### 2. Integração Frontend
- **Componente**: `src/components/sections/Contact.tsx`
- **Validação**: Zod schema
- **Feedback**: Toast notifications
- **Estados**: Loading, sucesso e erro

### 3. Email de Destino
```
rodrigo.azevedo1988@gmail.com
```

## 🚀 Como Usar

### Em Desenvolvimento Local

#### Opção 1: Desenvolvimento sem email (apenas UI)
```bash
npm run dev
# Acesse: http://localhost:8080
# Nota: O formulário não enviará emails, apenas validará
```

#### Opção 2: Desenvolvimento com email funcional
```bash
# 1. Build do projeto
npm run build

# 2. Executar com Wrangler (simula Cloudflare)
npm run dev:wrangler

# 3. Acesse: http://localhost:8788
```

### Em Produção (Cloudflare Pages)

Após fazer deploy, o formulário funciona automaticamente:

```bash
# Deploy
npm run deploy:cloudflare
```

O endpoint `/api/send-email` será criado automaticamente pelo Cloudflare Pages.

## 📧 Formato do Email

Os emails chegam com:

- **Assunto**: `[Contato Site] Nova mensagem de {NOME}`
- **De**: `noreply@openleadsstrategy.com`
- **Reply-To**: Email do usuário que preencheu o formulário
- **Para**: `rodrigo.azevedo1988@gmail.com`

### Conteúdo do Email (HTML)

```
╔════════════════════════════════════╗
║  Nova Mensagem de Contato          ║
║  OpenLeads Strategy Hub            ║
╚════════════════════════════════════╝

NOME: [nome do usuário]
EMAIL: [email do usuário]
TELEFONE: [telefone do usuário]

MENSAGEM:
[mensagem do usuário]

---
Enviado em: [data/hora - America/Sao_Paulo]
```

## 🔧 Configuração Avançada

### Alterar Email de Destino

Edite o arquivo `functions/api/send-email.ts`:

```typescript
personalizations: [
  {
    to: [{ 
      email: "novo-email@exemplo.com",  // <-- ALTERAR AQUI
      name: "Nome Destinatário" 
    }],
    ...
  }
]
```

### Adicionar Múltiplos Destinatários

```typescript
to: [
  { email: "email1@exemplo.com", name: "Pessoa 1" },
  { email: "email2@exemplo.com", name: "Pessoa 2" },
]
```

### Configurar Cópia (CC/BCC)

```typescript
personalizations: [
  {
    to: [...],
    cc: [{ email: "copia@exemplo.com" }],
    bcc: [{ email: "copia-oculta@exemplo.com" }],
  }
]
```

## 🔒 Segurança

### CORS
- Configurado para aceitar requisições de qualquer origem (`*`)
- Em produção, recomenda-se restringir ao domínio específico

### Rate Limiting
- MailChannels tem limite de ~10 requisições/segundo
- Para proteção adicional, adicione rate limiting no Worker

### Validação
- Todos os campos são validados no frontend (Zod)
- Validação adicional no backend (Worker)

## 📊 Limites do MailChannels (Free)

- ✅ 50.000 emails/mês
- ✅ ~10 requisições/segundo
- ❌ Sem garantia de SLA
- ❌ Emails podem ir para spam sem SPF/DKIM

## 🔍 Troubleshooting

### Email não chega

1. **Verifique spam/lixeira**
   - MailChannels pode ser marcado como spam inicialmente

2. **Veja os logs no Cloudflare**
   ```
   Dashboard > Workers & Pages > Seu Projeto > Logs
   ```

3. **Teste localmente**
   ```bash
   npm run dev:wrangler
   ```

### Erro: "MailChannels API error"

- Verifique se há rate limiting
- Confirme que o payload está correto
- Veja logs detalhados no console

### Erro: CORS

- Certifique-se de que `onRequestOptions` está presente
- Verifique headers de resposta

## 📈 Melhorias Futuras

### Para Produção Profissional

1. **Configurar SPF/DKIM**
   - Evita emails irem para spam
   - Aumenta reputação do domínio

2. **Adicionar Rate Limiting**
   ```typescript
   // Exemplo com KV Storage
   const key = `rate_limit:${clientIP}`;
   const count = await env.KV.get(key);
   if (count > 5) throw new Error('Rate limit');
   ```

3. **Notificações Alternativas**
   - Telegram Bot
   - Slack Webhook
   - Discord Webhook

4. **Analytics**
   - Log de todos os envios
   - Dashboard de contatos

## 🔄 Alternativas ao MailChannels

Se precisar mudar de serviço:

### SendGrid
```typescript
await fetch('https://api.sendgrid.com/v3/mail/send', {
  headers: {
    'Authorization': `Bearer ${env.SENDGRID_API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({...})
});
```

### Resend
```typescript
await fetch('https://api.resend.com/emails', {
  headers: {
    'Authorization': `Bearer ${env.RESEND_API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({...})
});
```

## 📝 Checklist de Deploy

Antes de fazer deploy em produção:

- [ ] Build funcionando: `npm run build`
- [ ] Teste local com Wrangler: `npm run dev:wrangler`
- [ ] Email de destino correto em `functions/api/send-email.ts`
- [ ] CORS configurado apropriadamente
- [ ] Teste de envio de email funcional
- [ ] Verificar pasta de spam
- [ ] Logs do Cloudflare funcionando

## 📞 Suporte

Para dúvidas ou problemas:
- Ver logs: Cloudflare Dashboard > Workers & Pages
- Documentação: `functions/README.md`
- MailChannels Docs: https://mailchannels.zendesk.com/

---

**✅ Setup completo! O formulário está pronto para uso.**

