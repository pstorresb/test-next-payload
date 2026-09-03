import type { GlobalConfig } from 'payload'

export const Header: GlobalConfig = {
  slug: 'header',
  label: 'Header',
  admin: { group: 'Sitio' },
  access: { read: () => true, update: ({ req }) => Boolean(req.user) },
  fields: [
    { name: 'logo', label: 'Logo', type: 'upload', relationTo: 'media', localized: true },
    {
      name: 'navigation', label: 'Navegación', type: 'array', fields: [
        { name: 'label', label: 'Etiqueta', type: 'text', localized: true, required: true },
        { name: 'type', label: 'Tipo', type: 'select', required: true, defaultValue: 'internal', options: [{ label: 'Interno', value: 'internal' }, { label: 'Externo', value: 'external' }] },
        { name: 'url', label: 'URL', type: 'text', localized: true, required: true },
        { name: 'newTab', label: 'Abrir en una pestaña nueva', type: 'checkbox', defaultValue: false },
      ],
    },
    {
      name: 'cta', label: 'Llamado a la acción', type: 'group', fields: [
        { name: 'label', label: 'Etiqueta', type: 'text', localized: true },
        { name: 'url', label: 'URL', type: 'text', localized: true },
      ],
    },
  ],
}
