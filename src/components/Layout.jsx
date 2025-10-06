import { useTheme } from '@/components/theme-provider'
import { Button } from '@/components/ui/button'
import { Moon, Plus, Sun } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

export default function Layout({ children }) {
  const location = useLocation()
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2 mb-2 sm:mb-0">
              {theme === 'light' ? (
                <img src="/src/assets/matchsales-light.webp" alt="MatchSales Logo Light" className="h-20" />
              ) : (
                <img src="/src/assets/matchsales-dark.webp" alt="MatchSales Logo Dark" className="h-20" />
              )}
            </Link>

            <nav className="flex flex-1 justify-center items-center space-x-4">
              <Link
                to="/users"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${location.pathname === '/users' || location.pathname === '/'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`}
              >
                Usuários
              </Link>
              <Link
                to="/users/new"
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${location.pathname === '/users/new'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`}
              >
                <Plus className="h-4 w-4" />
                <span>Novo Usuário</span>
              </Link>
            </nav>

            <Button
              variant="outline"
              size="icon"
              onClick={toggleTheme}
              className="ml-auto"
            >
              {theme === 'light' ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
              <span className="sr-only">Alternar tema</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t bg-card mt-auto">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-sm text-muted-foreground">
            <p>
              Desenvolvido como parte do desafio técnico Match Sales Frontend
            </p>
            <p className="mt-1">
              Tecnologias: React + React Query + React Hook Form + Zod + ShadcnUI + Tailwind CSS
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
