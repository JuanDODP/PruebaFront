import { Button as MuiButton, type ButtonProps as MuiButtonProps } from '@mui/material'

type ButtonProps = MuiButtonProps & {
  label: string
}

// Botón base de la app: `contained` por defecto y texto obligatorio vía `label`
export const Button = ({ label, variant = 'contained', ...props }: ButtonProps) => {
  return (
    <MuiButton variant={variant} {...props}>
      {label}
    </MuiButton>
  )
}
