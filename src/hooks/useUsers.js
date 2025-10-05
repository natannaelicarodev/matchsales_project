import { useTheme } from '@/components/theme-provider';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const fetchUsers = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users')
  if (!response.ok) {
    throw new Error('Erro ao buscar usuários')
  }
  return response.json()
}

const createUser = async (userData) => {
  await new Promise(resolve => setTimeout(resolve, 1000))

  const newUser = {
    id: Date.now(),
    name: userData.name,
    email: userData.email,
    address: {
      city: userData.city || 'Cidade não informada'
    },
    phone: userData.phone || '',
    website: userData.website || '',
    company: {
      name: userData.company || ''
    }
  }

  return newUser
}

const updateUser = async ({ id, ...userData }) => {
  await new Promise(resolve => setTimeout(resolve, 800))

  // Simular resposta da API
  const updatedUser = {
    id,
    name: userData.name,
    email: userData.email,
    address: {
      city: userData.city || 'Cidade não informada'
    },
    phone: userData.phone || '',
    website: userData.website || '',
    company: {
      name: userData.company || ''
    }
  }

  return updatedUser
}

// Hook para buscar usuários
export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    staleTime: 5 * 60 * 1000,
  })
}

// Hook para criar usuário
export const useCreateUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createUser,
    onSuccess: (newUser) => {
      // Atualizar cache local com o novo usuário
      queryClient.setQueryData(['users'], (oldUsers) => {
        return oldUsers ? [...oldUsers, newUser] : [newUser]
      })

      toast.success('Usuário criado com sucesso!', {
        description: `${newUser.name} foi adicionado à lista de usuários.`
      })
    },
    onError: (error) => {
      toast.error('Erro ao criar usuário', {
        description: error.message || 'Ocorreu um erro inesperado.'
      })
    }
  })
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: updateUser,
    onSuccess: (updatedUser) => {
      // Atualizar cache local com o usuário modificado
      queryClient.setQueryData(['users'], (oldUsers) => {
        return oldUsers ? oldUsers.map(user =>
          user.id === updatedUser.id ? updatedUser : user
        ) : [updatedUser]
      })

      toast.success('Usuário atualizado com sucesso!', {
        description: `As informações de ${updatedUser.name} foram atualizadas.`,
        })
    },
    onError: (error) => {
      toast.error('Erro ao atualizar usuário', {
        description: error.message || 'Ocorreu um erro inesperado.',
      })
    }
  })
}

// Hook para deletar usuário (simulado)
export const useDeleteUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (userId) => {
      // Simular delay de rede
      await new Promise(resolve => setTimeout(resolve, 500))
      return userId
    },
    onSuccess: (deletedUserId) => {
      // Remover usuário do cache local
      queryClient.setQueryData(['users'], (oldUsers) => {
        return oldUsers ? oldUsers.filter(user => user.id !== deletedUserId) : []
      })

      toast.success('Usuário removido com sucesso!')
    },
    onError: (error) => {
      toast.error('Erro ao remover usuário', {
        description: error.message || 'Ocorreu um erro inesperado.'
      })
    }
  })
}
