import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useUpdateUser } from '@/hooks/useUsers'
import { updateUserSchema } from '@/lib/validations'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, Mail, MapPin, User } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function EditUserModal({ user, isOpen, onClose }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const updateUserMutation = useUpdateUser()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    reset
  } = useForm({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      city: user?.address?.city || '',
    },
    mode: 'onChange'
  })

  const onSubmit = async (data) => {
    if (!user) return
    
    setIsSubmitting(true)
    try {
      await updateUserMutation.mutateAsync({
        id: user.id,
        ...data
      })
      onClose()
      reset()
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    reset()
    onClose()
  }

  if (!user) return null

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            Editar Usuário
          </DialogTitle>
          <DialogDescription>
            Atualize as informações do usuário {user.name}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Nome */}
          <div className="space-y-2">
            <Label htmlFor="edit-name" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Nome
            </Label>
            <Input
              id="edit-name"
              {...register('name')}
              placeholder="Digite o nome completo"
              className={errors.name ? 'border-destructive' : ''}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="edit-email" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email
            </Label>
            <Input
              id="edit-email"
              type="email"
              {...register('email')}
              placeholder="Digite o email"
              className={errors.email ? 'border-destructive' : ''}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          {/* Cidade */}
          <div className="space-y-2">
            <Label htmlFor="edit-city" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Cidade
            </Label>
            <Input
              id="edit-city"
              {...register('city')}
              placeholder="Digite a cidade"
              className={errors.city ? 'border-destructive' : ''}
            />
            {errors.city && (
              <p className="text-sm text-destructive">{errors.city.message}</p>
            )}
          </div>

          {/* Botões de ação */}
          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              disabled={!isValid || !isDirty || isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Salvando...
                </>
              ) : (
                'Salvar Alterações'
              )}
            </Button>
            
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
