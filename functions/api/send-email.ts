/**
 * Cloudflare Worker - Envio de Email via MailChannels
 * Envia para: rodrigo.azevedo1988@gmail.com
 */

interface EmailRequest {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export async function onRequestPost(context: { request: Request }) {
  try {
    const body = await context.request.json() as EmailRequest;
    
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

    const timestamp = new Date().toLocaleString('pt-BR', { 
      timeZone: 'America/Sao_Paulo'
    });

    console.log("📧 Enviando email para: rodrigo.azevedo1988@gmail.com");
    console.log("👤 De:", body.name, `<${body.email}>`);

    // Enviar via MailChannels (nativo Cloudflare)
    const emailPayload = {
      personalizations: [
        {
          to: [{ 
            email: "rodrigo.azevedo1988@gmail.com",
            name: "Rodrigo Azevedo"
          }],
        },
      ],
      from: {
        email: "noreply@openleadsstrategy.com",
        name: "OpenLeads Strategy Hub",
      },
      reply_to: {
        email: body.email,
        name: body.name,
      },
      subject: `[Contato Site] Nova mensagem de ${body.name}`,
      content: [
        {
          type: "text/plain",
          value: `
NOVA MENSAGEM DE CONTATO - OpenLeads Strategy Hub

NOME: ${body.name}
EMAIL: ${body.email}
TELEFONE: ${body.phone}

MENSAGEM:
${body.message}

---
Enviado em: ${timestamp}
Site: OpenLeads Strategy Hub
          `.trim()
        }
      ],
    };

    const response = await fetch("https://api.mailchannels.net/tx/v1/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailPayload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ MailChannels error:", errorText);
      throw new Error(`MailChannels: ${response.status}`);
    }

    console.log("✅ Email enviado com sucesso para rodrigo.azevedo1988@gmail.com");

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
    console.error("❌ Erro:", error);
    
    return new Response(
      JSON.stringify({ 
        error: "Erro ao enviar email",
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
