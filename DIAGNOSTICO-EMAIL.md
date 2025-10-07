# 🔍 Diagnóstico: Email Não Chegou

## ✅ Checklist de Diagnóstico

Siga os passos abaixo **na ordem** para identificar o problema:

---

## 1️⃣ Verificar Pasta de SPAM 📧

**MUITO IMPORTANTE:** Na primeira vez, emails costumam cair no spam!

```
1. Abra Gmail: rodrigo.azevedo1988@gmail.com
2. Vá na pasta "Spam" ou "Lixo Eletrônico"
3. Procure por:
   - Assunto: "[Contato Site] Seu Nome"
   - Remetente: Web3Forms ou FormSubmit
   - Nas últimas 24h
```

**Se encontrou no spam:**
- ✅ Marque como "Não é spam"
- ✅ Próximos emails chegarão na caixa de entrada

---

## 2️⃣ Verificar Mensagem de Sucesso no Site 💬

Quando você clicou em "Enviar Mensagem", apareceu:

- ✅ **"✅ Mensagem enviada!"** → Formulário enviou com sucesso
- ❌ **"❌ Erro ao enviar"** → Houve um problema

**Se apareceu mensagem de sucesso:**
→ O formulário funcionou, o email foi enviado
→ Problema pode ser: spam, delay, ou FormSubmit não ativado

**Se apareceu erro:**
→ Precisa verificar logs (próximo passo)

---

## 3️⃣ Verificar Console do Navegador 🖥️

```
1. Abra o site onde está o formulário
2. Pressione F12 (ou Ctrl+Shift+I / Cmd+Option+I no Mac)
3. Vá na aba "Console"
4. Preencha e envie o formulário
5. Veja se aparece algum erro em vermelho
```

**Possíveis erros:**

- **"Failed to fetch"** → Problema de rede ou CORS
- **"404 Not Found"** → Função Cloudflare não está deployada
- **"500 Internal Server Error"** → Erro no Worker

**Cole aqui qualquer erro que aparecer!**

---

## 4️⃣ Verificar se Deploy Foi Feito ✅

```bash
# Verifique se você fez commit e push das mudanças
git status

# Se houver mudanças não commitadas:
git add .
git commit -m "fix: atualiza envio de email"
git push origin main

# Aguarde 2-3 minutos para o Cloudflare fazer deploy
```

**Verificar no Cloudflare Dashboard:**
```
1. Acesse: https://dash.cloudflare.com/
2. Vá em: Workers & Pages
3. Clique no seu projeto
4. Veja a aba "Deployments"
5. O último deploy deve estar como "Success" (verde)
```

---

## 5️⃣ Verificar Variável de Ambiente (Web3Forms) 🔑

```
Cloudflare Dashboard > Workers & Pages > Seu Projeto
> Settings > Environment Variables

Deve aparecer:
✅ WEB3FORMS_ACCESS_KEY = ****** (Production)
```

**Se NÃO aparecer:**
→ O sistema está usando FormSubmit (fallback)
→ Precisa ativar o FormSubmit (ver passo 7)

**Se aparecer mas não funciona:**
→ A key pode estar inválida
→ Teste no passo 6

---

## 6️⃣ Testar Web3Forms Manualmente 🧪

```bash
# Windows (PowerShell)
Invoke-RestMethod -Method Post -Uri "https://api.web3forms.com/submit" `
  -ContentType "application/json" `
  -Body '{"access_key":"SUA_KEY_AQUI","email":"rodrigo.azevedo1988@gmail.com","name":"Teste Manual","message":"Teste direto via PowerShell"}'

# Mac/Linux
curl -X POST https://api.web3forms.com/submit \
  -H "Content-Type: application/json" \
  -d '{
    "access_key": "SUA_KEY_AQUI",
    "email": "rodrigo.azevedo1988@gmail.com",
    "name": "Teste Manual",
    "message": "Teste direto via terminal"
  }'
```

**Resultado esperado:**
```json
{"success": true, "message": "Email sent successfully"}
```

**Se deu erro:**
→ A Access Key está inválida ou expirada
→ Crie uma nova em: https://web3forms.com/dashboard

---

## 7️⃣ Ativar FormSubmit (se Web3Forms não configurado) 📮

Se você **NÃO** configurou o Web3Forms, o sistema usa FormSubmit.

**Na PRIMEIRA vez**, FormSubmit precisa ser ativado:

```
1. Envie um teste pelo formulário do site
2. Abra: rodrigo.azevedo1988@gmail.com
3. Procure email do FormSubmit (inclusive spam)
   Assunto: "FormSubmit - Confirm your email address"
4. Abra o email
5. Clique no botão/link de confirmação
6. Pronto! Envie outro teste
```

