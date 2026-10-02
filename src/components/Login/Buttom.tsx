import { Button, type ButtonProps } from '@mui/material'

type ButtomProps = ButtonProps & {
  label: string
}

export const Buttom = ({ label, variant = 'contained', ...props }: ButtomProps) => {
  return (
    <Button variant={variant} {...props}>
      {label}
    </Button>
  )
}
