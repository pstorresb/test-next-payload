import type { GlobalConfig } from 'payload'

export const HomeTestimonials: GlobalConfig = {
  slug: 'home-testimonials',
  label: '09 Testimonios',
  admin: { group: 'Home' },
  access: { read: () => true, update: ({ req }) => Boolean(req.user) },
  fields: [
    { name: 'enabled', label: 'Habilitada', type: 'checkbox', defaultValue: true },
    { name: 'eyebrow', type: 'text', localized: true },
    { name: 'title', type: 'text', localized: true },
    { name: 'description', type: 'textarea', localized: true },
    {
      name: 'items', label: 'Testimonios', type: 'array', fields: [
        { name: 'rating', label: 'Calificación', type: 'number', required: true, min: 1, max: 5 },
        { name: 'comment', label: 'Comentario', type: 'textarea', localized: true },
        { name: 'name', label: 'Nombre', type: 'text', localized: true },
        { name: 'location', label: 'Ubicación', type: 'text', localized: true },
        { name: 'avatar', label: 'Avatar', type: 'upload', relationTo: 'media', localized: true },
        { name: 'role', label: 'Rol', type: 'text', localized: true },
      ],
    },
  ],
}
