import { zodResolver } from '@hookform/resolvers/zod'
import { Cloudy, LoaderIcon, LockIcon, MailIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useAuthContext } from '@/context/authContext'

import { type SignInSchema, signInSchema } from '../schemas/sign-in'
import PasswordInput from './password-input'

const SignInForm = () => {
  const { signin, signInPending, isInitializing } = useAuthContext()
  if (isInitializing) return null

  const signInForm = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSignInSubmit = (data: SignInSchema) => {
    signin(data)
  }
  return (
    <Card className="bg-card/30">
      <CardHeader className="flex flex-col items-center gap-4">
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Cloudy className="text-primary" size={24} />
          <p className="font-semibold">Weather AI</p>
        </CardTitle>
        <CardDescription>
          Bem-vindo de volta! Faça login na sua conta.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...signInForm}>
          <form
            onSubmit={signInForm.handleSubmit(onSignInSubmit)}
            className="space-y-4"
          >
            {/* EMAIL */}
            <FormField
              control={signInForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <MailIcon size={14} />
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Digite seu email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* PASSWORD */}
            <FormField
              control={signInForm.control}
              name="password"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel>
                    <LockIcon size={14} />
                    Senha
                  </FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="Digite sua senha" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* SUBMIT BUTTON */}
            <Button disabled={signInPending} type="submit" className="w-full">
              {signInPending ? (
                <>
                  <LoaderIcon className="animate-spin" />
                  Entrando...
                </>
              ) : (
                'Entrar'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default SignInForm
