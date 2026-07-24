'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  Search, 
  Filter, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Package,
  Star,
  MoreVertical,
  UserPlus,
  Download,
  Eye,
  Edit,
  MessageSquare
} from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { cn } from '../../lib/utils'

interface Customer {
  id: string
  name: string
  email: string
  phone: string
  company: string
  address: string
  joinDate: Date
  totalOrders: number
  totalSpent: number
  status: 'active' | 'inactive' | 'vip'
  tags: string[]
  rating?: number
}

const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'TechCorp Inc.',
    email: 'orders@techcorp.com',
    phone: '+1 (617) 555-0123',
    company: 'TechCorp Inc.',
    address: '456 Innovation Dr, Boston, MA 02108',
    joinDate: new Date('2023-01-15'),
    totalOrders: 45,
    totalSpent: 152000,
    status: 'vip',
    tags: ['Enterprise', 'Monthly', 'Tech'],
    rating: 4.9,
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.j@retailstore.com',
    phone: '+1 (212) 555-9876',
    company: 'Retail Store Co.',
    address: '789 Broadway, New York, NY 10003',
    joinDate: new Date('2023-03-22'),
    totalOrders: 28,
    totalSpent: 87500,
    status: 'active',
    tags: ['Retail', 'Weekly'],
    rating: 4.7,
  },
  {
    id: '3',
    name: 'Global Logistics Ltd',
    email: 'shipping@globallogistics.com',
    phone: '+1 (305) 555-4567',
    company: 'Global Logistics Ltd',
    address: '123 Port Blvd, Miami, FL 33132',
    joinDate: new Date('2022-11-10'),
    totalOrders: 89,
    totalSpent: 321500,
    status: 'vip',
    tags: ['Logistics', 'International', 'High Volume'],
    rating: 4.8,
  },
  {
    id: '4',
    name: 'David Chen',
    email: 'david@startup.io',
    phone: '+1 (415) 555-7890',
    company: 'Startup.io',
    address: '101 Tech Park, San Francisco, CA 94107',
    joinDate: new Date('2023-06-05'),
    totalOrders: 12,
    totalSpent: 28500,
    status: 'active',
    tags: ['Startup', 'Tech'],
  },
  {
    id: '5',
    name: 'Maria Rodriguez',
    email: 'maria@fashionbrand.com',
    phone: '+1 (213) 555-2345',
    company: 'Fashion Brand',
    address: '567 Sunset Blvd, Los Angeles, CA 90028',
    joinDate: new Date('2023-02-18'),
    totalOrders: 32,
    totalSpent: 96500,
    status: 'active',
    tags: ['Fashion', 'Retail'],
    rating: 4.6,
  },
  {
    id: '6',
    name: 'James Wilson',
    email: 'james@medicalsupplies.com',
    phone: '+1 (312) 555-6789',
    company: 'Medical Supplies Inc.',
    address: '890 Health St, Chicago, IL 60611',
    joinDate: new Date('2022-09-30'),
    totalOrders: 67,
    totalSpent: 198500,
    status: 'active',
    tags: ['Medical', 'Urgent'],
    rating: 4.9,
  },
]

