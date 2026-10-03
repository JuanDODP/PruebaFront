import type { HTMLAttributes } from 'react'
import { Box, Stack } from '@mui/material'
import {
  useForm,
  type DefaultValues,
  type FieldValues,
  type Path,
  type RegisterOptions,
  type SubmitHandler,
} from 'react-hook-form'
import { Button } from './Button'
import { Input } from './Input'

export interface FormFieldConfig<T extends FieldValues> {
  name: Path<T>
  label: string
  type?: string
  placeholder?: string
  helperText?: string
  autoComplete?: string
  inputMode?: HTMLAttributes<HTMLInputElement>['inputMode']
  maxLength?: number
  rules?: RegisterOptions<T, Path<T>>
  transform?: (value: string) => string
  // 'half' ocupa media fila a partir de tablet; en móvil todo va a una columna
  span?: 'full' | 'half'
}

interface FormBuilderProps<T extends FieldValues> {
  fields: FormFieldConfig<T>[]
  defaultValues: DefaultValues<T>
  onSubmit: SubmitHandler<T>
  submitLabel?: string
  cancelLabel?: string
  onCancel?: () => void
  // Útil al editar: no permite guardar si no hubo cambios
  requireChanges?: boolean
}

/**
 * Formulario genérico declarativo: recibe la configuración de campos con sus reglas
 * y se encarga del layout responsive, validaciones y botones de acción.
 */
export const FormBuilder = <T extends FieldValues>({
  fields,
  defaultValues,
  onSubmit,
  submitLabel = 'Guardar',
  cancelLabel = 'Cancelar',
  onCancel,
  requireChanges = false,
}: FormBuilderProps<T>) => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isDirty },
  } = useForm<T>({ defaultValues, mode: 'onTouched' })

  return (
    <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ display: 'grid', gap: { xs: 2, sm: 2.5 }, gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' } }}>
        {fields.map(({ name, span = 'full', inputMode, maxLength, ...field }, index) => (
          <Input
            key={name}
            name={name}
            control={control}
            autoFocus={index === 0}
            slotProps={{ htmlInput: { inputMode, maxLength } }}
            sx={{ gridColumn: span === 'full' ? '1 / -1' : 'auto' }}
            {...field}
          />
        ))}
      </Box>

      <Stack direction={{ xs: 'column-reverse', sm: 'row' }} spacing={1.5} sx={{ justifyContent: 'flex-end', mt: 4 }}>
        {onCancel && (
          <Button label={cancelLabel} variant="outlined" color="inherit" onClick={onCancel} disabled={isSubmitting} />
        )}
        <Button
          label={submitLabel}
          type="submit"
          loading={isSubmitting}
          disabled={requireChanges && !isDirty}
          sx={{ minWidth: { sm: 140 } }}
        />
      </Stack>
    </Box>
  )
}
