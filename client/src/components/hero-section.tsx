import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
    layoutEffect: false
  });

  // Parallax transforms for different layers
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const floatingY1 = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const floatingY2 = useTransform(scrollYProgress, [0, 1], ["0%", "45%"]);
  const floatingY3 = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={ref} id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Layer - Slowest Parallax */}
      <motion.div 
        className="absolute inset-0 parallax-bg" 
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080')",
          y: backgroundY
        }}
      />
      
      {/* Secondary Background Layer */}
      <motion.div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&h=1080')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          y: floatingY1
        }}
      />
      
      <div className="absolute inset-0 hero-gradient" />
      
      {/* Parallax Floating Elements - Different Layers */}
      <motion.div 
        className="absolute top-20 left-20 w-20 h-20 bg-primary opacity-20 rounded-full"
        style={{ y: floatingY2 }}
        animate={{ 
          rotate: [0, 180, 360],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        className="absolute top-40 right-32 w-16 h-16 bg-white opacity-15 rounded-full"
        style={{ y: floatingY1 }}
        animate={{ 
          x: [0, 20, 0],
          rotate: [0, -180, -360]
        }}
        transition={{ 
          duration: 6, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        className="absolute bottom-40 left-32 w-24 h-24 bg-primary opacity-15 rounded-full"
        style={{ y: floatingY3 }}
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.15, 0.25, 0.15]
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Additional Parallax Elements */}
      <motion.div 
        className="absolute top-1/3 left-1/4 w-12 h-12 bg-white opacity-10 rounded-full"
        style={{ y: floatingY2 }}
        animate={{ 
          y: [0, -25, 0],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ 
          duration: 5, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        className="absolute bottom-1/3 right-1/4 w-14 h-14 bg-primary opacity-12 rounded-full"
        style={{ y: floatingY1 }}
        animate={{ 
          x: [0, -15, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          duration: 7, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        className="absolute top-2/3 right-16 w-8 h-8 bg-white opacity-20 rounded-full"
        style={{ y: floatingY3 }}
        animate={{ 
          y: [0, -30, 0],
          rotate: [0, 90, 180]
        }}
        transition={{ 
          duration: 9, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div 
        className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto"
        style={{ y: textY }}
      >
        <motion.h1 
          className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-2xl"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Colégio <span className="text-primary drop-shadow-lg">Narfive</span>
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl text-white mb-8 drop-shadow-lg"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          Educação de Excelência, Formando o Futuro de Angola
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <motion.button 
            className="bg-primary hover:bg-primary/80 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            onClick={() => scrollToSection('programs')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Nossos Programas
          </motion.button>
          
          <motion.button 
            className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Tour Virtual
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <i className="fas fa-chevron-down text-white text-2xl"></i>
      </motion.div>
    </section>
  );
}
