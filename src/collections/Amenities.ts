import type { CollectionConfig } from 'payload'

export const Amenities: CollectionConfig = {
  slug: 'amenities',
  labels: { singular: 'Amenidad', plural: 'Amenidades' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'icon', 'updatedAt'],
    group: 'Proyectos',
  },
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    { name: 'name', type: 'text', required: true, localized: true },
    {
      name: 'icon',
      type: 'text',
      admin: {
        components: {
          Field: '@/components/admin/AmenityIconPicker#AmenityIconPicker',
          Cell: '@/components/admin/AmenityIconCell#AmenityIconCell',
        },
      },
    },
  ],
}
