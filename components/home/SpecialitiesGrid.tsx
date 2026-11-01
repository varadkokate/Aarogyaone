'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { specialities } from '@/data/specialities'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { useLanguage } from '@/context/LanguageContext'

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

export function SpecialitiesGrid() {
  const { t, language } = useLanguage()
  return (
    <section className="py-16 lg:py-20 bg-cream-100" aria-labelledby="specialities-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="flex items-end justify-between mb-10">
          <div>
            <span className="text-teal-600 text-sm font-medium uppercase tracking-wide">{t.specialitiesGrid.tagline}</span>
            <h2 id="specialities-heading" className="font-serif text-display-sm text-navy-800 mt-1" dangerouslySetInnerHTML={{ __html: t.specialitiesGrid.title.replace('&', '& <br class="hidden sm:block" />').replace('आणि', 'आणि <br class="hidden sm:block" />').replace('और', 'और <br class="hidden sm:block" />') }} />
          </div>
          <Link href="/specialities" className="hidden sm:flex items-center gap-1.5 text-navy-800 text-sm font-semibold hover:gap-2.5 transition-all">
            {t.specialitiesGrid.viewAll} <ArrowRight className="w-4 h-4" />
          </Link>
        </ScrollReveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {specialities.map((spec, i) => (
            <motion.div
              key={spec.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
            >
              <Link
                href={`/specialities#${spec.id}`}
                className="group flex flex-col items-start p-5 bg-white rounded-2xl border border-slate-200 hover:border-transparent hover:shadow-card-hover transition-all duration-300 h-full"
                style={{
                  '--spec-color': spec.color,
                } as React.CSSProperties}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: spec.color + '15' }}
                >
                  {specialityIcons[spec.id]}
                </div>
                <h3 className="text-slate-800 font-semibold text-sm leading-tight mb-2 group-hover:text-navy-800">
                  {language === 'hi' ? spec.nameHi : language === 'mr' ? spec.nameMr : spec.name}
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed line-clamp-2">
                  {spec.conditions.slice(0, 2).join(', ')}
                </p>
                <div className="mt-3 flex items-center gap-1 text-navy-800 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  {t.specialitiesGrid.learnMore} <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <Link href="/specialities" className="flex sm:hidden items-center justify-center gap-1.5 text-navy-800 text-sm font-semibold mt-6">
          {t.specialitiesGrid.viewAll} <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  )
}
