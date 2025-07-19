'use client'

import { useState } from 'react'
import { 
  Clock, 
  DollarSign, 
  TrendingUp, 
  Play, 
  Pause, 
  Settings, 
  BarChart3,
  Eye,
  Trophy,
  Target,
  Calendar,
  Timer,
  CheckCircle,
  Activity,
  Moon
} from 'lucide-react'
import { Game, Bet } from '@/types'
import GameSettingsModal from '@/components/GameSettingsModal'
import ResultDeclarationModal from '@/components/ResultDeclarationModal'
import LiveBetsModal from '@/components/LiveBetsModal'

// Mock data for Rajdhani Night
const rajdhaniNightGame: Game = {
  id: 'rajdhani-night',
  name: 'Rajdhani Night',
  type: 'jodi',
  category: 'main',
  status: 'active',
  openTime: '20:30',
  closeTime: '22:30',
  resultTime: '23:00',
  totalBets: 2180,
  totalAmount: 218000,
  winningAmount: 196200,
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
    open: '8',
    close: '3',
    jodi: '83'
  }
}

const mockBets: Bet[] = [
  {
    id: '1',
    userId: 'user1',
    userName: 'Alex Kumar',
    gameId: 'rajdhani-night',
    gameName: 'Rajdhani Night',
    gameCategory: 'main',
    betType: 'single',
    numbers: ['8'],
    amount: 150,
    potentialWin: 1425,
    multiplier: 9.5,
    placedAt: new Date('2024-01-15T19:30:00'),
    status: 'won',
    session: 'open'
  },
  {
    id: '2',
    userId: 'user2',
    userName: 'Priya Singh',
    gameId: 'rajdhani-night',
    gameName: 'Rajdhani Night',
    gameCategory: 'main',
    betType: 'jodi',
    numbers: ['83'],
    amount: 100,
    potentialWin: 9500,
    multiplier: 95,
    placedAt: new Date('2024-01-15T21:00:00'),
    status: 'won',
    session: 'close'
  },
  {
    id: '3',
    userId: 'user3',
    userName: 'Ravi Sharma',
    gameId: 'rajdhani-night',
    gameName: 'Rajdhani Night',
    gameCategory: 'main',
    betType: 'panna',
    numbers: ['234'],
    amount: 75,
    potentialWin: 7125,
    multiplier: 950,
    placedAt: new Date('2024-01-15T20:45:00'),
    status: 'lost',
    session: 'close'
  }
]

