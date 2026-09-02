'use client'

import { useEffect, useMemo, useState } from 'react'
import { useField, useFormFields } from '@payloadcms/ui'

import './MainImagePicker.scss'

type MediaValue = string | { id?: string; url?: string; filename?: string; alt?: string }

const getId = (value: MediaValue | null | undefined) =>
  typeof value === 'string' ? value : value?.id

function useMediaDocuments(values: MediaValue[]) {
  const ids = useMemo(() => values.map(getId).filter((id): id is string => Boolean(id)), [values])
  const idsKey = ids.join(',')
  const [documents, setDocuments] = useState<Record<string, MediaValue>>({})

  useEffect(() => {
    let cancelled = false

    void Promise.all(ids.map(async (id) => {
      try {
        const response = await fetch(`/api/media/${id}`)
        return response.ok ? (await response.json()) as MediaValue : undefined
      } catch {
        return undefined
      }
    })).then((results) => {
      if (cancelled) return
      setDocuments(Object.fromEntries(results.filter((item): item is MediaValue & { id: string } => Boolean(getId(item))).map((item) => [getId(item)!, item])))
    })

    return () => {
      cancelled = true
    }
  }, [idsKey])

  return values.map((value) => (typeof value === 'string' ? documents[value] || value : value))
}

function MediaThumbnail({ image, label }: { image: MediaValue; label: string }) {
  const url = typeof image === 'string' ? undefined : image.url
  return url ? <img alt={typeof image === 'string' ? '' : image.alt || label} src={url} /> : <span className="main-image-picker__placeholder">IMG</span>
}

export function MainImagePreview() {
  const { value: selected } = useField<MediaValue | null>({ path: 'mainImage' })
  const [media] = useMediaDocuments(selected ? [selected] : [])

  if (!selected) return <div className="main-image-preview main-image-preview--empty">Aún no hay una imagen principal. Selecciona una desde la galería.</div>

  const image = media || selected
  const label = typeof image === 'string' ? 'Imagen principal' : image.filename || 'Imagen principal'

  return (
    <section className="main-image-preview">
      <p className="main-image-preview__label">Imagen principal</p>
      <div className="main-image-preview__image"><MediaThumbnail image={image} label={label} /></div>
      <p className="main-image-preview__name">{label}</p>
      <p className="main-image-preview__help">Seleccionada desde la galería del idioma activo.</p>
    </section>
  )
}

export function MainImagePicker() {
  const gallery = useFormFields(([fields]) => fields?.gallery?.value as MediaValue[] | undefined)
  const { value: selected, setValue } = useField<MediaValue | null>({ path: 'mainImage' })
  const images = Array.isArray(gallery) ? gallery : []
  const galleryIds = images.map(getId).filter((id): id is string => Boolean(id))
  const galleryKey = galleryIds.join(',')
  const selectedId = getId(selected)
  const media = useMediaDocuments(images)

  useEffect(() => {
    if (images.length === 0) {
      if (selected) setValue(null)
      return
    }

    if (!selectedId || !galleryIds.includes(selectedId)) setValue(images[0])
  }, [galleryKey, images, selected, selectedId, setValue])

  if (images.length === 0) return <div className="main-image-picker main-image-picker--empty">Agrega imágenes a la galería para poder seleccionar la principal.</div>

  return (
    <section className="main-image-picker">
      <p className="main-image-picker__label">Seleccionar como principal</p>
      <div className="main-image-picker__grid">
        {media.map((image, index) => {
          const id = getId(image)
          const label = typeof image === 'string' ? `Imagen ${index + 1}` : image.filename || `Imagen ${index + 1}`
          const isSelected = Boolean(id && id === selectedId)

          return (
            <button aria-pressed={isSelected} className={`main-image-picker__item${isSelected ? ' main-image-picker__item--selected' : ''}`} key={id || index} onClick={() => setValue(images[index])} type="button">
              <span className="main-image-picker__radio" aria-hidden="true">{isSelected ? '✓' : ''}</span>
              <MediaThumbnail image={image} label={label} />
              <span className="main-image-picker__name">{label}</span>
            </button>
          )
        })}
      </div>
      <p className="main-image-picker__help">La selección aplica únicamente al idioma activo. Si se elimina la principal, se selecciona la primera imagen disponible.</p>
    </section>
  )
}