const statusColors = {
  active: 'bg-emerald-500',
  vip: 'bg-purple-500',
  inactive: 'bg-gray-500',
}

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([])

  const filteredCustomers = mockCustomers.filter(customer => {
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery)
    
    const matchesStatus = statusFilter === 'all' || customer.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const stats = {
    total: mockCustomers.length,
    active: mockCustomers.filter(c => c.status === 'active').length,
    vip: mockCustomers.filter(c => c.status === 'vip').length,
    totalRevenue: mockCustomers.reduce((sum, c) => sum + c.totalSpent, 0),
  }

  const toggleCustomerSelection = (customerId: string) => {
    setSelectedCustomers(prev =>
      prev.includes(customerId)
        ? prev.filter(id => id !== customerId)
        : [...prev, customerId]
    )
  }

  const selectAll = () => {
    if (selectedCustomers.length === filteredCustomers.length) {
      setSelectedCustomers([])
    } else {
      setSelectedCustomers(filteredCustomers.map(c => c.id))
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Customers
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage your customer relationships and track customer activity
          </p>
        </div>
        <Button variant="gradient" size="lg">
          <UserPlus className="w-5 h-5 mr-2" />
          Add Customer
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500/10 to-blue-600/5 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Customers</p>
                <p className="text-2xl font-bold mt-2">{stats.total}</p>
              </div>
              <Users className="w-10 h-10 text-blue-500/30" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active</p>
                <p className="text-2xl font-bold mt-2">{stats.active}</p>
              </div>
              <Users className="w-10 h-10 text-emerald-500/30" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500/10 to-purple-600/5 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">VIP Customers</p>
                <p className="text-2xl font-bold mt-2">{stats.vip}</p>
              </div>
              <Star className="w-10 h-10 text-purple-500/30" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-amber-500/10 to-amber-600/5 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold mt-2">
                  ${(stats.totalRevenue / 1000).toFixed(0)}K
                </p>
              </div>
              <Package className="w-10 h-10 text-amber-500/30" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters & Search */}
      <Card className="border-0 shadow-lg backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Search customers by name, email, or company..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-background rounded-lg border border-input focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 bg-background rounded-lg border border-input focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="vip">VIP</option>
                <option value="inactive">Inactive</option>
              </select>

              <Button variant="outline" size="lg">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>

              <Button variant="outline" size="lg">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Customers Table */}
      <Card className="border-0 shadow-lg backdrop-blur-sm overflow-hidden">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <CardTitle>Customer List</CardTitle>
            <div className="flex items-center gap-2">
              {selectedCustomers.length > 0 && (
                <span className="text-sm text-muted-foreground">
                  {selectedCustomers.length} selected
                </span>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={selectAll}
              >
                {selectedCustomers.length === filteredCustomers.length ? 'Deselect All' : 'Select All'}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b">
                <tr>
                  <th className="text-left p-4">
                    <input
                      type="checkbox"
                      checked={selectedCustomers.length === filteredCustomers.length}
                      onChange={selectAll}
                      className="rounded"
                    />
                  </th>
                  <th className="text-left p-4 font-medium">Customer</th>
                  <th className="text-left p-4 font-medium">Contact</th>
                  <th className="text-left p-4 font-medium">Orders</th>
                  <th className="text-left p-4 font-medium">Total Spent</th>
                  <th className="text-left p-4 font-medium">Status</th>
                  <th className="text-left p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer, index) => (
                  <motion.tr
                    key={customer.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b hover:bg-muted/50 transition-colors"
                  >
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={selectedCustomers.includes(customer.id)}
                        onChange={() => toggleCustomerSelection(customer.id)}
                        className="rounded"
                      />
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">
                            {customer.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{customer.name}</p>
                            {customer.rating && (
                              <div className="flex items-center gap-1">
                                <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                                <span className="text-xs font-medium">{customer.rating}</span>
                              </div>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{customer.company}</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {customer.tags.slice(0, 2).map(tag => (
                              <span
                                key={tag}
                                className="px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary"
                              >
                                {tag}
                              </span>
                            ))}
                            {customer.tags.length > 2 && (
                              <span className="px-2 py-0.5 text-xs rounded-full bg-muted text-muted-foreground">
                                +{customer.tags.length - 2}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="w-3 h-3 text-muted-foreground" />
                          <span className="truncate max-w-[150px]">{customer.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="w-3 h-3 text-muted-foreground" />
                          <span>{customer.phone}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="space-y-1">
                        <p className="font-medium">{customer.totalOrders} orders</p>
                        <p className="text-sm text-muted-foreground">
                          Since {customer.joinDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                        </p>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="font-bold">${customer.totalSpent.toLocaleString()}</p>
                      <p className="text-sm text-emerald-600 dark:text-emerald-400">
                        ${Math.round(customer.totalSpent / customer.totalOrders).toLocaleString()} avg/order
                      </p>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className={cn("w-2 h-2 rounded-full", statusColors[customer.status])} />
                        <span className="capitalize font-medium">{customer.status}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <MessageSquare className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredCustomers.length === 0 && (
            <div className="p-12 text-center">
              <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No customers found</h3>
              <p className="text-muted-foreground mb-6">
                {searchQuery ? 'Try a different search term' : 'Add your first customer to get started'}
              </p>
              <Button variant="gradient">
                <UserPlus className="w-5 h-5 mr-2" />
                Add Customer
              </Button>
            </div>
          )}

          {/* Pagination */}
          {filteredCustomers.length > 0 && (
            <div className="p-4 border-t flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Showing {filteredCustomers.length} of {mockCustomers.length} customers
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">
                  1
                </Button>
                <Button variant="outline" size="sm">
                  2
                </Button>
                <Button variant="outline" size="sm">
                  3
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Customer Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-lg backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-6 h-6 text-primary" />
              Top Customers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockCustomers
                .sort((a, b) => b.totalSpent - a.totalSpent)
                .slice(0, 5)
                .map((customer, index) => (
                  <div key={customer.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          {customer.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{customer.name}</p>
                        <p className="text-sm text-muted-foreground">{customer.totalOrders} orders</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">${customer.totalSpent.toLocaleString()}</p>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                        <span className="text-xs">{customer.rating || 'N/A'}</span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-6 h-6 text-primary" />
              Recent Customers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[...mockCustomers]
                .sort((a, b) => b.joinDate.getTime() - a.joinDate.getTime())
                .slice(0, 5)
                .map((customer) => (
                  <div key={customer.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          {customer.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{customer.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Joined {customer.joinDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </p>
                      </div>
                    </div>
                    <Badge variant={customer.status === 'vip' ? 'default' : 'outline'}>
                      {customer.status}
                    </Badge>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}