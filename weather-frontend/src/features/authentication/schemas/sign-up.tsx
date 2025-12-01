import { z } from 'zod'

const signUpSchema = z
  .object({
    username: z
      .string()
      .trim()
      .min(2, {
        error: 'O nome de usuário deve ter pelo menos 2 caracteres.',
      })
      .max(150, {
        error: 'O nome de usuário deve ter no máximo 150 caracteres.',
      }),
    email: z.email({
      error: 'Por favor, insira um email válido.',
    }),
    password: z
      .string()
      .trim()
      .min(8, {
        error: 'A senha deve ter pelo menos 8 caracteres.',
      })
      .max(72, {
        error: 'A senha deve ter no máximo 72 caracteres.',
      }),
    passwordConfirmation: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'As senhas não coincidem.',
    path: ['passwordConfirmation'],
  })

type SignUpSchema = z.infer<typeof signUpSchema>

export { type SignUpSchema, signUpSchema }
