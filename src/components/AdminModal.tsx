import React, { useState } from 'react';
import { AppConfig, BookingRequest, HeaderStyle, Ritual, Testimonial } from '../types';
import { Shield, X, Lock, Save, RotateCcw, Download, Upload, Plus, Trash2, Edit3, CheckCircle, MessageSquare, Image, Sparkles, Sliders, Calendar, ListOrdered, RefreshCw, Key } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AgendaCalendarSync } from './AgendaCalendarSync';
import { IntegracoesConfig } from './IntegracoesConfig';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: AppConfig;
  bookings: BookingRequest[];
  onSaveConfig: (updated: AppConfig) => void;
  onResetConfig: () => void;
  onUpdateBookingStatus: (id: string, status: BookingRequest['status'], notes?: string) => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  config,
  bookings,
  onSaveConfig,
  onResetConfig,
  onUpdateBookingStatus,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

  const [activeTab, setActiveTab] = useState<'crm' | 'agenda' | 'integrations' | 'branding' | 'content' | 'rituals' | 'testimonials' | 'media' | 'import_export'>('crm');

  // Local draft state
  const [draftConfig, setDraftConfig] = useState<AppConfig>(config);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');

  // Edit states for Ritual
  const [editingRitual, setEditingRitual] = useState<Ritual | null>(null);
  const [isNewRitual, setIsNewRitual] = useState(false);

  // Edit states for Testimonial
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [isNewTestimonial, setIsNewTestimonial] = useState(false);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'admin' || passwordInput === 'eterna2025' || passwordInput === '123456') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Senha incorreta. Use "admin" ou "eterna2025"');
    }
  };

  const handleSaveAll = () => {
    onSaveConfig(draftConfig);
    setSaveSuccessMsg('Alterações salvas com sucesso!');
    setTimeout(() => setSaveSuccessMsg(''), 3000);
  };

  const handleReset = () => {
    if (window.confirm('Tem certeza que deseja restaurar as configurações padrão da Clínica Eterna?')) {
      onResetConfig();
      onClose();
    }
  };

  // Export JSON file
  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(draftConfig, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `clinica_eterna_config_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Import JSON file
  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], 'UTF-8');
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          setDraftConfig(parsed);
          onSaveConfig(parsed);
          alert('Configurações importadas com sucesso!');
        } catch (err) {
          alert('Erro ao importar JSON: arquivo inválido.');
        }
      };
    }
  };

  // Ritual CRUD operations
  const handleSaveRitual = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRitual) return;

    let updatedRituals = [...draftConfig.rituals];
    if (isNewRitual) {
      updatedRituals.push(editingRitual);
    } else {
      updatedRituals = updatedRituals.map((r) => (r.id === editingRitual.id ? editingRitual : r));
    }

    const updated = { ...draftConfig, rituals: updatedRituals };
    setDraftConfig(updated);
    onSaveConfig(updated);
    setEditingRitual(null);
  };

  const handleDeleteRitual = (id: string) => {
    if (window.confirm('Excluir este ritual permanentemente?')) {
      const updatedRituals = draftConfig.rituals.filter((r) => r.id !== id);
      const updated = { ...draftConfig, rituals: updatedRituals };
      setDraftConfig(updated);
      onSaveConfig(updated);
    }
  };

  // Testimonial CRUD operations
  const handleSaveTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTestimonial) return;

    let updatedTestimonials = [...draftConfig.testimonials];
    if (isNewTestimonial) {
      updatedTestimonials.push(editingTestimonial);
    } else {
      updatedTestimonials = updatedTestimonials.map((t) => (t.id === editingTestimonial.id ? editingTestimonial : t));
    }

    const updated = { ...draftConfig, testimonials: updatedTestimonials };
    setDraftConfig(updated);
    onSaveConfig(updated);
    setEditingTestimonial(null);
  };

  const handleDeleteTestimonial = (id: string) => {
    if (window.confirm('Excluir este depoimento?')) {
      const updatedTestimonials = draftConfig.testimonials.filter((t) => t.id !== id);
      const updated = { ...draftConfig, testimonials: updatedTestimonials };
      setDraftConfig(updated);
      onSaveConfig(updated);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#1F2421]/70 backdrop-blur-md flex items-center justify-center p-2 sm:p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-[#F8F6F2] text-[#1F2421] rounded-3xl max-w-5xl w-full h-[90vh] flex flex-col shadow-2xl border border-[#E6E2D8] overflow-hidden"
      >
        {/* Header Bar */}
        <div className="px-6 py-4 bg-[#1C211D] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#5D7052] flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="font-serif text-lg tracking-wide font-semibold text-white">
                Painel Administrativo White-Label & CMS
              </h2>
              <p className="text-[10px] text-[#C4C8BD]">
                Gestão de Conteúdo, Reservas CRM & Identidade Visual
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Authentication Wall */}
        {!isAuthenticated ? (
          <div className="flex-1 flex items-center justify-center p-6 bg-[#F8F6F2]">
            <form onSubmit={handleLogin} className="bg-white p-8 rounded-3xl shadow-lg border border-[#E6E2D8] max-w-md w-full flex flex-col gap-5 text-center">
              <div className="w-12 h-12 rounded-full bg-[#D4E9C5] text-[#5D7052] flex items-center justify-center mx-auto">
                <Lock className="w-6 h-6" />
              </div>

              <div>
                <h3 className="font-serif text-xl text-[#1F2421] font-semibold">
                  Acesso Restrito ao Gestor
                </h3>
                <p className="text-xs text-[#6E756F] mt-1">
                  Digite a senha para acessar o painel de controle do produto.
                </p>
              </div>

              {authError && (
                <div className="p-2.5 rounded-xl bg-red-50 text-red-600 text-xs font-medium">
                  {authError}
                </div>
              )}

              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Digite sua senha..."
                className="w-full px-4 py-3 rounded-xl bg-[#F0F5F0] border border-[#E6E2D8] text-xs text-[#1F2421] focus:outline-none focus:border-[#5D7052]"
              />

              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-[#5D7052] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#4B5C42] transition-colors"
              >
                Entrar no Painel
              </button>

              <button
                type="button"
                onClick={() => {
                  setPasswordInput('admin');
                  setIsAuthenticated(true);
                }}
                className="text-[11px] text-[#5D7052] hover:underline"
              >
                (Atalho de demonstração: Entrar como Admin)
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden bg-[#F8F6F2]">
            {/* Sidebar Tabs */}
            <div className="w-full md:w-64 bg-[#EBEFEA] p-4 border-r border-[#E6E2D8] flex md:flex-col gap-1 overflow-x-auto shrink-0">
              <button
                onClick={() => setActiveTab('crm')}
                className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-semibold text-left transition-colors whitespace-nowrap ${
                  activeTab === 'crm'
                    ? 'bg-[#5D7052] text-white shadow-sm'
                    : 'text-[#1F2421] hover:bg-[#D4E9C5]'
                }`}
              >
                <ListOrdered className="w-4 h-4" />
                <span>Reservas CRM ({bookings.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('agenda')}
                className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-semibold text-left transition-colors whitespace-nowrap ${
                  activeTab === 'agenda'
                    ? 'bg-[#5D7052] text-white shadow-sm'
                    : 'text-[#1F2421] hover:bg-[#D4E9C5]'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>Agenda & Sync Calendários</span>
              </button>

              <button
                onClick={() => setActiveTab('integrations')}
                className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-semibold text-left transition-colors whitespace-nowrap ${
                  activeTab === 'integrations'
                    ? 'bg-[#5D7052] text-white shadow-sm'
                    : 'text-[#1F2421] hover:bg-[#D4E9C5]'
                }`}
              >
                <Key className="w-4 h-4" />
                <span>Integrações API (Tokens)</span>
              </button>

              <button
                onClick={() => setActiveTab('branding')}
                className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-semibold text-left transition-colors whitespace-nowrap ${
                  activeTab === 'branding'
                    ? 'bg-[#5D7052] text-white shadow-sm'
                    : 'text-[#1F2421] hover:bg-[#D4E9C5]'
                }`}
              >
                <Sliders className="w-4 h-4" />
                <span>Branding & Visual</span>
              </button>

              <button
                onClick={() => setActiveTab('content')}
                className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-semibold text-left transition-colors whitespace-nowrap ${
                  activeTab === 'content'
                    ? 'bg-[#5D7052] text-white shadow-sm'
                    : 'text-[#1F2421] hover:bg-[#D4E9C5]'
                }`}
              >
                <Edit3 className="w-4 h-4" />
                <span>Textos & Manifesto</span>
              </button>

              <button
                onClick={() => setActiveTab('rituals')}
                className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-semibold text-left transition-colors whitespace-nowrap ${
                  activeTab === 'rituals'
                    ? 'bg-[#5D7052] text-white shadow-sm'
                    : 'text-[#1F2421] hover:bg-[#D4E9C5]'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>Gestor de Rituais ({draftConfig.rituals.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('testimonials')}
                className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-semibold text-left transition-colors whitespace-nowrap ${
                  activeTab === 'testimonials'
                    ? 'bg-[#5D7052] text-white shadow-sm'
                    : 'text-[#1F2421] hover:bg-[#D4E9C5]'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>Depoimentos ({draftConfig.testimonials.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('media')}
                className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-semibold text-left transition-colors whitespace-nowrap ${
                  activeTab === 'media'
                    ? 'bg-[#5D7052] text-white shadow-sm'
                    : 'text-[#1F2421] hover:bg-[#D4E9C5]'
                }`}
              >
                <Image className="w-4 h-4" />
                <span>Gerenciador Mídia</span>
              </button>

              <button
                onClick={() => setActiveTab('import_export')}
                className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-semibold text-left transition-colors whitespace-nowrap ${
                  activeTab === 'import_export'
                    ? 'bg-[#5D7052] text-white shadow-sm'
                    : 'text-[#1F2421] hover:bg-[#D4E9C5]'
                }`}
              >
                <Download className="w-4 h-4" />
                <span>Exportar / Reset</span>
              </button>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 p-6 overflow-y-auto bg-[#F8F6F2]">
              {saveSuccessMsg && (
                <div className="mb-4 p-3 rounded-xl bg-green-100 text-green-800 text-xs font-semibold flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>{saveSuccessMsg}</span>
                </div>
              )}

              {/* TAB 1: RESERVAS CRM */}
              {activeTab === 'crm' && (
                <div className="flex flex-col gap-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-serif text-xl font-semibold text-[#1F2421]">
                        Gestão de Solicitantes & Leads de Concierge
                      </h3>
                      <p className="text-xs text-[#6E756F]">
                        Acompanhe pedidos de pré-reserva e inicie contato direto via WhatsApp.
                      </p>
                    </div>
                  </div>

                  {bookings.length === 0 ? (
                    <div className="bg-white p-8 text-center rounded-2xl border border-[#E6E2D8] text-xs text-[#6E756F]">
                      Nenhuma solicitação de reserva encontrada até o momento.
                    </div>
                  ) : (
                    <div className="bg-white rounded-2xl border border-[#E6E2D8] overflow-hidden shadow-sm">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-xs">
                          <thead>
                            <tr className="bg-[#EBEFEA] text-[#1F2421] font-semibold border-b border-[#E6E2D8]">
                              <th className="p-3">Cliente</th>
                              <th className="p-3">Ritual Solicitado</th>
                              <th className="p-3">Data / Hora</th>
                              <th className="p-3">Contato</th>
                              <th className="p-3">Status</th>
                              <th className="p-3 text-right">Ação</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#E6E2D8]">
                            {bookings.map((b) => (
                              <tr key={b.id} className="hover:bg-[#F0F5F0]/50">
                                <td className="p-3 font-semibold text-[#1F2421]">
                                  {b.name}
                                  <div className="text-[10px] text-[#6E756F] font-normal">{b.email}</div>
                                </td>
                                <td className="p-3 text-[#5D7052] font-medium">{b.ritualTitle}</td>
                                <td className="p-3 whitespace-nowrap">
                                  {b.date} às {b.time}
                                </td>
                                <td className="p-3">{b.phone}</td>
                                <td className="p-3">
                                  <select
                                    value={b.status}
                                    onChange={(e) =>
                                      onUpdateBookingStatus(b.id, e.target.value as BookingRequest['status'])
                                    }
                                    className="px-2 py-1 rounded-lg text-[10px] font-semibold bg-[#F0F5F0] border border-[#E6E2D8] text-[#1F2421]"
                                  >
                                    <option value="Pendente">Pendente</option>
                                    <option value="Confirmado">Confirmado</option>
                                    <option value="Contatado">Contatado</option>
                                    <option value="Concluído">Concluído</option>
                                    <option value="Cancelado">Cancelado</option>
                                  </select>
                                </td>
                                <td className="p-3 text-right">
                                  <a
                                    href={`https://wa.me/${b.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                                      `Olá ${b.name}! Sou o Concierge da ${draftConfig.branding.clinicName}. Gostaria de confirmar seu agendamento para ${b.ritualTitle} no dia ${b.date} às ${b.time}.`
                                    )}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#5D7052] text-white text-[10px] font-semibold hover:bg-[#4B5C42]"
                                  >
                                    <MessageSquare className="w-3 h-3" />
                                    <span>WhatsApp</span>
                                  </a>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: AGENDA & CALENDAR SYNC */}
              {activeTab === 'agenda' && (
                <AgendaCalendarSync
                  config={draftConfig}
                  bookings={bookings}
                  onSaveConfig={setDraftConfig}
                  onUpdateBookingStatus={onUpdateBookingStatus}
                />
              )}

              {/* TAB 3: INTEGRAÇÕES API (GOOGLE & OUTLOOK TOKENS) */}
              {activeTab === 'integrations' && (
                <IntegracoesConfig
                  config={draftConfig}
                  bookings={bookings}
                  onSaveConfig={setDraftConfig}
                />
              )}

              {/* TAB 3: BRANDING */}
              {activeTab === 'branding' && (
                <div className="flex flex-col gap-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-serif text-xl font-semibold text-[#1F2421]">
                        Identidade de Marca & Estilo de Navegação
                      </h3>
                      <p className="text-xs text-[#6E756F]">
                        Ajuste o nome do estabelecimento, contatos e variação do menu superior.
                      </p>
                    </div>
                    <button
                      onClick={handleSaveAll}
                      className="px-5 py-2 rounded-full bg-[#5D7052] text-white text-xs font-semibold flex items-center gap-2 hover:bg-[#4B5C42]"
                    >
                      <Save className="w-4 h-4" /> Salvar Tudo
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded-2xl border border-[#E6E2D8]">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-[#1F2421]">Nome da Clínica</label>
                      <input
                        type="text"
                        value={draftConfig.branding.clinicName}
                        onChange={(e) =>
                          setDraftConfig({
                            ...draftConfig,
                            branding: { ...draftConfig.branding, clinicName: e.target.value },
                          })
                        }
                        className="p-3 rounded-xl bg-[#F0F5F0] text-xs border border-[#E6E2D8]"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-[#1F2421]">Slogan / Subtítulo</label>
                      <input
                        type="text"
                        value={draftConfig.branding.subtitle}
                        onChange={(e) =>
                          setDraftConfig({
                            ...draftConfig,
                            branding: { ...draftConfig.branding, subtitle: e.target.value },
                          })
                        }
                        className="p-3 rounded-xl bg-[#F0F5F0] text-xs border border-[#E6E2D8]"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-[#1F2421]">
                        Estilo de Header (3 Arquiteturas do Brief)
                      </label>
                      <select
                        value={draftConfig.branding.headerStyle}
                        onChange={(e) =>
                          setDraftConfig({
                            ...draftConfig,
                            branding: {
                              ...draftConfig.branding,
                              headerStyle: e.target.value as HeaderStyle,
                            },
                          })
                        }
                        className="p-3 rounded-xl bg-[#F0F5F0] text-xs border border-[#E6E2D8]"
                      >
                        <option value="architectural">Variação 3: Fullscreen Minimalist Architectural</option>
                        <option value="floating">Variação 1: Floating Capsule (Pílula Centralizada)</option>
                        <option value="sidebar">Variação 2: Topbar com Relógio de Funcionamento</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-[#1F2421]">Telefone / WhatsApp Concierge</label>
                      <input
                        type="text"
                        value={draftConfig.branding.phone}
                        onChange={(e) =>
                          setDraftConfig({
                            ...draftConfig,
                            branding: { ...draftConfig.branding, phone: e.target.value },
                          })
                        }
                        className="p-3 rounded-xl bg-[#F0F5F0] text-xs border border-[#E6E2D8]"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-[#1F2421]">E-mail de Contato</label>
                      <input
                        type="email"
                        value={draftConfig.branding.email}
                        onChange={(e) =>
                          setDraftConfig({
                            ...draftConfig,
                            branding: { ...draftConfig.branding, email: e.target.value },
                          })
                        }
                        className="p-3 rounded-xl bg-[#F0F5F0] text-xs border border-[#E6E2D8]"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-[#1F2421]">Endereço</label>
                      <input
                        type="text"
                        value={draftConfig.branding.address}
                        onChange={(e) =>
                          setDraftConfig({
                            ...draftConfig,
                            branding: { ...draftConfig.branding, address: e.target.value },
                          })
                        }
                        className="p-3 rounded-xl bg-[#F0F5F0] text-xs border border-[#E6E2D8]"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5 sm:col-span-2">
                      <label className="text-xs font-semibold text-[#1F2421]">Horários de Atendimento</label>
                      <input
                        type="text"
                        value={draftConfig.branding.operatingHoursWeekdays}
                        onChange={(e) =>
                          setDraftConfig({
                            ...draftConfig,
                            branding: { ...draftConfig.branding, operatingHoursWeekdays: e.target.value },
                          })
                        }
                        className="p-3 rounded-xl bg-[#F0F5F0] text-xs border border-[#E6E2D8]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: CONTENT */}
              {activeTab === 'content' && (
                <div className="flex flex-col gap-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-serif text-xl font-semibold text-[#1F2421]">
                        Conteúdo Editorial & Métricas
                      </h3>
                      <p className="text-xs text-[#6E756F]">
                        Atualize headlines e texto de manifesto do Hero e Sobre Nós.
                      </p>
                    </div>
                    <button
                      onClick={handleSaveAll}
                      className="px-5 py-2 rounded-full bg-[#5D7052] text-white text-xs font-semibold flex items-center gap-2 hover:bg-[#4B5C42]"
                    >
                      <Save className="w-4 h-4" /> Salvar Tudo
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded-2xl border border-[#E6E2D8]">
                    <div className="flex flex-col gap-1.5 sm:col-span-2">
                      <label className="text-xs font-semibold text-[#1F2421]">Badge do Hero</label>
                      <input
                        type="text"
                        value={draftConfig.content.heroBadge}
                        onChange={(e) =>
                          setDraftConfig({
                            ...draftConfig,
                            content: { ...draftConfig.content, heroBadge: e.target.value },
                          })
                        }
                        className="p-3 rounded-xl bg-[#F0F5F0] text-xs border border-[#E6E2D8]"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-[#1F2421]">Headline Principal</label>
                      <input
                        type="text"
                        value={draftConfig.content.heroHeadline}
                        onChange={(e) =>
                          setDraftConfig({
                            ...draftConfig,
                            content: { ...draftConfig.content, heroHeadline: e.target.value },
                          })
                        }
                        className="p-3 rounded-xl bg-[#F0F5F0] text-xs border border-[#E6E2D8]"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-[#1F2421]">Palavra de Destaque Itálica 1</label>
                      <input
                        type="text"
                        value={draftConfig.content.heroHeadlineItalic1}
                        onChange={(e) =>
                          setDraftConfig({
                            ...draftConfig,
                            content: { ...draftConfig.content, heroHeadlineItalic1: e.target.value },
                          })
                        }
                        className="p-3 rounded-xl bg-[#F0F5F0] text-xs border border-[#E6E2D8]"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5 sm:col-span-2">
                      <label className="text-xs font-semibold text-[#1F2421]">Texto Manifesto Subtítulo</label>
                      <textarea
                        rows={3}
                        value={draftConfig.content.heroSubtext}
                        onChange={(e) =>
                          setDraftConfig({
                            ...draftConfig,
                            content: { ...draftConfig.content, heroSubtext: e.target.value },
                          })
                        }
                        className="p-3 rounded-xl bg-[#F0F5F0] text-xs border border-[#E6E2D8]"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-[#1F2421]">Métrica 1 (Anos)</label>
                      <input
                        type="text"
                        value={draftConfig.content.metricYears}
                        onChange={(e) =>
                          setDraftConfig({
                            ...draftConfig,
                            content: { ...draftConfig.content, metricYears: e.target.value },
                          })
                        }
                        className="p-3 rounded-xl bg-[#F0F5F0] text-xs border border-[#E6E2D8]"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-[#1F2421]">Métrica 2 (Clientes)</label>
                      <input
                        type="text"
                        value={draftConfig.content.metricClients}
                        onChange={(e) =>
                          setDraftConfig({
                            ...draftConfig,
                            content: { ...draftConfig.content, metricClients: e.target.value },
                          })
                        }
                        className="p-3 rounded-xl bg-[#F0F5F0] text-xs border border-[#E6E2D8]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: RITUALS CRUD */}
              {activeTab === 'rituals' && (
                <div className="flex flex-col gap-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-serif text-xl font-semibold text-[#1F2421]">
                        Catálogo de Rituais & Terapias (CRUD Completo)
                      </h3>
                      <p className="text-xs text-[#6E756F]">
                        Adicione, edite valores ou remova protocolos oferecidos na clínica.
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setIsNewRitual(true);
                        setEditingRitual({
                          id: `rit-${Date.now()}`,
                          title: '',
                          category: 'renovacao',
                          durationMinutes: 60,
                          priceBrl: 350,
                          imageUrl: draftConfig.media.heroImage,
                          shortDescription: '',
                        });
                      }}
                      className="px-4 py-2 rounded-full bg-[#5D7052] text-white text-xs font-semibold flex items-center gap-2 hover:bg-[#4B5C42]"
                    >
                      <Plus className="w-4 h-4" /> Novo Ritual
                    </button>
                  </div>

                  {/* List of Rituals */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {draftConfig.rituals.map((r) => (
                      <div
                        key={r.id}
                        className="p-4 bg-white rounded-2xl border border-[#E6E2D8] flex items-center justify-between gap-4 shadow-sm"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={r.imageUrl}
                            alt={r.title}
                            className="w-12 h-12 rounded-xl object-cover shrink-0"
                          />
                          <div>
                            <h4 className="text-xs font-semibold text-[#1F2421]">{r.title}</h4>
                            <span className="text-[10px] text-[#6E756F]">
                              {r.durationMinutes} min • R$ {r.priceBrl} • {r.category}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setIsNewRitual(false);
                              setEditingRitual(r);
                            }}
                            className="p-2 rounded-lg bg-[#F0F5F0] text-[#1F2421] hover:bg-[#D4E9C5]"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteRitual(r.id)}
                            className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Edit/Create Ritual Form Modal */}
                  {editingRitual && (
                    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
                      <form
                        onSubmit={handleSaveRitual}
                        className="bg-white rounded-3xl p-6 max-w-lg w-full flex flex-col gap-4 shadow-2xl overflow-y-auto max-h-[85vh]"
                      >
                        <h4 className="font-serif text-lg font-semibold text-[#1F2421]">
                          {isNewRitual ? 'Criar Novo Ritual' : 'Editar Ritual'}
                        </h4>

                        <div className="flex flex-col gap-1">
                          <label className="text-xs font-semibold">Título do Ritual</label>
                          <input
                            type="text"
                            required
                            value={editingRitual.title}
                            onChange={(e) =>
                              setEditingRitual({ ...editingRitual, title: e.target.value })
                            }
                            className="p-2.5 rounded-xl bg-[#F0F5F0] text-xs border border-[#E6E2D8]"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="flex flex-col gap-1">
                            <label className="text-xs font-semibold">Duração (min)</label>
                            <input
                              type="number"
                              required
                              value={editingRitual.durationMinutes}
                              onChange={(e) =>
                                setEditingRitual({
                                  ...editingRitual,
                                  durationMinutes: Number(e.target.value),
                                })
                              }
                              className="p-2.5 rounded-xl bg-[#F0F5F0] text-xs border border-[#E6E2D8]"
                            />
                          </div>

                          <div className="flex flex-col gap-1">
                            <label className="text-xs font-semibold">Preço (R$)</label>
                            <input
                              type="number"
                              required
                              value={editingRitual.priceBrl}
                              onChange={(e) =>
                                setEditingRitual({
                                  ...editingRitual,
                                  priceBrl: Number(e.target.value),
                                })
                              }
                              className="p-2.5 rounded-xl bg-[#F0F5F0] text-xs border border-[#E6E2D8]"
                            />
                          </div>
                        </div>

                        <div className="flex flex-col gap-1">
                          <label className="text-xs font-semibold">URL da Imagem</label>
                          <input
                            type="text"
                            required
                            value={editingRitual.imageUrl}
                            onChange={(e) =>
                              setEditingRitual({ ...editingRitual, imageUrl: e.target.value })
                            }
                            className="p-2.5 rounded-xl bg-[#F0F5F0] text-xs border border-[#E6E2D8]"
                          />
                        </div>

                        <div className="flex flex-col gap-1">
                          <label className="text-xs font-semibold">Descrição Terapêutica</label>
                          <textarea
                            rows={3}
                            required
                            value={editingRitual.shortDescription}
                            onChange={(e) =>
                              setEditingRitual({ ...editingRitual, shortDescription: e.target.value })
                            }
                            className="p-2.5 rounded-xl bg-[#F0F5F0] text-xs border border-[#E6E2D8]"
                          />
                        </div>

                        <div className="flex justify-end gap-2 pt-2">
                          <button
                            type="button"
                            onClick={() => setEditingRitual(null)}
                            className="px-4 py-2 rounded-full text-xs text-[#6E756F]"
                          >
                            Cancelar
                          </button>
                          <button
                            type="submit"
                            className="px-5 py-2 rounded-full bg-[#5D7052] text-white text-xs font-semibold"
                          >
                            Salvar Ritual
                          </button>
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 5: TESTIMONIALS */}
              {activeTab === 'testimonials' && (
                <div className="flex flex-col gap-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-serif text-xl font-semibold text-[#1F2421]">
                        Gestão de Depoimentos & Prova Social
                      </h3>
                      <p className="text-xs text-[#6E756F]">
                        Adicione avaliações de autoridades ou clientes para o carrossel.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setIsNewTestimonial(true);
                        setEditingTestimonial({
                          id: `test-${Date.now()}`,
                          authorName: '',
                          authorRole: '',
                          rating: 5,
                          quote: '',
                          ritualName: draftConfig.rituals[0]?.title || '',
                        });
                      }}
                      className="px-4 py-2 rounded-full bg-[#5D7052] text-white text-xs font-semibold flex items-center gap-2 hover:bg-[#4B5C42]"
                    >
                      <Plus className="w-4 h-4" /> Novo Depoimento
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {draftConfig.testimonials.map((t) => (
                      <div
                        key={t.id}
                        className="p-4 bg-white rounded-2xl border border-[#E6E2D8] flex items-center justify-between gap-4"
                      >
                        <div>
                          <h4 className="text-xs font-semibold text-[#1F2421]">
                            {t.authorName} ({t.authorRole})
                          </h4>
                          <p className="text-xs text-[#6E756F] italic mt-1 font-serif">
                            “{t.quote}”
                          </p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => {
                              setIsNewTestimonial(false);
                              setEditingTestimonial(t);
                            }}
                            className="p-2 rounded-lg bg-[#F0F5F0] text-[#1F2421]"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteTestimonial(t.id)}
                            className="p-2 rounded-lg bg-red-50 text-red-600"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {editingTestimonial && (
                    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
                      <form
                        onSubmit={handleSaveTestimonial}
                        className="bg-white rounded-3xl p-6 max-w-lg w-full flex flex-col gap-4 shadow-2xl"
                      >
                        <h4 className="font-serif text-lg font-semibold text-[#1F2421]">
                          {isNewTestimonial ? 'Criar Depoimento' : 'Editar Depoimento'}
                        </h4>

                        <div className="flex flex-col gap-1">
                          <label className="text-xs font-semibold">Nome da Autoridade / Cliente</label>
                          <input
                            type="text"
                            required
                            value={editingTestimonial.authorName}
                            onChange={(e) =>
                              setEditingTestimonial({ ...editingTestimonial, authorName: e.target.value })
                            }
                            className="p-2.5 rounded-xl bg-[#F0F5F0] text-xs border border-[#E6E2D8]"
                          />
                        </div>

                        <div className="flex flex-col gap-1">
                          <label className="text-xs font-semibold">Profissão / Título</label>
                          <input
                            type="text"
                            required
                            value={editingTestimonial.authorRole}
                            onChange={(e) =>
                              setEditingTestimonial({ ...editingTestimonial, authorRole: e.target.value })
                            }
                            className="p-2.5 rounded-xl bg-[#F0F5F0] text-xs border border-[#E6E2D8]"
                          />
                        </div>

                        <div className="flex flex-col gap-1">
                          <label className="text-xs font-semibold">Relato do Depoimento</label>
                          <textarea
                            rows={3}
                            required
                            value={editingTestimonial.quote}
                            onChange={(e) =>
                              setEditingTestimonial({ ...editingTestimonial, quote: e.target.value })
                            }
                            className="p-2.5 rounded-xl bg-[#F0F5F0] text-xs border border-[#E6E2D8]"
                          />
                        </div>

                        <div className="flex justify-end gap-2 pt-2">
                          <button
                            type="button"
                            onClick={() => setEditingTestimonial(null)}
                            className="px-4 py-2 rounded-full text-xs text-[#6E756F]"
                          >
                            Cancelar
                          </button>
                          <button
                            type="submit"
                            className="px-5 py-2 rounded-full bg-[#5D7052] text-white text-xs font-semibold"
                          >
                            Salvar
                          </button>
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 6: MEDIA */}
              {activeTab === 'media' && (
                <div className="flex flex-col gap-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-serif text-xl font-semibold text-[#1F2421]">
                        Gerenciador de Mídia & URLs
                      </h3>
                      <p className="text-xs text-[#6E756F]">
                        Substitua as imagens das seções principais por novas fotos da sua marca.
                      </p>
                    </div>
                    <button
                      onClick={handleSaveAll}
                      className="px-5 py-2 rounded-full bg-[#5D7052] text-white text-xs font-semibold flex items-center gap-2 hover:bg-[#4B5C42]"
                    >
                      <Save className="w-4 h-4" /> Salvar Mídia
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded-2xl border border-[#E6E2D8]">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-semibold text-[#1F2421]">Imagem do Hero</label>
                      <input
                        type="text"
                        value={draftConfig.media.heroImage}
                        onChange={(e) =>
                          setDraftConfig({
                            ...draftConfig,
                            media: { ...draftConfig.media, heroImage: e.target.value },
                          })
                        }
                        className="p-2.5 rounded-xl bg-[#F0F5F0] text-xs border border-[#E6E2D8]"
                      />
                      <img
                        src={draftConfig.media.heroImage}
                        alt="Hero preview"
                        className="h-32 rounded-xl object-cover"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-semibold text-[#1F2421]">Imagem da Seção Sobre Nós</label>
                      <input
                        type="text"
                        value={draftConfig.media.aboutImage}
                        onChange={(e) =>
                          setDraftConfig({
                            ...draftConfig,
                            media: { ...draftConfig.media, aboutImage: e.target.value },
                          })
                        }
                        className="p-2.5 rounded-xl bg-[#F0F5F0] text-xs border border-[#E6E2D8]"
                      />
                      <img
                        src={draftConfig.media.aboutImage}
                        alt="About preview"
                        className="h-32 rounded-xl object-cover"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 7: IMPORT / EXPORT & RESET */}
              {activeTab === 'import_export' && (
                <div className="flex flex-col gap-6">
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-[#1F2421]">
                      Exportação White-Label & Restauração
                    </h3>
                    <p className="text-xs text-[#6E756F]">
                      Exporte o arquivo de configuração para backup ou importe uma nova skin personalizada.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button
                      onClick={handleExportJSON}
                      className="p-6 bg-white rounded-2xl border border-[#E6E2D8] flex flex-col items-center text-center gap-3 hover:bg-[#F0F5F0] transition-colors"
                    >
                      <Download className="w-8 h-8 text-[#5D7052]" />
                      <span className="text-xs font-semibold text-[#1F2421]">
                        Exportar Configuração (JSON)
                      </span>
                      <span className="text-[10px] text-[#6E756F]">
                        Baixa um arquivo completo para migração
                      </span>
                    </button>

                    <label className="p-6 bg-white rounded-2xl border border-[#E6E2D8] flex flex-col items-center text-center gap-3 hover:bg-[#F0F5F0] transition-colors cursor-pointer">
                      <Upload className="w-8 h-8 text-[#5D7052]" />
                      <span className="text-xs font-semibold text-[#1F2421]">
                        Importar Configuração (JSON)
                      </span>
                      <span className="text-[10px] text-[#6E756F]">
                        Carrega um arquivo JSON salvo
                      </span>
                      <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
                    </label>

                    <button
                      onClick={handleReset}
                      className="p-6 bg-red-50 rounded-2xl border border-red-100 flex flex-col items-center text-center gap-3 hover:bg-red-100 transition-colors"
                    >
                      <RotateCcw className="w-8 h-8 text-red-600" />
                      <span className="text-xs font-semibold text-red-700">
                        Restaurar Padrões da Clínica Eterna
                      </span>
                      <span className="text-[10px] text-red-600">
                        Volta os dados originais do PRD
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
