import { Instagram, Linkedin, Facebook, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Instagram, href: "https://instagram.com/openleadsstrategy", label: "Instagram" },
    { icon: Linkedin, href: "https://linkedin.com/company/openleadsstrategy", label: "LinkedIn" },
    { icon: Facebook, href: "https://facebook.com/openleadsstrategy", label: "Facebook" },
  ];

  const quickLinks = [
    { label: "Início", href: "#hero" },
    { label: "Sobre Nós", href: "#about" },
    { label: "Serviços", href: "#services" },
    { label: "OSINT", href: "#differentials" },
    { label: "Por Que Nós", href: "#why-us" },
    { label: "Contato", href: "#contact" },
  ];

  const serviceLinks = [
    { label: "Marketing Digital", href: "#services" },
    { label: "SEO", href: "#services" },
    { label: "Social Media", href: "#services" },
    { label: "Criação de Sites", href: "#services" },
    { label: "OSINT", href: "#differentials" },
    { label: "Consultoria", href: "#services" },
  ];

  return (
    <footer className="bg-slate-950 border-t border-accent/20 py-12">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Coluna 1 - Logo + Descrição */}
          <div className="lg:col-span-1">
            <img 
              src="/assets/logo.png" 
              alt="OpenLeads Strategy" 
              className="h-16 w-auto mb-4"
            />
            <p className="text-slate-400 mb-6 text-sm leading-relaxed">
              Inteligência estratégica e marketing digital que transformam dados em resultados mensuráveis.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center hover:bg-accent/20 transition-colors"
                >
                  <social.icon className="w-4 h-4 text-accent" />
                </a>
              ))}
            </div>
          </div>

          {/* Coluna 2 - Links Rápidos */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-accent transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 3 - Serviços */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Serviços</h4>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-accent transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 4 - Contato */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Contato</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                <a
                  href="mailto:contato@openleadsstrategy.com"
                  className="text-slate-400 hover:text-accent transition-colors text-sm"
                >
                  contato@openleadsstrategy.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                <a
                  href="tel:+5511999999999"
                  className="text-slate-400 hover:text-accent transition-colors text-sm"
                >
                  +55 (11) 9999-9999
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-slate-400 text-sm">
                  São Paulo, SP - Brasil
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-accent/20 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-slate-400">
            <p>© {currentYear} OpenLeads Strategy. Todos os direitos reservados.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-accent transition-colors">
                Política de Privacidade
              </a>
              <span className="text-slate-600">|</span>
              <a href="#" className="hover:text-accent transition-colors">
                Termos de Uso
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
