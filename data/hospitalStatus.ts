import type { HospitalStatus } from '@/types'

export const hospitalStatus: HospitalStatus[] = [
  { department: 'Emergency Department', status: 'open', details: 'Open 24×7 — All bays operational', waitTime: '~10 min' },
  { department: 'OPD', status: 'open', details: 'Open — All departments seeing patients', waitTime: '~20 min' },
  { department: 'Pharmacy', status: 'open', details: 'Open — All medications available' },
  { department: 'Laboratory', status: 'open', details: 'Open — All tests available', waitTime: '~30 min for reports' },
  { department: 'Radiology', status: 'open', details: 'Available — MRI, CT, X-Ray, Ultrasound', waitTime: '~45 min' },
  { department: 'Parking', status: 'limited', details: 'Moderate — Ground floor limited, Level 2 available' },
  { department: 'Blood Bank', status: 'open', details: 'Open — All blood groups available' },
  { department: 'ICU', status: 'limited', details: 'Limited beds — Please contact admissions' },
]

export const lastUpdated = new Date().toLocaleTimeString('en-IN', {
  hour: '2-digit',
  minute: '2-digit',
  hour12: true,
})
