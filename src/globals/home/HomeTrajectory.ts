import type { GlobalConfig } from 'payload'

export const HomeTrajectory: GlobalConfig = {
  slug: 'home-trajectory',
  label: '03 Trayectoria',
  admin: { group: 'Home' },
  access: { read: () => true, update: ({ req }) => Boolean(req.user) },
  fields: [
    { name: 'enabled', label: 'Habilitada', type: 'checkbox', defaultValue: true },
    { name: 'eyebrow', type: 'text', localized: true },
    { name: 'title', type: 'text', localized: true },
    { name: 'highlightedTitle', label: 'Título destacado', type: 'text', localized: true },
    { name: 'description', type: 'textarea', localized: true },
    {
      name: 'stats', label: 'Estadísticas', type: 'array', fields: [
        { name: 'prefix', type: 'text', localized: true },
        { name: 'value', type: 'number' },
        { name: 'suffix', type: 'text', localized: true },
        { name: 'label', type: 'text', localized: true },
      ],
    },
    { name: 'backgroundImage', label: 'Imagen de fondo', type: 'upload', relationTo: 'media', localized: true },
    { name: 'style', label: 'Estilo', type: 'select', defaultValue: 'plain', options: [{ label: 'Plano', value: 'plain' }, { label: 'Imagen', value: 'image' }] },
  ],
}
