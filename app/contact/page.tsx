'use client'
import { useEffect } from 'react'
import { Phone, Mail, MapPin, Clock, ArrowRight } from 'lucide-react'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { useAppointment } from '@/context/AppointmentContext'
import { useLanguage } from '@/context/LanguageContext'
import { AskBeforeVisit } from '@/components/home/AskBeforeVisit'

export default function ContactPage() {
  const { openAppointment } = useAppointment()
  const { t } = useLanguage()

  const contactInfo = [
    {
      icon: Phone,
      label: 'Emergency (24×7)',
      value: '+91 20 6800 9999',
      href: 'tel:+912068009999',
      color: 'text-medical-red',
      bg: 'bg-red-50',
    },
    {
      icon: Phone,
      label: 'Appointments',
      value: '+91 20 6800 1000',
      href: 'tel:+912068001000',
      color: 'text-navy-700',
      bg: 'bg-navy-50',
      hours: 'Mon–Sat, 8 AM – 8 PM',
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'care@aarogyaone.in',
      href: 'mailto:care@aarogyaone.in',
      color: 'text-teal-700',
      bg: 'bg-teal-50',
    },
    {
      icon: MapPin,
      label: 'Address',
      value: '14, Senapati Bapat Road, Pune — 411016',
      href: 'https://maps.google.com',
      color: 'text-purple-700',
      bg: 'bg-purple-50',
    },
    {
      icon: Clock,
      label: 'OPD Hours',
      value: 'Mon–Sat: 8 AM – 8 PM',
      href: '#',
      color: 'text-amber-700',
      bg: 'bg-amber-50',
      hours: 'Sunday: 9 AM – 1 PM (limited)',
    },
  ]

  return (
    <div className="min-h-screen bg-cream-100">
      <div className="bg-navy-800 pt-28 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-display-sm text-white mb-2">Contact & Appointments</h1>
          <p className="text-slate-300 max-w-lg">Book your appointment, find us, or get in touch with our care team.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Book appointment CTA */}
        <ScrollReveal>
          <div className="bg-navy-800 rounded-3xl p-8 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="font-serif text-display-sm text-white mb-2">Ready to book?</h2>
              <p className="text-slate-300 max-w-md">
                Book an appointment with any of our 50+ specialists. Choose between in-person and video consultation.
              </p>
            </div>
            <button
              onClick={() => openAppointment()}
              className="flex-shrink-0 flex items-center gap-2 px-8 py-4 bg-teal-500 text-white rounded-2xl font-semibold text-lg hover:bg-teal-400 transition-colors"
            >
              {t.appointment.heading}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </ScrollReveal>

        {/* Contact information */}
        <div>
          <ScrollReveal className="mb-6">
            <h2 className="font-serif text-display-sm text-navy-800">Get in touch</h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {contactInfo.map((item, i) => (
              <ScrollReveal key={item.label} delay={i * 0.07}>
                <a
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className={`flex items-start gap-4 p-5 ${item.bg} rounded-2xl border border-transparent hover:shadow-card-hover transition-all group`}
                >
                  <div className={`w-10 h-10 rounded-xl ${item.bg} border border-white/50 flex items-center justify-center flex-shrink-0`}>
                    <item.icon className={`w-5 h-5 ${item.color}`} />
                  </div>
                  <div>
                    <div className="text-slate-500 text-xs font-medium mb-0.5">{item.label}</div>
                    <div className={`${item.color} font-semibold text-sm group-hover:underline`}>{item.value}</div>
                    {item.hours && <div className="text-slate-400 text-xs mt-0.5">{item.hours}</div>}
                  </div>
                </a>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Map section */}
        <ScrollReveal>
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100">
              <h2 className="font-serif text-navy-800 text-xl">Find Us</h2>
              <p className="text-slate-500 text-sm mt-1">14, Senapati Bapat Road, Pune — 411016, Maharashtra</p>
            </div>
            {/* Embedded map placeholder (Google Maps iframe would go here in production) */}
            <div className="h-64 lg:h-80 bg-navy-50 flex items-center justify-center relative">
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-navy-100 flex items-center justify-center mx-auto mb-3">
                  <MapPin className="w-8 h-8 text-navy-400" />
                </div>
                <p className="text-slate-500 text-sm font-medium">AarogyaOne Hospitals</p>
                <p className="text-slate-400 text-xs mt-0.5">Senapati Bapat Road, Pune</p>
                <a
                  href="https://maps.google.com/?q=Senapati+Bapat+Road+Pune"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-4 px-4 py-2 bg-navy-800 text-white text-xs font-semibold rounded-xl hover:bg-navy-700 transition-colors"
                >
                  Open in Google Maps <ArrowRight className="w-3 h-3" />
                </a>
              </div>
              {/* Decorative grid */}
              <div className="absolute inset-0 opacity-30" aria-hidden="true">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <defs><pattern id="contact-grid" width="30" height="30" patternUnits="userSpaceOnUse">
                    <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#0F2A4A" strokeWidth="0.5" />
                  </pattern></defs>
                  <rect width="100%" height="100%" fill="url(#contact-grid)" />
                </svg>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* How to reach */}
        <ScrollReveal>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { icon: '🚇', mode: 'Metro', desc: 'Shivajinagar Metro Station — 10 min walk to hospital' },
              { icon: '🚌', mode: 'Bus', desc: 'PMPML stops within 200m of main entrance. Routes 12, 17, 38, 52' },
              { icon: '🚕', mode: 'Cab / Auto', desc: 'Ola, Uber, and auto-rickshaws available. Ask for Gate 1, Senapati Bapat Road' },
            ].map(item => (
              <div key={item.mode} className="bg-white rounded-2xl border border-slate-200 p-5">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="text-navy-800 font-semibold mb-1.5">By {item.mode}</h3>
                <p className="text-slate-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* FAQ */}
        <div>
          <AskBeforeVisit />
        </div>

        {/* Demo disclaimer */}
        <ScrollReveal>
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
            <p className="text-amber-800 text-sm">
              <strong>⚠️ Demo Notice:</strong> AarogyaOne Hospitals is a fictional demonstration website. All contact details, doctors, addresses and services shown are for demonstration purposes only. No real bookings are made and no real appointments are confirmed through this website.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </div>
  )
}
