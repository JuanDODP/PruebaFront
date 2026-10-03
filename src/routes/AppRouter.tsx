import { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router'
import { MainLayout } from '@/components/Layout'
import { PageLoader } from '@/components/ui'
import { navRoutes, NotFoundPage, publicRoutes } from '@/config'
import { PrivateRoute } from './PrivateRoute'
import { PublicRoute } from './PublicRoute'

export const AppRouter = () => {
  return (
    <Suspense fallback={<PageLoader fullScreen />}>
      <Routes>
        {publicRoutes.map(({ id, path, Component }) => (
          <Route key={id} path={path} element={<PublicRoute><Component /></PublicRoute>} />
        ))}

        {/* Las rutas privadas comparten el layout con header */}
        <Route element={<PrivateRoute><MainLayout /></PrivateRoute>}>
          {navRoutes.map(({ id, path, Component }) => (
            <Route key={id} path={path} element={<Component />} />
          ))}
        </Route>

        {/* La raíz lleva al inicio; si no hay sesión, PrivateRoute redirige al login */}
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  )
}
