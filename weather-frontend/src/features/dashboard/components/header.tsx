import { Button } from '@/components/ui/button'
import { useAuthContext } from '@/context/authContext'

const Header = () => {
  const { user } = useAuthContext()
  return (
    <header className="bg-card/40 flex items-center justify-between rounded-2xl border border-white/10 p-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-semibold">
          Dashboard de Clima e IA - Nova Friburgo - RJ
        </h1>
        <p className="text-muted-foreground text-sm">
          Olá, {user?.name}! Bem vindo ao painel principal.
        </p>
      </div>

      <div className="flex">
        <Button className="text-white" variant={'link'}>
          Exploar
        </Button>
      </div>
    </header>
  )
}

export default Header
