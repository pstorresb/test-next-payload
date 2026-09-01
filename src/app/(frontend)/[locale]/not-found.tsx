import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="mx-auto max-w-2xl px-5 py-20">
      <h1 className="mb-4 text-3xl font-bold">Idioma no disponible</h1>
      <Link className="text-blue-700 underline" href="/es">Volver a español</Link>
    </main>
  )
}
