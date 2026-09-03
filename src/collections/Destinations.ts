import type { CollectionConfig, FieldHook } from 'payload'

const slugify = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

const setSlug: FieldHook = ({ value, siblingData }) => {
  if (typeof value === 'string' && value.length > 0) return slugify(value)
  return typeof siblingData?.name === 'string' ? slugify(siblingData.name) : value
}

export const Destinations: CollectionConfig = {
  slug: 'destinations',
  labels: { singular: 'Destino', plural: 'Destinos' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'updatedAt'],
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
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      hooks: { beforeValidate: [setSlug] },
      admin: { description: 'Se genera desde el nombre si se deja vacío.' },
    },
    { name: 'description', type: 'textarea', localized: true },
    { name: 'shortDescription', label: 'Descripción corta', type: 'textarea', localized: true },
    { name: 'coverImage', label: 'Imagen de portada', type: 'upload', relationTo: 'media', localized: true },
    { name: 'heroImage', label: 'Imagen hero', type: 'upload', relationTo: 'media', localized: true },
    {
      name: 'seo',
      label: 'SEO',
      type: 'group',
      fields: [
        { name: 'metaTitle', label: 'Título SEO', type: 'text', localized: true },
        { name: 'metaDescription', label: 'Descripción SEO', type: 'textarea', localized: true },
        { name: 'ogImage', label: 'Imagen Open Graph', type: 'upload', relationTo: 'media', localized: true },
      ],
    },
  ],
}
