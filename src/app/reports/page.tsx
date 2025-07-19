'use client'

import { useState } from 'react'
import { 
  Calendar,
  GamepadIcon,
  Users,
  CircleDollarSign,
  TrendingUp,
  Download,
  Filter,
  Search
} from 'lucide-react'

const reportCategories = [
  {
    title: 'Daily Reports',
    description: 'View daily game statistics, revenue, and user activity',
    icon: Calendar,
    href: '/reports/daily',
    color: 'bg-blue-500',
    stats: '24 reports'
  },
  {
    title: 'Game Reports',
    description: 'Detailed analytics for all games and betting patterns',
    icon: GamepadIcon,
    href: '/reports/games',
    color: 'bg-purple-500',
    stats: '11 games'
  },
  {
    title: 'User Reports',
    description: 'User engagement, registration trends, and demographics',
    icon: Users,
    href: '/reports/users',
    color: 'bg-green-500',
    stats: '2.5K users'
  },
  {
    title: 'Financial Reports',
    description: 'Revenue analysis, profit margins, and transaction history',
    icon: CircleDollarSign,
    href: '/reports/financial',
    color: 'bg-yellow-500',
    stats: '₹1.2M total'
  }
]

const quickStats = [
  { label: 'Today\'s Revenue', value: '₹45,230', change: '+12.5%', positive: true },
  { label: 'Active Users', value: '1,284', change: '+8.2%', positive: true },
  { label: 'Total Bets', value: '3,456', change: '-2.1%', positive: false },
  { label: 'Win Rate', value: '68.4%', change: '+3.7%', positive: true },
]

export default function ReportsPage() {
  const [selectedDateRange, setSelectedDateRange] = useState('today')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600">Comprehensive reporting and data insights</p>
        </div>
        <div className="flex items-center space-x-4">
          <select 
            value={selectedDateRange}
            onChange={(e) => setSelectedDateRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
          </select>
          <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              </div>
              <div className={`flex items-center text-sm ${
                stat.positive ? 'text-green-600' : 'text-red-600'
              }`}>
                <TrendingUp className={`h-4 w-4 mr-1 ${
                  stat.positive ? '' : 'transform rotate-180'
                }`} />
                {stat.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Report Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reportCategories.map((category, index) => (
          <a key={index} href={category.href} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer">
            <div className="p-6">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${category.color}`}>
                  <category.icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{category.title}</h3>
                  <p className="text-gray-600">{category.description}</p>
                  <p className="text-sm text-gray-500 mt-1">{category.stats}</p>
                </div>
              </div>
              <div className="mt-6">
                <div className="w-full px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors text-center">
                  View Reports
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Recent Report Activity</h2>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Filter className="h-4 w-4" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Search className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {[
              { action: 'Financial Report Generated', time: '2 hours ago', type: 'success' },
              { action: 'User Analytics Updated', time: '4 hours ago', type: 'info' },
              { action: 'Daily Report Scheduled', time: '6 hours ago', type: 'info' },
              { action: 'Game Performance Report', time: '1 day ago', type: 'success' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                <div className="flex items-center">
                  <div className={`w-2 h-2 rounded-full mr-3 ${
                    activity.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
                  }`} />
                  <span className="text-gray-900">{activity.action}</span>
                </div>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
