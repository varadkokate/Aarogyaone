export type Language = 'en' | 'mr' | 'hi'

export interface Doctor {
  id: string
  name: string
  nameHi?: string
  nameMr?: string
  designation: string
  department: string
  speciality: string
  qualifications: string[]
  experience: number
  languages: string[]
  consultationTypes: ('in-person' | 'video')[]
  nextAvailable: string
  about: string
  expertise: string[]
  education: { degree: string; institution: string; year: string }[]
  treatments: string[]
  slots: { date: string; times: string[] }[]
  gender: 'male' | 'female'
  imageUrl: string
  rating: number
  patientsServed: number
}

export interface Speciality {
  id: string
  name: string
  nameHi?: string
  nameMr?: string
  icon: string
  description: string
  conditions: string[]
  treatments: string[]
  doctorIds: string[]
  facilities: string[]
  technology: string[]
  color: string
}

export interface Treatment {
  id: string
  name: string
  specialityId: string
  description: string
  duration: string
  recovery: string
  journey: TreatmentStep[]
  medicalTerms: MedicalTerm[]
  preparation: string[]
  whatToExpect: string[]
}

export interface TreatmentStep {
  id: string
  title: string
  description: string
  whatHappens: string
  whatToExpect: string
  preparation?: string
  duration?: string
}

export interface MedicalTerm {
  term: string
  simple: string
  detailed: string
}

export interface HospitalStatus {
  department: string
  status: 'open' | 'closed' | 'limited' | 'busy'
  details: string
  waitTime?: string
}

export interface FAQ {
  id: string
  question: string
  questionHi?: string
  questionMr?: string
  answer: string
  answerHi?: string
  answerMr?: string
  category: string
}

export interface VisitTimelineStep {
  id: string
  number: string
  title: string
  titleHi?: string
  titleMr?: string
  description: string
  whatHappens: string
  whatToBring: string[]
  whereTo: string
  helpfulInfo: string
  icon: string
}

export interface WayfinderLocation {
  id: string
  name: string
  nameHi?: string
  nameMr?: string
  building: string
  floor: string
  department: string
  room: string
  directions: string[]
  landmark: string
  icon: string
}

export interface AppointmentFormData {
  specialityId: string
  doctorId: string
  consultationType: 'in-person' | 'video' | ''
  date: string
  timeSlot: string
  patientName: string
  mobile: string
  email: string
  age: string
  preferredLanguage: Language | ''
  doctorGenderPreference: 'male' | 'female' | 'no-preference'
  notes: string
}
