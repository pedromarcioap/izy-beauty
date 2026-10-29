import React, { useState } from 'react';
import { QuizOption, Ritual } from '../types';
import { QUIZ_OPTIONS } from '../data/defaultData';
import { Sparkles, ArrowRight, Zap, Leaf, Flame, HeartPulse } from 'lucide-react';
import { motion } from 'motion/react';

interface QuizInterativoProps {
  rituals: Ritual[];
  onSelectRitualForBooking: (ritualTitle: string) => void;
}

export const QuizInterativo: React.FC<QuizInterativoProps> = ({
  rituals,
  onSelectRitualForBooking,
}) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string>('alivio');

  const selectedOption = QUIZ_OPTIONS.find((o) => o.id === selectedOptionId) || QUIZ_OPTIONS[0];

  // Find the matched ritual or fallback
  const recommendedRitual =
    rituals.find((r) => r.id === selectedOption.recommendedRitualId) || rituals[0];

  const getOptionIcon = (iconName: string) => {
    switch (iconName) {
      case 'bolt':
        return <Zap className="w-6 h-6 text-[#5D7052]" />;
      case 'energy_savings_leaf':
        return <Leaf className="w-6 h-6 text-[#5D7052]" />;
      case 'auto_awesome':
        return <Sparkles className="w-6 h-6 text-[#5D7052]" />;
      case 'self_improvement':
        return <Flame className="w-6 h-6 text-[#5D7052]" />;
      default:
        return <HeartPulse className="w-6 h-6 text-[#5D7052]" />;
    }
  };

  return (
    <section id="quiz-interativo" className="w-full px-4 sm:px-6 lg:px-8 py-20 bg-[#F0F5F0]">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-center flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-[0.22em] text-[#5D7052] font-bold">
            GUIA INTERATIVO DE BEM-ESTAR
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1F2421]">
            Encontre a experiência ideal para o seu momento
          </h2>
          <p className="text-sm text-[#6E756F]">
            Selecione a sensação predominante de hoje e receba o diagnóstico com a recomendação da nossa equipe.
          </p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="w-full max-w-md flex flex-col gap-2"
        >
          <div className="flex justify-between items-center text-xs text-[#6E756F]">
            <span>Passo 1 de 3: Estado Atual</span>
            <span className="font-semibold text-[#5D7052]">Diagnóstico Sensorial</span>
          </div>
          <div className="w-full h-1.5 bg-[#E6E2D8] rounded-full overflow-hidden">
            <div className="h-full bg-[#5D7052] w-1/3 rounded-full transition-all duration-500"></div>
          </div>
        </motion.div>

        {/* Quiz Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, delay: 0.25, ease: 'easeOut' }}
          className="w-full bg-[#F8F6F2] p-6 sm:p-10 rounded-3xl shadow-md border border-[#E6E2D8] flex flex-col gap-8"
        >
          <h3 className="font-serif text-xl sm:text-2xl text-center text-[#1F2421]">
            Como você se sente hoje e o que seu corpo mais pede?
          </h3>

          {/* 4 Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {QUIZ_OPTIONS.map((option) => {
              const isSelected = option.id === selectedOptionId;
              return (
                <button
                  key={option.id}
                  onClick={() => setSelectedOptionId(option.id)}
                  type="button"
                  className={`flex flex-col text-left p-5 rounded-2xl transition-all cursor-pointer focus:outline-none border ${
                    isSelected
                      ? 'bg-[#D4E9C5]/50 border-[#5D7052] shadow-sm'
                      : 'bg-[#F0F5F0] border-transparent hover:bg-[#EBEFEA]'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    {getOptionIcon(option.icon)}
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                        isSelected ? 'border-[#5D7052] bg-white' : 'border-[#C4C8BD]'
                      }`}
                    >
                      {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-[#5D7052]" />}
                    </div>
                  </div>

                  <span className="font-semibold text-sm text-[#1F2421] mt-3">
                    {option.title}
                  </span>
                  <span className="text-xs text-[#6E756F] mt-1 font-light leading-relaxed">
                    {option.description}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Dynamic Recommendation Result Card */}
          <motion.div
            key={recommendedRitual.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="p-6 rounded-2xl bg-[#EBEFEA] border border-[#E6E2D8] flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div className="flex flex-col gap-1 text-left">
              <span className="text-[10px] text-[#5D7052] uppercase tracking-wider font-bold">
                RECOMENDAÇÃO PERSONALIZADA
              </span>
              <h4 className="font-serif text-xl text-[#1F2421]">
                {recommendedRitual.title}
              </h4>
              <p className="text-xs text-[#6E756F] font-light max-w-lg mt-0.5">
                {recommendedRitual.shortDescription}
              </p>
              <span className="text-xs text-[#1F2421] font-semibold mt-2">
                Tempo sugerido: {recommendedRitual.durationMinutes} minutos • Investimento: R$ {recommendedRitual.priceBrl}
              </span>
            </div>

            <button
              onClick={() => onSelectRitualForBooking(recommendedRitual.title)}
              className="w-full md:w-auto px-6 py-3 rounded-full bg-[#5D7052] text-white font-semibold text-xs uppercase tracking-wider text-center hover:bg-[#4B5C42] transition-colors shrink-0 shadow-sm flex items-center justify-center gap-2"
            >
              <span>Agendar Este Ritual</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
