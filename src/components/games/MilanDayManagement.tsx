'use client'

import { useState } from 'react'
import { 
  Play, 
  Pause, 
  Settings, 
  TrendingUp, 
  Clock,
  DollarSign,
  Trophy,
  CheckCircle,
  XCircle,
  Download,
  Filter,
  Calendar,
  Target,
  Activity
} from 'lucide-react'
import { Game } from '@/types'

interface MilanDayManagementProps {
  gameType?: 'day' | 'night'
}

export default function MilanDayManagement({ gameType = 'day' }: MilanDayManagementProps) {
  const [showResultModal, setShowResultModal] = useState(false)
  const [resultNumbers, setResultNumbers] = useState({ open: '', close: '' })
  const [selectedTab, setSelectedTab] = useState<'overview' | 'bets' | 'results' | 'chart'>('overview')

  // Mock data for Milan Day
  const milanGame: Game = {
    id: '2',
    name: `Milan ${gameType === 'day' ? 'Day' : 'Night'}`,
    type: 'jodi',
    category: 'main',
    status: 'active',
    openTime: gameType === 'day' ? '12:10' : '21:10',
    closeTime: gameType === 'day' ? '14:10' : '23:10',
    resultTime: gameType === 'day' ? '14:40' : '23:40',
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
      jodi: '27',
      panna: ['129', '245', '368']
    }
  }

  const handleDeclareResult = () => {
    console.log('Declaring result:', resultNumbers)
    setShowResultModal(false)
    setResultNumbers({ open: '', close: '' })
  }

  const formatCurrency = (amount: number) => `₹${amount.toLocaleString('en-IN')}`
  const formatTime = (time: string) => time

  return (
    <div className="space-y-6">
      {/* Game Status Card */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <Clock className="h-8 w-8 text-indigo-600 mr-3" />
              {milanGame.name}
            </h2>
            <div className="flex items-center mt-2 space-x-4">
              <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                milanGame.status === 'active' 
                  ? 'bg-green-100 text-green-800' 
                  : milanGame.status === 'closed'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {milanGame.status.toUpperCase()}
              </span>
              <span className="text-gray-600 flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                Open: {formatTime(milanGame.openTime)} | Close: {formatTime(milanGame.closeTime)}
              </span>
            </div>
          </div>
          <div className="flex space-x-2">
            <button className={`flex items-center px-4 py-2 rounded-lg font-semibold ${
              milanGame.status === 'active'
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'bg-green-600 text-white hover:bg-green-700'
            }`}>
              {milanGame.status === 'active' ? (
                <>
                  <Pause className="h-4 w-4 mr-2" />
                  Stop Game
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Start Game
                </>
              )}
            </button>
            <button
              onClick={() => setShowResultModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 flex items-center"
            >
              <Trophy className="h-4 w-4 mr-2" />
              Declare Result
            </button>
            <button className="bg-gray-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-700 flex items-center">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Total Bets</p>
                <p className="text-2xl font-bold text-blue-900">{milanGame.totalBets.toLocaleString()}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Total Amount</p>
                <p className="text-2xl font-bold text-green-900">{formatCurrency(milanGame.totalAmount)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Winning Amount</p>
                <p className="text-2xl font-bold text-purple-900">{formatCurrency(milanGame.winningAmount)}</p>
              </div>
              <Trophy className="h-8 w-8 text-purple-600" />
            </div>
          </div>
          <div className="bg-orange-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600">Profit</p>
                <p className="text-2xl font-bold text-orange-900">
                  {formatCurrency(milanGame.totalAmount - milanGame.winningAmount)}
                </p>
              </div>
              <Target className="h-8 w-8 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Current Result */}
      {milanGame.result && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Current Result</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-sm font-medium text-blue-600">Open</p>
              <p className="text-3xl font-bold text-blue-900">{milanGame.result.open}</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-sm font-medium text-green-600">Close</p>
              <p className="text-3xl font-bold text-green-900">{milanGame.result.close}</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-sm font-medium text-purple-600">Jodi</p>
              <p className="text-3xl font-bold text-purple-900">{milanGame.result.jodi}</p>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <p className="text-sm font-medium text-yellow-600">Panna</p>
              <div className="flex justify-center space-x-2">
                {milanGame.result.panna?.map((panna, index) => (
                  <span key={index} className="text-lg font-bold text-yellow-900">{panna}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
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
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Game Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h5 className="font-semibold text-gray-900 mb-2">Timing</h5>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p>Open: {formatTime(milanGame.openTime)}</p>
                      <p>Close: {formatTime(milanGame.closeTime)}</p>
                      <p>Result: {formatTime(milanGame.resultTime)}</p>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h5 className="font-semibold text-gray-900 mb-2">Betting Rates</h5>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p>Single: {milanGame.settings.singleRate}x</p>
                      <p>Jodi: {milanGame.settings.jodiRate}x</p>
                      <p>Panna: {milanGame.settings.pannaRate}x</p>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h5 className="font-semibold text-gray-900 mb-2">Bet Limits</h5>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p>Min: {formatCurrency(milanGame.settings.minBetAmount)}</p>
                      <p>Max: {formatCurrency(milanGame.settings.maxBetAmount)}</p>
                      <p>Status: {milanGame.settings.isActive ? 'Active' : 'Inactive'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'bets' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-semibold text-gray-900">Live Bets</h4>
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
              
              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Live bets will be displayed here</p>
                <p className="text-sm text-gray-500 mt-2">Real-time betting activity for {milanGame.name}</p>
              </div>
            </div>
          )}

          {selectedTab === 'results' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-semibold text-gray-900">Results History</h4>
                <button className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  <Trophy className="h-4 w-4 mr-2" />
                  Add Manual Result
                </button>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Results history will be displayed here</p>
                <p className="text-sm text-gray-500 mt-2">Historical results for {milanGame.name}</p>
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
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Chart visualization will be implemented here</p>
                <p className="text-sm text-gray-500 mt-2">Comprehensive charts and analytics for {milanGame.name}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Result Declaration Modal */}
      {showResultModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">Declare Result - {milanGame.name}</h3>
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
                  Open Number
                </label>
                <input
                  type="text"
                  maxLength={1}
                  value={resultNumbers.open}
                  onChange={(e) => setResultNumbers({...resultNumbers, open: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter open number (0-9)"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Close Number
                </label>
                <input
                  type="text"
                  maxLength={1}
                  value={resultNumbers.close}
                  onChange={(e) => setResultNumbers({...resultNumbers, close: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter close number (0-9)"
                />
              </div>

              {resultNumbers.open && resultNumbers.close && (
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm font-medium text-blue-600 mb-2">Result Preview:</p>
                  <div className="space-y-2">
                    <p className="text-sm"><span className="font-semibold">Open:</span> {resultNumbers.open}</p>
                    <p className="text-sm"><span className="font-semibold">Close:</span> {resultNumbers.close}</p>
                    <p className="text-sm"><span className="font-semibold">Jodi:</span> {resultNumbers.open}{resultNumbers.close}</p>
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
                disabled={!resultNumbers.open || !resultNumbers.close}
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
