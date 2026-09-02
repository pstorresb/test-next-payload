'use client'

import { useField, useFormFields } from '@payloadcms/ui'

import './MainImagePicker.scss'

type MediaValue = string | { id?: string; url?: string; filename?: string; alt?: string }

const getId = (value: MediaValue | null | undefined) =>
  typeof value === 'string' ? value : value?.id

export function MainImagePicker() {
  const gallery = useFormFields(([fields]) => fields?.gallery?.value as MediaValue[] | undefined)
  const { value: selected, setValue } = useField<MediaValue | null>({ path: 'mainImage' })

  const images = Array.isArray(gallery) ? gallery : []
  const selectedId = getId(selected)

  if (images.length === 0) {
    return (
      <div className="main-image-picker main-image-picker--empty">
        Agrega imágenes a la galería para poder seleccionar la principal.
      </div>
    )
  }

  return (
    <div className="main-image-picker">
      <p className="main-image-picker__label">Seleccionar como principal</p>
      <div className="main-image-picker__grid">
        {images.map((image, index) => {
          const id = getId(image)
          const label = typeof image === 'string' ? `Imagen ${index + 1}` : image.filename || `Imagen ${index + 1}`
          const url = typeof image === 'string' ? undefined : image.url
          const isSelected = Boolean(id && id === selectedId)

          return (
            <button
              aria-pressed={isSelected}
              className={`main-image-picker__item${isSelected ? ' main-image-picker__item--selected' : ''}`}
              key={id || index}
              onClick={() => setValue(image)}
              type="button"
            >
              <span className="main-image-picker__radio" aria-hidden="true">{isSelected ? '✓' : ''}</span>
              {url ? <img alt={typeof image === 'string' ? '' : image.alt || label} src={url} /> : <span className="main-image-picker__placeholder">IMG</span>}
              <span className="main-image-picker__name">{label}</span>
            </button>
          )
        })}
      </div>
      <p className="main-image-picker__help">La selección aplica únicamente al idioma activo.</p>
    </div>
  )
}
