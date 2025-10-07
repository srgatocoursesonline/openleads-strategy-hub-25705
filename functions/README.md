# Cloudflare Workers Functions

## 📧 Envio de Emails

Este projeto usa **Cloudflare Workers Functions** com **MailChannels** para envio de emails de forma gratuita e segura.

### Como Funciona

1. O formulário de contato envia os dados para `/api/send-email`
2. A função Worker processa a requisição
3. O email é enviado via MailChannels para `rodrigo.azevedo1988@gmail.com`

### Estrutura

```
functions/
  └── api/
      └── send-email.ts    # Função de envio de email
```

### Desenvolvimento Local

Durante o desenvolvimento com Vite (`npm run dev`), as requisições para `/api/*` precisam ser configuradas no `vite.config.ts`.

### Deploy

Ao fazer deploy no Cloudflare Pages:

```bash
npm run deploy:cloudflare
```

A função será automaticamente disponibilizada em:
- Produção: `https://seu-dominio.com/api/send-email`
- Preview: `https://preview.seu-dominio.com/api/send-email`

### Configuração do MailChannels

O MailChannels é um serviço gratuito para Cloudflare Workers que não requer configuração adicional. 

**Importante:** Para produção, é recomendado configurar:
1. SPF record no DNS
2. DKIM via Cloudflare
3. Domain verification

### Testando

Para testar localmente:

```bash
# Instalar Wrangler (se ainda não tiver)
npm install -g wrangler

# Executar em modo dev (local)
wrangler pages dev dist --port 8788
```

### Variáveis de Ambiente (Opcional)

Se precisar adicionar segredos (API keys, etc):

```bash
# Via CLI
wrangler pages secret put NOME_SECRETO

# Via Dashboard
Cloudflare Dashboard > Pages > Projeto > Settings > Environment Variables
```

### Logs e Debugging

- **Local:** logs aparecem no console do Wrangler
- **Produção:** Cloudflare Dashboard > Workers & Pages > Seu projeto > Logs

### Limitações

- **MailChannels Free Tier:**
  - 50.000 emails/mês
  - Rate limit: ~10 req/s
  - Sem garantias de SLA

### Alternativas

Se precisar de mais recursos:
- **SendGrid** (100 emails/dia grátis)
- **Resend** (3.000 emails/mês grátis)
- **Amazon SES** (pay-as-you-go)

Para integrar, basta atualizar o código em `functions/api/send-email.ts` e adicionar as API keys nas variáveis de ambiente.

### Troubleshooting

**Erro: "MailChannels API error"**
- Verificar se o domínio está corretamente configurado
- Checar rate limits
- Ver logs no Cloudflare Dashboard

**Erro: "CORS"**
- O handler `onRequestOptions` já está configurado
- Verificar se a origem está permitida

**Email não chega**
- Checar pasta de spam
- Verificar configuração SPF/DKIM
- Ver logs da função no Cloudflare

