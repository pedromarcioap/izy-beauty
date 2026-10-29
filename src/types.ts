export type HeaderStyle = 'architectural' | 'floating' | 'sidebar';

export type RitualCategory = 'renovacao' | 'descompressao' | 'imersao' | 'equilibrio';

export interface Ritual {
  id: string;
  title: string;
  category: RitualCategory;
  durationMinutes: number;
  priceBrl: number;
  imageUrl: string;
  shortDescription: string;
  protocolSteps?: string[];
  bioactiveIngredients?: string[];
  featured?: boolean;
}

export interface QuizOption {
  id: string;
  icon: string;
  title: string;
  description: string;
  recommendedRitualId: string;
}

export interface Testimonial {
  id: string;
  authorName: string;
  authorRole: string;
  rating: number;
  quote: string;
  ritualName: string;
  avatarUrl?: string;
}

export interface BookingRequest {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone: string;
  ritualTitle: string;
  date: string;
  time: string;
  notes?: string;
  sensoryPreference?: string;
  status: 'Pendente' | 'Confirmado' | 'Contatado' | 'Concluído' | 'Cancelado';
}

export interface BrandingConfig {
  clinicName: string;
  subtitle: string;
  logoText: string;
  primaryColor: string;
  headerStyle: HeaderStyle;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  cityState: string;
  operatingHoursWeekdays: string;
  operatingHoursSunday: string;
}

export interface ContentConfig {
  heroBadge: string;
  heroHeadline: string;
  heroHeadlineItalic1: string;
  heroHeadlineItalic2: string;
  heroSubtext: string;
  metricYears: string;
  metricYearsLabel: string;
  metricClients: string;
  metricClientsLabel: string;
  metricRituals: string;
  metricRitualsLabel: string;
  aboutTitle: string;
  aboutHeadline: string;
  aboutManifesto: string;
  aboutPillar1Title: string;
  aboutPillar1Desc: string;
  aboutPillar2Title: string;
  aboutPillar2Desc: string;
  aboutPillar3Title: string;
  aboutPillar3Desc: string;
}

export interface MediaAssets {
  heroImage: string;
  aboutImage: string;
  contactImage: string;
  overlayImage: string;
}

export interface CalendarSyncConfig {
  googleCalendarEnabled: boolean;
  googleCalendarId: string;
  googleApiKey?: string;
  googleOAuthToken?: string;
  googleAutoSyncConfirmedOnly?: boolean;
  appleIcalEnabled: boolean;
  icalFeedUrl: string;
  outlookEnabled: boolean;
  outlookCalendarEmail: string;
  outlookApiToken?: string;
  outlookClientId?: string;
  outlookAutoSyncConfirmedOnly?: boolean;
  autoSyncBookings: boolean;
  bufferMinutesBetweenRituals: number;
  whatsappRemindersEnabled: boolean;
  whatsappReminderHoursBefore: number;
  syncIntervalMinutes: number;
  lastSyncedAt?: string;
  lastAutoSyncCount?: number;
}

export interface AppConfig {
  branding: BrandingConfig;
  content: ContentConfig;
  media: MediaAssets;
  rituals: Ritual[];
  testimonials: Testimonial[];
  calendarSync?: CalendarSyncConfig;
}
