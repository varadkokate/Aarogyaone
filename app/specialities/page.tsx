'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { specialities } from '@/data/specialities'
import { treatments } from '@/data/treatments'
import { doctors } from '@/data/doctors'
import { MedicalTermBadge } from '@/components/shared/MedicalTermModal'
import { useAppointment } from '@/context/AppointmentContext'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { ChevronDown, ArrowRight, Clock } from 'lucide-react'

const specialityIcons: Record<string, string> = {
  cardiology: '❤️',
  neurology: '🧠',
  orthopaedics: '🦴',
  oncology: '🎗️',
  gastroenterology: '🫀',
  paediatrics: '👶',
  gynaecology: '🌸',
  nephrology: '💧',
}

function TreatmentJourneySection({ treatmentId }: { treatmentId: string }) {
  const treatment = treatments.find(t => t.id === treatmentId)
  const [activeStep, setActiveStep] = useState<string | null>(null)

  if (!treatment) return null

  return (
    <div className="bg-navy-50 rounded-2xl p-5 border border-navy-100">
      <h4 className="font-serif text-navy-800 text-lg mb-4">Your Treatment Journey</h4>
      <div className="space-y-2">
        {treatment.journey.map((step, i) => (
          <div key={step.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <button
              onClick={() => setActiveStep(activeStep === step.id ? null : step.id)}
              className="w-full flex items-center gap-3 p-4 text-left hover:bg-navy-50 transition-colors"
              aria-expanded={activeStep === step.id}
            >
              <div className="w-7 h-7 rounded-full bg-navy-800 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">{i + 1}</div>
              <span className="flex-1 text-slate-800 text-sm font-semibold">{step.title}</span>
              <span className="text-slate-400 text-xs">{step.duration}</span>
              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${activeStep === step.id ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {activeStep === step.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 border-t border-slate-100 space-y-3">
                    <p className="text-slate-600 text-sm">{step.whatHappens}</p>
                    <p className="text-slate-500 text-xs bg-slate-50 rounded-lg p-3">{step.whatToExpect}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
      <p className="text-slate-400 text-xs mt-4 italic">Your actual treatment plan may vary based on your clinical condition.</p>
    </div>
  )
}

export default function SpecialitiesPage() {
  const [activeTab, setActiveTab] = useState<'specialities' | 'treatments'>('specialities')
  const [expandedSpec, setExpandedSpec] = useState<string | null>(null)
  const { openAppointment } = useAppointment()

  return (
    <div className="min-h-screen bg-cream-100">
      <div className="bg-navy-800 pt-28 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-display-sm text-white mb-2">Specialities & Treatments</h1>
          <p className="text-slate-300">Expert care across all major medical specialities.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab switcher */}
        <div className="flex gap-1 bg-white border border-slate-200 rounded-2xl p-1 max-w-xs mb-8">
          <button
            onClick={() => setActiveTab('specialities')}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'specialities' ? 'bg-navy-800 text-white' : 'text-slate-600 hover:text-navy-800'
            }`}
          >
            Specialities
          </button>
          <button
            onClick={() => setActiveTab('treatments')}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'treatments' ? 'bg-navy-800 text-white' : 'text-slate-600 hover:text-navy-800'
            }`}
          >
            Treatments
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'specialities' && (
            <motion.div key="specs" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <div className="space-y-4">
                {specialities.map((spec, i) => {
                  const isExpanded = expandedSpec === spec.id
                  const specDoctors = doctors.filter(d => spec.doctorIds.includes(d.id))
                  return (
                    <motion.div
                      key={spec.id}
                      id={spec.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="bg-white rounded-3xl border border-slate-200 overflow-hidden"
                    >
                      <button
                        onClick={() => setExpandedSpec(isExpanded ? null : spec.id)}
                        className="w-full flex items-center gap-5 p-6 text-left hover:bg-slate-50 transition-colors"
                        aria-expanded={isExpanded}
                      >
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0" style={{ backgroundColor: spec.color + '15' }}>
                          {specialityIcons[spec.id]}
                        </div>
                        <div className="flex-1">
                          <h2 className="text-navy-800 font-semibold text-lg">{spec.name}</h2>
                          <p className="text-slate-500 text-sm mt-0.5">{spec.conditions.slice(0, 3).join(' · ')}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-slate-400 text-sm hidden sm:block">{specDoctors.length} specialists</span>
                          <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                        </div>
                      </button>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: 'auto' }}
                            exit={{ height: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-6 border-t border-slate-100 space-y-6">
                              <p className="text-slate-600 leading-relaxed pt-5">{spec.description}</p>

                              <div className="grid sm:grid-cols-2 gap-6">
                                <div>
                                  <h3 className="text-slate-700 text-xs font-semibold uppercase tracking-wide mb-3">Conditions Treated</h3>
                                  <ul className="space-y-1.5">
                                    {spec.conditions.map(c => (
                                      <li key={c} className="flex items-center gap-2 text-slate-600 text-sm">
                                        <span className="w-1.5 h-1.5 rounded-full bg-teal-500 flex-shrink-0" />{c}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                <div>
                                  <h3 className="text-slate-700 text-xs font-semibold uppercase tracking-wide mb-3">Treatments & Procedures</h3>
                                  <ul className="space-y-1.5">
                                    {spec.treatments.map(t => (
                                      <li key={t} className="flex items-center gap-2 text-slate-600 text-sm">
                                        <span className="w-1.5 h-1.5 rounded-full bg-navy-400 flex-shrink-0" />{t}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>

                              {specDoctors.length > 0 && (
                                <div>
                                  <h3 className="text-slate-700 text-xs font-semibold uppercase tracking-wide mb-3">Our Specialists</h3>
                                  <div className="flex gap-3 flex-wrap">
                                    {specDoctors.map(doc => (
                                      <div key={doc.id} className="flex items-center gap-3 bg-navy-50 rounded-xl px-4 py-3">
                                        <div className="w-9 h-9 rounded-xl bg-navy-200 flex items-center justify-center text-navy-700 font-semibold text-sm flex-shrink-0">
                                          {doc.name.split(' ')[1]?.[0]}{doc.name.split(' ')[2]?.[0]}
                                        </div>
                                        <div>
                                          <div className="text-slate-800 text-sm font-medium">{doc.name}</div>
                                          <div className="text-slate-500 text-xs">{doc.experience} yrs exp.</div>
                                        </div>
                                        <button
                                          onClick={() => openAppointment(spec.id, doc.id)}
                                          className="ml-2 px-3 py-1.5 bg-navy-800 text-white text-xs font-medium rounded-lg hover:bg-navy-700"
                                        >
                                          Book
                                        </button>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              <div className="flex gap-3">
                                <button
                                  onClick={() => openAppointment(spec.id)}
                                  className="px-5 py-2.5 bg-navy-800 text-white rounded-xl text-sm font-semibold hover:bg-navy-700 transition-colors"
                                >
                                  Find a {spec.name.split(' ')[0]} Specialist
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          )}

          {activeTab === 'treatments' && (
            <motion.div key="treats" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} id="treatments">
              <div className="space-y-6">
                {treatments.map((treatment, i) => (
                  <motion.div
                    key={treatment.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="bg-white rounded-3xl border border-slate-200 p-6"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-teal-600 text-xs font-medium uppercase tracking-wide">{treatment.specialityId}</span>
                        </div>
                        <h2 className="font-serif text-navy-800 text-xl">{treatment.name}</h2>
                      </div>
                      <div className="flex gap-3 ml-auto flex-shrink-0">
                        <div className="text-center">
                          <div className="text-slate-800 text-sm font-semibold">{treatment.duration}</div>
                          <div className="text-slate-400 text-xs">Duration</div>
                        </div>
                        <div className="text-center">
                          <div className="text-slate-800 text-sm font-semibold">{treatment.recovery}</div>
                          <div className="text-slate-400 text-xs">Recovery</div>
                        </div>
                      </div>
                    </div>

                    <p className="text-slate-600 leading-relaxed mb-5">{treatment.description}</p>

                    {/* Medical terms */}
                    {treatment.medicalTerms.length > 0 && (
                      <div className="mb-5">
                        <p className="text-slate-500 text-xs font-medium mb-2">Key terms in this treatment:</p>
                        <p className="text-slate-600 text-sm">
                          {treatment.medicalTerms.map((term, j) => (
                            <span key={j}>
                              {j > 0 && ' · '}
                              <MedicalTermBadge term={term} />
                            </span>
                          ))}
                        </p>
                      </div>
                    )}

                    {/* Treatment Journey */}
                    <TreatmentJourneySection treatmentId={treatment.id} />

                    <div className="mt-4 flex gap-3">
                      <button
                        onClick={() => openAppointment(treatment.specialityId)}
                        className="px-5 py-2.5 bg-navy-800 text-white rounded-xl text-sm font-semibold hover:bg-navy-700 transition-colors"
                      >
                        Book Consultation
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
