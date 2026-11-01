'use client'
import React, { createContext, useContext, useState, useCallback } from 'react'
import type { AppointmentFormData } from '@/types'

const defaultForm: AppointmentFormData = {
  specialityId: '',
  doctorId: '',
  consultationType: '',
  date: '',
  timeSlot: '',
  patientName: '',
  mobile: '',
  email: '',
  age: '',
  preferredLanguage: '',
  doctorGenderPreference: 'no-preference',
  notes: '',
}

interface AppointmentContextType {
  isOpen: boolean
  openAppointment: (specialityId?: string, doctorId?: string) => void
  closeAppointment: () => void
  step: number
  setStep: (step: number) => void
  formData: AppointmentFormData
  updateFormData: (updates: Partial<AppointmentFormData>) => void
  resetForm: () => void
}

const AppointmentContext = createContext<AppointmentContextType>({
  isOpen: false,
  openAppointment: () => {},
  closeAppointment: () => {},
  step: 1,
  setStep: () => {},
  formData: defaultForm,
  updateFormData: () => {},
  resetForm: () => {},
})

export function AppointmentProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<AppointmentFormData>(defaultForm)

  const openAppointment = useCallback((specialityId?: string, doctorId?: string) => {
    setFormData((prev) => ({
      ...prev,
      specialityId: specialityId || '',
      doctorId: doctorId || '',
    }))
    setStep(specialityId ? (doctorId ? 3 : 2) : 1)
    setIsOpen(true)
  }, [])

  const closeAppointment = useCallback(() => {
    setIsOpen(false)
  }, [])

  const updateFormData = useCallback((updates: Partial<AppointmentFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }))
  }, [])

  const resetForm = useCallback(() => {
    setFormData(defaultForm)
    setStep(1)
  }, [])

  return (
    <AppointmentContext.Provider
      value={{ isOpen, openAppointment, closeAppointment, step, setStep, formData, updateFormData, resetForm }}
    >
      {children}
    </AppointmentContext.Provider>
  )
}

export function useAppointment() {
  return useContext(AppointmentContext)
}
