import type { FormFieldConfig } from '../ui/FormBuilder'
import type { PersonFormValues } from '../../types/person'
import { onlyDigits } from '../../utils/format'
import {
  EMAIL_PATTERN,
  NAME_MAX_LENGTH,
  NAME_PATTERN,
  PHONE_LENGTH,
  PHONE_PATTERN,
  notBlank,
} from '../../utils/validators'

const nameRules = (label: string) => ({
  required: `${label} es obligatorio`,
  validate: { notBlank: notBlank(`${label} es obligatorio`) },
  maxLength: { value: NAME_MAX_LENGTH, message: `Máximo ${NAME_MAX_LENGTH} caracteres` },
  pattern: { value: NAME_PATTERN, message: 'Solo se permiten letras y espacios' },
})

// Configuración del formulario de personas; recibe el validador de correo duplicado
export const buildPersonFields = (
  isEmailTaken: (email: string) => boolean,
): FormFieldConfig<PersonFormValues>[] => [
  {
    name: 'firstName',
    label: 'Nombre(s)',
    autoComplete: 'given-name',
    span: 'half',
    maxLength: NAME_MAX_LENGTH,
    rules: nameRules('El nombre'),
  },
  {
    name: 'lastName',
    label: 'Apellidos',
    autoComplete: 'family-name',
    span: 'half',
    maxLength: NAME_MAX_LENGTH,
    rules: nameRules('El apellido'),
  },
  {
    name: 'email',
    label: 'Correo electrónico',
    type: 'email',
    autoComplete: 'email',
    placeholder: 'usuario@dominio.com',
    rules: {
      required: 'El correo es obligatorio',
      pattern: { value: EMAIL_PATTERN, message: 'Ingresa un correo válido (ej. usuario@dominio.com)' },
      validate: { unique: (value) => !isEmailTaken(value) || 'Este correo ya está registrado' },
    },
  },
  {
    name: 'phone',
    label: 'Teléfono',
    type: 'tel',
    autoComplete: 'tel-national',
    inputMode: 'numeric',
    placeholder: '5512345678',
    helperText: `${PHONE_LENGTH} dígitos, sin espacios ni guiones`,
    maxLength: PHONE_LENGTH,
    transform: onlyDigits,
    rules: {
      required: 'El teléfono es obligatorio',
      pattern: { value: PHONE_PATTERN, message: `El teléfono debe tener exactamente ${PHONE_LENGTH} dígitos` },
    },
  },
]
