'use client'

import { useState } from 'react'
import { 
  Play, 
  Pause, 
  Settings, 
  TrendingUp, 
  Users, 
  Clock,
  DollarSign,
  Eye,
  Edit,
  Plus,
  Calendar,
  Trophy,
  Target,
  AlertCircle,
  CheckCircle,
  XCircle,
  Download,
  Filter
} from 'lucide-react'
import { Game, Bet, GameResult } from '@/types'

// Mock data for Main Bazaar
const mainBazaarGame: Game = {
  id: '1',
  name: 'Main Bazaar',
  type: 'single',
  category: 'main',
  status: 'active',
  openTime: '09:15',
  closeTime: '11:15',
  resultTime: '12:00',
  totalBets: 1250,
  totalAmount: 125000,
  winningAmount: 87500,
  nextResultTime: '12:00',
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
    jodi: '58',
    panna: ['127', '245', '389']
  },
  lastResult: [
    { date: new Date('2025-01-18'), open: '5', close: '8' },
    { date: new Date('2025-01-17'), open: '2', close: '6' },
    { date: new Date('2025-01-16'), open: '9', close: '3' }
  ]
}

const recentBets: Bet[] = [
  {
    id: '1',
    userId: '1',
    userName: 'Rajesh Kumar',
    gameId: '1',
    gameName: 'Main Bazaar',
    gameCategory: 'main',
    betType: 'single',
    numbers: ['4'],
    amount: 100,
    multiplier: 9.5,
    potentialWin: 950,
    status: 'pending',
    placedAt: new Date('2025-01-19T10:30:00'),
    session: 'open'
  },
  {
    id: '2',
    userId: '2',
    userName: 'Priya Sharma',
    gameId: '1',
    gameName: 'Main Bazaar',
    gameCategory: 'main',
    betType: 'jodi',
    numbers: ['45'],
    amount: 200,
    multiplier: 95,
    potentialWin: 19000,
    status: 'pending',
    placedAt: new Date('2025-01-19T10:45:00'),
    session: 'close'
  }
]

