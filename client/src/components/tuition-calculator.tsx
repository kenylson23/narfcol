import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calculator, GraduationCap, Users, Clock, DollarSign } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function TuitionCalculator() {
  const [selectedProgram, setSelectedProgram] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedPayment, setSelectedPayment] = useState("");
  const [extraActivities, setExtraActivities] = useState<string[]>([]);
  const [totalCost, setTotalCost] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const programs = [
    { 
      id: "mundo-magico", 
      name: "Mundo Mágico (Educação Infantil)", 
      baseCost: 85000, 
      icon: "🧸",
      description: "Pré-escolar e Iniciação - Metodologia lúdica e desenvolvimento integral",
      enrollmentFee: 25000,
      grades: "Pré-escolar e Iniciação"
    },
    { 
      id: "ensino-primario", 
      name: "Ensino Primário", 
      baseCost: 130000, 
      icon: "🎒",
      description: "Da 1ª à 6ª Classe - Base sólida em todas as disciplinas fundamentais",
      enrollmentFee: 35000,
      grades: "1ª à 6ª Classe"
    },
    { 
      id: "i-ciclo-secundario", 
      name: "I Ciclo - Ensino Secundário", 
      baseCost: 165000, 
      icon: "📖",
      description: "Da 7ª à 9ª Classe - Formação geral com disciplinas fundamentais",
      enrollmentFee: 45000,
      grades: "7ª à 9ª Classe"
    },
    { 
      id: "ii-ciclo-puniv", 
      name: "II Ciclo PUNIV (C.F.B / C.E.J.)", 
      baseCost: 195000, 
      icon: "🎓",
      description: "Da 10ª à 12ª Classe - Cursos Gerais para preparação universitária",
      enrollmentFee: 55000,
      grades: "10ª à 12ª Classe"
    },
    { 
      id: "medio-tecnico", 
      name: "Médio Técnico (INFOGEST / CONGEST)", 
      baseCost: 220000, 
      icon: "💼",
      description: "Da 10ª à 13ª Classe - Formação técnica profissional",
      enrollmentFee: 65000,
      grades: "10ª à 13ª Classe"
    }
  ];

  const years = [
    { id: "2024-2025", name: "Ano Letivo 2024/2025", multiplier: 1, status: "atual" },
    { id: "2025-2026", name: "Ano Letivo 2025/2026", multiplier: 1.05, status: "próximo" }
  ];

  const paymentPlans = [
    { 
      id: "monthly", 
      name: "Pagamento Mensal", 
      discount: 0, 
      installments: 10, 
      description: "10 mensalidades de setembro a junho",
      additionalFees: 5000
    },
    { 
      id: "quarterly", 
      name: "Pagamento Trimestral", 
      discount: 0.03, 
      installments: 3, 
      description: "3 pagamentos por ano letivo",
      additionalFees: 2000
    },
    { 
      id: "semester", 
      name: "Pagamento Semestral", 
      discount: 0.06, 
      installments: 2, 
      description: "2 pagamentos por ano letivo",
      additionalFees: 1000
    },
    { 
      id: "annual", 
      name: "Pagamento Anual", 
      discount: 0.10, 
      installments: 1, 
      description: "Pagamento único no início do ano",
      additionalFees: 0
    }
  ];

  const activities = [
    { 
      id: "sports", 
      name: "Educação Física e Desportos", 
      cost: 18000, 
      icon: "⚽", 
      description: "Futebol, basquetebol, voleibol e atletismo",
      category: "Desporto"
    },
    { 
      id: "swimming", 
      name: "Natação", 
      cost: 35000, 
      icon: "🏊", 
      description: "Aulas de natação na piscina do colégio",
      category: "Desporto"
    },
    { 
      id: "music", 
      name: "Música e Canto Coral", 
      cost: 25000, 
      icon: "🎵", 
      description: "Piano, violão, canto e teoria musical",
      category: "Arte"
    },
    { 
      id: "art", 
      name: "Artes Visuais e Plásticas", 
      cost: 22000, 
      icon: "🎨", 
      description: "Desenho, pintura e escultura",
      category: "Arte"
    },
    { 
      id: "english", 
      name: "Inglês Avançado", 
      cost: 28000, 
      icon: "🇬🇧", 
      description: "Preparação para certificações internacionais",
      category: "Idiomas"
    },
    { 
      id: "french", 
      name: "Francês", 
      cost: 26000, 
      icon: "🇫🇷", 
      description: "Língua francesa desde o nível básico",
      category: "Idiomas"
    },
    { 
      id: "informatics", 
      name: "Informática e Programação", 
      cost: 30000, 
      icon: "💻", 
      description: "Office, programação básica e design gráfico",
      category: "Tecnologia"
    },
    { 
      id: "robotics", 
      name: "Robótica e Ciências", 
      cost: 38000, 
      icon: "🤖", 
      description: "Experimentos científicos e construção de robots",
      category: "Tecnologia"
    },
    { 
      id: "drama", 
      name: "Teatro e Expressão Dramática", 
      cost: 20000, 
      icon: "🎭", 
      description: "Desenvolvimento da expressão oral e corporal",
      category: "Arte"
    },
    { 
      id: "study-support", 
      name: "Apoio ao Estudo", 
      cost: 15000, 
      icon: "📚", 
      description: "Reforço escolar em horário pós-letivo",
      category: "Apoio"
    },
    { 
      id: "transport", 
      name: "Transporte Escolar", 
      cost: 45000, 
      icon: "🚌", 
      description: "Transporte casa-escola-casa com segurança",
      category: "Serviços"
    },
    { 
      id: "meals", 
      name: "Alimentação Completa", 
      cost: 35000, 
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
    if (!selectedProgram || !selectedPayment) return;

    const program = programs.find(p => p.id === selectedProgram);
    const paymentPlan = paymentPlans.find(p => p.id === selectedPayment);
    
    if (!program || !paymentPlan) return;

    let baseCost = program.baseCost;
    
    // Apply discount
    const discountAmount = baseCost * paymentPlan.discount;
    const discountedCost = baseCost - discountAmount;
    
    // Add extra activities
    const activitiesCost = extraActivities.reduce((total, activityId) => {
      const activity = activities.find(a => a.id === activityId);
      return total + (activity ? activity.cost : 0);
    }, 0);
    
    const total = discountedCost + activitiesCost;
    setTotalCost(total);
    setShowResults(true);
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
                <Select value={selectedProgram} onValueChange={setSelectedProgram}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione o programa" />
                  </SelectTrigger>
                  <SelectContent>
                    {programs.map((program) => (
                      <SelectItem key={program.id} value={program.id}>
                        <div className="flex items-center">
                          <span className="mr-2">{program.icon}</span>
                          <span>{program.name}</span>
                          <span className="ml-auto text-primary font-semibold">
                            {formatCurrency(program.baseCost)}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Year Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Users className="inline mr-2" size={16} />
                  Ano Letivo
                </label>
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione o ano" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year.id} value={year.id}>
                        {year.name}
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

              {/* Extra Activities */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
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
                      <div className="text-xs opacity-80">{formatCurrency(activity.cost)}</div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Calculate Button */}
              <Button 
                onClick={calculateTotal}
                className="w-full bg-primary hover:bg-primary/80 text-white py-4 text-lg font-semibold"
                disabled={!selectedProgram || !selectedPayment}
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
            
            {showResults && selectedProgram && selectedPayment ? (
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
                    <span className="text-primary font-semibold">
                      {programs.find(p => p.id === selectedProgram)?.name}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Valor Base:</span>
                    <span className="font-semibold">
                      {formatCurrency(programs.find(p => p.id === selectedProgram)?.baseCost || 0)}
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

                {/* Extra Activities */}
                {extraActivities.length > 0 && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="font-medium mb-2">Atividades Extras:</div>
                    {extraActivities.map((activityId) => {
                      const activity = activities.find(a => a.id === activityId);
                      return activity ? (
                        <div key={activityId} className="flex items-center justify-between text-sm">
                          <span>{activity.icon} {activity.name}</span>
                          <span className="font-semibold">{formatCurrency(activity.cost)}</span>
                        </div>
                      ) : null;
                    })}
                  </div>
                )}

                {/* Total */}
                <div className="bg-primary/10 rounded-lg p-6 border-2 border-primary/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg font-bold text-secondary">Total Anual:</span>
                    <span className="text-2xl font-bold text-primary">
                      {formatCurrency(totalCost)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Por {getPaymentPlan()?.name.toLowerCase()}:
                    </span>
                    <span className="font-semibold text-secondary">
                      {formatCurrency(totalCost / (getPaymentPlan()?.installments || 1))}
                    </span>
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