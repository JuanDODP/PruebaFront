import { lazy, type ComponentType, type LazyExoticComponent } from 'react'
import type { SvgIconComponent } from '@mui/icons-material'
import DashboardOutlined from '@mui/icons-material/DashboardOutlined'
import InsightsOutlined from '@mui/icons-material/InsightsOutlined'

export interface AppRoute {
  id: number
  name: string
  path: string
  Component: LazyExoticComponent<ComponentType>
  isPrivate: boolean
  icon?: SvgIconComponent
}

// Cada página se descarga solo cuando se visita (code splitting). Se importan por archivo,
// no desde un barril, porque un barril juntaría todas las páginas en el mismo bundle.
const LoginPage = lazy(() => import('@/pages/LoginPage').then((module) => ({ default: module.LoginPage })))
const HomePage = lazy(() => import('@/pages/HomePage').then((module) => ({ default: module.HomePage })))
const ConsumoPage = lazy(() => import('@/pages/ConsumoPage').then((module) => ({ default: module.ConsumoPage })))

// Fuera del arreglo: no es pública ni privada, responde a cualquier ruta desconocida
export const NotFoundPage = lazy(() => import('@/pages/NotFoundPage').then((module) => ({ default: module.NotFoundPage })))

export const routes: AppRoute[] = [
  { id: 1, name: 'Login', path: '/login', Component: LoginPage, isPrivate: false },
  { id: 2, name: 'Home', path: '/home', Component: HomePage, isPrivate: true, icon: DashboardOutlined },
  { id: 3, name: 'Consumo', path: '/consumo', Component: ConsumoPage, isPrivate: true, icon: InsightsOutlined },
]

export const publicRoutes = routes.filter(({ isPrivate }) => !isPrivate)

// Rutas privadas; también son las que aparecen en el menú del header
export const navRoutes = routes.filter(({ isPrivate }) => isPrivate)
