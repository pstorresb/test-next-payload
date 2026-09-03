import type { GlobalConfig } from 'payload'

export const ContactSettings: GlobalConfig = {
  slug: 'contact-settings',
  label: 'Información de contacto',
  admin: { group: 'Sitio' },
  access: { read: () => true, update: ({ req }) => Boolean(req.user) },
  fields: [
    { name: 'phone', label: 'Teléfono', type: 'text' },
    { name: 'whatsapp', label: 'WhatsApp', type: 'text' },
    { name: 'email', label: 'Correo electrónico', type: 'email' },
    { name: 'address', label: 'Dirección', type: 'textarea', localized: true },
    { name: 'businessHours', label: 'Horario de atención', type: 'textarea', localized: true },
    {
      name: 'socialNetworks', label: 'Redes sociales', type: 'array', fields: [
        { name: 'platform', label: 'Plataforma', type: 'text', required: true },
        { name: 'url', label: 'URL', type: 'text', required: true },
      ],
    },
  ],
}
