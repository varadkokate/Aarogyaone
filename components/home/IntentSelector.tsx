'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Thermometer, UserSearch, AlertTriangle, HeartHandshake, MapPin, HelpCircle, X, ArrowRight } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { useAppointment } from '@/context/AppointmentContext'
import Link from 'next/link'

const symptomMap = [
  { symptom: 'Chest discomfort or pain', speciality: 'Cardiology', specialityId: 'cardiology', pathway: 'A cardiologist will assess your heart health', icon: '❤️' },
  { symptom: 'Fever or infection', speciality: 'General Medicine / Infectious Disease', specialityId: 'cardiology', pathway: 'A physician will evaluate and manage your condition', icon: '🌡️' },
  { symptom: 'Headache or dizziness', speciality: 'Neurology', specialityId: 'neurology', pathway: 'A neurologist can assess headache patterns and neurological causes', icon: '🧠' },
  { symptom: 'Joint pain or stiffness', speciality: 'Orthopaedics', specialityId: 'orthopaedics', pathway: 'An orthopaedic specialist will evaluate your joints', icon: '🦴' },
  { symptom: 'Breathing difficulty', speciality: 'Pulmonology / Emergency', specialityId: 'cardiology', pathway: 'Immediate evaluation by a physician or pulmonologist', icon: '💨' },
  { symptom: 'Stomach or digestive issues', speciality: 'Gastroenterology', specialityId: 'gastroenterology', pathway: 'A gastroenterologist will evaluate your digestive health', icon: '🫀' },
  { symptom: "Child's health concern", speciality: 'Paediatrics', specialityId: 'paediatrics', pathway: 'A paediatrician will assess and manage your child\'s health', icon: '👶' },
  { symptom: "Women's health concern", speciality: 'Gynaecology & Obstetrics', specialityId: 'gynaecology', pathway: 'A gynaecologist will provide the appropriate care', icon: '🌸' },
  { symptom: 'Skin concerns', speciality: 'Dermatology', specialityId: 'cardiology', pathway: 'A dermatologist will evaluate your skin condition', icon: '🦵' },
]

interface SymptomModalProps {
  onClose: () => void
}

function SymptomModal({ onClose }: SymptomModalProps) {
  const [selected, setSelected] = useState<typeof symptomMap[0] | null>(null)
  const { t, language } = useLanguage()
  const { openAppointment } = useAppointment()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="bg-white rounded-3xl border border-slate-200 shadow-panel p-6"
    >
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-navy-800 font-semibold text-lg">{t.intent.symptomModal.title}</h3>
          <p className="text-slate-500 text-xs mt-0.5">{t.intent.symptomModal.subtitle}</p>
        </div>
        <button onClick={onClose} className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mb-5">
        {symptomMap.map((item) => (
          <button
            key={item.symptom}
            onClick={() => setSelected(item)}
            className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
              selected?.symptom === item.symptom
                ? 'border-navy-800 bg-navy-50'
                : 'border-slate-200 hover:border-navy-200 hover:bg-slate-50'
            }`}
          >
            <span className="text-xl flex-shrink-0">{item.icon}</span>
            <span className="text-slate-700 text-sm font-medium">{item.symptom}</span>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-navy-50 rounded-2xl p-5 border border-navy-100"
          >
            <div className="text-xs text-slate-500 uppercase tracking-wide font-medium mb-2">{t.intent.symptomModal.pathway}</div>
            <div className="text-navy-800 font-semibold text-base mb-1">
              {language === 'mr' && selected.speciality === 'Cardiology' ? 'हृदयरोग' : 
               language === 'hi' && selected.speciality === 'Cardiology' ? 'हृदय रोग' : 
               selected.speciality}
            </div>
            <p className="text-slate-600 text-sm mb-4">{selected.pathway}</p>
            <p className="text-slate-400 text-xs mb-4 italic">
              {t.intent.symptomModal.disclaimer}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => { openAppointment(selected.specialityId); onClose() }}
                className="flex-1 py-2.5 bg-navy-800 text-white rounded-xl text-sm font-semibold hover:bg-navy-700 transition-colors"
              >
                {t.nav.bookAppointment}
              </button>
              <Link
                href={`/specialities#${selected.specialityId}`}
                onClick={onClose}
                className="flex-1 py-2.5 border border-navy-200 text-navy-800 rounded-xl text-sm font-semibold hover:bg-navy-50 transition-colors text-center"
              >
                {t.intent.symptomModal.learnMore}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function IntentSelector({ onEmergencyOpen }: { onEmergencyOpen: () => void }) {
  const [activeIntent, setActiveIntent] = useState<string | null>(null)
  const { t } = useLanguage()
  const { openAppointment } = useAppointment()
  const options = t.intent.options

  const intents = [
    { key: 'symptom', icon: Thermometer, color: 'bg-orange-50 text-orange-600 border-orange-100', hoverColor: 'hover:border-orange-300' },
    { key: 'doctor', icon: UserSearch, color: 'bg-navy-50 text-navy-700 border-navy-100', hoverColor: 'hover:border-navy-300' },
    { key: 'emergency', icon: AlertTriangle, color: 'bg-red-50 text-medical-red border-red-100', hoverColor: 'hover:border-red-300' },
    { key: 'checkup', icon: HeartHandshake, color: 'bg-teal-50 text-teal-700 border-teal-100', hoverColor: 'hover:border-teal-300' },
    { key: 'visiting', icon: MapPin, color: 'bg-purple-50 text-purple-700 border-purple-100', hoverColor: 'hover:border-purple-300' },
    { key: 'question', icon: HelpCircle, color: 'bg-amber-50 text-amber-700 border-amber-100', hoverColor: 'hover:border-amber-300' },
  ] as const

  const handleIntentClick = (key: string) => {
    if (key === 'emergency') { onEmergencyOpen(); return }
    if (key === 'doctor') { window.location.href = '/doctors'; return }
    if (key === 'checkup') { openAppointment(); return }
    if (key === 'visiting') { window.location.href = '/hospital#findmyway'; return }
    if (key === 'question') { window.location.href = '/patient-care#faq'; return }
    setActiveIntent(activeIntent === key ? null : key)
  }

  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="font-serif text-display-sm text-navy-800">{t.intent.heading}</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-3xl mx-auto mb-6">
          {intents.map(({ key, icon: Icon, color, hoverColor }) => (
            <button
              key={key}
              onClick={() => handleIntentClick(key)}
              className={`flex items-center gap-3 p-4 rounded-2xl border-2 text-left transition-all duration-200 bg-white border-slate-100 hover:border-slate-300 hover:bg-slate-50 ${
                activeIntent === key ? '!border-navy-800 shadow-card-hover scale-[1.02]' : ''
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-slate-800 text-sm font-semibold leading-tight">
                {options[key as keyof typeof options]}
              </span>
              <ArrowRight className="w-4 h-4 text-slate-400 ml-auto flex-shrink-0" />
            </button>
          ))}
        </div>

        <AnimatePresence>
          {activeIntent === 'symptom' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="max-w-3xl mx-auto overflow-hidden"
            >
              <SymptomModal onClose={() => setActiveIntent(null)} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
