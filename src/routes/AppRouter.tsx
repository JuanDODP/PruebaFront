import { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router'
import { MainLayout } from '../components/Layout/MainLayout'
import { PrivateRoute } from './PrivateRoute'
import { PublicRoute } from './PublicRoute'
import { routes } from './routes'

export const AppRouter = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
        <Routes>
            {
                routes.filter(({ isPrivate }) => !isPrivate).map(({Component, id, path}) => (
                    <Route key={id} path={path} element={<PublicRoute><Component /></PublicRoute>} />
                ))
            }
            {/* Las rutas privadas comparten el layout con header */}
            <Route element={<PrivateRoute><MainLayout /></PrivateRoute>}>
                {
                    routes.filter(({ isPrivate }) => isPrivate).map(({Component, id, path}) => (
                        <Route key={id} path={path} element={<Component />} />
                    ))
                }
            </Route>
            {/* Cualquier otra ruta (incluida "/") arranca en el login */}
            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    </Suspense>
  )
}
