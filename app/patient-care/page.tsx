'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { visitTimeline } from '@/data/visitTimeline'
import { faqs, faqCategories } from '@/data/faqs'
import { useLanguage } from '@/context/LanguageContext'
import { useAppointment } from '@/context/AppointmentContext'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { AskBeforeVisit } from '@/components/home/AskBeforeVisit'
import { Calendar, MapPin, ClipboardList, Stethoscope, TestTube, Syringe, Pill, RefreshCcw, ChevronDown, ArrowRight, Check } from 'lucide-react'

const iconMap: Record<string, React.ElementType> = {
  Calendar, MapPin, ClipboardList, Stethoscope, TestTube, Syringe, Pill, RefreshCcw,
}

const beforeVisitInfo = [
  {
    title: 'What to bring',
    titleHi: 'क्या लाएं',
    titleMr: 'काय आणायचे',
    items: [
      'Valid photo ID (Aadhaar, PAN, Passport, Voter ID)',
      'Appointment confirmation SMS or booking number',
      'All previous medical records, test reports, prescriptions',
      'Insurance card / TPA letter / Ayushman Bharat card (if applicable)',
      'List of current medications and known allergies',
    ],
    itemsHi: [
      'वैध फोटो आईडी (आधार, पैन, पासपोर्ट, वोटर आईडी)',
      'अपॉइंटमेंट पुष्टि SMS या बुकिंग नंबर',
      'सभी पुराने मेडिकल रिकॉर्ड, टेस्ट रिपोर्ट, नुस्खे',
      'बीमा कार्ड / TPA पत्र (यदि लागू हो)',
      'वर्तमान दवाओं और एलर्जी की सूची',
    ],
    itemsMr: [
      'वैध फोटो ओळखपत्र (आधार, पॅन, पासपोर्ट, मतदार ओळखपत्र)',
      'भेट पुष्टी SMS किंवा बुकिंग क्रमांक',
      'सर्व मागील वैद्यकीय नोंदी, चाचणी अहवाल, प्रिस्क्रिप्शन',
      'विमा कार्ड / TPA पत्र (लागू असल्यास)',
      'सध्याच्या औषधांची आणि अॅलर्जींची यादी',
    ],
    icon: '📋',
  },
  {
    title: 'Getting here',
    titleHi: 'यहाँ कैसे पहुँचें',
    titleMr: 'इथे कसे पोहोचायचे',
    items: [
      'Main entrance on Senapati Bapat Road (Gate 1)',
      'Emergency entrance on the right side of the building (Gate 3)',
      'Nearest metro: Shivajinagar Metro Station (10 min walk)',
      'PMPML bus stops within 200m of hospital entrance',
      'Free patient pickup from Pune Railway Station on request',
    ],
    icon: '🗺️',
  },
  {
    title: 'Parking',
    titleHi: 'पार्किंग',
    titleMr: 'पार्किंग',
    items: [
      'Multi-level car park at Gate 2 (250+ vehicle capacity)',
      'Ground floor parking for patients with mobility challenges',
      'Two-wheeler parking near Gate 1',
      'Valet parking available 8 AM – 8 PM at main entrance',
      'Parking charges apply. Prepaid parking available.',
    ],
    icon: '🅿️',
  },
]

const admissionInfo = [
  {
    step: '01',
    title: 'Admission Advice',
    desc: 'Your treating doctor will provide an Admission Advice note with relevant clinical details.',
  },
  {
    step: '02',
    title: 'Admissions Desk',
    desc: 'Visit the Admissions Desk on the Ground Floor with your Admission Advice, ID proof, and insurance details.',
  },
  {
    step: '03',
    title: 'Room Allocation',
    desc: 'Choose from private, semi-private, or general ward rooms. Room availability and charges will be explained clearly.',
  },
  {
    step: '04',
    title: 'Consent & Forms',
    desc: 'Complete the admission form and sign consent documents. An attendant is permitted to stay with you.',
  },
  {
    step: '05',
    title: 'Ward Orientation',
    desc: 'A nurse will orient you to your ward, call system, meal timings, visiting hours, and patient support services.',
  },
]

