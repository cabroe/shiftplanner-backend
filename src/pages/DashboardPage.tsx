import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEmployees } from "@/hooks/useEmployees"
import { useDepartments } from "@/hooks/useDepartments"
import { useShiftTemplates } from "@/hooks/useShiftTemplates"
import { useShiftTypes } from "@/hooks/useShiftTypes"
import { Users, Building2, Clock, Layers, TrendingUp } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { EmployeeCard } from "@/components/employees/EmployeeCard"
import { DepartmentCard } from "@/components/departments/DepartmentCard"

export default function DashboardPage() {
  const { employees } = useEmployees()
  const { departments } = useDepartments()
  const { shiftTemplates } = useShiftTemplates()
  const { shiftTypes } = useShiftTypes()

  const stats = [
    {
      title: "Mitarbeiter",
      value: employees.length,
      description: "Aktive Mitarbeiter",
      icon: Users,
      color: "text-blue-500",
      trend: "+2.5%",
      trendUp: true
    },
    {
      title: "Abteilungen",
      value: departments.length,
      description: "Gesamt",
      icon: Building2,
      color: "text-green-500",
      trend: "0%",
      trendUp: true
    },
    {
      title: "Schichtvorlagen",
      value: shiftTemplates.length,
      description: "Aktive Vorlagen",
      icon: Clock,
      color: "text-purple-500",
      trend: "+5%",
      trendUp: true
    },
    {
      title: "Schichttypen",
      value: shiftTypes.length,
      description: "Verfügbare Typen",
      icon: Layers,
      color: "text-orange-500",
      trend: "+1%",
      trendUp: true
    }
  ]

  const chartData = [
    { name: 'Mo', value: 12 },
    { name: 'Di', value: 15 },
    { name: 'Mi', value: 18 },
    { name: 'Do', value: 14 },
    { name: 'Fr', value: 16 },
    { name: 'Sa', value: 8 },
    { name: 'So', value: 6 }
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Willkommen im ShiftPlanner Dashboard
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-xs">
                <span className="text-muted-foreground">
                  {stat.description}
                </span>
                <div className={`ml-2 flex items-center ${
                  stat.trendUp ? 'text-green-500' : 'text-red-500'
                }`}>
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {stat.trend}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-7 lg:grid-cols-12">
        <Card className="md:col-span-4 lg:col-span-8">
          <CardHeader>
            <CardTitle>Schichtverteilung</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-3 lg:col-span-4">
          <CardHeader>
            <CardTitle>Neueste Mitarbeiter</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {employees.slice(0, 4).map(employee => (
              <EmployeeCard 
                key={employee.ID} 
                employee={employee}
                className="hover:bg-muted/50 transition-colors"
              />
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Abteilungsübersicht</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            {departments.map(department => (
              <DepartmentCard 
                key={department.ID} 
                department={department}
                className="hover:bg-muted/50 transition-colors"
              />
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Aktuelle Schichten</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {shiftTypes.slice(0, 5).map(shiftType => (
                <div 
                  key={shiftType.ID}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted/50"
                >
                  <div 
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: shiftType.color }}
                  />
                  <div>
                    <div className="font-medium">{shiftType.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {shiftType.start_time} - {shiftType.end_time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}