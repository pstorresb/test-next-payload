import type { GlobalConfig } from 'payload'

export const HomeContact: GlobalConfig = {
  slug: 'home-contact',
  label: '10 Contacto',
  admin: { group: 'Home' },
  access: { read: () => true, update: ({ req }) => Boolean(req.user) },
  fields: [
    { name: 'enabled', label: 'Habilitada', type: 'checkbox', defaultValue: true },
    { name: 'title', type: 'text', localized: true },
    { name: 'subtitle', type: 'textarea', localized: true },
    { name: 'backgroundImage', label: 'Imagen de fondo', type: 'upload', relationTo: 'media', localized: true },
    { name: 'cardImage', label: 'Imagen de tarjeta', type: 'upload', relationTo: 'media', localized: true },
    { name: 'introText', label: 'Texto introductorio', type: 'textarea', localized: true },
    {
      name: 'form', label: 'Formulario', type: 'group', fields: [
        { name: 'firstNameLabel', label: 'Etiqueta de nombre', type: 'text', localized: true },
        { name: 'lastNameLabel', label: 'Etiqueta de apellido', type: 'text', localized: true },
        { name: 'emailLabel', label: 'Etiqueta de correo', type: 'text', localized: true },
        { name: 'countryLabel', label: 'Etiqueta de país', type: 'text', localized: true },
        { name: 'phoneLabel', label: 'Etiqueta de teléfono', type: 'text', localized: true },
        { name: 'reasonLabel', label: 'Etiqueta de motivo', type: 'text', localized: true },
        { name: 'commentLabel', label: 'Etiqueta de comentario', type: 'text', localized: true },
        { name: 'submitLabel', label: 'Etiqueta de envío', type: 'text', localized: true },
        { name: 'successMessage', label: 'Mensaje de éxito', type: 'textarea', localized: true },
        { name: 'errorMessage', label: 'Mensaje de error', type: 'textarea', localized: true },
        { name: 'responseTimeText', label: 'Texto de tiempo de respuesta', type: 'text', localized: true },
        { name: 'privacyText', label: 'Texto de privacidad', type: 'textarea', localized: true },
      ],
    },
    {
      name: 'reasons', label: 'Motivos', type: 'array', fields: [
        { name: 'label', label: 'Etiqueta', type: 'text', localized: true, required: true },
        { name: 'value', label: 'Valor interno', type: 'text', required: true },
      ],
    },
  ],
}
