'use client'

import { useField, useLocale } from '@payloadcms/ui'
import { useEffect, useMemo, useState } from 'react'

import { getAmenityIconComponent } from '@/lib/amenity-icons'

import './ProjectAmenityPicker.scss'

type Amenity = {
  id: number | string
  name?: string
  icon?: string
}

type RelationshipValue = Array<number | string | Amenity> | null | undefined

const getRelationshipId = (item: number | string | Amenity) =>
  typeof item === 'object' ? item?.id : item

export function ProjectAmenityPicker() {
  const { code } = useLocale()
  const { setValue, value } = useField<RelationshipValue>()
  const [amenities, setAmenities] = useState<Amenity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    let cancelled = false

    const loadAmenities = async () => {
      setLoading(true)
      setError(false)
      try {
        const params = new URLSearchParams({
          depth: '0',
          fallbackLocale: 'false',
          limit: '100',
          locale: code,
          sort: 'name',
        })
        const response = await fetch(`/api/amenities?${params.toString()}`)
        if (!response.ok) throw new Error('Unable to load amenities')
        const result = (await response.json()) as { docs?: Amenity[] }
        if (!cancelled) setAmenities(result.docs || [])
      } catch {
        if (!cancelled) setError(true)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    void loadAmenities()
    return () => {
      cancelled = true
    }
  }, [code])

  const selectedIds = useMemo(
    () => new Set((Array.isArray(value) ? value : []).map(getRelationshipId).filter(Boolean).map(String)),
    [value],
  )

  const toggle = (id: number | string) => {
    const current = Array.isArray(value) ? value : []
    const next = current.filter((item) => String(getRelationshipId(item)) !== String(id))
    if (next.length === current.length) next.push(id)
    setValue(next)
  }

  if (loading) return <p className="project-amenity-picker__status">Cargando amenidades…</p>
  if (error) return <p className="project-amenity-picker__status project-amenity-picker__status--error">No se pudieron cargar las amenidades.</p>
  if (!amenities.length) return <p className="project-amenity-picker__status">No hay amenidades creadas todavía.</p>

  return (
    <div className="project-amenity-picker" role="group" aria-label="Amenidades del proyecto">
      <p className="project-amenity-picker__help">Selecciona una o varias. El icono y el nombre se muestran según el idioma activo.</p>
      <div className="project-amenity-picker__grid">
        {amenities.map((amenity) => {
          const Icon = getAmenityIconComponent(amenity.icon)
          const selected = selectedIds.has(String(amenity.id))
          return (
            <label className={`project-amenity-picker__option${selected ? ' project-amenity-picker__option--selected' : ''}`} key={amenity.id}>
              <input checked={selected} onChange={() => toggle(amenity.id)} type="checkbox" />
              <span className="project-amenity-picker__icon"><Icon aria-hidden="true" /></span>
              <span className="project-amenity-picker__name">{amenity.name || 'Sin nombre'}</span>
            </label>
          )
        })}
      </div>
    </div>
  )
}
