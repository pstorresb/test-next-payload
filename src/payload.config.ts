import { postgresAdapter } from '@payloadcms/db-postgres'
import { FixedToolbarFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { en } from '@payloadcms/translations/languages/en'
import { es } from '@payloadcms/translations/languages/es'
import path from 'node:path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'node:url'

import { Amenities } from './collections/Amenities'
import { ContactSubmissions } from './collections/ContactSubmissions'
import { Destinations } from './collections/Destinations'
import { Media } from './collections/Media'
import { Projects } from './collections/Projects'
import { Users } from './collections/Users'
import { HomeBrandedResidences } from './globals/home/HomeBrandedResidences'
import { HomeCeoBanner } from './globals/home/HomeCeoBanner'
import { HomeContact } from './globals/home/HomeContact'
import { HomeDestinations } from './globals/home/HomeDestinations'
import { HomeHero } from './globals/home/HomeHero'
import { HomeLifestyle } from './globals/home/HomeLifestyle'
import { HomeNovalProperties } from './globals/home/HomeNovalProperties'
import { HomePortfolio } from './globals/home/HomePortfolio'
import { HomeSEO } from './globals/home/HomeSEO'
import { HomeTestimonials } from './globals/home/HomeTestimonials'
import { HomeTrajectory } from './globals/home/HomeTrajectory'
import { ContactSettings } from './globals/site/ContactSettings'
import { Footer } from './globals/site/Footer'
import { Header } from './globals/site/Header'
import { SiteSettings } from './globals/site/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: { titleSuffix: '- Inmobiliaria Demo' },
  },
  collections: [Users, Media, Projects, Amenities, Destinations, ContactSubmissions],
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URL },
  }),
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      FixedToolbarFeature(),
    ],
  }),
  localization: {
    locales: [
      { code: 'es', label: 'Español' },
      { code: 'en', label: 'English' },
    ],
    defaultLocale: 'es',
    fallback: true,
  },
  i18n: {
    supportedLanguages: { es, en },
  },
  globals: [
    HomeHero,
    HomePortfolio,
    HomeTrajectory,
    HomeCeoBanner,
    HomeNovalProperties,
    HomeDestinations,
    HomeBrandedResidences,
    HomeLifestyle,
    HomeTestimonials,
    HomeContact,
    HomeSEO,
    Header,
    Footer,
    ContactSettings,
    SiteSettings,
  ],
  secret: process.env.PAYLOAD_SECRET || '',
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
