import type { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
  admin: { group: 'Sitio' },
  access: { read: () => true, update: ({ req }) => Boolean(req.user) },
  fields: [
    { name: 'logo', label: 'Logo', type: 'upload', relationTo: 'media', localized: true },
    { name: 'description', label: 'Descripción', type: 'textarea', localized: true },
    {
      name: 'columns', label: 'Columnas', type: 'array', fields: [
        { name: 'title', label: 'Título', type: 'text', localized: true },
        {
          name: 'links', label: 'Enlaces', type: 'array', fields: [
            { name: 'label', label: 'Etiqueta', type: 'text', localized: true, required: true },
            { name: 'url', label: 'URL', type: 'text', localized: true, required: true },
            { name: 'newTab', label: 'Abrir en una pestaña nueva', type: 'checkbox', defaultValue: false },
          ],
        },
      ],
    },
    {
      name: 'newsletter', label: 'Newsletter', type: 'group', fields: [
        { name: 'title', label: 'Título', type: 'text', localized: true },
        { name: 'description', label: 'Descripción', type: 'textarea', localized: true },
        { name: 'placeholder', label: 'Placeholder', type: 'text', localized: true },
        { name: 'buttonLabel', label: 'Etiqueta del botón', type: 'text', localized: true },
      ],
    },
    { name: 'copyright', label: 'Copyright', type: 'text', localized: true },
    {
      name: 'legalLinks', label: 'Enlaces legales', type: 'array', fields: [
        { name: 'label', label: 'Etiqueta', type: 'text', localized: true, required: true },
        { name: 'url', label: 'URL', type: 'text', localized: true, required: true },
      ],
    },
    { name: 'destinationLinks', label: 'Destinos del footer', type: 'relationship', relationTo: 'destinations', hasMany: true },
  ],
}
