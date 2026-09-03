import type { GlobalConfig } from 'payload'

export const HomeLifestyle: GlobalConfig = {
  slug: 'home-lifestyle',
  label: '08 Lifestyle',
  admin: { group: 'Home' },
  access: { read: () => true, update: ({ req }) => Boolean(req.user) },
  fields: [
    { name: 'enabled', label: 'Habilitada', type: 'checkbox', defaultValue: true },
    { name: 'eyebrow', type: 'text', localized: true },
    { name: 'title', type: 'text', localized: true },
    { name: 'description', type: 'textarea', localized: true },
    { name: 'image', label: 'Imagen', type: 'upload', relationTo: 'media', localized: true },
    { name: 'mobileImage', label: 'Imagen móvil', type: 'upload', relationTo: 'media', localized: true },
    {
      name: 'cta', label: 'Llamado a la acción', type: 'group', fields: [
        { name: 'label', label: 'Etiqueta', type: 'text', localized: true },
        { name: 'url', label: 'URL', type: 'text', localized: true },
      ],
    },
  ],
}
