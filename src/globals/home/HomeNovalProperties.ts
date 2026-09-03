import type { GlobalConfig } from 'payload'

export const HomeNovalProperties: GlobalConfig = {
  slug: 'home-noval-properties',
  label: '05 Noval Properties',
  admin: { group: 'Home' },
  access: { read: () => true, update: ({ req }) => Boolean(req.user) },
  fields: [
    { name: 'enabled', label: 'Habilitada', type: 'checkbox', defaultValue: true },
    { name: 'eyebrow', type: 'text', localized: true },
    { name: 'title', type: 'text', localized: true },
    { name: 'highlightedTitle', label: 'Título destacado', type: 'text', localized: true },
    { name: 'description', type: 'textarea', localized: true },
    {
      name: 'items', type: 'array', fields: [
        { name: 'image', label: 'Imagen', type: 'upload', relationTo: 'media', localized: true },
        { name: 'title', type: 'text', localized: true },
        { name: 'description', type: 'textarea', localized: true },
      ],
    },
  ],
}
