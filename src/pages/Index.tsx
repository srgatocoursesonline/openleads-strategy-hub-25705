import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollProgressBar from "@/components/common/ScrollProgressBar";
import ScrollToTop from "@/components/common/ScrollToTop";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Differentials from "@/components/sections/Differentials";
import WhyUs from "@/components/sections/WhyUs";
import Contact from "@/components/sections/Contact";

const Index = () => {
  return (
    <div className="min-h-screen">
      <ScrollProgressBar />
      <Header />
      <Hero />
      <About />
      <Services />
      <Differentials />
      <WhyUs />
      <Contact />
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
    </div>
  );
};

export default Index;
