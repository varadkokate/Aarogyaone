'use client'
import Link from 'next/link'
import { Phone, Mail, MapPin, Clock, Heart } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { useAppointment } from '@/context/AppointmentContext'

const footerLinks = {
  departments: [
    { label: 'Cardiology', href: '/specialities#cardiology' },
    { label: 'Neurology', href: '/specialities#neurology' },
    { label: 'Orthopaedics', href: '/specialities#orthopaedics' },
    { label: 'Oncology', href: '/specialities#oncology' },
    { label: 'Paediatrics', href: '/specialities#paediatrics' },
    { label: 'Gynaecology', href: '/specialities#gynaecology' },
    { label: 'Gastroenterology', href: '/specialities#gastroenterology' },
    { label: 'Nephrology', href: '/specialities#nephrology' },
  ],
  patientServices: [
    { label: 'Before Your Visit', href: '/patient-care#before' },
    { label: 'Admission Process', href: '/patient-care#admission' },
    { label: 'During Treatment', href: '/patient-care#during' },
    { label: 'After Treatment', href: '/patient-care#after' },
    { label: 'Ask Before You Visit', href: '/patient-care#faq' },
    { label: 'Insurance & Billing', href: '/patient-care#billing' },
  ],
  hospital: [
    { label: 'About AarogyaOne', href: '/hospital#about' },
    { label: 'Find My Way', href: '/hospital#findmyway' },
    { label: 'Facilities & Infrastructure', href: '/hospital#infrastructure' },
    { label: 'Technology', href: '/hospital#technology' },
    { label: 'Hospital Status', href: '/hospital#status' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Use', href: '#' },
    { label: 'Accessibility', href: '#' },
    { label: 'Disclaimer', href: '#' },
  ],
}

export function Footer({ onEmergencyOpen }: { onEmergencyOpen: () => void }) {
  const { t } = useLanguage()
  const { openAppointment } = useAppointment()

  return (
    <footer className="bg-navy-900 text-slate-300" role="contentinfo">
      {/* Emergency banner */}
      <div className="bg-medical-red">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
              <Phone className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-white font-semibold text-sm">{t.footer.emergency}</div>
              <div className="text-white/80 text-xs">Available round the clock, 365 days a year</div>
            </div>
          </div>
          <button
            onClick={onEmergencyOpen}
            className="flex-shrink-0 bg-white text-medical-red font-semibold text-sm px-5 py-2 rounded-lg hover:bg-red-50 transition-colors"
          >
            +91 20 6800 9999
          </button>
        </div>
      </div>

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center">
                <svg viewBox="0 0 32 32" fill="none" className="w-5 h-5">
                  <path d="M13 12H19V14H17V20H15V14H13V12Z" fill="white" />
                  <path d="M12 15H14V17H12V15Z" fill="white" />
                  <path d="M18 15H20V17H18V15Z" fill="white" />
                </svg>
              </div>
              <div>
                <div className="font-serif text-white text-lg font-semibold leading-tight">AarogyaOne</div>
                <div className="text-teal-400 text-[10px] tracking-wide font-medium uppercase">Hospitals</div>
              </div>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-5 max-w-xs">
              Better Care. Closer to You. Comprehensive healthcare built around the needs of patients and their families.
            </p>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-teal-400 mt-0.5 flex-shrink-0" />
                <span className="text-slate-400 text-sm">14, Senapati Bapat Road, Pune — 411016, Maharashtra</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-teal-400 flex-shrink-0" />
                <span className="text-slate-400 text-sm">+91 20 6800 1000 (Reception)</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-teal-400 flex-shrink-0" />
                <span className="text-slate-400 text-sm">care@aarogyaone.in</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-teal-400 flex-shrink-0" />
                <span className="text-slate-400 text-sm">OPD: Mon–Sat, 8 AM – 8 PM</span>
              </div>
            </div>

            <button
              onClick={() => openAppointment()}
              className="mt-6 bg-teal-500 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-teal-400 transition-colors"
            >
              Book Appointment
            </button>
          </div>

          {/* Departments */}
          <div>
            <h3 className="text-white text-sm font-semibold mb-4 uppercase tracking-wide">Departments</h3>
            <ul className="space-y-2.5">
              {footerLinks.departments.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-slate-400 text-sm hover:text-teal-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Patient Services */}
          <div>
            <h3 className="text-white text-sm font-semibold mb-4 uppercase tracking-wide">Patient Services</h3>
            <ul className="space-y-2.5">
              {footerLinks.patientServices.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-slate-400 text-sm hover:text-teal-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hospital */}
          <div>
            <h3 className="text-white text-sm font-semibold mb-4 uppercase tracking-wide">Hospital</h3>
            <ul className="space-y-2.5">
              {footerLinks.hospital.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-slate-400 text-sm hover:text-teal-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1 text-slate-500 text-xs">
            <span>{t.footer.copyright}</span>
          </div>
          <div className="flex items-center gap-4">
            {footerLinks.legal.map((link) => (
              <Link key={link.label} href={link.href} className="text-slate-500 text-xs hover:text-slate-300 transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 pb-4">
          <p className="text-slate-600 text-xs text-center">
            {t.footer.disclaimer}
          </p>
        </div>
      </div>
    </footer>
  )
}
