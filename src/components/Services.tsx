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
      description: "Inteligência de fontes abertas para análise competitiva, investigação de mercado e identificação de oportunidades estratégicas.",
    },
    {
      icon: Megaphone,
      title: "Marketing Digital",
      description: "Estratégias completas de marketing digital com foco em performance e resultados mensuráveis para o seu negócio.",
    },
    {
      icon: TrendingUp,
      title: "SEO",
      description: "Otimização avançada para mecanismos de busca, aumentando sua visibilidade orgânica e gerando tráfego qualificado.",
    },
    {
      icon: Share2,
      title: "Social Media",
      description: "Gestão estratégica de redes sociais com conteúdo engajador e campanhas que convertem seguidores em clientes.",
    },
    {
      icon: Globe,
      title: "Criação de Sites",
      description: "Desenvolvimento de sites modernos, responsivos e otimizados para conversão e experiência do usuário.",
    },
    {
      icon: Target,
      title: "Tráfego Pago",
      description: "Campanhas de anúncios pagos altamente segmentadas no Google Ads e Meta Ads com máximo ROI.",
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
              <Card className="h-full bg-card border-accent/30 hover:border-accent/50 card-hover rounded-2xl shadow-lg">{/* ... keep existing code */}
                <CardHeader>
                  <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
                    <service.icon className="w-7 h-7 text-accent" />
                  </div>
                  <CardTitle className="text-2xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </CardDescription>
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
