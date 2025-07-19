'use client'

import { useState } from 'react'
import { 
  Play, 
  Pause, 
  Settings, 
  TrendingUp, 
  Clock,
  DollarSign,
  Eye,
  Edit,
  Plus,
  Calendar,
  Trophy,
  Target,
  XCircle,
  Download,
  Filter,
  Dice6,
  Star,
  Timer,
  Activity
} from 'lucide-react'
import Link from 'next/link'
import { Game } from '@/types'

// Enhanced mock data for all games
const allGames: Game[] = [
  {
    id: '1',
    name: 'Main Bazaar',
    type: 'jodi',
    category: 'main',
    status: 'active',
    openTime: '09:15',
    closeTime: '11:15',
    resultTime: '12:00',
    totalBets: 1250,
    totalAmount: 125000,
    winningAmount: 87500,
    settings: {
      singleRate: 9.5,
      jodiRate: 95,
      pannaRate: 950,
      halfSangamRate: 1900,
      fullSangamRate: 9500,
      minBetAmount: 10,
      maxBetAmount: 5000,
      isActive: true,
      allowOfflineResult: false
    },
    result: {
      open: '5',
      close: '8',
      jodi: '58'
    }
  },
  {
    id: '2',
    name: 'Milan Day',
    type: 'jodi',
    category: 'main',
    status: 'active',
    openTime: '12:10',
    closeTime: '14:10',
    resultTime: '14:40',
    totalBets: 2340,
    totalAmount: 234000,
    winningAmount: 210600,
    settings: {
      singleRate: 9.5,
      jodiRate: 95,
      pannaRate: 950,
      halfSangamRate: 1900,
      fullSangamRate: 9500,
      minBetAmount: 10,
      maxBetAmount: 10000,
      isActive: true,
      allowOfflineResult: false
    },
    result: {
      open: '2',
      close: '7',
      jodi: '27'
    }
  },
  {
    id: '3',
    name: 'Milan Night',
    type: 'jodi',
    category: 'main',
    status: 'closed',
    openTime: '21:10',
    closeTime: '23:10',
    resultTime: '23:40',
    totalBets: 1890,
    totalAmount: 189000,
    winningAmount: 170100,
    settings: {
      singleRate: 9.5,
      jodiRate: 95,
      pannaRate: 950,
      halfSangamRate: 1900,
      fullSangamRate: 9500,
      minBetAmount: 10,
      maxBetAmount: 10000,
      isActive: true,
      allowOfflineResult: false
    },
    result: {
      open: '1',
      close: '9',
      jodi: '19'
    }
  },
  {
    id: '4',
    name: 'Rajdhani Day',
    type: 'panna',
    category: 'main',
    status: 'result-pending',
    openTime: '15:30',
    closeTime: '17:30',
    resultTime: '18:00',
    totalBets: 1560,
    totalAmount: 156000,
    winningAmount: 140400,
    settings: {
      singleRate: 9.5,
      jodiRate: 95,
      pannaRate: 950,
      halfSangamRate: 1900,
      fullSangamRate: 9500,
      minBetAmount: 10,
      maxBetAmount: 8000,
      isActive: true,
      allowOfflineResult: false
    }
  },
  {
    id: '5',
    name: 'Gali',
    type: 'single',
    category: 'gali-disawar',
    status: 'active',
    openTime: '12:00',
    closeTime: '12:01',
    resultTime: '12:05',
    totalBets: 850,
    totalAmount: 42500,
    winningAmount: 38250,
    settings: {
      singleRate: 9.5,
      jodiRate: 95,
      pannaRate: 950,
      halfSangamRate: 1900,
      fullSangamRate: 9500,
      minBetAmount: 10,
      maxBetAmount: 5000,
      isActive: true,
      allowOfflineResult: false
    },
    result: {
      open: '7'
    }
  },
  {
    id: '6',
    name: 'Disawar',
    type: 'single',
    category: 'gali-disawar',
    status: 'closed',
    openTime: '05:00',
    closeTime: '05:01',
    resultTime: '05:05',
    totalBets: 1200,
    totalAmount: 60000,
    winningAmount: 54000,
    settings: {
      singleRate: 9.5,
      jodiRate: 95,
      pannaRate: 950,
      halfSangamRate: 1900,
      fullSangamRate: 9500,
      minBetAmount: 10,
      maxBetAmount: 5000,
      isActive: true,
      allowOfflineResult: false
    },
    result: {
      open: '3'
    }
  },
  {
    id: '7',
    name: 'Faridabad',
    type: 'single',
    category: 'gali-disawar',
    status: 'active',
    openTime: '18:00',
    closeTime: '18:01',
    resultTime: '18:05',
    totalBets: 650,
    totalAmount: 32500,
    winningAmount: 29250,
    settings: {
      singleRate: 9.5,
      jodiRate: 95,
      pannaRate: 950,
      halfSangamRate: 1900,
      fullSangamRate: 9500,
      minBetAmount: 10,
      maxBetAmount: 5000,
      isActive: true,
      allowOfflineResult: false
    },
    nextResultTime: '18:05'
  },
  {
    id: '8',
    name: 'Ghaziabad',
    type: 'single',
    category: 'gali-disawar',
    status: 'active',
    openTime: '20:00',
    closeTime: '20:01',
    resultTime: '20:05',
    totalBets: 750,
    totalAmount: 37500,
    winningAmount: 33750,
    settings: {
      singleRate: 9.5,
      jodiRate: 95,
      pannaRate: 950,
      halfSangamRate: 1900,
      fullSangamRate: 9500,
      minBetAmount: 10,
      maxBetAmount: 5000,
      isActive: true,
      allowOfflineResult: false
    },
    nextResultTime: '20:05'
  }
]

