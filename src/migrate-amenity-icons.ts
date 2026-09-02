import 'dotenv/config'
import config from '@payload-config'
import { getPayload } from 'payload'

const legacyIcons: Record<string, string> = {
  '🏊': 'pool',
  '🏋️': 'gym',
  '🏋': 'gym',
  '🛡️': 'security',
  '🛡': 'security',
  '🛝': 'baby',
}

async function run() {
  const payload = await getPayload({ config })
  const amenities = await payload.find({ collection: 'amenities', depth: 0, limit: 100 })
  let migrated = 0

  for (const amenity of amenities.docs) {
    const icon = typeof amenity.icon === 'string' ? legacyIcons[amenity.icon] : undefined
    if (!icon) continue

    await payload.update({ collection: 'amenities', id: amenity.id, data: { icon } })
    migrated += 1
  }

  payload.logger.info(`Amenidades migradas: ${migrated}`)
}

run().then(() => process.exit(0)).catch((error) => {
  console.error(error)
  process.exit(1)
})
