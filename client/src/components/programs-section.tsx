import { motion } from "framer-motion";

export default function ProgramsSection() {
  const programs = [
    {
      icon: "fas fa-graduation-cap",
      title: "Ensino Primário",
      description: "Fundamental sólida com foco no desenvolvimento da literacia, numeracia e pensamento crítico através de metodologias inovadoras.",
      features: ["Currículo Bilingue", "Tecnologia Educacional", "Desenvolvimento Socioemocional"]
    },
    {
      icon: "fas fa-book-open",
      title: "Ensino Secundário",
      description: "Preparação robusta para o ensino superior com ênfase em ciências, humanidades e desenvolvimento de competências do século XXI.",
      features: ["Laboratórios Modernos", "Programa Internacional", "Orientação Vocacional"]
    },
    {
      icon: "fas fa-laptop-code",
      title: "Programas STEM",
      description: "Iniciativas especializadas em Ciência, Tecnologia, Engenharia e Matemática para preparar os inovadores do futuro.",
      features: ["Robótica e Programação", "Laboratório de Inovação", "Competições Nacionais"]
    },
    {
      icon: "fas fa-palette",
      title: "Artes e Cultura",
      description: "Desenvolvimento da criatividade e expressão cultural através de programas integrados de artes visuais, música e teatro.",
      features: ["Estúdio de Arte", "Orquestra Escolar", "Teatro e Drama"]
    },
    {
      icon: "fas fa-running",
      title: "Desporto e Saúde",
      description: "Programa abrangente de educação física e desporto para promover saúde, disciplina e trabalho em equipa.",
      features: ["Complexo Desportivo", "Equipas Competitivas", "Educação Nutricional"]
    },
    {
      icon: "fas fa-globe-africa",
      title: "Línguas e Culturas",
      description: "Programas multilíngues que celebram a diversidade cultural angolana e preparam cidadãos globais.",
      features: ["Português Nativo", "Inglês e Francês", "Línguas Nacionais"]
    }
  ];

  return (
    <section id="programs" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16 scroll-reveal"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-6">
            Nossos <span className="text-primary">Programas</span>
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Oferecemos uma ampla gama de programas educacionais desenhados para desenvolver o potencial máximo de cada estudante em todas as fases da sua jornada acadêmica.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <motion.div
              key={index}
              className="group bg-gradient-to-br from-primary/5 to-primary/15 rounded-2xl p-8 interactive-hover immersive-glow magnetic-hover depth-shadow-lg scroll-reveal"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.08,
                rotateY: 5,
                boxShadow: "0 25px 50px rgba(106, 90, 205, 0.25)"
              }}
            >
              <motion.div 
                className="text-4xl text-primary mb-4"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <i className={program.icon}></i>
              </motion.div>
              
              <h3 className="text-2xl font-bold text-secondary mb-4">{program.title}</h3>
              
              <p className="text-gray-700 mb-6">
                {program.description}
              </p>
              
              <ul className="text-sm text-gray-700 space-y-2 mb-6">
                {program.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <i className="fas fa-check text-success mr-2"></i> 
                    {feature}
                  </li>
                ))}
              </ul>
              
              <motion.button 
                className="text-primary font-semibold hover:text-primary/80 transition-colors duration-300 group-hover:translate-x-2 transform transition-transform"
                whileHover={{ x: 8 }}
              >
                Saber Mais <i className="fas fa-arrow-right ml-2"></i>
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
