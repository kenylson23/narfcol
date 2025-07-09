import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Phone, Mail, Check, User, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function VisitScheduler() {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedTour, setSelectedTour] = useState("");
  const [visitorCount, setVisitorCount] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    studentName: "",
    studentAge: "",
    interests: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const tourTypes = [
    { id: "general", name: "Tour Geral", duration: "1h", description: "Visita completa às instalações" },
    { id: "academic", name: "Foco Acadêmico", duration: "45min", description: "Salas de aula, laboratórios e biblioteca" },
    { id: "sports", name: "Instalações Desportivas", duration: "30min", description: "Ginásio, campos e piscina" },
    { id: "arts", name: "Artes e Cultura", duration: "40min", description: "Estúdios, teatro e espaços culturais" },
    { id: "boarding", name: "Vida Estudantil", duration: "50min", description: "Cantina, dormitórios e áreas de convivência" }
  ];

  const timeSlots = [
    "08:00", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"
  ];

  const visitorOptions = [
    { value: "1", label: "1 pessoa" },
    { value: "2", label: "2 pessoas" },
    { value: "3", label: "3-4 pessoas" },
    { value: "5", label: "5+ pessoas" }
  ];

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        studentName: "",
        studentAge: "",
        interests: ""
      });
      setSelectedDate("");
      setSelectedTime("");
      setSelectedTour("");
      setVisitorCount("");
    }, 3000);
  };

  const isFormValid = selectedDate && selectedTime && selectedTour && visitorCount && 
                     formData.name && formData.email && formData.phone;

  // Generate available dates (next 30 days, excluding weekends)
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Skip weekends
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push({
          value: date.toISOString().split('T')[0],
          label: date.toLocaleDateString('pt-PT', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })
        });
      }
    }
    
    return dates;
  };

  if (isSubmitted) {
    return (
      <section className="py-20 bg-gradient-to-br from-green-50 to-green-100 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-white rounded-2xl p-12 shadow-2xl"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Check className="text-white" size={40} />
            </motion.div>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Visita Agendada com Sucesso!
            </h2>
            
            <p className="text-lg text-gray-600 mb-8">
              Obrigado pelo seu interesse no Colégio Narfive. Entraremos em contato em breve para confirmar os detalhes da sua visita.
            </p>
            
            <div className="bg-gray-50 rounded-lg p-6 text-left max-w-md mx-auto">
              <h3 className="font-semibold text-gray-900 mb-4">Detalhes da Visita:</h3>
              <div className="space-y-2 text-sm">
                <p><strong>Data:</strong> {selectedDate}</p>
                <p><strong>Horário:</strong> {selectedTime}</p>
                <p><strong>Tipo:</strong> {tourTypes.find(t => t.id === selectedTour)?.name}</p>
                <p><strong>Visitantes:</strong> {visitorOptions.find(v => v.value === visitorCount)?.label}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="visit-scheduler" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <motion.div 
          className="absolute top-10 left-10 w-28 h-28 bg-primary rounded-full floating-animation"
        />
        <motion.div 
          className="absolute bottom-20 right-20 w-20 h-20 bg-primary/30 rounded-full pulse-glow"
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
            Agendar <span className="text-primary">Visita</span>
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Venha conhecer pessoalmente o Colégio Narfive. Agende sua visita e descubra por que somos a escolha certa para o futuro do seu filho.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Tour Options */}
          <motion.div 
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-2xl p-6 shadow-xl">
              <h3 className="text-xl font-bold text-secondary mb-6 flex items-center">
                <MapPin className="mr-2 text-primary" size={24} />
                Tipos de Visita
              </h3>
              
              <div className="space-y-4">
                {tourTypes.map((tour) => (
                  <motion.button
                    key={tour.id}
                    onClick={() => setSelectedTour(tour.id)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-300 ${
                      selectedTour === tour.id
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-200 hover:border-primary/50'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{tour.name}</h4>
                      <span className="text-sm text-primary font-medium flex items-center">
                        <Clock size={14} className="mr-1" />
                        {tour.duration}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{tour.description}</p>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Booking Form */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-secondary mb-6 flex items-center">
                <Calendar className="mr-2 text-primary" size={28} />
                Agendar Visita
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Date Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Data Preferida *
                    </label>
                    <Select value={selectedDate} onValueChange={setSelectedDate}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a data" />
                      </SelectTrigger>
                      <SelectContent>
                        {getAvailableDates().map((date) => (
                          <SelectItem key={date.value} value={date.value}>
                            {date.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Time Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Horário *
                    </label>
                    <Select value={selectedTime} onValueChange={setSelectedTime}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o horário" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Number of Visitors */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Número de Visitantes *
                  </label>
                  <Select value={visitorCount} onValueChange={setVisitorCount}>
                    <SelectTrigger>
                      <SelectValue placeholder="Quantas pessoas irão visitar?" />
                    </SelectTrigger>
                    <SelectContent>
                      {visitorOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <User className="inline mr-1" size={16} />
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Mail className="inline mr-1" size={16} />
                      Email *
                    </label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="seu@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Phone className="inline mr-1" size={16} />
                      Telefone *
                    </label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+244 900 000 000"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <UserCheck className="inline mr-1" size={16} />
                      Nome do Estudante
                    </label>
                    <Input
                      type="text"
                      value={formData.studentName}
                      onChange={(e) => handleInputChange('studentName', e.target.value)}
                      placeholder="Nome do futuro aluno"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Idade do Estudante
                    </label>
                    <Select value={formData.studentAge} onValueChange={(value) => handleInputChange('studentAge', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a idade" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({length: 18}, (_, i) => i + 3).map((age) => (
                          <SelectItem key={age} value={age.toString()}>
                            {age} anos
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Interesses Especiais
                    </label>
                    <Textarea
                      value={formData.interests}
                      onChange={(e) => handleInputChange('interests', e.target.value)}
                      placeholder="Desportos, artes, ciências, etc."
                      rows={3}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6">
                  <div className="text-sm text-gray-600">
                    * Campos obrigatórios
                  </div>
                  
                  <Button
                    type="submit"
                    disabled={!isFormValid}
                    className="bg-primary hover:bg-primary/80 text-white px-8 py-3 font-semibold"
                  >
                    <Calendar className="mr-2" size={20} />
                    Agendar Visita
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Contact Information */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-secondary mb-4">
              Precisa de Ajuda?
            </h3>
            <p className="text-gray-600 mb-6">
              Entre em contato connosco para mais informações ou para agendar sua visita por telefone.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="flex items-center text-gray-700">
                <Phone className="mr-2 text-primary" size={20} />
                <span>+244 922 345 678</span>
              </div>
              <div className="flex items-center text-gray-700">
                <Mail className="mr-2 text-primary" size={20} />
                <span>visitas@colegionarfive.ao</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}