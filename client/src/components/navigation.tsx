import { useState, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const Navigation = memo(function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Check if window exists (SSR safety)
    if (typeof window === 'undefined') return;
    
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        setIsScrolled(window.scrollY > 100);
      }
    };

    try {
      window.addEventListener('scroll', handleScroll);
      return () => {
        try {
          if (typeof window !== 'undefined') {
            window.removeEventListener('scroll', handleScroll);
          }
        } catch (error) {
          // Silently fail during cleanup
        }
      };
    } catch (error) {
      // Silently fail if addEventListener is not available
    }
  }, []);

  const scrollToSection = (sectionId: string) => {
    // Check if document exists (SSR safety)
    if (typeof document === 'undefined') return;
    
    try {
      const element = document.getElementById(sectionId);
      if (element && element.scrollIntoView) {
        element.scrollIntoView({ behavior: 'smooth' });
        setIsMobileMenuOpen(false);
      }
    } catch (error) {
      // Silently fail if scrollIntoView is not supported
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
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex space-x-4 xl:space-x-6">
            {[
              { name: 'Início', id: 'home' },
              { name: 'Sobre Nós', id: 'about' },
              { name: 'Programas', id: 'programs' },
              { name: 'Vida Estudantil', id: 'life' },
              { name: 'Galeria', id: 'gallery' },
              { name: 'Tour', id: 'virtual-tour' },
              { name: 'Calculadora', id: 'tuition-calculator' },
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

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button 
              className={`p-2 rounded-md transition-colors duration-200 ${
                isScrolled || isMobileMenuOpen 
                  ? 'text-gray-900 hover:bg-gray-100' 
                  : 'text-white hover:bg-white/10'
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black lg:hidden z-40"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            <motion.div 
              className="fixed top-0 right-0 h-full w-4/5 max-w-sm bg-white shadow-2xl z-50 overflow-y-auto"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <div className="text-2xl font-bold text-gray-900">
                    Menu
                  </div>
                  <button 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-md text-gray-500 hover:bg-gray-100"
                    aria-label="Fechar menu"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                <nav className="space-y-2">
                  {[
                    { name: 'Início', id: 'home' },
                    { name: 'Sobre Nós', id: 'about' },
                    { name: 'Programas', id: 'programs' },
                    { name: 'Vida Estudantil', id: 'life' },
                    { name: 'Galeria', id: 'gallery' },
                    { name: 'Tour Virtual', id: 'virtual-tour' },
                    { name: 'Calculadora', id: 'tuition-calculator' },
                    { name: 'Agendar Visita', id: 'visit-scheduler' },
                    { name: 'Contato', id: 'contact' }
                  ].map((item) => (
                    <motion.button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className="w-full text-left px-4 py-3 rounded-lg font-medium text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors"
                      whileTap={{ scale: 0.98 }}
                    >
                      {item.name}
                    </motion.button>
                  ))}
                </nav>
                
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <a 
                    href="tel:+244923456789"
                    className="block w-full text-center bg-primary text-white py-3 px-6 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                  >
                    Ligar Agora
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
});

export default Navigation;
