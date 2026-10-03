import { Avatar, type AvatarProps } from '@mui/material'
import type { Person } from '../../types/person'
import { getInitials } from '../../utils/person'

type PersonAvatarProps = AvatarProps & {
  person: Pick<Person, 'firstName' | 'lastName'>
  size?: number
}

export const PersonAvatar = ({ person, size = 40, sx, ...props }: PersonAvatarProps) => {
  return (
    <Avatar
      {...props}
      sx={{ width: size, height: size, fontSize: size * 0.4, fontWeight: 600, bgcolor: 'secondary.main', ...sx }}
    >
      {getInitials(person)}
    </Avatar>
  )
}
