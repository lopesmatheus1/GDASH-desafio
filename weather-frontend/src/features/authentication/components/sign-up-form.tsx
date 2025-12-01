import { zodResolver } from '@hookform/resolvers/zod'
import { Cloudy, EyeIcon, LockIcon, MailIcon, UserIcon } from 'lucide-react'
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

import { type SignUpSchema, signUpSchema } from '../schemas/sign-up'

const SignUpForm = () => {
  const signUpForm = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    },
  })

  const onSignUpSubmit = (data: SignUpSchema) => {
    console.log('Sign Up Data:', data)
  }
  return (
    <Card className="bg-card/30">
      <CardHeader className="flex flex-col items-center gap-4">
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Cloudy className="text-primary" size={24} />
          <p className="font-semibold">Weather AI</p>
        </CardTitle>
        <CardDescription>
          Crie sua conta para começar a usar o Weather AI.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...signUpForm}>
          <form
            onSubmit={signUpForm.handleSubmit(onSignUpSubmit)}
            className="space-y-4"
          >
            <FormField
              control={signUpForm.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <UserIcon size={14} />
                    Nome de usuário
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Digite seu nome completo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={signUpForm.control}
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
              control={signUpForm.control}
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
            <FormField
              control={signUpForm.control}
              name="passwordConfirmation"
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

export default SignUpForm
