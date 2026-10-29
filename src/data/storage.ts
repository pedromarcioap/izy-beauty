import { AppConfig, BookingRequest } from '../types';
import { DEFAULT_APP_CONFIG, INITIAL_BOOKINGS } from './defaultData';

const CONFIG_KEY = 'clinica_eterna_config_v1';
const BOOKINGS_KEY = 'clinica_eterna_bookings_v1';

export function loadAppConfig(): AppConfig {
  try {
    const saved = localStorage.getItem(CONFIG_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return { ...DEFAULT_APP_CONFIG, ...parsed };
    }
  } catch (e) {
    console.error('Failed to load config from localStorage:', e);
  }
  return DEFAULT_APP_CONFIG;
}

export function saveAppConfig(config: AppConfig): void {
  try {
    localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
  } catch (e) {
    console.error('Failed to save config to localStorage:', e);
  }
}

export function resetAppConfig(): AppConfig {
  try {
    localStorage.removeItem(CONFIG_KEY);
  } catch (e) {
    console.error('Failed to reset config:', e);
  }
  return DEFAULT_APP_CONFIG;
}

export function loadBookings(): BookingRequest[] {
  try {
    const saved = localStorage.getItem(BOOKINGS_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Failed to load bookings:', e);
  }
  return INITIAL_BOOKINGS;
}

export function saveBookings(bookings: BookingRequest[]): void {
  try {
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
  } catch (e) {
    console.error('Failed to save bookings:', e);
  }
}

export function addBookingRequest(newBooking: Omit<BookingRequest, 'id' | 'createdAt' | 'status'>): BookingRequest {
  const current = loadBookings();
  const created: BookingRequest = {
    ...newBooking,
    id: `bk-${Date.now().toString().slice(-4)}`,
    createdAt: new Date().toISOString(),
    status: 'Pendente'
  };
  const updated = [created, ...current];
  saveBookings(updated);
  return created;
}

export function updateBookingStatus(id: string, status: BookingRequest['status'], notes?: string): BookingRequest[] {
  const current = loadBookings();
  const updated = current.map(b => {
    if (b.id === id) {
      return { ...b, status, notes: notes !== undefined ? notes : b.notes };
    }
    return b;
  });
  saveBookings(updated);
  return updated;
}
