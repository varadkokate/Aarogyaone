'use client'
import { notFound, useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Star, Clock, Video, MapPin, Phone, ChevronRight, GraduationCap, Award } from 'lucide-react'
import Link from 'next/link'
import { doctors } from '@/data/doctors'
import { useAppointment } from '@/context/AppointmentContext'
import { ScrollReveal } from '@/components/shared/ScrollReveal'

export default function DoctorProfilePage() {
  const params = useParams()
  const doctor = doctors.find(d => d.id === params.id)
  const { openAppointment } = useAppointment()

  if (!doctor) return notFound()

  return (
    <div className="min-h-screen bg-cream-100">
      {/* Header */}
      <div className="bg-navy-800 pt-28 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-navy-600 to-navy-900 flex items-center justify-center text-white font-semibold text-3xl flex-shrink-0">
              {doctor.name.split(' ')[1]?.[0]}{doctor.name.split(' ')[2]?.[0]}
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="bg-teal-500/20 text-teal-300 text-xs font-medium px-2.5 py-1 rounded-full">{doctor.department}</span>
                {doctor.consultationTypes.map(t => (
                  <span key={t} className="bg-white/10 text-white/80 text-xs px-2.5 py-1 rounded-full">
                    {t === 'video' ? 'Video Consultation' : 'In-person'}
                  </span>
                ))}
              </div>
              <h1 className="font-serif text-display-sm text-white">{doctor.name}</h1>
              <p className="text-slate-300 mt-1">{doctor.designation}</p>
              <div className="flex flex-wrap items-center gap-4 mt-3">
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="text-white font-medium">{doctor.rating}</span>
                  <span className="text-slate-400 text-sm">rating</span>
                </div>
                <div className="text-slate-300 text-sm">{doctor.experience} years experience</div>
                <div className="text-slate-300 text-sm">{(doctor.patientsServed / 1000).toFixed(1)}k+ patients</div>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {doctor.languages.map(lang => (
                  <span key={lang} className="bg-white/10 text-white/80 text-xs px-2.5 py-1 rounded-full">{lang}</span>
                ))}
              </div>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <button
                onClick={() => openAppointment(doctor.speciality, doctor.id)}
                className="px-5 py-2.5 bg-teal-500 text-white rounded-xl text-sm font-semibold hover:bg-teal-400 transition-colors"
              >
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* About */}
            <ScrollReveal>
              <div className="bg-white rounded-3xl p-6 border border-slate-200">
                <h2 className="font-serif text-navy-800 text-xl mb-4">About</h2>
                <p className="text-slate-600 leading-relaxed">{doctor.about}</p>
              </div>
            </ScrollReveal>

            {/* Areas of expertise */}
            <ScrollReveal delay={0.05}>
              <div className="bg-white rounded-3xl p-6 border border-slate-200">
                <h2 className="font-serif text-navy-800 text-xl mb-4">Areas of Expertise</h2>
                <div className="grid grid-cols-2 gap-2">
                  {doctor.expertise.map((item) => (
                    <div key={item} className="flex items-center gap-2 p-2.5 rounded-xl bg-navy-50">
                      <ChevronRight className="w-4 h-4 text-teal-500 flex-shrink-0" />
                      <span className="text-slate-700 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Treatments */}
            <ScrollReveal delay={0.1}>
              <div className="bg-white rounded-3xl p-6 border border-slate-200">
                <h2 className="font-serif text-navy-800 text-xl mb-4">Treatments & Procedures</h2>
                <div className="flex flex-wrap gap-2">
                  {doctor.treatments.map((t) => (
                    <span key={t} className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-full text-sm">{t}</span>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Education */}
            <ScrollReveal delay={0.15}>
              <div className="bg-white rounded-3xl p-6 border border-slate-200">
                <h2 className="font-serif text-navy-800 text-xl mb-4">Education & Training</h2>
                <div className="space-y-4">
                  {doctor.education.map((edu, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-navy-100 flex items-center justify-center flex-shrink-0">
                        <GraduationCap className="w-4 h-4 text-navy-700" />
                      </div>
                      <div>
                        <div className="text-slate-800 font-semibold text-sm">{edu.degree}</div>
                        <div className="text-slate-500 text-xs mt-0.5">{edu.institution}</div>
                        <div className="text-slate-400 text-xs">{edu.year}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Appointment card */}
            <ScrollReveal direction="left">
              <div className="bg-white rounded-3xl p-5 border border-slate-200 sticky top-24">
                <h3 className="font-serif text-navy-800 text-lg mb-4">Book a Consultation</h3>

                {/* Slots */}
                {doctor.slots.map((slot) => (
                  <div key={slot.date} className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-slate-600 text-xs font-medium">{slot.date}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1.5">
                      {slot.times.map((time) => (
                        <button
                          key={time}
                          onClick={() => openAppointment(doctor.speciality, doctor.id)}
                          className="py-2 bg-navy-50 text-navy-700 rounded-lg text-xs font-medium hover:bg-navy-800 hover:text-white transition-colors"
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

                <button
                  onClick={() => openAppointment(doctor.speciality, doctor.id)}
                  className="w-full py-3 bg-navy-800 text-white rounded-xl font-semibold text-sm hover:bg-navy-700 transition-colors mt-2"
                >
                  Book Appointment
                </button>

                <div className="mt-3 text-center">
                  <span className="text-slate-400 text-xs">or</span>
                </div>
                <Link
                  href="/patient-care#faq"
                  className="w-full mt-2 py-3 border border-slate-200 text-slate-600 rounded-xl font-medium text-sm hover:border-navy-300 hover:bg-navy-50 transition-colors text-center block"
                >
                  Ask Before You Visit
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  )
}
