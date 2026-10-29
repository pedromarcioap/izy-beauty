import React, { useState, useEffect } from 'react';
import { BrandingConfig, HeaderStyle } from '../types';
import { Phone, Calendar, Menu, X, Shield, Clock, Sparkles } from 'lucide-react';

interface HeaderProps {
  branding: BrandingConfig;
  onOpenAdmin: () => void;
  onSelectBookingRitual?: (title?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ branding, onOpenAdmin, onSelectBookingRitual }) => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (targetId: string) => {
    setIsOverlayOpen(false);
    const elem = document.getElementById(targetId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookingClick = () => {
    setIsOverlayOpen(false);
    if (onSelectBookingRitual) onSelectBookingRitual();
    const elem = document.getElementById('agendamento');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Render style 1: Minimalist Architectural (Default HTML style)
  if (branding.headerStyle === 'architectural') {
    return (
      <>
        <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled ? 'bg-[#F8F6F2]/95 backdrop-blur-md border-b border-[#E6E2D8] shadow-sm py-2' : 'bg-[#F8F6F2]/80 backdrop-blur-sm border-b border-[#E6E2D8]/40 py-3'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-12 md:h-14">
            {/* Left: Menu button & Admin CMS trigger */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsOverlayOpen(true)}
                className="group flex items-center gap-2.5 py-1.5 px-2 text-[#1F2421] hover:text-[#5D7052] transition-colors focus:outline-none"
                aria-label="Abrir Menu Sensorial"
              >
                <div className="flex flex-col gap-1 w-5 justify-center">
                  <span className="w-5 h-[1.5px] bg-[#1F2421] group-hover:bg-[#5D7052] transition-all duration-300"></span>
                  <span className="w-3.5 h-[1.5px] bg-[#1F2421] group-hover:w-5 group-hover:bg-[#5D7052] transition-all duration-300"></span>
                </div>
                <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] font-semibold">
                  Menu / Explorar
                </span>
              </button>

              <button
                onClick={onOpenAdmin}
                className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] tracking-wider uppercase font-medium bg-[#EBEFEA] text-[#5D7052] hover:bg-[#D4E9C5] transition-colors"
                title="Painel Administrativo CMS"
              >
                <Shield className="w-3 h-3" />
                <span>Gestão / CMS</span>
              </button>
            </div>

            {/* Center: Brand Name & Subtitle */}
            <div className="flex flex-col items-center justify-center text-center">
              <a href="#" className="group flex flex-col items-center">
                <span className="font-serif text-lg sm:text-xl md:text-2xl tracking-[0.25em] text-[#1F2421] font-medium uppercase transition-colors group-hover:text-[#5D7052]">
                  {branding.clinicName}
                </span>
                <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.32em] text-[#6E756F] -mt-0.5">
                  {branding.subtitle}
                </span>
              </a>
            </div>

            {/* Right: Phone & Agendar CTA */}
            <div className="flex items-center gap-2 sm:gap-4">
              <a
                href={`tel:${branding.phone.replace(/[^0-9+]/g, '')}`}
                className="hidden lg:flex items-center gap-1.5 text-[11px] uppercase tracking-[0.14em] text-[#6E756F] hover:text-[#5D7052] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#5D7052]" />
                <span>{branding.phone}</span>
              </a>

              <span className="hidden lg:inline text-[#E6E2D8]">|</span>

              <button
                onClick={handleBookingClick}
                className="inline-flex items-center justify-center px-3.5 sm:px-5 py-1.5 rounded-full border border-[#5D7052]/50 text-[#5D7052] hover:bg-[#5D7052] hover:text-white text-[10px] sm:text-[11px] uppercase tracking-[0.18em] font-semibold transition-all duration-300 shadow-none hover:shadow-sm"
              >
                Agendar Sessão
              </button>
            </div>
          </div>
        </header>

        {/* Fullscreen Sensory Overlay Menu */}
        {isOverlayOpen && (
          <div className="fixed inset-0 z-50 bg-[#F8F6F2]/98 backdrop-blur-2xl transition-all duration-500 flex flex-col justify-between overflow-y-auto">
            {/* Top Bar */}
            <div className="h-16 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between border-b border-[#E6E2D8]/40 shrink-0">
              <button
                onClick={() => setIsOverlayOpen(false)}
                className="group flex items-center gap-2 py-2 text-[#1F2421] hover:text-[#5D7052] transition-colors focus:outline-none"
              >
                <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                <span className="text-[11px] uppercase tracking-[0.24em] font-semibold">Fechar</span>
              </button>

              <span className="text-[10px] uppercase tracking-[0.3em] text-[#6E756F] hidden sm:inline">
                A Essência do Silêncio e da Regeneração
              </span>

              <div className="flex items-center gap-3">
                <button
                  onClick={onOpenAdmin}
                  className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider text-[#5D7052] hover:underline font-medium"
                >
                  <Shield className="w-3 h-3" /> Painel CMS
                </button>
                <button
                  onClick={handleBookingClick}
                  className="text-[11px] uppercase tracking-[0.2em] text-[#5D7052] hover:underline font-semibold"
                >
                  Concierge Exclusivo
                </button>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Navigation Column */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                <span className="text-[11px] uppercase tracking-[0.26em] text-[#5D7052] font-semibold">
                  Índice & Jornadas
                </span>
                <nav className="flex flex-col gap-2">
                  <button
                    onClick={() => handleNavClick('nossa-essencia')}
                    className="group text-left flex items-baseline justify-between py-3 border-b border-[#E6E2D8]/60 hover:border-[#5D7052] transition-colors"
                  >
                    <span className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#1F2421] font-normal group-hover:italic group-hover:text-[#5D7052] transition-all">
                      01. Nossa Essência
                    </span>
                    <span className="text-[10px] tracking-widest text-[#6E756F] uppercase opacity-60 group-hover:opacity-100">
                      Filosofia Botânica
                    </span>
                  </button>

                  <button
                    onClick={() => handleNavClick('rituais')}
                    className="group text-left flex items-baseline justify-between py-3 border-b border-[#E6E2D8]/60 hover:border-[#5D7052] transition-colors"
                  >
                    <span className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#1F2421] font-normal group-hover:italic group-hover:text-[#5D7052] transition-all">
                      02. Rituais & Terapias
                    </span>
                    <span className="text-[10px] tracking-widest text-[#6E756F] uppercase opacity-60 group-hover:opacity-100">
                      Menu de Experiências
                    </span>
                  </button>

                  <button
                    onClick={() => handleNavClick('quiz-interativo')}
                    className="group text-left flex items-baseline justify-between py-3 border-b border-[#E6E2D8]/60 hover:border-[#5D7052] transition-colors"
                  >
                    <span className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#1F2421] font-normal group-hover:italic group-hover:text-[#5D7052] transition-all">
                      03. Quiz Interativo
                    </span>
                    <span className="text-[10px] tracking-widest text-[#6E756F] uppercase opacity-60 group-hover:opacity-100">
                      Diagnóstico Sensorial
                    </span>
                  </button>

                  <button
                    onClick={() => handleNavClick('agendamento')}
                    className="group text-left flex items-baseline justify-between py-3 border-b border-[#E6E2D8]/60 hover:border-[#5D7052] transition-colors"
                  >
                    <span className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#1F2421] font-normal group-hover:italic group-hover:text-[#5D7052] transition-all">
                      04. Santuário & Reservas
                    </span>
                    <span className="text-[10px] tracking-widest text-[#6E756F] uppercase opacity-60 group-hover:opacity-100">
                      Privativo em Jardins
                    </span>
                  </button>
                </nav>

                <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-[#6E756F] text-xs">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-[#5D7052] font-semibold">Endereço</p>
                    <p className="mt-1">{branding.address} — {branding.cityState}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-[#5D7052] font-semibold">Contato Direto</p>
                    <p className="mt-1">{branding.email} • {branding.phone}</p>
                  </div>
                </div>
              </div>

              {/* Photo & Quote Column */}
              <div className="lg:col-span-5 relative hidden md:block">
                <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/5] bg-[#EBEFEA]">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-87ASUH2UwXQy4dGVR8kBu02KN6DIDx4utsEJU7_-vas4y3Hhjuq2adn_hmgayWTKv88_ddovwP8fVMtHFKABQjMqoSPavdUoan6sGYSKV-rCP_I2Eqhry2p16aYAnsfbLPuiC8WOrSo72hA-dWIbAVvqoD7egGsVG3nztEzPVYvZa7vcstvP5txxRy98KPPsP0IStojT8ibutYN16AihylPP9OmFQ0GYiiQi5Zg"
                    alt="Atmosfera do santuário"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#F8F6F2] via-transparent to-transparent opacity-80"></div>
                  <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-[#F8F6F2]/90 backdrop-blur-md">
                    <p className="font-serif text-sm text-[#1F2421] italic">
                      "O luxo contemporâneo habita no silêncio e no toque intencional."
                    </p>
                    <span className="text-[9px] uppercase tracking-widest text-[#6E756F] block mt-1">
                      {branding.clinicName} • {branding.cityState}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Footer */}
            <div className="h-12 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between border-t border-[#E6E2D8]/40 text-[10px] text-[#6E756F] shrink-0">
              <span>© {new Date().getFullYear()} {branding.clinicName}</span>
              <span className="tracking-widest uppercase">{branding.cityState}</span>
            </div>
          </div>
        )}
      </>
    );
  }

  // Render style 2: Floating Capsule
  if (branding.headerStyle === 'floating') {
    return (
      <header className="fixed top-4 left-0 right-0 z-40 px-4 flex justify-center">
        <div className="bg-[#F8F6F2]/90 backdrop-blur-md border border-[#E6E2D8] shadow-md rounded-full px-5 py-2.5 max-w-4xl w-full flex items-center justify-between">
          <a href="#" className="font-serif text-base font-semibold tracking-wider text-[#1F2421] uppercase">
            {branding.clinicName}
          </a>

          <nav className="hidden md:flex items-center gap-6 text-xs uppercase tracking-wider text-[#6E756F]">
            <button onClick={() => handleNavClick('nossa-essencia')} className="hover:text-[#5D7052] transition-colors">
              Essência
            </button>
            <button onClick={() => handleNavClick('rituais')} className="hover:text-[#5D7052] transition-colors">
              Rituais
            </button>
            <button onClick={() => handleNavClick('quiz-interativo')} className="hover:text-[#5D7052] transition-colors">
              Quiz
            </button>
            <button onClick={() => handleNavClick('agendamento')} className="hover:text-[#5D7052] transition-colors">
              Contato
            </button>
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenAdmin}
              className="p-1.5 rounded-full text-[#5D7052] hover:bg-[#EBEFEA] transition-colors"
              title="Painel CMS"
            >
              <Shield className="w-4 h-4" />
            </button>
            <button
              onClick={handleBookingClick}
              className="px-4 py-1.5 rounded-full bg-[#5D7052] text-white hover:bg-[#4B5C42] text-xs uppercase tracking-wider font-semibold transition-all"
            >
              Agendar
            </button>
          </div>
        </div>
      </header>
    );
  }

  // Render style 3: Sidebar / Floating Bar
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#F8F6F2]/90 backdrop-blur-md border-b border-[#E6E2D8] py-2.5 px-4 sm:px-8 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsOverlayOpen(!isOverlayOpen)}
          className="p-2 text-[#1F2421] hover:text-[#5D7052]"
        >
          <Menu className="w-5 h-5" />
        </button>
        <span className="font-serif text-lg tracking-widest uppercase font-semibold text-[#1F2421]">
          {branding.clinicName}
        </span>
      </div>

      <div className="hidden sm:flex items-center gap-2 text-xs text-[#5D7052] bg-[#D4E9C5]/50 px-3 py-1 rounded-full">
        <Clock className="w-3.5 h-3.5" />
        <span>{branding.operatingHoursWeekdays}</span>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onOpenAdmin}
          className="p-1.5 rounded-full text-[#5D7052] hover:bg-[#EBEFEA]"
        >
          <Shield className="w-4 h-4" />
        </button>
        <button
          onClick={handleBookingClick}
          className="px-4 py-1.5 rounded-full bg-[#5D7052] text-white text-xs uppercase tracking-wider font-semibold"
        >
          Agendar
        </button>
      </div>
    </header>
  );
};
