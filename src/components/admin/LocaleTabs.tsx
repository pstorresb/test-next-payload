'use client'

import {
  useConfig,
  useLocale,
  useRouteTransition,
} from '@payloadcms/ui'
import { useRouter, useSearchParams } from 'next/navigation'

import './LocaleTabs.scss'

const localeNames: Record<string, string> = {
  es: 'Español',
  en: 'English',
}

export function LocaleTabs() {
  const { config } = useConfig()
  const locale = useLocale()
  const { startRouteTransition } = useRouteTransition()
  const router = useRouter()
  const searchParams = useSearchParams()

  if (!config.localization) return null

  const changeLocale = (code: string) => {
    if (code === locale.code) return

    const nextParams = new URLSearchParams(searchParams.toString())
    nextParams.set('locale', code)
    startRouteTransition(() => router.push(`?${nextParams.toString()}`))
  }

  return (
    <div className="inline-locale-tabs" aria-label="Idioma del contenido">
      {config.localization.locales.map((option) => (
        <button
          aria-pressed={locale.code === option.code}
          className={locale.code === option.code ? 'inline-locale-tabs__button inline-locale-tabs__button--active' : 'inline-locale-tabs__button'}
          key={option.code}
          onClick={() => changeLocale(option.code)}
          type="button"
        >
          {localeNames[option.code] || option.code.toUpperCase()}
          <span className="inline-locale-tabs__dot" aria-hidden="true" />
        </button>
      ))}
    </div>
  )
}
