import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import SignInForm from '@/features/authentication/components/sign-in-form'
import SignUpForm from '@/features/authentication/components/sign-up-form'

const AuthenticationPage = () => {
  return (
    <div className="from-background via-background/50 flex min-h-screen w-full items-center justify-center bg-linear-to-b to-orange-300/35 px-4">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Tabs defaultValue="Sign In">
          <TabsList>
            <TabsTrigger value="Sign In">Entrar</TabsTrigger>
            <TabsTrigger value="Sign Up">Criar conta</TabsTrigger>
          </TabsList>

          <TabsContent value="Sign In">
            <SignInForm />
          </TabsContent>
          <TabsContent value="Sign Up">
            <SignUpForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default AuthenticationPage
