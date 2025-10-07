import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// Plugin para simular o endpoint de email em desenvolvimento
const mockEmailApi = (): Plugin => ({
  name: 'mock-email-api',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      if (req.url === '/api/send-email' && req.method === 'POST') {
        console.log('📧 [DEV] Simulando envio de email...');
        
        let body = '';
        req.on('data', chunk => {
          body += chunk.toString();
        });
        
        req.on('end', () => {
          try {
            const data = JSON.parse(body);
            console.log('📬 [DEV] Dados recebidos:', {
              nome: data.name,
              email: data.email,
              telefone: data.phone,
              mensagem: data.message?.substring(0, 50) + '...'
            });
            console.log('✅ [DEV] Em produção, email será enviado para: rodrigo.azevedo1988@gmail.com');
            
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.statusCode = 200;
            res.end(JSON.stringify({
              success: true,
              message: '✅ Email simulado com sucesso! (Modo Desenvolvimento)'
            }));
          } catch (error) {
            res.statusCode = 400;
            res.end(JSON.stringify({
              error: 'Dados inválidos'
            }));
          }
        });
        
        return;
      }
      
      // Handle OPTIONS for CORS
      if (req.url === '/api/send-email' && req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        res.statusCode = 204;
        res.end();
        return;
      }
      
      next();
    });
  }
});

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mockEmailApi(), // Plugin para simular API em dev
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
