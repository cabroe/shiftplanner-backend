import { Outlet } from 'react-router-dom'
import Sidebar from '@/components/sidebar/Sidebar'
import TopBar from '@/components/layout/TopBar'

export default function Dashboard() {
  return (
    <div className="h-screen bg-muted/30 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <TopBar />
        <main className="flex-1 p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}