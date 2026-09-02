'use client'

import { useEffect, useState } from 'react'

import './ProjectTitleCell.scss'

type MediaReference = number | string | { id?: number | string }
type MediaDocument = { filename?: string; thumbnailURL?: string; url?: string }

const mediaId = (value: MediaReference | null | undefined) =>
  typeof value === 'object' ? value?.id : value

export function ProjectTitleCell({ cellData, rowData }: { cellData?: string; rowData?: { mainImage?: MediaReference } }) {
  const id = mediaId(rowData?.mainImage)
  const [media, setMedia] = useState<MediaDocument | null>(null)

  useEffect(() => {
    if (id === undefined || id === null) return

    let cancelled = false
    void fetch(`/api/media/${id}`)
      .then((response) => (response.ok ? response.json() : null))
      .then((document: MediaDocument | null) => {
        if (!cancelled) setMedia(document)
      })
      .catch(() => undefined)

    return () => {
      cancelled = true
    }
  }, [id])

  const source = media?.thumbnailURL || media?.url

  return (
    <span className="project-title-cell">
      {source ? <img alt="" className="project-title-cell__image" src={source} /> : <span className="project-title-cell__placeholder">IMG</span>}
      <span>{cellData || 'Sin título'}</span>
    </span>
  )
}
