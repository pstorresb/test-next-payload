'use client'

import { useField } from '@payloadcms/ui'

import { AMENITY_ICON_OPTIONS, getAmenityIconComponent, isAmenityIconKey } from '@/lib/amenity-icons'

import './AmenityIconPicker.scss'

export function AmenityIconPicker() {
  const { setValue, value } = useField<string>()
  const selected = typeof value === 'string' ? value : ''
  const CurrentIcon = getAmenityIconComponent(selected)

  return (
    <section className="amenity-icon-picker">
      <div className="amenity-icon-picker__current">
        <span className="amenity-icon-picker__current-icon"><CurrentIcon /></span>
        <div>
          <p className="amenity-icon-picker__label">Icono</p>
          <p className="amenity-icon-picker__help">{isAmenityIconKey(selected) ? selected : 'Selecciona un icono del catálogo'}</p>
        </div>
      </div>
      <div className="amenity-icon-picker__grid" role="list" aria-label="Catálogo de iconos">
        {AMENITY_ICON_OPTIONS.map(({ Icon, label, value: option }) => (
          <button
            aria-label={label}
            aria-pressed={selected === option}
            className={`amenity-icon-picker__option${selected === option ? ' amenity-icon-picker__option--selected' : ''}`}
            key={option}
            onClick={() => setValue(option)}
            title={label}
            type="button"
          >
            <Icon />
          </button>
        ))}
      </div>
      <p className="amenity-icon-picker__footer">El proyecto guarda una clave como <code>pool</code> o <code>security</code>; el frontend renderiza el icono correspondiente.</p>
    </section>
  )
}
