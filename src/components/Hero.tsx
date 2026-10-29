import React, { useRef } from 'react';
import { ContentConfig, MediaAssets } from '../types';
import { ArrowRight, ArrowDown, Sparkles, ShieldCheck } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';

interface HeroProps {
  content: ContentConfig;
  media: MediaAssets;
  onExploreRituais: () => void;
  onBookClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  content,
  media,
  onExploreRituais,
  onBookClick,
}) => {
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax scroll tracking relative to hero section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Subtle vertical translation and scale shifts for editorial luxury depth
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '16%']);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.02]);
  const badgeY = useTransform(scrollYProgress, [0, 1], ['0px', '-18px']);
  const bgGlowY = useTransform(scrollYProgress, [0, 1], ['0px', '35px']);

  return (
    <section
      ref={sectionRef}
      className="relative w-full px-4 sm:px-6 lg:px-8 pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden bg-[#F8F6F2]"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Narrative & Authority */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="lg:col-span-7 flex flex-col items-start gap-6 z-10"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D4E9C5]/60 text-[#3A4C31]">
            <Sparkles className="w-3.5 h-3.5 text-[#5D7052]" />
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.18em] font-semibold">
              {content.heroBadge}
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#1F2421] leading-[1.12]">
            {content.heroHeadline}{' '}
            <span className="italic font-serif text-[#5D7052] font-normal">
              {content.heroHeadlineItalic1}
            </span>
            .<br className="hidden sm:inline" />
            Eleve sua{' '}
            <span className="italic font-serif text-[#5D7052] font-normal">
              {content.heroHeadlineItalic2}
            </span>
            .
          </h1>

          {/* Manifesto text */}
          <p className="text-base sm:text-lg text-[#6E756F] max-w-xl leading-relaxed font-light">
            {content.heroSubtext}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2 w-full sm:w-auto">
            <button
              onClick={onBookClick}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#5D7052] text-white text-xs sm:text-sm font-semibold tracking-wider uppercase shadow-md hover:bg-[#4B5C42] hover:shadow-lg transition-all duration-300 group"
            >
              <span>Reservar Experiência</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onExploreRituais}
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-[#EBEFEA] text-[#1F2421] hover:bg-[#E5E9E4] transition-colors text-xs sm:text-sm font-semibold tracking-wider uppercase backdrop-blur-sm"
            >
              Explorar Rituais
            </button>
          </div>

          {/* Metrics */}
          <div className="w-full pt-6 grid grid-cols-3 gap-3 sm:gap-6">
            <div className="flex flex-col bg-[#F0F5F0]/80 p-4 rounded-2xl backdrop-blur-sm border border-[#E6E2D8]/50">
              <span className="font-serif text-2xl sm:text-3xl text-[#5D7052] font-semibold">
                {content.metricYears}
              </span>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-[#6E756F] mt-1 font-medium">
                {content.metricYearsLabel}
              </span>
            </div>

            <div className="flex flex-col bg-[#F0F5F0]/80 p-4 rounded-2xl backdrop-blur-sm border border-[#E6E2D8]/50">
              <span className="font-serif text-2xl sm:text-3xl text-[#5D7052] font-semibold">
                {content.metricClients}
              </span>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-[#6E756F] mt-1 font-medium">
                {content.metricClientsLabel}
              </span>
            </div>

            <div className="flex flex-col bg-[#F0F5F0]/80 p-4 rounded-2xl backdrop-blur-sm border border-[#E6E2D8]/50">
              <span className="font-serif text-2xl sm:text-3xl text-[#5D7052] font-semibold">
                {content.metricRituals}
              </span>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-[#6E756F] mt-1 font-medium">
                {content.metricRitualsLabel}
              </span>
            </div>
          </div>

          {/* Scroll Indicator */}
          <button
            onClick={onExploreRituais}
            className="inline-flex items-center gap-2 text-xs text-[#6E756F] hover:text-[#5D7052] transition-colors pt-2 group"
          >
            <span>Role para explorar a essência</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce text-[#5D7052]" />
          </button>
        </motion.div>

        {/* Right Column: Editorial Photography with Parallax Effect */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="lg:col-span-5 relative mt-6 lg:mt-0"
        >
          {/* Subtle Ambient Parallax Background Glow */}
          <motion.div
            style={{ y: bgGlowY }}
            className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-tr from-[#D4E9C5]/30 to-[#E6E2D8]/40 blur-2xl pointer-events-none"
          />

          <div className="relative rounded-[2rem] overflow-hidden shadow-2xl bg-[#EBEFEA] border border-[#E6E2D8]/60">
            {/* Parallax Image Container */}
            <div className="relative h-[480px] sm:h-[560px] lg:h-[620px] overflow-hidden">
              <motion.img
                style={{ y: imgY, scale: imgScale }}
                src={media.heroImage}
                alt="Atmosfera de descompressão e bem-estar no santuário"
                className="w-full h-full object-cover origin-center"
              />
            </div>

            {/* Floating Glassmorphic Badge with Multi-Layer Parallax Offset */}
            <motion.div
              style={{ y: badgeY }}
              className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#F8F6F2]/90 backdrop-blur-md flex items-center justify-between shadow-lg border border-[#E6E2D8]"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#D4E9C5] flex items-center justify-center text-[#5D7052] shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#1F2421]">Santuário de Paz</p>
                  <p className="text-[11px] text-[#6E756F]">Atendimento Privativo • Jardins, SP</p>
                </div>
              </div>

              <div className="flex items-center justify-center w-7 h-7 rounded-full bg-[#5D7052] text-white shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

