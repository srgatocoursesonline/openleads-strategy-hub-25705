import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Instagram, Linkedin, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: "Início", href: "#hero" },
    { label: "Sobre", href: "#about" },
    { label: "Serviços", href: "#services" },
    { label: "OSINT", href: "#differentials" },
    { label: "Por Que Nós", href: "#why-us" },
    { label: "Contato", href: "#contact" },
  ];

  const socialLinks = [
    { icon: Instagram, href: "https://instagram.com/openleadsstrategy", label: "Instagram" },
    { icon: Linkedin, href: "https://linkedin.com/company/openleadsstrategy", label: "LinkedIn" },
    { icon: Facebook, href: "https://facebook.com/openleadsstrategy", label: "Facebook" },
  ];

  const handleMenuClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-accent/20 shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                handleMenuClick("#hero");
              }}
              className="cursor-pointer flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img 
                src="/assets/logo.png" 
                alt="OpenLeads Strategy" 
                className="h-14 w-auto"
              />
              <span className="text-xl font-bold gradient-text hidden sm:block">
                OpenLeads Strategy
              </span>
            </motion.a>

            {/* Desktop Menu */}
            <nav className="hidden md:flex items-center gap-8">
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleMenuClick(item.href);
                  }}
                  className="text-foreground/80 hover:text-accent transition-colors duration-300 font-medium relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </nav>

            {/* Social Links + CTA Button Desktop */}
            <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center gap-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-accent/10 transition-colors text-muted-foreground hover:text-accent"
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
              <Button
                onClick={() => handleMenuClick("#contact")}
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-6 hover-glow"
              >
                Solicitar Orçamento
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden w-12 h-12 flex items-center justify-center rounded-lg hover:bg-accent/10 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-accent" />
              ) : (
                <Menu className="w-6 h-6 text-accent" />
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-background/95 backdrop-blur-xl z-40 md:hidden"
            />

            {/* Menu Content */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-20 right-0 bottom-0 w-4/5 max-w-sm bg-card border-l border-accent/20 z-40 md:hidden overflow-y-auto"
            >
              <nav className="flex flex-col p-6 gap-2">
                {menuItems.map((item, index) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleMenuClick(item.href);
                    }}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-foreground hover:text-accent transition-colors duration-300 font-medium py-4 px-4 rounded-lg hover:bg-accent/10 min-h-[48px] flex items-center"
                  >
                    {item.label}
                  </motion.a>
                ))}

                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: menuItems.length * 0.1 }}
                  className="mt-4"
                >
                  <Button
                    onClick={() => handleMenuClick("#contact")}
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold min-h-[48px] hover-glow"
                  >
                    Solicitar Orçamento
                  </Button>
                </motion.div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
