import { motion } from "framer-motion";

export default function AboutSection() {
  const stats = [
    { number: "25+", label: "Anos de Experiência" },
    { number: "1500+", label: "Estudantes Ativos" },
    { number: "80+", label: "Professores Qualificados" },
    { number: "5000+", label: "Graduados" }
  ];

  return (
    <section id="about" className="py-20 bg-neutral">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="scroll-reveal"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-6">
              Sobre o <span className="text-primary">Narfive</span>
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              O Colégio Narfive é uma instituição de ensino de prestígio em Angola, dedicada a formar cidadãos íntegros e preparados para os desafios do século XXI. Com mais de duas décadas de excelência educacional, somos reconhecidos pela qualidade do nosso ensino e pelo desenvolvimento integral dos nossos estudantes.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Nossa missão é proporcionar uma educação holística que combina rigor acadêmico, valores éticos e desenvolvimento das competências do futuro, preparando nossos alunos para se tornarem líderes em suas comunidades e no mundo.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center p-6 bg-white rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            className="scroll-reveal"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.img 
              src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
              alt="Colégio Narfive Campus" 
              className="rounded-2xl shadow-2xl w-full h-auto transform hover:scale-105 transition-all duration-500"
              whileHover={{ scale: 1.02 }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
