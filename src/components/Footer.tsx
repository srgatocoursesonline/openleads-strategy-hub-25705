import { Instagram, Linkedin, Twitter, Facebook } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Facebook, href: "#", label: "Facebook" },
  ];

  return (
    <footer className="bg-primary/50 border-t border-accent/30 py-12">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold gradient-text mb-4">OpenLeads Strategy</h3>
            <p className="text-muted-foreground">
              Inteligência estratégica e marketing digital que transformam dados em resultados.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a href="#services" className="hover:text-accent transition-colors">
                  Serviços
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-accent transition-colors">
                  Contato
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Sobre
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Redes Sociais</h4>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center hover:bg-accent/20 transition-colors min-h-[48px]"
                >
                  <social.icon className="w-5 h-5 text-accent" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-accent/30 pt-8 text-center text-muted-foreground">
          <p>© {currentYear} OpenLeads Strategy. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