export default function PatientCarePage() {
  const [activeSection, setActiveSection] = useState<string>('before')
  const { t, language } = useLanguage()
  const { openAppointment } = useAppointment()
  const [activeTimelineStep, setActiveTimelineStep] = useState<string | null>(null)

  const sections = [
    { id: 'before', label: 'Before Your Visit' },
    { id: 'admission', label: 'Admission' },
    { id: 'during', label: 'During Treatment' },
    { id: 'after', label: 'After Treatment' },
  ]

  const duringInfo = [
    { title: 'Patient Support', desc: 'Our patient relations team is available on each floor to help you and your family navigate your treatment, answer questions, and provide emotional support.' },
    { title: 'Diagnostics', desc: 'All investigations prescribed during your admission are coordinated by the ward team. Laboratory and radiology services are available in-hospital, 24×7 for urgent tests.' },
    { title: 'Pharmacy', desc: 'Medicines prescribed during admission are dispensed through the ward pharmacy. Insurance-covered medicines are processed directly if pre-authorisation is in place.' },
    { title: 'Insurance & TPA', desc: 'Our dedicated insurance desk handles cashless and reimbursement claims. Please inform us of your insurance at the time of admission to initiate the pre-authorisation process.' },
    { title: 'Billing Transparency', desc: 'Regular billing updates are provided during long admissions. You have the right to request an itemised bill at any time. All charges are explained in advance for planned procedures.' },
  ]

  const afterInfo = [
    { title: 'Discharge Process', desc: 'Discharge is typically completed in the morning. You will receive a Discharge Summary with your diagnosis, treatment details, discharge medications, and follow-up instructions.' },
    { title: 'Prescriptions', desc: 'All discharge medications can be collected from the Ground Floor pharmacy before leaving. Ensure you understand the dosage and timing of each medicine.' },
    { title: 'Follow-up Appointments', desc: 'Your follow-up date will be mentioned in your Discharge Summary. Please do not skip your follow-up — it is an essential part of your recovery.' },
    { title: 'Reports & Records', desc: 'Your test reports and medical records can be collected from the Medical Records department within 48 hours of discharge. Digital copies can be requested by email.' },
  ]

  return (
    <div className="min-h-screen bg-cream-100">
      <div className="bg-navy-800 pt-28 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-display-sm text-white mb-2">Patient Services</h1>
          <p className="text-slate-300 max-w-lg">Everything you need to know about your visit, admission, treatment, and recovery.</p>
        </div>
      </div>

      {/* Section tabs */}
      <div className="sticky top-16 z-30 bg-white border-b border-slate-200 shadow-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto scrollbar-hide py-1">
            {sections.map(sec => (
              <button
                key={sec.id}
                onClick={() => setActiveSection(sec.id)}
                className={`flex-shrink-0 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeSection === sec.id
                    ? 'border-navy-800 text-navy-800'
                    : 'border-transparent text-slate-500 hover:text-navy-700'
                }`}
              >
                {sec.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Before your visit */}
        <section id="before">
          <ScrollReveal className="mb-8">
            <span className="text-teal-600 text-sm font-medium uppercase tracking-wide">Preparing for your visit</span>
            <h2 className="font-serif text-display-sm text-navy-800 mt-2">Before Your Visit</h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-3 gap-5">
            {beforeVisitInfo.map((info, i) => (
              <ScrollReveal key={info.title} delay={i * 0.1}>
                <div className="bg-white rounded-3xl border border-slate-200 p-6 h-full">
                  <div className="text-3xl mb-4">{info.icon}</div>
                  <h3 className="font-serif text-navy-800 text-xl mb-4">
                    {language === 'hi' ? (info.titleHi || info.title) : language === 'mr' ? (info.titleMr || info.title) : info.title}
                  </h3>
                  <ul className="space-y-2.5">
                    {((language === 'hi' && info.itemsHi) ? info.itemsHi : (language === 'mr' && info.itemsMr) ? info.itemsMr : info.items).map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-slate-600 text-sm">
                        <Check className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.2} className="mt-5">
            <div className="bg-navy-50 rounded-3xl p-6 border border-navy-100 flex items-center justify-between">
              <div>
                <h3 className="text-navy-800 font-semibold">Ready to book your appointment?</h3>
                <p className="text-slate-500 text-sm mt-1">Pre-book your appointment to avoid waiting at the OPD.</p>
              </div>
              <button
                onClick={() => openAppointment()}
                className="flex-shrink-0 px-5 py-2.5 bg-navy-800 text-white rounded-xl font-semibold text-sm hover:bg-navy-700 transition-colors"
              >
                Book Appointment
              </button>
            </div>
          </ScrollReveal>
        </section>

        {/* Admission */}
        <section id="admission">
          <ScrollReveal className="mb-8">
            <span className="text-teal-600 text-sm font-medium uppercase tracking-wide">For admitted patients</span>
            <h2 className="font-serif text-display-sm text-navy-800 mt-2">Admission Process</h2>
          </ScrollReveal>
          <div className="space-y-4">
            {admissionInfo.map((item, i) => (
              <ScrollReveal key={item.step} delay={i * 0.08}>
                <div className="flex items-start gap-5 bg-white rounded-2xl border border-slate-200 p-5">
                  <div className="w-10 h-10 rounded-xl bg-navy-800 text-white font-bold text-sm flex items-center justify-center flex-shrink-0">{item.step}</div>
                  <div>
                    <h3 className="text-slate-800 font-semibold">{item.title}</h3>
                    <p className="text-slate-600 text-sm mt-1">{item.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* During treatment */}
        <section id="during">
          <ScrollReveal className="mb-8">
            <span className="text-teal-600 text-sm font-medium uppercase tracking-wide">During your stay</span>
            <h2 className="font-serif text-display-sm text-navy-800 mt-2">During Treatment</h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {duringInfo.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.07}>
                <div className="bg-white rounded-2xl border border-slate-200 p-5 h-full">
                  <h3 className="text-navy-800 font-semibold mb-2">{item.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* After treatment */}
        <section id="after">
          <ScrollReveal className="mb-8">
            <span className="text-teal-600 text-sm font-medium uppercase tracking-wide">Going home</span>
            <h2 className="font-serif text-display-sm text-navy-800 mt-2">After Treatment</h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-4">
            {afterInfo.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.08}>
                <div className="bg-white rounded-2xl border border-slate-200 p-5">
                  <h3 className="text-navy-800 font-semibold mb-2">{item.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Visit timeline */}
        <section>
          <ScrollReveal className="mb-8">
            <span className="text-teal-600 text-sm font-medium uppercase tracking-wide">Step by step</span>
            <h2 className="font-serif text-display-sm text-navy-800 mt-2">{t.timeline.heading}</h2>
          </ScrollReveal>
          <div className="space-y-3">
            {visitTimeline.map((step, i) => {
              const Icon = iconMap[step.icon]
              const isActive = activeTimelineStep === step.id
              return (
                <ScrollReveal key={step.id} delay={i * 0.04}>
                  <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                    <button
                      onClick={() => setActiveTimelineStep(isActive ? null : step.id)}
                      className={`w-full flex items-center gap-4 p-5 text-left transition-colors ${
                        isActive ? 'bg-navy-800' : 'hover:bg-slate-50'
                      }`}
                      aria-expanded={isActive}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        isActive ? 'bg-white/20' : 'bg-navy-100'
                      }`}>
                        <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-navy-700'}`} />
                      </div>
                      <div className="flex-1">
                        <div className={`text-[10px] font-medium ${isActive ? 'text-white/60' : 'text-slate-400'}`}>{step.number}</div>
                        <div className={`font-semibold ${isActive ? 'text-white' : 'text-slate-800'}`}>
                          {language === 'hi' ? (step.titleHi || step.title) : language === 'mr' ? (step.titleMr || step.title) : step.title}
                        </div>
                      </div>
                      <ChevronDown className={`w-5 h-5 flex-shrink-0 transition-transform ${
                        isActive ? 'rotate-180 text-white' : 'text-slate-400'
                      }`} />
                    </button>
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: 'auto' }}
                          exit={{ height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="p-5 bg-navy-50 grid sm:grid-cols-2 gap-4">
                            <div>
                              <p className="text-slate-600 text-sm leading-relaxed">{step.whatHappens}</p>
                              <div className="mt-3">
                                <div className="text-slate-700 text-xs font-semibold mb-1">Where to go:</div>
                                <p className="text-navy-700 text-sm">{step.whereTo}</p>
                              </div>
                            </div>
                            <div>
                              {step.whatToBring.length > 0 && (
                                <div className="mb-3">
                                  <div className="text-slate-700 text-xs font-semibold mb-1.5">What to bring:</div>
                                  {step.whatToBring.map((item, j) => (
                                    <div key={j} className="flex items-start gap-2 text-slate-600 text-sm mb-1">
                                      <Check className="w-3.5 h-3.5 text-teal-500 flex-shrink-0 mt-0.5" />
                                      {item}
                                    </div>
                                  ))}
                                </div>
                              )}
                              <div className="bg-white rounded-xl p-3 text-slate-500 text-xs">
                                💡 {step.helpfulInfo}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </section>

        {/* Ask before you visit */}
        <section id="faq">
          <AskBeforeVisit />
        </section>
      </div>
    </div>
  )
}
