import { zodResolver } from '@hookform/resolvers/zod'
import { Cloudy, EyeIcon, LockIcon, MailIcon } from 'lucide-react'
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

import { type SignInSchema, signInSchema } from '../schemas/sign-in'

const SignInForm = () => {
  const signInForm = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSignInSubmit = (data: SignInSchema) => {
    console.log('Sign In Data:', data)
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
                    <div className="relative">
                      <Input
                        type="password"
                        placeholder="Digite sua senha"
                        {...field}
                      />

                      <Button
                        variant="ghost"
                        className="text-muted-foreground absolute right-0 bottom-0"
                        type="button"
                      >
                        <EyeIcon />
                      </Button>
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-full" type="submit">
              Entrar
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default SignInForm
