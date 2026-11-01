'use client'
import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Calendar, MapPin, ClipboardList, Stethoscope, TestTube, Syringe, Pill, RefreshCcw, ChevronDown } from 'lucide-react'
import { visitTimeline } from '@/data/visitTimeline'
import { useLanguage } from '@/context/LanguageContext'
import { ScrollReveal } from '@/components/shared/ScrollReveal'

const iconMap: Record<string, React.ElementType> = {
  Calendar,
  MapPin,
  ClipboardList,
  Stethoscope,
  TestTube,
  Syringe,
  Pill,
  RefreshCcw,
}

export function VisitTimeline() {
  const [activeStep, setActiveStep] = useState<string | null>(null)
  const { t, language } = useLanguage()
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section ref={sectionRef} className="py-16 lg:py-20 bg-white" aria-labelledby="timeline-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-12">
          <span className="text-teal-600 text-sm font-medium uppercase tracking-wide">Your journey</span>
          <h2 id="timeline-heading" className="font-serif text-display-sm text-navy-800 mt-2">
            {t.timeline.heading}
          </h2>
          <p className="text-slate-500 mt-2">{t.timeline.subheading}</p>
        </ScrollReveal>

        {/* Desktop timeline */}
        <div className="hidden lg:block">
          {/* Step numbers row */}
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute top-6 left-0 right-0 h-0.5 bg-slate-200">
              <motion.div
                className="h-full bg-teal-500 origin-left"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 1.5, ease: 'easeInOut', delay: 0.3 }}
              />
            </div>

            <div className="grid grid-cols-8 gap-2 relative">
              {visitTimeline.map((step, i) => {
                const Icon = iconMap[step.icon]
                const isActive = activeStep === step.id
                return (
                  <div key={step.id} className="flex flex-col items-center">
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: i * 0.1 + 0.4 }}
                      onClick={() => setActiveStep(isActive ? null : step.id)}
                      className={`relative z-10 w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                        isActive
                          ? 'bg-navy-800 border-navy-800 text-white shadow-lg scale-110'
                          : 'bg-white border-teal-500 text-teal-600 hover:bg-teal-50'
                      }`}
                      aria-expanded={isActive}
                      aria-label={`Step ${step.number}: ${step.title}`}
                    >
                      <Icon className="w-5 h-5" />
                    </motion.button>
                    <div className="text-center mt-3">
                      <div className="text-slate-400 text-[10px] font-medium">{step.number}</div>
                      <div className="text-slate-700 text-xs font-semibold mt-0.5 leading-tight">
                        {language === 'hi' ? (step.titleHi || step.title) : language === 'mr' ? (step.titleMr || step.title) : step.title}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Detail panel */}
          <AnimatePresence>
            {activeStep && (() => {
              const step = visitTimeline.find((s) => s.id === activeStep)
              if (!step) return null
              return (
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="mt-8 bg-navy-50 rounded-3xl p-8 border border-navy-100"
                >
                  <div className="grid grid-cols-3 gap-8">
                    <div>
                      <h3 className="font-serif text-navy-800 text-xl mb-2">{step.title}</h3>
                      <p className="text-slate-600 text-sm">{step.description}</p>
                    </div>
                    <div>
                      <h4 className="text-slate-700 text-xs font-semibold uppercase tracking-wide mb-3">What happens</h4>
                      <p className="text-slate-600 text-sm leading-relaxed">{step.whatHappens}</p>
                      {step.whereTo && (
                        <div className="mt-3">
                          <span className="text-slate-500 text-xs font-medium">Where to go:</span>
                          <p className="text-navy-700 text-sm mt-0.5">{step.whereTo}</p>
                        </div>
                      )}
                    </div>
                    <div>
                      {step.whatToBring.length > 0 && (
                        <div className="mb-4">
                          <h4 className="text-slate-700 text-xs font-semibold uppercase tracking-wide mb-2">What to bring</h4>
                          <ul className="space-y-1.5">
                            {step.whatToBring.map((item, j) => (
                              <li key={j} className="flex items-start gap-2 text-slate-600 text-sm">
                                <span className="w-1.5 h-1.5 rounded-full bg-teal-500 flex-shrink-0 mt-2" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      <div className="bg-white rounded-2xl p-3 border border-navy-100">
                        <p className="text-slate-500 text-xs">💡 {step.helpfulInfo}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })()}
          </AnimatePresence>
        </div>

        {/* Mobile timeline */}
        <div className="lg:hidden space-y-3">
          {visitTimeline.map((step, i) => {
            const Icon = iconMap[step.icon]
            const isActive = activeStep === step.id
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="border border-slate-200 rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setActiveStep(isActive ? null : step.id)}
                  className={`w-full flex items-center gap-4 p-4 text-left transition-colors ${
                    isActive ? 'bg-navy-800' : 'bg-white hover:bg-slate-50'
                  }`}
                  aria-expanded={isActive}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    isActive ? 'bg-white/20' : 'bg-navy-100'
                  }`}>
                    <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-navy-700'}`} />
                  </div>
                  <div className="flex-1">
                    <div className={`text-[10px] font-medium ${isActive ? 'text-white/60' : 'text-slate-400'}`}>{step.number}</div>
                    <div className={`text-sm font-semibold ${isActive ? 'text-white' : 'text-slate-800'}`}>
                      {language === 'hi' ? (step.titleHi || step.title) : language === 'mr' ? (step.titleMr || step.title) : step.title}
                    </div>
                  </div>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isActive ? 'rotate-180 text-white' : 'text-slate-400'}`} />
                </button>
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 bg-navy-50 space-y-3">
                        <p className="text-slate-600 text-sm">{step.whatHappens}</p>
                        {step.whatToBring.length > 0 && (
                          <div>
                            <div className="text-slate-700 text-xs font-semibold mb-1.5">What to bring:</div>
                            {step.whatToBring.map((item, j) => (
                              <div key={j} className="flex items-start gap-2 text-slate-600 text-sm">
                                <span className="w-1.5 h-1.5 rounded-full bg-teal-500 flex-shrink-0 mt-2" />
                                {item}
                              </div>
                            ))}
                          </div>
                        )}
                        <div className="text-slate-500 text-xs bg-white rounded-xl p-3">💡 {step.helpfulInfo}</div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
