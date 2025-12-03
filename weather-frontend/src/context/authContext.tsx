/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMutation } from '@tanstack/react-query'
import { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'

import type { SignInSchema } from '@/features/authentication/schemas/sign-in'
import type { SignUpSchema } from '@/features/authentication/schemas/sign-up'
import type { User } from '@/features/authentication/type/user'
import {
  getAccessToken,
  removeAccessToken,
  setAccessToken,
} from '@/helpers/tokens'
import { protectedApi, publicApi } from '@/lib/axios'

export const AuthContext = createContext({
  user: null as User | null,
  signin: (_data: SignInSchema) => {},
  signup: (_data: SignUpSchema) => {},
  signInPending: false,
  signUpPending: false,
  isInitializing: true,
  signout: () => {},
})

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [user, setUser] = useState<User | null>(null)
  const [isInitializing, setIsInitializing] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    setIsInitializing(true)
    const checkAuthentication = async () => {
      try {
        const token = getAccessToken()
        if (token) {
          const user = await protectedApi.get('/user/me')
          setUser(user.data)
          navigate('/dashboard')
        }
        if (!token) {
          setUser(null)
          navigate('/authentication')
        }
      } catch (error) {
        setUser(null)
        removeAccessToken()
        console.error('Authentication check failed:', error)
        navigate('/authentication')
        toast.info('Por favor, faça login novamente para continuar.')
      } finally {
        setIsInitializing(false)
      }
    }
    checkAuthentication()
  }, [])

  const signInMutation = useMutation({
    mutationKey: ['signIn'],
    mutationFn: async (data: SignInSchema) => {
      const response = await publicApi.post('/auth/signin', {
        email: data.email,
        password: data.password,
      })
      return response.data
    },
  })

  const signIn = (data: SignInSchema) => {
    signInMutation.mutate(data, {
      onSuccess(logedInUser) {
        setUser(logedInUser)
        setAccessToken(logedInUser.accessToken)
        toast.success('Login realizado com sucesso!')
        navigate('/dashboard')
      },
      onError() {
        toast.error(
          'Erro ao fazer login. Verifique suas credenciais e tente novamente.'
        )
      },
    })
  }

  const signUpMutation = useMutation({
    mutationKey: ['signUp'],
    mutationFn: async (data: SignUpSchema) => {
      const response = await publicApi.post('/auth/signup', {
        name: data.name,
        email: data.email,
        password: data.password,
      })
      return response.data
    },
  })

  const signup = (data: SignUpSchema) => {
    signUpMutation.mutate(data, {
      onSuccess() {
        toast.success('Conta criada com sucesso! Você já pode fazer login.')
      },
      onError() {
        toast.error('Erro ao criar conta. Tente novamente mais tarde.')
      },
    })
  }

  const signout = () => {
    setUser(null)
    removeAccessToken()
    navigate('/authentication')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signInPending: signInMutation.isPending,
        signin: signIn,
        signUpPending: signUpMutation.isPending,
        signup: signup,
        signout: signout,
        isInitializing,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)
