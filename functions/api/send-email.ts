/**
 * Cloudflare Worker Function para envio de emails via MailChannels
 * Endpoint: /api/send-email
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
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Configuração do email usando MailChannels
    const emailPayload = {
      personalizations: [
        {
          to: [{ email: "rodrigo.azevedo1988@gmail.com", name: "Rodrigo Azevedo" }],
          dkim_domain: "openleadsstrategy.com",
          dkim_selector: "mailchannels",
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
          type: "text/html",
          value: `
            <!DOCTYPE html>
            <html>
              <head>
                <meta charset="UTF-8">
                <style>
                  body {
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                    line-height: 1.6;
                    color: #333;
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                  }
                  .header {
                    background: linear-gradient(135deg, #0a1f44 0%, #1a3a5c 100%);
                    color: white;
                    padding: 30px;
                    border-radius: 8px 8px 0 0;
                    text-align: center;
                  }
                  .content {
                    background: #f8f9fa;
                    padding: 30px;
                    border-radius: 0 0 8px 8px;
                  }
                  .field {
                    margin-bottom: 20px;
                    padding: 15px;
                    background: white;
                    border-radius: 6px;
                    border-left: 4px solid #00d4ff;
                  }
                  .label {
                    font-weight: 600;
                    color: #0a1f44;
                    margin-bottom: 5px;
                    font-size: 14px;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                  }
                  .value {
                    color: #333;
                    font-size: 16px;
                  }
                  .message-box {
                    background: white;
                    padding: 20px;
                    border-radius: 6px;
                    border-left: 4px solid #00d4ff;
                    white-space: pre-wrap;
                    word-wrap: break-word;
                  }
                  .footer {
                    margin-top: 30px;
                    padding-top: 20px;
                    border-top: 2px solid #e9ecef;
                    font-size: 12px;
                    color: #6c757d;
                    text-align: center;
                  }
                </style>
              </head>
              <body>
                <div class="header">
                  <h1 style="margin: 0; font-size: 24px;">Nova Mensagem de Contato</h1>
                  <p style="margin: 10px 0 0 0; opacity: 0.9;">OpenLeads Strategy Hub</p>
                </div>
                
                <div class="content">
                  <div class="field">
                    <div class="label">Nome</div>
                    <div class="value">${body.name}</div>
                  </div>
                  
                  <div class="field">
                    <div class="label">Email</div>
                    <div class="value"><a href="mailto:${body.email}" style="color: #0066cc; text-decoration: none;">${body.email}</a></div>
                  </div>
                  
                  <div class="field">
                    <div class="label">Telefone</div>
                    <div class="value"><a href="tel:${body.phone}" style="color: #0066cc; text-decoration: none;">${body.phone}</a></div>
                  </div>
                  
                  <div class="field">
                    <div class="label">Mensagem</div>
                    <div class="message-box">${body.message}</div>
                  </div>
                  
                  <div class="footer">
                    <p>Esta mensagem foi enviada através do formulário de contato em ${new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}</p>
                  </div>
                </div>
              </body>
            </html>
          `,
        },
        {
          type: "text/plain",
          value: `
Nova mensagem de contato - OpenLeads Strategy Hub

NOME: ${body.name}
EMAIL: ${body.email}
TELEFONE: ${body.phone}

MENSAGEM:
${body.message}

---
Enviado em: ${new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}
          `,
        },
      ],
    };

    // Envio via MailChannels API
    const response = await fetch("https://api.mailchannels.net/tx/v1/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailPayload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("MailChannels error:", errorText);
      
      return new Response(
        JSON.stringify({ 
          error: "Erro ao enviar email. Tente novamente mais tarde.",
          details: errorText 
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
    console.error("Error processing request:", error);
    
    return new Response(
      JSON.stringify({ 
        error: "Erro interno do servidor",
        details: error instanceof Error ? error.message : "Unknown error"
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

