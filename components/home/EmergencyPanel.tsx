'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Phone, Truck, MapPin, Info, AlertTriangle, Navigation } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

interface EmergencyPanelProps {
  isOpen: boolean
  onClose: () => void
}

export function EmergencyPanel({ isOpen, onClose }: EmergencyPanelProps) {
  const { t } = useLanguage()
  const em = t.emergency

  const actions = [
    {
      icon: Phone,
      label: em.actions.callED,
      href: 'tel:+912068009999',
      color: 'bg-medical-red text-white hover:bg-red-700',
      description: '+91 20 6800 9999',
    },
    {
      icon: Truck,
      label: em.actions.callAmbulance,
      href: 'tel:108',
      color: 'bg-orange-600 text-white hover:bg-orange-700',
      description: '108 (National Ambulance)',
    },
    {
      icon: Navigation,
      label: em.actions.directions,
      href: 'https://maps.google.com/?q=Senapati+Bapat+Road+Pune',
      color: 'bg-teal-600 text-white hover:bg-teal-700',
      description: 'Open in Google Maps',
    },
    {
      icon: MapPin,
      label: em.actions.location,
      href: '#',
      color: 'bg-navy-700 text-white hover:bg-navy-800',
      description: '14, Senapati Bapat Road, Pune',
    },
    {
      icon: Info,
      label: em.actions.info,
      href: '/hospital#emergency',
      color: 'bg-slate-700 text-white hover:bg-slate-800',
      description: 'Emergency department details',
    },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="emergency-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-navy-950/70 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            key="emergency-panel"
            initial={{ opacity: 0, y: 60, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ type: 'spring', damping: 30, stiffness: 400 }}
            className="fixed inset-x-0 bottom-0 sm:inset-auto sm:left-1/2 sm:-translate-x-1/2 sm:bottom-6 sm:w-full sm:max-w-lg z-[70] bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Emergency assistance"
          >
            {/* Header */}
            <div className="bg-medical-red px-6 py-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-white font-semibold text-lg">{em.title}</h2>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <motion.div
                      className="w-2 h-2 rounded-full bg-white"
                      animate={{ opacity: [1, 0.4, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    />
                    <span className="text-white/90 text-sm">{em.open}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                aria-label={em.close}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Address */}
            <div className="px-6 py-4 bg-red-50 border-b border-red-100">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-medical-red mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-slate-700 text-sm font-medium">{em.address}</p>
                  <p className="text-medical-red text-sm font-bold mt-0.5">{em.phone}</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="p-5 space-y-2.5">
              {actions.map((action, i) => (
                <motion.a
                  key={action.label}
                  href={action.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 + 0.1 }}
                  className={`flex items-center gap-4 w-full p-4 rounded-2xl transition-colors ${action.color}`}
                  onClick={action.href === '#' ? (e) => e.preventDefault() : undefined}
                >
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                    <action.icon className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-sm">{action.label}</div>
                    <div className="text-white/75 text-xs mt-0.5">{action.description}</div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Disclaimer */}
            <div className="px-6 pb-5">
              <p className="text-slate-400 text-xs text-center">{em.note}</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
