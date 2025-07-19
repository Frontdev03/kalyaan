'use client'

import { useState } from 'react'
import { 
  GamepadIcon,
  Play,
  Pause,
  TrendingUp,
  TrendingDown,
  Users,
  IndianRupee,
  Trophy,
  Target,
  Calendar,
  Activity,
  Calculator,
  Dice6,
  Clock,
  Download
} from 'lucide-react'

const gameStats = [
  {
    name: 'Main Bazaar',
    icon: Target,
    status: 'active',
    players: 1243,
    revenue: 45230,
    bets: 2156,
    winRate: 68.2,
    change: '+12.5%',
    positive: true,
    color: 'bg-blue-500'
  },
  {
    name: 'Rajdhani Day',
    icon: Trophy,
    status: 'active',
    players: 987,
    revenue: 38900,
    bets: 1876,
    winRate: 72.1,
    change: '+8.7%',
    positive: true,
    color: 'bg-purple-500'
  },
  {
    name: 'Milan Day',
    icon: Clock,
    status: 'paused',
    players: 756,
    revenue: 28400,
    bets: 1432,
    winRate: 65.8,
    change: '-2.1%',
    positive: false,
    color: 'bg-green-500'
  },
  {
    name: 'Rajdhani Night',
    icon: Trophy,
    status: 'active',
    players: 834,
    revenue: 31200,
    bets: 1567,
    winRate: 70.4,
    change: '+15.2%',
    positive: true,
    color: 'bg-purple-600'
  },
  {
    name: 'Milan Night',
    icon: Clock,
    status: 'inactive',
    players: 623,
    revenue: 24800,
    bets: 1234,
    winRate: 66.9,
    change: '+5.8%',
    positive: true,
    color: 'bg-green-600'
  },
  {
    name: 'Gali Disawar',
    icon: Dice6,
    status: 'active',
    players: 445,
    revenue: 18600,
    bets: 987,
    winRate: 63.4,
    change: '-7.3%',
    positive: false,
    color: 'bg-yellow-500'
  },
  {
    name: 'Time Bazaar',
    icon: Calendar,
    status: 'active',
    players: 378,
    revenue: 15900,
    bets: 789,
    winRate: 69.7,
    change: '+9.1%',
    positive: true,
    color: 'bg-indigo-500'
  },
  {
    name: 'SriGanesh',
    icon: Calculator,
    status: 'active',
    players: 267,
    revenue: 12300,
    bets: 654,
    winRate: 71.2,
    change: '+6.4%',
    positive: true,
    color: 'bg-orange-500'
  },
  {
    name: 'Faridabad',
    icon: Activity,
    status: 'paused',
    players: 189,
    revenue: 8700,
    bets: 432,
    winRate: 64.8,
    change: '-1.9%',
    positive: false,
    color: 'bg-red-500'
  },
  {
    name: 'Ghaziabad',
    icon: Activity,
    status: 'active',
    players: 156,
    revenue: 7200,
    bets: 321,
    winRate: 67.5,
    change: '+3.2%',
    positive: true,
    color: 'bg-teal-500'
  }
]

const overallStats = [
  { label: 'Total Games', value: '11', change: '0%', positive: null },
  { label: 'Active Players', value: '5,878', change: '+12.3%', positive: true },
  { label: 'Total Revenue', value: '₹2,31,330', change: '+8.7%', positive: true },
  { label: 'Average Win Rate', value: '67.8%', change: '+2.4%', positive: true },
]

export default function GameReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('today')
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredGames = gameStats.filter(game => 
    statusFilter === 'all' || game.status === statusFilter
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Game Reports</h1>
          <p className="text-gray-600">Comprehensive analytics for all games and betting patterns</p>
        </div>
        <div className="flex items-center space-x-4">
          <select 
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="all">All Games</option>
            <option value="active">Active</option>
            <option value="paused">Paused</option>
            <option value="inactive">Inactive</option>
          </select>
          <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overallStats.map((stat, index) => (
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

      {/* Games Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGames.map((game, index) => (
          <div key={index} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className={`p-2 rounded-lg ${game.color}`}>
                    <game.icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-semibold text-gray-900">{game.name}</h3>
                    <div className="flex items-center mt-1">
                      {game.status === 'active' && (
                        <>
                          <Play className="h-3 w-3 text-green-500 mr-1" />
                          <span className="text-xs text-green-600">Active</span>
                        </>
                      )}
                      {game.status === 'paused' && (
                        <>
                          <Pause className="h-3 w-3 text-yellow-500 mr-1" />
                          <span className="text-xs text-yellow-600">Paused</span>
                        </>
                      )}
                      {game.status === 'inactive' && (
                        <>
                          <div className="w-3 h-3 bg-gray-400 rounded-full mr-1" />
                          <span className="text-xs text-gray-600">Inactive</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className={`flex items-center text-sm ${
                  game.positive ? 'text-green-600' : 'text-red-600'
                }`}>
                  {game.positive ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
                  {game.change}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-600">Players</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">{game.players.toLocaleString()}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <IndianRupee className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-600">Revenue</span>
                  </div>
                  <span className="text-sm font-semibold text-green-600">₹{game.revenue.toLocaleString()}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <GamepadIcon className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-600">Total Bets</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">{game.bets.toLocaleString()}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Trophy className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-600">Win Rate</span>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    game.winRate > 70 ? 'bg-green-100 text-green-800' :
                    game.winRate > 65 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {game.winRate}%
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100">
                <button className="w-full px-4 py-2 text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                  View Detailed Analytics
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Top Performers */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Top Performing Games</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {gameStats.slice(0, 5).map((game, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full text-sm font-semibold mr-4">
                    #{index + 1}
                  </div>
                  <div className={`p-2 rounded-lg ${game.color} mr-3`}>
                    <game.icon className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{game.name}</h4>
                    <p className="text-sm text-gray-600">{game.players.toLocaleString()} players</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-600">₹{game.revenue.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">{game.winRate}% win rate</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
