'use client'
import { useState } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { MobileBottomBar } from '@/components/layout/MobileBottomBar'
import { EmergencyPanel } from '@/components/home/EmergencyPanel'
import { AppointmentModal } from '@/components/appointment/AppointmentModal'

export function AppShell({ children }: { children: React.ReactNode }) {
  const [emergencyOpen, setEmergencyOpen] = useState(false)

  return (
    <>
      <Header onEmergencyOpen={() => setEmergencyOpen(true)} />
      <main className="pb-16 md:pb-0">
        {children}
      </main>
      <Footer onEmergencyOpen={() => setEmergencyOpen(true)} />
      <MobileBottomBar onEmergencyOpen={() => setEmergencyOpen(true)} />
      <EmergencyPanel isOpen={emergencyOpen} onClose={() => setEmergencyOpen(false)} />
      <AppointmentModal />
    </>
  )
}
