import type { SvgIconComponent } from '@mui/icons-material'
import EmailOutlined from '@mui/icons-material/EmailOutlined'
import GitHub from '@mui/icons-material/GitHub'
import LanguageRounded from '@mui/icons-material/LanguageRounded'
import LinkedIn from '@mui/icons-material/LinkedIn'
import WhatsApp from '@mui/icons-material/WhatsApp'

export interface ContactLink {
  id: string
  label: string
  // Texto del tooltip; ayuda a saber a dónde lleva el enlace antes de abrirlo
  detail: string
  href: string
  icon: SvgIconComponent
}

export const AUTHOR = {
  name: 'Juan Domínguez',
  role: 'Desarrollador FullStack',
}

export const PORTFOLIO_URL = 'https://main.d3bct93nabr1er.amplifyapp.com/'

const EMAIL = 'al222111490@gmail.com'
// Lada de México (52) + número a 10 dígitos
const WHATSAPP_PHONE = '525612227107'
const WHATSAPP_MESSAGE =
  '¡Hola Juan! Acabo de visitar tu portafolio y me encantó tu trabajo. Me gustaría hablar contigo 👋'

// URLSearchParams codifica acentos y emojis correctamente en el mensaje prellenado
const whatsappUrl = `https://api.whatsapp.com/send/?${new URLSearchParams({
  phone: WHATSAPP_PHONE,
  text: WHATSAPP_MESSAGE,
  type: 'phone_number',
  app_absent: '0',
})}`

export const CONTACT_LINKS: ContactLink[] = [
  { id: 'portfolio', label: 'Portafolio', detail: 'Ver mi portafolio', href: PORTFOLIO_URL, icon: LanguageRounded },
  { id: 'email', label: 'Correo', detail: EMAIL, href: `mailto:${EMAIL}`, icon: EmailOutlined },
  { id: 'linkedin', label: 'LinkedIn', detail: 'in/dominguez-dev', href: 'https://www.linkedin.com/in/dominguez-dev/', icon: LinkedIn },
  { id: 'github', label: 'GitHub', detail: 'JuanDODP', href: 'https://github.com/JuanDODP', icon: GitHub },
  { id: 'whatsapp', label: 'WhatsApp', detail: '+52 56 1222 7107', href: whatsappUrl, icon: WhatsApp },
]
