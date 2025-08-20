import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if window exists (SSR safety)
    if (typeof window === 'undefined') return;
    
    const toggleVisibility = () => {
      if (typeof window !== 'undefined' && window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    try {
      window.addEventListener('scroll', toggleVisibility);
      return () => {
        try {
          if (typeof window !== 'undefined') {
            window.removeEventListener('scroll', toggleVisibility);
          }
        } catch (error) {
          // Silently fail during cleanup
        }
      };
    } catch (error) {
      // Silently fail if addEventListener is not available
    }
  }, []);

  const scrollToTop = () => {
    if (typeof window !== 'undefined' && window.scrollTo) {
      try {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      } catch (error) {
        // Fallback for browsers that don't support smooth behavior
        try {
          window.scrollTo(0, 0);
        } catch (fallbackError) {
          // Silently fail if scrollTo is not available
        }
      }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          className="fixed bottom-8 right-8 bg-primary hover:bg-primary/80 text-white p-4 rounded-full shadow-lg z-50"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0, y: 100 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: 100 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.3 }}
        >
          <i className="fas fa-arrow-up"></i>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
