# CMS y API de Payload

## Estructura del admin

```text
Administración
└── Usuarios

Recursos
└── Media

Proyectos
├── Proyectos
├── Amenidades
└── Destinos

Home
├── 01 Hero
├── 02 Portafolio
├── 03 Trayectoria
├── 04 Banner CEO
├── 05 Noval Properties
├── 06 Destinos
├── 07 Branded Residences
├── 08 Lifestyle
├── 09 Testimonios
├── 10 Contacto
└── 11 SEO

Sitio
├── Header
├── Footer
├── Información de contacto
└── Configuración del sitio

Leads
└── Solicitudes de contacto
```

Los campos editoriales nuevos están localizados para `es` y `en`. Las relaciones estructurales, flags, valores numéricos y estados no se localizan.

## REST

Sustituye `PAYLOAD_URL` por la URL pública de Payload. Todos los endpoints Home aceptan `locale=es` o `locale=en`.

| Componente | Español | English | Depth |
| --- | --- | --- | --- |
| Hero | `/api/globals/home-hero?locale=es` | `/api/globals/home-hero?locale=en` | 0 |
| Portafolio | `/api/globals/home-portfolio?locale=es&depth=2` | `/api/globals/home-portfolio?locale=en&depth=2` | 2 |
| Trayectoria | `/api/globals/home-trajectory?locale=es` | `/api/globals/home-trajectory?locale=en` | 0 |
| Banner CEO | `/api/globals/home-ceo-banner?locale=es` | `/api/globals/home-ceo-banner?locale=en` | 0 |
| Noval Properties | `/api/globals/home-noval-properties?locale=es` | `/api/globals/home-noval-properties?locale=en` | 0 |
| Destinos | `/api/globals/home-destinations?locale=es&depth=2` | `/api/globals/home-destinations?locale=en&depth=2` | 2 |
| Branded Residences | `/api/globals/home-branded-residences?locale=es` | `/api/globals/home-branded-residences?locale=en` | 0 |
| Lifestyle | `/api/globals/home-lifestyle?locale=es` | `/api/globals/home-lifestyle?locale=en` | 0 |
| Testimonios | `/api/globals/home-testimonials?locale=es` | `/api/globals/home-testimonials?locale=en` | 0 |
| Contacto | `/api/globals/home-contact?locale=es` | `/api/globals/home-contact?locale=en` | 0 |
| SEO | `/api/globals/home-seo?locale=es` | `/api/globals/home-seo?locale=en` | 0 |
| Header | `/api/globals/header?locale=es` | `/api/globals/header?locale=en` | 0 |
| Footer | `/api/globals/footer?locale=es&depth=2` | `/api/globals/footer?locale=en&depth=2` | 2 |
| Información de contacto | `/api/globals/contact-settings?locale=es` | `/api/globals/contact-settings?locale=en` | 0 |
| Configuración del sitio | `/api/globals/site-settings?locale=es` | `/api/globals/site-settings?locale=en` | 0 |

Destinos:

```text
GET /api/destinations?locale=es
GET /api/destinations/:id?locale=es
GET /api/destinations?where[slug][equals]=santo-domingo&locale=es
```

La sintaxis `where[slug][equals]` es la sintaxis REST de Payload 3. Para crear un lead público:

```http
POST /api/contact-submissions
Content-Type: application/json

{
  "firstName": "Ana",
  "lastName": "Pérez",
  "email": "ana@example.com",
  "country": "Ecuador",
  "phone": "+593 99 000 0000",
  "reason": "invest",
  "message": "Quiero conocer las opciones de inversión.",
  "locale": "es",
  "sourcePage": "home",
  "project": 1,
  "destination": 2
}
```

El POST público solamente crea registros. Listar, leer, actualizar o eliminar solicitudes exige un usuario autenticado.

## Consumo desde Next.js

```ts
const api = process.env.PAYLOAD_URL!
const get = <T>(path: string) => fetch(`${api}${path}`).then((res) => {
  if (!res.ok) throw new Error(`Payload request failed: ${res.status}`)
  return res.json() as Promise<T>
})

export const getHome = (locale: 'es' | 'en') => Promise.all([
  get(`/api/globals/home-hero?locale=${locale}`),
  get(`/api/globals/home-portfolio?locale=${locale}&depth=2`),
  get(`/api/globals/home-trajectory?locale=${locale}`),
  get(`/api/globals/home-ceo-banner?locale=${locale}`),
  get(`/api/globals/home-noval-properties?locale=${locale}`),
  get(`/api/globals/home-destinations?locale=${locale}&depth=2`),
  get(`/api/globals/home-branded-residences?locale=${locale}`),
  get(`/api/globals/home-lifestyle?locale=${locale}`),
  get(`/api/globals/home-testimonials?locale=${locale}`),
  get(`/api/globals/home-contact?locale=${locale}`),
  get(`/api/globals/home-seo?locale=${locale}`),
])
```

Los globals devuelven directamente sus campos. Por ejemplo, Hero devuelve una forma como:

```json
{
  "enabled": true,
  "slides": [{ "eyebrow": "Descubre", "title": "Tu próximo hogar", "mediaType": "image", "desktopMedia": 12 }],
  "search": { "projectPlaceholder": "Proyecto", "destinationPlaceholder": "Destino", "buttonLabel": "Buscar" },
  "updatedAt": "2026-09-03T00:00:00.000Z",
  "createdAt": "2026-09-03T00:00:00.000Z"
}
```

Con `depth=2`, las relaciones de Portafolio, Destinos y Footer incluyen los documentos relacionados en vez de solo sus IDs. Los endpoints de Destinations devuelven `{ docs, totalDocs, ... }` para listados y un documento directo para `/:id`.

### Formas de respuesta principales

| Endpoint | Campos de contenido principales |
| --- | --- |
| `home-hero` | `enabled`, `slides[]`, `search` |
| `home-portfolio` | `enabled`, `eyebrow`, `title`, `description`, `projects[]` |
| `home-trajectory` | `enabled`, `title`, `highlightedTitle`, `description`, `stats[]`, `backgroundImage`, `style` |
| `home-ceo-banner` | `enabled`, `backgroundImage`, `eyebrow`, `quote`, `authorName`, `authorPosition` |
| `home-noval-properties` | `enabled`, `eyebrow`, `title`, `highlightedTitle`, `description`, `items[]` |
| `home-destinations` | `enabled`, `eyebrow`, `title`, `description`, `destinations[]` |
| `home-branded-residences` | `enabled`, títulos segmentados, `description`, `logos[]`, `mainImage`, `mobileImage` |
| `home-lifestyle` | `enabled`, `eyebrow`, `title`, `description`, `image`, `mobileImage`, `cta` |
| `home-testimonials` | `enabled`, `eyebrow`, `title`, `description`, `items[]` |
| `home-contact` | `enabled`, textos, imágenes, `form`, `reasons[]` |
| `home-seo` | `metaTitle`, `metaDescription`, `ogImage`, `noIndex` |
| `header` / `footer` | navegación o columnas, CTA/newsletter y enlaces relacionados |
| `contact-settings` / `site-settings` | datos de contacto/redes o nombre, favicon y SEO predeterminado |

## Esquema de base de datos y migraciones

El proyecto no tenía una estrategia de migraciones configurada. Payload 3 con el adaptador PostgreSQL actual sincroniza el esquema de desarrollo al iniciar la aplicación (`pushDevSchema`); no se creó una migración vacía. Para una futura operación de producción, adopta migraciones versionadas antes de desactivar ese flujo, sin reiniciar ni eliminar la base de datos existente.
