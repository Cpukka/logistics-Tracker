'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Globe, 
  CreditCard, 
  Users,
  Mail,
  Lock,
  Key,
  Palette,
  Moon,
  Sun,
  Monitor,
  Smartphone,
  Laptop,
  CheckCircle,
  AlertTriangle,
  Save,
  RefreshCw,
  LogOut,
  Trash2,
  ArrowRight
} from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card'
import { Input } from '../../components/ui/Input'
import { Badge } from '../../components/ui/Badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/Tabs'
import { Switch } from '../../components/ui/Switch'
import toast from 'react-hot-toast'
import Link from 'next/link'

export default function SettingsPage() {
  const [isSaving, setIsSaving] = useState(false)
  const [profile, setProfile] = useState({
    name: 'Admin User',
    email: 'admin@logitrack.com',
    company: 'Logistics Solutions Inc.',
    phone: '+1 (555) 123-4567',
    timezone: 'America/New_York',
    language: 'English',
  })

  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    shipmentUpdates: true,
    deliveryAlerts: true,
    driverUpdates: true,
    marketingEmails: false,
    systemAlerts: true,
  })

  const [security, setSecurity] = useState({
    twoFactor: false,
    sessionTimeout: '30',
    rememberDevices: true,
    ipWhitelisting: false,
  })

  const handleSave = () => {
    setIsSaving(true)
    setTimeout(() => {
      toast.success('Settings saved successfully!')
      setIsSaving(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <Settings className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-card-foreground">Settings</h1>
            <Badge variant="outline" className="ml-2">v2.0</Badge>
          </div>
          <p className="text-muted-foreground">
            Manage your account settings, preferences, and security options
          </p>
        </motion.div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-2">
            <TabsTrigger value="profile" className="gap-2">
              <User className="w-4 h-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="w-4 h-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="security" className="gap-2">
              <Shield className="w-4 h-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="preferences" className="gap-2">
              <Globe className="w-4 h-4" />
              Preferences
            </TabsTrigger>
          </TabsList>

          {/* Profile Settings */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-card-foreground">Full Name</label>
                    <Input
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-card-foreground">Email Address</label>
                    <Input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-card-foreground">Company</label>
                    <Input
                      value={profile.company}
                      onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-card-foreground">Phone Number</label>
                    <Input
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <Button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="gap-2"
                  >
                    {isSaving ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        Save Changes
                      </>
                    )}
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-primary" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-card-foreground">Channels</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <span className="text-sm">Email Notifications</span>
                      <Switch
                        checked={notifications.email}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <span className="text-sm">Push Notifications</span>
                      <Switch
                        checked={notifications.push}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <span className="text-sm">SMS Notifications</span>
                      <Switch
                        checked={notifications.sms}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, sms: checked })}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-card-foreground">Events</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <span className="text-sm">Shipment Updates</span>
                      <Switch
                        checked={notifications.shipmentUpdates}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, shipmentUpdates: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <span className="text-sm">Delivery Alerts</span>
                      <Switch
                        checked={notifications.deliveryAlerts}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, deliveryAlerts: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <span className="text-sm">Driver Updates</span>
                      <Switch
                        checked={notifications.driverUpdates}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, driverUpdates: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <span className="text-sm">System Alerts</span>
                      <Switch
                        checked={notifications.systemAlerts}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, systemAlerts: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <span className="text-sm">Marketing Emails</span>
                      <Switch
                        checked={notifications.marketingEmails}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, marketingEmails: checked })}
                      />
                    </div>
                  </div>
                </div>

                <Button onClick={handleSave} className="gap-2">
                  <Save className="w-4 h-4" />
                  Save Notification Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  Security Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div>
                      <h4 className="font-medium text-card-foreground">Two-Factor Authentication</h4>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                    </div>
                    <Switch
                      checked={security.twoFactor}
                      onCheckedChange={(checked) => setSecurity({ ...security, twoFactor: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div>
                      <h4 className="font-medium text-card-foreground">Session Timeout</h4>
                      <p className="text-sm text-muted-foreground">Automatically log out after inactivity</p>
                    </div>
                    <select
                      value={security.sessionTimeout}
                      onChange={(e) => setSecurity({ ...security, sessionTimeout: e.target.value })}
                      className="px-3 py-1 bg-background border border-border rounded-lg text-sm"
                    >
                      <option value="15">15 minutes</option>
                      <option value="30">30 minutes</option>
                      <option value="60">1 hour</option>
                      <option value="120">2 hours</option>
                      <option value="0">Never</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div>
                      <h4 className="font-medium text-card-foreground">Remember Devices</h4>
                      <p className="text-sm text-muted-foreground">Allow trusted devices to stay signed in</p>
                    </div>
                    <Switch
                      checked={security.rememberDevices}
                      onCheckedChange={(checked) => setSecurity({ ...security, rememberDevices: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div>
                      <h4 className="font-medium text-card-foreground">IP Whitelisting</h4>
                      <p className="text-sm text-muted-foreground">Restrict access to specific IP addresses</p>
                    </div>
                    <Switch
                      checked={security.ipWhitelisting}
                      onCheckedChange={(checked) => setSecurity({ ...security, ipWhitelisting: checked })}
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-4 border-t border-border">
                  <Button onClick={handleSave} className="gap-2">
                    <Save className="w-4 h-4" />
                    Save Security Settings
                  </Button>
                  <Button variant="outline" className="gap-2 text-red-500 hover:text-red-600">
                    <Trash2 className="w-4 h-4" />
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preferences */}
          <TabsContent value="preferences">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-primary" />
                  Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-card-foreground">Language</label>
                    <select className="w-full px-3 py-2 bg-background border border-border rounded-lg">
                      <option>English</option>
                      <option>Spanish</option>
                      <option>French</option>
                      <option>German</option>
                      <option>Chinese</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-card-foreground">Time Zone</label>
                    <select className="w-full px-3 py-2 bg-background border border-border rounded-lg">
                      <option>America/New_York (EST)</option>
                      <option>America/Los_Angeles (PST)</option>
                      <option>America/Chicago (CST)</option>
                      <option>Europe/London (GMT)</option>
                      <option>Asia/Tokyo (JST)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-card-foreground">Theme Preference</label>
                  <div className="grid grid-cols-3 gap-4">
                    <button className="p-4 border border-border rounded-lg hover:border-primary transition-colors flex flex-col items-center gap-2">
                      <Sun className="w-6 h-6" />
                      <span className="text-sm">Light</span>
                    </button>
                    <button className="p-4 border border-primary rounded-lg flex flex-col items-center gap-2 bg-primary/5">
                      <Moon className="w-6 h-6 text-primary" />
                      <span className="text-sm font-medium text-primary">Dark</span>
                      <Badge className="text-xs">Current</Badge>
                    </button>
                    <button className="p-4 border border-border rounded-lg hover:border-primary transition-colors flex flex-col items-center gap-2">
                      <Monitor className="w-6 h-6" />
                      <span className="text-sm">System</span>
                    </button>
                  </div>
                </div>

                <Button onClick={handleSave} className="gap-2">
                  <Save className="w-4 h-4" />
                  Save Preferences
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Help Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 p-6 bg-muted/30 rounded-lg border border-border"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h3 className="font-semibold text-card-foreground">Need help with your settings?</h3>
              <p className="text-sm text-muted-foreground">Our support team is here to assist you</p>
            </div>
            <Link href="/help">
              <Button variant="outline" className="gap-2">
                Visit Help Center
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}