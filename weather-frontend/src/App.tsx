import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router'

import { Toaster } from './components/ui/sonner'
import { AuthContextProvider } from './context/authContext'
import AuthenticationPage from './pages/authentication'
import DashboardPage from './pages/dashboard'

const queryClient = new QueryClient()

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <Routes>
            <Route
              path="/"
              element={<Navigate to="/authentication" replace />}
            />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/authentication" element={<AuthenticationPage />} />
          </Routes>

          <Toaster />
        </AuthContextProvider>
      </QueryClientProvider>
    </BrowserRouter>
  )
}

export default App
