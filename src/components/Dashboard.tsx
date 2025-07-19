'use client'

import { useState, useEffect } from 'react'
import { Users, TrendingUp, DollarSign, Activity, ArrowUp, ArrowDown } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts'
import { DashboardStats, ChartData } from '@/types'
import { formatCurrency, formatNumber } from '@/lib/utils'

// Mock data - replace with real API calls
const mockStats: DashboardStats = {
  totalUsers: 15420,
  activeUsers: 8932,
  totalBets: 45230,
  totalRevenue: 2840000,
  totalWinnings: 1956000,
  todayBets: 1234,
  todayRevenue: 89000,
  pendingWithdrawals: 45,
  pendingDeposits: 12,
  activeGames: 8,
}

const mockChartData: ChartData[] = [
  { date: '2024-01-01', bets: 1200, revenue: 85000, users: 450 },
  { date: '2024-01-02', bets: 1350, revenue: 92000, users: 523 },
  { date: '2024-01-03', bets: 1180, revenue: 78000, users: 412 },
  { date: '2024-01-04', bets: 1450, revenue: 98000, users: 634 },
  { date: '2024-01-05', bets: 1320, revenue: 87000, users: 567 },
  { date: '2024-01-06', bets: 1520, revenue: 105000, users: 678 },
  { date: '2024-01-07', bets: 1234, revenue: 89000, users: 589 },
]

const pieData = [
  { name: 'Single', value: 45, color: '#3b82f6' },
  { name: 'Jodi', value: 35, color: '#10b981' },
  { name: 'Panna', value: 20, color: '#f59e0b' },
]

export default function Dashboard() {
  const [stats] = useState<DashboardStats>(mockStats)
  const [chartData] = useState<ChartData[]>(mockChartData)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Users"
          value={formatNumber(stats.totalUsers)}
          icon={Users}
          change={12.5}
          changeType="increase"
        />
        <StatsCard
          title="Total Bets"
          value={formatNumber(stats.totalBets)}
          icon={TrendingUp}
          change={8.2}
          changeType="increase"
        />
        <StatsCard
          title="Total Revenue"
          value={formatCurrency(stats.totalRevenue)}
          icon={DollarSign}
          change={15.3}
          changeType="increase"
        />
        <StatsCard
          title="Active Games"
          value={stats.activeGames.toString()}
          icon={Activity}
          change={2.1}
          changeType="increase"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip formatter={(value) => formatCurrency(value as number)} />
              <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bet Types Distribution */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Bet Types Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value}%`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center space-x-4 mt-4">
            {pieData.map((entry) => (
              <div key={entry.name} className="flex items-center">
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-sm text-gray-600">{entry.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bets Chart */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Daily Bets</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="bets" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Today&apos;s Highlights</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Today&apos;s Bets</span>
              <span className="font-semibold">{formatNumber(stats.todayBets)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Today&apos;s Revenue</span>
              <span className="font-semibold">{formatCurrency(stats.todayRevenue)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Active Users</span>
              <span className="font-semibold">{formatNumber(stats.activeUsers)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Pending Withdrawals</span>
              <span className="font-semibold text-orange-600">{stats.pendingWithdrawals}</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full text-left p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
              <div className="font-semibold text-blue-900">Manage Games</div>
              <div className="text-sm text-blue-700">Start/Stop games and set timings</div>
            </button>
            <button className="w-full text-left p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
              <div className="font-semibold text-green-900">Process Withdrawals</div>
              <div className="text-sm text-green-700">Review and approve pending withdrawals</div>
            </button>
            <button className="w-full text-left p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
              <div className="font-semibold text-purple-900">User Management</div>
              <div className="text-sm text-purple-700">Manage user accounts and KYC</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

interface StatsCardProps {
  title: string
  value: string
  icon: React.ElementType
  change: number
  changeType: 'increase' | 'decrease'
}

function StatsCard({ title, value, icon: Icon, change, changeType }: StatsCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className="p-3 bg-indigo-100 rounded-full">
          <Icon className="h-6 w-6 text-indigo-600" />
        </div>
      </div>
      <div className="mt-4 flex items-center">
        {changeType === 'increase' ? (
          <ArrowUp className="h-4 w-4 text-green-500" />
        ) : (
          <ArrowDown className="h-4 w-4 text-red-500" />
        )}
        <span className={`ml-1 text-sm font-medium ${
          changeType === 'increase' ? 'text-green-500' : 'text-red-500'
        }`}>
          {change}%
        </span>
        <span className="ml-2 text-sm text-gray-500">vs last month</span>
      </div>
    </div>
  )
}
