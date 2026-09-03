import type { CollectionConfig } from 'payload'

export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  labels: { singular: 'Solicitud de contacto', plural: 'Solicitudes de contacto' },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['firstName', 'lastName', 'email', 'status', 'createdAt'],
    group: 'Leads',
  },
  access: {
    create: () => true,
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    { name: 'firstName', label: 'Nombre', type: 'text', required: true },
    { name: 'lastName', label: 'Apellido', type: 'text' },
    { name: 'email', label: 'Correo electrónico', type: 'email', required: true },
    { name: 'country', label: 'País', type: 'text' },
    { name: 'phone', label: 'Teléfono', type: 'text' },
    { name: 'reason', label: 'Motivo', type: 'text' },
    { name: 'message', label: 'Mensaje', type: 'textarea', required: true },
    { name: 'locale', label: 'Idioma', type: 'select', options: [{ label: 'Español', value: 'es' }, { label: 'English', value: 'en' }] },
    { name: 'sourcePage', label: 'Página de origen', type: 'text' },
    { name: 'project', label: 'Proyecto', type: 'relationship', relationTo: 'projects' },
    { name: 'destination', label: 'Destino', type: 'relationship', relationTo: 'destinations' },
    {
      name: 'status', label: 'Estado', type: 'select', required: true, defaultValue: 'new', options: [
        { label: 'Nueva', value: 'new' },
        { label: 'Contactada', value: 'contacted' },
        { label: 'Calificada', value: 'qualified' },
        { label: 'Cerrada', value: 'closed' },
      ],
    },
  ],
}
