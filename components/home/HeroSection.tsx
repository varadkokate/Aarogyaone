'use client'
import { motion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import { useAppointment } from '@/context/AppointmentContext'
import { ArrowRight, Search } from 'lucide-react'
import Link from 'next/link'

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

export function HeroSection({ onEmergencyOpen }: { onEmergencyOpen: () => void }) {
  const { t, language } = useLanguage()
  const { openAppointment } = useAppointment()

  return (
    <section className="relative pt-24 lg:pt-28 min-h-[85vh] flex items-center overflow-hidden bg-cream-100">
      {/* Background pattern */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-navy-800/[0.03] to-transparent" />
        <div className="absolute bottom-0 left-0 w-2/3 h-1/2 bg-gradient-to-t from-teal-50/40 to-transparent" />
        {/* Grid pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#0F2A4A" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        {/* Decorative circles */}
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-teal-100/30" />
        <div className="absolute top-1/2 -right-40 w-80 h-80 rounded-full bg-navy-100/20" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-xl"
          >
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-700 text-xs font-medium mb-6">
                {t.hero.hospitalLocation}
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="font-serif text-display-md lg:text-display-lg text-navy-800 leading-tight mb-6"
            >
              {t.hero.headline}
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-slate-600 text-lg leading-relaxed mb-8 max-w-lg"
            >
              {t.hero.subheadline}
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-3 mb-10">
              <button
                onClick={() => openAppointment()}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-navy-800 text-white rounded-xl font-semibold text-sm hover:bg-navy-700 active:scale-[0.98] transition-all duration-200"
              >
                {t.hero.cta1}
                <ArrowRight className="w-4 h-4" />
              </button>
              <Link
                href="/doctors"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-navy-800 rounded-xl font-semibold text-sm border border-navy-200 hover:border-navy-400 hover:bg-navy-50 active:scale-[0.98] transition-all duration-200"
              >
                <Search className="w-4 h-4" />
                {t.hero.cta2}
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-5 pt-8 border-t border-slate-200"
            >
              {[
                { value: '25+', label: t.hero.stats.years },
                { value: '50+', label: t.hero.stats.specialists },
                { value: '1.2L+', label: t.hero.stats.patients },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-serif text-2xl font-semibold text-navy-800">{stat.value}</div>
                  <div className="text-slate-500 text-xs mt-0.5">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Visual side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:block"
          >
            <div className="relative">
              {/* Main card */}
              <div className="bg-white rounded-3xl shadow-panel p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 rounded-full -translate-y-1/2 translate-x-1/2" />
                
                <div className="relative">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-navy-800 rounded-xl flex items-center justify-center">
                      <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6 text-white">
                        <path d="M13 12H19V14H17V20H15V14H13V12Z" fill="currentColor" />
                        <path d="M12 15H14V17H12V15Z" fill="currentColor" />
                        <path d="M18 15H20V17H18V15Z" fill="currentColor" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-serif text-navy-800 font-semibold">{t.hero.hospitalName}</div>
                      <div className="text-xs text-teal-600">{t.hero.tagline}</div>
                    </div>
                  </div>

                  {/* Specialities quick view */}
                  <div className="grid grid-cols-2 gap-3 mb-5">
                    {[
                      { name: language === 'mr' ? 'हृदयरोग' : language === 'hi' ? 'हृदय रोग' : 'Cardiology', color: '#B91C1C', icon: '❤️' },
                      { name: language === 'mr' ? 'मज्जासंस्था' : language === 'hi' ? 'तंत्रिका विज्ञान' : 'Neurology', color: '#7A3DB8', icon: '🧠' },
                      { name: language === 'mr' ? 'अस्थिरोग' : language === 'hi' ? 'हड्डी रोग' : 'Orthopaedics', color: '#1E6FA3', icon: '🦴' },
                      { name: language === 'mr' ? 'बालरोग' : language === 'hi' ? 'बाल रोग' : 'Paediatrics', color: '#0A7260', icon: '👶' },
                    ].map((spec) => (
                      <div
                        key={spec.name}
                        className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer"
                      >
                        <span className="text-lg">{spec.icon}</span>
                        <span className="text-slate-700 text-sm font-medium">{spec.name}</span>
                      </div>
                    ))}
                  </div>

                  {/* Live status mini */}
                  <div className="bg-slate-50 rounded-2xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-slate-600 text-xs font-semibold uppercase tracking-wide">{t.hero.hospitalStatus || t.status.heading.split('—')[0]}</span>
                      <div className="flex items-center gap-1.5">
                        <motion.div
                          className="w-1.5 h-1.5 rounded-full bg-teal-500"
                          animate={{ opacity: [1, 0.4, 1] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                        />
                        <span className="text-teal-600 text-xs font-medium">{t.hero.liveStatus || t.status.open}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { dept: t.hero.departments.emergency, status: 'Open' },
                        { dept: t.hero.departments.opd, status: 'Open' },
                        { dept: t.hero.departments.pharmacy, status: 'Open' },
                        { dept: t.hero.departments.laboratory, status: 'Open' },
                      ].map((item) => (
                        <div key={item.dept} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                          <span className="text-slate-600 text-xs">{item.dept}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating cards */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
                className="absolute -top-6 -left-8 bg-white rounded-2xl shadow-card-hover p-3 flex items-center gap-2.5"
              >
                <div className="w-8 h-8 bg-teal-100 rounded-xl flex items-center justify-center">
                  <span className="text-sm">👩‍⚕️</span>
                </div>
                <div>
                  <div className="text-slate-800 text-xs font-semibold">{t.hero.features.specialists}</div>
                  <div className="text-slate-500 text-[10px]">{t.hero.features.available}</div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut', delay: 1 }}
                className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-card-hover p-3"
              >
                <div className="text-slate-800 text-xs font-semibold mb-1">{t.hero.features.emergency247}</div>
                <button
                  onClick={onEmergencyOpen}
                  className="bg-medical-red text-white text-[10px] font-semibold px-2.5 py-1 rounded-lg"
                >
                  +91 20 6800 9999
                </button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
