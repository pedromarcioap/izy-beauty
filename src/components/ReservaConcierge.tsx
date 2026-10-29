import React, { useState, useEffect, useRef } from 'react';
import { BrandingConfig, Ritual, BookingRequest } from '../types';
import { Clock, MapPin, Phone, MessageSquare, ArrowRight, CheckCircle2, X } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';

interface ReservaConciergeProps {
  branding: BrandingConfig;
  rituals: Ritual[];
  selectedRitualTitle?: string;
  contactImage: string;
  onSubmitBooking: (booking: Omit<BookingRequest, 'id' | 'createdAt' | 'status'>) => BookingRequest;
}

export const ReservaConcierge: React.FC<ReservaConciergeProps> = ({
  branding,
  rituals,
  selectedRitualTitle,
  contactImage,
  onSubmitBooking,
}) => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.07, 1.01]);
  const cardY = useTransform(scrollYProgress, [0, 1], ['20px', '-20px']);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [ritualTitle, setRitualTitle] = useState(selectedRitualTitle || (rituals[0]?.title || ''));
  const [date, setDate] = useState('');
  const [time, setTime] = useState('14:00');
  const [sensoryPreference, setSensoryPreference] = useState('');

  const [createdBooking, setCreatedBooking] = useState<BookingRequest | null>(null);

  useEffect(() => {
    if (selectedRitualTitle) {
      setRitualTitle(selectedRitualTitle);
    }
  }, [selectedRitualTitle]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !date) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const booking = onSubmitBooking({
      name,
      email,
      phone,
      ritualTitle,
      date,
      time,
      sensoryPreference,
    });

    setCreatedBooking(booking);
  };

  const generateWhatsAppLink = (booking: BookingRequest) => {
    const text = encodeURIComponent(
      `Olá Concierge da ${branding.clinicName}!\n\nGostaria de confirmar minha solicitação de agendamento:\n• *Cliente:* ${booking.name}\n• *Ritual:* ${booking.ritualTitle}\n• *Data:* ${booking.date} às ${booking.time}\n• *Contato:* ${booking.phone}\n${booking.sensoryPreference ? `• *Preferências:* ${booking.sensoryPreference}\n` : ''}\nFico no aguardo do retorno!`
    );
    return `https://wa.me/${branding.whatsapp}?text=${text}`;
  };

  return (
    <section
      ref={sectionRef}
      id="agendamento"
      className="relative w-full px-4 sm:px-6 lg:px-8 py-20 bg-[#F0F5F0] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Photo & Operating Hours with Parallax */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="lg:col-span-5 relative"
        >
          <div className="relative rounded-3xl overflow-hidden shadow-xl bg-[#F8F6F2] border border-[#E6E2D8]">
            <div className="relative h-[520px] sm:h-[580px] overflow-hidden">
              <motion.img
                style={{ y: imgY, scale: imgScale }}
                src={contactImage}
                alt="Concierge de atendimento da clínica preparando sala de rituais"
                className="w-full h-full object-cover origin-center"
              />
            </div>
          </div>

          <motion.div
            style={{ y: cardY }}
            className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#F8F6F2]/90 backdrop-blur-md shadow-lg border border-[#E6E2D8]"
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#D4E9C5] flex items-center justify-center text-[#5D7052] shrink-0 mt-0.5 shadow-inner">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-[#1F2421]">Horários de Atendimento</p>
                <p className="text-xs text-[#6E756F] mt-0.5 leading-snug">
                  {branding.operatingHoursWeekdays}<br />
                  {branding.operatingHoursSunday}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column: Booking Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="lg:col-span-7 bg-[#F8F6F2] p-6 sm:p-10 rounded-3xl shadow-sm border border-[#E6E2D8] flex flex-col gap-6"
        >
          <div>
            <span className="text-xs uppercase tracking-[0.22em] text-[#5D7052] font-bold">
              RESERVA EXCLUSIVA & CONCIERGE
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#1F2421] mt-1">
              Inicie sua jornada de calma
            </h2>
            <p className="text-xs sm:text-sm text-[#6E756F] font-light mt-1">
              Preencha seus dados para receber o contato personalizado da nossa equipe e confirmar seu horário privativo.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label className="text-xs font-semibold text-[#1F2421]">Nome Completo *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Como podemos lhe chamar?"
                className="w-full px-4 py-3 rounded-xl bg-[#F0F5F0] text-[#1F2421] text-xs sm:text-sm border border-[#E6E2D8] focus:outline-none focus:border-[#5D7052] focus:bg-white transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#1F2421]">E-mail *</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="w-full px-4 py-3 rounded-xl bg-[#F0F5F0] text-[#1F2421] text-xs sm:text-sm border border-[#E6E2D8] focus:outline-none focus:border-[#5D7052] focus:bg-white transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#1F2421]">Telefone / WhatsApp *</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(11) 98765-4321"
                className="w-full px-4 py-3 rounded-xl bg-[#F0F5F0] text-[#1F2421] text-xs sm:text-sm border border-[#E6E2D8] focus:outline-none focus:border-[#5D7052] focus:bg-white transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label className="text-xs font-semibold text-[#1F2421]">Selecione o Ritual Desejado *</label>
              <select
                value={ritualTitle}
                onChange={(e) => setRitualTitle(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#F0F5F0] text-[#1F2421] text-xs sm:text-sm border border-[#E6E2D8] focus:outline-none focus:border-[#5D7052] focus:bg-white transition-all"
              >
                {rituals.map((r) => (
                  <option key={r.id} value={r.title}>
                    {r.title} ({r.durationMinutes} min — R$ {r.priceBrl})
                  </option>
                ))}
                <option value="Experiência sob medida (Personalizada)">
                  Experiência sob medida (Personalizada pelo Concierge)
                </option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#1F2421]">Data Preferencial *</label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#F0F5F0] text-[#1F2421] text-xs sm:text-sm border border-[#E6E2D8] focus:outline-none focus:border-[#5D7052] focus:bg-white transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#1F2421]">Horário Preferencial *</label>
              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#F0F5F0] text-[#1F2421] text-xs sm:text-sm border border-[#E6E2D8] focus:outline-none focus:border-[#5D7052] focus:bg-white transition-all"
              >
                <option value="09:00">09:00</option>
                <option value="10:30">10:30</option>
                <option value="14:00">14:00</option>
                <option value="16:00">16:00</option>
                <option value="18:00">18:00</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label className="text-xs font-semibold text-[#1F2421]">Observações ou Preferências Sensoriais</label>
              <input
                type="text"
                value={sensoryPreference}
                onChange={(e) => setSensoryPreference(e.target.value)}
                placeholder="Ex: preferência por aromaterapia de lavanda, intensidade de toque leve/moderada..."
                className="w-full px-4 py-3 rounded-xl bg-[#F0F5F0] text-[#1F2421] text-xs sm:text-sm border border-[#E6E2D8] focus:outline-none focus:border-[#5D7052] focus:bg-white transition-all"
              />
            </div>

            <div className="sm:col-span-2 pt-2">
              <button
                type="submit"
                className="w-full py-4 rounded-full bg-[#5D7052] text-white font-semibold text-xs sm:text-sm uppercase tracking-wider shadow-md hover:bg-[#4B5C42] hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <span>Solicitar Reserva & Concierge</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Quick Contact Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-[#E6E2D8]">
            <div className="flex items-center gap-2 text-[#6E756F] text-xs">
              <MapPin className="w-4 h-4 text-[#5D7052] shrink-0" />
              <span>{branding.address} • {branding.cityState}</span>
            </div>
            <div className="flex items-center gap-2 text-[#6E756F] text-xs">
              <MessageSquare className="w-4 h-4 text-[#5D7052] shrink-0" />
              <span>Concierge: {branding.phone}</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {createdBooking && (
          <div className="fixed inset-0 z-50 bg-[#1F2421]/60 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-[#F8F6F2] rounded-3xl max-w-lg w-full p-8 relative shadow-2xl text-center border border-[#E6E2D8]"
            >
              <button
                onClick={() => setCreatedBooking(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-[#EBEFEA] text-[#1F2421] hover:bg-[#5D7052] hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-16 h-16 rounded-full bg-[#D4E9C5] text-[#5D7052] flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <span className="text-[10px] uppercase tracking-widest text-[#5D7052] font-bold">
                PRÉ-RESERVA RECEBIDA COM SUCESSO
              </span>

              <h3 className="font-serif text-2xl text-[#1F2421] mt-1 mb-2">
                Obrigado, {createdBooking.name}!
              </h3>

              <p className="text-xs text-[#6E756F] leading-relaxed mb-6">
                Sua pré-reserva para o ritual <strong className="text-[#1F2421]">{createdBooking.ritualTitle}</strong> para a data <strong className="text-[#1F2421]">{createdBooking.date} às {createdBooking.time}</strong> foi cadastrada. O nosso serviço de Concierge entrará em contato em breve para confirmar seu horário.
              </p>

              <div className="flex flex-col gap-3">
                <a
                  href={generateWhatsAppLink(createdBooking)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-full bg-[#5D7052] text-white font-semibold text-xs uppercase tracking-wider hover:bg-[#4B5C42] transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Confirmar Diretamente via WhatsApp</span>
                </a>

                <button
                  onClick={() => setCreatedBooking(null)}
                  className="text-xs text-[#6E756F] hover:text-[#1F2421] underline"
                >
                  Fechar janela
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
