'use client'

import { useState } from 'react'
import { 
  Activity, 
  DollarSign, 
  TrendingUp, 
  Play, 
  Pause, 
  Settings, 
  Trophy,
  Target,
  Calendar,
  Timer,
  CheckCircle
} from 'lucide-react'
import { Game, Bet } from '@/types'
import GameSettingsModal from '@/components/GameSettingsModal'
import ResultDeclarationModal from '@/components/ResultDeclarationModal'
import LiveBetsModal from '@/components/LiveBetsModal'

// Mock data for Faridabad
const faridabadGame: Game = {
  id: 'faridabad',
  name: 'Faridabad',
  type: 'jodi',
  category: 'gali-disawar',
  status: 'active',
  openTime: '16:00',
  closeTime: '18:00',
  resultTime: '18:30',
  totalBets: 1789,
  totalAmount: 178900,
  winningAmount: 161010,
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
  },
  result: {
    open: '3',
    close: '7',
    jodi: '37'
  }
}

// Mock bets data
const mockBets: Bet[] = [
  {
    id: 'bet-1',
    userId: 'user-1',
    userName: 'Rakesh Singh',
    gameId: 'faridabad',
    gameName: 'Faridabad',
    gameCategory: 'gali-disawar',
    betType: 'single',
    numbers: ['3'],
    amount: 600,
    multiplier: 9.5,
    potentialWin: 5700,
    status: 'won',
    placedAt: new Date('2024-01-15T15:45:00'),
    session: 'open'
  }
]

export default function FaridabadPage() {
  const [game, setGame] = useState<Game>(faridabadGame)
  const [bets] = useState<Bet[]>(mockBets)
  const [showSettingsModal, setShowSettingsModal] = useState(false)
  const [showResultModal, setShowResultModal] = useState(false)
  const [showLiveBetsModal, setShowLiveBetsModal] = useState(false)

  const totalProfit = game.totalAmount - game.winningAmount

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const handleGameStatusToggle = () => {
    setGame(prev => ({
      ...prev,
      status: prev.status === 'active' ? 'closed' : 'active'
    }))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100'
      case 'closed': return 'text-red-600 bg-red-100'
      case 'result-pending': return 'text-yellow-600 bg-yellow-100'
      case 'maintenance': return 'text-gray-600 bg-gray-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-red-100 rounded-lg">
            <Activity className="h-8 w-8 text-red-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{game.name}</h1>
            <div className="flex items-center space-x-4 mt-2">
              <div className="flex items-center space-x-2">
                <Timer className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">
                  {game.openTime} - {game.closeTime}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">
                  Result at {game.resultTime}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(game.status)}`}>
            {game.status.charAt(0).toUpperCase() + game.status.slice(1)}
          </span>
          
          <button
            onClick={handleGameStatusToggle}
            className={`p-2 rounded-lg transition-colors ${
              game.status === 'active' 
                ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                : 'bg-green-100 text-green-600 hover:bg-green-200'
            }`}
          >
            {game.status === 'active' ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </button>

          <div className="flex space-x-2">
            <button
              onClick={() => setShowResultModal(true)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
            >
              <Trophy className="h-4 w-4" />
              <span>Declare Result</span>
            </button>
            
            <button
              onClick={() => setShowSettingsModal(true)}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
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
              <p className="text-xs text-gray-500">+8% from yesterday</p>
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
              <p className="text-xs text-gray-500">+6% from yesterday</p>
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
              <p className="text-xs text-gray-500">2 winners today</p>
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
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
              <div className="text-4xl font-bold text-blue-600 mb-2">{game.result.open}</div>
              <p className="text-sm font-medium text-blue-700">Open Ank</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
              <div className="text-4xl font-bold text-green-600 mb-2">{game.result.close}</div>
              <p className="text-sm font-medium text-green-700">Close Ank</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
              <div className="text-4xl font-bold text-purple-600 mb-2">{game.result.jodi}</div>
              <p className="text-sm font-medium text-purple-700">Jodi</p>
            </div>
          </div>
        </div>
      )}

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
