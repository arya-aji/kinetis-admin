import { createBrowserRouter, Navigate } from 'react-router-dom'
import { useAuth } from '@clerk/clerk-react'
import GeneralError from './pages/errors/general-error'
import NotFoundError from './pages/errors/not-found-error'
import MaintenanceError from './pages/errors/maintenance-error'
import UnauthorisedError from './pages/errors/unauthorised-error.tsx'
import AppShell from './components/app-shell.tsx'
import Loading from './components/Loading.tsx'

// eslint-disable-next-line react-refresh/only-export-components
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isSignedIn, isLoaded } = useAuth()

  if (!isLoaded) {
    return <Loading />;
  }

  if (!isSignedIn) {
    return <Navigate to="/welcome" replace />
  }

  return children
}

const router = createBrowserRouter([
  // Welcome route (accessible to all)
  {
    path: '/welcome',
    lazy: async () => ({
      Component: (await import('./pages/welcome')).default,
    }),
  },

  // Main routes (protected)
  {
    path: '/',
    element: <ProtectedRoute><AppShell /></ProtectedRoute>,
    // errorElement: <GeneralError />,
    children: [
      {
        index: true,
        lazy: async () => ({
          Component: (await import('./pages/dashboard')).default,
        }),
      },
      {
        path: 'kegiatan',
        lazy: async () => ({
          Component: (await import('@/pages/rutinan')).default,
        }),
      },
      {
        path: 'sakip',
        lazy: async () => ({
          Component: (await import('@/pages/pembangunan/sakip')).default,
        }),
      },
      {
        path: 'zi',
        lazy: async () => ({
          Component: (await import('@/pages/pembangunan/zi')).default,
        }),
      },
      {
        path: 'risiko',
        lazy: async () => ({
          Component: (await import('@/pages/pembangunan/risiko')).default,
        }),
      },
      {
        path: 'monev',
        lazy: async () => ({
          Component: (await import('@/pages/pembangunan/monev')).default,
        }),
      },
      {
        path: 'kinerja',
        lazy: async () => ({
          Component: (await import('@/pages/pembangunan/kinerja')).default,
        }),
      },
      {
        path: 'dokumentasi',
        lazy: async () => ({
          Component: (await import('@/pages/pembangunan/dokumentasi')).default,
        }),
      },
      {
        path: 'pegawai',
        lazy: async () => ({
          Component: (await import('@/pages/pegawai')).default,
        }),
      },
      {
        path: 'voting',
        lazy: async () => ({
          Component: (await import('@/pages/voting')).default,
        }),
      },
    ],
  },

  // Error routes
  { path: '/500', Component: GeneralError },
  { path: '/404', Component: NotFoundError },
  { path: '/503', Component: MaintenanceError },
  { path: '/401', Component: UnauthorisedError },

  // Fallback 404 route
  { path: '*', Component: NotFoundError },
])

export default router
