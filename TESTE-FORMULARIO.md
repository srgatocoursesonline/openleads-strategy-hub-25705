# 🧪 Teste do Formulário de Contato

## Checklist de Teste

### ✅ Passo 1: Build Realizado
```bash
npm run build
```
**Status**: ✅ Concluído

### ✅ Passo 2: Estrutura de Arquivos
- ✅ `functions/api/send-email.ts` - Worker de envio de email
- ✅ `src/components/sections/Contact.tsx` - Componente atualizado
- ✅ Validação Zod implementada
- ✅ Tratamento de erros configurado

### 📋 Passo 3: Testar Localmente (Opcional)

#### Teste Rápido (Apenas UI)
```bash
npm run dev
# Acesse: http://localhost:8080
# Preencha o formulário (não enviará email real)
```

#### Teste Completo (Com Email)
```bash
# 1. Instalar Wrangler (se ainda não tiver)
npm install -g wrangler

# 2. Build do projeto
npm run build

# 3. Executar com Workers
npm run dev:wrangler

# 4. Acesse: http://localhost:8788
# 5. Preencha e envie o formulário
# 6. Verifique: rodrigo.azevedo1988@gmail.com
```

### 🚀 Passo 4: Deploy em Produção

#### Opção A: Deploy via CLI
```bash
# 1. Login no Cloudflare (primeira vez)
wrangler login

# 2. Deploy
npm run deploy:cloudflare
```

#### Opção B: Deploy via Dashboard
1. Acesse: https://dash.cloudflare.com/
2. Pages > Create Project
3. Conecte o repositório Git
4. Configure:
   - Build command: `npm run build`
   - Build output: `dist`
5. Deploy!

### ✅ Passo 5: Testar em Produção

1. Acesse o site deployado
2. Vá até a seção "Contato"
3. Preencha o formulário:
   ```
   Nome: Teste OpenLeads
   Email: seu-email@teste.com
   Telefone: (11) 99999-9999
   Mensagem: Teste do formulário de contato
   ```
4. Clique em "Enviar Mensagem"
5. Aguarde a confirmação (toast verde)
6. Verifique o email em: `rodrigo.azevedo1988@gmail.com`
   - ⚠️ **Importante**: Verifique também a pasta de **SPAM**

### 🔍 Verificação do Email

O email deve conter:

**Assunto**:
```
[Contato Site] Nova mensagem de Teste OpenLeads
```

**Conteúdo**:
```
╔════════════════════════════════════╗
║  Nova Mensagem de Contato          ║
║  OpenLeads Strategy Hub            ║
╚════════════════════════════════════╝

NOME: Teste OpenLeads
EMAIL: seu-email@teste.com
TELEFONE: (11) 99999-9999

MENSAGEM:
Teste do formulário de contato

---
Enviado em: [data/hora - America/Sao_Paulo]
```

### 🐛 Troubleshooting

#### Problema: Email não chegou

**Soluções**:
1. ✅ Verificar pasta de SPAM
2. ✅ Verificar logs no Cloudflare:
   - Dashboard > Workers & Pages > openleads-strategy-hub > Logs
3. ✅ Testar novamente após 5 minutos
4. ✅ Verificar se o formulário mostrou mensagem de sucesso

#### Problema: Erro ao enviar

**Soluções**:
1. ✅ Abrir DevTools (F12) > Console
2. ✅ Copiar mensagem de erro
3. ✅ Verificar se o endpoint `/api/send-email` está respondendo:
   ```bash
   # Teste direto (depois do deploy)
   curl -X POST https://seu-dominio.com/api/send-email \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Teste",
       "email": "teste@teste.com",
       "phone": "11999999999",
       "message": "Teste direto"
     }'
   ```

#### Problema: CORS Error

**Solução**:
- O handler `onRequestOptions` em `functions/api/send-email.ts` já está configurado
- Se persistir, verifique se o deploy incluiu a pasta `functions/`

### 📊 Monitoramento

#### Logs do Cloudflare
1. Acesse: https://dash.cloudflare.com/
2. Workers & Pages > openleads-strategy-hub
3. Logs (aba lateral)
4. Ative "Live" para ver em tempo real

#### Métricas
- Total de requisições
- Tempo de resposta
- Taxa de erro
- Bandwidth usado

### 🎉 Sucesso!

Se o email chegou corretamente, o formulário está **100% funcional**!

### 📝 Próximos Passos (Opcional)

1. **Configurar SPF/DKIM** (evitar spam)
   - Ver: `SETUP-EMAIL.md` > "Melhorias Futuras"

2. **Adicionar Rate Limiting**
   - Proteger contra spam/abuse

3. **Integração com CRM**
   - Enviar dados para HubSpot, Pipedrive, etc.

4. **Notificações Adicionais**
   - Telegram Bot
   - Slack Webhook

### 📞 Precisa de Ajuda?

- 📖 Documentação completa: `SETUP-EMAIL.md`
- 🔧 Detalhes técnicos: `functions/README.md`
- 📧 Código da função: `functions/api/send-email.ts`
- 🎨 Componente: `src/components/sections/Contact.tsx`

---

**✨ Formulário implementado e pronto para uso!**

