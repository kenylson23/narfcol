import { motion } from "framer-motion";

export default function FacultySection() {
  const faculty = [
    {
      name: "Dra. Maria Santos",
      position: "Diretora de Matemática",
      education: "PhD em Matemática, Universidade de Coimbra",
      specialization: "Especialização em Matemática Aplicada",
      experience: "15 anos de experiência",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400"
    },
    {
      name: "Prof. João Pereira",
      position: "Coordenador de Línguas",
      education: "Mestrado em Filologia, Universidade de Lisboa",
      specialization: "Literatura e Língua Portuguesa",
      experience: "20 anos de experiência",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400"
    },
    {
      name: "Dra. Ana Costa",
      position: "Professora de Ciências",
      education: "PhD em Biologia, Universidade do Porto",
      specialization: "Biologia e Ciências Naturais",
      experience: "8 anos de experiência",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400"
    },
    {
      name: "Prof. Carlos Silva",
      position: "Chefe de Humanidades",
      education: "Mestrado em História, Universidade de Angola",
      specialization: "História e Geografia",
      experience: "12 anos de experiência",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400"
    }
  ];

  return (
    <section id="faculty" className="py-20 bg-neutral">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16 scroll-reveal"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-6">
            Nosso <span className="text-primary">Corpo Docente</span>
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Professores altamente qualificados e dedicados, comprometidos com a excelência educacional e o desenvolvimento integral de cada estudante.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {faculty.map((teacher, index) => (
            <motion.div 
              key={index}
              className="group scroll-reveal"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg transform hover:scale-105 transition-all duration-500">
                <div className="relative overflow-hidden">
                  <motion.img 
                    src={teacher.image} 
                    alt={teacher.name} 
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    whileHover={{ scale: 1.1 }}
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                    initial={{ y: "100%" }}
                    whileHover={{ y: 0 }}
                  >
                    <p className="text-sm">{teacher.specialization}</p>
                    <p className="text-xs opacity-90">{teacher.experience}</p>
                  </motion.div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-secondary mb-1">{teacher.name}</h3>
                  <p className="text-primary font-medium mb-3">{teacher.position}</p>
                  <p className="text-gray-700 text-sm">{teacher.education}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="text-center mt-12 scroll-reveal"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <motion.button 
            className="bg-primary hover:bg-primary/80 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Ver Todo o Corpo Docente
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
