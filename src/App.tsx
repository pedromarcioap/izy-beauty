import React, { useState, useEffect } from 'react';
import { AppConfig, BookingRequest } from './types';
import { loadAppConfig, saveAppConfig, resetAppConfig, loadBookings, addBookingRequest, updateBookingStatus } from './data/storage';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { NossaEssencia } from './components/NossaEssencia';
import { RituaisCatalog } from './components/RituaisCatalog';
import { QuizInterativo } from './components/QuizInterativo';
import { Depoimentos } from './components/Depoimentos';
import { ReservaConcierge } from './components/ReservaConcierge';
import { Footer } from './components/Footer';
import { AdminModal } from './components/AdminModal';

export default function App() {
  const [config, setConfig] = useState<AppConfig>(loadAppConfig);
  const [bookings, setBookings] = useState<BookingRequest[]>(loadBookings);

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [selectedRitualForBooking, setSelectedRitualForBooking] = useState<string | undefined>(undefined);

  const handleSaveConfig = (newConfig: AppConfig) => {
    setConfig(newConfig);
    saveAppConfig(newConfig);
  };

  const handleResetConfig = () => {
    const fresh = resetAppConfig();
    setConfig(fresh);
  };

  const handleSelectRitualForBooking = (title?: string) => {
    if (title) {
      setSelectedRitualForBooking(title);
    }
    const elem = document.getElementById('agendamento');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleGoToQuiz = () => {
    const elem = document.getElementById('quiz-interativo');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCreateBooking = (newBooking: Omit<BookingRequest, 'id' | 'createdAt' | 'status'>) => {
    const created = addBookingRequest(newBooking);
    setBookings(loadBookings());
    return created;
  };

  const handleUpdateBookingStatus = (id: string, status: BookingRequest['status'], notes?: string) => {
    const updated = updateBookingStatus(id, status, notes);
    setBookings(updated);
  };

  return (
    <div className="min-h-screen bg-[#F8F6F2] text-[#1F2421] font-sans antialiased selection:bg-[#D4E9C5] selection:text-[#3A4C31]">
      {/* Global Header */}
      <Header
        branding={config.branding}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onSelectBookingRitual={handleSelectRitualForBooking}
      />

      {/* Main Content Sections */}
      <main className="w-full">
        {/* 1. Hero Section */}
        <Hero
          content={config.content}
          media={config.media}
          onExploreRituais={() => {
            const elem = document.getElementById('nossa-essencia');
            if (elem) elem.scrollIntoView({ behavior: 'smooth' });
          }}
          onBookClick={() => handleSelectRitualForBooking()}
        />

        {/* 2. Nossa Essência Section */}
        <NossaEssencia
          content={config.content}
          media={config.media}
          onExploreRituais={() => {
            const elem = document.getElementById('rituais');
            if (elem) elem.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 3. Catalog of Rituals */}
        <RituaisCatalog
          rituals={config.rituals}
          onSelectRitualForBooking={handleSelectRitualForBooking}
          onGoToQuiz={handleGoToQuiz}
        />

        {/* 4. Interactive Quiz Guide */}
        <QuizInterativo
          rituals={config.rituals}
          onSelectRitualForBooking={handleSelectRitualForBooking}
        />

        {/* 5. Testimonials */}
        <Depoimentos testimonials={config.testimonials} />

        {/* 6. Concierge Booking Form */}
        <ReservaConcierge
          branding={config.branding}
          rituals={config.rituals}
          selectedRitualTitle={selectedRitualForBooking}
          contactImage={config.media.contactImage}
          onSubmitBooking={handleCreateBooking}
        />
      </main>

      {/* Footer */}
      <Footer
        branding={config.branding}
        rituals={config.rituals}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Admin CMS Modal */}
      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        config={config}
        bookings={bookings}
        onSaveConfig={handleSaveConfig}
        onResetConfig={handleResetConfig}
        onUpdateBookingStatus={handleUpdateBookingStatus}
      />
    </div>
  );
}
