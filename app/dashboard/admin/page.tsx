'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { 
  Users, 
  Shield, 
  Settings, 
  FileText,
  Database,
  Server,
  Bell,
  Key
} from 'lucide-react'

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('users')

  const tabs = [
    { id: 'users', label: 'Users', icon: Users },
    { id: 'roles', label: 'Roles & Permissions', icon: Shield },
    { id: 'system', label: 'System Settings', icon: Settings },
    { id: 'logs', label: 'Audit Logs', icon: FileText },
    { id: 'backup', label: 'Backup & Restore', icon: Database },
    { id: 'api', label: 'API Management', icon: Server },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">System administration and configuration</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Users</p>
                <p className="text-2xl font-bold">156</p>
              </div>
              <Users className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Sessions</p>
                <p className="text-2xl font-bold">42</p>
              </div>
              <Key className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">API Requests</p>
                <p className="text-2xl font-bold">12.5k</p>
              </div>
              <Server className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Notifications</p>
                <p className="text-2xl font-bold">238</p>
              </div>
              <Bell className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <CardTitle>System Management</CardTitle>
            <div className="flex gap-2">
              {tabs.map(tab => {
                const Icon = tab.icon
                return (
                  <Button
                    key={tab.id}
                    variant={activeTab === tab.id ? 'default' : 'outline'}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {tab.label}
                  </Button>
                )
              })}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Tab content would go here */}
          <div className="p-8 text-center text-muted-foreground">
            Select a tab to manage system settings
          </div>
        </CardContent>
      </Card>
    </div>
  )
}