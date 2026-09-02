import { getAmenityIconComponent, isAmenityIconKey } from '@/lib/amenity-icons'

import './AmenityIconCell.scss'

export function AmenityIconCell({ cellData }: { cellData?: string }) {
  const Icon = getAmenityIconComponent(cellData)

  return (
    <span className="amenity-icon-cell">
      <span className="amenity-icon-cell__icon"><Icon aria-hidden="true" /></span>
      <span>{isAmenityIconKey(cellData) ? cellData : cellData || 'Sin icono'}</span>
    </span>
  )
}
