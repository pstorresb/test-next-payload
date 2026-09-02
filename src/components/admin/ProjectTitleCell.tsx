'use client'

import { useEffect, useState } from 'react'

import './ProjectTitleCell.scss'

type MediaReference = number | string | { id?: number | string }
type MediaDocument = { filename?: string; thumbnailURL?: string; url?: string }

const mediaId = (value: MediaReference | null | undefined) =>
  typeof value === 'object' ? value?.id : value

type ProjectTitleCellProps = {
  cellData?: string
  collectionSlug?: string
  link?: boolean
  linkURL?: string
  onClick?: (args: { cellData: unknown; collectionSlug: string; rowData: unknown }) => void
  rowData?: { id?: number | string; mainImage?: MediaReference }
}

export function ProjectTitleCell({ cellData, collectionSlug, link, linkURL, onClick, rowData }: ProjectTitleCellProps) {
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

  const content = (
    <span className="project-title-cell">
      {source ? <img alt="" className="project-title-cell__image" src={source} /> : <span className="project-title-cell__placeholder">IMG</span>}
      <span>{cellData || 'Sin título'}</span>
    </span>
  )

  const detailURL = linkURL || (link && rowData?.id ? `/admin/collections/${collectionSlug || 'projects'}/${rowData.id}` : undefined)

  if (!detailURL && !onClick) return content

  return (
    <a
      className="project-title-cell__link"
      href={detailURL || '#'}
      onClick={(event) => {
        if (!onClick || !collectionSlug) return
        event.preventDefault()
        onClick({ cellData, collectionSlug, rowData })
      }}
    >
      {content}
    </a>
  )
}
