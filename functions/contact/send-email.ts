/**
 * Cloudflare Worker - Envia emails de contato via Web3Forms (gratuito)
 * Fallback para FormSubmit se Web3Forms falhar
 * 
 * Setup:
 * 1. Acesse https://web3forms.com/ e crie uma conta gratuita
 * 2. Copie sua Access Key
 * 3. No Cloudflare Pages: Settings > Environment Variables
 *    - Adicione: WEB3FORMS_ACCESS_KEY = sua_key_aqui
 * 
 * Alternativa local (.env):
 * WEB3FORMS_ACCESS_KEY=sua_key_aqui
 */

interface EmailRequest {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface Env {
  WEB3FORMS_ACCESS_KEY?: string;
}

export async function onRequestPost(context: { request: Request; env: Env }) {
  try {
    const body = await context.request.json() as EmailRequest;
    
    // Validação
    if (!body.name || !body.email || !body.phone || !body.message) {
      return new Response(
        JSON.stringify({ error: "Todos os campos são obrigatórios" }),
        { 
          status: 400, 
          headers: { 
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          } 
        }
      );
    }

    const timestamp = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });

    // LOGS DETALHADOS (visíveis no Cloudflare Dashboard > Logs)
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("📧 NOVO CONTATO RECEBIDO");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("👤 Nome:", body.name);
    console.log("📧 Email:", body.email);
    console.log("📱 Telefone:", body.phone);
    console.log("💬 Mensagem:", body.message);
    console.log("⏰ Data/Hora:", timestamp);
    console.log("🎯 Destino: rodrigo.azevedo1988@gmail.com");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

    let emailSent = false;
    let emailService = "";

    // MÉTODO 1: Web3Forms (recomendado - mais confiável)
    const web3formsKey = context.env.WEB3FORMS_ACCESS_KEY;
    
    if (web3formsKey) {
      try {
        const web3formsData = {
          access_key: web3formsKey,
          subject: `[Contato Site] ${body.name}`,
          from_name: "OpenLeads Strategy Hub",
          email: "rodrigo.azevedo1988@gmail.com", // Seu email que receberá
          name: body.name,
          replyto: body.email, // Email do cliente para você responder
          phone: body.phone,
          message: body.message,
          // Campos adicionais para melhor organização
          botcheck: "", // Anti-spam
        };

        const web3Response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(web3formsData),
        });

        const web3Result = await web3Response.json();

        if (web3Response.ok && web3Result.success) {
          console.log("✅ Enviado via Web3Forms");
          emailSent = true;
          emailService = "Web3Forms";
        } else {
          console.warn("⚠️ Web3Forms falhou:", web3Result.message);
        }
      } catch (e) {
        console.warn("⚠️ Web3Forms error:", e);
      }
    } else {
      console.log("⚠️ WEB3FORMS_ACCESS_KEY não configurada, tentando fallback...");
    }

    // MÉTODO 2: FormSubmit (fallback)
    if (!emailSent) {
      try {
        const formData = new URLSearchParams();
        formData.append("_email", "rodrigo.azevedo1988@gmail.com");
        formData.append("_subject", `[Contato Site] ${body.name}`);
        formData.append("name", body.name);
        formData.append("email", body.email);
        formData.append("phone", body.phone);
        formData.append("message", body.message);
        formData.append("_template", "box");
        formData.append("_captcha", "false");

        const formSubmitResponse = await fetch("https://formsubmit.co/ajax/rodrigo.azevedo1988@gmail.com", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: formData.toString(),
        });

        if (formSubmitResponse.ok) {
          console.log("✅ Enviado via FormSubmit (fallback)");
          emailSent = true;
          emailService = "FormSubmit";
        } else {
          console.warn("⚠️ FormSubmit também falhou");
        }
      } catch (e) {
        console.warn("⚠️ FormSubmit error:", e);
      }
    }

    if (!emailSent) {
      console.error("❌ TODOS OS MÉTODOS DE ENVIO FALHARAM");
      return new Response(
        JSON.stringify({ 
          success: false,
          error: "Erro ao enviar email. Tente novamente mais tarde."
        }),
        { 
          status: 500, 
          headers: { 
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          } 
        }
      );
    }

    console.log(`✅ CONTATO PROCESSADO COM SUCESSO (via ${emailService})`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Mensagem enviada! Entraremos em contato em breve.",
        data: {
          timestamp,
          name: body.name,
          service: emailService
        }
      }),
      { 
        status: 200, 
        headers: { 
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        } 
      }
    );

  } catch (error) {
    console.error("❌ ERRO AO PROCESSAR CONTATO:", error);
    
    return new Response(
      JSON.stringify({ 
        success: false,
        error: "Erro ao processar mensagem"
      }),
      { 
        status: 500, 
        headers: { 
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        } 
      }
    );
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Max-Age": "86400",
    },
  });
}