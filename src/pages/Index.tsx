import Header from "@/components/Header";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Differentials from "@/components/Differentials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <div className="min-h-screen">
      <ScrollProgressBar />
      <Header />
      <Hero />
      <About />
      <Services />
      <Differentials />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
