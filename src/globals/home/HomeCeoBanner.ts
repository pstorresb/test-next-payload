import type { GlobalConfig } from 'payload'

export const HomeCeoBanner: GlobalConfig = {
  slug: 'home-ceo-banner',
  label: '04 Banner CEO',
  admin: { group: 'Home' },
  access: { read: () => true, update: ({ req }) => Boolean(req.user) },
  fields: [
    { name: 'enabled', label: 'Habilitada', type: 'checkbox', defaultValue: true },
    { name: 'backgroundImage', label: 'Imagen de fondo', type: 'upload', relationTo: 'media', localized: true },
    { name: 'eyebrow', type: 'text', localized: true },
    { name: 'quote', label: 'Cita', type: 'textarea', localized: true },
    { name: 'authorName', label: 'Nombre del autor', type: 'text', localized: true },
    { name: 'authorPosition', label: 'Cargo del autor', type: 'text', localized: true },
  ],
}