export default function MainBazaarManagement() {
  const [showResultModal, setShowResultModal] = useState(false)
  const [showSettingsModal, setShowSettingsModal] = useState(false)
  const [resultNumbers, setResultNumbers] = useState({ open: '', close: '' })
  const [gameSettings, setGameSettings] = useState(mainBazaarGame.settings)
  const [selectedTab, setSelectedTab] = useState<'overview' | 'bets' | 'results' | 'chart'>('overview')

  const handleDeclareResult = () => {
    // Handle result declaration
    console.log('Declaring result:', resultNumbers)
    setShowResultModal(false)
    // Update game status and results
  }

  const handleGameToggle = () => {
    // Handle game start/stop
    console.log('Toggling game status')
  }

  const handleUpdateSettings = () => {
    // Handle settings update
    console.log('Updating settings:', gameSettings)
    setShowSettingsModal(false)
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
              <Target className="h-8 w-8 text-blue-600 mr-3" />
              {mainBazaarGame.name}
            </h2>
            <div className="flex items-center mt-2 space-x-4">
              <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                mainBazaarGame.status === 'active' 
                  ? 'bg-green-100 text-green-800' 
                  : mainBazaarGame.status === 'closed'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {mainBazaarGame.status.toUpperCase()}
              </span>
              <span className="text-gray-600 flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                Open: {formatTime(mainBazaarGame.openTime)} | Close: {formatTime(mainBazaarGame.closeTime)}
              </span>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleGameToggle}
              className={`flex items-center px-4 py-2 rounded-lg font-semibold ${
                mainBazaarGame.status === 'active'
                  ? 'bg-red-600 text-white hover:bg-red-700'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              {mainBazaarGame.status === 'active' ? (
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
            <button
              onClick={() => setShowSettingsModal(true)}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-700 flex items-center"
            >
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
                <p className="text-2xl font-bold text-blue-900">{mainBazaarGame.totalBets.toLocaleString()}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Total Amount</p>
                <p className="text-2xl font-bold text-green-900">{formatCurrency(mainBazaarGame.totalAmount)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Winning Amount</p>
                <p className="text-2xl font-bold text-purple-900">{formatCurrency(mainBazaarGame.winningAmount)}</p>
              </div>
              <Trophy className="h-8 w-8 text-purple-600" />
            </div>
          </div>
          <div className="bg-orange-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600">Profit</p>
                <p className="text-2xl font-bold text-orange-900">
                  {formatCurrency(mainBazaarGame.totalAmount - mainBazaarGame.winningAmount)}
                </p>
              </div>
              <Target className="h-8 w-8 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Current Result */}
      {mainBazaarGame.result && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Current Result</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-sm font-medium text-blue-600">Open</p>
              <p className="text-3xl font-bold text-blue-900">{mainBazaarGame.result.open}</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-sm font-medium text-green-600">Close</p>
              <p className="text-3xl font-bold text-green-900">{mainBazaarGame.result.close}</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-sm font-medium text-purple-600">Jodi</p>
              <p className="text-3xl font-bold text-purple-900">{mainBazaarGame.result.jodi}</p>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <p className="text-sm font-medium text-yellow-600">Panna</p>
              <div className="flex justify-center space-x-2">
                {mainBazaarGame.result.panna?.map((panna, index) => (
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
                onClick={() => setSelectedTab(tab.id as any)}
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
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Game Settings</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-gray-600">Single Rate</p>
                    <p className="text-xl font-bold text-gray-900">{gameSettings.singleRate}x</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-gray-600">Jodi Rate</p>
                    <p className="text-xl font-bold text-gray-900">{gameSettings.jodiRate}x</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-gray-600">Panna Rate</p>
                    <p className="text-xl font-bold text-gray-900">{gameSettings.pannaRate}x</p>
                  </div>
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
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Numbers</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Potential Win</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Session</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentBets.map((bet) => (
                      <tr key={bet.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {bet.userName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                            {bet.betType}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {bet.numbers.join(', ')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {formatCurrency(bet.amount)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                          {formatCurrency(bet.potentialWin)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            bet.session === 'open' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                          }`}>
                            {bet.session}
                          </span>
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
              
              <div className="space-y-4">
                {mainBazaarGame.lastResult?.map((result, index) => (
                  <div key={index} className="border rounded-lg p-4 bg-gray-50">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-6">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Date</p>
                          <p className="text-lg font-bold text-gray-900">
                            {result.date.toLocaleDateString('en-IN')}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-600">Open</p>
                          <p className="text-2xl font-bold text-blue-600">{result.open}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-600">Close</p>
                          <p className="text-2xl font-bold text-green-600">{result.close}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-600">Jodi</p>
                          <p className="text-2xl font-bold text-purple-600">{result.open}{result.close}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="p-2 text-blue-600 hover:text-blue-800">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-gray-600 hover:text-gray-800">
                          <Edit className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
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
                <p className="text-sm text-gray-500 mt-2">Including date-wise results in tabular and graphical format</p>
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
              <h3 className="text-xl font-bold text-gray-900">Declare Result</h3>
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

      {/* Settings Modal */}
      {showSettingsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">Game Settings</h3>
              <button
                onClick={() => setShowSettingsModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XCircle className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Single Rate
                  </label>
                  <input
                    type="number"
                    value={gameSettings.singleRate}
                    onChange={(e) => setGameSettings({...gameSettings, singleRate: parseFloat(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    step="0.1"
                    min="1"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Jodi Rate
                  </label>
                  <input
                    type="number"
                    value={gameSettings.jodiRate}
                    onChange={(e) => setGameSettings({...gameSettings, jodiRate: parseFloat(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    step="1"
                    min="1"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Panna Rate
                  </label>
                  <input
                    type="number"
                    value={gameSettings.pannaRate}
                    onChange={(e) => setGameSettings({...gameSettings, pannaRate: parseFloat(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    step="1"
                    min="1"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Min Bet Amount
                  </label>
                  <input
                    type="number"
                    value={gameSettings.minBetAmount}
                    onChange={(e) => setGameSettings({...gameSettings, minBetAmount: parseFloat(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    step="1"
                    min="1"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Bet Amount
                  </label>
                  <input
                    type="number"
                    value={gameSettings.maxBetAmount}
                    onChange={(e) => setGameSettings({...gameSettings, maxBetAmount: parseFloat(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    step="1"
                    min="1"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={gameSettings.isActive}
                    onChange={(e) => setGameSettings({...gameSettings, isActive: e.target.checked})}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700">Game Active</span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={gameSettings.allowOfflineResult}
                    onChange={(e) => setGameSettings({...gameSettings, allowOfflineResult: e.target.checked})}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700">Allow Offline Result</span>
                </label>
              </div>
            </div>

            <div className="flex space-x-4 mt-8">
              <button
                onClick={() => setShowSettingsModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateSettings}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center justify-center"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Update Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
