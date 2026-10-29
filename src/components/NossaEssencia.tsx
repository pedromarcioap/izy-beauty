import React, { useRef } from 'react';
import { ContentConfig, MediaAssets } from '../types';
import { Leaf, HeartHandshake, Sparkles, ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';

interface NossaEssenciaProps {
  content: ContentConfig;
  media: MediaAssets;
  onExploreRituais: () => void;
}

export const NossaEssencia: React.FC<NossaEssenciaProps> = ({
  content,
  media,
  onExploreRituais,
}) => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.06, 1.01]);
  const badgeY = useTransform(scrollYProgress, [0, 1], ['15px', '-25px']);

  return (
    <section
      ref={sectionRef}
      id="nossa-essencia"
      className="relative w-full px-4 sm:px-6 lg:px-8 py-20 bg-[#F0F5F0] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Image with Floating Badge & Parallax */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="lg:col-span-5 relative"
        >
          <div className="relative rounded-[2rem] overflow-hidden shadow-xl bg-[#F8F6F2] border border-[#E6E2D8]">
            <div className="relative h-[420px] sm:h-[480px] overflow-hidden">
              <motion.img
                style={{ y: imgY, scale: imgScale }}
                src={media.aboutImage}
                alt="Frascos de óleos essenciais e botânicos em linho natural"
                className="w-full h-full object-cover origin-center"
              />
            </div>
          </div>

          {/* Floating Badge with Parallax Offset */}
          <motion.div
            style={{ y: badgeY }}
            className="absolute -bottom-6 -right-2 sm:-right-6 bg-[#F8F6F2]/95 backdrop-blur-md p-4 rounded-2xl shadow-xl max-w-[260px] flex items-center gap-3 border border-[#E6E2D8]"
          >
            <div className="w-10 h-10 rounded-full bg-[#D4E9C5] flex items-center justify-center text-[#5D7052] shrink-0 shadow-inner">
              <Sparkles className="w-5 h-5" />
            </div>
            <p className="text-xs font-semibold text-[#1F2421] leading-snug">
              15 anos dedicados ao seu bem-estar integral e serenidade
            </p>
          </motion.div>
        </motion.div>

        {/* Right Column: Text & 3 Pillars */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="lg:col-span-7 flex flex-col items-start gap-5 lg:pl-6 mt-8 lg:mt-0"
        >
          <span className="text-xs uppercase tracking-[0.22em] text-[#5D7052] font-bold">
            {content.aboutTitle}
          </span>

          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#1F2421] leading-tight">
            O Luxo Silencioso do{' '}
            <span className="italic font-serif text-[#5D7052] font-normal">
              Cuidado Autêntico
            </span>
          </h2>

          <p className="text-sm sm:text-base text-[#6E756F] leading-relaxed font-light">
            {content.aboutManifesto}
          </p>

          {/* 3 Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full pt-2">
            {[
              {
                icon: Leaf,
                title: content.aboutPillar1Title,
                desc: content.aboutPillar1Desc,
              },
              {
                icon: HeartHandshake,
                title: content.aboutPillar2Title,
                desc: content.aboutPillar2Desc,
              },
              {
                icon: Sparkles,
                title: content.aboutPillar3Title,
                desc: content.aboutPillar3Desc,
              },
            ].map((pillar, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
                className="bg-[#F8F6F2] p-4 rounded-2xl shadow-sm border border-[#E6E2D8]/60 flex flex-col gap-2 hover:border-[#5D7052]/40 transition-colors"
              >
                <div className="w-9 h-9 rounded-full bg-[#D4E9C5]/60 flex items-center justify-center text-[#5D7052]">
                  <pillar.icon className="w-4 h-4" />
                </div>
                <h3 className="font-semibold text-sm text-[#1F2421]">{pillar.title}</h3>
                <p className="text-xs text-[#6E756F]">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>

          <button
            onClick={onExploreRituais}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#5D7052] hover:text-[#4B5C42] transition-colors pt-2 group"
          >
            <span>Conheça Nossa História & Filosofia</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};
