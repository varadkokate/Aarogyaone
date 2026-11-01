'use client'
import { Phone, Calendar, Search } from 'lucide-react'
import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'
import { useAppointment } from '@/context/AppointmentContext'

interface MobileBottomBarProps {
  onEmergencyOpen: () => void
}

export function MobileBottomBar({ onEmergencyOpen }: MobileBottomBarProps) {
  const { t } = useLanguage()
  const { openAppointment } = useAppointment()

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white border-t border-slate-200 safe-area-pb" role="navigation" aria-label="Mobile quick actions">
      <div className="grid grid-cols-3 divide-x divide-slate-200">
        <button
          onClick={onEmergencyOpen}
          className="flex flex-col items-center gap-1 py-3 px-2 text-medical-red hover:bg-red-50 transition-colors"
          aria-label="Emergency assistance"
        >
          <div className="relative">
            <Phone className="w-5 h-5" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-medical-red rounded-full animate-pulse" />
          </div>
          <span className="text-[10px] font-semibold">{t.nav.emergency}</span>
        </button>

        <button
          onClick={() => openAppointment()}
          className="flex flex-col items-center gap-1 py-3 px-2 text-navy-800 hover:bg-navy-50 transition-colors"
          aria-label="Book appointment"
        >
          <Calendar className="w-5 h-5" />
          <span className="text-[10px] font-semibold">{t.nav.bookAppointment}</span>
        </button>

        <Link
          href="/doctors"
          className="flex flex-col items-center gap-1 py-3 px-2 text-teal-600 hover:bg-teal-50 transition-colors"
          aria-label="Find a doctor"
        >
          <Search className="w-5 h-5" />
          <span className="text-[10px] font-semibold">{t.hero.cta2}</span>
        </Link>
      </div>
    </div>
  )
}
