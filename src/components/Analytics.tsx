'use client'

import { useState } from 'react'
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts'
import { TrendingUp, Users, DollarSign, Activity, Filter, Download } from 'lucide-react'
import { formatCurrency, formatNumber } from '@/lib/utils'

// Mock data for analytics
const revenueData = [
  { date: '2024-01-01', revenue: 85000, bets: 1200, users: 450 },
  { date: '2024-01-02', revenue: 92000, bets: 1350, users: 523 },
  { date: '2024-01-03', revenue: 78000, bets: 1180, users: 412 },
  { date: '2024-01-04', revenue: 98000, bets: 1450, users: 634 },
  { date: '2024-01-05', revenue: 87000, bets: 1320, users: 567 },
  { date: '2024-01-06', revenue: 105000, bets: 1520, users: 678 },
  { date: '2024-01-07', revenue: 89000, bets: 1234, users: 589 },
  { date: '2024-01-08', revenue: 95000, bets: 1400, users: 612 },
  { date: '2024-01-09', revenue: 88000, bets: 1250, users: 545 },
  { date: '2024-01-10', revenue: 102000, bets: 1480, users: 623 },
  { date: '2024-01-11', revenue: 91000, bets: 1380, users: 578 },
  { date: '2024-01-12', revenue: 97000, bets: 1420, users: 601 },
  { date: '2024-01-13', revenue: 84000, bets: 1180, users: 498 },
  { date: '2024-01-14', revenue: 99000, bets: 1460, users: 645 },
]

const gameTypeData = [
  { name: 'Single', value: 45, color: '#3b82f6', amount: 1250000 },
  { name: 'Jodi', value: 35, color: '#10b981', amount: 980000 },
  { name: 'Panna', value: 20, color: '#f59e0b', amount: 650000 },
]

const hourlyData = [
  { hour: '00:00', bets: 45, revenue: 12000 },
  { hour: '01:00', bets: 23, revenue: 8000 },
  { hour: '02:00', bets: 12, revenue: 4000 },
  { hour: '03:00', bets: 8, revenue: 2000 },
  { hour: '04:00', bets: 15, revenue: 5000 },
  { hour: '05:00', bets: 34, revenue: 15000 },
  { hour: '06:00', bets: 67, revenue: 28000 },
  { hour: '07:00', bets: 89, revenue: 45000 },
  { hour: '08:00', bets: 123, revenue: 68000 },
  { hour: '09:00', bets: 156, revenue: 89000 },
  { hour: '10:00', bets: 189, revenue: 112000 },
  { hour: '11:00', bets: 234, revenue: 145000 },
  { hour: '12:00', bets: 267, revenue: 178000 },
  { hour: '13:00', bets: 298, revenue: 198000 },
  { hour: '14:00', bets: 276, revenue: 185000 },
  { hour: '15:00', bets: 245, revenue: 165000 },
  { hour: '16:00', bets: 198, revenue: 135000 },
  { hour: '17:00', bets: 167, revenue: 98000 },
  { hour: '18:00', bets: 134, revenue: 78000 },
  { hour: '19:00', bets: 98, revenue: 56000 },
  { hour: '20:00', bets: 76, revenue: 45000 },
  { hour: '21:00', bets: 54, revenue: 32000 },
  { hour: '22:00', bets: 43, revenue: 25000 },
  { hour: '23:00', bets: 32, revenue: 18000 },
]

const topGamesData = [
  { name: 'Main Bazaar', bets: 4567, revenue: 340000, conversion: 85.2 },
  { name: 'Milan Day', bets: 3456, revenue: 280000, conversion: 78.5 },
  { name: 'Rajdhani Day', bets: 2345, revenue: 190000, conversion: 82.1 },
  { name: 'Time Bazaar', bets: 1890, revenue: 150000, conversion: 79.3 },
  { name: 'Kalyan', bets: 1567, revenue: 120000, conversion: 76.8 },
]

