import type { ReactNode } from 'react'
import { Box, Divider, Link, Stack, Typography } from '@mui/material'
import CalendarTodayOutlined from '@mui/icons-material/CalendarTodayOutlined'
import EditOutlined from '@mui/icons-material/EditOutlined'
import EmailOutlined from '@mui/icons-material/EmailOutlined'
import PhoneOutlined from '@mui/icons-material/PhoneOutlined'
import UpdateOutlined from '@mui/icons-material/UpdateOutlined'
import type { SvgIconComponent } from '@mui/icons-material'
import { Buttom } from '../ui/Buttom'
import { Modal } from '../../utils/modal/Modal'
import type { Person } from '../../types/person'
import { formatDate, formatPhone } from '../../utils/format'
import { getFullName } from '../../utils/person'
import { PersonAvatar } from './PersonAvatar'

interface ModalViewProps {
  open: boolean
  person: Person | null
  onEdit: (person: Person) => void
  onClose: () => void
}

const DetailItem = ({ icon: Icon, label, children }: { icon: SvgIconComponent; label: string; children: ReactNode }) => (
  <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
    <Icon sx={{ color: 'text.secondary', mt: 0.25 }} />
    <Box sx={{ minWidth: 0 }}>
      <Typography variant="caption" color="text.secondary" component="p">
        {label}
      </Typography>
      <Typography sx={{ wordBreak: 'break-word' }}>{children}</Typography>
    </Box>
  </Box>
)

// Vista de detalle (solo lectura) de una persona
export const ModalView = ({ open, person, onEdit, onClose }: ModalViewProps) => {
  return (
    <Modal
      open={open}
      title="Detalle de la persona"
      onClose={onClose}
      actions={
        person && (
          <>
            <Buttom label="Cerrar" variant="outlined" color="inherit" onClick={onClose} />
            <Buttom label="Editar" startIcon={<EditOutlined />} onClick={() => onEdit(person)} />
          </>
        )
      }
    >
      {person && (
        <Stack spacing={3}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <PersonAvatar person={person} size={64} />
            <Box sx={{ minWidth: 0 }}>
              <Typography variant="h6" sx={{ wordBreak: 'break-word' }}>
                {getFullName(person)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Registrado el {formatDate(person.createdAt)}
              </Typography>
            </Box>
          </Box>

          <Divider />

          <Box sx={{ display: 'grid', gap: 2.5, gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' } }}>
            <DetailItem icon={EmailOutlined} label="Correo electrónico">
              <Link href={`mailto:${person.email}`} underline="hover">
                {person.email}
              </Link>
            </DetailItem>
            <DetailItem icon={PhoneOutlined} label="Teléfono">
              <Link href={`tel:${person.phone}`} underline="hover">
                {formatPhone(person.phone)}
              </Link>
            </DetailItem>
            <DetailItem icon={CalendarTodayOutlined} label="Fecha de alta">
              {formatDate(person.createdAt)}
            </DetailItem>
            <DetailItem icon={UpdateOutlined} label="Última actualización">
              {formatDate(person.updatedAt)}
            </DetailItem>
          </Box>
        </Stack>
      )}
    </Modal>
  )
}
