'use client'

import { useState } from 'react'
import { 
  TrendingUp,
  TrendingDown,
  UserPlus,
  UserMinus,
  Crown,
  Star,
  Download,
  Search,
  MapPin,
  Mail,
  Calendar
} from 'lucide-react'

const userStats = [
  { label: 'Total Users', value: '12,845', change: '+12.3%', positive: true },
  { label: 'New This Week', value: '284', change: '+23.1%', positive: true },
  { label: 'Active Users', value: '8,432', change: '+8.7%', positive: true },
  { label: 'VIP Members', value: '1,256', change: '+15.4%', positive: true },
]

const topUsers = [
  {
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@email.com',
    totalBets: 2340,
    winnings: 156789,
    status: 'VIP',
    joinDate: '2023-01-15',
    lastActive: '2 hours ago',
    location: 'Mumbai'
  },
  {
    name: 'Priya Sharma',
    email: 'priya.sharma@email.com',
    totalBets: 1890,
    winnings: 127456,
    status: 'Premium',
    joinDate: '2023-02-20',
    lastActive: '1 hour ago',
    location: 'Delhi'
  },
  {
    name: 'Amit Patel',
    email: 'amit.patel@email.com',
    totalBets: 1567,
    winnings: 98234,
    status: 'VIP',
    joinDate: '2023-03-10',
    lastActive: '30 minutes ago',
    location: 'Ahmedabad'
  },
  {
    name: 'Sunita Singh',
    email: 'sunita.singh@email.com',
    totalBets: 1234,
    winnings: 87659,
    status: 'Regular',
    joinDate: '2023-04-05',
    lastActive: '5 hours ago',
    location: 'Kolkata'
  },
  {
    name: 'Vikash Yadav',
    email: 'vikash.yadav@email.com',
    totalBets: 1098,
    winnings: 76543,
    status: 'Premium',
    joinDate: '2023-05-12',
    lastActive: '1 day ago',
    location: 'Patna'
  }
]

const registrationTrends = [
  { month: 'Jan', users: 425, growth: 12.5 },
  { month: 'Feb', users: 567, growth: 33.4 },
  { month: 'Mar', users: 643, growth: 13.4 },
  { month: 'Apr', users: 598, growth: -7.0 },
  { month: 'May', users: 734, growth: 22.7 },
  { month: 'Jun', users: 812, growth: 10.6 },
]

const demographics = [
  { ageGroup: '18-25', percentage: 28, count: 3596 },
  { ageGroup: '26-35', percentage: 35, count: 4496 },
  { ageGroup: '36-45', percentage: 22, count: 2826 },
  { ageGroup: '46-55', percentage: 12, count: 1541 },
  { ageGroup: '55+', percentage: 3, count: 385 },
]

export default function UserReportsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredUsers = topUsers.filter(user => 
    (statusFilter === 'all' || user.status.toLowerCase() === statusFilter.toLowerCase()) &&
    (user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     user.email.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Reports</h1>
          <p className="text-gray-600">User engagement, registration trends, and demographics</p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* User Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {userStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              </div>
              <div className={`flex items-center text-sm ${
                stat.positive ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.positive ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
                {stat.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Registration Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Registration Trends</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {registrationTrends.map((trend, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex items-center justify-center w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full text-sm font-semibold mr-3">
                      {trend.month}
                    </div>
                    <span className="font-medium text-gray-900">{trend.users} users</span>
                  </div>
                  <div className={`flex items-center text-sm ${
                    trend.growth > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {trend.growth > 0 ? <UserPlus className="h-4 w-4 mr-1" /> : <UserMinus className="h-4 w-4 mr-1" />}
                    {trend.growth > 0 ? '+' : ''}{trend.growth}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Age Demographics</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {demographics.map((demo, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="font-medium text-gray-900 w-16">{demo.ageGroup}</span>
                    <div className="ml-4 flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-indigo-600 h-2 rounded-full" 
                        style={{ width: `${demo.percentage}%` }}
                      />
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <span className="font-semibold text-gray-900">{demo.percentage}%</span>
                    <p className="text-xs text-gray-500">{demo.count.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Top Users */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Top Users</h2>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="all">All Status</option>
                <option value="vip">VIP</option>
                <option value="premium">Premium</option>
                <option value="regular">Regular</option>
              </select>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm font-medium text-gray-500">
                  <th className="pb-4">User</th>
                  <th className="pb-4">Status</th>
                  <th className="pb-4">Total Bets</th>
                  <th className="pb-4">Winnings</th>
                  <th className="pb-4">Join Date</th>
                  <th className="pb-4">Last Active</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, index) => (
                  <tr key={index} className="border-t border-gray-100">
                    <td className="py-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                          <span className="text-indigo-600 font-semibold">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="font-medium text-gray-900">{user.name}</div>
                          <div className="flex items-center text-sm text-gray-500">
                            <Mail className="h-3 w-3 mr-1" />
                            {user.email}
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <MapPin className="h-3 w-3 mr-1" />
                            {user.location}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.status === 'VIP' ? 'bg-yellow-100 text-yellow-800' :
                        user.status === 'Premium' ? 'bg-purple-100 text-purple-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {user.status === 'VIP' && <Crown className="h-3 w-3 mr-1" />}
                        {user.status === 'Premium' && <Star className="h-3 w-3 mr-1" />}
                        {user.status}
                      </div>
                    </td>
                    <td className="py-4 text-gray-900">{user.totalBets.toLocaleString()}</td>
                    <td className="py-4 text-green-600 font-semibold">₹{user.winnings.toLocaleString()}</td>
                    <td className="py-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(user.joinDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="py-4 text-sm text-gray-600">{user.lastActive}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* User Activity Summary */}
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg shadow text-white">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">User Activity Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-purple-100">Most Active Age Group</p>
              <p className="text-xl font-semibold">26-35 Years</p>
              <p className="text-sm text-purple-200">35% of total users</p>
            </div>
            <div>
              <p className="text-purple-100">Average Session</p>
              <p className="text-xl font-semibold">24 minutes</p>
              <p className="text-sm text-purple-200">+12% from last month</p>
            </div>
            <div>
              <p className="text-purple-100">User Retention</p>
              <p className="text-xl font-semibold">78.4%</p>
              <p className="text-sm text-purple-200">Weekly active users</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
