import { motion } from "framer-motion";

export default function Footer() {
  const quickLinks = [
    { name: "Sobre Nós", href: "#about" },
    { name: "Programas", href: "#programs" },
    { name: "Corpo Docente", href: "#faculty" },
    { name: "Vida Estudantil", href: "#life" },
    { name: "Contato", href: "#contact" }
  ];

  const admissionLinks = [
    { name: "Processo de Admissão", href: "#" },
    { name: "Requisitos", href: "#" },
    { name: "Propinas", href: "#" },
    { name: "Agendar Visita", href: "#" },
    { name: "FAQ", href: "#" }
  ];

  const socialLinks = [
    { icon: "fab fa-facebook-f", href: "#" },
    { icon: "fab fa-instagram", href: "#" },
    { icon: "fab fa-linkedin-in", href: "#" },
    { icon: "fab fa-youtube", href: "#" }
  ];

  const scrollToSection = (sectionId: string) => {
    // Check if document exists (SSR safety)
    if (typeof document === 'undefined') return;
    
    try {
      const element = document.getElementById(sectionId.replace('#', ''));
      if (element && element.scrollIntoView) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } catch (error) {
      // Silently fail if scrollIntoView is not supported
    }
  };

  return (
    <footer className="bg-secondary text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-2xl font-bold mb-4">
              Colégio <span className="text-primary">Narfive</span>
            </div>
            <p className="text-gray-300 mb-6">
              Formando líderes do futuro através de educação de excelência, valores sólidos e inovação pedagógica.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className="bg-primary/20 p-2 rounded-full hover:bg-primary/30 transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <i className={social.icon}></i>
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-300 hover:text-primary transition-colors duration-300"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-4">Admissões</h4>
            <ul className="space-y-2">
              {admissionLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-primary transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-4">Contato</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <i className="fas fa-map-marker-alt text-primary"></i>
                <span className="text-gray-300">Luanda Sul, Angola</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="fas fa-phone text-primary"></i>
                <span className="text-gray-300">+244 922 345 678</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="fas fa-envelope text-primary"></i>
                <span className="text-gray-300">info@colegionarfive.ao</span>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="border-t border-gray-700 mt-12 pt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-300">
            © 2024 Colégio Narfive. Todos os direitos reservados. | 
            <a href="#" className="text-primary hover:text-primary/80 transition-colors duration-300 ml-1">
              Política de Privacidade
            </a> | 
            <a href="#" className="text-primary hover:text-primary/80 transition-colors duration-300 ml-1">
              Termos de Serviço
            </a>
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
