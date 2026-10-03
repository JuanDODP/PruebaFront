import { Stack } from '@mui/material'
import { useForm } from 'react-hook-form'
import { Buttom } from '../ui/Buttom'
import { Input } from '../ui/Input'
import { EMAIL_PATTERN } from '../../utils/validators'

export interface LoginFormValues {
  email: string
  password: string
}

interface FormProps {
  onSuccess: (data: LoginFormValues) => void
}

const PASSWORD_MIN_LENGTH = 8

// Simula la llamada al servidor: cualquier correo y contraseña válidos son aceptados
const simulateLogin = () => new Promise<void>((resolve) => setTimeout(resolve, 1000))

export const Form = ({ onSuccess }: FormProps) => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginFormValues>({
    defaultValues: { email: '', password: '' },
  })

  const onSubmit = async (data: LoginFormValues) => {
    await simulateLogin()
    onSuccess(data)
  }

  return (
    <Stack component="form" spacing={{ xs: 2, sm: 2.5 }} onSubmit={handleSubmit(onSubmit)} noValidate>
      <Input
        name="email"
        control={control}
        label="Correo electrónico"
        type="email"
        autoComplete="email"
        rules={{
          required: 'El correo es obligatorio',
          pattern: { value: EMAIL_PATTERN, message: 'Ingresa un correo válido (ej. usuario@dominio.com)' },
        }}
      />
      <Input
        name="password"
        control={control}
        label="Contraseña"
        type="password"
        autoComplete="current-password"
        rules={{
          required: 'La contraseña es obligatoria',
          minLength: {
            value: PASSWORD_MIN_LENGTH,
            message: `La contraseña debe tener al menos ${PASSWORD_MIN_LENGTH} caracteres`,
          },
        }}
      />
      <Buttom label="Iniciar sesión" type="submit" size="large" loading={isSubmitting} fullWidth />
    </Stack>
  )
}
