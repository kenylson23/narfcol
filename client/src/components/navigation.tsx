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
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'glass-morphism' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <motion.div 
            className="flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-2xl font-bold text-white">
              Colégio <span className="text-primary">Narfive</span>
            </div>
          </motion.div>
          
          <div className="hidden md:flex space-x-8">
            {[
              { name: 'Início', id: 'home' },
              { name: 'Sobre Nós', id: 'about' },
              { name: 'Programas', id: 'programs' },
              { name: 'Professores', id: 'faculty' },
              { name: 'Vida Estudantil', id: 'life' },
              { name: 'Contato', id: 'contact' }
            ].map((item, index) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-white hover:text-primary transition-colors duration-300 font-medium"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                {item.name}
              </motion.button>
            ))}
          </div>

          <div className="md:hidden">
            <button 
              className="text-white hover:text-primary transition-colors duration-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <i className="fas fa-bars text-xl"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div 
        className={`md:hidden glass-morphism ${isMobileMenuOpen ? 'block' : 'hidden'}`}
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: isMobileMenuOpen ? 1 : 0, height: isMobileMenuOpen ? 'auto' : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="px-4 py-6 space-y-4">
          {[
            { name: 'Início', id: 'home' },
            { name: 'Sobre Nós', id: 'about' },
            { name: 'Programas', id: 'programs' },
            { name: 'Professores', id: 'faculty' },
            { name: 'Vida Estudantil', id: 'life' },
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
