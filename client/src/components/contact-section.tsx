import { useState } from "react";
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export default function ContactSection() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const { toast } = useToast();

  const submitContactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Sucesso!",
        description: data.message,
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erro",
        description: error.message || "Erro ao enviar mensagem. Tente novamente.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }
    submitContactMutation.mutate(formData);
  };

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const contactInfo = [
    {
      icon: "fas fa-map-marker-alt",
      title: "Endereço",
      content: "Rua da Educação, 123\nLuanda Sul, Angola"
    },
    {
      icon: "fas fa-phone",
      title: "Telefone",
      content: "+244 922 345 678"
    },
    {
      icon: "fas fa-envelope",
      title: "Email",
      content: "info@colegionarfive.ao"
    },
    {
      icon: "fas fa-clock",
      title: "Horário de Funcionamento",
      content: "Segunda a Sexta: 7:00 - 17:00\nSábado: 8:00 - 12:00"
    }
  ];

  const socialLinks = [
    { icon: "fab fa-facebook-f", href: "#" },
    { icon: "fab fa-instagram", href: "#" },
    { icon: "fab fa-linkedin-in", href: "#" },
    { icon: "fab fa-youtube", href: "#" }
  ];

  return (
    <section id="contact" className="py-20 bg-primary relative overflow-hidden">
      {/* Animated Wave Background */}
      <div className="absolute inset-0 opacity-10">
        <motion.div 
          className="absolute top-10 left-0 w-full h-32 bg-gradient-to-r from-white/20 via-white/10 to-white/20 rounded-full"
          animate={{
            x: [-200, 200, -200],
            scaleX: [1, 1.5, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-20 right-0 w-full h-24 bg-gradient-to-l from-white/15 via-white/5 to-white/15 rounded-full"
          animate={{
            x: [200, -200, 200],
            scaleX: [1, 1.3, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-1/2 left-0 w-full h-20 bg-gradient-to-r from-white/10 via-white/20 to-white/10 rounded-full"
          animate={{
            x: [-300, 300, -300],
            scaleY: [1, 1.8, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 60, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Entre em <span className="text-white/80">Contato</span>
          </h2>
          <p className="text-lg text-white/90 max-w-3xl mx-auto">
            Estamos aqui para responder às suas perguntas e ajudar no processo de admissão. Venha nos visitar e conhecer nossa comunidade educacional.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Information */}
          <motion.div 
            className="scroll-reveal enhanced-parallax"
            initial={{ opacity: 0, x: -60, rotateY: -10 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 border border-white/30 shadow-2xl section-transition">
              <motion.div 
                className="absolute -top-2 -right-2 w-6 h-6 bg-primary/40 rounded-full pulse-glow"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.4, 0.8, 0.4],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <h3 className="text-2xl font-bold text-secondary mb-8">Informações de Contato</h3>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start space-x-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="bg-primary/20 p-3 rounded-full">
                      <i className={`${info.icon} text-primary`}></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-secondary mb-1">{info.title}</h4>
                      <p className="text-gray-700 whitespace-pre-line">{info.content}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social Media */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h4 className="font-semibold text-secondary mb-4">Siga-nos</h4>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      className="bg-primary/20 p-3 rounded-full hover:bg-primary/30 transition-colors duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <i className={`${social.icon} text-primary`}></i>
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            className="scroll-reveal enhanced-parallax"
            initial={{ opacity: 0, x: 60, rotateY: 10 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-2xl p-8 shadow-2xl section-transition relative">
              <motion.div 
                className="absolute -top-3 -left-3 w-8 h-8 bg-primary/20 rounded-full floating-animation"
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <h3 className="text-2xl font-bold text-secondary mb-6">Envie-nos uma Mensagem</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-2">
                      Nome Completo *
                    </label>
                    <Input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Seu nome completo"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-2">
                      Email *
                    </label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="seu.email@exemplo.com"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-2">
                      Telefone
                    </label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+244 900 000 000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-2">
                      Assunto *
                    </label>
                    <Select value={formData.subject} onValueChange={(value) => handleInputChange('subject', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um assunto" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Informações Gerais">Informações Gerais</SelectItem>
                        <SelectItem value="Processo de Admissão">Processo de Admissão</SelectItem>
                        <SelectItem value="Programas Académicos">Programas Académicos</SelectItem>
                        <SelectItem value="Visita ao Campus">Visita ao Campus</SelectItem>
                        <SelectItem value="Outro">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-2">
                    Mensagem *
                  </label>
                  <Textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder="Escreva sua mensagem aqui..."
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/80 text-white py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                  disabled={submitContactMutation.isPending}
                >
                  {submitContactMutation.isPending ? (
                    <>
                      <i className="fas fa-spinner fa-spin mr-2"></i>
                      Enviando...
                    </>
                  ) : (
                    <>
                      Enviar Mensagem
                      <i className="fas fa-paper-plane ml-2"></i>
                    </>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
