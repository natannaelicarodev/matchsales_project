import { Users, MapPin, Building, Globe } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function UserStats({ users = [] }) {
  // Calcular estatísticas
  const totalUsers = users.length
  const usersWithCity = users.filter(user => user.address?.city).length

  // Cidades mais comuns
  const cityCount = users.reduce((acc, user) => {
    const city = user.address?.city
    if (city) {
      acc[city] = (acc[city] || 0) + 1
    }
    return acc
  }, {})

  const topCities = Object.entries(cityCount)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)

  const stats = [
    {
      title: 'Total de Usuários',
      value: totalUsers,
      icon: Users,
      description: 'Usuários cadastrados no sistema'
    },
    {
      title: 'Com Cidades',
      value: usersWithCity,
      icon: MapPin,
      description: `${totalUsers > 0 ? Math.round((usersWithCity / totalUsers) * 100) : 0}% dos usuários`
    }
  ]

  return (
    <div className="space-y-6">
      {/* Cards de estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Informações adicionais */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Cidades */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Cidades Mais Comuns
            </CardTitle>
          </CardHeader>
          <CardContent>
            {topCities.length > 0 ? (
              <div className="space-y-2">
                {topCities.map(([city, count], index) => (
                  <div key={city} className="flex items-center justify-between">
                    <span className="text-sm text-foreground">{city}</span>
                    <Badge variant="secondary" className="text-xs">
                      {count} usuário{count > 1 ? 's' : ''}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Nenhuma cidade informada pelos usuários
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
