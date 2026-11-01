'use client'
import { motion } from 'framer-motion'
import { Clock, RefreshCw } from 'lucide-react'
import { hospitalStatus, lastUpdated } from '@/data/hospitalStatus'
import { useLanguage } from '@/context/LanguageContext'
import { ScrollReveal } from '@/components/shared/ScrollReveal'

const statusConfig = {
  open: { label: 'Open', color: 'text-teal-600', dot: 'bg-teal-500' },
  closed: { label: 'Closed', color: 'text-red-500', dot: 'bg-red-500' },
  limited: { label: 'Limited', color: 'text-amber-500', dot: 'bg-amber-500' },
  busy: { label: 'Busy', color: 'text-orange-500', dot: 'bg-orange-500' },
}

export function HospitalStatus() {
  const { t } = useLanguage()

  return (
    <section className="py-16 bg-cream-100" aria-label="Hospital Status">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-serif text-heading-xl text-navy-800">{t.status.heading}</h2>
            <div className="flex items-center gap-2 mt-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-500 text-sm">{t.status.lastUpdated}: {lastUpdated}</span>
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-teal-500 ml-1"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ repeat: Infinity, duration: 2.5 }}
              />
            </div>
          </div>
          <button className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-navy-800 transition-colors">
            <RefreshCw className="w-4 h-4" />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </ScrollReveal>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {hospitalStatus.map((item, i) => {
            const config = statusConfig[item.status]
            return (
              <ScrollReveal key={item.department} delay={i * 0.07}>
                <div className="bg-white border-slate-200 border rounded-2xl p-4 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <motion.div
                      className={`w-2 h-2 rounded-full ${config.dot} flex-shrink-0`}
                      animate={item.status === 'open' ? { opacity: [1, 0.5, 1] } : {}}
                      transition={{ repeat: Infinity, duration: 2.5 }}
                    />
                    <span className={`text-xs font-semibold ${config.color}`}>{config.label}</span>
                  </div>
                  <div className="text-slate-800 text-sm font-semibold leading-tight">{item.department}</div>
                  <div className="text-slate-500 text-xs mt-1 leading-snug">{item.details}</div>
                  {item.waitTime && (
                    <div className="mt-2 text-xs text-slate-400">Wait: {item.waitTime}</div>
                  )}
                </div>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