export default function RajdhaniNightManagement() {
  const [game, setGame] = useState<Game>(rajdhaniNightGame)
  const [bets] = useState<Bet[]>(mockBets)
  const [activeTab, setActiveTab] = useState<'overview' | 'bets' | 'results' | 'chart'>('overview')
  const [showSettingsModal, setShowSettingsModal] = useState(false)
  const [showResultModal, setShowResultModal] = useState(false)
  const [showLiveBetsModal, setShowLiveBetsModal] = useState(false)

  const handleGameToggle = () => {
    setGame(prev => ({
      ...prev,
      status: prev.status === 'active' ? 'closed' : 'active'
    }))
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
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const activeBets = bets.filter(bet => bet.status === 'pending').length
  const wonBets = bets.filter(bet => bet.status === 'won').length
  const totalProfit = game.totalAmount - game.winningAmount

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg p-6 text-white">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center space-x-3">
              <Moon className="h-8 w-8" />
              <h1 className="text-3xl font-bold">{game.name}</h1>
              <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(game.status)} text-gray-800`}>
                {game.status.toUpperCase()}
              </span>
            </div>
            <p className="mt-2 text-indigo-100">Premium night game with maximum payouts</p>
            <div className="flex items-center space-x-6 mt-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>Open: {formatTime(game.openTime)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Timer className="h-5 w-5" />
                <span>Close: {formatTime(game.closeTime)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Trophy className="h-5 w-5" />
                <span>Result: {formatTime(game.resultTime)}</span>
              </div>
            </div>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => setShowLiveBetsModal(true)}
              className="px-4 py-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-lg hover:bg-opacity-30 flex items-center space-x-2"
            >
              <Eye className="h-4 w-4" />
              <span>Live Bets</span>
            </button>
            <button
              onClick={() => setShowResultModal(true)}
              className="px-4 py-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-lg hover:bg-opacity-30 flex items-center space-x-2"
            >
              <Calendar className="h-4 w-4" />
              <span>Declare Result</span>
            </button>
            <button
              onClick={handleGameToggle}
              className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
                game.status === 'active'
                  ? 'bg-red-500 hover:bg-red-600'
                  : 'bg-green-500 hover:bg-green-600'
              }`}
            >
              {game.status === 'active' ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              <span>{game.status === 'active' ? 'Close Game' : 'Open Game'}</span>
            </button>
            <button
              onClick={() => setShowSettingsModal(true)}
              className="px-4 py-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-lg hover:bg-opacity-30"
            >
              <Settings className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Game Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Bets</p>
              <p className="text-2xl font-bold text-blue-600">{game.totalBets}</p>
              <p className="text-xs text-gray-500">+18% from yesterday</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Amount</p>
              <p className="text-2xl font-bold text-green-600">{formatCurrency(game.totalAmount)}</p>
              <p className="text-xs text-gray-500">+15% from yesterday</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Winnings</p>
              <p className="text-2xl font-bold text-orange-600">{formatCurrency(game.winningAmount)}</p>
              <p className="text-xs text-gray-500">5 winners today</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <Trophy className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Net Profit</p>
              <p className="text-2xl font-bold text-purple-600">{formatCurrency(totalProfit)}</p>
              <p className="text-xs text-gray-500">10% margin</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Target className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Current Result */}
      {game.result && (
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
              Latest Result
            </h3>
            <span className="text-sm text-gray-500">Declared at {game.resultTime}</span>
          </div>
          <div className="grid grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
              <div className="text-4xl font-bold text-purple-600 mb-2">{game.result.open}</div>
              <p className="text-sm font-medium text-purple-700">Open Ank</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg">
              <div className="text-4xl font-bold text-pink-600 mb-2">{game.result.close}</div>
              <p className="text-sm font-medium text-pink-700">Close Ank</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg">
              <div className="text-4xl font-bold text-indigo-600 mb-2">{game.result.jodi}</div>
              <p className="text-sm font-medium text-indigo-700">Jodi</p>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'bets', label: 'Live Bets', icon: Activity },
              { id: 'results', label: 'Result History', icon: Trophy },
              { id: 'chart', label: 'Analytics', icon: TrendingUp }
            ].map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as 'overview' | 'bets' | 'results' | 'chart')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Game Settings Overview */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-900">Game Configuration</h4>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Single Rate</span>
                    <span className="font-semibold">{game.settings.singleRate}x</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Jodi Rate</span>
                    <span className="font-semibold">{game.settings.jodiRate}x</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Panna Rate</span>
                    <span className="font-semibold">{game.settings.pannaRate}x</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Min Bet</span>
                    <span className="font-semibold">{formatCurrency(game.settings.minBetAmount)}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Max Bet</span>
                    <span className="font-semibold">{formatCurrency(game.settings.maxBetAmount)}</span>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-900">Tonight&apos;s Summary</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-3 px-4 bg-purple-50 rounded-lg">
                    <span className="text-purple-700">Active Bets</span>
                    <span className="font-bold text-purple-600">{activeBets}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 px-4 bg-green-50 rounded-lg">
                    <span className="text-green-700">Won Bets</span>
                    <span className="font-bold text-green-600">{wonBets}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 px-4 bg-orange-50 rounded-lg">
                    <span className="text-orange-700">Lost Bets</span>
                    <span className="font-bold text-orange-600">{bets.length - wonBets - activeBets}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 px-4 bg-indigo-50 rounded-lg">
                    <span className="text-indigo-700">Profit Margin</span>
                    <span className="font-bold text-indigo-600">
                      {((totalProfit / game.totalAmount) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'bets' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="text-lg font-semibold text-gray-900">Live Bets</h4>
                <button
                  onClick={() => setShowLiveBetsModal(true)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center space-x-2"
                >
                  <Eye className="h-4 w-4" />
                  <span>View All</span>
                </button>
              </div>
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Number</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {bets.slice(0, 5).map((bet) => (
                      <tr key={bet.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{bet.userName}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{bet.betType}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">{bet.numbers.join(', ')}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(bet.amount)}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            bet.status === 'won' ? 'bg-green-100 text-green-800' :
                            bet.status === 'lost' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
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

          {activeTab === 'results' && (
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900">Result History</h4>
              <div className="text-center py-12 text-gray-500">
                <Trophy className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Result history will be displayed here</p>
                <p className="text-sm mt-2">Historical results for the past 30 days</p>
              </div>
            </div>
          )}

          {activeTab === 'chart' && (
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900">Game Analytics</h4>
              <div className="text-center py-12 text-gray-500">
                <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Analytics charts will be displayed here</p>
                <p className="text-sm mt-2">Betting patterns, revenue trends, and player insights</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {showSettingsModal && (
        <GameSettingsModal
          game={game}
          onClose={() => setShowSettingsModal(false)}
          onSave={(settings) => {
            setGame(prev => ({ ...prev, settings }))
            setShowSettingsModal(false)
          }}
        />
      )}

      {showResultModal && (
        <ResultDeclarationModal
          game={game}
          onClose={() => setShowResultModal(false)}
          onDeclareResult={(result) => {
            const gameResult = {
              open: result.open,
              close: result.close,
              jodi: result.jodi
            }
            setGame(prev => ({ ...prev, result: gameResult, status: 'closed' }))
            setShowResultModal(false)
          }}
        />
      )}

      {showLiveBetsModal && (
        <LiveBetsModal
          game={game}
          bets={bets}
          onClose={() => setShowLiveBetsModal(false)}
        />
      )}
    </div>
  )
}
