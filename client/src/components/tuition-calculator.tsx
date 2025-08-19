import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calculator, GraduationCap, Users, Clock, DollarSign } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function TuitionCalculator() {
  const [selectedProgram, setSelectedProgram] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");
  const [selectedPayment, setSelectedPayment] = useState("");
  const [extraActivities, setExtraActivities] = useState<string[]>([]);
  const [initialCosts, setInitialCosts] = useState(0);
  const [recurringMonthlyCosts, setRecurringMonthlyCosts] = useState(0);
  const [recurringAnnualCosts, setRecurringAnnualCosts] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const programs = {
    "mundo-magico": {
      name: "🌟 Mundo Mágico (Educação Infantil)",
      icon: "🧸",
      description: "Metodologia lúdica e desenvolvimento integral",
      grades: [
        { id: "pre-escolar", name: "Pré-escolar", monthlyCost: 24000 },
        { id: "iniciacao", name: "Iniciação", monthlyCost: 24500 }
      ]
    },
    "ensino-primario": {
      name: "📚 Ensino Primário",
      icon: "🎒",
      description: "Base sólida em todas as disciplinas fundamentais",
      grades: [
        { id: "1a", name: "1ª Classe", monthlyCost: 25000 },
        { id: "2a", name: "2ª Classe", monthlyCost: 25500 },
        { id: "3a", name: "3ª Classe", monthlyCost: 26000 },
        { id: "4a", name: "4ª Classe", monthlyCost: 26500 },
        { id: "5a", name: "5ª Classe", monthlyCost: 27000 },
        { id: "6a", name: "6ª Classe", monthlyCost: 28000 }
      ]
    },
    "i-ciclo-secundario": {
      name: "🏫 I Ciclo – Ensino Secundário",
      icon: "📖",
      description: "Formação geral com disciplinas fundamentais",
      grades: [
        { id: "7a", name: "7ª Classe", monthlyCost: 26500 },
        { id: "8a", name: "8ª Classe", monthlyCost: 27000 },
        { id: "9a", name: "9ª Classe", monthlyCost: 28000 }
      ]
    },
    "ii-ciclo-puniv": {
      name: "🏫 II Ciclo – PUNIV (C.F.B / C.E.J.)",
      icon: "🎓",
      description: "Cursos Gerais para preparação universitária",
      grades: [
        { id: "10a-cfb", name: "10ª Classe", monthlyCost: 28000 },
        { id: "11a-cfb", name: "11ª Classe", monthlyCost: 29000 },
        { id: "12a-cfb", name: "12ª Classe", monthlyCost: 29000 }
      ]
    },
    "medio-tecnico": {
      name: "🏫 II Ciclo – Médio Técnico (INFOGEST / CONGEST)",
      icon: "💼",
      description: "Formação técnica profissional especializada",
      grades: [
        { id: "10a-tec", name: "10ª Classe", monthlyCost: 29000 },
        { id: "11a-tec", name: "11ª Classe", monthlyCost: 32000 },
        { id: "12a-tec", name: "12ª Classe", monthlyCost: 32000 },
        { id: "13a-tec", name: "13ª Classe", monthlyCost: 33000 }
      ]
    }
  };

  const academicYears = [
    { id: "2024-2025", name: "Ano Letivo 2024/2025", multiplier: 1, status: "atual" },
    { id: "2025-2026", name: "Ano Letivo 2025/2026", multiplier: 1.05, status: "próximo" }
  ];

  const getAvailableGrades = () => {
    if (!selectedProgram || !programs[selectedProgram as keyof typeof programs]) return [];
    return programs[selectedProgram as keyof typeof programs].grades;
  };

  // Initial costs structure
  const initialCostsStructure = {
    enrollment: 45000,      // Matrícula
    confirmation: 25000,    // Confirmação
    insurance: 15000,       // Seguro
    uniforms: 35000,        // Uniformes
    card: 5000              // Cartão
  };

  const paymentPlans = [
    { 
      id: "monthly", 
      name: "Pagamento Mensal", 
      discount: 0, 
      installments: 9, 
      description: "9 mensalidades durante o ano letivo",
      additionalFees: 0
    },
    { 
      id: "quarterly", 
      name: "Pagamento Trimestral", 
      discount: 0.03, 
      installments: 3, 
      description: "3 pagamentos trimestrais",
      additionalFees: 0
    },
    { 
      id: "semester", 
      name: "Pagamento Semestral", 
      discount: 0.06, 
      installments: 2, 
      description: "2 pagamentos semestrais",
      additionalFees: 0
    }
  ];

  // Transport options by zone (separate from activities)
  const transportOptions = [
    {
      id: "transport-zango-0",
      name: "Transporte Zango 0",
      monthlyCost: 27000,
      icon: "🚌",
      description: "Transporte casa-escola-casa - Zona Zango 0",
      zone: "Zango 0"
    },
    {
      id: "transport-zango-1-2",
      name: "Transporte Zango 1,2",
      monthlyCost: 27000,
      icon: "🚌",
      description: "Transporte casa-escola-casa - Zona Zango 1 e 2",
      zone: "Zango 1,2"
    },
    {
      id: "transport-zango-3-sector-a",
      name: "Transporte Zango 3 Sector A",
      monthlyCost: 27000,
      icon: "🚌",
      description: "Transporte casa-escola-casa - Zona Zango 3 Sector A",
      zone: "Zango 3 Sector A"
    },
    {
      id: "transport-zango-3-sector-b",
      name: "Transporte Zango 3 Sector B",
      monthlyCost: 27000,
      icon: "🚌",
      description: "Transporte casa-escola-casa - Zona Zango 3 Sector B",
      zone: "Zango 3 Sector B"
    },
    {
      id: "transport-zango-4",
      name: "Transporte Zango 4",
      monthlyCost: 27000,
      icon: "🚌",
      description: "Transporte casa-escola-casa - Zona Zango 4",
      zone: "Zango 4"
    },
    {
      id: "transport-zango-5",
      name: "Transporte Zango 5",
      monthlyCost: 28000,
      icon: "🚌",
      description: "Transporte casa-escola-casa - Zona Zango 5",
      zone: "Zango 5"
    }
  ];

  // Extra activities (monthly cost)
  const activities = [
    { 
      id: "swimming", 
      name: "Natação", 
      monthlyCost: 35000, 
      icon: "🏊", 
      description: "Aulas de natação na piscina do colégio",
      category: "Desporto"
    },
    { 
      id: "music", 
      name: "Música e Canto Coral", 
      monthlyCost: 25000, 
      icon: "🎵", 
      description: "Piano, violão, canto e teoria musical",
      category: "Arte"
    },
    { 
      id: "art", 
      name: "Artes Visuais e Plásticas", 
      monthlyCost: 22000, 
      icon: "🎨", 
      description: "Desenho, pintura e escultura",
      category: "Arte"
    },
    { 
      id: "english", 
      name: "Inglês Avançado", 
      monthlyCost: 28000, 
      icon: "🇬🇧", 
      description: "Preparação para certificações internacionais",
      category: "Idiomas"
    },
    { 
      id: "french", 
      name: "Francês", 
      monthlyCost: 26000, 
      icon: "🇫🇷", 
      description: "Língua francesa desde o nível básico",
      category: "Idiomas"
    },
    { 
      id: "informatics", 
      name: "Informática e Programação", 
      monthlyCost: 30000, 
      icon: "💻", 
      description: "Office, programação básica e design gráfico",
      category: "Tecnologia"
    },
    { 
      id: "robotics", 
      name: "Robótica e Ciências", 
      monthlyCost: 38000, 
      icon: "🤖", 
      description: "Experimentos científicos e construção de robots",
      category: "Tecnologia"
    },
    { 
      id: "drama", 
      name: "Teatro e Expressão Dramática", 
      monthlyCost: 20000, 
      icon: "🎭", 
      description: "Desenvolvimento da expressão oral e corporal",
      category: "Arte"
    },
    { 
      id: "study-support", 
      name: "Apoio ao Estudo", 
      monthlyCost: 15000, 
      icon: "📚", 
      description: "Reforço escolar em horário pós-letivo",
      category: "Apoio"
    },
    { 
      id: "meals", 
      name: "Alimentação Completa", 
      monthlyCost: 35000, 
      icon: "🍽️", 
      description: "Lanche da manhã, almoço e lanche da tarde",
      category: "Serviços"
    }
  ];

  const toggleActivity = (activityId: string) => {
    setExtraActivities(prev => 
      prev.includes(activityId) 
        ? prev.filter(id => id !== activityId)
        : [...prev, activityId]
    );
  };

  const calculateTotal = () => {
    if (!selectedProgram || !selectedGrade || !selectedPayment) return;

    const program = programs[selectedProgram as keyof typeof programs];
    const grade = program?.grades.find(g => g.id === selectedGrade);
    const paymentPlan = paymentPlans.find(p => p.id === selectedPayment);
    
    if (!program || !grade || !paymentPlan) return;

    // 🔹 PARTE 1 - PAGAMENTO INICIAL (uma única vez)
    const totalInitialCosts = Object.values(initialCostsStructure).reduce((sum, cost) => sum + cost, 0);
    
    // 🔹 PARTE 2 - PAGAMENTO RECORRENTE (mensal)
    let monthlyRecurring = grade.monthlyCost; // Mensalidade base
    
    // Add transport if selected (only one transport option can be selected)
    const selectedTransport = extraActivities.find(id => id.startsWith('transport-'));
    if (selectedTransport) {
      const transportOption = transportOptions.find(t => t.id === selectedTransport);
      if (transportOption) {
        monthlyRecurring += transportOption.monthlyCost;
      }
    }
    
    // Add extra activities (excluding transport)
    const activitiesCost = extraActivities
      .filter(activityId => !activityId.startsWith('transport-'))
      .reduce((total, activityId) => {
        const activity = activities.find(a => a.id === activityId);
        return total + (activity ? activity.monthlyCost : 0);
      }, 0);
    
    monthlyRecurring += activitiesCost;
    
    // Apply discount to recurring costs
    const discountAmount = monthlyRecurring * 9 * paymentPlan.discount;
    const annualRecurringDiscounted = (monthlyRecurring * 9) - discountAmount;
    
    setInitialCosts(totalInitialCosts);
    setRecurringMonthlyCosts(monthlyRecurring);
    setRecurringAnnualCosts(annualRecurringDiscounted);
    setShowResults(true);
  };

  const getCurrentGrade = () => {
    if (!selectedProgram || !selectedGrade) return null;
    const program = programs[selectedProgram as keyof typeof programs];
    return program?.grades.find(g => g.id === selectedGrade);
  };

  const getCurrentProgram = () => {
    if (!selectedProgram) return null;
    return programs[selectedProgram as keyof typeof programs];
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-AO', {
      style: 'currency',
      currency: 'AOA',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getPaymentPlan = () => {
    const plan = paymentPlans.find(p => p.id === selectedPayment);
    return plan ? plan : null;
  };

  return (
    <section id="tuition-calculator" className="py-20 bg-gradient-to-br from-primary/5 to-primary/10 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <motion.div 
          className="absolute top-10 left-10 w-24 h-24 bg-primary rounded-full floating-animation"
        />
        <motion.div 
          className="absolute bottom-20 right-20 w-32 h-32 bg-primary/30 rounded-full rotate-slow"
        />
        <motion.div 
          className="absolute top-1/2 right-1/4 w-16 h-16 bg-primary/20 rounded-full pulse-glow"
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
            Calculadora de <span className="text-primary">Mensalidades</span>
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Calcule o valor da mensalidade personalizada para o seu filho, incluindo atividades extras e planos de pagamento.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Calculator Form */}
          <motion.div 
            className="bg-white rounded-2xl p-8 shadow-xl"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center mb-6">
              <Calculator className="text-primary mr-3" size={28} />
              <h3 className="text-2xl font-bold text-secondary">Configure sua Mensalidade</h3>
            </div>

            <div className="space-y-6">
              {/* Program Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <GraduationCap className="inline mr-2" size={16} />
                  Programa de Ensino
                </label>
                <Select value={selectedProgram} onValueChange={(value) => {
                  setSelectedProgram(value);
                  setSelectedGrade(""); // Reset grade when program changes
                  setShowResults(false);
                }}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione o programa" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(programs).map(([key, program]) => (
                      <SelectItem key={key} value={key}>
                        <div className="flex items-center w-full">
                          <span className="mr-2">{program.icon}</span>
                          <div className="flex-1">
                            <div className="font-medium">{program.name}</div>
                            <div className="text-xs text-gray-500">{program.description}</div>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Grade Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Users className="inline mr-2" size={16} />
                  Classe/Ano
                </label>
                <Select 
                  value={selectedGrade} 
                  onValueChange={setSelectedGrade}
                  disabled={!selectedProgram}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={selectedProgram ? "Selecione a classe" : "Primeiro selecione o programa"} />
                  </SelectTrigger>
                  <SelectContent>
                    {getAvailableGrades().map((grade) => (
                      <SelectItem key={grade.id} value={grade.id}>
                        <div className="flex items-center justify-between w-full">
                          <span>{grade.name}</span>
                          <span className="ml-4 text-primary font-semibold">
                            {formatCurrency(grade.monthlyCost)}/mês
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Payment Plan */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Clock className="inline mr-2" size={16} />
                  Plano de Pagamento
                </label>
                <Select value={selectedPayment} onValueChange={setSelectedPayment}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione o plano" />
                  </SelectTrigger>
                  <SelectContent>
                    {paymentPlans.map((plan) => (
                      <SelectItem key={plan.id} value={plan.id}>
                        <div className="flex items-center justify-between w-full">
                          <span>{plan.name}</span>
                          {plan.discount > 0 && (
                            <span className="text-green-600 font-semibold">
                              -{Math.round(plan.discount * 100)}%
                            </span>
                          )}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Transport */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Transporte Escolar (Opcional - Selecione apenas uma zona)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {transportOptions.map((transport) => {
                    const isSelected = extraActivities.includes(transport.id);
                    const hasOtherTransport = extraActivities.some(id => id.startsWith('transport-') && id !== transport.id);
                    
                    return (
                      <motion.button
                        key={transport.id}
                        onClick={() => {
                          // Remove any previously selected transport first
                          const withoutTransport = extraActivities.filter(id => !id.startsWith('transport-'));
                          if (isSelected) {
                            // If clicking on selected transport, deselect it
                            setExtraActivities(withoutTransport);
                          } else {
                            // If clicking on new transport, select only this one
                            setExtraActivities([...withoutTransport, transport.id]);
                          }
                        }}
                        disabled={hasOtherTransport && !isSelected}
                        className={`p-3 rounded-lg border transition-all duration-300 ${
                          isSelected
                            ? 'bg-primary text-white border-primary'
                            : hasOtherTransport
                            ? 'bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed'
                            : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-primary'
                        }`}
                        whileHover={!hasOtherTransport || isSelected ? { scale: 1.02 } : {}}
                        whileTap={!hasOtherTransport || isSelected ? { scale: 0.98 } : {}}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <span className="text-lg mr-3">{transport.icon}</span>
                            <div>
                              <div className="text-sm font-medium text-left">{transport.zone}</div>
                              <div className="text-xs opacity-80 text-left">{transport.description}</div>
                            </div>
                          </div>
                          <div className="text-sm font-semibold">
                            {formatCurrency(transport.monthlyCost)}/mês
                          </div>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Extra Activities */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Atividades Extracurriculares (Opcional)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activities.map((activity) => (
                    <motion.button
                      key={activity.id}
                      onClick={() => toggleActivity(activity.id)}
                      className={`p-2 sm:p-3 rounded-lg border transition-all duration-300 ${
                        extraActivities.includes(activity.id)
                          ? 'bg-primary text-white border-primary'
                          : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-primary'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="text-base sm:text-lg mb-1">{activity.icon}</div>
                      <div className="text-xs sm:text-sm font-medium">{activity.name}</div>
                      <div className="text-xs opacity-80">{formatCurrency(activity.monthlyCost)}/mês</div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Calculate Button */}
              <Button 
                onClick={calculateTotal}
                className="w-full bg-primary hover:bg-primary/80 text-white py-4 text-lg font-semibold"
                disabled={!selectedProgram || !selectedGrade || !selectedPayment}
              >
                <DollarSign className="mr-2" size={20} />
                Calcular Mensalidade
              </Button>
            </div>
          </motion.div>

          {/* Results Panel */}
          <motion.div 
            className="bg-white rounded-2xl p-8 shadow-xl"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-secondary mb-6">Resumo da Mensalidade</h3>
            
            {showResults && selectedProgram && selectedGrade && selectedPayment ? (
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Program Details */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Programa Selecionado:</span>
                    <span className="text-primary font-semibold text-sm">
                      {getCurrentProgram()?.name}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Classe:</span>
                    <span className="text-primary font-semibold">
                      {getCurrentGrade()?.name}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Valor Mensal:</span>
                    <span className="font-semibold">
                      {formatCurrency(getCurrentGrade()?.monthlyCost || 0)}
                    </span>
                  </div>
                </div>

                {/* Payment Plan Details */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Plano de Pagamento:</span>
                    <span className="text-primary font-semibold">
                      {getPaymentPlan()?.name}
                    </span>
                  </div>
                  {getPaymentPlan()?.discount && getPaymentPlan()!.discount > 0 && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-green-600">Desconto:</span>
                      <span className="font-semibold text-green-600">
                        -{Math.round(getPaymentPlan()!.discount * 100)}%
                      </span>
                    </div>
                  )}
                </div>

                {/* Selected Extras */}
                {extraActivities.length > 0 && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="font-medium mb-2">Serviços e Atividades Selecionados:</div>
                    <div className="space-y-1">
                      {extraActivities.map((itemId) => {
                        // Check if it's transport
                        const transport = transportOptions.find(t => t.id === itemId);
                        if (transport) {
                          return (
                            <div key={itemId} className="flex items-center justify-between text-sm">
                              <span>{transport.icon} {transport.zone}</span>
                              <span className="font-semibold text-blue-600">{formatCurrency(transport.monthlyCost)}/mês</span>
                            </div>
                          );
                        }
                        
                        // Check if it's an activity
                        const activity = activities.find(a => a.id === itemId);
                        if (activity) {
                          return (
                            <div key={itemId} className="flex items-center justify-between text-sm">
                              <span>{activity.icon} {activity.name}</span>
                              <span className="font-semibold text-green-600">{formatCurrency(activity.monthlyCost)}/mês</span>
                            </div>
                          );
                        }
                        
                        return null;
                      })}
                    </div>
                  </div>
                )}

                {/* Total */}
                <div className="bg-primary/10 rounded-lg p-6 border-2 border-primary/20">
                  <div className="space-y-4">
                    {/* Initial Costs */}
                    <div className="border-b pb-3">
                      <div className="text-sm font-medium text-gray-600 mb-2">🔹 Pagamento Inicial (uma vez):</div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">Matrícula + Confirmação + Seguro + Uniformes + Cartão</span>
                        <span className="font-bold text-primary">
                          {formatCurrency(initialCosts)}
                        </span>
                      </div>
                    </div>
                    
                    {/* Recurring Costs */}
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-gray-600">🔹 Pagamento Recorrente (9 meses):</div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">Por mês:</span>
                        <span className="font-semibold">
                          {formatCurrency(recurringMonthlyCosts)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">Total 9 meses:</span>
                        <span className="font-bold text-secondary">
                          {formatCurrency(recurringAnnualCosts)}
                        </span>
                      </div>
                    </div>
                    
                    {/* Grand Total */}
                    <div className="border-t pt-3">
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-secondary">TOTAL GERAL:</span>
                        <span className="text-2xl font-bold text-primary">
                          {formatCurrency(initialCosts + recurringAnnualCosts)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Button */}
                <motion.button
                  className="w-full bg-secondary hover:bg-secondary/80 text-white py-4 rounded-lg font-semibold transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Solicitar Informações
                </motion.button>
              </motion.div>
            ) : (
              <div className="text-center py-12">
                <Calculator className="mx-auto text-gray-400 mb-4" size={48} />
                <p className="text-gray-500">
                  Selecione um programa e plano de pagamento para ver o cálculo da mensalidade.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}