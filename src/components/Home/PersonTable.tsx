import {
  Box,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import type { Person } from '@/types'
import { formatDate, formatPhone, getFullName } from '@/utils'
import { PersonActions, type PersonActionHandlers } from './PersonActions'
import { PersonAvatar } from './PersonAvatar'
import { PersonCard } from './PersonCard'

interface PersonTableProps extends PersonActionHandlers {
  persons: Person[]
}

export const PersonTable = ({ persons, ...handlers }: PersonTableProps) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  return isMobile ? (
    <Stack spacing={1.5} sx={{ p: 2 }}>
      {persons.map((person) => (
        <PersonCard key={person.id} person={person} {...handlers} />
      ))}
    </Stack>
  ) : (
    <TableContainer>
      <Table aria-label="Listado de personas">
        <TableHead>
          <TableRow sx={{ '& th': { fontWeight: 600, color: 'text.secondary', bgcolor: 'background.default' } }}>
            <TableCell>Nombre</TableCell>
            <TableCell>Correo electrónico</TableCell>
            <TableCell>Teléfono</TableCell>
            <TableCell sx={{ display: { md: 'none', lg: 'table-cell' } }}>Fecha de alta</TableCell>
            <TableCell align="right">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {persons.map((person) => (
            <TableRow
              key={person.id}
              hover
              onClick={() => handlers.onView(person)}
              sx={{ cursor: 'pointer', '&:last-child td': { borderBottom: 0 } }}
            >
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <PersonAvatar person={person} size={36} />
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {getFullName(person)}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell>{person.email}</TableCell>
              <TableCell sx={{ whiteSpace: 'nowrap' }}>{formatPhone(person.phone)}</TableCell>
              <TableCell sx={{ display: { md: 'none', lg: 'table-cell' }, whiteSpace: 'nowrap', color: 'text.secondary' }}>
                {formatDate(person.createdAt)}
              </TableCell>
              <TableCell align="right">
                <PersonActions person={person} {...handlers} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
