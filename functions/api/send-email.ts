/**
 * Cloudflare Worker Function para envio de emails
 * Endpoint: /api/send-email
 * 
 * Usa FormSubmit.co - serviço gratuito que funciona sem configuração
 */

interface EmailRequest {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface Env {
  // Variáveis de ambiente podem ser adicionadas aqui
}

export async function onRequestPost(context: { request: Request; env: Env }) {
  try {
    // Parse do corpo da requisição
    const body = await context.request.json() as EmailRequest;
    
    // Validação básica
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

    // Formatar mensagem para email
    const emailBody = `
📧 NOVA MENSAGEM DE CONTATO - OpenLeads Strategy Hub

👤 DADOS DO CONTATO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Nome:     ${body.name}
Email:    ${body.email}
Telefone: ${body.phone}

💬 MENSAGEM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${body.message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📅 Enviado em: ${new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}
🌐 Site: OpenLeads Strategy Hub
    `.trim();

    console.log("📧 Enviando email para: rodrigo.azevedo1988@gmail.com");
    console.log("👤 De:", body.name, `<${body.email}>`);

    // Preparar dados para FormSubmit
    const formData = new URLSearchParams();
    formData.append("_subject", `[Contato Site] Nova mensagem de ${body.name}`);
    formData.append("name", body.name);
    formData.append("email", body.email);
    formData.append("phone", body.phone);
    formData.append("message", emailBody);
    formData.append("_template", "table");
    formData.append("_captcha", "false");
    formData.append("_autoresponse", "Obrigado pelo contato! Responderemos em breve.");

    // Enviar via FormSubmit
    const response = await fetch(
      "https://formsubmit.co/ajax/rodrigo.azevedo1988@gmail.com",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Accept": "application/json",
        },
        body: formData.toString(),
      }
    );

    const result = await response.json() as any;

    if (!response.ok || result.success === false) {
      console.error("❌ FormSubmit error:", result);
      throw new Error(result.message || "Erro ao enviar email");
    }

    console.log("✅ Email enviado com sucesso!");

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Email enviado com sucesso!" 
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
    console.error("❌ Error processing request:", error);
    
    return new Response(
      JSON.stringify({ 
        error: "Erro ao enviar mensagem. Tente novamente.",
        details: error instanceof Error ? error.message : "Erro desconhecido"
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

// Handler para OPTIONS (CORS preflight)
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
