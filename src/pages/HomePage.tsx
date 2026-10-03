import { useDeferredValue, useMemo, useState } from 'react'
import { Paper, Stack, Typography } from '@mui/material'
import GroupOutlined from '@mui/icons-material/GroupOutlined'
import PersonAddAlt1Rounded from '@mui/icons-material/PersonAddAlt1Rounded'
import SearchOffRounded from '@mui/icons-material/SearchOffRounded'
import { ModalView } from '../components/Home/ModalView'
import { PersonFormModal } from '../components/Home/PersonFormModal'
import { Search } from '../components/Home/Search'
import { PersonTable } from '../components/Home/Table'
import { PageHeader } from '../components/Layout/PageHeader'
import { Buttom } from '../components/ui/Buttom'
import { EmptyState } from '../components/ui/EmptyState'
import { Notification } from '../components/ui/Notification'
import { useNotification } from '../hooks/useNotification'
import { usePersons } from '../hooks/usePersons'
import type { Person, PersonFormValues } from '../types/person'
import { pluralize } from '../utils/format'
import { filterPersons, getFullName } from '../utils/person'
import { ModalConfirm } from '../utils/modal/ModalConfirm'

type DialogMode = 'form' | 'view' | 'delete'

interface DialogState {
  mode: DialogMode | null
  // Se conserva al cerrar para que el contenido no desaparezca durante la animación de salida
  person: Person | null
}

export const HomePage = () => {
  const { persons, addPerson, updatePerson, deletePerson, isEmailTaken } = usePersons()
  const { notification, notify, closeNotification } = useNotification()
  const [query, setQuery] = useState('')
  const [dialog, setDialog] = useState<DialogState>({ mode: null, person: null })

  // La búsqueda filtra con baja prioridad para que escribir siempre se sienta fluido
  const deferredQuery = useDeferredValue(query)
  const filteredPersons = useMemo(() => filterPersons(persons, deferredQuery), [persons, deferredQuery])

  const openDialog = (mode: DialogMode, person: Person | null = null) => setDialog({ mode, person })
  const closeDialog = () => setDialog((prev) => ({ ...prev, mode: null }))

  const handleSubmit = (values: PersonFormValues) => {
    if (dialog.person) {
      updatePerson(dialog.person.id, values)
      notify('Los datos de la persona se actualizaron correctamente')
    } else {
      addPerson(values)
      notify('Persona registrada correctamente')
    }
    closeDialog()
  }

  const handleDelete = () => {
    if (!dialog.person) return
    deletePerson(dialog.person.id)
    notify(`${getFullName(dialog.person)} fue eliminado(a) del registro`)
    closeDialog()
  }

  const actionHandlers = {
    onView: (person: Person) => openDialog('view', person),
    onEdit: (person: Person) => openDialog('form', person),
    onDelete: (person: Person) => openDialog('delete', person),
  }

  const createButton = (
    <Buttom
      label="Nueva persona"
      startIcon={<PersonAddAlt1Rounded />}
      onClick={() => openDialog('form')}
      sx={{ width: { xs: '100%', sm: 'auto' } }}
    />
  )

  const renderContent = () => {
    if (persons.length === 0) {
      return (
        <EmptyState
          icon={GroupOutlined}
          title="Aún no hay personas registradas"
          description="Comienza agregando la primera persona al registro."
          action={createButton}
        />
      )
    }
    if (filteredPersons.length === 0) {
      return (
        <EmptyState
          icon={SearchOffRounded}
          title="Sin resultados"
          description={`No encontramos personas que coincidan con "${deferredQuery}". Intenta con otro nombre o correo.`}
          action={<Buttom label="Limpiar búsqueda" variant="outlined" onClick={() => setQuery('')} />}
        />
      )
    }
    return <PersonTable persons={filteredPersons} {...actionHandlers} />
  }

  return (
    <>
      <PageHeader title="Personas" subtitle="Administra el registro de personas." actions={createButton} />

      <Paper variant="outlined" sx={{ overflow: 'hidden' }}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 1.5, sm: 2 }}
          sx={{
            p: { xs: 2, md: 2.5 },
            alignItems: { xs: 'stretch', sm: 'center' },
            justifyContent: 'space-between',
            borderBottom: 1,
            borderColor: 'divider',
          }}
        >
          <Search value={query} onChange={setQuery} placeholder="Buscar por nombre o correo" label="Buscar personas" />
          <Typography variant="body2" color="text.secondary" aria-live="polite">
            {deferredQuery
              ? `${filteredPersons.length} de ${pluralize(persons.length, 'persona', 'personas')}`
              : pluralize(persons.length, 'persona registrada', 'personas registradas')}
          </Typography>
        </Stack>

        {renderContent()}
      </Paper>

      <PersonFormModal
        open={dialog.mode === 'form'}
        person={dialog.person}
        isEmailTaken={isEmailTaken}
        onSubmit={handleSubmit}
        onClose={closeDialog}
      />

      <ModalView
        open={dialog.mode === 'view'}
        person={dialog.person}
        onEdit={actionHandlers.onEdit}
        onClose={closeDialog}
      />

      <ModalConfirm
        open={dialog.mode === 'delete'}
        title="¿Eliminar persona?"
        message={
          dialog.person && (
            <>
              Se eliminará a <strong>{getFullName(dialog.person)}</strong> del registro. Esta acción no se puede deshacer.
            </>
          )
        }
        confirmLabel="Eliminar"
        onConfirm={handleDelete}
        onCancel={closeDialog}
      />

      <Notification {...notification} onClose={closeNotification} />
    </>
  )
}
