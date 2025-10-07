import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Database, Lock, Zap } from "lucide-react";

const Differentials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const differentials = [
    {
      icon: Shield,
      title: "Análise de Concorrência",
      description: "Investigação profunda dos competidores para identificar estratégias, pontos fracos e oportunidades de mercado não exploradas.",
    },
    {
      icon: Database,
      title: "Monitoramento de Marca",
      description: "Rastreamento contínuo de menções, sentimentos e ameaças potenciais à sua reputação online em tempo real.",
    },
    {
      icon: Lock,
      title: "Investigação de Fraudes",
      description: "Identificação e prevenção de fraudes digitais, atividades suspeitas e proteção contra ameaças cibernéticas.",
    },
    {
      icon: Zap,
      title: "Inteligência de Mercado",
      description: "Coleta e análise de dados públicos para insights estratégicos sobre tendências, consumidores e oportunidades de negócio.",
    },
  ];

  return (
    <section id="differentials" className="py-16 sm:py-24 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-secondary via-background to-background">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,242,254,0.08),transparent_50%)]" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/30 mb-6">
            <Shield className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">Nosso Diferencial</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Expertise em <span className="gradient-text">OSINT</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Transformamos dados públicos em inteligência estratégica. Nossa expertise em Open Source Intelligence 
            permite descobrir insights invisíveis, antecipar movimentos do mercado e criar estratégias baseadas 
            em informações concretas que seus concorrentes não têm acesso.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {differentials.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-card border border-accent/30 rounded-2xl p-6 sm:p-8 hover-glow shadow-lg group"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                  <item.icon className="w-7 h-7 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-semibold transition-colors"
          >
            Conheça Nossos Cases de OSINT
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Differentials;
