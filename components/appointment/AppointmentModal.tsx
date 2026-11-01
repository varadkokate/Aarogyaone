'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Check, Calendar, Clock, User, Video, MapPin, ChevronRight } from 'lucide-react'
import { useAppointment } from '@/context/AppointmentContext'
import { useLanguage } from '@/context/LanguageContext'
import { specialities } from '@/data/specialities'
import { doctors } from '@/data/doctors'
import { useState } from 'react'
import type { Language } from '@/types'

const TOTAL_STEPS = 7

function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`Step ${current} of ${total}`}>
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className={`h-1.5 rounded-full transition-all duration-300 ${
            i + 1 === current ? 'bg-navy-800 w-6' : i + 1 < current ? 'bg-teal-500 w-4' : 'bg-slate-200 w-4'
          }`}
        />
      ))}
    </div>
  )
}

function Step1({ onNext }: { onNext: () => void }) {
  const { formData, updateFormData } = useAppointment()
  const { t } = useLanguage()
  return (
    <div className="space-y-4">
      <p className="text-slate-500 text-sm">{t.appointment.steps.speciality}</p>
      <div className="grid grid-cols-1 gap-2 max-h-72 overflow-y-auto pr-1">
        {specialities.map((spec) => (
          <button
            key={spec.id}
            onClick={() => { updateFormData({ specialityId: spec.id, doctorId: '' }); onNext() }}
            className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
              formData.specialityId === spec.id
                ? 'border-navy-800 bg-navy-50'
                : 'border-slate-200 hover:border-navy-300 hover:bg-slate-50'
            }`}
          >
            <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: spec.color + '20' }}>
              <span className="text-lg">{spec.id === 'cardiology' ? '❤️' : spec.id === 'neurology' ? '🧠' : spec.id === 'orthopaedics' ? '🦴' : spec.id === 'oncology' ? '🎗️' : spec.id === 'gastroenterology' ? '🫀' : spec.id === 'paediatrics' ? '👶' : spec.id === 'gynaecology' ? '🌸' : '💧'}</span>
            </div>
            <span className="text-slate-700 text-sm font-medium">{spec.name}</span>
            <ChevronRight className="w-4 h-4 text-slate-400 ml-auto" />
          </button>
        ))}
      </div>
    </div>
  )
}

function Step2({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const { formData, updateFormData } = useAppointment()
  const { t } = useLanguage()
  const filteredDoctors = formData.specialityId
    ? doctors.filter((d) => d.speciality === formData.specialityId)
    : doctors

  return (
    <div className="space-y-4">
      <p className="text-slate-500 text-sm">{t.appointment.steps.doctor}</p>
      <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
        {filteredDoctors.map((doc) => (
          <button
            key={doc.id}
            onClick={() => { updateFormData({ doctorId: doc.id }); onNext() }}
            className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
              formData.doctorId === doc.id
                ? 'border-navy-800 bg-navy-50'
                : 'border-slate-200 hover:border-navy-300'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-navy-100 flex items-center justify-center flex-shrink-0 text-navy-700 font-semibold text-sm">
              {doc.name.split(' ')[1]?.[0]}{doc.name.split(' ')[2]?.[0]}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-slate-800 text-sm font-semibold truncate">{doc.name}</div>
              <div className="text-slate-500 text-xs">{doc.designation}</div>
              <div className="text-teal-600 text-xs mt-0.5">{doc.nextAvailable}</div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
          </button>
        ))}
      </div>
    </div>
  )
}

function Step3({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const { formData, updateFormData } = useAppointment()
  const { t } = useLanguage()
  const selectedDoc = doctors.find((d) => d.id === formData.doctorId)
  const types = selectedDoc?.consultationTypes || ['in-person', 'video']

  return (
    <div className="space-y-4">
      <p className="text-slate-500 text-sm">{t.appointment.steps.consultationType}</p>
      <div className="grid grid-cols-1 gap-3">
        {types.includes('in-person') && (
          <button
            onClick={() => { updateFormData({ consultationType: 'in-person' }); onNext() }}
            className={`flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all ${
              formData.consultationType === 'in-person' ? 'border-navy-800 bg-navy-50' : 'border-slate-200 hover:border-navy-300'
            }`}
          >
            <div className="w-12 h-12 rounded-xl bg-navy-100 flex items-center justify-center">
              <MapPin className="w-6 h-6 text-navy-700" />
            </div>
            <div>
              <div className="font-semibold text-slate-800">{t.appointment.consultationType.inPerson}</div>
              <div className="text-slate-500 text-sm">Visit the hospital for your consultation</div>
            </div>
          </button>
        )}
        {types.includes('video') && (
          <button
            onClick={() => { updateFormData({ consultationType: 'video' }); onNext() }}
            className={`flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all ${
              formData.consultationType === 'video' ? 'border-teal-600 bg-teal-50' : 'border-slate-200 hover:border-teal-300'
            }`}
          >
            <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center">
              <Video className="w-6 h-6 text-teal-700" />
            </div>
            <div>
              <div className="font-semibold text-slate-800">{t.appointment.consultationType.video}</div>
              <div className="text-slate-500 text-sm">Connect with your doctor online</div>
            </div>
          </button>
        )}
      </div>
    </div>
  )
}

function Step4({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const { formData, updateFormData } = useAppointment()
  const { t } = useLanguage()
  const selectedDoc = doctors.find((d) => d.id === formData.doctorId)
  const slots = selectedDoc?.slots || []

  return (
    <div className="space-y-4">
      <p className="text-slate-500 text-sm">{t.appointment.steps.date}</p>
      <div className="grid grid-cols-1 gap-2">
        {slots.map((slot) => (
          <button
            key={slot.date}
            onClick={() => { updateFormData({ date: slot.date, timeSlot: '' }); onNext() }}
            className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
              formData.date === slot.date ? 'border-navy-800 bg-navy-50' : 'border-slate-200 hover:border-navy-300'
            }`}
          >
            <div className="w-9 h-9 rounded-lg bg-navy-100 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-navy-700" />
            </div>
            <div>
              <div className="text-slate-800 text-sm font-semibold">{slot.date}</div>
              <div className="text-slate-500 text-xs">{slot.times.length} slots available</div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 ml-auto" />
          </button>
        ))}
      </div>
    </div>
  )
}

