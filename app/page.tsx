'use client'
import { useState } from 'react'
import type { Metadata } from 'next'
import { HeroSection } from '@/components/home/HeroSection'
import { IntentSelector } from '@/components/home/IntentSelector'
import { HospitalStatus } from '@/components/home/HospitalStatus'
import { FeaturedDoctors } from '@/components/home/FeaturedDoctors'
import { SpecialitiesGrid } from '@/components/home/SpecialitiesGrid'
import { VisitTimeline } from '@/components/home/VisitTimeline'
import { AskBeforeVisit } from '@/components/home/AskBeforeVisit'
import { TreatmentsSection } from '@/components/home/TreatmentsSection'
import { EmergencyPanel } from '@/components/home/EmergencyPanel'

export default function HomePage() {
  const [emergencyOpen, setEmergencyOpen] = useState(false)

  return (
    <>
      <HeroSection onEmergencyOpen={() => setEmergencyOpen(true)} />
      <IntentSelector onEmergencyOpen={() => setEmergencyOpen(true)} />
      <HospitalStatus />
      <FeaturedDoctors />
      <SpecialitiesGrid />
      <TreatmentsSection />
      <VisitTimeline />
      <AskBeforeVisit />
      <EmergencyPanel isOpen={emergencyOpen} onClose={() => setEmergencyOpen(false)} />
    </>
  )
}