export default function GamesManagement() {
  const [games, setGames] = useState(allGames)
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'main' | 'gali-disawar'>('all')
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'active' | 'closed' | 'result-pending'>('all')
  const [showCreateModal, setShowCreateModal] = useState(false)

  const filteredGames = games.filter(game => {
    const matchesCategory = selectedCategory === 'all' || game.category === selectedCategory
    const matchesStatus = selectedStatus === 'all' || game.status === selectedStatus
    return matchesCategory && matchesStatus
  })

  const handleGameToggle = (gameId: string) => {
    setGames(games.map(game => 
      game.id === gameId 
        ? { ...game, status: game.status === 'active' ? 'closed' : 'active' }
        : game
    ))
  }

  const formatCurrency = (amount: number) => `₹${amount.toLocaleString('en-IN')}`
  const formatTime = (time: string) => time

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'closed':
        return 'bg-red-100 text-red-800'
      case 'result-pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'maintenance':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'main':
        return Target
      case 'gali-disawar':
        return Dice6
      default:
        return Star
    }
  }

  const getGameLink = (game: Game) => {
    const gameNameSlug = game.name.toLowerCase().replace(/\s+/g, '-')
    return `/games/${gameNameSlug}`
  }

  // Calculate totals
  const totalBets = filteredGames.reduce((sum, game) => sum + game.totalBets, 0)
  const totalAmount = filteredGames.reduce((sum, game) => sum + game.totalAmount, 0)
  const totalWinnings = filteredGames.reduce((sum, game) => sum + game.winningAmount, 0)
  const totalProfit = totalAmount - totalWinnings
  const activeGames = filteredGames.filter(game => game.status === 'active').length

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-blue-50 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">Active Games</p>
              <p className="text-2xl font-bold text-blue-900">{activeGames}</p>
            </div>
            <Activity className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-green-50 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Total Bets</p>
              <p className="text-2xl font-bold text-green-900">{totalBets.toLocaleString()}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <div className="bg-purple-50 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600">Total Amount</p>
              <p className="text-2xl font-bold text-purple-900">{formatCurrency(totalAmount)}</p>
            </div>
            <DollarSign className="h-8 w-8 text-purple-600" />
          </div>
        </div>
        <div className="bg-orange-50 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-orange-600">Total Winnings</p>
              <p className="text-2xl font-bold text-orange-900">{formatCurrency(totalWinnings)}</p>
            </div>
            <Trophy className="h-8 w-8 text-orange-600" />
          </div>
        </div>
        <div className="bg-indigo-50 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-indigo-600">Net Profit</p>
              <p className="text-2xl font-bold text-indigo-900">{formatCurrency(totalProfit)}</p>
            </div>
            <Target className="h-8 w-8 text-indigo-600" />
          </div>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">All Games</h2>
          <div className="flex space-x-2">
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Game
            </button>
            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Download className="h-4 w-4 mr-2" />
              Export
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as 'all' | 'main' | 'gali-disawar')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Categories</option>
              <option value="main">Main Games</option>
              <option value="gali-disawar">Gali Disawar</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as 'all' | 'active' | 'closed' | 'result-pending')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="closed">Closed</option>
              <option value="result-pending">Result Pending</option>
            </select>
          </div>
          <div className="flex items-end">
            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </button>
          </div>
        </div>
      </div>

      {/* Games Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredGames.map((game) => {
          const IconComponent = getCategoryIcon(game.category)
          return (
            <div key={game.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 flex items-center">
                    <IconComponent className="h-6 w-6 text-blue-600 mr-2" />
                    {game.name}
                  </h3>
                  <div className="flex items-center mt-2 space-x-4">
                    <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(game.status)}`}>
                      {game.status.replace('-', ' ').toUpperCase()}
                    </span>
                    <span className="text-gray-600 flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {formatTime(game.openTime)} - {formatTime(game.closeTime)}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleGameToggle(game.id)}
                    className={`p-2 rounded-lg ${
                      game.status === 'active'
                        ? 'bg-red-100 text-red-600 hover:bg-red-200'
                        : 'bg-green-100 text-green-600 hover:bg-green-200'
                    }`}
                  >
                    {game.status === 'active' ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </button>
                  <Link href={getGameLink(game)}>
                    <button className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200">
                      <Eye className="h-4 w-4" />
                    </button>
                  </Link>
                </div>
              </div>

              {/* Current Result */}
              {game.result && (
                <div className="mb-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Latest Result</h4>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    {game.result.open && (
                      <div>
                        <div className="text-2xl font-bold text-blue-600">{game.result.open}</div>
                        <p className="text-xs text-gray-500">Open</p>
                      </div>
                    )}
                    {game.result.close && (
                      <div>
                        <div className="text-2xl font-bold text-green-600">{game.result.close}</div>
                        <p className="text-xs text-gray-500">Close</p>
                      </div>
                    )}
                    {game.result.jodi && (
                      <div>
                        <div className="text-2xl font-bold text-purple-600">{game.result.jodi}</div>
                        <p className="text-xs text-gray-500">Jodi</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Game Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-600">Bets</p>
                  <p className="text-lg font-bold text-gray-900">{game.totalBets.toLocaleString()}</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-600">Amount</p>
                  <p className="text-lg font-bold text-green-600">{formatCurrency(game.totalAmount)}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-600">Winnings</p>
                  <p className="text-lg font-bold text-orange-600">{formatCurrency(game.winningAmount)}</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-600">Profit</p>
                  <p className="text-lg font-bold text-indigo-600">
                    {formatCurrency(game.totalAmount - game.winningAmount)}
                  </p>
                </div>
              </div>

              {/* Game Type and Rates */}
              <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-medium text-blue-700">
                    Type: {game.type.charAt(0).toUpperCase() + game.type.slice(1)}
                  </span>
                  <span className="text-blue-600">
                    Rates: {game.settings.singleRate}x / {game.settings.jodiRate}x / {game.settings.pannaRate}x
                  </span>
                </div>
              </div>

              {/* Next Result Timer */}
              {game.status === 'active' && game.nextResultTime && (
                <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-center justify-center text-yellow-800">
                    <Timer className="h-4 w-4 mr-2" />
                    <span className="text-sm font-medium">Next Result: {game.nextResultTime}</span>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-2 mt-4">
                <Link href={getGameLink(game)} className="flex-1">
                  <button className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center">
                    <Eye className="h-4 w-4 mr-2" />
                    Manage
                  </button>
                </Link>
                <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Settings className="h-4 w-4" />
                </button>
                <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Edit className="h-4 w-4" />
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Empty State */}
      {filteredGames.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <div className="text-gray-500">
            <Target className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">No games found</p>
            <p className="text-sm mt-2">Try adjusting your filters or create a new game</p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 inline-flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create New Game
            </button>
          </div>
        </div>
      )}

      {/* Create Game Modal - Placeholder */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">Create New Game</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XCircle className="h-6 w-6" />
              </button>
            </div>
            
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Game creation form will be implemented here</p>
              <p className="text-sm text-gray-500 mt-2">Including all game types and settings</p>
            </div>

            <div className="flex space-x-4 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Create Game
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
