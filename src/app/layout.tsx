import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'World Crisis: The Final Countdown',
  description: 'A thrilling story-driven game where heroes must save humanity from nuclear annihilation. Race against time to rescue Putin\'s daughter and prevent global destruction.',
  keywords: 'game, story, action, nuclear, crisis, hero, mission, thriller',
  authors: [{ name: 'Game Developer' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'World Crisis: The Final Countdown',
    description: 'Save humanity from nuclear annihilation in this thrilling story-driven game',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'World Crisis: The Final Countdown',
    description: 'Save humanity from nuclear annihilation in this thrilling story-driven game',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
