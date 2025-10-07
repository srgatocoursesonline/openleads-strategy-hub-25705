import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { BarChart3, Eye, Users, Headphones } from "lucide-react";

const WhyUs = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const reasons = [
    {
      icon: BarChart3,
      title: "Metodologia Data-Driven",
      description: "Todas as decisões estratégicas baseadas em dados reais, métricas validadas e análises profundas de mercado.",
    },
    {
      icon: Eye,
      title: "Transparência Total",
      description: "Relatórios detalhados, acesso completo às campanhas e comunicação clara sobre cada ação realizada.",
    },
    {
      icon: Users,
      title: "Equipe Especializada",
      description: "Profissionais certificados em OSINT, Google Ads, Meta Ads e especialistas em diferentes verticais de mercado.",
    },
    {
      icon: Headphones,
      title: "Suporte Dedicado",
      description: "Atendimento personalizado com gestor de conta exclusivo e resposta garantida em até 2 horas úteis.",
    },
  ];

  return (
    <section id="why-us" className="py-16 sm:py-24 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/30 to-background" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Por Que Escolher a <span className="gradient-text">OpenLeads?</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Diferenciais competitivos que nos tornam a escolha certa para o seu crescimento digital
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-card border border-accent/30 rounded-2xl p-8 hover-glow shadow-lg"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-4">
                  <reason.icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3">{reason.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {reason.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
