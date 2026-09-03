import config from '@payload-config'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import HomeSlider, { type HomeHeroData } from '@/components/frontend/HomeSlider'

export const dynamic = 'force-dynamic'

const locales = ['es', 'en'] as const
type Locale = (typeof locales)[number]

const labels = {
  es: {
    eyebrow: 'Proyectos inmobiliarios',
    title: 'Encuentra tu próxima propiedad',
    empty: 'Aún no hay proyectos publicados.',
    from: 'Desde',
    bedrooms: 'habitaciones',
    status: {
      presale: 'Preventa',
      construction: 'En construcción',
      delivered: 'Entregado',
    },
  },
  en: {
    eyebrow: 'Real estate projects',
    title: 'Find your next property',
    empty: 'There are no published projects yet.',
    from: 'From',
    bedrooms: 'bedrooms',
    status: {
      presale: 'Presale',
      construction: 'Under construction',
      delivered: 'Delivered',
    },
  },
} as const

function imageURL(image: unknown) {
  if (typeof image !== 'object' || image === null) return null
  const media = image as { url?: string | null; sizes?: { card?: { url?: string | null } } }
  return media.sizes?.card?.url || media.url || null
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: requestedLocale } = await params
  if (!locales.includes(requestedLocale as Locale)) notFound()

  const locale = requestedLocale as Locale

  const payload = await getPayload({ config })


    const hero2 = await payload.findGlobal({
  slug: 'home-hero',
  locale,
  fallbackLocale: false,
  depth: 2,
  })


  return (
    <main className="min-h-screen bg-slate-500">
         <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
          <span className="font-semibold tracking-tight">Payload Real Estate</span>
          <nav className="flex items-center gap-2 text-sm" aria-label="Language selector">
            <Link className={locale === 'es' ? 'font-bold text-blue-700' : 'text-slate-500'} href="/es">ES</Link>
            <span className="text-slate-300">|</span>
            <Link className={locale === 'en' ? 'font-bold text-blue-700' : 'text-slate-500'} href="/en">EN</Link>
          </nav>
        </div>
      </header>

      <HomeSlider hero={hero2 as HomeHeroData} />

    </main>
  )
}
