import { Helmet } from "react-helmet";
import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import ProgramsSection from "@/components/programs-section";
import GallerySection from "@/components/gallery-section";
import StudentLifeSection from "@/components/student-life-section";
import VirtualTourSection from "@/components/virtual-tour-section";
import TuitionCalculator from "@/components/tuition-calculator";
import VisitScheduler from "@/components/visit-scheduler";
import StaticContactForm from "@/components/static-contact-form";
import Footer from "@/components/footer";
import Navigation from "@/components/navigation";
import ScrollToTop from "@/components/scroll-to-top";

export default function Home() {
  // No longer need dynamic Font Awesome loading - it's now in the HTML head

  return (
    <>
      <Helmet>
        <meta name="keywords" content="colégio, educação, Angola, escola, ensino, Narfive, qualidade, excelência" />
        <meta name="author" content="Colégio Narfive" />
        <meta property="og:title" content="Colégio Narfive - Educação de Excelência em Angola" />
        <meta property="og:description" content="Formando líderes para o futuro através da inovação, conhecimento e valores sólidos." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://colegionarfive.netlify.app" />
        <meta property="og:image" content="https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Colégio Narfive - Educação de Excelência em Angola" />
        <meta name="twitter:description" content="Formando líderes para o futuro através da inovação, conhecimento e valores sólidos." />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=630" />
        <link rel="canonical" href="https://colegionarfive.netlify.app" />
      </Helmet>
      
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />
        <HeroSection />
        <AboutSection />
        <ProgramsSection />
        <GallerySection />
        <StudentLifeSection />
        <VirtualTourSection />
        <TuitionCalculator />
        <VisitScheduler />
        <StaticContactForm />
        <Footer />
        <ScrollToTop />
      </div>
    </>
  );
}