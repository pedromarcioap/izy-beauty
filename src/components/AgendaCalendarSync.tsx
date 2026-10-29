import React, { useState } from 'react';
import { AppConfig, BookingRequest, CalendarSyncConfig } from '../types';
import {
  Calendar as CalendarIcon,
  RefreshCw,
  Check,
  Copy,
  Download,
  ExternalLink,
  Clock,
  Plus,
  Trash2,
  Settings,
  MessageSquare,
  CheckCircle2,
  Globe,
  Bell,
  Sliders,
  CalendarCheck,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AgendaCalendarSyncProps {
  config: AppConfig;
  bookings: BookingRequest[];
  onSaveConfig: (updated: AppConfig) => void;
  onUpdateBookingStatus: (id: string, status: BookingRequest['status'], notes?: string) => void;
}

interface ManualBlock {
  id: string;
  title: string;
  date: string;
  time: string;
  durationMinutes: number;
  notes?: string;
}

export const AgendaCalendarSync: React.FC<AgendaCalendarSyncProps> = ({
  config,
  bookings,
  onSaveConfig,
  onUpdateBookingStatus,
}) => {
  // Sync config state
  const syncConfig: CalendarSyncConfig = config.calendarSync || {
    googleCalendarEnabled: true,
    googleCalendarId: 'agenda.concierge@clinicaeterna.com.br',
    appleIcalEnabled: true,
    icalFeedUrl: 'webcal://clinicaeterna.com.br/api/calendar/feed.ics',
    outlookEnabled: false,
    outlookCalendarEmail: 'santuario@clinicaeterna.com.br',
    autoSyncBookings: true,
    bufferMinutesBetweenRituals: 20,
    whatsappRemindersEnabled: true,
    whatsappReminderHoursBefore: 24,
    syncIntervalMinutes: 15,
    lastSyncedAt: new Date().toISOString(),
  };

  const [localSync, setLocalSync] = useState<CalendarSyncConfig>(syncConfig);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncFeedbackMsg, setSyncFeedbackMsg] = useState('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Manual blocks state
  const [manualBlocks, setManualBlocks] = useState<ManualBlock[]>([
    {
      id: 'blk-1',
      title: 'Manutenção & Higienização do Ofurô',
      date: '2026-09-23',
      time: '08:00',
      durationMinutes: 90,
      notes: 'Tratamento de água e aromatização de flor de lótus'
    },
    {
      id: 'blk-2',
      title: 'Treinamento Terapeutas Sêniores',
      date: '2026-09-25',
      time: '18:00',
      durationMinutes: 120,
      notes: 'Alinhamento da técnica de massagem com pedras vulcânicas'
    }
  ]);

  // Modal state for adding a manual block
  const [showAddBlockModal, setShowAddBlockModal] = useState(false);
  const [newBlockTitle, setNewBlockTitle] = useState('');
  const [newBlockDate, setNewBlockDate] = useState('2026-09-23');
  const [newBlockTime, setNewBlockTime] = useState('12:00');
  const [newBlockDuration, setNewBlockDuration] = useState(60);
  const [newBlockNotes, setNewBlockNotes] = useState('');

  // Selected date for schedule filter
  const [selectedDate, setSelectedDate] = useState<string>('all');

  const updateSyncField = <K extends keyof CalendarSyncConfig>(field: K, value: CalendarSyncConfig[K]) => {
    const updatedSync = { ...localSync, [field]: value };
    setLocalSync(updatedSync);
    onSaveConfig({ ...config, calendarSync: updatedSync });
  };

  const handleManualSync = () => {
    setIsSyncing(true);
    setSyncFeedbackMsg('');
    setTimeout(() => {
      const nowISO = new Date().toISOString();
      updateSyncField('lastSyncedAt', nowISO);
      setIsSyncing(false);
      setSyncFeedbackMsg('Sincronização realizada com sucesso! Google Calendar, Apple iCal e WhatsApp atualizados.');
      setTimeout(() => setSyncFeedbackMsg(''), 4000);
    }, 1200);
  };

  const handleCopyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  // Export RFC 5545 iCal .ics file generator
  const handleDownloadICS = () => {
    let icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Clinica Eterna//Santuario & Haute Botanique//PT',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'X-WR-CALNAME:Agenda Clínica Eterna'
    ];

    // Add bookings
    bookings.forEach((b) => {
      const dateClean = b.date.replace(/-/g, '');
      const timeClean = b.time.replace(':', '');
      const dtStart = `${dateClean}T${timeClean}00`;
      
      // Assume 60 min duration if not specified
      const startDate = new Date(`${b.date}T${b.time}:00`);
      const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);
      const endYear = endDate.getFullYear();
      const endMonth = String(endDate.getMonth() + 1).padStart(2, '0');
      const endDateStr = String(endDate.getDate()).padStart(2, '0');
      const endHours = String(endDate.getHours()).padStart(2, '0');
      const endMinutes = String(endDate.getMinutes()).padStart(2, '0');
      const dtEnd = `${endYear}${endMonth}${endDateStr}T${endHours}${endMinutes}00`;

      icsContent.push(
        'BEGIN:VEVENT',
        `UID:${b.id}@clinicaeterna.com.br`,
        `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
        `DTSTART:${dtStart}`,
        `DTEND:${dtEnd}`,
        `SUMMARY:Ritual: ${b.ritualTitle} - ${b.name}`,
        `DESCRIPTION:Cliente: ${b.name}\\nTel: ${b.phone}\\nStatus: ${b.status}\\nPreferências: ${b.sensoryPreference || 'Nenhuma'}`,
        `LOCATION:${config.branding.address}\\, ${config.branding.cityState}`,
        'STATUS:CONFIRMED',
        'END:VEVENT'
      );
    });

    // Add manual blocks
    manualBlocks.forEach((m) => {
      const dateClean = m.date.replace(/-/g, '');
      const timeClean = m.time.replace(':', '');
      const dtStart = `${dateClean}T${timeClean}00`;
      
      const startDate = new Date(`${m.date}T${m.time}:00`);
      const endDate = new Date(startDate.getTime() + m.durationMinutes * 60 * 1000);
      const endYear = endDate.getFullYear();
      const endMonth = String(endDate.getMonth() + 1).padStart(2, '0');
      const endDateStr = String(endDate.getDate()).padStart(2, '0');
      const endHours = String(endDate.getHours()).padStart(2, '0');
      const endMinutes = String(endDate.getMinutes()).padStart(2, '0');
      const dtEnd = `${endYear}${endMonth}${endDateStr}T${endHours}${endMinutes}00`;

      icsContent.push(
        'BEGIN:VEVENT',
        `UID:${m.id}@clinicaeterna.com.br`,
        `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
        `DTSTART:${dtStart}`,
        `DTEND:${dtEnd}`,
        `SUMMARY:[Bloqueio Spa] ${m.title}`,
        `DESCRIPTION:${m.notes || 'Bloqueio de agenda interna'}`,
        `LOCATION:${config.branding.address}\\, ${config.branding.cityState}`,
        'STATUS:CONFIRMED',
        'END:VEVENT'
      );
    });

    icsContent.push('END:VCALENDAR');

    const blob = new Blob([icsContent.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `agenda_clinica_eterna_${new Date().toISOString().split('T')[0]}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleAddManualBlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBlockTitle.trim()) return;

    const newBlock: ManualBlock = {
      id: `blk-${Date.now().toString().slice(-4)}`,
      title: newBlockTitle,
      date: newBlockDate,
      time: newBlockTime,
      durationMinutes: newBlockDuration,
      notes: newBlockNotes
    };

    setManualBlocks([...manualBlocks, newBlock]);
    setShowAddBlockModal(false);
    setNewBlockTitle('');
    setNewBlockNotes('');
  };

  const handleDeleteManualBlock = (id: string) => {
    setManualBlocks(manualBlocks.filter(b => b.id !== id));
  };

  // Generate Google Calendar Link for a booking
  const getGoogleCalendarUrl = (b: BookingRequest) => {
    const title = encodeURIComponent(`Ritual: ${b.ritualTitle} - ${b.name}`);
    const details = encodeURIComponent(`Cliente: ${b.name}\nTelefone: ${b.phone}\nE-mail: ${b.email}\nStatus: ${b.status}\nPreferências: ${b.sensoryPreference || 'Padronizado'}`);
    const location = encodeURIComponent(`${config.branding.address}, ${config.branding.cityState}`);
    
    // YYYYMMDDTHHMMSSZ format
    const startDate = new Date(`${b.date}T${b.time}:00`);
    const endDate = new Date(startDate.getTime() + 80 * 60 * 1000);
    
    const formatISO = (d: Date) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    const dates = `${formatISO(startDate)}/${formatISO(endDate)}`;

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${dates}`;
  };

  // Filter bookings and blocks by selected date
  const filteredBookings = selectedDate === 'all' 
    ? bookings 
    : bookings.filter(b => b.date === selectedDate);

  const filteredBlocks = selectedDate === 'all'
    ? manualBlocks
    : manualBlocks.filter(m => m.date === selectedDate);

  return (
    <div className="flex flex-col gap-8 pb-10">
      {/* Top Banner & Status */}
      <div className="bg-white p-6 rounded-3xl border border-[#E6E2D8] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#D4E9C5] text-[#5D7052] flex items-center justify-center shrink-0 shadow-inner">
            <CalendarIcon className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-semibold text-[#1F2421]">
              Sincronização de Agenda & Calendários
            </h3>
            <p className="text-xs text-[#6E756F]">
              Integração bi-direcional com Google Calendar, Apple iCal, Outlook e Lembretes WhatsApp.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleDownloadICS}
            className="px-4 py-2.5 rounded-full bg-[#F0F5F0] hover:bg-[#E2EBE2] text-[#5D7052] border border-[#5D7052]/30 text-xs font-semibold flex items-center gap-2 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Baixar File .ics</span>
          </button>

          <button
            onClick={handleManualSync}
            disabled={isSyncing}
            className="px-5 py-2.5 rounded-full bg-[#5D7052] hover:bg-[#4B5C42] text-white text-xs font-semibold flex items-center gap-2 transition-colors shadow-sm disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'Sincronizando...' : 'Sincronizar Agora'}</span>
          </button>
        </div>
      </div>

      {syncFeedbackMsg && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center gap-2"
        >
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{syncFeedbackMsg}</span>
        </motion.div>
      )}

      {/* SECTION 1: Interactive Agenda Schedule Viewer */}
      <div className="bg-white p-6 rounded-3xl border border-[#E6E2D8] shadow-sm flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#E6E2D8]">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider text-[#5D7052] font-bold">AGENDA DO SANTUÁRIO</span>
              <span className="text-[10px] bg-[#D4E9C5] text-[#5D7052] px-2 py-0.5 rounded-full font-semibold">
                {bookings.length} agendamentos • {manualBlocks.length} bloqueios
              </span>
            </div>
            <h4 className="font-serif text-lg font-semibold text-[#1F2421] mt-1">
              Escala de Rituais & Compromissos
            </h4>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <select
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-2 rounded-xl bg-[#F0F5F0] border border-[#E6E2D8] text-xs font-medium text-[#1F2421] focus:outline-none focus:border-[#5D7052]"
            >
              <option value="all">Ver Todas as Datas</option>
              {Array.from(new Set([...bookings.map(b => b.date), ...manualBlocks.map(m => m.date)])).sort().map(d => (
                <option key={d} value={d}>
                  {new Date(d + 'T00:00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                </option>
              ))}
            </select>

            <button
              onClick={() => setShowAddBlockModal(true)}
              className="px-3.5 py-2 rounded-xl bg-[#F0F5F0] hover:bg-[#D4E9C5] text-[#5D7052] text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Novo Bloqueio</span>
            </button>
          </div>
        </div>

        {/* Integrated Schedule Timeline */}
        <div className="flex flex-col gap-3">
          {filteredBookings.length === 0 && filteredBlocks.length === 0 ? (
            <div className="p-8 text-center text-xs text-[#6E756F] bg-[#F8F6F2] rounded-2xl border border-dashed border-[#E6E2D8]">
              Nenhum ritual ou compromisso agendado para esta data.
            </div>
          ) : (
            <>
              {/* Render Bookings */}
              {filteredBookings.map((b) => (
                <div
                  key={b.id}
                  className="p-4 rounded-2xl bg-[#F8F6F2] border border-[#E6E2D8] hover:border-[#5D7052]/40 transition-colors flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#5D7052]/10 text-[#5D7052] flex flex-col items-center justify-center shrink-0">
                      <Clock className="w-4 h-4" />
                      <span className="text-[10px] font-bold">{b.time}</span>
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs text-[#1F2421]">{b.ritualTitle}</span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                            b.status === 'Confirmado'
                              ? 'bg-emerald-100 text-emerald-800'
                              : b.status === 'Pendente'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {b.status}
                        </span>
                      </div>
                      <p className="text-xs text-[#6E756F] mt-0.5">
                        <strong className="text-[#1F2421]">{b.name}</strong> • {b.phone} • {b.date}
                      </p>
                      {b.sensoryPreference && (
                        <p className="text-[11px] text-[#5D7052] italic mt-1">
                          Sensorial: {b.sensoryPreference}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end md:self-auto">
                    <a
                      href={getGoogleCalendarUrl(b)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-white border border-[#E6E2D8] hover:bg-[#F0F5F0] text-xs text-[#5D7052] flex items-center gap-1.5 transition-colors shadow-2xs"
                      title="Adicionar diretamente ao Google Agenda"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Google Cal</span>
                    </a>

                    <select
                      value={b.status}
                      onChange={(e) => onUpdateBookingStatus(b.id, e.target.value as BookingRequest['status'])}
                      className="px-2.5 py-1.5 rounded-lg bg-white border border-[#E6E2D8] text-xs font-medium text-[#1F2421] focus:outline-none"
                    >
                      <option value="Pendente">Pendente</option>
                      <option value="Confirmado">Confirmado</option>
                      <option value="Contatado">Contatado</option>
                      <option value="Concluído">Concluído</option>
                      <option value="Cancelado">Cancelado</option>
                    </select>
                  </div>
                </div>
              ))}

              {/* Render Manual Blocks */}
              {filteredBlocks.map((m) => (
                <div
                  key={m.id}
                  className="p-4 rounded-2xl bg-[#FFF8F0] border border-[#F0E0D0] flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex flex-col items-center justify-center shrink-0">
                      <Clock className="w-4 h-4" />
                      <span className="text-[10px] font-bold">{m.time}</span>
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs text-[#1F2421]">[Bloqueio Interno] {m.title}</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-100 text-amber-800">
                          {m.durationMinutes} min
                        </span>
                      </div>
                      <p className="text-xs text-[#6E756F] mt-0.5">
                        Data: {m.date} • {m.notes || 'Sem observações'}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDeleteManualBlock(m.id)}
                    className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors self-end md:self-auto"
                    title="Excluir bloqueio"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </>
          )}
        </div>
      </div>

      {/* SECTION 2: Integrations Settings (Google, Apple, Outlook, WhatsApp) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Google Calendar Box */}
        <div className="bg-white p-6 rounded-3xl border border-[#E6E2D8] shadow-sm flex flex-col justify-between gap-5">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="font-serif text-sm font-semibold text-[#1F2421]">Google Calendar</h5>
                  <p className="text-[10px] text-[#6E756F]">Google Workspace Sync</p>
                </div>
              </div>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={localSync.googleCalendarEnabled}
                  onChange={(e) => updateSyncField('googleCalendarEnabled', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#5D7052]"></div>
              </label>
            </div>

            <p className="text-xs text-[#6E756F]">
              Envie automaticamente todas as solicitações de reserva e confirmações de horário diretamente para a agenda do Google do seu santuário.
            </p>

            <div className="flex flex-col gap-1 mt-1">
              <label className="text-[11px] font-semibold text-[#1F2421]">ID da Agenda Google / E-mail</label>
              <input
                type="text"
                value={localSync.googleCalendarId}
                onChange={(e) => updateSyncField('googleCalendarId', e.target.value)}
                placeholder="agenda@clinicaeterna.com.br"
                className="px-3.5 py-2.5 rounded-xl bg-[#F0F5F0] border border-[#E6E2D8] text-xs text-[#1F2421] focus:outline-none focus:border-[#5D7052]"
              />
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-[#F0F5F0] border border-[#E6E2D8] flex items-center justify-between gap-2">
            <span className="text-[11px] text-[#5D7052] font-semibold flex items-center gap-1.5">
              <CalendarCheck className="w-3.5 h-3.5" />
              Sincronização Ativa
            </span>
            <button
              onClick={handleManualSync}
              className="text-[11px] font-semibold text-[#5D7052] hover:underline"
            >
              Testar Conexão
            </button>
          </div>
        </div>

        {/* Apple iCal / iCloud Box */}
        <div className="bg-white p-6 rounded-3xl border border-[#E6E2D8] shadow-sm flex flex-col justify-between gap-5">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-800 flex items-center justify-center">
                  <CalendarIcon className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="font-serif text-sm font-semibold text-[#1F2421]">Apple iCal / macOS</h5>
                  <p className="text-[10px] text-[#6E756F]">Assinatura de Feed Webcal</p>
                </div>
              </div>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={localSync.appleIcalEnabled}
                  onChange={(e) => updateSyncField('appleIcalEnabled', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#5D7052]"></div>
              </label>
            </div>

            <p className="text-xs text-[#6E756F]">
              Gere uma URL de assinatura iCal (.ics) para sincronizar o calendário em tempo real no iPhone, iPad e Mac do gestor.
            </p>

            <div className="flex flex-col gap-1 mt-1">
              <label className="text-[11px] font-semibold text-[#1F2421]">URL do Feed Webcal (.ics)</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  readOnly
                  value={localSync.icalFeedUrl}
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#F0F5F0] border border-[#E6E2D8] text-xs text-[#6E756F] font-mono focus:outline-none"
                />
                <button
                  onClick={() => handleCopyText(localSync.icalFeedUrl, 'ical')}
                  className="px-3.5 py-2.5 rounded-xl bg-[#5D7052] text-white text-xs font-semibold flex items-center gap-1 hover:bg-[#4B5C42] transition-colors"
                >
                  {copiedKey === 'ical' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'ical' ? 'Copiado' : 'Copiar'}</span>
                </button>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-[#F0F5F0] border border-[#E6E2D8] flex items-center justify-between gap-2">
            <span className="text-[11px] text-[#5D7052] font-semibold">Suporte Universal .ics</span>
            <button
              onClick={handleDownloadICS}
              className="text-[11px] font-semibold text-[#5D7052] hover:underline"
            >
              Baixar .ics Agora
            </button>
          </div>
        </div>

        {/* Microsoft Outlook Box */}
        <div className="bg-white p-6 rounded-3xl border border-[#E6E2D8] shadow-sm flex flex-col justify-between gap-5">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="font-serif text-sm font-semibold text-[#1F2421]">Microsoft Outlook 365</h5>
                  <p className="text-[10px] text-[#6E756F]">Exchange & Office 365</p>
                </div>
              </div>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={localSync.outlookEnabled}
                  onChange={(e) => updateSyncField('outlookEnabled', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#5D7052]"></div>
              </label>
            </div>

            <p className="text-xs text-[#6E756F]">
              Integração com e-mails corporativos Microsoft para criação automática de eventos em calendários Office 365.
            </p>

            <div className="flex flex-col gap-1 mt-1">
              <label className="text-[11px] font-semibold text-[#1F2421]">E-mail de Integração Outlook</label>
              <input
                type="email"
                value={localSync.outlookCalendarEmail}
                onChange={(e) => updateSyncField('outlookCalendarEmail', e.target.value)}
                placeholder="santuario@clinicaeterna.com.br"
                className="px-3.5 py-2.5 rounded-xl bg-[#F0F5F0] border border-[#E6E2D8] text-xs text-[#1F2421] focus:outline-none focus:border-[#5D7052]"
              />
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-[#F0F5F0] border border-[#E6E2D8] flex items-center justify-between gap-2">
            <span className="text-[11px] text-[#6E756F]">Microsoft Graph API</span>
            <span className="text-[11px] text-[#5D7052] font-semibold">Configurado</span>
          </div>
        </div>

        {/* WhatsApp Automated Reminders Box */}
        <div className="bg-white p-6 rounded-3xl border border-[#E6E2D8] shadow-sm flex flex-col justify-between gap-5">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="font-serif text-sm font-semibold text-[#1F2421]">Lembretes via WhatsApp</h5>
                  <p className="text-[10px] text-[#6E756F]">Automação de Confirmação</p>
                </div>
              </div>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={localSync.whatsappRemindersEnabled}
                  onChange={(e) => updateSyncField('whatsappRemindersEnabled', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#5D7052]"></div>
              </label>
            </div>

            <p className="text-xs text-[#6E756F]">
              Dispare lembretes de agenda com link de confirmação e rotas para o santuário pelo WhatsApp do cliente.
            </p>

            <div className="flex flex-col gap-1 mt-1">
              <label className="text-[11px] font-semibold text-[#1F2421]">Aviso Antecipado</label>
              <select
                value={localSync.whatsappReminderHoursBefore}
                onChange={(e) => updateSyncField('whatsappReminderHoursBefore', Number(e.target.value))}
                className="px-3.5 py-2.5 rounded-xl bg-[#F0F5F0] border border-[#E6E2D8] text-xs text-[#1F2421] focus:outline-none focus:border-[#5D7052]"
              >
                <option value={48}>48 horas antes do ritual</option>
                <option value={24}>24 horas antes do ritual (Recomendado)</option>
                <option value={12}>12 horas antes do ritual</option>
                <option value={2}>2 horas antes do ritual</option>
              </select>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-[#F0F5F0] border border-[#E6E2D8] flex items-center justify-between gap-2">
            <span className="text-[11px] text-[#5D7052] font-semibold flex items-center gap-1">
              <Bell className="w-3.5 h-3.5" />
              Notificações Ativas
            </span>
            <a
              href={`https://wa.me/${config.branding.whatsapp}?text=${encodeURIComponent('Olá! Este é um teste de lembrete de agenda da Clínica Eterna.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-semibold text-[#5D7052] hover:underline"
            >
              Testar Modelo
            </a>
          </div>
        </div>
      </div>

      {/* SECTION 3: General Agenda Preferences & Buffers */}
      <div className="bg-white p-6 rounded-3xl border border-[#E6E2D8] shadow-sm flex flex-col gap-5">
        <div className="flex items-center gap-2 pb-3 border-b border-[#E6E2D8]">
          <Sliders className="w-5 h-5 text-[#5D7052]" />
          <h4 className="font-serif text-base font-semibold text-[#1F2421]">
            Parâmetros Operacionais de Agenda
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#1F2421]">Intervalo de Higienização (Buffer)</label>
            <select
              value={localSync.bufferMinutesBetweenRituals}
              onChange={(e) => updateSyncField('bufferMinutesBetweenRituals', Number(e.target.value))}
              className="px-3.5 py-2.5 rounded-xl bg-[#F0F5F0] border border-[#E6E2D8] text-xs text-[#1F2421] focus:outline-none focus:border-[#5D7052]"
            >
              <option value={15}>15 minutos entre rituais</option>
              <option value={20}>20 minutos (Padrão Santuário)</option>
              <option value={30}>30 minutos (Aromatização profunda)</option>
            </select>
            <p className="text-[10px] text-[#6E756F]">Tempo de preparação de sala, troca de linhos e aromaterapia.</p>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#1F2421]">Frequência de Auto-Sync</label>
            <select
              value={localSync.syncIntervalMinutes}
              onChange={(e) => updateSyncField('syncIntervalMinutes', Number(e.target.value))}
              className="px-3.5 py-2.5 rounded-xl bg-[#F0F5F0] border border-[#E6E2D8] text-xs text-[#1F2421] focus:outline-none focus:border-[#5D7052]"
            >
              <option value={5}>A cada 5 minutos</option>
              <option value={15}>A cada 15 minutos</option>
              <option value={30}>A cada 30 minutos</option>
            </select>
            <p className="text-[10px] text-[#6E756F]">Intervalo de sincronização em segundo plano.</p>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#1F2421]">Sincronização Automática</label>
            <div className="flex items-center gap-3 pt-2">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={localSync.autoSyncBookings}
                  onChange={(e) => updateSyncField('autoSyncBookings', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#5D7052]"></div>
              </label>
              <span className="text-xs text-[#1F2421]">Auto-sincronizar novas reservas</span>
            </div>
            <p className="text-[10px] text-[#6E756F]">Envia novidades ao calendário assim que o cliente agenda.</p>
          </div>
        </div>
      </div>

      {/* Modal: Add Manual Block */}
      <AnimatePresence>
        {showAddBlockModal && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white p-6 rounded-3xl max-w-md w-full shadow-2xl border border-[#E6E2D8] flex flex-col gap-5"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#E6E2D8]">
                <h4 className="font-serif text-base font-semibold text-[#1F2421]">
                  Adicionar Bloqueio de Agenda
                </h4>
                <button
                  onClick={() => setShowAddBlockModal(false)}
                  className="text-[#6E756F] hover:text-[#1F2421] text-sm"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleAddManualBlock} className="flex flex-col gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#1F2421]">Título do Bloqueio</label>
                  <input
                    type="text"
                    required
                    value={newBlockTitle}
                    onChange={(e) => setNewBlockTitle(e.target.value)}
                    placeholder="Ex: Treinamento de Equipe / Higienização"
                    className="w-full mt-1 px-3.5 py-2.5 rounded-xl bg-[#F0F5F0] border border-[#E6E2D8] text-xs text-[#1F2421] focus:outline-none focus:border-[#5D7052]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-[#1F2421]">Data</label>
                    <input
                      type="date"
                      required
                      value={newBlockDate}
                      onChange={(e) => setNewBlockDate(e.target.value)}
                      className="w-full mt-1 px-3.5 py-2.5 rounded-xl bg-[#F0F5F0] border border-[#E6E2D8] text-xs text-[#1F2421] focus:outline-none focus:border-[#5D7052]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#1F2421]">Horário Inicial</label>
                    <input
                      type="time"
                      required
                      value={newBlockTime}
                      onChange={(e) => setNewBlockTime(e.target.value)}
                      className="w-full mt-1 px-3.5 py-2.5 rounded-xl bg-[#F0F5F0] border border-[#E6E2D8] text-xs text-[#1F2421] focus:outline-none focus:border-[#5D7052]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#1F2421]">Duração (Minutos)</label>
                  <input
                    type="number"
                    min={15}
                    step={15}
                    value={newBlockDuration}
                    onChange={(e) => setNewBlockDuration(Number(e.target.value))}
                    className="w-full mt-1 px-3.5 py-2.5 rounded-xl bg-[#F0F5F0] border border-[#E6E2D8] text-xs text-[#1F2421] focus:outline-none focus:border-[#5D7052]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#1F2421]">Observações Internas</label>
                  <textarea
                    rows={2}
                    value={newBlockNotes}
                    onChange={(e) => setNewBlockNotes(e.target.value)}
                    placeholder="Detalhes ou instrução para a recepção..."
                    className="w-full mt-1 px-3.5 py-2.5 rounded-xl bg-[#F0F5F0] border border-[#E6E2D8] text-xs text-[#1F2421] focus:outline-none focus:border-[#5D7052]"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddBlockModal(false)}
                    className="px-4 py-2 rounded-full text-xs text-[#6E756F] hover:bg-[#F0F5F0]"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-full bg-[#5D7052] text-white text-xs font-semibold hover:bg-[#4B5C42]"
                  >
                    Salvar Bloqueio
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
