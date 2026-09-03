import type { GlobalConfig } from 'payload'

export const HomeBrandedResidences: GlobalConfig = {
  slug: 'home-branded-residences',
  label: '07 Branded Residences',
  admin: { group: 'Home' },
  access: { read: () => true, update: ({ req }) => Boolean(req.user) },
  fields: [
    { name: 'enabled', label: 'Habilitada', type: 'checkbox', defaultValue: true },
    { name: 'eyebrow', type: 'text', localized: true },
    { name: 'titleBefore', label: 'Título antes del destacado', type: 'text', localized: true },
    { name: 'highlightedTitle', label: 'Título destacado', type: 'text', localized: true },
    { name: 'titleAfter', label: 'Título después del destacado', type: 'text', localized: true },
    { name: 'description', type: 'textarea', localized: true },
    {
      name: 'logos', type: 'array', fields: [
        { name: 'image', label: 'Logo', type: 'upload', relationTo: 'media', localized: true },
        { name: 'alt', label: 'Texto alternativo', type: 'text', localized: true },
      ],
    },
    { name: 'mainImage', label: 'Imagen principal', type: 'upload', relationTo: 'media', localized: true },
    { name: 'mobileImage', label: 'Imagen móvil', type: 'upload', relationTo: 'media', localized: true },
  ],
}
