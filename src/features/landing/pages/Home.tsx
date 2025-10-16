import Header from "@/features/layout/components/Header";
import Footer from "@/features/layout/components/Footer";
import ScrollProgressBar from "@/features/layout/components/ScrollProgressBar";
import ScrollToTop from "@/features/layout/widgets/ScrollToTop";
import WhatsAppButton from "@/features/layout/widgets/WhatsAppButton";
import Hero from "@/features/landing/components/Hero";
import About from "@/features/landing/components/About";
import Services from "@/features/landing/components/Services";
import Differentials from "@/features/landing/components/Differentials";
import WhyUs from "@/features/landing/components/WhyUs";
import Contact from "@/features/landing/components/Contact";

const Home = () => {
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

export default Home;
