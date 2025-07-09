import { useEffect } from "react";
import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import ProgramsSection from "@/components/programs-section";
import StudentLifeSection from "@/components/student-life-section";
import GallerySection from "@/components/gallery-section";
import VirtualTourSection from "@/components/virtual-tour-section";
import TuitionCalculator from "@/components/tuition-calculator";
import VisitScheduler from "@/components/visit-scheduler";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";
import ScrollToTop from "@/components/scroll-to-top";

export default function Home() {
  useEffect(() => {
    // Scroll reveal animation
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.scroll-reveal').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="overflow-x-hidden">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ProgramsSection />
      <StudentLifeSection />
      <GallerySection />
      <VirtualTourSection />
      <TuitionCalculator />
      <VisitScheduler />
      <ContactSection />
      <Footer />
      <ScrollToTop />
    </div>
  );
}
