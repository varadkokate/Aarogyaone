import type { Metadata } from 'next'
import './globals.css'
import { LanguageProvider } from '@/context/LanguageContext'
import { AppointmentProvider } from '@/context/AppointmentContext'
import { ThemeProvider } from '@/context/ThemeContext'
import { AppShell } from '@/components/layout/AppShell'

export const metadata: Metadata = {
  title: {
    default: 'AarogyaOne Hospitals — Better Care. Closer to You.',
    template: '%s | AarogyaOne Hospitals',
  },
  description:
    'AarogyaOne Hospitals, Pune — Premium multispeciality hospital offering world-class healthcare. Book appointments with 50+ specialists across Cardiology, Neurology, Orthopaedics, Oncology, and more.',
  keywords: ['hospital pune', 'multispeciality hospital', 'cardiologist pune', 'book appointment'],
  authors: [{ name: 'AarogyaOne Hospitals' }],
  robots: { index: false, follow: false },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <ThemeProvider>
          <LanguageProvider>
            <AppointmentProvider>
              <AppShell>{children}</AppShell>
            </AppointmentProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
