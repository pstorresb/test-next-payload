import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Proyectos inmobiliarios',
  description: 'Demo de Payload CMS con proyectos inmobiliarios',
}

export default function FrontendLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
