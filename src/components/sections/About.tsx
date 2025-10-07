import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Target, TrendingUp, Users, Brain, Shield, Zap } from "lucide-react";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { icon: Target, label: "Precisão em OSINT", value: "99%" },
    { icon: TrendingUp, label: "ROI Médio", value: "300%" },
    { icon: Users, label: "Clientes Ativos", value: "150+" },
  ];

  const values = [
    {
      icon: Brain,
      title: "Inteligência de Dados",
      description: "Análise profunda e insights estratégicos",
    },
    {
      icon: Target,
      title: "Estratégias Personalizadas",
      description: "Soluções sob medida para seu negócio",
    },
    {
      icon: TrendingUp,
      title: "Resultados Mensuráveis",
      description: "Métricas claras e ROI comprovado",
    },
    {
      icon: Shield,
      title: "Transparência Total",
      description: "Relatórios detalhados e comunicação clara",
    },
    {
      icon: Zap,
      title: "Inovação Constante",
      description: "Sempre à frente das tendências digitais",
    },
    {
      icon: Users,
      title: "Foco no Cliente",
      description: "Seu sucesso é nossa prioridade",
    },
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
            Quem <span className="gradient-text">Somos</span>
          </h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p className="text-lg">
              Somos uma agência de marketing digital especializada em <strong className="text-accent">OSINT (Open Source Intelligence)</strong>. 
              Combinamos técnicas avançadas de inteligência de fontes abertas com estratégias de marketing 
              digital para entregar resultados que vão além das métricas convencionais.
            </p>
            <p className="text-base">
              <strong className="text-foreground">Nossa missão:</strong> Capacitar empresas a tomar decisões estratégicas baseadas em dados concretos, 
              identificando oportunidades invisíveis e criando vantagens competitivas sustentáveis no mercado digital.
            </p>
          </div>
        </motion.div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto mb-20">
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

        {/* Valores */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mb-12"
        >
          <h3 className="text-2xl sm:text-3xl font-bold mb-4">Nossos Valores</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Pilares que guiam nossas ações e definem nosso compromisso com a excelência
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
              className="bg-card/50 backdrop-blur border border-accent/20 rounded-xl p-6 hover:border-accent/40 transition-colors"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-3">
                  <value.icon className="w-6 h-6 text-accent" />
                </div>
                <h4 className="font-semibold mb-2">{value.title}</h4>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
