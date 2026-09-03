import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Configuración del sitio',
  admin: { group: 'Sitio' },
  access: { read: () => true, update: ({ req }) => Boolean(req.user) },
  fields: [
    { name: 'siteName', label: 'Nombre del sitio', type: 'text' },
    { name: 'favicon', label: 'Favicon', type: 'upload', relationTo: 'media' },
    {
      name: 'defaultSeo', label: 'SEO predeterminado', type: 'group', fields: [
        { name: 'metaTitle', label: 'Título SEO', type: 'text', localized: true },
        { name: 'metaDescription', label: 'Descripción SEO', type: 'textarea', localized: true },
        { name: 'ogImage', label: 'Imagen Open Graph', type: 'upload', relationTo: 'media', localized: true },
      ],
    },
  ],
}
