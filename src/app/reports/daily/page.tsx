'use client'

import { useState } from 'react'
import { 
  TrendingUp,
  TrendingDown,
  Clock,
  IndianRupee,
  Download,
  RefreshCw
} from 'lucide-react'

const dailyStats = [
  { label: 'Total Revenue', value: '₹45,230', change: '+12.5%', positive: true },
  { label: 'New Users', value: '89', change: '+23.1%', positive: true },
  { label: 'Active Games', value: '11', change: '0%', positive: null },
  { label: 'Total Bets', value: '1,456', change: '-5.2%', positive: false },
]

const gamePerformance = [
  { name: 'Main Bazaar', revenue: 12500, bets: 245, winRate: 68.2 },
  { name: 'Rajdhani Day', revenue: 8900, bets: 189, winRate: 72.1 },
  { name: 'Milan Day', revenue: 7600, bets: 156, winRate: 65.8 },
  { name: 'Rajdhani Night', revenue: 6800, bets: 134, winRate: 70.4 },
  { name: 'Milan Night', revenue: 5400, bets: 112, winRate: 66.9 },
]

const hourlyActivity = [
  { time: '00:00', bets: 12, revenue: 1200 },
  { time: '01:00', bets: 8, revenue: 800 },
  { time: '02:00', bets: 5, revenue: 500 },
  { time: '03:00', bets: 3, revenue: 300 },
  { time: '04:00', bets: 7, revenue: 700 },
  { time: '05:00', bets: 15, revenue: 1500 },
  { time: '06:00', bets: 32, revenue: 3200 },
  { time: '07:00', bets: 45, revenue: 4500 },
  { time: '08:00', bets: 67, revenue: 6700 },
  { time: '09:00', bets: 89, revenue: 8900 },
  { time: '10:00', bets: 123, revenue: 12300 },
  { time: '11:00', bets: 156, revenue: 15600 },
]

export default function DailyReportsPage() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Daily Reports</h1>
          <p className="text-gray-600">Detailed daily performance and activity reports</p>
        </div>
        <div className="flex items-center space-x-4">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </button>
          <button className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Daily Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dailyStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              </div>
              {stat.positive !== null && (
                <div className={`flex items-center text-sm ${
                  stat.positive ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.positive ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
                  {stat.change}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Game Performance */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Game Performance Today</h2>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm font-medium text-gray-500">
                  <th className="pb-4">Game</th>
                  <th className="pb-4">Revenue</th>
                  <th className="pb-4">Bets</th>
                  <th className="pb-4">Win Rate</th>
                </tr>
              </thead>
              <tbody className="space-y-2">
                {gamePerformance.map((game, index) => (
                  <tr key={index} className="border-t border-gray-100">
                    <td className="py-4 font-medium text-gray-900">{game.name}</td>
                    <td className="py-4">
                      <div className="flex items-center">
                        <IndianRupee className="h-4 w-4 text-green-600 mr-1" />
                        <span className="text-green-600 font-semibold">{game.revenue.toLocaleString()}</span>
                      </div>
                    </td>
                    <td className="py-4 text-gray-600">{game.bets}</td>
                    <td className="py-4">
                      <div className="flex items-center">
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          game.winRate > 70 ? 'bg-green-100 text-green-800' :
                          game.winRate > 65 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {game.winRate}%
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Hourly Activity */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Hourly Activity</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="text-md font-medium text-gray-900 mb-4">Betting Activity</h3>
              <div className="space-y-2">
                {hourlyActivity.slice(0, 6).map((hour, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">{hour.time}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-900">{hour.bets} bets</span>
                      <span className="text-sm text-green-600">₹{hour.revenue}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-md font-medium text-gray-900 mb-4">Peak Hours</h3>
              <div className="space-y-2">
                {hourlyActivity.slice(6, 12).map((hour, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">{hour.time}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-900">{hour.bets} bets</span>
                      <span className="text-sm text-green-600">₹{hour.revenue}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow text-white">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Daily Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-indigo-100">Peak Activity</p>
              <p className="text-xl font-semibold">11:00 AM</p>
              <p className="text-sm text-indigo-200">156 bets placed</p>
            </div>
            <div>
              <p className="text-indigo-100">Top Game</p>
              <p className="text-xl font-semibold">Main Bazaar</p>
              <p className="text-sm text-indigo-200">₹12,500 revenue</p>
            </div>
            <div>
              <p className="text-indigo-100">User Engagement</p>
              <p className="text-xl font-semibold">68.4%</p>
              <p className="text-sm text-indigo-200">Average win rate</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
