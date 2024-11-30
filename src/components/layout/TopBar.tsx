import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
  Search,
  Settings,
  LogOut,
  User,
  Bell,
  X
} from 'lucide-react'
import { useEmployees } from '@/hooks/useEmployees'
import { Employee } from '@/types'
import { cn } from '@/lib/utils'

export default function TopBar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { employees } = useEmployees()
  const [searchQuery, setSearchQuery] = useState('')
  const [showResults, setShowResults] = useState(false)

  const isEmployeesPage = location.pathname === '/employees'

  const filteredEmployees = employees.filter(employee => {
    const searchLower = searchQuery.toLowerCase()
    return (
      employee.first_name.toLowerCase().includes(searchLower) ||
      employee.last_name.toLowerCase().includes(searchLower) ||
      employee.email.toLowerCase().includes(searchLower)
    )
  })

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest('.search-container')) {
        setShowResults(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  const handleEmployeeClick = (employee: Employee) => {
    setSearchQuery('')
    setShowResults(false)
    // TODO: Navigate to employee details or trigger edit modal
    navigate('/employees')
  }

  return (
    <div className="bg-white border-b">
      <div className="flex items-center justify-between px-8 py-4">
        <div className="flex items-center gap-4 flex-1">
          {isEmployeesPage && (
            <div className="relative search-container max-w-md w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Mitarbeiter suchen..."
                className="pl-9 w-full"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setShowResults(true)
                }}
                onFocus={() => setShowResults(true)}
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6"
                  onClick={() => {
                    setSearchQuery('')
                    setShowResults(false)
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
              {showResults && searchQuery && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-md border shadow-lg max-h-[300px] overflow-auto z-50">
                  {filteredEmployees.length > 0 ? (
                    filteredEmployees.map(employee => (
                      <div
                        key={employee.ID}
                        className="flex items-center gap-3 p-3 hover:bg-muted/50 cursor-pointer"
                        onClick={() => handleEmployeeClick(employee)}
                      >
                        <div 
                          className="w-8 h-8 rounded-full flex items-center justify-center text-white font-medium text-sm"
                          style={{ backgroundColor: employee.color }}
                        >
                          {employee.first_name[0]}{employee.last_name[0]}
                        </div>
                        <div>
                          <div className="font-medium">
                            {employee.first_name} {employee.last_name}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {employee.email}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-3 text-sm text-muted-foreground text-center">
                      Keine Ergebnisse gefunden
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="relative"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel>Mein Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/profile')}>
                <User className="mr-2 h-4 w-4" />
                <span>Profil</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/settings')}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Einstellungen</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/login')}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Abmelden</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}