import config from '@payload-config'
import { RichText } from '@payloadcms/richtext-lexical/react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

import { getAmenityIconComponent, isAmenityIconKey } from '@/lib/amenity-icons'

export const dynamic = 'force-dynamic'

const locales = ['es', 'en'] as const
type Locale = (typeof locales)[number]

const labels = {
  es: {
    back: 'Ver todos los proyectos',
    from: 'Precio desde',
    bedrooms: 'Habitaciones',
    area: 'Área',
    amenities: 'Amenidades',
    gallery: 'Galería',
    status: { presale: 'Preventa', construction: 'En construcción', delivered: 'Entregado' },
  },
  en: {
    back: 'View all projects',
    from: 'Starting from',
    bedrooms: 'Bedrooms',
    area: 'Area',
    amenities: 'Amenities',
    gallery: 'Gallery',
    status: { presale: 'Presale', construction: 'Under construction', delivered: 'Delivered' },
  },
} as const

function mediaURL(image: unknown, size: 'large' | 'card' = 'large') {
  if (typeof image !== 'object' || image === null) return null
  const media = image as { url?: string | null; sizes?: Record<string, { url?: string | null }> }
  return media.sizes?.[size]?.url || media.url || null
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: requestedLocale, slug } = await params
  if (!locales.includes(requestedLocale as Locale)) notFound()

  const locale = requestedLocale as Locale
  const copy = labels[locale]
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'projects',
    locale,
    fallbackLocale: false,
    depth: 2,
    limit: 1,
    where: {
      and: [
        { slug: { equals: slug } },
        { _status: { equals: 'published' } },
      ],
    },
  })

  const project = result.docs[0]
  if (!project) notFound()

  const hero = mediaURL(project.mainImage)
  const gallery = (project.gallery || []).filter((image) => typeof image === 'object' && image !== null)
  const destination = typeof project.destination === 'object' ? project.destination.name : null
  const amenities = (project.amenities || []).filter((amenity) => typeof amenity === 'object' && amenity !== null)

  return (
    <main className="min-h-screen bg-white">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
          <Link className="font-semibold tracking-tight" href={`/${locale}`}>Payload Real Estate</Link>
          <nav className="flex items-center gap-2 text-sm" aria-label="Language selector">
            <Link className={locale === 'es' ? 'font-bold text-blue-700' : 'text-slate-500'} href={`/es/projects/${slug}`}>ES</Link>
            <span className="text-slate-300">|</span>
            <Link className={locale === 'en' ? 'font-bold text-blue-700' : 'text-slate-500'} href={`/en/projects/${slug}`}>EN</Link>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-5 py-8">
        <Link className="text-sm font-medium text-blue-700 hover:underline" href={`/${locale}`}>← {copy.back}</Link>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-5 pb-16 lg:grid-cols-[1.35fr_0.65fr]">
        <div>
          {hero ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img alt={project.title} className="aspect-[16/10] w-full rounded-2xl object-cover" src={hero} />
          ) : <div className="aspect-[16/10] rounded-2xl bg-slate-200" />}

          {gallery.length > 0 && (
            <section className="mt-10">
              <h2 className="mb-4 text-2xl font-semibold">{copy.gallery}</h2>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {gallery.map((image, index) => {
                  const src = mediaURL(image, 'card')
                  const alt = 'alt' in image && typeof image.alt === 'string' ? image.alt : `${project.title} ${index + 1}`
                  return src ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img alt={alt} className="aspect-[4/3] w-full rounded-lg object-cover" key={index} src={src} />
                  ) : null
                })}
              </div>
            </section>
          )}
        </div>

        <aside>
          {destination && <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-blue-700">{destination}</p>}
          <div className="mb-5 flex items-start justify-between gap-4">
            <h1 className="text-4xl font-bold tracking-tight">{project.title}</h1>
            <span className="shrink-0 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">{copy.status[project.status]}</span>
          </div>
          {project.shortDescription && <p className="mb-8 text-lg leading-8 text-slate-600">{project.shortDescription}</p>}

          <dl className="mb-8 grid grid-cols-3 divide-x divide-slate-200 rounded-xl border border-slate-200 py-4 text-center">
            {typeof project.priceFrom === 'number' && <div><dt className="text-xs text-slate-500">{copy.from}</dt><dd className="mt-1 font-semibold">{new Intl.NumberFormat(locale, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(project.priceFrom)}</dd></div>}
            {typeof project.bedrooms === 'number' && <div><dt className="text-xs text-slate-500">{copy.bedrooms}</dt><dd className="mt-1 font-semibold">{project.bedrooms}</dd></div>}
            {typeof project.area === 'number' && <div><dt className="text-xs text-slate-500">{copy.area}</dt><dd className="mt-1 font-semibold">{project.area} m²</dd></div>}
          </dl>

          {project.description && <RichText className="project-description" data={project.description} />}

          {amenities.length > 0 && (
            <section className="mt-10 border-t border-slate-200 pt-8">
              <h2 className="mb-4 text-xl font-semibold">{copy.amenities}</h2>
              <ul className="grid grid-cols-2 gap-3 text-sm text-slate-700">
                {amenities.map((amenity) => {
                  const Icon = getAmenityIconComponent(amenity.icon)
                  return <li key={amenity.id} className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2">{isAmenityIconKey(amenity.icon) ? <Icon aria-hidden="true" className="text-blue-700" /> : amenity.icon && <span>{amenity.icon}</span>}{amenity.name}</li>
                })}
              </ul>
            </section>
          )}
        </aside>
      </section>
    </main>
  )
}
