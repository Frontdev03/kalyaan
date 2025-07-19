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
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-xl shadow-lg text-white p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome to Kalyan Live Admin</h1>
            <p className="text-indigo-100">Monitor your gaming platform performance and manage operations</p>
          </div>
          <div className="hidden md:block">
            <div className="text-right">
              <p className="text-2xl font-bold">{formatCurrency(stats.todayRevenue)}</p>
              <p className="text-indigo-100">Today&apos;s Revenue</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Users"
          value={formatNumber(stats.totalUsers)}
          icon={Users}
          change={12.5}
          changeType="increase"
          bgColor="bg-gradient-to-br from-blue-500 to-blue-600"
          iconBg="bg-blue-100"
          iconColor="text-blue-600"
        />
        <StatsCard
          title="Total Bets"
          value={formatNumber(stats.totalBets)}
          icon={TrendingUp}
          change={8.2}
          changeType="increase"
          bgColor="bg-gradient-to-br from-green-500 to-green-600"
          iconBg="bg-green-100"
          iconColor="text-green-600"
        />
        <StatsCard
          title="Total Revenue"
          value={formatCurrency(stats.totalRevenue)}
          icon={DollarSign}
          change={15.3}
          changeType="increase"
          bgColor="bg-gradient-to-br from-purple-500 to-purple-600"
          iconBg="bg-purple-100"
          iconColor="text-purple-600"
        />
        <StatsCard
          title="Active Games"
          value={stats.activeGames.toString()}
          icon={Activity}
          change={2.1}
          changeType="increase"
          bgColor="bg-gradient-to-br from-orange-500 to-orange-600"
          iconBg="bg-orange-100"
          iconColor="text-orange-600"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Revenue Trend</h3>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Last 7 days</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis 
                dataKey="date" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#64748b' }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#64748b' }}
              />
              <Tooltip 
                formatter={(value) => [formatCurrency(value as number), 'Revenue']} 
                contentStyle={{
                  backgroundColor: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, stroke: '#3b82f6', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bet Types Distribution */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Bet Types Distribution</h3>
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [`${value}%`]} 
                contentStyle={{
                  backgroundColor: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center space-x-6 mt-4">
            {pieData.map((entry) => (
              <div key={entry.name} className="flex items-center">
                <div
                  className="w-4 h-4 rounded-full mr-2"
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-sm font-medium text-gray-700">{entry.name} ({entry.value}%)</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bets Chart */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Daily Betting Activity</h3>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Bets placed</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis 
              dataKey="date" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#64748b' }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#64748b' }}
            />
            <Tooltip 
              formatter={(value) => [`${value}`, 'Bets']}
              contentStyle={{
                backgroundColor: 'white',
                border: 'none',
                borderRadius: '8px',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Bar 
              dataKey="bets" 
              fill="url(#barGradient)"
              radius={[4, 4, 0, 0]}
            />
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Today&apos;s Highlights</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                <span className="text-gray-700">Today&apos;s Bets</span>
              </div>
              <span className="font-bold text-blue-600">{formatNumber(stats.todayBets)}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                <span className="text-gray-700">Today&apos;s Revenue</span>
              </div>
              <span className="font-bold text-green-600">{formatCurrency(stats.todayRevenue)}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                <span className="text-gray-700">Active Users</span>
              </div>
              <span className="font-bold text-purple-600">{formatNumber(stats.activeUsers)}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                <span className="text-gray-700">Pending Withdrawals</span>
              </div>
              <span className="font-bold text-orange-600">{stats.pendingWithdrawals}</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg">
              <div className="font-bold text-lg mb-1">Manage Games</div>
              <div className="text-blue-100 text-sm">Start/Stop games and set timings</div>
            </button>
            <button className="p-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 transform hover:scale-105 shadow-lg">
              <div className="font-bold text-lg mb-1">Process Withdrawals</div>
              <div className="text-green-100 text-sm">Review and approve pending withdrawals</div>
            </button>
            <button className="p-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg">
              <div className="font-bold text-lg mb-1">User Management</div>
              <div className="text-purple-100 text-sm">Manage user accounts and KYC</div>
            </button>
            <button className="p-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-200 transform hover:scale-105 shadow-lg">
              <div className="font-bold text-lg mb-1">View Reports</div>
              <div className="text-orange-100 text-sm">Access detailed analytics and reports</div>
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
  bgColor: string
  iconBg: string
  iconColor: string
}

function StatsCard({ title, value, icon: Icon, change, changeType, bgColor, iconBg, iconColor }: StatsCardProps) {
  return (
    <div className={`p-6 rounded-xl shadow-lg text-white ${bgColor} border border-gray-100`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-white/80 text-sm font-medium mb-1">{title}</p>
          <p className="text-3xl font-bold text-white">{value}</p>
          <div className="mt-3 flex items-center">
            {changeType === 'increase' ? (
              <ArrowUp className="h-4 w-4 text-white/90" />
            ) : (
              <ArrowDown className="h-4 w-4 text-white/90" />
            )}
            <span className="ml-1 text-sm font-medium text-white/90">
              {change}%
            </span>
            <span className="ml-2 text-xs text-white/70">vs last month</span>
          </div>
        </div>
        <div className={`p-4 rounded-xl ${iconBg} ml-4`}>
          <Icon className={`h-8 w-8 ${iconColor}`} />
        </div>
      </div>
    </div>
  )
}
