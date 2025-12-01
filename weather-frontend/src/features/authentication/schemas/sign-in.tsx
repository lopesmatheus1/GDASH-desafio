import { z } from 'zod'
const signInSchema = z.object({
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
})

type SignInSchema = z.infer<typeof signInSchema>

export { type SignInSchema, signInSchema }
