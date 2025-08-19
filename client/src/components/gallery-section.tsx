import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { getLocalImage } from "@/lib/local-images";

export default function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [currentCategory, setCurrentCategory] = useState("all");

  const categories = [
    { id: "all", name: "Todas" },
    { id: "campus", name: "Campus" },
    { id: "students", name: "Estudantes" },
    { id: "events", name: "Eventos" },
    { id: "facilities", name: "Instalações" }
  ];

  const images = [
    {
      id: 1,
      src: getLocalImage("screenshot"),
      alt: "Campus Principal",
      category: "campus",
      title: "Campus Principal",
      description: "Vista do edifício principal do Colégio Narfive"
    },
    {
      id: 2,
      src: getLocalImage("image1"),
      alt: "Colégio Narfive",
      category: "campus",
      title: "Instalações do Colégio",
      description: "Nossas modernas instalações educacionais"
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      alt: "Atividades Desportivas",
      category: "students",
      title: "Atividades Desportivas",
      description: "Estudantes participando em competições desportivas"
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      alt: "Biblioteca Moderna",
      category: "facilities",
      title: "Biblioteca Digital",
      description: "Espaço moderno de estudo e pesquisa"
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      alt: "Laboratório de Ciências",
      category: "facilities",
      title: "Laboratório de Ciências",
      description: "Equipamentos modernos para experimentação"
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      alt: "Festival Cultural",
      category: "events",
      title: "Festival Cultural Anual",
      description: "Celebração da diversidade cultural angolana"
    },
    {
      id: 7,
      src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      alt: "Sala de Aula Interativa",
      category: "facilities",
      title: "Salas de Aula Modernas",
      description: "Ambiente tecnológico para aprendizagem"
    },
    {
      id: 8,
      src: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      alt: "Estudantes em Ação",
      category: "students",
      title: "Estudantes em Ação",
      description: "Momentos de aprendizagem colaborativa"
    },
    {
      id: 9,
      src: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      alt: "Área Externa",
      category: "campus",
      title: "Jardins do Campus",
      description: "Espaços verdes para relaxamento"
    }
  ];

  const filteredImages = currentCategory === "all" 
    ? images 
    : images.filter(img => img.category === currentCategory);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % filteredImages.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? filteredImages.length - 1 : selectedImage - 1);
    }
  };

  return (
    <section id="gallery" className="py-20 bg-gradient-to-br from-neutral to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <motion.div 
          className="absolute top-10 left-10 w-32 h-32 bg-primary rounded-full rotate-slow"
        />
        <motion.div 
          className="absolute bottom-20 right-20 w-24 h-24 bg-primary/30 rounded-full floating-animation"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-6">
            Galeria <span className="text-primary">Fotográfica</span>
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Explore nosso campus, eventos e momentos especiais da vida estudantil através desta galeria interativa.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div 
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-wrap gap-2 sm:gap-4 p-2 bg-white rounded-full shadow-lg">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setCurrentCategory(category.id)}
                className={`px-3 sm:px-6 py-2 sm:py-3 rounded-full font-medium text-sm sm:text-base transition-all duration-300 ${
                  currentCategory === category.id
                    ? 'bg-primary text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.name}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Image Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          layout
        >
          <AnimatePresence mode="sync">
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
                className="group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer"
                onClick={() => openLightbox(index)}
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="font-bold text-lg mb-1">{image.title}</h3>
                  <p className="text-sm opacity-90">{image.description}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              onClick={closeLightbox}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative max-w-4xl max-h-[90vh] w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={filteredImages[selectedImage].src}
                  alt={filteredImages[selectedImage].alt}
                  className="w-full h-full object-contain rounded-lg"
                />
                
                {/* Close Button */}
                <button
                  onClick={closeLightbox}
                  className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors"
                >
                  <X size={24} />
                </button>

                {/* Navigation */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors"
                >
                  <ChevronLeft size={24} />
                </button>
                
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors"
                >
                  <ChevronRight size={24} />
                </button>

                {/* Image Info */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">{filteredImages[selectedImage].title}</h3>
                  <p className="text-gray-300">{filteredImages[selectedImage].description}</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}