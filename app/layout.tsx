import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, Geist, Geist_Mono, Poppins } from 'next/font/google'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  variable: '--font-heading',
  subsets: ['latin'],
  display: 'swap',
})
const poppins = Poppins({
  variable: '--font-poppins',
  weight: ['400', '500', '600', '700', '800', '900'],
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
  title: 'Paulo Vitor Brandão — Full Stack Developer',
  description:
    'Portfólio de Paulo Vitor Brandão, desenvolvedor Full Stack com foco em React, Next.js, Java, Spring Boot, APIs REST, IA e automação.',
  keywords: [
    'Paulo Vitor Brandão',
    'Full Stack Developer',
    'Desenvolvedor Full Stack',
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
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    title: 'Paulo Vitor Brandão — Full Stack Developer',
    description:
      'Desenvolvedor Full Stack com foco em React, Next.js, Java, Spring Boot, APIs REST, IA e automação.',
    siteName: 'Paulo Vitor Brandão',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Paulo Vitor Brandão — Full Stack Developer',
    description: 'Portfólio de desenvolvimento web, Full Stack, IA e automação.',
  },
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'dark light',
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0A0A0F' },
    { media: '(prefers-color-scheme: light)', color: '#F7F7F2' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const themeScript = `
    (() => {
      try {
        const saved = localStorage.getItem('portfolio-theme');
        const theme = saved || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        document.documentElement.classList.add(theme);
        document.documentElement.style.colorScheme = theme;
      } catch (_) {
        document.documentElement.classList.add('dark');
      }
    })();
  `

  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${poppins.variable} ${geistSans.variable} ${geistMono.variable} bg-background`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
