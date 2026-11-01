'use client'
import { motion } from 'framer-motion'
import { Star, Clock, Video, MapPin, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { doctors } from '@/data/doctors'
import { useLanguage } from '@/context/LanguageContext'
import { useAppointment } from '@/context/AppointmentContext'
import { ScrollReveal, StaggerContainer, staggerChild } from '@/components/shared/ScrollReveal'

export function FeaturedDoctors() {
  const { t } = useLanguage()
  const { openAppointment } = useAppointment()
  const featured = doctors.slice(0, 6)

  return (
    <section className="py-16 lg:py-20 bg-white" aria-labelledby="doctors-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="flex items-end justify-between mb-10">
          <div>
            <span className="text-teal-600 text-sm font-medium uppercase tracking-wide">{t.doctors.featured.tagline}</span>
            <h2 id="doctors-heading" className="font-serif text-display-sm text-navy-800 mt-1" dangerouslySetInnerHTML={{ __html: t.doctors.featured.title.replace(',', ', <br class="hidden sm:block" />') }} />
          </div>
          <Link href="/doctors" className="hidden sm:flex items-center gap-1.5 text-navy-800 text-sm font-semibold hover:gap-2.5 transition-all">
            {t.doctors.featured.viewAll} <ArrowRight className="w-4 h-4" />
          </Link>
        </ScrollReveal>

        {/* Horizontal scroll on mobile, grid on desktop */}
        <div className="-mx-4 sm:mx-0">
          <div className="flex gap-4 overflow-x-auto pb-4 px-4 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:overflow-visible sm:pb-0 scrollbar-hide">
            {featured.map((doc, i) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-white border border-slate-200 rounded-3xl p-5 flex-shrink-0 w-72 sm:w-auto hover:shadow-card-hover hover:border-navy-200 transition-all duration-300 group"
              >
                {/* Doctor header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-gradient-to-br from-navy-100 to-navy-200 flex-shrink-0">
                    <div className="w-full h-full flex items-center justify-center text-navy-700 font-semibold text-lg">
                      {doc.name.split(' ')[1]?.[0]}{doc.name.split(' ')[2]?.[0]}
                    </div>
                    {doc.gender === 'female' && (
                      <div className="absolute bottom-0 right-0 w-4 h-4 bg-teal-500 rounded-tl-lg flex items-center justify-center">
                        <span className="text-white text-[8px]">♀</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-slate-800 font-semibold text-sm leading-tight">{doc.name}</h3>
                    <p className="text-slate-500 text-xs mt-0.5 truncate">{doc.designation}</p>
                    <div className="flex items-center gap-1 mt-1.5">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <span className="text-slate-700 text-xs font-medium">{doc.rating}</span>
                      <span className="text-slate-400 text-xs">({(doc.patientsServed / 1000).toFixed(1)}k {t.doctors.featured.patients})</span>
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 text-xs">{doc.experience} {t.doctors.experience}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300" />
                    <span className="text-slate-400 text-xs">{doc.languages.slice(0, 2).join(', ')}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {doc.consultationTypes.map((type) => (
                      <span key={type} className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${
                        type === 'video' ? 'bg-teal-50 text-teal-700' : 'bg-navy-50 text-navy-700'
                      }`}>
                        {type === 'video' ? <Video className="w-2.5 h-2.5" /> : <MapPin className="w-2.5 h-2.5" />}
                        {type === 'video' ? t.doctors.featured.video : t.doctors.featured.inPerson}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Availability */}
                <div className="flex items-center gap-1.5 mb-4 bg-teal-50 rounded-xl px-3 py-2">
                  <Clock className="w-3.5 h-3.5 text-teal-600" />
                  <span className="text-teal-700 text-xs font-medium">{t.doctors.nextAvailable}: {doc.nextAvailable}</span>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href={`/doctors/${doc.id}`}
                    className="py-2.5 border border-slate-200 text-slate-700 rounded-xl text-xs font-semibold text-center hover:border-navy-300 hover:bg-navy-50 transition-colors"
                  >
                    {t.doctors.viewProfile}
                  </Link>
                  <button
                    onClick={() => openAppointment(doc.speciality, doc.id)}
                    className="py-2.5 bg-navy-800 text-white rounded-xl text-xs font-semibold hover:bg-navy-700 transition-colors group-hover:bg-teal-600"
                  >
                    {t.doctors.bookAppointment}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <Link href="/doctors" className="flex sm:hidden items-center justify-center gap-1.5 text-navy-800 text-sm font-semibold mt-5">
          {t.doctors.featured.viewAll} <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  )
}
