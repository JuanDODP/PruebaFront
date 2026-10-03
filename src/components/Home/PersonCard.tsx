import { Box, Paper, Typography } from '@mui/material'
import type { Person } from '../../types/person'
import { formatPhone } from '../../utils/format'
import { getFullName } from '../../utils/person'
import { PersonActions, type PersonActionHandlers } from './PersonActions'
import { PersonAvatar } from './PersonAvatar'

interface PersonCardProps extends PersonActionHandlers {
  person: Person
}

// Representación de un registro en pantallas pequeñas, donde una tabla no cabe
export const PersonCard = ({ person, ...handlers }: PersonCardProps) => {
  return (
    <Paper
      variant="outlined"
      onClick={() => handlers.onView(person)}
      sx={{ p: 2, display: 'flex', gap: 1.5, alignItems: 'flex-start', cursor: 'pointer', '&:hover': { borderColor: 'primary.light' } }}
    >
      <PersonAvatar person={person} />
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography sx={{ fontWeight: 600 }} noWrap>
          {getFullName(person)}
        </Typography>
        <Typography variant="body2" color="text.secondary" noWrap>
          {person.email}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {formatPhone(person.phone)}
        </Typography>
        <Box sx={{ mt: 1, mx: -0.5 }}>
          <PersonActions person={person} {...handlers} />
        </Box>
      </Box>
    </Paper>
  )
}
