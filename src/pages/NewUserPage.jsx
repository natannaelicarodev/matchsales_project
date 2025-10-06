import { useNavigate } from 'react-router-dom'
import { ArrowLeft, UserPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import UserForm from '@/components/UserForm'
import { useCreateUser } from '@/hooks/useUsers'

export default function NewUserPage() {
  const navigate = useNavigate()
  const createUserMutation = useCreateUser()

  const handleSubmit = async (userData) => {
    try {
      await createUserMutation.mutateAsync(userData)
      // Redirecionar para a lista de usuários após sucesso
      navigate('/users')
    } catch (error) {
      // Erro já é tratado no hook useCreateUser
      console.error('Erro ao criar usuário:', error)
    }
  }

  const handleGoBack = () => {
    navigate('/users')
  }

  return (
    <div className="space-y-6">
      {/* Header da página */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={handleGoBack}
          className="shrink-0"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            <UserPlus className="h-8 w-8 text-primary" />
            Novo Usuário
          </h1>
          <p className="text-muted-foreground">
            Adicione um novo usuário ao sistema preenchendo as informações abaixo
          </p>
        </div>
      </div>

      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
        <button
          onClick={handleGoBack}
          className="hover:text-foreground transition-colors"
        >
          Usuários
        </button>
        <span>/</span>
        <span className="text-foreground">Novo Usuário</span>
      </nav>

      {/* Formulário */}
      <div className="flex justify-center">
        <UserForm
          onSubmit={handleSubmit}
          isLoading={createUserMutation.isPending}
          title="Criar Novo Usuário"
          description="Preencha as informações do usuário"
          submitText="Criar Usuário"
        />
      </div>

      {/* Informações adicionais */}
      <div className="max-w-2xl mx-auto">
        <div className="bg-muted/50 rounded-lg p-4 space-y-2">
          <h3 className="font-medium text-foreground">Dicas importantes:</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• O nome deve conter apenas letras e espaços</li>
            <li>• O email deve ter um formato válido (exemplo@dominio.com)</li>
            <li>• Todos os campos opcionais podem ser preenchidos posteriormente</li>
            <li>• As informações podem ser editadas após a criação</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
