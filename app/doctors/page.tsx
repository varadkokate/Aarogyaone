'use client'
import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Star, Clock, Video, MapPin, X } from 'lucide-react'
import Link from 'next/link'
import { doctors } from '@/data/doctors'
import { specialities } from '@/data/specialities'
import { useLanguage } from '@/context/LanguageContext'
import { useAppointment } from '@/context/AppointmentContext'
import { ScrollReveal } from '@/components/shared/ScrollReveal'

const experienceOptions = [
  { label: 'Any experience', value: '' },
  { label: '5+ years', value: '5' },
  { label: '10+ years', value: '10' },
  { label: '15+ years', value: '15' },
  { label: '20+ years', value: '20' },
]

const languageOptions = ['Any language', 'English', 'Marathi', 'Hindi', 'Gujarati', 'Tamil', 'Kannada', 'Malayalam']
const consultOptions = ['Any type', 'In-person', 'Video']
const genderOptions = ['Any', 'Male', 'Female']

export default function DoctorsPage() {
  const { t } = useLanguage()
  const { openAppointment } = useAppointment()
  const [query, setQuery] = useState('')
  const [specialityFilter, setSpecialityFilter] = useState('')
  const [expFilter, setExpFilter] = useState('')
  const [langFilter, setLangFilter] = useState('')
  const [consultFilter, setConsultFilter] = useState('')
  const [genderFilter, setGenderFilter] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  const filtered = useMemo(() => {
    return doctors.filter((doc) => {
      const q = query.toLowerCase()
      const matchesQuery = !q ||
        doc.name.toLowerCase().includes(q) ||
        doc.speciality.includes(q) ||
        doc.department.toLowerCase().includes(q) ||
        doc.expertise.some(e => e.toLowerCase().includes(q))
      const matchesSpec = !specialityFilter || doc.speciality === specialityFilter
      const matchesExp = !expFilter || doc.experience >= parseInt(expFilter)
      const matchesLang = !langFilter || langFilter === 'Any language' || doc.languages.includes(langFilter)
      const matchesConsult = !consultFilter || consultFilter === 'Any type' ||
        (consultFilter === 'Video' ? doc.consultationTypes.includes('video') : doc.consultationTypes.includes('in-person'))
      const matchesGender = !genderFilter || genderFilter === 'Any' || doc.gender === genderFilter.toLowerCase()
      return matchesQuery && matchesSpec && matchesExp && matchesLang && matchesConsult && matchesGender
    })
  }, [query, specialityFilter, expFilter, langFilter, consultFilter, genderFilter])

  const hasFilters = specialityFilter || expFilter || (langFilter && langFilter !== 'Any language') || (consultFilter && consultFilter !== 'Any type') || (genderFilter && genderFilter !== 'Any')

  const clearFilters = () => {
    setSpecialityFilter('')
    setExpFilter('')
    setLangFilter('')
    setConsultFilter('')
    setGenderFilter('')
  }

  return (
    <div className="min-h-screen bg-cream-100">
      {/* Header */}
      <div className="bg-navy-800 pt-28 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-display-sm text-white mb-2">{t.doctors.heading}</h1>
          <p className="text-slate-300 mb-7">Meet our team of experienced specialists.</p>

          {/* Search */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="search"
              placeholder={t.doctors.searchPlaceholder}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/10 border border-white/20 text-white text-base focus:outline-none focus:ring-2 focus:ring-teal-400/50 focus:bg-white/15 placeholder:text-slate-400 transition-all"
              aria-label="Search doctors"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter bar */}
        <div className="flex items-center gap-3 mb-6 flex-wrap">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${
              showFilters || hasFilters
                ? 'bg-navy-800 text-white border-navy-800'
                : 'bg-white border-slate-200 text-slate-600 hover:border-navy-300'
            }`}
          >
            <Filter className="w-4 h-4" />
            Filters
            {hasFilters && <span className="w-2 h-2 rounded-full bg-teal-400" />}
          </button>

          {/* Quick speciality filters */}
          {specialities.map((spec) => (
            <button
              key={spec.id}
              onClick={() => setSpecialityFilter(specialityFilter === spec.id ? '' : spec.id)}
              className={`px-3 py-2 rounded-xl text-xs font-medium border transition-colors ${
                specialityFilter === spec.id
                  ? 'bg-navy-800 text-white border-navy-800'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-navy-300'
              }`}
            >
              {spec.name}
            </button>
          ))}

          {hasFilters && (
            <button onClick={clearFilters} className="flex items-center gap-1 text-slate-500 text-xs hover:text-navy-800 transition-colors">
              <X className="w-3.5 h-3.5" /> Clear all
            </button>
          )}
        </div>

        {/* Advanced filters */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white rounded-2xl border border-slate-200 p-5 mb-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1.5">Experience</label>
              <select
                value={expFilter}
                onChange={(e) => setExpFilter(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-navy-800/20"
              >
                {experienceOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1.5">Language</label>
              <select
                value={langFilter}
                onChange={(e) => setLangFilter(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-navy-800/20"
              >
                {languageOptions.map(opt => <option key={opt}>{opt}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1.5">Consultation Type</label>
              <select
                value={consultFilter}
                onChange={(e) => setConsultFilter(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-navy-800/20"
              >
                {consultOptions.map(opt => <option key={opt}>{opt}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1.5">Doctor Gender</label>
              <select
                value={genderFilter}
                onChange={(e) => setGenderFilter(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-navy-800/20"
              >
                {genderOptions.map(opt => <option key={opt}>{opt}</option>)}
              </select>
            </div>
          </motion.div>
        )}

        {/* Results count */}
        <div className="text-slate-500 text-sm mb-5">
          Showing <strong className="text-slate-800">{filtered.length}</strong> doctors
          {query && <span> matching &ldquo;{query}&rdquo;</span>}
        </div>

        {/* Doctor grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-4xl mb-3">🔍</div>
            <h3 className="text-slate-700 font-semibold mb-1">No doctors found</h3>
            <p className="text-slate-400 text-sm">Try adjusting your search or filters</p>
            <button onClick={clearFilters} className="mt-4 text-navy-800 text-sm font-medium hover:underline">Clear all filters</button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((doc, i) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.06, 0.3) }}
                className="bg-white border border-slate-200 rounded-3xl p-5 hover:shadow-card-hover hover:border-navy-200 transition-all duration-300 group"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-navy-100 to-navy-200 flex-shrink-0 flex items-center justify-center text-navy-700 font-semibold text-lg">
                    {doc.name.split(' ')[1]?.[0]}{doc.name.split(' ')[2]?.[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-slate-800 font-semibold text-sm leading-tight">{doc.name}</h2>
                    <p className="text-slate-500 text-xs mt-0.5">{doc.designation}</p>
                    <div className="flex items-center gap-1 mt-1.5">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <span className="text-slate-700 text-xs font-medium">{doc.rating}</span>
                      <span className="text-slate-400 text-xs">• {doc.experience} yrs exp.</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-3">
                  {doc.languages.slice(0, 3).map((lang) => (
                    <span key={lang} className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full text-[10px] font-medium">{lang}</span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-1.5 mb-3">
                  {doc.consultationTypes.map((type) => (
                    <span key={type} className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${
                      type === 'video' ? 'bg-teal-50 text-teal-700' : 'bg-navy-50 text-navy-700'
                    }`}>
                      {type === 'video' ? <Video className="w-2.5 h-2.5" /> : <MapPin className="w-2.5 h-2.5" />}
                      {type === 'video' ? 'Video' : 'In-person'}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-1.5 mb-4 bg-teal-50 rounded-xl px-3 py-2">
                  <Clock className="w-3.5 h-3.5 text-teal-600" />
                  <span className="text-teal-700 text-xs font-medium">Next: {doc.nextAvailable}</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href={`/doctors/${doc.id}`}
                    className="py-2.5 border border-slate-200 text-slate-700 rounded-xl text-xs font-semibold text-center hover:border-navy-300 hover:bg-navy-50 transition-colors"
                  >
                    View Profile
                  </Link>
                  <button
                    onClick={() => openAppointment(doc.speciality, doc.id)}
                    className="py-2.5 bg-navy-800 text-white rounded-xl text-xs font-semibold hover:bg-navy-700 group-hover:bg-teal-600 transition-colors"
                  >
                    Book Appointment
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
