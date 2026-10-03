import type { MouseEvent } from 'react'
import { IconButton, Stack, Tooltip } from '@mui/material'
import DeleteOutlineRounded from '@mui/icons-material/DeleteOutlineRounded'
import EditOutlined from '@mui/icons-material/EditOutlined'
import VisibilityOutlined from '@mui/icons-material/VisibilityOutlined'
import type { SvgIconComponent } from '@mui/icons-material'
import type { Person } from '../../types/person'
import { getFullName } from '../../utils/person'

export interface PersonActionHandlers {
  onView: (person: Person) => void
  onEdit: (person: Person) => void
  onDelete: (person: Person) => void
}

interface PersonActionsProps extends PersonActionHandlers {
  person: Person
}

interface ActionConfig {
  label: string
  icon: SvgIconComponent
  color: 'default' | 'primary' | 'error'
  handler: (person: Person) => void
}

// Acciones de cada registro, compartidas entre la tabla (escritorio) y las tarjetas (móvil)
export const PersonActions = ({ person, onView, onEdit, onDelete }: PersonActionsProps) => {
  const name = getFullName(person)
  const actions: ActionConfig[] = [
    { label: 'Ver detalle', icon: VisibilityOutlined, color: 'default', handler: onView },
    { label: 'Editar', icon: EditOutlined, color: 'primary', handler: onEdit },
    { label: 'Eliminar', icon: DeleteOutlineRounded, color: 'error', handler: onDelete },
  ]

  return (
    <Stack direction="row" spacing={0.5} sx={{ justifyContent: 'flex-end' }}>
      {actions.map(({ label, icon: Icon, color, handler }) => (
        <Tooltip key={label} title={label}>
          <IconButton
            size="small"
            color={color}
            aria-label={`${label} a ${name}`}
            onClick={(event: MouseEvent) => {
              // Evita que el click dispare también la apertura del detalle en la fila
              event.stopPropagation()
              handler(person)
            }}
          >
            <Icon fontSize="small" />
          </IconButton>
        </Tooltip>
      ))}
    </Stack>
  )
}
