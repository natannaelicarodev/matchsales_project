import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createUserSchema } from '@/lib/validations'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, Mail, MapPin, User } from 'lucide-react'
import { useForm } from 'react-hook-form'

export default function UserForm({ 
  onSubmit, 
  isLoading = false, 
  defaultValues = {},
  title = "Novo Usuário",
  description = "Preencha as informações do usuário abaixo",
  submitText = "Criar Usuário"
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    reset,
    watch
  } = useForm({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      name: '',
      email: '',
      city: '',
      ...defaultValues
    },
    mode: 'onChange'
  })

  const watchedValues = watch()

  const onFormSubmit = async (data) => {
    try {
      await onSubmit(data)
      reset()
    } catch (error) {
      console.error('Erro ao submeter formulário:', error)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5 text-primary" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
          {/* Campos obrigatórios */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-foreground border-b pb-2">
              Informações Obrigatórias
            </h3>
            
            {/* Nome */}
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Nome
              </Label>
              <Input
                id="name"
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
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                placeholder="Digite o email"
                className={errors.email ? 'border-destructive' : ''}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>
          </div>

          {/* Campos opcionais */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-foreground border-b pb-2">
              Informações Adicionais (Opcionais)
            </h3>
            
            {/* Cidade */}
            <div className="space-y-2">
              <Label htmlFor="city" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Cidade
              </Label>
              <Input
                id="city"
                {...register('city')}
                placeholder="Digite a cidade"
                className={errors.city ? 'border-destructive' : ''}
              />
              {errors.city && (
                <p className="text-sm text-destructive">{errors.city.message}</p>
              )}
            </div>
          </div>

          {/* Preview dos dados */}
          {(watchedValues.name || watchedValues.email) && (
            <div className="space-y-2 p-4 bg-muted rounded-lg">
              <h4 className="text-sm font-medium text-foreground">Preview:</h4>
              <div className="text-sm text-muted-foreground space-y-1">
                {watchedValues.name && <p><strong>Nome:</strong> {watchedValues.name}</p>}
                {watchedValues.email && <p><strong>Email:</strong> {watchedValues.email}</p>}
                {watchedValues.city && <p><strong>Cidade:</strong> {watchedValues.city}</p>}
              </div>
            </div>
          )}

          {/* Botões de ação */}
          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              disabled={!isValid || isLoading}
              className="flex-1"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Salvando...
                </>
              ) : (
                submitText
              )}
            </Button>
            
            <Button
              type="button"
              variant="outline"
              onClick={() => reset()}
              disabled={!isDirty || isLoading}
            >
              Limpar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
