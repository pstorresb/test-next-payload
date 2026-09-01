import type { CollectionConfig } from 'payload'

export const Amenities: CollectionConfig = {
  slug: 'amenities',
  labels: { singular: 'Amenidad', plural: 'Amenidades' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'icon', 'updatedAt'],
    group: 'Contenido',
  },
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    { name: 'name', type: 'text', required: true, localized: true },
    { name: 'icon', type: 'text', admin: { description: 'Emoji o nombre de icono opcional' } },
  ],
}
