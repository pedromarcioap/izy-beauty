import React, { useState } from 'react';
import { Ritual, RitualCategory } from '../types';
import { Clock, ArrowUpRight, HelpCircle, ArrowRight, X, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface RituaisCatalogProps {
  rituals: Ritual[];
  onSelectRitualForBooking: (ritualTitle: string) => void;
  onGoToQuiz: () => void;
}

const CATEGORY_LABELS: Record<RitualCategory | 'all', string> = {
  all: 'Todos',
  renovacao: 'Renovação',
  descompressao: 'Descompressão',
  imersao: 'Imersão',
  equilibrio: 'Equilíbrio',
};

export const RituaisCatalog: React.FC<RituaisCatalogProps> = ({
  rituals,
  onSelectRitualForBooking,
  onGoToQuiz,
}) => {
  const [activeCategory, setActiveCategory] = useState<RitualCategory | 'all'>('all');
  const [selectedDetailRitual, setSelectedDetailRitual] = useState<Ritual | null>(null);

  const filteredRituals = rituals.filter(
    (r) => activeCategory === 'all' || r.category === activeCategory
  );

  return (
    <section id="rituais" className="w-full px-4 sm:px-6 lg:px-8 py-20 bg-[#F8F6F2]">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-center max-w-2xl flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-[0.22em] text-[#5D7052] font-bold">
            EXPERIÊNCIAS SIGNATURE
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1F2421]">
            Rituais desenhados para a sua{' '}
            <span className="italic font-serif text-[#5D7052] font-normal">
              plenitude
            </span>
          </h2>
          <p className="text-sm text-[#6E756F] mt-1">
            Protocolos autorais combinando medicina botânica, toques terapêuticos envolventes e hidroterapia restauradora.
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-2"
        >
          {(Object.keys(CATEGORY_LABELS) as (RitualCategory | 'all')[]).map((catKey) => {
            const isActive = activeCategory === catKey;
            return (
              <button
                key={catKey}
                onClick={() => setActiveCategory(catKey)}
                className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 ${
                  isActive
                    ? 'bg-[#5D7052] text-white shadow-sm'
                    : 'bg-[#EBEFEA] text-[#6E756F] hover:bg-[#D4E9C5] hover:text-[#3A4C31]'
                }`}
              >
                {CATEGORY_LABELS[catKey]}
              </button>
            );
          })}
        </motion.div>

        {/* Rituals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {filteredRituals.map((ritual) => (
            <motion.div
              key={ritual.id}
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col bg-[#F0F5F0] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[#E6E2D8]/60 group"
            >
              {/* Image & Tag */}
              <div className="relative h-60 overflow-hidden bg-[#EBEFEA]">
                <img
                  src={ritual.imageUrl}
                  alt={ritual.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#F8F6F2]/90 backdrop-blur-sm text-[#5D7052] text-[10px] font-semibold uppercase tracking-wider">
                  {CATEGORY_LABELS[ritual.category]}
                </span>
                {ritual.featured && (
                  <span className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-[#5D7052] text-white text-[9px] font-semibold uppercase tracking-wider">
                    Exclusivo
                  </span>
                )}
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col flex-1 justify-between gap-4">
                <div>
                  <div className="flex items-center justify-between text-xs text-[#6E756F] mb-2 font-medium">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#5D7052]" />
                      {ritual.durationMinutes} min
                    </span>
                    <span className="font-serif text-lg text-[#5D7052] font-bold">
                      R$ {ritual.priceBrl}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl text-[#1F2421] group-hover:text-[#5D7052] transition-colors">
                    {ritual.title}
                  </h3>

                  <p className="text-xs text-[#6E756F] mt-2 leading-relaxed font-light line-clamp-3">
                    {ritual.shortDescription}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-2 border-t border-[#E6E2D8]/60">
                  <button
                    onClick={() => setSelectedDetailRitual(ritual)}
                    className="text-xs text-[#6E756F] hover:text-[#5D7052] underline font-medium"
                  >
                    Ver Protocolo Completo
                  </button>

                  <button
                    onClick={() => onSelectRitualForBooking(ritual.title)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#5D7052] text-white hover:bg-[#4B5C42] text-xs font-semibold tracking-wider transition-colors shadow-sm"
                  >
                    <span>Reservar</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Discovery Banner */}
        <div className="w-full bg-[#EBEFEA] p-6 sm:p-8 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6 border border-[#E6E2D8]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#5D7052] text-white flex items-center justify-center shrink-0 shadow-sm">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-lg text-[#1F2421] font-semibold">
                Dúvida sobre o melhor ritual para o seu momento?
              </h4>
              <p className="text-xs text-[#6E756F] mt-0.5">
                Faça o nosso diagnóstico sensorial e descubra a experiência ideal em menos de 1 minuto.
              </p>
            </div>
          </div>

          <button
            onClick={onGoToQuiz}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#5D7052] text-white hover:bg-[#4B5C42] text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap shrink-0 group"
          >
            <span>Fazer Quiz Interativo</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Ritual Detail Modal */}
      <AnimatePresence>
        {selectedDetailRitual && (
          <div className="fixed inset-0 z-50 bg-[#1F2421]/60 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              className="bg-[#F8F6F2] rounded-3xl max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl overflow-y-auto max-h-[90vh] border border-[#E6E2D8]"
            >
              <button
                onClick={() => setSelectedDetailRitual(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-[#EBEFEA] text-[#1F2421] hover:bg-[#5D7052] hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#5D7052] font-semibold mb-2">
                <Sparkles className="w-4 h-4" />
                <span>Detalhamento do Protocolo</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl text-[#1F2421]">
                {selectedDetailRitual.title}
              </h3>

              <div className="flex items-center gap-4 text-xs text-[#6E756F] my-3">
                <span>Duração: <strong className="text-[#1F2421]">{selectedDetailRitual.durationMinutes} min</strong></span>
                <span>•</span>
                <span>Investimento: <strong className="text-[#5D7052] font-serif text-base">R$ {selectedDetailRitual.priceBrl}</strong></span>
              </div>

              <p className="text-sm text-[#6E756F] font-light leading-relaxed mb-6">
                {selectedDetailRitual.shortDescription}
              </p>

              {/* Steps */}
              {selectedDetailRitual.protocolSteps && selectedDetailRitual.protocolSteps.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-xs uppercase tracking-wider text-[#1F2421] font-semibold mb-3">
                    Etapas da Experiência:
                  </h4>
                  <ul className="space-y-2">
                    {selectedDetailRitual.protocolSteps.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-[#1F2421]">
                        <CheckCircle2 className="w-4 h-4 text-[#5D7052] shrink-0 mt-0.5" />
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Ingredients */}
              {selectedDetailRitual.bioactiveIngredients && selectedDetailRitual.bioactiveIngredients.length > 0 && (
                <div className="mb-6 bg-[#F0F5F0] p-4 rounded-2xl">
                  <h4 className="text-xs uppercase tracking-wider text-[#5D7052] font-semibold mb-2">
                    Bioativos & Aromaterapia Utilizada:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedDetailRitual.bioactiveIngredients.map((ing, idx) => (
                      <span key={idx} className="px-3 py-1 rounded-full bg-[#F8F6F2] text-[#1F2421] text-xs border border-[#E6E2D8]">
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action */}
              <div className="pt-4 border-t border-[#E6E2D8] flex items-center justify-end gap-3">
                <button
                  onClick={() => setSelectedDetailRitual(null)}
                  className="px-5 py-2.5 rounded-full text-xs text-[#6E756F] hover:text-[#1F2421]"
                >
                  Fechar
                </button>
                <button
                  onClick={() => {
                    const title = selectedDetailRitual.title;
                    setSelectedDetailRitual(null);
                    onSelectRitualForBooking(title);
                  }}
                  className="px-6 py-2.5 rounded-full bg-[#5D7052] text-white hover:bg-[#4B5C42] text-xs font-semibold tracking-wider uppercase"
                >
                  Agendar Este Ritual
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
