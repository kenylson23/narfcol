import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 section-transition ${isScrolled ? 'glass-morphism backdrop-blur-md shadow-2xl' : 'bg-gradient-to-b from-black/20 to-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <motion.div 
            className="flex items-center"
            initial={{ opacity: 0, x: -20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div 
              className={`text-2xl font-bold section-transition ${isScrolled ? 'text-gray-900' : 'text-white'}`}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              Colégio <span className="text-primary">Narfive</span>
            </motion.div>
          </motion.div>
          
          <div className="hidden xl:flex space-x-8">
            {[
              { name: 'Início', id: 'home' },
              { name: 'Sobre Nós', id: 'about' },
              { name: 'Programas', id: 'programs' },
              { name: 'Vida Estudantil', id: 'life' },
              { name: 'Galeria', id: 'gallery' },
              { name: 'Tour Virtual', id: 'virtual-tour' },
              { name: 'Calculadora', id: 'tuition-calculator' },
              { name: 'Visita', id: 'visit-scheduler' },
              { name: 'Contato', id: 'contact' }
            ].map((item, index) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`section-transition font-medium relative ${
                  isScrolled ? 'text-gray-900 hover:text-primary' : 'text-white hover:text-primary'
                }`}
                initial={{ opacity: 0, y: -20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                whileHover={{ 
                  scale: 1.08,
                  y: -2,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                {item.name}
                <motion.div 
                  className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary"
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            ))}
          </div>

          <div className="xl:hidden">
            <button 
              className={`transition-colors duration-300 ${
                isScrolled ? 'text-gray-900 hover:text-primary' : 'text-white hover:text-primary'
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <i className="fas fa-bars text-xl"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div 
        className={`xl:hidden glass-morphism ${isMobileMenuOpen ? 'block' : 'hidden'}`}
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: isMobileMenuOpen ? 1 : 0, height: isMobileMenuOpen ? 'auto' : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="px-4 py-6 space-y-4">
          {[
            { name: 'Início', id: 'home' },
            { name: 'Sobre Nós', id: 'about' },
            { name: 'Programas', id: 'programs' },
            { name: 'Vida Estudantil', id: 'life' },
            { name: 'Galeria', id: 'gallery' },
            { name: 'Tour Virtual', id: 'virtual-tour' },
            { name: 'Calculadora', id: 'tuition-calculator' },
            { name: 'Visita', id: 'visit-scheduler' },
            { name: 'Contato', id: 'contact' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="block text-white hover:text-primary transition-colors duration-300 font-medium"
            >
              {item.name}
            </button>
          ))}
        </div>
      </motion.div>
    </nav>
  );
}
