import type { VisitTimelineStep } from '@/types'

export const visitTimeline: VisitTimelineStep[] = [
  {
    id: 'appointment',
    number: '01',
    title: 'Book Appointment',
    titleHi: 'अपॉइंटमेंट बुक करें',
    titleMr: 'भेट बुक करा',
    description: 'Start your care journey with a confirmed appointment.',
    whatHappens:
      'Select your speciality or doctor, choose a date and time that works for you, and confirm your appointment online or by phone. You will receive an SMS confirmation with your appointment details.',
    whatToBring: ['Valid photo ID', 'Previous medical records (if any)', 'Insurance card (if applicable)'],
    whereTo: 'Book online, by phone at +91 20 6800 1000, or at the OPD counter on arrival.',
    helpfulInfo:
      'Booking in advance significantly reduces your waiting time. Video consultation is available if you prefer not to travel.',
    icon: 'Calendar',
  },
  {
    id: 'arrival',
    number: '02',
    title: 'Reach the Hospital',
    titleHi: 'अस्पताल पहुँचें',
    titleMr: 'रुग्णालयात पोहोचा',
    description: 'Getting to AarogyaOne is straightforward and well-connected.',
    whatHappens:
      'AarogyaOne Hospitals is located at 14, Senapati Bapat Road, Pune. Free patient pickup from Pune Railway Station is available on request. Metro and PMPML bus connectivity available.',
    whatToBring: ['Appointment confirmation SMS', 'Documents listed above'],
    whereTo: 'Main entrance on Senapati Bapat Road. Emergency entrance is on the right side of the building (Gate 3).',
    helpfulInfo:
      'Valet parking is available at the main entrance (Gate 1) between 8 AM and 8 PM. Two-wheeler parking is near Gate 1. Multi-level car park available at Gate 2.',
    icon: 'MapPin',
  },
  {
    id: 'registration',
    number: '03',
    title: 'Registration',
    titleHi: 'पंजीकरण',
    titleMr: 'नोंदणी',
    description: 'A quick, guided process to get you ready for your consultation.',
    whatHappens:
      'Visit the Registration Counter on the Ground Floor. Present your ID and appointment confirmation. The registration process takes approximately 5–10 minutes. You will receive a patient registration slip with your OPD number.',
    whatToBring: ['Photo ID', 'Appointment confirmation', 'Insurance card / TPA details', 'Previous hospital records'],
    whereTo: 'Ground Floor, Main Block — Registration Counters 1 to 8 (follow blue directional signs).',
    helpfulInfo:
      'Senior citizens and patients with mobility challenges have dedicated counters (Counters 1 & 2). Pre-registered patients (who booked online) can use the Fast Track counter.',
    icon: 'ClipboardList',
  },
  {
    id: 'consultation',
    number: '04',
    title: 'Consultation',
    titleHi: 'परामर्श',
    titleMr: 'सल्लामसलत',
    description: 'Your time with the doctor — the most important part of your visit.',
    whatHappens:
      'After registration, proceed to the relevant OPD department (First Floor, Block A). Wait in the department waiting area. When called, you will meet your doctor for a consultation. The doctor will take your history, examine you, and advise on investigations or treatment.',
    whatToBring: ['All previous reports and prescriptions', 'List of current medications', 'List of any allergies'],
    whereTo: 'First Floor, Block A — Department OPD Rooms (room number indicated on your registration slip).',
    helpfulInfo:
      'You may bring one attendant. Consultations are conducted in English, Marathi, or Hindi as per your preference.',
    icon: 'Stethoscope',
  },
  {
    id: 'tests',
    number: '05',
    title: 'Investigations & Tests',
    titleHi: 'जांच एवं परीक्षण',
    titleMr: 'तपासण्या आणि चाचण्या',
    description: 'Supporting your diagnosis with accurate diagnostic tests.',
    whatHappens:
      'If your doctor advises any tests (blood tests, X-ray, ECG, ultrasound, or other investigations), you will be given a test request form. Proceed to the respective department: Laboratory (Ground Floor), Radiology (Ground Floor, Block B).',
    whatToBring: ['Test request form from your doctor', 'Registration slip'],
    whereTo:
      'Laboratory: Ground Floor, Block A. Radiology: Ground Floor, Block B. ECG: Cardiology OPD, First Floor.',
    helpfulInfo:
      'Report collection times vary by test. Most blood test reports are available within 4–6 hours. You will receive an SMS when your report is ready.',
    icon: 'TestTube',
  },
  {
    id: 'treatment',
    number: '06',
    title: 'Treatment',
    titleHi: 'उपचार',
    titleMr: 'उपचार',
    description: 'From minor procedures to planned surgery — care designed around you.',
    whatHappens:
      'Depending on your diagnosis, treatment may be outpatient (same-day), or may require admission. For surgeries or procedures, you will be given detailed pre-procedure instructions. A consent form will be signed before any procedure.',
    whatToBring: ['Pre-admission documents (for planned admission)', 'Insurance pre-authorisation letter (if applicable)'],
    whereTo:
      'Procedure rooms, OT (Operation Theatre), or designated treatment areas as advised by your doctor.',
    helpfulInfo:
      'All treatment plans are discussed with you in detail before proceeding. Your consent is essential. You have the right to ask any questions about your treatment.',
    icon: 'Syringe',
  },
  {
    id: 'pharmacy',
    number: '07',
    title: 'Pharmacy & Discharge',
    titleHi: 'फार्मेसी और छुट्टी',
    titleMr: 'फार्मसी आणि सुटी',
    description: 'Collecting your medicines and everything you need for recovery.',
    whatHappens:
      'After your consultation, take your prescription to the Ground Floor pharmacy. For admitted patients, discharge is typically completed in the morning. You will receive a discharge summary, follow-up date, and prescription.',
    whatToBring: ['Doctor\'s prescription', 'Insurance card (for insurance-covered medicines)'],
    whereTo: 'Ground Floor Pharmacy (near main reception, open 24×7) or First Floor OPD Pharmacy.',
    helpfulInfo:
      'Keep your discharge summary and all prescriptions safe. These will be required for follow-up visits and insurance claims.',
    icon: 'Pill',
  },
  {
    id: 'followup',
    number: '08',
    title: 'Follow-up Care',
    titleHi: 'फॉलो-अप देखभाल',
    titleMr: 'पुढील भेट',
    description: 'Your recovery is our continued responsibility.',
    whatHappens:
      'Your follow-up appointment will be scheduled before you leave. You can also reschedule through the website or by phone. Bring all medicines, reports, and your discharge summary to your follow-up visit.',
    whatToBring: ['Discharge summary', 'All test reports', 'Current medicines'],
    whereTo: 'Same OPD department as your treating doctor, First Floor.',
    helpfulInfo:
      'Do not miss your follow-up appointment. If you have any concerns between appointments, call the hospital helpline at +91 20 6800 1000.',
    icon: 'RefreshCcw',
  },
]
