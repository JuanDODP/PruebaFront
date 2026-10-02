import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router'
import { routes } from './routes'

export const AppRouter = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
        <Routes>
            {
                routes.map(({Component, id, path}) => (
                    <Route key={id} path={path} element={<Component />} />
                ))
            }
        </Routes>
    </Suspense>
  )
}
