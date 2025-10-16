import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Search, Megaphone, TrendingUp, Share2, Globe, Target } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const services = [
    {
      icon: Search,
      title: "OSINT",
      description: "Investigação digital profunda, análise de concorrência e inteligência de mercado usando técnicas avançadas de coleta e análise de dados.",
      features: ["Monitoramento de marca", "Análise de ameaças", "Due diligence digital"],
    },
    {
      icon: Megaphone,
      title: "Marketing Digital de Performance",
      description: "Campanhas orientadas a ROI com métricas claras, rastreamento detalhado e otimização constante para resultados reais.",
      features: ["Google Ads", "Meta Ads", "Remarketing estratégico"],
    },
    {
      icon: TrendingUp,
      title: "SEO & Tráfego Orgânico",
      description: "Posicione seu site no topo do Google com estratégias comprovadas de otimização on-page, off-page e conteúdo.",
      features: ["Auditoria SEO", "Link building", "Content strategy"],
    },
    {
      icon: Share2,
      title: "Social Media Management",
      description: "Gestão completa das redes sociais com planejamento estratégico, criação de conteúdo e engajamento autêntico.",
      features: ["Planejamento editorial", "Design criativo", "Community management"],
    },
    {
      icon: Globe,
      title: "Criação de Sites",
      description: "Desenvolvimento web moderno com design responsivo, experiência excepcional e otimização total para conversões.",
      features: ["Design UX/UI", "Responsive", "E-commerce"],
    },
    {
      icon: Target,
      title: "Consultoria Estratégica",
      description: "Análise profunda do seu negócio, diagnóstico de oportunidades e roadmap completo de crescimento digital.",
      features: ["Diagnóstico 360°", "Planejamento tático", "Acompanhamento contínuo"],
    },
  ];

  return (
    <section id="services" className="py-16 sm:py-24 relative" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Nossos <span className="gradient-text">Serviços</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Soluções completas de marketing digital e inteligência estratégica para impulsionar seu negócio
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full bg-card border-accent/30 hover:border-accent/50 card-hover rounded-2xl shadow-lg">
                <CardHeader>
                  <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
                    <service.icon className="w-8 h-8 text-accent" />
                  </div>
                  <CardTitle className="text-2xl mb-3">{service.title}</CardTitle>
                  <CardDescription className="text-muted-foreground leading-relaxed text-base">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
