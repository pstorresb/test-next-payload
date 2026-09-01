# Demo inmobiliaria — Next.js + Payload CMS + PostgreSQL

Proof of concept con Payload integrado en Next.js. Incluye admin, CRUD, cargas locales, contenido ES/EN, relaciones, drafts y un frontend mínimo que solo lista proyectos publicados.

## Requisitos

- Node.js 20.9 o superior (Node 22 recomendado)
- npm
- Docker Desktop con Docker Compose

## Puesta en marcha

1. Copia `.env.example` como `.env`.
2. Cambia `POSTGRES_PASSWORD`, actualiza esa misma contraseña dentro de `DATABASE_URL` y define un `PAYLOAD_SECRET` largo y aleatorio.
3. Instala dependencias y levanta PostgreSQL:

```bash
npm install
docker compose up -d
```

4. Crea el administrador y los datos demo:

```bash
npm run seed
```

5. Inicia la aplicación:

```bash
npm run dev
```

Abre:

- Admin: http://localhost:3000/admin
- Español: http://localhost:3000/es
- English: http://localhost:3000/en

Las credenciales iniciales son `PAYLOAD_ADMIN_EMAIL` y `PAYLOAD_ADMIN_PASSWORD` de tu `.env`. Después del seed puedes cambiarlas desde Payload Admin.

## PostgreSQL

El `docker-compose.yml` crea PostgreSQL 16, publica el puerto `5432` y conserva los datos en el volumen `payload_postgres_data`. Payload lee exclusivamente `DATABASE_URL`; no hay credenciales en el código fuente.

Si ya tienes otro PostgreSQL ocupando `5432`, cambia el puerto izquierdo en Compose, por ejemplo `5433:5432`, y usa `localhost:5433` en `DATABASE_URL`.

Comandos útiles:

```bash
docker compose ps
docker compose logs postgres
docker compose stop
docker compose down
```

`docker compose down` no borra el volumen. Para borrar también todos los datos locales debes ejecutar deliberadamente `docker compose down -v`.

## Flujo editorial

- En `/admin`, usa el selector de locale para editar el mismo documento en Español o English.
- `title`, descripciones, SEO, destino, amenidades y texto alternativo de imágenes admiten traducciones.
- Precio, habitaciones, área, imágenes, estado y relaciones se comparten entre idiomas.
- Projects tiene versiones y drafts. El frontend consulta explícitamente `_status = published`, por lo que no muestra borradores.
- Los archivos subidos se guardan en `media/` y Payload genera tamaños `thumbnail`, `card` y `large` con Sharp.

## Build de producción

Con PostgreSQL activo y `.env` configurado:

```bash
npm run generate:types
npm run build
npm start
```

Para un despliegue real conviene versionar migraciones de base de datos y mover los uploads a almacenamiento persistente/objeto. El almacenamiento local está elegido intencionalmente para esta demo.
