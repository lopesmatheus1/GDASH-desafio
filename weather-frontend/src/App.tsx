import { BrowserRouter, Route, Routes } from 'react-router'

import AuthenticationPage from './pages/authentication'
import DashboardPage from './pages/dashboard'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
        <Routes>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/authentication" element={<AuthenticationPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