function Step5({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const { formData, updateFormData } = useAppointment()
  const { t } = useLanguage()
  const selectedDoc = doctors.find((d) => d.id === formData.doctorId)
  const slotData = selectedDoc?.slots.find((s) => s.date === formData.date)
  const times = slotData?.times || []

  return (
    <div className="space-y-4">
      <p className="text-slate-500 text-sm">{t.appointment.steps.slot}</p>
      <div className="grid grid-cols-3 gap-2">
        {times.map((time) => (
          <button
            key={time}
            onClick={() => { updateFormData({ timeSlot: time }); onNext() }}
            className={`flex items-center justify-center gap-1.5 p-3 rounded-xl border text-sm font-medium transition-all ${
              formData.timeSlot === time
                ? 'border-navy-800 bg-navy-800 text-white'
                : 'border-slate-200 text-slate-700 hover:border-navy-300'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            {time}
          </button>
        ))}
      </div>
    </div>
  )
}

function Step6({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const { formData, updateFormData } = useAppointment()
  const { t } = useLanguage()
  const pd = t.appointment.patientDetails

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.patientName && formData.mobile) onNext()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <p className="text-slate-500 text-sm">{t.appointment.steps.details}</p>
      <div className="grid grid-cols-1 gap-3">
        <input
          type="text"
          placeholder={pd.name}
          value={formData.patientName}
          onChange={(e) => updateFormData({ patientName: e.target.value })}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-navy-800/20 focus:border-navy-800 placeholder:text-slate-400"
          required
        />
        <div className="grid grid-cols-2 gap-3">
          <input
            type="tel"
            placeholder={pd.mobile}
            value={formData.mobile}
            onChange={(e) => updateFormData({ mobile: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-navy-800/20 focus:border-navy-800 placeholder:text-slate-400"
            required
          />
          <input
            type="number"
            placeholder={pd.age}
            value={formData.age}
            onChange={(e) => updateFormData({ age: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-navy-800/20 focus:border-navy-800 placeholder:text-slate-400"
          />
        </div>
        <input
          type="email"
          placeholder={pd.email}
          value={formData.email}
          onChange={(e) => updateFormData({ email: e.target.value })}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-navy-800/20 focus:border-navy-800 placeholder:text-slate-400"
        />
        <div>
          <label className="block text-xs text-slate-500 mb-1.5">{pd.preferredLanguage}</label>
          <div className="grid grid-cols-3 gap-2">
            {(['en', 'mr', 'hi'] as Language[]).map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => updateFormData({ preferredLanguage: lang })}
                className={`py-2.5 rounded-xl text-xs font-medium border transition-all ${
                  formData.preferredLanguage === lang
                    ? 'border-navy-800 bg-navy-800 text-white'
                    : 'border-slate-200 text-slate-600 hover:border-navy-300'
                }`}
              >
                {lang === 'en' ? 'English' : lang === 'mr' ? 'मराठी' : 'हिंदी'}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-xs text-slate-500 mb-1.5">{pd.doctorGender}</label>
          <div className="grid grid-cols-3 gap-2">
            {(['male', 'female', 'no-preference'] as const).map((pref) => (
              <button
                key={pref}
                type="button"
                onClick={() => updateFormData({ doctorGenderPreference: pref })}
                className={`py-2.5 rounded-xl text-xs font-medium border transition-all ${
                  formData.doctorGenderPreference === pref
                    ? 'border-navy-800 bg-navy-50 text-navy-800'
                    : 'border-slate-200 text-slate-600 hover:border-navy-300'
                }`}
              >
                {pref === 'male' ? pd.genderOptions.male : pref === 'female' ? pd.genderOptions.female : pd.genderOptions.noPreference}
              </button>
            ))}
          </div>
        </div>
        <textarea
          placeholder={pd.notes}
          value={formData.notes}
          onChange={(e) => updateFormData({ notes: e.target.value })}
          rows={2}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-navy-800/20 focus:border-navy-800 placeholder:text-slate-400 resize-none"
        />
      </div>
      <button
        type="submit"
        className="w-full py-3.5 bg-navy-800 text-white rounded-xl font-semibold text-sm hover:bg-navy-700 transition-colors"
      >
        {t.appointment.confirm}
      </button>
    </form>
  )
}

function Step7() {
  const { formData, closeAppointment, resetForm } = useAppointment()
  const { t } = useLanguage()
  const conf = t.appointment.confirmation
  const selectedDoc = doctors.find((d) => d.id === formData.doctorId)
  const selectedSpec = specialities.find((s) => s.id === formData.specialityId)

  return (
    <div className="text-center space-y-5">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center mx-auto"
      >
        <Check className="w-8 h-8 text-white" strokeWidth={2.5} />
      </motion.div>
      <div>
        <h3 className="text-navy-800 text-xl font-serif font-semibold">{conf.title}</h3>
        <p className="text-slate-500 text-sm mt-1">{conf.note}</p>
      </div>
      <div className="bg-navy-50 rounded-2xl p-4 text-left space-y-3">
        {selectedDoc && (
          <div className="flex items-center gap-3">
            <User className="w-4 h-4 text-navy-600" />
            <div>
              <div className="text-xs text-slate-500">Doctor</div>
              <div className="text-slate-800 text-sm font-medium">{selectedDoc.name}</div>
            </div>
          </div>
        )}
        {selectedSpec && (
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 flex items-center justify-center">
              <span className="text-xs">🏥</span>
            </div>
            <div>
              <div className="text-xs text-slate-500">Department</div>
              <div className="text-slate-800 text-sm font-medium">{selectedSpec.name}</div>
            </div>
          </div>
        )}
        {formData.date && (
          <div className="flex items-center gap-3">
            <Calendar className="w-4 h-4 text-navy-600" />
            <div>
              <div className="text-xs text-slate-500">Date & Time</div>
              <div className="text-slate-800 text-sm font-medium">{formData.date}, {formData.timeSlot}</div>
            </div>
          </div>
        )}
        <div className="flex items-center gap-3">
          <MapPin className="w-4 h-4 text-navy-600" />
          <div>
            <div className="text-xs text-slate-500">Hospital</div>
            <div className="text-slate-800 text-sm font-medium">AarogyaOne Hospitals, Pune</div>
          </div>
        </div>
      </div>
      <div className="text-left">
        <h4 className="text-slate-800 text-sm font-semibold mb-2">{conf.whatToBring}</h4>
        <ul className="space-y-1.5">
          {conf.bringItems.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-slate-600 text-sm">
              <Check className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
              {item}
            </li>
          ))}
        </ul>
      </div>
      <button
        onClick={() => { resetForm(); closeAppointment() }}
        className="w-full py-3 bg-navy-800 text-white rounded-xl font-semibold text-sm hover:bg-navy-700 transition-colors"
      >
        Done
      </button>
    </div>
  )
}

export function AppointmentModal() {
  const { isOpen, closeAppointment, step, setStep, formData } = useAppointment()
  const { t } = useLanguage()

  const handleNext = () => setStep(Math.min(step + 1, TOTAL_STEPS))
  const handleBack = () => setStep(Math.max(step - 1, 1))

  const stepTitles = Object.values(t.appointment.steps)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="appt-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-navy-950/50 backdrop-blur-sm"
            onClick={closeAppointment}
            aria-hidden="true"
          />
          <motion.div
            key="appt-modal"
            initial={{ opacity: 0, y: 60, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ type: 'spring', damping: 30, stiffness: 400 }}
            className="fixed inset-x-0 bottom-0 sm:inset-auto sm:left-1/2 sm:-translate-x-1/2 sm:bottom-6 sm:w-full sm:max-w-md z-[70] bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Appointment booking"
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between flex-shrink-0">
              <div>
                <h2 className="text-navy-800 font-semibold text-base">{t.appointment.heading}</h2>
                <div className="flex items-center gap-3 mt-1.5">
                  <StepIndicator current={step} total={TOTAL_STEPS} />
                  <span className="text-slate-400 text-xs">{stepTitles[step - 1]}</span>
                </div>
              </div>
              <button
                onClick={closeAppointment}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-5 py-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {step === 1 && <Step1 onNext={handleNext} />}
                  {step === 2 && <Step2 onNext={handleNext} onBack={handleBack} />}
                  {step === 3 && <Step3 onNext={handleNext} onBack={handleBack} />}
                  {step === 4 && <Step4 onNext={handleNext} onBack={handleBack} />}
                  {step === 5 && <Step5 onNext={handleNext} onBack={handleBack} />}
                  {step === 6 && <Step6 onNext={handleNext} onBack={handleBack} />}
                  {step === 7 && <Step7 />}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Back button for steps 2-6 */}
            {step > 1 && step < 7 && (
              <div className="px-5 pb-4 flex-shrink-0">
                <button
                  onClick={handleBack}
                  className="text-slate-500 text-sm hover:text-navy-800 transition-colors"
                >
                  ← {t.appointment.back}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
