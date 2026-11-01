'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Building2, Layers, HeartPulse, FlaskConical, Scan, Pill, Receipt, Coffee, AlertCircle, Navigation, MapPin, ChevronRight } from 'lucide-react'
import { wayfinderLocations } from '@/data/findMyWay'
import { hospitalStatus } from '@/data/hospitalStatus'
import { useLanguage } from '@/context/LanguageContext'
import { ScrollReveal } from '@/components/shared/ScrollReveal'

const locationIcons: Record<string, React.ElementType> = {
  AlertCircle, Building2, Scan, FlaskConical, Pill, Receipt, HeartPulse, Coffee,
}

export default function HospitalPage() {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null)
  const { t, language } = useLanguage()

  const selectedLoc = wayfinderLocations.find(l => l.id === selectedLocation)

  const infrastructure = [
    { icon: '🏥', label: 'Operation Theatres', value: '8 modular OTs' },
    { icon: '🫀', label: 'Cardiac ICU (CICU)', value: '20 beds, biplane cath lab' },
    { icon: '🧠', label: 'Neurological ICU', value: '12 beds, EEG monitoring' },
    { icon: '👶', label: 'Neonatal ICU (NICU)', value: 'Level III, 24 incubators' },
    { icon: '🔬', label: 'Clinical Laboratory', value: '500+ tests, NABL accredited' },
    { icon: '📡', label: 'Radiology & Imaging', value: '3T MRI, 128-slice CT, PET-CT' },
    { icon: '🏨', label: 'Patient Rooms', value: '350+ beds, private & semi-private' },
    { icon: '🅿️', label: 'Parking', value: 'Multi-level, 250+ vehicle capacity' },
  ]

  const technology = [
    { name: 'Biplane Catheterisation Laboratory', desc: 'Advanced cardiac imaging for interventional procedures' },
    { name: '3 Tesla MRI', desc: 'High-resolution neurological and body imaging' },
    { name: '128-slice CT Scanner', desc: 'Rapid, detailed cross-sectional imaging' },
    { name: 'PET-CT', desc: 'Functional imaging for oncology and cardiology' },
    { name: 'High-definition Laparoscopy', desc: '4K surgical video for minimal-access surgery' },
    { name: 'Computer-assisted Joint Replacement', desc: 'Precision navigation for orthopaedic surgery' },
    { name: 'Digital Pathology', desc: 'AI-assisted pathology and molecular diagnostics' },
    { name: 'Real-time Patient Monitoring', desc: 'Integrated bedside and remote patient monitoring' },
  ]

  return (
    <div className="min-h-screen bg-cream-100">
      {/* Header */}
      <div className="bg-navy-800 pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-display-sm text-white mb-2">About AarogyaOne</h1>
          <p className="text-slate-300 max-w-lg">A comprehensive multispeciality hospital built on a foundation of trust, clinical excellence, and patient-centred care.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* About */}
        <ScrollReveal id="about">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="text-teal-600 text-sm font-medium uppercase tracking-wide">Our story</span>
              <h2 className="font-serif text-display-sm text-navy-800 mt-2 mb-5">Healthcare built on trust.</h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>AarogyaOne Hospitals was founded with a singular purpose: to make world-class healthcare accessible to every patient who walks through our doors, regardless of the complexity of their condition.</p>
                <p>Over 25 years, we have grown into one of Pune\'s most trusted multispeciality hospitals, with a team of over 50 specialist doctors, 350+ patient beds, and a comprehensive range of diagnostic and therapeutic services.</p>
                <p>Our commitment remains unchanged — to deliver clinical excellence with compassion, to communicate clearly, and to treat every patient as an individual.</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Founded', value: '2001', sub: '25 years of care' },
                { label: 'Specialist Doctors', value: '50+', sub: 'Across 15 specialities' },
                { label: 'Patient Beds', value: '350+', sub: 'Including ICU and HDU' },
                { label: 'Patients Served', value: '1.2L+', sub: 'Since inception' },
              ].map(stat => (
                <div key={stat.label} className="bg-white rounded-2xl p-5 border border-slate-200">
                  <div className="font-serif text-3xl text-navy-800 font-semibold">{stat.value}</div>
                  <div className="text-slate-800 text-sm font-medium mt-1">{stat.label}</div>
                  <div className="text-slate-400 text-xs mt-0.5">{stat.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Infrastructure */}
        <ScrollReveal id="infrastructure">
          <div>
            <span className="text-teal-600 text-sm font-medium uppercase tracking-wide">Facilities</span>
            <h2 className="font-serif text-display-sm text-navy-800 mt-2 mb-8">Infrastructure & facilities.</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {infrastructure.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="bg-white rounded-2xl p-5 border border-slate-200"
                >
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <div className="text-slate-800 font-semibold text-sm">{item.label}</div>
                  <div className="text-slate-500 text-xs mt-1">{item.value}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Technology */}
        <ScrollReveal id="technology">
          <div className="bg-navy-800 rounded-3xl p-8 lg:p-12">
            <span className="text-teal-400 text-sm font-medium uppercase tracking-wide">Medical technology</span>
            <h2 className="font-serif text-display-sm text-white mt-2 mb-8">Equipped for precision.</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {technology.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="flex items-start gap-3 p-4 bg-white/5 rounded-2xl border border-white/10"
                >
                  <ChevronRight className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-white font-medium text-sm">{item.name}</div>
                    <div className="text-slate-400 text-xs mt-0.5">{item.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Find My Way */}
        <div id="findmyway">
          <ScrollReveal className="mb-8">
            <span className="text-teal-600 text-sm font-medium uppercase tracking-wide">Indoor navigation</span>
            <h2 className="font-serif text-display-sm text-navy-800 mt-2">{t.findMyWay.heading}</h2>
            <p className="text-slate-500 mt-2">{t.findMyWay.question}</p>
          </ScrollReveal>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Location buttons */}
            <div className="grid grid-cols-2 gap-3">
              {wayfinderLocations.map((loc, i) => {
                const Icon = locationIcons[loc.icon] || Building2
                const isSelected = selectedLocation === loc.id
                return (
                  <motion.button
                    key={loc.id}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    onClick={() => setSelectedLocation(isSelected ? null : loc.id)}
                    className={`flex items-center gap-3 p-4 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? 'border-navy-800 bg-navy-800 text-white'
                        : 'border-slate-200 bg-white hover:border-navy-300 text-slate-700'
                    }`}
                    aria-pressed={isSelected}
                  >
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${isSelected ? 'bg-white/20' : 'bg-navy-100'}`}>
                      <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-navy-700'}`} />
                    </div>
                    <span className="text-sm font-medium leading-tight">
                      {language === 'hi' ? (loc.nameHi || loc.name) : language === 'mr' ? (loc.nameMr || loc.name) : loc.name}
                    </span>
                  </motion.button>
                )
              })}
            </div>

            {/* Directions panel */}
            <AnimatePresence mode="wait">
              {selectedLoc ? (
                <motion.div
                  key={selectedLoc.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white rounded-3xl border border-slate-200 p-6"
                >
                  <div className="flex items-start gap-3 mb-5">
                    <div className="w-10 h-10 rounded-2xl bg-teal-100 flex items-center justify-center flex-shrink-0">
                      <Navigation className="w-5 h-5 text-teal-600" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 uppercase tracking-wide mb-0.5">{t.findMyWay.yourRoute}</div>
                      <h3 className="text-navy-800 font-semibold text-lg">{selectedLoc.name}</h3>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-5">
                    <div className="bg-navy-50 rounded-xl p-3">
                      <div className="text-xs text-slate-500 mb-0.5">{t.findMyWay.building}</div>
                      <div className="text-slate-800 text-sm font-medium">{selectedLoc.building}</div>
                    </div>
                    <div className="bg-navy-50 rounded-xl p-3">
                      <div className="text-xs text-slate-500 mb-0.5">{t.findMyWay.floor}</div>
                      <div className="text-slate-800 text-sm font-medium">{selectedLoc.floor}</div>
                    </div>
                  </div>

                  <div className="mb-5">
                    <div className="text-slate-700 text-xs font-semibold uppercase tracking-wide mb-3">{t.findMyWay.directions}</div>
                    <div className="space-y-3">
                      {selectedLoc.directions.map((dir, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.08 }}
                          className="flex items-start gap-3"
                        >
                          <div className="w-6 h-6 rounded-full bg-teal-100 text-teal-700 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                            {i + 1}
                          </div>
                          <p className="text-slate-600 text-sm leading-relaxed">{dir}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-amber-50 rounded-xl p-3 border border-amber-100">
                    <div className="text-xs text-amber-700 font-medium mb-0.5">{t.findMyWay.landmark}</div>
                    <p className="text-amber-800 text-sm">{selectedLoc.landmark}</p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white rounded-3xl border border-dashed border-slate-300 p-8 flex flex-col items-center justify-center text-center"
                >
                  <div className="w-16 h-16 rounded-2xl bg-navy-50 flex items-center justify-center mb-4">
                    <MapPin className="w-8 h-8 text-navy-300" />
                  </div>
                  <h3 className="text-slate-600 font-medium mb-1">Select a destination</h3>
                  <p className="text-slate-400 text-sm">Choose a location from the left to get step-by-step directions within the hospital.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Live status compact */}
        <ScrollReveal id="status">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 lg:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-navy-800 text-xl">{t.status.heading}</h2>
              <div className="flex items-center gap-2">
                <motion.div className="w-2 h-2 rounded-full bg-teal-500" animate={{ opacity: [1, 0.4, 1] }} transition={{ repeat: Infinity, duration: 2.5 }} />
                <span className="text-teal-600 text-xs font-medium">Live</span>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {hospitalStatus.map((item) => (
                <div key={item.department} className={`p-3 rounded-xl ${
                  item.status === 'open' ? 'bg-teal-50 border border-teal-100' :
                  item.status === 'limited' ? 'bg-amber-50 border border-amber-100' :
                  'bg-slate-50 border border-slate-100'
                }`}>
                  <div className="flex items-center gap-1.5 mb-1">
                    <div className={`w-1.5 h-1.5 rounded-full ${
                      item.status === 'open' ? 'bg-teal-500' :
                      item.status === 'limited' ? 'bg-amber-500' : 'bg-slate-400'
                    }`} />
                    <span className="text-xs font-medium text-slate-600">{item.status === 'open' ? 'Open' : item.status === 'limited' ? 'Limited' : item.status}</span>
                  </div>
                  <div className="text-slate-800 text-xs font-semibold">{item.department}</div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  )
}
