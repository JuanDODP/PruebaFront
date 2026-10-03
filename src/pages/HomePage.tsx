import { useDeferredValue, useMemo, useState } from 'react'
import { Paper, Stack, Typography } from '@mui/material'
import CloudOffOutlined from '@mui/icons-material/CloudOffOutlined'
import GroupOutlined from '@mui/icons-material/GroupOutlined'
import PersonAddAlt1Rounded from '@mui/icons-material/PersonAddAlt1Rounded'
import RefreshRounded from '@mui/icons-material/RefreshRounded'
import SearchOffRounded from '@mui/icons-material/SearchOffRounded'
import { PersonDetailModal, PersonFormModal, PersonTable, PersonTableSkeleton } from '@/components/Home'
import { PageHeader } from '@/components/Layout'
import { Button, EmptyState, ModalConfirm, Notification, SearchInput } from '@/components/ui'
import { useNotification, usePersons } from '@/hooks'
import type { Person, PersonFormValues } from '@/types'
import { filterPersons, getErrorMessage, getFullName, pluralize } from '@/utils'

type DialogMode = 'form' | 'view' | 'delete'

interface DialogState {
  mode: DialogMode | null
  // Se conserva al cerrar para que el contenido no desaparezca durante la animación de salida
  person: Person | null
}

export const HomePage = () => {
  const { persons, isLoading, error, reload, addPerson, updatePerson, deletePerson, isEmailTaken } = usePersons()
  const { notification, notify, closeNotification } = useNotification()
  const [query, setQuery] = useState('')
  const [dialog, setDialog] = useState<DialogState>({ mode: null, person: null })
  const [isDeleting, setIsDeleting] = useState(false)

  // La búsqueda filtra con baja prioridad para que escribir siempre se sienta fluido
  const deferredQuery = useDeferredValue(query)
  const filteredPersons = useMemo(() => filterPersons(persons, deferredQuery), [persons, deferredQuery])

  const isReady = !isLoading && !error

  const openDialog = (mode: DialogMode, person: Person | null = null) => setDialog({ mode, person })
  const closeDialog = () => setDialog((prev) => ({ ...prev, mode: null }))

  // Si el servicio falla el modal sigue abierto con los datos capturados para reintentar
  const handleSubmit = async (values: PersonFormValues) => {
    try {
      if (dialog.person) {
        await updatePerson(dialog.person.id, values)
        notify('Los datos de la persona se actualizaron correctamente')
      } else {
        await addPerson(values)
        notify('Persona registrada correctamente')
      }
      closeDialog()
    } catch (err) {
      notify(getErrorMessage(err), 'error')
    }
  }

  const handleDelete = async () => {
    if (!dialog.person) return
    setIsDeleting(true)
    try {
      await deletePerson(dialog.person.id)
      notify(`${getFullName(dialog.person)} fue eliminado(a) del registro`)
      closeDialog()
    } catch (err) {
      notify(getErrorMessage(err), 'error')
    } finally {
      setIsDeleting(false)
    }
  }

  const actionHandlers = {
    onView: (person: Person) => openDialog('view', person),
    onEdit: (person: Person) => openDialog('form', person),
    onDelete: (person: Person) => openDialog('delete', person),
  }

  const createButton = (
    <Button
      label="Nueva persona"
      startIcon={<PersonAddAlt1Rounded />}
      onClick={() => openDialog('form')}
      disabled={!isReady}
      sx={{ width: { xs: '100%', sm: 'auto' } }}
    />
  )

  const getResultsLabel = () => {
    if (isLoading) return 'Cargando personas…'
    if (error) return ''
    if (deferredQuery) return `${filteredPersons.length} de ${pluralize(persons.length, 'persona', 'personas')}`
    return pluralize(persons.length, 'persona registrada', 'personas registradas')
  }

  const renderContent = () => {
    if (isLoading) return <PersonTableSkeleton />
    if (error) {
      return (
        <EmptyState
          icon={CloudOffOutlined}
          title="No pudimos cargar las personas"
          description={error}
          action={<Button label="Reintentar" startIcon={<RefreshRounded />} onClick={() => void reload()} />}
        />
      )
    }
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
          action={<Button label="Limpiar búsqueda" variant="outlined" onClick={() => setQuery('')} />}
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
          <SearchInput value={query} onChange={setQuery} placeholder="Buscar por nombre o correo" label="Buscar personas" />
          <Typography variant="body2" color="text.secondary" aria-live="polite">
            {getResultsLabel()}
          </Typography>
        </Stack>

        <div aria-busy={isLoading}>{renderContent()}</div>
      </Paper>

      <PersonFormModal
        open={dialog.mode === 'form'}
        person={dialog.person}
        isEmailTaken={isEmailTaken}
        onSubmit={handleSubmit}
        onClose={closeDialog}
      />

      <PersonDetailModal
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
        loading={isDeleting}
        onConfirm={() => void handleDelete()}
        onCancel={closeDialog}
      />

      <Notification {...notification} onClose={closeNotification} />
    </>
  )
}
