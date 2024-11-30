import { NavLink } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { 
  LayoutDashboard, 
  Users, 
  Calendar,
  Settings,
  Building2,
  Clock,
  Layers,
  FolderCog
} from 'lucide-react'
import Logo from '@/components/Logo'

const mainNavItems = [
  { to: "/", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/shift-planner", icon: Calendar, label: "Schichtplan" }
]

const adminNavItems = [
  { to: "/employees", icon: Users, label: "Mitarbeiter" },
  { to: "/departments", icon: Building2, label: "Abteilungen" },
  { to: "/shift-types", icon: Layers, label: "Schichttypen" },
  { to: "/shift-templates", icon: Clock, label: "Schichtvorlagen" }
]

export default function Sidebar() {
  return (
    <div className="w-64 bg-white border-r h-screen flex flex-col">
      <div className="p-6">
        <div className="flex items-center gap-2">
          <Logo className="w-8 h-8" />
          <span className="text-xl font-bold">ShiftPlanner</span>
        </div>
      </div>
      
      <nav className="flex-1 px-3">
        <div className="space-y-1">
          {mainNavItems.map(item => (
            <NavLink 
              key={item.to} 
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
                  isActive 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-muted-foreground hover:bg-muted'
                }`
              }
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="mt-8">
          <div className="px-3 py-2 text-xs font-medium text-muted-foreground">
            <FolderCog className="inline-block mr-2 h-4 w-4" />
            Verwaltung
          </div>
          
          <div className="space-y-1">
            {adminNavItems.map(item => (
              <NavLink 
                key={item.to} 
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
                    isActive 
                      ? 'bg-primary text-primary-foreground' 
                      : 'text-muted-foreground hover:bg-muted'
                  }`
                }
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      <div className="p-3 mt-auto">
        <NavLink 
          to="/settings"
          className={({ isActive }) =>
            `flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
              isActive 
                ? 'bg-primary text-primary-foreground' 
                : 'text-muted-foreground hover:bg-muted'
            }`
          }
        >
          <Settings className="h-4 w-4" />
          Einstellungen
        </NavLink>
      </div>
    </div>
  )
}