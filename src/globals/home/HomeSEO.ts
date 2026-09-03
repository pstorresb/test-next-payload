import type { GlobalConfig } from 'payload'

export const HomeSEO: GlobalConfig = {
  slug: 'home-seo',
  label: '11 SEO',
  admin: { group: 'Home' },
  access: { read: () => true, update: ({ req }) => Boolean(req.user) },
  fields: [
    { name: 'metaTitle', label: 'Título SEO', type: 'text', localized: true },
    { name: 'metaDescription', label: 'Descripción SEO', type: 'textarea', localized: true },
    { name: 'ogImage', label: 'Imagen Open Graph', type: 'upload', relationTo: 'media', localized: true },
    { name: 'noIndex', label: 'No indexar', type: 'checkbox', defaultValue: false },
  ],
}
