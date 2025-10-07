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
      title: "Expertise em OSINT",
      description: "Nossa equipe domina técnicas avançadas de inteligência de fontes abertas, proporcionando insights que outros não conseguem.",
    },
    {
      icon: Database,
      title: "Análise de Dados",
      description: "Processamos e analisamos grandes volumes de dados para extrair informações estratégicas acionáveis.",
    },
    {
      icon: Lock,
      title: "Segurança e Ética",
      description: "Todas nossas operações seguem rigorosos padrões éticos e de segurança da informação.",
    },
    {
      icon: Zap,
      title: "Resultados Rápidos",
      description: "Metodologia ágil e ferramentas proprietárias que aceleram a entrega de resultados sem comprometer a qualidade.",
    },
  ];

  return (
    <section id="differentials" className="py-16 sm:py-24 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary to-background" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Nossos <span className="gradient-text">Diferenciais</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            O que nos torna únicos no mercado de marketing digital e inteligência estratégica
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {differentials.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-card border border-accent/30 rounded-2xl p-6 sm:p-8 hover-glow shadow-lg"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Differentials;
