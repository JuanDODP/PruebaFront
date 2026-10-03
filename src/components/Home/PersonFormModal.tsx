import { useMemo } from 'react'
import { FormBuilder } from '../ui/FormBuilder'
import { Modal } from '../../utils/modal/Modal'
import type { Person, PersonFormValues } from '../../types/person'
import { buildPersonFields } from './personFormFields'

interface PersonFormModalProps {
  open: boolean
  // Si viene una persona el formulario está en modo edición; si no, en modo alta
  person: Person | null
  isEmailTaken: (email: string, excludeId?: string) => boolean
  onSubmit: (values: PersonFormValues) => void
  onClose: () => void
}

const EMPTY_VALUES: PersonFormValues = { firstName: '', lastName: '', email: '', phone: '' }

export const PersonFormModal = ({ open, person, isEmailTaken, onSubmit, onClose }: PersonFormModalProps) => {
  const isEditing = person !== null

  const fields = useMemo(() => buildPersonFields((email) => isEmailTaken(email, person?.id)), [isEmailTaken, person])

  const defaultValues = person
    ? { firstName: person.firstName, lastName: person.lastName, email: person.email, phone: person.phone }
    : EMPTY_VALUES

  return (
    <Modal open={open} title={isEditing ? 'Editar persona' : 'Nueva persona'} onClose={onClose}>
      <FormBuilder
        // La key reinicia el formulario al cambiar entre alta y edición de distintas personas
        key={person?.id ?? 'new'}
        fields={fields}
        defaultValues={defaultValues}
        onSubmit={onSubmit}
        onCancel={onClose}
        submitLabel={isEditing ? 'Guardar cambios' : 'Registrar'}
        requireChanges={isEditing}
      />
    </Modal>
  )
}
