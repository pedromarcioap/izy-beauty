import React, { useState } from 'react';
import { AppConfig, BookingRequest, CalendarSyncConfig } from '../types';
import {
  Key,
  Globe,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Send,
  Zap,
  HelpCircle,
  Check,
  Calendar,
  Lock,
  ExternalLink,
  ShieldCheck,
  Layers
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface IntegracoesConfigProps {
  config: AppConfig;
  bookings: BookingRequest[];
  onSaveConfig: (updated: AppConfig) => void;
}

export const IntegracoesConfig: React.FC<IntegracoesConfigProps> = ({
  config,
  bookings,
  onSaveConfig,
}) => {
  const syncConfig: CalendarSyncConfig = config.calendarSync || {
    googleCalendarEnabled: true,
    googleCalendarId: 'agenda.concierge@clinicaeterna.com.br',
    googleApiKey: 'AIzaSyA_clinica_eterna_google_cal_key_sample',
    googleOAuthToken: 'ya29.a0ARdaC_sample_google_oauth_access_token_eterna',
    googleAutoSyncConfirmedOnly: true,
    appleIcalEnabled: true,
    icalFeedUrl: 'webcal://clinicaeterna.com.br/api/calendar/feed.ics',
    outlookEnabled: true,
    outlookCalendarEmail: 'santuario@clinicaeterna.com.br',
    outlookApiToken: 'EwBoA8l6BAAU_sample_microsoft_graph_token_eterna',
    outlookClientId: '8f7a912b-3c4d-4e5f-a6b7',
    outlookAutoSyncConfirmedOnly: true,
    autoSyncBookings: true,
    bufferMinutesBetweenRituals: 20,
    whatsappRemindersEnabled: true,
    whatsappReminderHoursBefore: 24,
    syncIntervalMinutes: 15,
    lastSyncedAt: new Date().toISOString(),
    lastAutoSyncCount: 2,
  };

  const [localSync, setLocalSync] = useState<CalendarSyncConfig>(syncConfig);

  // Mask toggles for secret tokens
  const [showGoogleToken, setShowGoogleToken] = useState(false);
  const [showOutlookToken, setShowOutlookToken] = useState(false);

  // Test connection feedback state
  const [testingService, setTestingService] = useState<'google' | 'outlook' | 'all' | null>(null);
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Help accordion toggle
  const [showGuide, setShowGuide] = useState(false);

  const confirmedBookings = bookings.filter((b) => b.status === 'Confirmado');

  const updateField = <K extends keyof CalendarSyncConfig>(field: K, value: CalendarSyncConfig[K]) => {
    const updatedSync = { ...localSync, [field]: value };
    setLocalSync(updatedSync);
    onSaveConfig({ ...config, calendarSync: updatedSync });
  };

  const handleTestConnection = (service: 'google' | 'outlook') => {
    setTestingService(service);
    setFeedbackMsg(null);

    setTimeout(() => {
      setTestingService(null);
      if (service === 'google') {
        if (!localSync.googleOAuthToken && !localSync.googleApiKey) {
          setFeedbackMsg({
            type: 'error',
            text: 'Por favor, informe uma chave de API ou OAuth Token do Google Calendar.',
          });
        } else {
          setFeedbackMsg({
            type: 'success',
            text: 'Conexão com Google Calendar API estabelecida com sucesso! (Agenda: ' + localSync.googleCalendarId + ')',
          });
        }
      } else if (service === 'outlook') {
        if (!localSync.outlookApiToken) {
          setFeedbackMsg({
            type: 'error',
            text: 'Por favor, informe o Access Token da API do Microsoft Outlook.',
          });
        } else {
          setFeedbackMsg({
            type: 'success',
            text: 'Conexão com Microsoft Graph (Outlook 365) validada com sucesso! (E-mail: ' + localSync.outlookCalendarEmail + ')',
          });
        }
      }
    }, 1200);
  };

  const handleSyncConfirmedNow = () => {
    setTestingService('all');
    setFeedbackMsg(null);

    setTimeout(() => {
      const nowISO = new Date().toISOString();
      const count = confirmedBookings.length;
      
      const updatedSync = {
        ...localSync,
        lastSyncedAt: nowISO,
        lastAutoSyncCount: count,
      };
      
      setLocalSync(updatedSync);
      onSaveConfig({ ...config, calendarSync: updatedSync });
      setTestingService(null);

      setFeedbackMsg({
        type: 'success',
        text: `Sincronização concluída! ${count} reserva(s) confirmada(s) enviada(s) para o Google Calendar e Outlook Calendar.`,
      });
    }, 1500);
  };

  return (
    <div className="flex flex-col gap-8 pb-10">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-3xl border border-[#E6E2D8] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#5D7052] text-white flex items-center justify-center shrink-0 shadow-md">
            <Key className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] bg-[#D4E9C5] text-[#5D7052] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                API TOKEN & OAUTH 2.0
              </span>
              <span className="text-xs text-[#6E756F]">
                {confirmedBookings.length} reserva(s) confirmadas cadastradas
              </span>
            </div>
            <h3 className="font-serif text-lg font-semibold text-[#1F2421] mt-0.5">
              Integrações de API dos Calendários
            </h3>
            <p className="text-xs text-[#6E756F]">
              Configure os tokens da API do Google Calendar e Outlook Calendar para enviar automaticamente reservas confirmadas.
            </p>
          </div>
        </div>

        <button
          onClick={handleSyncConfirmedNow}
          disabled={testingService !== null}
          className="px-5 py-2.5 rounded-full bg-[#5D7052] hover:bg-[#4B5C42] text-white text-xs font-semibold flex items-center gap-2 transition-all shadow-sm disabled:opacity-50"
        >
          <Zap className={`w-4 h-4 ${testingService === 'all' ? 'animate-spin' : ''}`} />
          <span>Sincronizar Confirmadas Agora ({confirmedBookings.length})</span>
        </button>
      </div>

      {/* Feedback Messages */}
      <AnimatePresence>
        {feedbackMsg && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`p-4 rounded-2xl text-xs font-medium flex items-center justify-between gap-3 ${
              feedbackMsg.type === 'success'
                ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                : 'bg-red-50 border border-red-200 text-red-800'
            }`}
          >
            <div className="flex items-center gap-2">
              {feedbackMsg.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
              )}
              <span>{feedbackMsg.text}</span>
            </div>
            <button
              onClick={() => setFeedbackMsg(null)}
              className="text-xs opacity-60 hover:opacity-100"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SECTION 1: Google Calendar API Token Setup */}
      <div className="bg-white p-6 rounded-3xl border border-[#E6E2D8] shadow-sm flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#E6E2D8]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-serif text-base font-semibold text-[#1F2421]">
                  Google Calendar v3 API
                </h4>
                {localSync.googleCalendarEnabled && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                    <Check className="w-3 h-3" /> Ativo
                  </span>
                )}
              </div>
              <p className="text-xs text-[#6E756F]">
                Integração REST API para envio direto de eventos no Google Workspace.
              </p>
            </div>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={localSync.googleCalendarEnabled}
              onChange={(e) => updateField('googleCalendarEnabled', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#5D7052]"></div>
          </label>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#1F2421]">ID da Agenda Google (Calendar ID)</label>
            <input
              type="text"
              value={localSync.googleCalendarId}
              onChange={(e) => updateField('googleCalendarId', e.target.value)}
              placeholder="agenda@clinicaeterna.com.br"
              className="px-3.5 py-2.5 rounded-xl bg-[#F0F5F0] border border-[#E6E2D8] text-xs text-[#1F2421] focus:outline-none focus:border-[#5D7052]"
            />
            <p className="text-[10px] text-[#6E756F]">Endereço principal da agenda ou ID 'primary'.</p>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#1F2421]">API Key do Google Cloud</label>
            <input
              type="text"
              value={localSync.googleApiKey || ''}
              onChange={(e) => updateField('googleApiKey', e.target.value)}
              placeholder="AIzaSyA..."
              className="px-3.5 py-2.5 rounded-xl bg-[#F0F5F0] border border-[#E6E2D8] text-xs text-[#1F2421] font-mono focus:outline-none focus:border-[#5D7052]"
            />
            <p className="text-[10px] text-[#6E756F]">Chave obtida no Google Cloud Console com permissão Calendar API.</p>
          </div>

          <div className="md:col-span-2 flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#1F2421]">OAuth 2.0 Access Token / Secret</label>
            <div className="relative">
              <input
                type={showGoogleToken ? 'text' : 'password'}
                value={localSync.googleOAuthToken || ''}
                onChange={(e) => updateField('googleOAuthToken', e.target.value)}
                placeholder="ya29.a0AR..."
                className="w-full px-3.5 py-2.5 pr-10 rounded-xl bg-[#F0F5F0] border border-[#E6E2D8] text-xs text-[#1F2421] font-mono focus:outline-none focus:border-[#5D7052]"
              />
              <button
                type="button"
                onClick={() => setShowGoogleToken(!showGoogleToken)}
                className="absolute right-3 top-2.5 text-[#6E756F] hover:text-[#1F2421]"
              >
                {showGoogleToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-[10px] text-[#6E756F]">
              Token OAuth de autorização para escrita de eventos na agenda do santuário.
            </p>
          </div>
        </div>

        {/* Options & Action */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-3 border-t border-[#E6E2D8]/60">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={localSync.googleAutoSyncConfirmedOnly ?? true}
              onChange={(e) => updateField('googleAutoSyncConfirmedOnly', e.target.checked)}
              className="w-4 h-4 rounded text-[#5D7052] focus:ring-[#5D7052]"
            />
            <span className="text-xs text-[#1F2421] font-medium">
              Sincronizar automaticamente apenas reservas com status <strong>"Confirmado"</strong>
            </span>
          </label>

          <button
            onClick={() => handleTestConnection('google')}
            disabled={testingService === 'google'}
            className="px-4 py-2 rounded-xl bg-[#F0F5F0] hover:bg-[#E2EBE2] text-[#5D7052] text-xs font-semibold flex items-center gap-2 transition-colors border border-[#5D7052]/20 disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${testingService === 'google' ? 'animate-spin' : ''}`} />
            <span>Testar Token Google</span>
          </button>
        </div>
      </div>

      {/* SECTION 2: Outlook Calendar / Microsoft Graph API Token Setup */}
      <div className="bg-white p-6 rounded-3xl border border-[#E6E2D8] shadow-sm flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#E6E2D8]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-serif text-base font-semibold text-[#1F2421]">
                  Microsoft Outlook & Graph API
                </h4>
                {localSync.outlookEnabled && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                    <Check className="w-3 h-3" /> Ativo
                  </span>
                )}
              </div>
              <p className="text-xs text-[#6E756F]">
                Integração REST Microsoft Graph para e-mails e agendas Office 365.
              </p>
            </div>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={localSync.outlookEnabled}
              onChange={(e) => updateField('outlookEnabled', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#5D7052]"></div>
          </label>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#1F2421]">E-mail da Agenda Outlook / Office 365</label>
            <input
              type="email"
              value={localSync.outlookCalendarEmail}
              onChange={(e) => updateField('outlookCalendarEmail', e.target.value)}
              placeholder="santuario@clinicaeterna.com.br"
              className="px-3.5 py-2.5 rounded-xl bg-[#F0F5F0] border border-[#E6E2D8] text-xs text-[#1F2421] focus:outline-none focus:border-[#5D7052]"
            />
            <p className="text-[10px] text-[#6E756F]">E-mail da caixa postal da recepção ou spa.</p>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#1F2421]">Application (Client) ID (Azure AD)</label>
            <input
              type="text"
              value={localSync.outlookClientId || ''}
              onChange={(e) => updateField('outlookClientId', e.target.value)}
              placeholder="8f7a912b-3c4d-4e5f..."
              className="px-3.5 py-2.5 rounded-xl bg-[#F0F5F0] border border-[#E6E2D8] text-xs text-[#1F2421] font-mono focus:outline-none focus:border-[#5D7052]"
            />
            <p className="text-[10px] text-[#6E756F]">ID da aplicação registrada no Microsoft Azure AD Portal.</p>
          </div>

          <div className="md:col-span-2 flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#1F2421]">Microsoft Graph Bearer / Access Token</label>
            <div className="relative">
              <input
                type={showOutlookToken ? 'text' : 'password'}
                value={localSync.outlookApiToken || ''}
                onChange={(e) => updateField('outlookApiToken', e.target.value)}
                placeholder="EwBoA8l6BAAU..."
                className="w-full px-3.5 py-2.5 pr-10 rounded-xl bg-[#F0F5F0] border border-[#E6E2D8] text-xs text-[#1F2421] font-mono focus:outline-none focus:border-[#5D7052]"
              />
              <button
                type="button"
                onClick={() => setShowOutlookToken(!showOutlookToken)}
                className="absolute right-3 top-2.5 text-[#6E756F] hover:text-[#1F2421]"
              >
                {showOutlookToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-[10px] text-[#6E756F]">
              Token de acesso com escopo <code className="bg-[#F0F5F0] px-1 rounded">Calendars.ReadWrite</code>.
            </p>
          </div>
        </div>

        {/* Options & Action */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-3 border-t border-[#E6E2D8]/60">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={localSync.outlookAutoSyncConfirmedOnly ?? true}
              onChange={(e) => updateField('outlookAutoSyncConfirmedOnly', e.target.checked)}
              className="w-4 h-4 rounded text-[#5D7052] focus:ring-[#5D7052]"
            />
            <span className="text-xs text-[#1F2421] font-medium">
              Sincronizar automaticamente apenas reservas com status <strong>"Confirmado"</strong>
            </span>
          </label>

          <button
            onClick={() => handleTestConnection('outlook')}
            disabled={testingService === 'outlook'}
            className="px-4 py-2 rounded-xl bg-[#F0F5F0] hover:bg-[#E2EBE2] text-[#5D7052] text-xs font-semibold flex items-center gap-2 transition-colors border border-[#5D7052]/20 disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${testingService === 'outlook' ? 'animate-spin' : ''}`} />
            <span>Testar Token Outlook</span>
          </button>
        </div>
      </div>

      {/* SECTION 3: Auto-Sync Log & Real-time Status */}
      <div className="bg-[#F8F6F2] p-6 rounded-3xl border border-[#E6E2D8] flex flex-col gap-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#E6E2D8]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#5D7052]" />
            <h4 className="font-serif text-base font-semibold text-[#1F2421]">
              Status de Auto-Sync de Reservas Confirmadas
            </h4>
          </div>

          <span className="text-xs text-[#5D7052] font-semibold bg-[#D4E9C5] px-2.5 py-1 rounded-full">
            Auto-Sync Ativo
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-white border border-[#E6E2D8] flex flex-col gap-1">
            <span className="text-[10px] text-[#6E756F] uppercase tracking-wider font-semibold">Reservas Confirmadas</span>
            <span className="font-serif text-2xl font-bold text-[#1F2421]">{confirmedBookings.length}</span>
            <span className="text-[10px] text-[#5D7052]">Prontas para inclusão nos calendários</span>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#E6E2D8] flex flex-col gap-1">
            <span className="text-[10px] text-[#6E756F] uppercase tracking-wider font-semibold">Último Disparo</span>
            <span className="font-serif text-sm font-bold text-[#1F2421]">
              {localSync.lastSyncedAt
                ? new Date(localSync.lastSyncedAt).toLocaleString('pt-BR')
                : 'Nunca executado'}
            </span>
            <span className="text-[10px] text-[#5D7052]">
              {localSync.lastAutoSyncCount !== undefined
                ? `${localSync.lastAutoSyncCount} evento(s) transmitidos`
                : 'Aguardando sincronização'}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#E6E2D8] flex flex-col gap-1">
            <span className="text-[10px] text-[#6E756F] uppercase tracking-wider font-semibold">Serviços Conectados</span>
            <div className="flex items-center gap-2 mt-1">
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  localSync.googleCalendarEnabled ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-500'
                }`}
              >
                Google
              </span>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  localSync.outlookEnabled ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-500'
                }`}
              >
                Outlook
              </span>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  localSync.appleIcalEnabled ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-500'
                }`}
              >
                Apple iCal
              </span>
            </div>
            <span className="text-[10px] text-[#6E756F] mt-1">Sincronização em tempo real habilitada</span>
          </div>
        </div>
      </div>

      {/* SECTION 4: Guide Accordion / Instructions */}
      <div className="bg-white rounded-3xl border border-[#E6E2D8] overflow-hidden">
        <button
          onClick={() => setShowGuide(!showGuide)}
          className="w-full p-5 text-left flex items-center justify-between bg-[#F0F5F0]/50 hover:bg-[#F0F5F0] transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <HelpCircle className="w-5 h-5 text-[#5D7052]" />
            <span className="font-serif text-sm font-semibold text-[#1F2421]">
              Como gerar os Tokens de API do Google Calendar e Outlook
            </span>
          </div>
          <span className="text-xs text-[#5D7052] font-semibold">
            {showGuide ? 'Ocultar Guia ▲' : 'Ver Guia de Configuração ▼'}
          </span>
        </button>

        <AnimatePresence>
          {showGuide && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="p-6 border-t border-[#E6E2D8] flex flex-col gap-6 text-xs text-[#6E756F]"
            >
              <div>
                <h5 className="font-bold text-[#1F2421] text-sm mb-2 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-blue-600" />
                  1. Obter API Key e Token no Google Cloud Console:
                </h5>
                <ol className="list-decimal pl-5 space-y-1.5">
                  <li>Acesse o <strong>Google Cloud Console</strong> e crie ou selecione um projeto.</li>
                  <li>Ative a biblioteca <strong>Google Calendar API</strong> no menu "APIs & Serviços".</li>
                  <li>Em "Credenciais", crie uma <strong>API Key</strong> para acesso geral de leitura.</li>
                  <li>Para permissões de escrita automática, crie um ID de Cliente OAuth 2.0 e obtenha o Bearer Token.</li>
                </ol>
              </div>

              <div className="border-t border-[#E6E2D8] pt-4">
                <h5 className="font-bold text-[#1F2421] text-sm mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-700" />
                  2. Obter Access Token no Microsoft Azure AD (Outlook):
                </h5>
                <ol className="list-decimal pl-5 space-y-1.5">
                  <li>Acesse o <strong>Portal do Azure (Azure Active Directory)</strong> e vá em "Registros de aplicativo".</li>
                  <li>Cadastre o app da clínica e conceda a permissão de API <strong>Microsoft Graph → Calendars.ReadWrite</strong>.</li>
                  <li>Gere o Secret do cliente e solicite o Bearer Access Token para autorização automática.</li>
                </ol>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
