import React, { useState } from 'react';
import { BrandingConfig, Ritual } from '../types';
import { MapPin, Mail, Clock, Instagram, MessageSquare, Sparkles, Shield, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FooterProps {
  branding: BrandingConfig;
  rituals: Ritual[];
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ branding, rituals, onOpenAdmin }) => {
  const [modalType, setModalType] = useState<'terms' | 'privacy' | null>(null);

  const handleNavClick = (id: string) => {
    const elem = document.getElementById(id);
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#1C211D] text-[#EDF2ED] pt-16 pb-8 border-t border-[#E6E2D8]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-[#EDF2ED]/10">
          {/* Column 1: Brand & Social */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <span className="font-serif text-xl tracking-wider text-white font-medium uppercase">
                {branding.clinicName}
              </span>
              <span className="text-[10px] uppercase tracking-[0.22em] text-[#C4C8BD]">
                {branding.subtitle}
              </span>
            </div>

            <p className="text-xs text-[#C4C8BD] max-w-xs leading-relaxed font-light">
              Um refúgio dedicado à longevidade consciente, à tranquilidade e à restauração profunda dos sentidos em harmonia com a medicina botânica.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={`https://wa.me/${branding.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#5D7052] transition-colors"
                aria-label="WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#5D7052] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#5D7052] transition-colors"
                aria-label="Santuário"
              >
                <Sparkles className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
              Navegação Rápida
            </h3>
            <ul className="flex flex-col gap-2 text-xs text-[#C4C8BD]">
              <li>
                <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-white transition-colors">
                  Início
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('nossa-essencia')} className="hover:text-white transition-colors">
                  Nossa Essência
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('rituais')} className="hover:text-white transition-colors">
                  Tratamentos & Rituais
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('quiz-interativo')} className="hover:text-white transition-colors">
                  Quiz de Bem-Estar
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('agendamento')} className="hover:text-white transition-colors">
                  Agendamento Reservado
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Exclusive Rituals */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
              Rituais Exclusivos
            </h3>
            <ul className="flex flex-col gap-2 text-xs text-[#C4C8BD]">
              {rituals.slice(0, 5).map((r) => (
                <li key={r.id}>
                  <button onClick={() => handleNavClick('rituais')} className="hover:text-white transition-colors text-left line-clamp-1">
                    {r.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Hours */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
              Atendimento & Localização
            </h3>
            <div className="flex flex-col gap-2.5 text-xs text-[#C4C8BD]">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-white shrink-0 mt-0.5" />
                <span>{branding.address} — {branding.cityState}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-white shrink-0" />
                <a href={`mailto:${branding.email}`} className="hover:text-white transition-colors">
                  {branding.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-white shrink-0" />
                <span>{branding.operatingHoursWeekdays}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#74786F]">
          <p>© {new Date().getFullYear()} {branding.clinicName}. Todos os direitos reservados.</p>

          <div className="flex items-center gap-6">
            <button onClick={() => setModalType('terms')} className="hover:text-[#EDF2ED] transition-colors">
              Termos de Uso
            </button>
            <button onClick={() => setModalType('privacy')} className="hover:text-[#EDF2ED] transition-colors">
              Política de Privacidade
            </button>
            <button onClick={onOpenAdmin} className="hover:text-[#EDF2ED] transition-colors flex items-center gap-1 text-[#5D7052]">
              <Shield className="w-3.5 h-3.5" />
              <span>Painel Admin</span>
            </button>
          </div>
        </div>
      </div>

      {/* Terms & Privacy Modal */}
      <AnimatePresence>
        {modalType && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-[#F8F6F2] text-[#1F2421] rounded-3xl max-w-xl w-full p-8 relative shadow-2xl overflow-y-auto max-h-[85vh] border border-[#E6E2D8]"
            >
              <button
                onClick={() => setModalType(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-[#EBEFEA] text-[#1F2421] hover:bg-[#5D7052] hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <h3 className="font-serif text-2xl mb-4">
                {modalType === 'terms' ? 'Termos de Uso' : 'Política de Privacidade'}
              </h3>

              <div className="text-xs text-[#6E756F] leading-relaxed space-y-3 font-light">
                <p>
                  A <strong>{branding.clinicName}</strong> preza pela total privacidade, integridade e conforto sensorial de todos os seus clientes e visitantes virtuais.
                </p>
                <p>
                  1. <strong>Confidencialidade:</strong> Todos os dados de anamnese e contatos do Concierge são armazenados em ambiente seguro e nunca compartilhados com terceiros.
                </p>
                <p>
                  2. <strong>Reservas e Cancelamento:</strong> Cancelamentos ou reagendamentos de rituais e sessões privativas devem ser realizados com antecedência mínima de 24 horas via telefone ou WhatsApp do Concierge.
                </p>
                <p>
                  3. <strong>Saúde e Anamnese:</strong> O visitante compromete-se a informar previamente quaisquer condições médicas, alergias conhecidas a extratos botânicos ou gestação.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E6E2D8] flex justify-end">
                <button
                  onClick={() => setModalType(null)}
                  className="px-6 py-2 rounded-full bg-[#5D7052] text-white text-xs uppercase font-semibold"
                >
                  Entendido
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </footer>
  );
};
