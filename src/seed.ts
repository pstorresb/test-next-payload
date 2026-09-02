import 'dotenv/config'
import config from '@payload-config'
import { getPayload } from 'payload'
import sharp from 'sharp'

// Seed fixture kept intentionally small; Payload validates the Lexical state on write.
const richText = (text: string): any => ({
  root: {
    type: 'root',
    children: [
      {
        type: 'paragraph',
        version: 1,
        children: [{ type: 'text', version: 1, text, detail: 0, format: 0, mode: 'normal', style: '' }],
        direction: null,
        format: '',
        indent: 0,
        textFormat: 0,
        textStyle: '',
      },
    ],
    direction: null,
    format: '',
    indent: 0,
    version: 1,
  },
})

async function placeholder(name: string, color: { r: number; g: number; b: number }) {
  const data = await sharp({
    create: { width: 1800, height: 1200, channels: 3, background: color },
  })
    .png()
    .toBuffer()

  return { data, name: `${name}.png`, mimetype: 'image/png', size: data.length }
}

async function run() {
  const payload = await getPayload({ config })
  const email = process.env.PAYLOAD_ADMIN_EMAIL
  const password = process.env.PAYLOAD_ADMIN_PASSWORD

  if (!email || !password) throw new Error('PAYLOAD_ADMIN_EMAIL y PAYLOAD_ADMIN_PASSWORD son obligatorios para el seed.')

  const existingUsers = await payload.find({ collection: 'users', where: { email: { equals: email } }, limit: 1 })
  if (existingUsers.docs.length === 0) {
    await payload.create({ collection: 'users', data: { email, password, name: 'Administrador Demo' } })
    payload.logger.info(`Administrador creado: ${email}`)
  }

  const existingProjects = await payload.find({ collection: 'projects', where: { slug: { equals: 'riviera-bay' } }, limit: 1 })
  if (existingProjects.docs.length > 0) {
    const spanishProjects = await payload.find({
      collection: 'projects',
      locale: 'es',
      fallbackLocale: false,
      depth: 0,
      limit: 100,
    })
    const existingMedia = await payload.find({ collection: 'media', depth: 0, limit: 100 })

    for (const project of spanishProjects.docs) {
      const currentMainImage = typeof project.mainImage === 'number'
        ? project.mainImage
        : project.mainImage?.id
      const fallbackMedia = existingMedia.docs.find((media) => media.filename === `${project.slug}.png`)
      const mainImage = currentMainImage || fallbackMedia?.id

      if (mainImage) {
        for (const locale of ['es', 'en'] as const) {
          await payload.update({
            collection: 'projects',
            id: project.id,
            locale,
            data: {
              mainImage,
              gallery: [mainImage],
            },
          })
        }
      }
    }

    payload.logger.info('El contenido demo ya existe; se sincronizaron las imágenes ES → EN sin crear duplicados.')
    process.exit(0)
  }

  const destinationData = [
    ['punta-cana', 'Punta Cana', 'Punta Cana', 'Playas caribeñas y complejos turísticos.', 'Caribbean beaches and resort communities.'],
    ['cap-cana', 'Cap Cana', 'Cap Cana', 'Comunidad privada de lujo junto al mar.', 'Luxury gated community by the sea.'],
    ['santo-domingo', 'Santo Domingo', 'Santo Domingo', 'Vida urbana en la capital dominicana.', 'Urban living in the Dominican capital.'],
  ] as const

  const destinationIDs: Record<string, number> = {}
  for (const [slug, esName, enName, esDescription, enDescription] of destinationData) {
    const doc = await payload.create({
      collection: 'destinations',
      locale: 'es',
      data: { slug, name: esName, description: esDescription },
    })
    await payload.update({
      collection: 'destinations',
      id: doc.id,
      locale: 'en',
      data: { name: enName, description: enDescription },
    })
    destinationIDs[slug] = doc.id
  }

  const amenityData = [
    ['Piscina', 'Swimming Pool', '🏊'],
    ['Gimnasio', 'Gym', '🏋️'],
    ['Seguridad 24/7', '24/7 Security', '🛡️'],
    ['Área infantil', 'Kids Area', '🛝'],
  ] as const

  const amenityIDs: number[] = []
  for (const [esName, enName, icon] of amenityData) {
    const doc = await payload.create({ collection: 'amenities', locale: 'es', data: { name: esName, icon } })
    await payload.update({ collection: 'amenities', id: doc.id, locale: 'en', data: { name: enName } })
    amenityIDs.push(doc.id)
  }

  const colors = [
    { r: 14, g: 116, b: 144 },
    { r: 30, g: 64, b: 175 },
    { r: 13, g: 148, b: 136 },
  ]
  const imageNames = ['riviera-bay', 'coral-gardens', 'metropolitan-tower']
  const mediaIDs: number[] = []
  for (let index = 0; index < imageNames.length; index += 1) {
    const file = await placeholder(imageNames[index], colors[index])
    const media = await payload.create({
      collection: 'media',
      locale: 'es',
      data: { alt: `Imagen de ${imageNames[index].replaceAll('-', ' ')}` },
      file,
    })
    await payload.update({
      collection: 'media',
      id: media.id,
      locale: 'en',
      data: { alt: `${imageNames[index].replaceAll('-', ' ')} image` },
    })
    mediaIDs.push(media.id)
  }

  const projects = [
    {
      slug: 'riviera-bay', destination: 'punta-cana', image: 0, priceFrom: 250000, bedrooms: 2, area: 120, status: 'presale', featured: true,
      esTitle: 'Riviera Bay', enTitle: 'Riviera Bay',
      esDescription: 'Proyecto residencial frente al mar en Punta Cana.',
      enDescription: 'Oceanfront residential development in Punta Cana.',
      amenities: amenityIDs.slice(0, 3),
    },
    {
      slug: 'coral-gardens', destination: 'cap-cana', image: 1, priceFrom: 385000, bedrooms: 3, area: 168, status: 'construction', featured: true,
      esTitle: 'Coral Gardens', enTitle: 'Coral Gardens',
      esDescription: 'Apartamentos contemporáneos rodeados de naturaleza en Cap Cana.',
      enDescription: 'Contemporary apartments surrounded by nature in Cap Cana.',
      amenities: [amenityIDs[0], amenityIDs[2], amenityIDs[3]],
    },
    {
      slug: 'metropolitan-tower', destination: 'santo-domingo', image: 2, priceFrom: 185000, bedrooms: 1, area: 78, status: 'delivered', featured: false,
      esTitle: 'Metropolitan Tower', enTitle: 'Metropolitan Tower',
      esDescription: 'Residencias urbanas listas para entregar en el centro de Santo Domingo.',
      enDescription: 'Move-in-ready urban residences in central Santo Domingo.',
      amenities: [amenityIDs[1], amenityIDs[2]],
    },
  ] as const

  for (const project of projects) {
    const created = await payload.create({
      collection: 'projects',
      locale: 'es',
      data: {
        title: project.esTitle,
        slug: project.slug,
        shortDescription: project.esDescription,
        description: richText(project.esDescription),
        destination: destinationIDs[project.destination],
        priceFrom: project.priceFrom,
        bedrooms: project.bedrooms,
        area: project.area,
        status: project.status,
        featured: project.featured,
        mainImage: mediaIDs[project.image],
        gallery: [mediaIDs[project.image]],
        amenities: [...project.amenities],
        seoTitle: project.esTitle,
        seoDescription: project.esDescription,
        _status: 'published',
      },
    })

    await payload.update({
      collection: 'projects',
      id: created.id,
      locale: 'en',
      data: {
        title: project.enTitle,
        shortDescription: project.enDescription,
        description: richText(project.enDescription),
        mainImage: mediaIDs[project.image],
        gallery: [mediaIDs[project.image]],
        seoTitle: project.enTitle,
        seoDescription: project.enDescription,
        _status: 'published',
      },
    })
  }

  payload.logger.info('Seed completado: 3 destinos, 4 amenidades, 3 proyectos publicados y sus imágenes.')
  process.exit(0)
}

await run().catch((error) => {
  console.error(error)
  process.exit(1)
})
