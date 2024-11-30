import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Bell, 
  Moon,
  Languages,
  Mail,
  Calendar,
  Shield,
  Smartphone,
  Clock,
  Building2
} from "lucide-react"

interface SettingsGroup {
  id: string
  title: string
  description: string
  icon: React.ElementType
  settings: Setting[]
}

interface Setting {
  id: string
  label: string
  description: string
  type: 'switch' | 'select' | 'input'
  value: any
  options?: { label: string; value: string }[]
}

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    notifications: true,
    emailUpdates: true,
    darkMode: false,
    language: 'de',
    workWeek: '5',
    autoPlanning: true,
    weekendRotation: true,
    mobileAccess: true,
    twoFactorAuth: false,
    departmentSync: true,
    minRestTime: '11',
    maxWorkHours: '10'
  })

  const handleChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  const settingsGroups: SettingsGroup[] = [
    {
      id: 'appearance',
      title: 'Darstellung',
      description: 'Passen Sie das Erscheinungsbild der Anwendung an',
      icon: Moon,
      settings: [
        {
          id: 'darkMode',
          label: 'Dunkelmodus',
          description: 'Aktivieren Sie den dunklen Farbmodus',
          type: 'switch',
          value: settings.darkMode
        },
        {
          id: 'language',
          label: 'Sprache',
          description: 'Wählen Sie Ihre bevorzugte Sprache',
          type: 'select',
          value: settings.language,
          options: [
            { label: 'Deutsch', value: 'de' },
            { label: 'English', value: 'en' },
            { label: 'Français', value: 'fr' }
          ]
        }
      ]
    },
    {
      id: 'notifications',
      title: 'Benachrichtigungen',
      description: 'Verwalten Sie Ihre Benachrichtigungseinstellungen',
      icon: Bell,
      settings: [
        {
          id: 'notifications',
          label: 'Push-Benachrichtigungen',
          description: 'Erhalten Sie Push-Benachrichtigungen über Änderungen',
          type: 'switch',
          value: settings.notifications
        },
        {
          id: 'emailUpdates',
          label: 'E-Mail Benachrichtigungen',
          description: 'Erhalten Sie Updates per E-Mail',
          type: 'switch',
          value: settings.emailUpdates
        }
      ]
    },
    {
      id: 'planning',
      title: 'Schichtplanung',
      description: 'Konfigurieren Sie die Schichtplanungsoptionen',
      icon: Calendar,
      settings: [
        {
          id: 'workWeek',
          label: 'Arbeitswoche',
          description: 'Legen Sie die Standard-Arbeitstage fest',
          type: 'select',
          value: settings.workWeek,
          options: [
            { label: '5 Tage', value: '5' },
            { label: '6 Tage', value: '6' },
            { label: '7 Tage', value: '7' }
          ]
        },
        {
          id: 'autoPlanning',
          label: 'Automatische Planung',
          description: 'KI-basierte Schichtplanung aktivieren',
          type: 'switch',
          value: settings.autoPlanning
        },
        {
          id: 'weekendRotation',
          label: 'Wochenend-Rotation',
          description: 'Faire Verteilung der Wochenendschichten',
          type: 'switch',
          value: settings.weekendRotation
        },
        {
          id: 'minRestTime',
          label: 'Minimale Ruhezeit',
          description: 'Minimale Ruhezeit zwischen Schichten (Stunden)',
          type: 'input',
          value: settings.minRestTime
        },
        {
          id: 'maxWorkHours',
          label: 'Maximale Arbeitszeit',
          description: 'Maximale Arbeitszeit pro Tag (Stunden)',
          type: 'input',
          value: settings.maxWorkHours
        }
      ]
    },
    {
      id: 'security',
      title: 'Sicherheit',
      description: 'Verwalten Sie Ihre Sicherheitseinstellungen',
      icon: Shield,
      settings: [
        {
          id: 'twoFactorAuth',
          label: 'Zwei-Faktor-Authentifizierung',
          description: 'Aktivieren Sie die zusätzliche Sicherheitsebene',
          type: 'switch',
          value: settings.twoFactorAuth
        },
        {
          id: 'mobileAccess',
          label: 'Mobiler Zugriff',
          description: 'Zugriff über mobile Geräte erlauben',
          type: 'switch',
          value: settings.mobileAccess
        }
      ]
    }
  ]

  const renderSetting = (setting: Setting) => {
    switch (setting.type) {
      case 'switch':
        return (
          <div className="flex items-center justify-between" key={setting.id}>
            <div className="space-y-0.5">
              <Label htmlFor={setting.id}>{setting.label}</Label>
              <p className="text-sm text-muted-foreground">
                {setting.description}
              </p>
            </div>
            <Switch
              id={setting.id}
              checked={setting.value}
              onCheckedChange={checked => handleChange(setting.id, checked)}
            />
          </div>
        )
      
      case 'select':
        return (
          <div className="space-y-2" key={setting.id}>
            <Label htmlFor={setting.id}>{setting.label}</Label>
            <p className="text-sm text-muted-foreground mb-2">
              {setting.description}
            </p>
            <Select
              value={setting.value}
              onValueChange={value => handleChange(setting.id, value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {setting.options?.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )

      case 'input':
        return (
          <div className="space-y-2" key={setting.id}>
            <Label htmlFor={setting.id}>{setting.label}</Label>
            <p className="text-sm text-muted-foreground mb-2">
              {setting.description}
            </p>
            <Input
              id={setting.id}
              type="number"
              value={setting.value}
              onChange={e => handleChange(setting.id, e.target.value)}
            />
          </div>
        )
    }
  }

  return (
    <div className="container max-w-4xl mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Einstellungen</h1>
        <p className="text-muted-foreground mt-2">
          Verwalten Sie Ihre Anwendungseinstellungen und Präferenzen
        </p>
      </div>

      <Tabs defaultValue={settingsGroups[0].id} className="space-y-6">
        <TabsList className="w-full justify-start">
          {settingsGroups.map(group => (
            <TabsTrigger 
              key={group.id} 
              value={group.id}
              className="flex items-center gap-2"
            >
              <group.icon className="h-4 w-4" />
              {group.title}
            </TabsTrigger>
          ))}
        </TabsList>

        {settingsGroups.map(group => (
          <TabsContent key={group.id} value={group.id}>
            <Card>
              <CardHeader>
                <CardTitle>{group.title}</CardTitle>
                <CardDescription>{group.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {group.settings.map(setting => renderSetting(setting))}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      <div className="flex justify-end gap-4 mt-8">
        <Button variant="outline">Zurücksetzen</Button>
        <Button>Speichern</Button>
      </div>
    </div>
  )
}