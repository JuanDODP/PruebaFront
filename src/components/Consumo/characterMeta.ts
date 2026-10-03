import type { SvgIconComponent } from '@mui/icons-material'
import FemaleRounded from '@mui/icons-material/FemaleRounded'
import HelpOutlineRounded from '@mui/icons-material/HelpOutlineRounded'
import MaleRounded from '@mui/icons-material/MaleRounded'
import RadioButtonUncheckedRounded from '@mui/icons-material/RadioButtonUncheckedRounded'
import type { Gender, Status } from '@/interface/ApiData.Interface'

interface StatusMeta {
  label: string
  // Ruta de color del tema de MUI
  color: string
}

// Traducción y color de cada estado; un solo lugar para mantener la presentación consistente
export const STATUS_META: Record<Status, StatusMeta> = {
  Alive: { label: 'Vivo', color: 'success.main' },
  Dead: { label: 'Muerto', color: 'error.main' },
  unknown: { label: 'Desconocido', color: 'grey.500' },
}

export const GENDER_META: Record<Gender, { label: string; icon: SvgIconComponent }> = {
  Female: { label: 'Femenino', icon: FemaleRounded },
  Male: { label: 'Masculino', icon: MaleRounded },
  Genderless: { label: 'Sin género', icon: RadioButtonUncheckedRounded },
  unknown: { label: 'Desconocido', icon: HelpOutlineRounded },
}

const SPECIES_LABELS: Record<string, string> = {
  Human: 'Humano',
  Alien: 'Alienígena',
  Humanoid: 'Humanoide',
  Robot: 'Robot',
  Animal: 'Animal',
  Cronenberg: 'Cronenberg',
  'Mythological Creature': 'Criatura mitológica',
  Poopybutthole: 'Poopybutthole',
  Disease: 'Enfermedad',
  unknown: 'Desconocida',
}

export const translateSpecies = (species: string) => SPECIES_LABELS[species] ?? species

export const translatePlace = (place: string) => (place === 'unknown' ? 'Desconocido' : place)
