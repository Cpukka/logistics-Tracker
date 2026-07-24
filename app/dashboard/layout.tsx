// app/dashboard/layout.tsx
import { Sidebar } from '../components/layout/Sidebar'
import { Header } from '../components/layout/Header'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 ml-0 lg:ml-0">
          {children}
        </main>
      </div>
    </div>
  )
}