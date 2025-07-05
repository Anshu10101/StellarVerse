import { Inter } from 'next/font/google'
import { Metadata } from 'next'
import './globals.css'
import ClientLayout from '@/components/Layout/ClientLayout'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "StellarVerse",
  description: "StellarVerse is a space-themed web application for exploring astronomy events, taking space quizzes, and learning about the cosmos.",
  icons: {
    icon: '/galaxy-logo.png',
    shortcut: '/galaxy-logo.png',
    apple: '/galaxy-logo.png',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#030203] overflow-y-scroll overflow-x-hidden`}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}
