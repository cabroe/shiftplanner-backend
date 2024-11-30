import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Logo from '@/components/Logo'

export default function LoginPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement actual login logic
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-muted/30 grid place-items-center p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <Logo className="w-20 h-20" />
          </div>
          <CardTitle className="text-2xl">ShiftPlanner</CardTitle>
          <CardDescription>
            Melden Sie sich an, um Ihre Schichtpläne zu verwalten
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@firma.de"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Passwort</Label>
                <Button 
                  variant="link" 
                  className="px-0 font-normal"
                  onClick={(e) => {
                    e.preventDefault()
                    // TODO: Implement password reset
                  }}
                >
                  Passwort vergessen?
                </Button>
              </div>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={e => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="remember"
                checked={formData.rememberMe}
                onCheckedChange={checked => 
                  setFormData({ ...formData, rememberMe: checked })
                }
              />
              <Label htmlFor="remember" className="font-normal">
                Angemeldet bleiben
              </Label>
            </div>

            <Button type="submit" className="w-full">
              Anmelden
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}