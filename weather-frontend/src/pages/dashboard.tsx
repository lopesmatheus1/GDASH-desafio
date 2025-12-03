import { useAuthContext } from '@/context/authContext'

const DashboardPage = () => {
  const { user, isInitializing } = useAuthContext()
  if (isInitializing) return null

  return (
    <div>
      <p>Welcome, {user?.name}!</p>
      <h1>Dashboard Page</h1>
    </div>
  )
}

export default DashboardPage
