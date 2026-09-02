import type { CollectionConfig, Field, FieldHook } from 'payload'

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
  return typeof siblingData?.title === 'string' ? slugify(siblingData.title) : value
}

const localeTabs = (name: string): Field => ({
  name,
  type: 'ui',
  admin: {
    components: {
      Field: '@/components/admin/LocaleTabs#LocaleTabs',
    },
  },
})

export const Projects: CollectionConfig = {
  slug: 'projects',
  labels: { singular: 'Proyecto', plural: 'Proyectos' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'destination', 'status', '_status', 'updatedAt'],
    group: 'Inmobiliaria',
  },
  access: {
    read: ({ req }) => (req.user ? true : { _status: { equals: 'published' } }),
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  versions: {
    drafts: true,
    maxPerDoc: 20,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Datos generales',
          fields: [
            localeTabs('generalLocaleTabs'),
            {
              name: 'title',
              type: 'text',
              required: true,
              localized: true,
              admin: {
                components: {
                  Cell: '@/components/admin/ProjectTitleCell#ProjectTitleCell',
                },
              },
            },
            {
              name: 'slug',
              type: 'text',
              localized: true,
              required: true,
              unique: true,
              index: true,
              hooks: { beforeValidate: [setSlug] },
              admin: { description: 'Se genera desde el título si se deja vacío.' },
            },
            { name: 'shortDescription', type: 'textarea', localized: true },
            { name: 'description', type: 'richText', localized: true },
            { name: 'destination', type: 'relationship', relationTo: 'destinations', required: true },
            {
              type: 'row',
              fields: [
                { name: 'priceFrom', label: 'Precio desde (USD)', type: 'number', min: 0, admin: { width: '33%' } },
                { name: 'bedrooms', label: 'Habitaciones', type: 'number', min: 0, admin: { width: '33%' } },
                { name: 'area', label: 'Área (m²)', type: 'number', min: 0, admin: { width: '33%' } },
              ],
            },
            {
              name: 'status',
              label: 'Estado del proyecto',
              type: 'select',
              enumName: 'enum_projects_project_status',
              required: true,
              options: [
                { label: 'Preventa', value: 'presale' },
                { label: 'En construcción', value: 'construction' },
                { label: 'Entregado', value: 'delivered' },
              ],
            },
            { name: 'featured', label: 'Destacado', type: 'checkbox', defaultValue: false },
            {
              type: 'collapsible',
              label: 'Imágenes del proyecto',
              admin: { initCollapsed: true },
              fields: [
                localeTabs('imagesLocaleTabs'),
                {
                  name: 'mainImage',
                  label: 'Imagen principal',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                  localized: true,
                  admin: { hidden: true },
                },
                {
                  name: 'mainImagePreview',
                  type: 'ui',
                  admin: {
                    components: {
                      Field: '@/components/admin/MainImagePicker#MainImagePreview',
                    },
                  },
                },
                {
                  name: 'gallery',
                  label: 'Galería',
                  type: 'upload',
                  relationTo: 'media',
                  hasMany: true,
                  localized: true,
                },
                {
                  name: 'mainImagePicker',
                  type: 'ui',
                  admin: {
                    components: {
                      Field: '@/components/admin/MainImagePicker#MainImagePicker',
                    },
                  },
                },
              ],
            },
            {
              type: 'collapsible',
              label: 'Amenidades del proyecto',
              admin: { initCollapsed: false },
              fields: [
                localeTabs('amenitiesLocaleTabs'),
                {
                  name: 'amenities',
                  label: 'Amenidades',
                  type: 'relationship',
                  relationTo: 'amenities',
                  hasMany: true,
                  admin: {
                    description: 'Selecciona las amenidades disponibles para este proyecto.',
                    components: {
                      Field: '@/components/admin/ProjectAmenityPicker#ProjectAmenityPicker',
                    },
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            localeTabs('seoLocaleTabs'),
            { name: 'seoTitle', label: 'Título SEO', type: 'text', localized: true },
            { name: 'seoDescription', label: 'Descripción SEO', type: 'textarea', localized: true },
          ],
        },
      ],
    },
  ],
}
