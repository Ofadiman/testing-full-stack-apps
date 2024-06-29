import './global.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import React, { FunctionComponent, PropsWithChildren } from 'react'
import ReactDOM from 'react-dom/client'
import { Posts } from './Posts.page'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import CssBaseline from '@mui/material/CssBaseline'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { ErrorPage } from './Error.page'
import { HomePage } from './pages/Home.page'
import { trpc } from './trpc'
import { httpBatchLink } from '@trpc/client'

const queryClient = new QueryClient()
const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000/trpc',
    }),
  ],
})

const ProtectedRoute: FunctionComponent<PropsWithChildren> = (props) => {
  const token = window.localStorage.getItem('token')
  if (typeof token !== 'string') {
    return <Navigate to={'/'} replace />
  }

  return props.children
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/posts',
    element: (
      <ProtectedRoute>
        <Posts />
      </ProtectedRoute>
    ),
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </trpc.Provider>
    <CssBaseline />
  </React.StrictMode>,
)
