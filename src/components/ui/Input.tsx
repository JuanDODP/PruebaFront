import { TextField, type TextFieldProps } from '@mui/material'
import { useController, type Control, type FieldValues, type Path, type RegisterOptions } from 'react-hook-form'

type InputProps<T extends FieldValues> = Omit<TextFieldProps, 'name'> & {
  name: Path<T>
  control: Control<T>
  rules?: RegisterOptions<T, Path<T>>
  // Permite limpiar lo que escribe el usuario (ej. dejar solo dígitos)
  transform?: (value: string) => string
}

export const Input = <T extends FieldValues>({ name, control, rules, transform, ...props }: InputProps<T>) => {
  const { field, fieldState } = useController({ name, control, rules })

  return (
    <TextField
      {...field}
      {...props}
      onChange={(event) => field.onChange(transform ? transform(event.target.value) : event.target.value)}
      fullWidth
      error={!!fieldState.error}
      helperText={fieldState.error?.message ?? props.helperText}
    />
  )
}
