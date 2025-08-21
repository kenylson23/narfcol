import { memo } from "react";
import { motion, useReducedMotion } from "framer-motion";

const AboutSection = memo(function AboutSection() {
  const prefersReducedMotion = useReducedMotion();
  const stats = [
    { number: "8+", label: "Anos de Experiência" },
    { number: "1500+", label: "Estudantes Ativos" },
    { number: "30+", label: "Professores Qualificados" },
    { number: "5000+", label: "Graduados" }
  ];

  return (
    <section id="about" className="py-12 md:py-20 bg-neutral relative overflow-hidden">
      {/* Background Parallax Elements */}
      <div className="absolute inset-0 opacity-5">
        <motion.div 
          className="absolute top-10 left-10 w-32 h-32 rounded-full bg-primary rotate-slow"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute bottom-20 right-20 w-24 h-24 rounded-full bg-primary/30 floating-animation"
        />
        <motion.div 
          className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full bg-primary/20 pulse-glow"
        />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div 
            className="scroll-reveal enhanced-parallax"
            initial={{ opacity: 0, x: -60, rotateY: -15 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-secondary mb-4 md:mb-6">
              Sobre o <span className="text-primary">Narfive</span>
            </h2>
            <div className="space-y-4 md:space-y-6 mb-6 md:mb-8">
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                O Colégio Narfive é uma instituição de ensino de prestígio em Angola, dedicada a formar cidadãos íntegros e preparados para os desafios do século XXI. Com 10 anos de excelência educacional, somos reconhecidos pela qualidade do nosso ensino e pelo desenvolvimento integral dos nossos estudantes.
              </p>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                Nossa missão é proporcionar uma educação holística que combina rigor acadêmico, valores éticos e desenvolvimento das competências do futuro, preparando nossos alunos para se tornarem líderes em suas comunidades e no mundo.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center p-3 sm:p-4 md:p-6 bg-white rounded-lg md:rounded-xl shadow-sm md:shadow-lg interactive-hover immersive-glow gradient-shift section-transition"
                  initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20, scale: 0.9 }}
                  whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0, scale: 1 }}
                  transition={prefersReducedMotion ? {} : { 
                    duration: 0.6, 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100,
                    damping: 15
                  }}
                  viewport={{ once: true, margin: "-50px" }}
                  whileHover={prefersReducedMotion ? {} : { 
                    scale: 1.05, 
                    boxShadow: "0 15px 30px rgba(106, 90, 205, 0.2)",
                    transition: { duration: 0.2 }
                  }}
                >
                  <motion.div 
                    className="text-2xl sm:text-3xl font-bold text-primary mb-1 sm:mb-2"
                    animate={prefersReducedMotion ? {} : { 
                      scale: [1, 1.05, 1],
                    }}
                    transition={prefersReducedMotion ? {} : { 
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.3
                    }}
                  >
                    {stat.number}
                  </motion.div>
                  <div className="text-xs sm:text-sm md:text-base text-gray-700 leading-tight">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            className="scroll-reveal enhanced-parallax mt-8 lg:mt-0"
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: 60, rotateY: 15 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <div className="relative">
              <motion.img 
                src="/Instalações.jpg" 
                alt="Colégio Narfive Campus" 
                className="rounded-xl md:rounded-2xl shadow-lg md:shadow-2xl w-full h-auto section-transition"
                whileHover={prefersReducedMotion ? {} : { 
                  scale: 1.03,
                  rotateY: 3,
                  boxShadow: "0 20px 40px rgba(106, 90, 205, 0.15)"
                }}
                transition={{ duration: 0.3 }}
                loading="lazy"
              />
              
              {/* Floating overlay elements - Hidden on mobile for better performance */}
              <motion.div 
                className="hidden sm:block absolute -top-4 -right-4 w-6 h-6 md:w-8 md:h-8 bg-primary rounded-full pulse-glow"
                animate={prefersReducedMotion ? {} : {
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={prefersReducedMotion ? {} : {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              <motion.div 
                className="hidden sm:block absolute -bottom-4 -left-4 w-8 h-8 md:w-12 md:h-12 bg-primary/30 rounded-full"
                animate={prefersReducedMotion ? {} : {
                  y: [0, -10, 0],
                  rotate: [0, 180, 360],
                }}
                transition={prefersReducedMotion ? {} : {
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

export default AboutSection;
