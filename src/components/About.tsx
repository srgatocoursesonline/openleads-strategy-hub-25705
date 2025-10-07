import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Target, TrendingUp, Users } from "lucide-react";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { icon: Target, label: "Precisão em OSINT", value: "99%" },
    { icon: TrendingUp, label: "ROI Médio", value: "300%" },
    { icon: Users, label: "Clientes Ativos", value: "150+" },
  ];

  return (
    <section id="about" className="py-16 sm:py-24 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/50 to-background" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Sobre a <span className="gradient-text">OpenLeads Strategy</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Somos uma agência de marketing digital especializada em OSINT (Open Source Intelligence). 
            Combinamos técnicas avançadas de inteligência de fontes abertas com estratégias de marketing 
            digital para entregar resultados que vão além das métricas convencionais. Nossa expertise 
            permite identificar oportunidades invisíveis, compreender profundamente seu mercado e seus 
            concorrentes, e criar campanhas altamente direcionadas e eficazes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-card border border-accent/30 rounded-2xl p-6 sm:p-8 text-center hover-glow"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-accent/10 rounded-full flex items-center justify-center">
                <stat.icon className="w-8 h-8 text-accent" />
              </div>
              <div className="text-4xl font-bold gradient-text mb-2">{stat.value}</div>
              <div className="text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
