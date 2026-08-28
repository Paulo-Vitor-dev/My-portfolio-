import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  variable: '--font-heading',
  subsets: ['latin'],
  display: 'swap',
})
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
})
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://paulovitorbrandao.dev'),
  title: 'Paulo Vitor Brandão — Full Stack & Engenharia de Dados',
  description:
    'Portfólio de Paulo Vitor Brandão, desenvolvedor Full Stack com interesse em Engenharia de Dados, Python, SQL, bancos de dados, APIs REST, IA e automação.',
  keywords: [
    'Paulo Vitor Brandão',
    'Full Stack Developer',
    'Desenvolvedor Full Stack',
    'Engenharia de Dados',
    'Data Engineering',
    'Python',
    'SQL',
    'ETL',
    'Pipelines de Dados',
    'Front-End',
    'Next.js',
    'React',
    'TypeScript',
    'Java',
    'Spring Boot',
    'Node.js',
    'IA',
    'Automação',
    'Portfólio',
  ],
  authors: [{ name: 'Paulo Vitor Brandão' }],
  creator: 'Paulo Vitor Brandão',
  icons: {
    icon: '/favicon-64.png',
    apple: '/apple-icon-180.png',
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    title: 'Paulo Vitor Brandão — Full Stack & Engenharia de Dados',
    description:
      'Desenvolvedor Full Stack com interesse em Engenharia de Dados, Python, SQL, bancos de dados, APIs REST, IA e automação.',
    siteName: 'Paulo Vitor Brandão',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Paulo Vitor Brandão — Full Stack & Engenharia de Dados',
    description: 'Portfólio de desenvolvimento Full Stack, Engenharia de Dados, IA e automação.',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0A0A0F',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${spaceGrotesk.variable} ${geistSans.variable} ${geistMono.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
