import type { CollectionConfig, FieldHook } from 'payload'

const filenameAsAlt: FieldHook = ({ data, siblingData, value }) => {
  if (typeof value === 'string' && value.trim()) return value

  const filename = siblingData?.filename || data?.filename
  if (typeof filename !== 'string') return value

  return filename.replace(/\.[^/.]+$/, '').replace(/[-_]+/g, ' ').trim()
}

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    useAsTitle: 'alt',
    defaultColumns: ['filename', 'alt', 'updatedAt'],
    group: 'Contenido',
  },
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  upload: {
    staticDir: 'media',
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
    imageSizes: [
      { name: 'thumbnail', width: 320, height: 240, position: 'centre' },
      { name: 'card', width: 768, height: 512, position: 'centre' },
      { name: 'large', width: 1600, height: 1067, position: 'centre' },
    ],
    adminThumbnail: 'thumbnail',
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      localized: true,
      hooks: {
        beforeValidate: [filenameAsAlt],
      },
      admin: {
        description: 'Se completa automáticamente con el nombre del archivo. Puede editarlo para una descripción más útil.',
      },
    },
  ],
}
