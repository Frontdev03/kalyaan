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
  Dice6,
  CheckCircle,
  XCircle,
  Download,
  Filter,
  Star,
  Timer
} from 'lucide-react'
import { Game, Bet } from '@/types'

// Mock data for Gali Disawar games
const galiDisawarGames: Game[] = [
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
    status: 'result-pending',
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
    status: 'closed',
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
    result: {
      open: '9'
    }
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

const recentBets: Bet[] = [
  {
    id: '1',
    userId: '1',
    userName: 'Rajesh Kumar',
    gameId: '5',
    gameName: 'Gali',
    gameCategory: 'gali-disawar',
    betType: 'single',
    numbers: ['7'],
    amount: 50,
    multiplier: 9.5,
    potentialWin: 475,
    status: 'won',
    placedAt: new Date('2025-01-19T11:58:00'),
    resultAt: new Date('2025-01-19T12:05:00'),
    session: 'open'
  },
  {
    id: '2',
    userId: '2',
    userName: 'Priya Sharma',
    gameId: '6',
    gameName: 'Disawar',
    gameCategory: 'gali-disawar',
    betType: 'single',
    numbers: ['3'],
    amount: 100,
    multiplier: 9.5,
    potentialWin: 950,
    status: 'pending',
    placedAt: new Date('2025-01-19T04:58:00'),
    session: 'open'
  }
]

export default function GaliDisawarManagement() {
  const [showResultModal, setShowResultModal] = useState(false)
  const [selectedGame, setSelectedGame] = useState<Game | null>(null)
  const [resultNumber, setResultNumber] = useState('')
  const [selectedTab, setSelectedTab] = useState<'overview' | 'bets' | 'results' | 'chart'>('overview')

  const handleDeclareResult = () => {
    if (selectedGame) {
      console.log('Declaring result for', selectedGame.name, ':', resultNumber)
      setShowResultModal(false)
      setResultNumber('')
      setSelectedGame(null)
    }
  }

  const handleGameToggle = (game: Game) => {
    console.log('Toggling game status for', game.name)
  }

  const openResultModal = (game: Game) => {
    setSelectedGame(game)
    setShowResultModal(true)
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

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-blue-50 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">Active Games</p>
              <p className="text-2xl font-bold text-blue-900">
                {galiDisawarGames.filter(g => g.status === 'active').length}
              </p>
            </div>
            <Dice6 className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-green-50 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Total Bets Today</p>
              <p className="text-2xl font-bold text-green-900">
                {galiDisawarGames.reduce((sum, g) => sum + g.totalBets, 0).toLocaleString()}
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <div className="bg-purple-50 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600">Total Amount</p>
              <p className="text-2xl font-bold text-purple-900">
                {formatCurrency(galiDisawarGames.reduce((sum, g) => sum + g.totalAmount, 0))}
              </p>
            </div>
            <DollarSign className="h-8 w-8 text-purple-600" />
          </div>
        </div>
        <div className="bg-orange-50 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-orange-600">Total Profit</p>
              <p className="text-2xl font-bold text-orange-900">
                {formatCurrency(galiDisawarGames.reduce((sum, g) => sum + (g.totalAmount - g.winningAmount), 0))}
              </p>
            </div>
            <Trophy className="h-8 w-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Games Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {galiDisawarGames.map((game) => (
          <div key={game.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900 flex items-center">
                  <Star className="h-6 w-6 text-yellow-500 mr-2" />
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
                  onClick={() => handleGameToggle(game)}
                  className={`p-2 rounded-lg ${
                    game.status === 'active'
                      ? 'bg-red-100 text-red-600 hover:bg-red-200'
                      : 'bg-green-100 text-green-600 hover:bg-green-200'
                  }`}
                >
                  {game.status === 'active' ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </button>
                <button
                  onClick={() => openResultModal(game)}
                  className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
                >
                  <Trophy className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Current Result */}
            {game.result?.open && (
              <div className="mb-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-600 mb-2">Latest Result</p>
                  <div className="text-4xl font-bold text-blue-600 mb-2">{game.result.open}</div>
                  <p className="text-xs text-gray-500">
                    Result Time: {formatTime(game.resultTime)}
                  </p>
                </div>
              </div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium text-gray-600">Bets</p>
                <p className="text-lg font-bold text-gray-900">{game.totalBets}</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium text-gray-600">Amount</p>
                <p className="text-lg font-bold text-green-600">{formatCurrency(game.totalAmount)}</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium text-gray-600">Profit</p>
                <p className="text-lg font-bold text-orange-600">
                  {formatCurrency(game.totalAmount - game.winningAmount)}
                </p>
              </div>
            </div>

            {/* Next Result Timer */}
            {game.status === 'active' && game.nextResultTime && (
              <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-center justify-center text-yellow-800">
                  <Timer className="h-4 w-4 mr-2" />
                  <span className="text-sm font-medium">Next Result: {game.nextResultTime}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Tabs Section */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'bets', label: 'Live Bets' },
              { id: 'results', label: 'Results History' },
              { id: 'chart', label: 'Result Chart' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as 'overview' | 'bets' | 'results' | 'chart')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  selectedTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {selectedTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Game Status Overview</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {galiDisawarGames.map((game) => (
                    <div key={game.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <h5 className="font-semibold text-gray-900">{game.name}</h5>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(game.status)}`}>
                          {game.status}
                        </span>
                      </div>
                      <div className="mt-2 grid grid-cols-3 gap-2 text-sm">
                        <div>
                          <p className="text-gray-600">Bets: {game.totalBets}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Amount: {formatCurrency(game.totalAmount)}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">
                            Result: {game.result?.open || 'Pending'}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'bets' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-semibold text-gray-900">Live Bets ({recentBets.length})</h4>
                <div className="flex space-x-2">
                  <button className="flex items-center px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </button>
                  <button className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Game</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Number</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Potential Win</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentBets.map((bet) => (
                      <tr key={bet.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {bet.userName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {bet.gameName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-2xl font-bold text-blue-600">{bet.numbers.join(', ')}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {formatCurrency(bet.amount)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                          {formatCurrency(bet.potentialWin)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            bet.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            bet.status === 'won' ? 'bg-green-100 text-green-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {bet.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {selectedTab === 'results' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-semibold text-gray-900">Results History</h4>
                <button className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Manual Result
                </button>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Results history will be displayed here</p>
                <p className="text-sm text-gray-500 mt-2">Including date-wise results for all Gali Disawar games</p>
              </div>
            </div>
          )}

          {selectedTab === 'chart' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-semibold text-gray-900">Result Chart</h4>
                <div className="flex space-x-2">
                  <select className="px-3 py-2 border border-gray-300 rounded-md">
                    <option>This Month</option>
                    <option>Last Month</option>
                    <option>Last 3 Months</option>
                  </select>
                  <button className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    <Download className="h-4 w-4 mr-2" />
                    Download Chart
                  </button>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <Dice6 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Chart visualization will be implemented here</p>
                <p className="text-sm text-gray-500 mt-2">Including comprehensive charts for all Gali Disawar games</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Result Declaration Modal */}
      {showResultModal && selectedGame && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">Declare Result - {selectedGame.name}</h3>
              <button
                onClick={() => setShowResultModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XCircle className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Result Number (0-9)
                </label>
                <input
                  type="text"
                  maxLength={1}
                  value={resultNumber}
                  onChange={(e) => setResultNumber(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-center text-2xl font-bold"
                  placeholder="0"
                />
              </div>

              {resultNumber && (
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm font-medium text-blue-600 mb-2">Result Preview:</p>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-600 mb-2">{resultNumber}</div>
                    <p className="text-sm text-gray-600">Game: {selectedGame.name}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex space-x-4 mt-6">
              <button
                onClick={() => setShowResultModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeclareResult}
                disabled={!resultNumber}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Declare Result
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
