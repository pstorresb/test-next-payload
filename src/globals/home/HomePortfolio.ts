import type { GlobalConfig } from 'payload'

export const HomePortfolio: GlobalConfig = {
  slug: 'home-portfolio',
  label: '02 Portafolio',
  admin: { group: 'Home' },
  access: { read: () => true, update: ({ req }) => Boolean(req.user) },
  fields: [
    { name: 'enabled', label: 'Habilitada', type: 'checkbox', defaultValue: true },
    { name: 'eyebrow', type: 'text', localized: true },
    { name: 'title', type: 'text', localized: true },
    { name: 'description', type: 'textarea', localized: true },
    { name: 'projects', label: 'Proyectos', type: 'relationship', relationTo: 'projects', hasMany: true },
  ],
}
