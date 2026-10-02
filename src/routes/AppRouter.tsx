import { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router'
import { PrivateRoute } from './PrivateRoute'
import { PublicRoute } from './PublicRoute'
import { routes } from './routes'

export const AppRouter = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
        <Routes>
            {
                routes.map(({Component, id, path, isPrivate}) => {
                    const Guard = isPrivate ? PrivateRoute : PublicRoute
                    return (
                        <Route key={id} path={path} element={<Guard><Component /></Guard>} />
                    )
                })
            }
            {/* Cualquier otra ruta (incluida "/") arranca en el login */}
            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    </Suspense>
  )
}
