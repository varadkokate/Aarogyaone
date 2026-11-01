import type { Treatment } from '@/types'

export const treatments: Treatment[] = [
  {
    id: 'angioplasty',
    name: 'Coronary Angioplasty & Stenting',
    specialityId: 'cardiology',
    description:
      'Coronary angioplasty is a minimally invasive procedure used to open blocked or narrowed coronary arteries to restore adequate blood flow to the heart muscle.',
    duration: '1–2 hours (procedure)',
    recovery: '1–2 days hospital stay, full recovery 1–2 weeks',
    preparation: [
      'You will be asked to fast for 6–8 hours before the procedure.',
      'Blood thinning medications may be prescribed a few days before.',
      'Inform your doctor of all current medications and any allergies.',
      'Arrange for someone to take you home after discharge.',
    ],
    whatToExpect: [
      'The procedure is performed under local anaesthesia. You will be awake but sedated.',
      'A thin tube (catheter) is inserted through a small incision, usually in the wrist or groin.',
      'A tiny balloon is inflated to open the blocked artery, and a stent is placed to keep it open.',
      'You may feel some pressure during the procedure but it should not be painful.',
    ],
    journey: [
      {
        id: 'angio-1',
        title: 'Consultation & Diagnosis',
        description: 'Initial assessment of your cardiac condition',
        whatHappens:
          'Your cardiologist reviews your symptoms, performs an ECG, blood tests, and may arrange an echocardiogram or stress test. The need for angioplasty is assessed based on these results.',
        whatToExpect: 'A thorough assessment may take 1–2 clinic visits. All findings will be explained clearly.',
        preparation: 'Bring all previous heart investigations and a list of current medications.',
        duration: '1–2 clinic visits',
      },
      {
        id: 'angio-2',
        title: 'Coronary Angiography',
        description: 'Imaging to see the blocked arteries',
        whatHappens:
          'A dye is injected into the coronary arteries through a catheter, and X-ray images are taken to identify the exact location and severity of blockages.',
        whatToExpect: 'Usually performed as a day procedure. You will be required to fast beforehand.',
        preparation: 'Fast for 6 hours before. Arrange transport home.',
        duration: '30–60 minutes',
      },
      {
        id: 'angio-3',
        title: 'Angioplasty & Stent Placement',
        description: 'Opening the blocked artery',
        whatHappens:
          'The blocked artery is opened using a balloon catheter. A metal mesh tube (stent) is placed to keep the artery open permanently.',
        whatToExpect: 'You will be awake but comfortable. Some pressure in the chest during balloon inflation is normal.',
        duration: '1–2 hours',
      },
      {
        id: 'angio-4',
        title: 'Recovery & Monitoring',
        description: 'Observation after the procedure',
        whatHappens:
          'You are moved to a recovery area or CICU for monitoring. Heart rhythm, blood pressure, and the puncture site are observed.',
        whatToExpect: 'Most patients feel much better immediately. You may need to remain lying flat for a few hours.',
        duration: '4–6 hours observation, 1–2 days hospital stay',
      },
      {
        id: 'angio-5',
        title: 'Discharge & Medication',
        description: 'Going home with your treatment plan',
        whatHappens:
          'You will be discharged with blood-thinning medications (antiplatelet therapy) and detailed instructions.',
        whatToExpect: 'You can typically resume light activities within a week.',
        duration: 'Discharge on Day 1–2',
      },
      {
        id: 'angio-6',
        title: 'Follow-up & Cardiac Rehabilitation',
        description: 'Monitoring your recovery',
        whatHappens:
          'Follow-up visits at 1 week, 1 month, and 6 months. Cardiac rehabilitation programme recommended.',
        whatToExpect: 'Long-term lifestyle modifications significantly reduce the risk of future heart events.',
        duration: 'Ongoing follow-up',
      },
    ],
    medicalTerms: [
      {
        term: 'Angioplasty',
        simple:
          'A procedure to open a blocked blood vessel using a small balloon, usually in the heart.',
        detailed:
          'Percutaneous transluminal coronary angioplasty (PTCA) involves inserting a catheter with a deflated balloon into the blocked coronary artery. The balloon is inflated at the blockage site to compress the plaque and widen the artery, restoring blood flow to the heart muscle.',
      },
      {
        term: 'Stent',
        simple: 'A tiny metal mesh tube placed inside a blood vessel to keep it open.',
        detailed:
          'A coronary stent is a small, expandable metal mesh tube that is permanently placed inside a coronary artery after angioplasty to prevent the artery from closing up again. Drug-eluting stents are coated with medication to reduce the risk of re-narrowing (restenosis).',
      },
      {
        term: 'Coronary Artery Disease',
        simple:
          'A condition where the arteries supplying blood to the heart become narrowed due to fatty deposits.',
        detailed:
          'Coronary artery disease (CAD) occurs when cholesterol and other substances (collectively called plaque) build up inside the coronary arteries, narrowing them and restricting blood flow to the heart muscle. This can cause chest pain (angina) or, if complete blockage occurs, a heart attack (myocardial infarction).',
      },
    ],
  },
  {
    id: 'knee-replacement',
    name: 'Total Knee Replacement',
    specialityId: 'orthopaedics',
    description:
      'Total knee replacement is a surgical procedure in which worn or damaged surfaces of the knee joint are replaced with artificial implants, eliminating pain and restoring mobility.',
    duration: '1.5–2 hours (surgery)',
    recovery: '3–5 days hospital stay, walking within 24 hours, full recovery 3–6 months',
    preparation: [
      'Pre-surgical assessment including blood tests, ECG, and anaesthesia evaluation.',
      'Stop blood-thinning medications as advised by your doctor.',
      'Physiotherapy exercises before surgery strengthen the muscles around the knee.',
      'Arrange for home care support during recovery.',
    ],
    whatToExpect: [
      'Surgery is performed under spinal or general anaesthesia.',
      'The damaged bone and cartilage are removed and replaced with metal and plastic implants.',
      'A pain management plan will be in place from the moment you wake up.',
      'Physiotherapy begins the day after surgery.',
    ],
    journey: [
      {
        id: 'kr-1',
        title: 'Consultation & Evaluation',
        description: 'Assessment of your knee condition',
        whatHappens:
          'X-rays and physical examination determine the severity of knee damage. Your suitability for surgery is assessed.',
        whatToExpect: 'The orthopaedic surgeon will explain all options, including non-surgical alternatives.',
        duration: '1–2 visits',
      },
      {
        id: 'kr-2',
        title: 'Pre-surgical Preparation',
        description: 'Getting ready for your surgery',
        whatHappens:
          'Blood tests, ECG, and anaesthesia review. Any medications that may affect surgery are adjusted.',
        whatToExpect: 'This may involve visits to the lab, cardiology, and the anaesthesia clinic.',
        duration: '1–2 weeks before surgery',
      },
      {
        id: 'kr-3',
        title: 'Surgery',
        description: 'The knee replacement procedure',
        whatHappens:
          'The surgeon removes the damaged joint surfaces and implants the knee replacement components.',
        whatToExpect: 'You will be under anaesthesia throughout. The procedure takes approximately 1.5–2 hours.',
        duration: '1.5–2 hours',
      },
      {
        id: 'kr-4',
        title: 'Post-operative Care',
        description: 'Recovery in hospital',
        whatHappens: 'Pain management, physiotherapy begins day 1 post-surgery, wound care.',
        whatToExpect: 'Most patients stand and take a few steps on Day 1 after surgery.',
        duration: '3–5 days',
      },
      {
        id: 'kr-5',
        title: 'Physiotherapy & Rehabilitation',
        description: 'Regaining strength and movement',
        whatHappens: 'A structured physiotherapy programme helps you regain knee strength and mobility.',
        whatToExpect: 'Daily physiotherapy sessions, progressively increasing activity.',
        duration: '6–12 weeks',
      },
      {
        id: 'kr-6',
        title: 'Long-term Follow-up',
        description: 'Monitoring your new knee',
        whatHappens: 'Follow-up appointments at 6 weeks, 3 months, and 1 year.',
        whatToExpect: 'Most patients achieve significant improvement in pain and mobility within 3 months.',
        duration: 'Annual follow-up',
      },
    ],
    medicalTerms: [
      {
        term: 'Arthroplasty',
        simple: 'The surgical replacement of a damaged joint with an artificial implant.',
        detailed:
          'Total knee arthroplasty (TKA) involves resurfacing the damaged ends of the femur, tibia, and patella with metallic and polyethylene components that recreate the smooth joint surface, eliminating bone-on-bone friction and pain.',
      },
      {
        term: 'Osteoarthritis',
        simple:
          'A condition where the cartilage cushioning the knee joint wears away, causing pain and stiffness.',
        detailed:
          'Osteoarthritis is the most common reason for knee replacement. It is a degenerative joint disease where the protective cartilage that cushions the ends of bones gradually breaks down, leading to pain, swelling, and reduced range of motion.',
      },
    ],
  },
]

export const getTreatmentById = (id: string): Treatment | undefined =>
  treatments.find((t) => t.id === id)
