/**
 * Cloudflare Worker - Salva contatos e notifica
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

    // Enviar para webhook que encaminha email (FormSubmit confirmado)
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

      await fetch("https://formsubmit.co/ajax/rodrigo.azevedo1988@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData.toString(),
      });

      console.log("✅ Enviado via FormSubmit");
    } catch (e) {
      console.log("⚠️ FormSubmit falhou (não crítico)");
    }

    console.log("✅ CONTATO PROCESSADO COM SUCESSO");

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Mensagem enviada! Entraremos em contato em breve.",
        data: {
          timestamp,
          name: body.name
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
