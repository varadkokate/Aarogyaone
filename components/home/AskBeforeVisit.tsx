'use client'
import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ChevronDown, X } from 'lucide-react'
import { faqs, faqCategories } from '@/data/faqs'
import { useLanguage } from '@/context/LanguageContext'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import type { Language } from '@/types'

export function AskBeforeVisit() {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [openFaqId, setOpenFaqId] = useState<string | null>(null)
  const { t, language } = useLanguage()

  const suggestedQuestions = [
    faqs.find(f => f.id === 'faq-1'),
    faqs.find(f => f.id === 'faq-2'),
    faqs.find(f => f.id === 'faq-3'),
    faqs.find(f => f.id === 'faq-4'),
    faqs.find(f => f.id === 'faq-5'),
  ].filter(Boolean)

  const filteredFaqs = useMemo(() => {
    return faqs.filter(faq => {
      const matchesCategory = activeCategory === 'all' || faq.category === activeCategory
      const q = language === 'hi' ? (faq.questionHi || faq.question) : language === 'mr' ? (faq.questionMr || faq.question) : faq.question
      const matchesQuery = query === '' || q.toLowerCase().includes(query.toLowerCase())
      return matchesCategory && matchesQuery
    })
  }, [query, activeCategory, language])

  const getQuestion = (faq: typeof faqs[0]) => {
    if (language === 'hi' && faq.questionHi) return faq.questionHi
    if (language === 'mr' && faq.questionMr) return faq.questionMr
    return faq.question
  }

  const getAnswer = (faq: typeof faqs[0]) => {
    if (language === 'hi' && faq.answerHi) return faq.answerHi
    if (language === 'mr' && faq.answerMr) return faq.answerMr
    return faq.answer
  }

  return (
    <section className="py-16 lg:py-20 bg-cream-100" id="faq" aria-labelledby="faq-heading">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-10">
          <h2 id="faq-heading" className="font-serif text-display-sm text-navy-800 mb-2">
            {t.faq.heading}
          </h2>
          <p className="text-slate-500">{t.faq.subtitle}</p>
        </ScrollReveal>

        {/* Search */}
        <ScrollReveal delay={0.1} className="relative mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="search"
              placeholder={t.faq.searchPlaceholder}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-12 pr-12 py-4 rounded-2xl border border-slate-200 bg-white text-slate-800 text-base focus:outline-none focus:ring-2 focus:ring-navy-800/20 focus:border-navy-800 placeholder:text-slate-400 shadow-card"
              aria-label="Search FAQs"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center hover:bg-slate-300 transition-colors"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5 text-slate-600" />
              </button>
            )}
          </div>
        </ScrollReveal>

        {/* Suggested questions */}
        {!query && (
          <ScrollReveal delay={0.15} className="mb-6">
            <p className="text-slate-500 text-xs font-medium uppercase tracking-wide mb-3">{t.faq.suggestedQuestions}</p>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((faq) => faq && (
                <button
                  key={faq.id}
                  onClick={() => setOpenFaqId(openFaqId === faq.id ? null : faq.id)}
                  className="px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 text-xs font-medium hover:border-navy-300 hover:bg-navy-50 transition-colors"
                >
                  {getQuestion(faq)}
                </button>
              ))}
            </div>
          </ScrollReveal>
        )}

        {/* Category filter */}
        <ScrollReveal delay={0.2} className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
          {faqCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-medium transition-colors ${
                activeCategory === cat.id
                  ? 'bg-navy-800 text-white'
                  : 'bg-white border border-slate-200 text-slate-600 hover:border-navy-300'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </ScrollReveal>

        {/* FAQ list */}
        <div className="space-y-2">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-8 text-slate-400">
              {t.faq.notFound}
            </div>
          ) : (
            filteredFaqs.map((faq) => (
              <ScrollReveal key={faq.id}>
                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                  <button
                    onClick={() => setOpenFaqId(openFaqId === faq.id ? null : faq.id)}
                    className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 transition-colors"
                    aria-expanded={openFaqId === faq.id}
                  >
                    <span className="text-slate-800 text-sm font-semibold pr-4">{getQuestion(faq)}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-200 ${
                        openFaqId === faq.id ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {openFaqId === faq.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4">
                          {getAnswer(faq)}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </ScrollReveal>
            ))
          )}
        </div>
      </div>
    </section>
  )
}
