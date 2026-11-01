'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HelpCircle, X, ChevronDown } from 'lucide-react'
import type { MedicalTerm } from '@/types'

interface MedicalTermBadgeProps {
  term: MedicalTerm
}

export function MedicalTermBadge({ term }: MedicalTermBadgeProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [showDetailed, setShowDetailed] = useState(false)

  return (
    <span className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="underline decoration-dotted decoration-teal-500 text-teal-700 font-medium cursor-help hover:text-teal-800 transition-colors"
        aria-expanded={isOpen}
        aria-label={`Explain: ${term.term}`}
      >
        {term.term}
      </button>
      <span className="text-teal-500 text-xs ml-0.5 align-super">
        <HelpCircle className="w-2.5 h-2.5 inline" />
      </span>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => { setIsOpen(false); setShowDetailed(false) }} aria-hidden="true" />
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.97 }}
              className="absolute left-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-panel border border-slate-200 z-50 overflow-hidden"
            >
              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-wide mb-0.5">Medical term</div>
                    <h4 className="text-navy-800 font-semibold text-sm">{term.term}</h4>
                  </div>
                  <button
                    onClick={() => { setIsOpen(false); setShowDetailed(false) }}
                    className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200"
                    aria-label="Close"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="bg-teal-50 rounded-xl p-3 mb-3">
                  <div className="text-[10px] text-teal-600 font-medium uppercase tracking-wide mb-1">Simple explanation</div>
                  <p className="text-slate-700 text-sm leading-relaxed">{term.simple}</p>
                </div>

                <AnimatePresence>
                  {showDetailed && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden mb-3"
                    >
                      <div className="bg-navy-50 rounded-xl p-3">
                        <div className="text-[10px] text-navy-600 font-medium uppercase tracking-wide mb-1">Medical explanation</div>
                        <p className="text-slate-600 text-xs leading-relaxed">{term.detailed}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  onClick={() => setShowDetailed(!showDetailed)}
                  className="flex items-center gap-1 text-navy-700 text-xs font-medium hover:text-navy-900 transition-colors"
                >
                  {showDetailed ? 'Show less' : 'See medical explanation'}
                  <ChevronDown className={`w-3 h-3 transition-transform ${showDetailed ? 'rotate-180' : ''}`} />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </span>
  )
}
