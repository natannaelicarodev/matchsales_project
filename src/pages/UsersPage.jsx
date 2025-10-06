import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Users, Loader2, AlertCircle, RefreshCw, BarChart3 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import UserCard from '@/components/UserCard'
import SearchInput from '@/components/SearchInput'
import UserStats from '@/components/UserStats'
import { useUsers } from '@/hooks/useUsers'

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const { data: users, isLoading, error, refetch, isRefetching } = useUsers()

  // Filtrar usuários baseado no termo de busca
  const filteredUsers = useMemo(() => {
    if (!users) return []
    
    if (!searchTerm.trim()) return users
    
    const term = searchTerm.toLowerCase()
    return users.filter(user => 
      user.name.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term) ||
      user.address?.city?.toLowerCase().includes(term)
    )
  }, [users, searchTerm])

  const handleSearch = (term) => {
    setSearchTerm(term)
  }

  const handleRefresh = () => {
    refetch()
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-muted-foreground">Carregando usuários...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Erro ao carregar usuários: {error.message}
          </AlertDescription>
        </Alert>
        <div className="flex justify-center">
          <Button onClick={handleRefresh} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Tentar novamente
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header da página */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            <Users className="h-8 w-8 text-primary" />
            Gerenciamento de Usuários
          </h1>
          <p className="text-muted-foreground">
            Gerencie e visualize todos os usuários do sistema
          </p>
        </div>
        
        <Link to="/users/new">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Novo Usuário
          </Button>
        </Link>
      </div>

      {/* Tabs para navegação */}
      <Tabs defaultValue="list" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <TabsList className="grid w-full max-w-[400px] grid-cols-2">
            <TabsTrigger value="list" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Lista de Usuários
            </TabsTrigger>
            <TabsTrigger value="stats" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Estatísticas
            </TabsTrigger>
          </TabsList>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefetching}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefetching ? 'animate-spin' : ''}`} />
            Atualizar
          </Button>
        </div>

        {/* Tab de Lista */}
        <TabsContent value="list" className="space-y-6">
          {/* Barra de busca */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 bg-card rounded-lg border">
            <SearchInput onSearch={handleSearch} />
            
            <div className="text-sm text-muted-foreground">
              {searchTerm ? (
                <>
                  <span className="font-medium text-foreground">{filteredUsers.length}</span> de{' '}
                  <span className="font-medium text-foreground">{users?.length || 0}</span> usuários
                </>
              ) : (
                <>
                  <span className="font-medium text-foreground">{users?.length || 0}</span> usuários total
                </>
              )}
            </div>
          </div>

          {/* Lista de usuários */}
          {filteredUsers.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[300px] space-y-4">
              <Users className="h-12 w-12 text-muted-foreground" />
              <div className="text-center space-y-2">
                <h3 className="text-lg font-medium text-foreground">
                  {searchTerm ? 'Nenhum usuário encontrado' : 'Nenhum usuário cadastrado'}
                </h3>
                <p className="text-muted-foreground max-w-md">
                  {searchTerm 
                    ? `Não encontramos usuários que correspondam à busca "${searchTerm}". Tente outros termos.`
                    : 'Comece adicionando o primeiro usuário ao sistema.'
                  }
                </p>
              </div>
              {!searchTerm && (
                <Link to="/users/new">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Primeiro Usuário
                  </Button>
                </Link>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUsers.map((user) => (
                <UserCard key={user.id} user={user} />
              ))}
            </div>
          )}
        </TabsContent>

        {/* Tab de Estatísticas */}
        <TabsContent value="stats">
          <UserStats users={users || []} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
