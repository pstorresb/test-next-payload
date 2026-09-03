import type { GlobalConfig } from 'payload'

export const HomeDestinations: GlobalConfig = {
  slug: 'home-destinations',
  label: '06 Destinos',
  admin: { group: 'Home' },
  access: { read: () => true, update: ({ req }) => Boolean(req.user) },
  fields: [
    { name: 'enabled', label: 'Habilitada', type: 'checkbox', defaultValue: true },
    { name: 'eyebrow', type: 'text', localized: true },
    { name: 'title', type: 'text', localized: true },
    { name: 'description', type: 'textarea', localized: true },
    {
      name: 'destinations', label: 'Destinos', type: 'array', fields: [
        { name: 'destination', label: 'Destino', type: 'relationship', relationTo: 'destinations', required: true },
        { name: 'featured', label: 'Destacado', type: 'checkbox', defaultValue: false },
      ],
    },
  ],
}
