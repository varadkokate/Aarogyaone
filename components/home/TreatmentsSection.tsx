'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Clock, Activity } from 'lucide-react'
import { treatments } from '@/data/treatments'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { useLanguage } from '@/context/LanguageContext'

export function TreatmentsSection() {
  const { t } = useLanguage()
  return (
    <section className="py-16 lg:py-20 bg-navy-800" aria-labelledby="treatments-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="flex items-end justify-between mb-10">
          <div>
            <span className="text-teal-400 text-sm font-medium uppercase tracking-wide">{t.treatmentsSection.tagline}</span>
            <h2 id="treatments-heading" className="font-serif text-display-sm text-white mt-1" dangerouslySetInnerHTML={{ __html: t.treatmentsSection.title.replace('for', 'for <br class="hidden sm:block" />').replace('के लिए', 'के लिए <br class="hidden sm:block" />').replace('साठी', 'साठी <br class="hidden sm:block" />') }} />
          </div>
          <Link href="/specialities#treatments" className="hidden sm:flex items-center gap-1.5 text-slate-300 text-sm font-semibold hover:text-white hover:gap-2.5 transition-all">
            {t.treatmentsSection.viewAll} <ArrowRight className="w-4 h-4" />
          </Link>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 gap-4">
          {treatments.map((treatment, i) => (
            <motion.div
              key={treatment.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link
                href={`/specialities#${treatment.specialityId}`}
                className="group block bg-white/5 hover:bg-white/10 border border-white/10 hover:border-teal-500/40 rounded-3xl p-6 transition-all duration-300"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-teal-500/20 flex items-center justify-center flex-shrink-0">
                    <Activity className="w-6 h-6 text-teal-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold text-lg leading-tight">{treatment.name}</h3>
                    <p className="text-slate-400 text-sm mt-1">{treatment.specialityId.charAt(0).toUpperCase() + treatment.specialityId.slice(1)}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-teal-400 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-4 line-clamp-2">{treatment.description}</p>
                <div className="flex gap-4">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-slate-400 text-xs">{treatment.duration}</span>
                  </div>
                  <div className="text-teal-400 text-xs">{treatment.journey.length} {t.treatmentsSection.journeySteps}</div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
