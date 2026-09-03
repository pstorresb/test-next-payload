'use client'

import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'

type Media = {
  url?: string | null
  alt?: string | null
  mimeType?: string | null
  sizes?: {
    large?: { url?: string | null } | null
    card?: { url?: string | null } | null
  } | null
}

export type HomeHeroSlide = {
  id?: string | number | null
  eyebrow?: string | null
  title?: string | null
  subtitle?: string | null
  mediaType?: 'image' | 'video' | null
  desktopMedia?: Media | null
  mobileMedia?: Media | null
  videoPoster?: Media | null
}

export type HomeHeroData = {
  enabled?: boolean | null
  slides?: HomeHeroSlide[] | null
}

function mediaURL(media?: Media | null) {
  return media?.url || media?.sizes?.large?.url || media?.sizes?.card?.url || null
}

function ArrowIcon({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none">
      <path
        d={direction === 'left' ? 'm14.5 5-7 7 7 7' : 'm9.5 5 7 7-7 7'}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none">
      <circle cx="10.8" cy="10.8" r="6.3" stroke="currentColor" strokeWidth="1.4" />
      <path d="m16 16 4.4 4.4" stroke="currentColor" strokeLinecap="round" strokeWidth="1.4" />
    </svg>
  )
}

function ChevronDown() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="none">
      <path d="m6 9 6 6 6-6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
    </svg>
  )
}

export default function HomeSlider({ hero }: { hero: HomeHeroData | null | undefined }) {
  const slides = hero?.slides?.filter(Boolean) ?? []
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: slides.length > 1, align: 'start' })

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  useEffect(() => {
    if (!emblaApi) return

    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap())
    onSelect()
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)

    return () => {
      emblaApi.off('select', onSelect)
      emblaApi.off('reInit', onSelect)
    }
  }, [emblaApi])

  if (!hero?.enabled || slides.length === 0) return null

  return (
    <section className="relative isolate overflow-hidden bg-slate-950 text-white" aria-label="Proyectos destacados">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide, index) => {
            const desktopURL = mediaURL(slide.desktopMedia)
            const mobileURL = mediaURL(slide.mobileMedia) || desktopURL
            const posterURL = mediaURL(slide.videoPoster)
            const isVideo = slide.mediaType === 'video' || slide.desktopMedia?.mimeType?.startsWith('video/')

            return (
              <article className="relative min-w-0 flex-[0_0_100%]" key={slide.id ?? index}>
                <div className="relative min-h-[620px] md:min-h-[680px]">
                  {isVideo && desktopURL ? (
                    <video
                      aria-label={slide.desktopMedia?.alt || slide.title || 'Video del proyecto'}
                      autoPlay
                      className="absolute inset-0 h-full w-full object-cover"
                      loop
                      muted
                      playsInline
                      poster={posterURL || undefined}
                    >
                      <source media="(max-width: 767px)" src={mobileURL || desktopURL} type="video/mp4" />
                      <source src={desktopURL} type={slide.desktopMedia?.mimeType || 'video/mp4'} />
                    </video>
                  ) : desktopURL ? (
                    <picture>
                      {mobileURL && mobileURL !== desktopURL ? <source media="(max-width: 767px)" srcSet={mobileURL} /> : null}
                      <img
                        alt={slide.desktopMedia?.alt || slide.title || 'Imagen del proyecto'}
                        className="absolute inset-0 h-full w-full object-cover"
                        src={desktopURL}
                      />
                    </picture>
                  ) : null}

                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,12,31,0.38)_0%,rgba(2,12,31,0.18)_42%,rgba(2,12,31,0.72)_100%)]" />

                  <div className="relative z-10 mx-auto flex min-h-[620px] max-w-7xl flex-col items-center justify-center px-6 pb-20 pt-24 text-center md:min-h-[680px] md:px-16">
                    <div className="max-w-4xl">
                      {slide.eyebrow ? <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.18em] text-white/90 md:text-xs">{slide.eyebrow}</p> : null}
                      {slide.title ? <h1 className="text-4xl font-semibold leading-[1.08] tracking-[-0.03em] sm:text-5xl md:text-6xl">{slide.title}</h1> : null}
                      {slide.subtitle ? <p className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-white/90 md:text-base">{slide.subtitle}</p> : null}

                      <form
                        className="mx-auto mt-10 flex w-full max-w-2xl flex-col rounded-full bg-white p-1.5 text-slate-700 shadow-2xl shadow-slate-950/30 sm:flex-row sm:items-center"
                        onSubmit={(event) => event.preventDefault()}
                        role="search"
                      >
                        <label className="flex min-h-11 flex-1 items-center gap-3 px-4 text-left text-xs text-slate-500">
                          <SearchIcon />
                          <span className="sr-only">Buscar proyecto</span>
                          <input className="w-full bg-transparent outline-none placeholder:text-slate-500" placeholder="Buscar proyecto" type="search" />
                        </label>
                        <label className="flex min-h-11 items-center gap-2 border-t border-slate-200 px-4 text-left text-xs text-slate-500 sm:border-l sm:border-t-0">
                          <span className="sr-only">Seleccionar destino</span>
                          <select className="w-full appearance-none bg-transparent outline-none" defaultValue="">
                            <option disabled value="">Seleccionar destino</option>
                            <option value="punta-cana">Punta Cana</option>
                            <option value="santo-domingo">Santo Domingo</option>
                          </select>
                          <ChevronDown />
                        </label>
                        <button className="min-h-11 rounded-full bg-slate-950 px-7 text-xs font-medium text-white transition hover:bg-slate-800" type="submit">
                          Buscar
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>

      <>
          <button aria-label="Slide anterior" className="absolute left-6 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 text-white transition hover:bg-white hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-50 md:left-10" disabled={slides.length <= 1} onClick={scrollPrev} type="button">
            <ArrowIcon direction="left" />
          </button>
          <button aria-label="Siguiente slide" className="absolute right-6 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 text-white transition hover:bg-white hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-50 md:right-10" disabled={slides.length <= 1} onClick={scrollNext} type="button">
            <ArrowIcon direction="right" />
          </button>
          {slides.length > 1 ? <div className="absolute bottom-7 right-8 z-20 flex gap-2" role="tablist" aria-label="Seleccionar slide">
            {slides.map((slide, index) => (
              <button
                aria-label={`Ir al slide ${index + 1}`}
                aria-selected={index === selectedIndex}
                className={`h-1 rounded-full transition-all ${index === selectedIndex ? 'w-8 bg-white' : 'w-2 bg-white/50'}`}
                key={slide.id ?? index}
                onClick={() => emblaApi?.scrollTo(index)}
                role="tab"
                type="button"
              />
            ))}
          </div> : null}
      </>

      <div className="pointer-events-none absolute bottom-7 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] font-medium uppercase tracking-[0.16em] text-white/90">
        <span>Scroll down</span>
        <span className="flex h-6 w-10 items-center justify-center rounded-full bg-white/20">
          <ChevronDown />
        </span>
      </div>
    </section>
  )
}
