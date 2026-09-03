import config from '@payload-config'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

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

export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: requestedLocale } = await params
  if (!locales.includes(requestedLocale as Locale)) notFound()

  const locale = requestedLocale as Locale
  const copy = labels[locale]
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'projects',
    locale,
    fallbackLocale: false,
    depth: 2,
    limit: 100,
    sort: '-featured,-createdAt',
    where: { _status: { equals: 'published' } },
  })



  return (
    <main className="min-h-screen">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
          <span className="font-semibold tracking-tight">Payload Real Estate</span>
          <nav className="flex items-center gap-2 text-sm" aria-label="Language selector">
            <Link className={locale === 'es' ? 'font-bold text-blue-700' : 'text-slate-500'} href="/es/projects">ES</Link>
            <span className="text-slate-300">|</span>
            <Link className={locale === 'en' ? 'font-bold text-blue-700' : 'text-slate-500'} href="/en/projects">EN</Link>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-5 py-12">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-blue-700">{copy.eyebrow}</p>
        <h1 className="mb-10 text-3xl font-bold tracking-tight sm:text-4xl">{copy.title}</h1>

        {result.docs.length === 0 ? (
          <p className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-slate-500">{copy.empty}</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {result.docs.map((project) => {
              const src = imageURL(project.mainImage)
              const destination = typeof project.destination === 'object' ? project.destination?.name : null
              return (
                <Link href={`/${locale}/projects/${project.slug}`} key={project.id} className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                  <article>
                    {src ? (
                      // Payload serves local uploads from the same origin.
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={src} alt={project.title} className="aspect-[3/2] w-full object-cover" />
                    ) : (
                      <div className="aspect-[3/2] bg-slate-200" />
                    )}
                    <div className="p-5">
                      <div className="mb-2 flex items-start justify-between gap-3">
                        <h2 className="text-xl font-semibold group-hover:text-blue-700">{project.title}</h2>
                        {project.status && (
                          <span className="shrink-0 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
                            {copy.status[project.status as keyof typeof copy.status]}
                          </span>
                        )}
                      </div>
                      {destination && <p className="mb-4 text-sm text-slate-500">{destination}</p>}
                      <div className="flex items-end justify-between gap-3 border-t border-slate-100 pt-4">
                        {typeof project.priceFrom === 'number' && (
                          <p>
                            <span className="block text-xs text-slate-500">{copy.from}</span>
                            <strong>{new Intl.NumberFormat(locale, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(project.priceFrom)}</strong>
                          </p>
                        )}
                        {typeof project.bedrooms === 'number' && (
                          <p className="text-sm text-slate-600">{project.bedrooms} {copy.bedrooms}</p>
                        )}
                      </div>
                    </div>
                  </article>
                </Link>
              )
            })}
          </div>
        )}
      </section>
    </main>
  )
}