export default function Analytics() {
  const [dateRange, setDateRange] = useState('7d')
  const [selectedMetric, setSelectedMetric] = useState('revenue')

  const totalRevenue = revenueData.reduce((sum, item) => sum + item.revenue, 0)
  const totalBets = revenueData.reduce((sum, item) => sum + item.bets, 0)
  const totalUsers = revenueData.reduce((sum, item) => sum + item.users, 0)
  const avgRevenue = totalRevenue / revenueData.length

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
        <div className="flex space-x-2">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="1d">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </button>
          <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-green-600">{formatCurrency(totalRevenue)}</p>
              <p className="text-sm text-green-500">+12.5% from last period</p>
            </div>
            <DollarSign className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Bets</p>
              <p className="text-2xl font-bold text-blue-600">{formatNumber(totalBets)}</p>
              <p className="text-sm text-blue-500">+8.2% from last period</p>
            </div>
            <TrendingUp className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Users</p>
              <p className="text-2xl font-bold text-purple-600">{formatNumber(totalUsers)}</p>
              <p className="text-sm text-purple-500">+15.3% from last period</p>
            </div>
            <Users className="h-8 w-8 text-purple-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Revenue/Day</p>
              <p className="text-2xl font-bold text-orange-600">{formatCurrency(avgRevenue)}</p>
              <p className="text-sm text-orange-500">+5.8% from last period</p>
            </div>
            <Activity className="h-8 w-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Revenue Trend */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Revenue Trend</h3>
          <div className="flex space-x-2">
            <button
              onClick={() => setSelectedMetric('revenue')}
              className={`px-3 py-1 rounded-md text-sm ${
                selectedMetric === 'revenue'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Revenue
            </button>
            <button
              onClick={() => setSelectedMetric('bets')}
              className={`px-3 py-1 rounded-md text-sm ${
                selectedMetric === 'bets'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Bets
            </button>
            <button
              onClick={() => setSelectedMetric('users')}
              className={`px-3 py-1 rounded-md text-sm ${
                selectedMetric === 'users'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Users
            </button>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip 
              formatter={(value) => 
                selectedMetric === 'revenue' 
                  ? formatCurrency(value as number)
                  : formatNumber(value as number)
              }
            />
            <Area 
              type="monotone" 
              dataKey={selectedMetric} 
              stroke="#3b82f6" 
              fill="#3b82f6" 
              fillOpacity={0.1}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Game Types & Hourly Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Game Types Distribution */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Game Types Distribution</h3>
          <div className="flex justify-center mb-4">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={gameTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {gameTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2">
            {gameTypeData.map((entry) => (
              <div key={entry.name} className="flex justify-between items-center">
                <div className="flex items-center">
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: entry.color }}
                  />
                  <span className="text-sm font-medium">{entry.name}</span>
                </div>
                <div className="text-sm text-gray-600">
                  {entry.value}% · {formatCurrency(entry.amount)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hourly Activity */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Hourly Activity</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={hourlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="bets" 
                stroke="#10b981" 
                strokeWidth={2}
                name="Bets"
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#3b82f6" 
                strokeWidth={2}
                name="Revenue"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Games Performance */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Top Games Performance</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Game Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Bets
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Conversion Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Performance
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {topGamesData.map((game) => (
                <tr key={game.name} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-sm font-medium text-gray-900">{game.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatNumber(game.bets)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {formatCurrency(game.revenue)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {game.conversion}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                        <div
                          className="bg-indigo-600 h-2 rounded-full"
                          style={{ width: `${game.conversion}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600">{game.conversion}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Real-time Metrics */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Real-time Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">₹24,580</div>
            <div className="text-sm text-gray-600">Revenue Today</div>
            <div className="text-xs text-green-500">+18.5% vs yesterday</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">1,247</div>
            <div className="text-sm text-gray-600">Bets Today</div>
            <div className="text-xs text-blue-500">+12.3% vs yesterday</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">423</div>
            <div className="text-sm text-gray-600">Active Users</div>
            <div className="text-xs text-purple-500">+8.7% vs yesterday</div>
          </div>
        </div>
      </div>
    </div>
  )
}
