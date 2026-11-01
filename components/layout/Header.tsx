'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone, ChevronDown } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { useAppointment } from '@/context/AppointmentContext'
import { useTheme, type Theme } from '@/context/ThemeContext'
import { Palette } from 'lucide-react'
import type { Language } from '@/types'

const navItems = [
  { key: 'doctors', href: '/doctors' },
  { key: 'specialities', href: '/specialities' },
  { key: 'hospital', href: '/hospital' },
  { key: 'patientCare', href: '/patient-care' },
  { key: 'contact', href: '/contact' },
] as const

export function Header({ onEmergencyOpen }: { onEmergencyOpen: () => void }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [themeOpen, setThemeOpen] = useState(false)
  const pathname = usePathname()
  const { language, setLanguage, t } = useLanguage()
  const { openAppointment } = useAppointment()
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  const languages: { code: Language; label: string }[] = [
    { code: 'en', label: 'English' },
    { code: 'mr', label: 'मराठी' },
    { code: 'hi', label: 'हिंदी' },
  ]

  const themes: { code: Theme; label: string; color: string }[] = [
    { code: 'theme-trust', label: 'Trust (Light)', color: 'bg-[#0F2A4A]' },
    { code: 'theme-wellness', label: 'Wellness (Light)', color: 'bg-[#16a34a]' },
    { code: 'theme-clinical', label: 'Clinical (Dark)', color: 'bg-[#1d3780]' },
    { code: 'theme-premium', label: 'Premium (Dark)', color: 'bg-[#312e81]' },
  ]

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white/95 backdrop-blur-md shadow-header py-3' : 'bg-white py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
              <div className="w-8 h-8 bg-navy-800 rounded-lg flex items-center justify-center">
                <svg viewBox="0 0 32 32" fill="none" className="w-5 h-5 text-white">
                  <path d="M16 4L28 10V22L16 28L4 22V10L16 4Z" fill="currentColor" fillOpacity="0.8" />
                  <path d="M13 12H19V14H17V20H15V14H13V12Z" fill="currentColor" />
                  <path d="M12 15H14V17H12V15Z" fill="currentColor" />
                  <path d="M18 15H20V17H18V15Z" fill="currentColor" />
                </svg>
              </div>
              <div>
                <div className="font-serif text-navy-800 text-lg leading-tight font-semibold tracking-tight">
                  AarogyaOne
                </div>
                <div className="text-teal-500 text-[10px] leading-none tracking-wide font-medium uppercase">
                  Hospitals
                </div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
              {navItems.map((item) => {
                const label = t.nav[item.key as keyof typeof t.nav]
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
                return (
                  <Link
                    key={item.key}
                    href={item.href}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ${
                      isActive
                        ? 'text-navy-800 bg-navy-50'
                        : 'text-slate-600 hover:text-navy-800 hover:bg-navy-50'
                    }`}
                  >
                    {label}
                  </Link>
                )
              })}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              {/* Theme switcher */}
              <div className="hidden md:block relative">
                <button
                  onClick={() => setThemeOpen(!themeOpen)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-navy-800 hover:bg-navy-50 transition-colors"
                  aria-expanded={themeOpen}
                  aria-haspopup="listbox"
                  aria-label="Select theme"
                >
                  <Palette className="w-4 h-4" />
                  <ChevronDown className={`w-3 h-3 transition-transform ${themeOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {themeOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      className="absolute right-0 top-full mt-1 bg-white rounded-xl shadow-panel border border-slate-100 overflow-hidden z-50 min-w-[140px]"
                      role="listbox"
                    >
                      {themes.map((t) => (
                        <button
                          key={t.code}
                          onClick={() => { setTheme(t.code); setThemeOpen(false) }}
                          className={`w-full flex items-center gap-2 text-left px-4 py-2.5 text-sm transition-colors ${
                            theme === t.code
                              ? 'bg-navy-50 text-navy-800 font-medium'
                              : 'text-slate-600 hover:bg-slate-50'
                          }`}
                          role="option"
                          aria-selected={theme === t.code}
                        >
                          <span className={`w-3 h-3 rounded-full ${t.color}`} />
                          {t.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Language switcher */}
              <div className="hidden md:block relative">
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-navy-800 hover:bg-navy-50 transition-colors"
                  aria-expanded={langOpen}
                  aria-haspopup="listbox"
                  aria-label="Select language"
                >
                  <span>{languages.find((l) => l.code === language)?.label}</span>
                  <ChevronDown className={`w-3 h-3 transition-transform ${langOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {langOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      className="absolute right-0 top-full mt-1 bg-white rounded-xl shadow-panel border border-slate-100 overflow-hidden z-50 min-w-[120px]"
                      role="listbox"
                    >
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => { setLanguage(lang.code); setLangOpen(false) }}
                          className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                            language === lang.code
                              ? 'bg-navy-50 text-navy-800 font-medium'
                              : 'text-slate-600 hover:bg-slate-50'
                          }`}
                          role="option"
                          aria-selected={language === lang.code}
                        >
                          {lang.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Emergency */}
              <button
                onClick={onEmergencyOpen}
                className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-medical-red border border-medical-red/20 bg-medical-red-light/50 hover:bg-medical-red hover:text-white transition-all duration-200"
                aria-label="Open emergency assistance"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{t.nav.emergency}</span>
              </button>

              {/* Book appointment */}
              <button
                onClick={() => openAppointment()}
                className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold bg-navy-800 text-white hover:bg-navy-700 transition-colors duration-200"
                aria-label="Book appointment"
              >
                {t.nav.bookAppointment}
              </button>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile nav drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-navy-950/40 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 350 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-72 bg-white shadow-2xl lg:hidden flex flex-col"
              role="dialog"
              aria-label="Mobile navigation"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-navy-800 rounded-lg flex items-center justify-center">
                    <svg viewBox="0 0 32 32" fill="none" className="w-4 h-4 text-white">
                      <path d="M13 12H19V14H17V20H15V14H13V12Z" fill="currentColor" />
                      <path d="M12 15H14V17H12V15Z" fill="currentColor" />
                      <path d="M18 15H20V17H18V15Z" fill="currentColor" />
                    </svg>
                  </div>
                  <span className="font-serif text-navy-800 text-base font-semibold">AarogyaOne</span>
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-lg text-slate-400 hover:bg-slate-100"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
                {navItems.map((item) => {
                  const label = t.nav[item.key as keyof typeof t.nav]
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.key}
                      href={item.href}
                      className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                        isActive ? 'bg-navy-50 text-navy-800' : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {label}
                    </Link>
                  )
                })}
              </nav>

              <div className="px-4 py-4 border-t border-slate-100 space-y-3">
                {/* Theme switcher mobile */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
                  {themes.map((t) => (
                    <button
                      key={t.code}
                      onClick={() => setTheme(t.code)}
                      className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                        theme === t.code
                          ? 'bg-navy-800 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      <span className={`w-2.5 h-2.5 rounded-full ${t.color}`} />
                      {t.label}
                    </button>
                  ))}
                </div>

                {/* Language switcher mobile */}
                <div className="flex items-center gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => setLanguage(lang.code)}
                      className={`flex-1 py-2 rounded-lg text-xs font-medium transition-colors ${
                        language === lang.code
                          ? 'bg-navy-800 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => { onEmergencyOpen(); setMobileOpen(false) }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-medical-red border border-medical-red/20 bg-medical-red-light/50"
                >
                  <Phone className="w-4 h-4" />
                  {t.nav.emergency}
                </button>
                <button
                  onClick={() => { openAppointment(); setMobileOpen(false) }}
                  className="w-full py-3 rounded-xl text-sm font-semibold bg-navy-800 text-white"
                >
                  {t.nav.bookAppointment}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Click outside handlers */}
      {(langOpen || themeOpen) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => { setLangOpen(false); setThemeOpen(false) }}
          aria-hidden="true"
        />
      )}
    </>
  )
}
