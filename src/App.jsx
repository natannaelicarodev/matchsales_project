import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/sonner'
import { ThemeProvider } from '@/components/theme-provider'
import Layout from '@/components/Layout'
import UsersPage from '@/pages/UsersPage'
import NewUserPage from '@/pages/NewUserPage'
import './App.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, 
      cacheTime: 10 * 60 * 1000, 
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="matchsales_project-theme">
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<UsersPage />} />
              <Route path="/users" element={<UsersPage />} />
              <Route path="/users/new" element={<NewUserPage />} />
            </Routes>
          </Layout>
          <Toaster />
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