**Depois de ativar, funciona automaticamente!**

---

## 8️⃣ Ver Logs no Cloudflare (Avançado) 📊

```
1. Cloudflare Dashboard > Workers & Pages > Seu Projeto
2. Clique na aba: "Logs"
3. Clique em: "Begin log stream"
4. Envie um teste pelo formulário
5. Veja os logs em tempo real
```

**Logs que devem aparecer:**
```
📧 NOVO CONTATO RECEBIDO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 Nome: Seu Nome
📧 Email: seu@email.com
...
✅ Enviado via Web3Forms (ou FormSubmit)
✅ CONTATO PROCESSADO COM SUCESSO
```

**Se não aparecer nada:**
→ A função não está sendo chamada
→ Problema de roteamento ou build

**Se aparecer erro:**
→ Cole o erro aqui para eu te ajudar!

---

## 9️⃣ Testar Localmente (Desenvolvimento) 🏠

```bash
# 1. Crie arquivo .dev.vars na raiz
# (Apenas se tiver Web3Forms Access Key)
echo "WEB3FORMS_ACCESS_KEY=sua_key_aqui" > .dev.vars

# 2. Build do projeto
npm run build

# 3. Execute com Wrangler
npx wrangler pages dev dist --port 8788

# 4. Acesse: http://localhost:8788
# 5. Teste o formulário
# 6. Veja logs no terminal
```

---

## 🔟 Solução Rápida: Forçar Uso do FormSubmit ⚡

Se você só quer que funcione AGORA, sem configurar Web3Forms:

**O FormSubmit já está configurado como fallback!**

Apenas certifique-se de:

1. ✅ Fazer deploy das mudanças (`git push`)
2. ✅ Enviar um teste
3. ✅ Ativar o FormSubmit clicando no link de confirmação
4. ✅ Enviar outro teste

---

## ❓ Perguntas para Diagnóstico

Me responda essas perguntas para eu te ajudar melhor:

1. **Apareceu mensagem de sucesso no site?**
   - [ ] Sim, "✅ Mensagem enviada!"
   - [ ] Não, deu erro
   - [ ] Não sei / Não testei ainda

2. **Você configurou a variável WEB3FORMS_ACCESS_KEY no Cloudflare?**
   - [ ] Sim, está configurada
   - [ ] Não, não configurei
   - [ ] Não sei verificar

3. **Você fez deploy depois de aceitar as mudanças?**
   - [ ] Sim, fiz git push
   - [ ] Não, só aceitei as mudanças no Cursor
   - [ ] Não sei como fazer deploy

4. **Verificou a pasta de SPAM?**
   - [ ] Sim, não tem nada
   - [ ] Não, ainda não verifiquei
   - [ ] Sim, encontrei! (sucesso!)

5. **Qual mensagem apareceu ao enviar o formulário?**
   - Escreva aqui: _______________________

---

## 🚨 Problemas Comuns e Soluções

### ❌ "Failed to fetch" no console

**Causa:** Função não está acessível

**Solução:**
```bash
# 1. Verificar se fez deploy
git push origin main

# 2. Aguardar 2-3 minutos

# 3. Limpar cache do navegador
Ctrl+Shift+Del > Limpar cache
```

### ❌ "404 Not Found"

**Causa:** Função não foi deployada ou rota errada

**Solução:**
```bash
# Verificar estrutura de pastas
functions/api/send-email.ts deve existir

# Fazer rebuild e deploy
npm run build
git add .
git commit -m "rebuild"
git push
```

### ❌ Email cai sempre no spam

**Solução:**
1. Marque como "Não é spam" 1 vez
2. Configure SPF/DKIM no domínio (avançado)
3. Use domínio próprio (não Gmail)

### ❌ FormSubmit não funciona

**Causa:** Precisa ativar na primeira vez

**Solução:**
1. Envie teste
2. Abra email de confirmação (inclusive spam)
3. Clique no link
4. Teste novamente

---

## 🎯 Teste Rápido: Está Funcionando?

```bash
# Execute este comando (PowerShell no Windows):
Invoke-WebRequest -Method Post `
  -Uri "https://SEU_SITE.pages.dev/api/send-email" `
  -ContentType "application/json" `
  -Body '{"name":"Teste","email":"teste@test.com","phone":"11999999999","message":"Teste"}'

# Deve retornar: "success": true
```

Substitua `SEU_SITE.pages.dev` pela URL real do seu site!

---

## 💬 Me diga:

**Qual passo acima deu problema?**  
**Qual mensagem de erro você viu?**  
**Você já verificou o SPAM?**

Com essas informações, consigo te ajudar melhor! 🚀
