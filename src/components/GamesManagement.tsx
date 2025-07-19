'use client'

import { useState } from 'react'
import { Play, Pause, Settings, Clock, Users, DollarSign, TrendingUp } from 'lucide-react'
import { Game } from '@/types'
import { formatCurrency, formatNumber, getStatusColor } from '@/lib/utils'

// Mock data - replace with real API calls
const mockGames: Game[] = [
  {
    id: '1',
    name: 'Main Bazaar',
    type: 'single',
    status: 'active',
    openTime: '09:00',
    closeTime: '11:00',
    resultTime: '11:30',
    result: '458',
    totalBets: 1250,
    totalAmount: 89000
  },
  {
    id: '2',
    name: 'Milan Day',
    type: 'jodi',
    status: 'closed',
    openTime: '10:00',
    closeTime: '12:00',
    resultTime: '12:30',
    result: '67',
    totalBets: 890,
    totalAmount: 67000
  },
  {
    id: '3',
    name: 'Rajdhani Day',
    type: 'panna',
    status: 'result-pending',
    openTime: '11:00',
    closeTime: '13:00',
    resultTime: '13:30',
    totalBets: 450,
    totalAmount: 45000
  },
  {
    id: '4',
    name: 'Time Bazaar',
    type: 'single',
    status: 'active',
    openTime: '12:00',
    closeTime: '14:00',
    resultTime: '14:30',
    totalBets: 678,
    totalAmount: 52000
  }
]

const gameTypes = [
  { value: 'single', label: 'Single', multiplier: '9.5x' },
  { value: 'jodi', label: 'Jodi', multiplier: '95x' },
  { value: 'panna', label: 'Panna', multiplier: '950x' }
]

export default function GamesManagement() {
  const [games, setGames] = useState<Game[]>(mockGames)
  const [selectedGame, setSelectedGame] = useState<Game | null>(null)
  const [showResultModal, setShowResultModal] = useState(false)
  const [result, setResult] = useState('')

  const handleGameStatus = (gameId: string, newStatus: Game['status']) => {
    setGames(games.map(game => 
      game.id === gameId ? { ...game, status: newStatus } : game
    ))
  }

  const handleResultSubmit = (gameId: string, result: string) => {
    setGames(games.map(game => 
      game.id === gameId ? { ...game, result, status: 'closed' as const } : game
    ))
    setShowResultModal(false)
    setResult('')
  }

  const openResultModal = (game: Game) => {
    setSelectedGame(game)
    setShowResultModal(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Games Management</h1>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
          Create New Game
        </button>
      </div>

      {/* Game Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Games</p>
              <p className="text-2xl font-bold text-green-600">
                {games.filter(g => g.status === 'active').length}
              </p>
            </div>
            <Play className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Bets</p>
              <p className="text-2xl font-bold text-blue-600">
                {formatNumber(games.reduce((sum, g) => sum + g.totalBets, 0))}
              </p>
            </div>
            <Users className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Amount</p>
              <p className="text-2xl font-bold text-purple-600">
                {formatCurrency(games.reduce((sum, g) => sum + g.totalAmount, 0))}
              </p>
            </div>
            <DollarSign className="h-8 w-8 text-purple-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Results</p>
              <p className="text-2xl font-bold text-orange-600">
                {games.filter(g => g.status === 'result-pending').length}
              </p>
            </div>
            <Clock className="h-8 w-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Games List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {games.map((game) => (
          <div key={game.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{game.name}</h3>
                <div className="flex items-center space-x-2 mt-1">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(game.status)}`}>
                    {game.status}
                  </span>
                  <span className="text-sm text-gray-500">{game.type}</span>
                </div>
              </div>
              <div className="flex space-x-2">
                {game.status === 'active' && (
                  <button
                    onClick={() => handleGameStatus(game.id, 'closed')}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                  >
                    <Pause className="h-4 w-4" />
                  </button>
                )}
                {game.status === 'closed' && (
                  <button
                    onClick={() => handleGameStatus(game.id, 'active')}
                    className="p-2 text-green-600 hover:bg-green-50 rounded-md"
                  >
                    <Play className="h-4 w-4" />
                  </button>
                )}
                <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-md">
                  <Settings className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-600">Open Time</p>
                <p className="font-semibold">{game.openTime}</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-600">Close Time</p>
                <p className="font-semibold">{game.closeTime}</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-600">Result Time</p>
                <p className="font-semibold">{game.resultTime}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-600">Total Bets</p>
                <p className="text-lg font-semibold">{formatNumber(game.totalBets)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Amount</p>
                <p className="text-lg font-semibold">{formatCurrency(game.totalAmount)}</p>
              </div>
            </div>

            {game.result && (
              <div className="mb-4 p-3 bg-green-50 rounded-lg">
                <p className="text-sm text-green-700">Result: <span className="font-bold text-lg">{game.result}</span></p>
              </div>
            )}

            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-indigo-600" />
                <span className="text-sm text-gray-600">
                  {gameTypes.find(t => t.value === game.type)?.multiplier} payout
                </span>
              </div>
              {game.status === 'result-pending' && (
                <button
                  onClick={() => openResultModal(game)}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 text-sm"
                >
                  Declare Result
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Result Modal */}
      {showResultModal && selectedGame && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Declare Result</h2>
              <button
                onClick={() => setShowResultModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Game: {selectedGame.name}</p>
              <p className="text-sm text-gray-600 mb-4">Type: {selectedGame.type}</p>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Result
              </label>
              <input
                type="text"
                value={result}
                onChange={(e) => setResult(e.target.value)}
                placeholder={selectedGame.type === 'single' ? 'Enter single digit (0-9)' : 
                           selectedGame.type === 'jodi' ? 'Enter two digits (00-99)' : 
                           'Enter three digits (000-999)'}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowResultModal(false)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleResultSubmit(selectedGame.id, result)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                disabled={!result}
              >
                Declare Result
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
