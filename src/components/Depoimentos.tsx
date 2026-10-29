import React, { useState, useRef } from 'react';
import { Testimonial } from '../types';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';

interface DepoimentosProps {
  testimonials: Testimonial[];
}

export const Depoimentos: React.FC<DepoimentosProps> = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const quoteY = useTransform(scrollYProgress, [0, 1], ['-15px', '15px']);

  if (!testimonials || testimonials.length === 0) return null;

  const current = testimonials[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section ref={sectionRef} className="relative w-full px-4 sm:px-6 lg:px-8 py-20 bg-[#F8F6F2] overflow-hidden">
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-center flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-[0.22em] text-[#5D7052] font-bold">
            EXPERIÊNCIAS VIVIDAS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1F2421]">
            O que dizem sobre o nosso{' '}
            <span className="italic font-serif text-[#5D7052] font-normal">
              santuário
            </span>
          </h2>
        </motion.div>

        {/* Testimonial Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="relative w-full bg-[#F0F5F0] p-8 sm:p-12 lg:p-16 rounded-3xl shadow-sm text-center flex flex-col items-center border border-[#E6E2D8]"
        >
          <motion.div style={{ y: quoteY }}>
            <Quote className="w-12 h-12 text-[#5D7052]/30 mb-4" />
          </motion.div>

          {/* Rating */}
          <div className="flex items-center gap-1 text-[#5D7052] mb-6">
            {Array.from({ length: current.rating || 5 }).map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current" />
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="flex flex-col items-center"
            >
              <blockquote className="font-serif text-lg sm:text-xl lg:text-2xl text-[#1F2421] font-normal italic max-w-2xl leading-relaxed">
                “{current.quote}”
              </blockquote>

              <div className="mt-8 flex flex-col items-center">
                <span className="font-semibold text-base text-[#1F2421]">
                  {current.authorName}
                </span>
                <span className="text-xs text-[#6E756F] mt-0.5">
                  {current.authorRole} • Realizou o{' '}
                  <strong className="font-semibold text-[#5D7052]">
                    {current.ritualName}
                  </strong>
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Carousel Controls */}
          {testimonials.length > 1 && (
            <div className="flex items-center gap-6 mt-8">
              <button
                onClick={handlePrev}
                aria-label="Depoimento Anterior"
                className="w-10 h-10 rounded-full bg-[#F8F6F2] flex items-center justify-center text-[#1F2421] hover:bg-[#D4E9C5] hover:text-[#3A4C31] transition-colors shadow-sm"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2 rounded-full transition-all ${
                      idx === currentIndex
                        ? 'w-6 bg-[#5D7052]'
                        : 'w-2 bg-[#C4C8BD] hover:bg-[#5D7052]/50'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                aria-label="Próximo Depoimento"
                className="w-10 h-10 rounded-full bg-[#F8F6F2] flex items-center justify-center text-[#1F2421] hover:bg-[#D4E9C5] hover:text-[#3A4C31] transition-colors shadow-sm"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};
