import { IconButton, InputAdornment, TextField } from '@mui/material'
import CloseRounded from '@mui/icons-material/CloseRounded'
import SearchRounded from '@mui/icons-material/SearchRounded'

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  label?: string
}

export const SearchInput = ({ value, onChange, placeholder = 'Buscar…', label = 'Buscar' }: SearchInputProps) => {
  return (
    <TextField
      value={value}
      onChange={(event) => onChange(event.target.value)}
      onKeyDown={(event) => event.key === 'Escape' && onChange('')}
      placeholder={placeholder}
      size="small"
      type="search"
      sx={{ width: { xs: '100%', sm: 360 }, '& input::-webkit-search-cancel-button': { display: 'none' } }}
      slotProps={{
        htmlInput: { 'aria-label': label },
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchRounded fontSize="small" />
            </InputAdornment>
          ),
          endAdornment: value && (
            <InputAdornment position="end">
              <IconButton size="small" aria-label="Limpiar búsqueda" onClick={() => onChange('')} edge="end">
                <CloseRounded fontSize="small" />
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  )
}
