import type { GlobalConfig } from 'payload'

export const HomeHero: GlobalConfig = {
  slug: 'home-hero',
  label: '01 Hero',
  admin: { group: 'Home' },
  access: { read: () => true, update: ({ req }) => Boolean(req.user) },
  fields: [
    { name: 'enabled', label: 'Habilitada', type: 'checkbox', defaultValue: true },
    {
      name: 'slides', type: 'array', fields: [
        { name: 'eyebrow', type: 'text', localized: true },
        { name: 'title', type: 'text', localized: true },
        { name: 'subtitle', type: 'textarea', localized: true },
        { name: 'mediaType', label: 'Tipo de medio', type: 'select', options: [{ label: 'Imagen', value: 'image' }, { label: 'Video', value: 'video' }] },
        { name: 'desktopMedia', label: 'Medio de escritorio', type: 'upload', relationTo: 'media', localized: true },
        { name: 'mobileMedia', label: 'Medio móvil', type: 'upload', relationTo: 'media', localized: true },
        { name: 'videoPoster', label: 'Poster de video', type: 'upload', relationTo: 'media', localized: true },
      ],
    },
    // {
    //   name: 'search', label: 'Buscador', type: 'group', fields: [
    //     { name: 'projectPlaceholder', label: 'Placeholder de proyecto', type: 'text', localized: true },
    //     { name: 'destinationPlaceholder', label: 'Placeholder de destino', type: 'text', localized: true },
    //     { name: 'buttonLabel', label: 'Etiqueta del botón', type: 'text', localized: true },
    //   ],
    // },
  ],
}
