'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import {
  User,
  Mail,
  Phone,
  Building,
  MapPin,
  Calendar,
  Edit,
  Save,
  X,
  Camera,
  Shield,
  Key,
  Globe,
  Clock,
  Award,
  Star,
  TrendingUp,
  CheckCircle,
  ArrowLeft,
  Loader2,
  Copy,
  Check,
  ExternalLink,
  Smartphone,
  MessageSquare,
  Linkedin,
  Twitter,
  Github,
  Package,    // Added
  Truck,      // Added
  Map,        // Added
  Users       // Added
} from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card'
import { Input } from '../../components/ui/Input'
import { Badge } from '../../components/ui/Badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/Tabs'
import toast from 'react-hot-toast'

export default function ProfilePage() {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [copied, setCopied] = useState(false)
  
  // Profile data
  const [profile, setProfile] = useState({
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@logitrack.com',
    phone: '+1 (555) 123-4567',
    company: 'Logistics Solutions Inc.',
    role: 'Administrator',
    department: 'Operations',
    location: 'New York, NY',
    timezone: 'America/New_York (EST)',
    joinedDate: '2024-01-15',
    bio: 'Logistics professional with 10+ years of experience in supply chain management and operations.',
    skills: ['Logistics', 'Supply Chain', 'Operations', 'Team Management', 'Data Analytics'],
    socialLinks: {
      linkedin: 'https://www.linkedin.com/in/chimaobi-uboegbu-401ba27a/1',
      twitter: 'https://twitter.com/adminuser',
      github: 'https://github.com/cpukka',
    }
  })

  // Stats
  const stats = [
    { label: 'Shipments Managed', value: '1,247', icon: TrendingUp, change: '+12%', color: 'text-blue-500' },
    { label: 'On-Time Delivery', value: '96.7%', icon: CheckCircle, change: '+2.3%', color: 'text-green-500' },
    { label: 'Driver Rating', value: '4.9', icon: Star, change: '+0.2', color: 'text-amber-500' },
    { label: 'Years Experience', value: '10+', icon: Award, change: '', color: 'text-purple-500' },
  ]

  // Activity log
  const activities = [
    { action: 'Created new shipment LTK789456123', time: '2 hours ago', type: 'shipment' },
    { action: 'Updated driver schedule', time: '5 hours ago', type: 'driver' },
    { action: 'Completed route optimization', time: '1 day ago', type: 'route' },
    { action: 'Added new customer: TechCorp Inc.', time: '2 days ago', type: 'customer' },
  ]

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSaving(false)
    setIsEditing(false)
    toast.success('Profile updated successfully!')
  }

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email)
    setCopied(true)
    toast.success('Email copied to clipboard!')
    setTimeout(() => setCopied(false), 2000)
  }

  const handleCancel = () => {
    setIsEditing(false)
    // Reset to original data if needed
    toast.info('Changes discarded')
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-card-foreground">Profile</h1>
            <p className="text-muted-foreground mt-1">Manage your personal information and preferences</p>
          </div>
          
          <div className="flex items-center gap-3">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={handleCancel} className="gap-2">
                  <X className="w-4 h-4" />
                  Cancel
                </Button>
                <Button onClick={handleSave} disabled={isSaving} className="gap-2">
                  {isSaving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)} className="gap-2">
                <Edit className="w-4 h-4" />
                Edit Profile
              </Button>
            )}
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold text-card-foreground mt-1">{stat.value}</p>
                      {stat.change && (
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-xs text-green-500">{stat.change}</span>
                          <span className="text-xs text-muted-foreground">vs last month</span>
                        </div>
                      )}
                    </div>
                    <div className={`p-3 bg-${stat.color.split('-')[1]}-500/10 rounded-full`}>
                      <Icon className={`w-5 h-5 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-flex">
              <TabsTrigger value="profile" className="gap-2">
                <User className="w-4 h-4" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="activities" className="gap-2">
                <Clock className="w-4 h-4" />
                Activities
              </TabsTrigger>
              <TabsTrigger value="security" className="gap-2">
                <Shield className="w-4 h-4" />
                Security
              </TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Profile Card */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="w-5 h-5 text-primary" />
                      Personal Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                          {profile.firstName[0]}{profile.lastName[0]}
                        </div>
                        {isEditing && (
                          <button className="absolute -bottom-1 -right-1 p-1.5 bg-primary rounded-full text-white hover:bg-primary/90 transition-colors">
                            <Camera className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-card-foreground">
                          {profile.firstName} {profile.lastName}
                        </h2>
                        <p className="text-muted-foreground">{profile.role}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {profile.department}
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            Active
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-card-foreground">First Name</label>
                        <Input
                          value={profile.firstName}
                          onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-card-foreground">Last Name</label>
                        <Input
                          value={profile.lastName}
                          onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-card-foreground">Email Address</label>
                        <div className="relative">
                          <Input
                            type="email"
                            value={profile.email}
                            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                            disabled={!isEditing}
                            className="pr-12"
                          />
                          <button
                            onClick={handleCopyEmail}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          >
                            {copied ? (
                              <Check className="w-4 h-4 text-green-500" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-card-foreground">Phone Number</label>
                        <Input
                          type="tel"
                          value={profile.phone}
                          onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-card-foreground">Company</label>
                        <Input
                          value={profile.company}
                          onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-card-foreground">Location</label>
                        <Input
                          value={profile.location}
                          onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-medium text-card-foreground">Bio</label>
                        <textarea
                          value={profile.bio}
                          onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                          disabled={!isEditing}
                          className="w-full px-3 py-2 bg-background border border-input rounded-lg resize-none h-24 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Right Column - Quick Info & Skills */}
                <div className="space-y-6">
                  {/* Quick Info */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        Quick Info
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-3 text-sm">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Joined:</span>
                        <span className="font-medium text-card-foreground">
                          {new Date(profile.joinedDate).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Timezone:</span>
                        <span className="font-medium text-card-foreground">{profile.timezone}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Globe className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Language:</span>
                        <span className="font-medium text-card-foreground">English</span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Skills */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        Skills
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {profile.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Social Links */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        Social Links
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <a
                        href={profile.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-accent transition-colors group"
                      >
                        <div className="flex items-center gap-2">
                          <Linkedin className="w-4 h-4 text-[#0A66C2]" />
                          <span className="text-sm">LinkedIn</span>
                        </div>
                        <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                      <a
                        href={profile.socialLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-accent transition-colors group"
                      >
                        <div className="flex items-center gap-2">
                          <Twitter className="w-4 h-4 text-[#1DA1F2]" />
                          <span className="text-sm">Twitter</span>
                        </div>
                        <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                      <a
                        href={profile.socialLinks.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-accent transition-colors group"
                      >
                        <div className="flex items-center gap-2">
                          <Github className="w-4 h-4" />
                          <span className="text-sm">GitHub</span>
                        </div>
                        <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Activities Tab */}
            <TabsContent value="activities">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activities.map((activity, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-4 p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors"
                      >
                        <div className="p-2 bg-primary/10 rounded-full">
                          {activity.type === 'shipment' && <Package className="w-4 h-4 text-primary" />}
                          {activity.type === 'driver' && <Truck className="w-4 h-4 text-primary" />}
                          {activity.type === 'route' && <Map className="w-4 h-4 text-primary" />}
                          {activity.type === 'customer' && <Users className="w-4 h-4 text-primary" />}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-card-foreground">{activity.action}</p>
                          <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {activity.type}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Key className="w-5 h-5 text-primary" />
                      Change Password
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-card-foreground">Current Password</label>
                      <Input type="password" placeholder="Enter current password" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-card-foreground">New Password</label>
                      <Input type="password" placeholder="Enter new password" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-card-foreground">Confirm New Password</label>
                      <Input type="password" placeholder="Confirm new password" />
                    </div>
                    <Button className="w-full gap-2">
                      <Key className="w-4 h-4" />
                      Update Password
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-primary" />
                      Two-Factor Authentication
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-2">
                        Add an extra layer of security to your account by enabling two-factor authentication.
                      </p>
                      <Button variant="outline" className="gap-2 w-full">
                        <Smartphone className="w-4 h-4" />
                        Set Up 2FA
                      </Button>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <h4 className="text-sm font-medium text-card-foreground mb-2">Active Sessions</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            <span>Current Session</span>
                          </div>
                          <span className="text-muted-foreground">Chrome • Windows</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-muted"></div>
                            <span className="text-muted-foreground">Mobile App</span>
                          </div>
                          <span className="text-muted-foreground">iPhone • iOS</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}