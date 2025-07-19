'use client'

import { useState } from 'react'
import { Search, Filter, Eye, CheckCircle, XCircle, TrendingUp, TrendingDown } from 'lucide-react'
import { Bet } from '@/types'
import { formatCurrency, formatDate, getStatusColor } from '@/lib/utils'

// Mock data - replace with real API calls
const mockBets: Bet[] = [
  {
    id: '1',
    userId: '1',
    userName: 'Rajesh Kumar',
    gameId: '1',
    gameName: 'Main Bazaar',
    betType: 'single',
    numbers: ['4'],
    amount: 100,
    multiplier: 9.5,
    potentialWin: 950,
    status: 'won',
    placedAt: new Date('2024-01-18T10:30:00'),
    resultAt: new Date('2024-01-18T11:30:00')
  },
  {
    id: '2',
    userId: '2',
    userName: 'Priya Sharma',
    gameId: '1',
    gameName: 'Main Bazaar',
    betType: 'jodi',
    numbers: ['45', '58'],
    amount: 200,
    multiplier: 95,
    potentialWin: 19000,
    status: 'lost',
    placedAt: new Date('2024-01-18T10:45:00'),
    resultAt: new Date('2024-01-18T11:30:00')
  },
  {
    id: '3',
    userId: '3',
    userName: 'Amit Patel',
    gameId: '2',
    gameName: 'Milan Day',
    betType: 'single',
    numbers: ['6'],
    amount: 50,
    multiplier: 9.5,
    potentialWin: 475,
    status: 'pending',
    placedAt: new Date('2024-01-18T11:15:00')
  },
  {
    id: '4',
    userId: '4',
    userName: 'Sunita Devi',
    gameId: '3',
    gameName: 'Rajdhani Day',
    betType: 'panna',
    numbers: ['123', '456'],
    amount: 300,
    multiplier: 950,
    potentialWin: 285000,
    status: 'pending',
    placedAt: new Date('2024-01-18T12:00:00')
  },
  {
    id: '5',
    userId: '1',
    userName: 'Rajesh Kumar',
    gameId: '4',
    gameName: 'Time Bazaar',
    betType: 'jodi',
    numbers: ['78'],
    amount: 150,
    multiplier: 95,
    potentialWin: 14250,
    status: 'won',
    placedAt: new Date('2024-01-18T13:20:00'),
    resultAt: new Date('2024-01-18T14:30:00')
  }
]

export default function BetsManagement() {
  const [bets, setBets] = useState<Bet[]>(mockBets)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [gameFilter, setGameFilter] = useState<string>('all')
  const [betTypeFilter, setBetTypeFilter] = useState<string>('all')
  const [selectedBet, setSelectedBet] = useState<Bet | null>(null)

  const filteredBets = bets.filter(bet => {
    const matchesSearch = bet.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bet.gameName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bet.id.includes(searchTerm)
    
    const matchesStatus = statusFilter === 'all' || bet.status === statusFilter
    const matchesGame = gameFilter === 'all' || bet.gameId === gameFilter
    const matchesBetType = betTypeFilter === 'all' || bet.betType === betTypeFilter

    return matchesSearch && matchesStatus && matchesGame && matchesBetType
  })

  const totalBets = filteredBets.length
  const totalAmount = filteredBets.reduce((sum, bet) => sum + bet.amount, 0)
  const totalWinnings = filteredBets.filter(bet => bet.status === 'won').reduce((sum, bet) => sum + bet.potentialWin, 0)
  const pendingBets = filteredBets.filter(bet => bet.status === 'pending').length

  const handleBetAction = (betId: string, action: 'approve' | 'reject') => {
    setBets(bets.map(bet => 
      bet.id === betId 
        ? { ...bet, status: action === 'approve' ? 'won' : 'lost' as const, resultAt: new Date() }
        : bet
    ))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Bets Management</h1>
        <div className="flex space-x-2">
          <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
            Export Report
          </button>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
            Refresh Data
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Bets</p>
              <p className="text-2xl font-bold text-gray-900">{totalBets}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Amount</p>
              <p className="text-2xl font-bold text-green-600">{formatCurrency(totalAmount)}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Winnings</p>
              <p className="text-2xl font-bold text-purple-600">{formatCurrency(totalWinnings)}</p>
            </div>
            <TrendingDown className="h-8 w-8 text-purple-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Bets</p>
              <p className="text-2xl font-bold text-orange-600">{pendingBets}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search bets..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="won">Won</option>
            <option value="lost">Lost</option>
          </select>
          <select
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            value={gameFilter}
            onChange={(e) => setGameFilter(e.target.value)}
          >
            <option value="all">All Games</option>
            <option value="1">Main Bazaar</option>
            <option value="2">Milan Day</option>
            <option value="3">Rajdhani Day</option>
            <option value="4">Time Bazaar</option>
          </select>
          <select
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            value={betTypeFilter}
            onChange={(e) => setBetTypeFilter(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="single">Single</option>
            <option value="jodi">Jodi</option>
            <option value="panna">Panna</option>
          </select>
          <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </button>
        </div>
      </div>

      {/* Bets Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bet ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Game
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Numbers
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Potential Win
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Placed At
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBets.map((bet) => (
                <tr key={bet.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    #{bet.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {bet.userName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {bet.gameName}
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
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(bet.status)}`}>
                      {bet.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(bet.placedAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setSelectedBet(bet)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      {bet.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleBetAction(bet.id, 'approve')}
                            className="text-green-600 hover:text-green-900"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleBetAction(bet.id, 'reject')}
                            className="text-red-600 hover:text-red-900"
                          >
                            <XCircle className="h-4 w-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bet Details Modal */}
      {selectedBet && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Bet Details</h2>
              <button
                onClick={() => setSelectedBet(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Bet ID</label>
                <p className="mt-1 text-sm text-gray-900">#{selectedBet.id}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">User</label>
                <p className="mt-1 text-sm text-gray-900">{selectedBet.userName}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Game</label>
                <p className="mt-1 text-sm text-gray-900">{selectedBet.gameName}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Bet Type</label>
                <p className="mt-1 text-sm text-gray-900">{selectedBet.betType}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Numbers</label>
                <p className="mt-1 text-sm text-gray-900">{selectedBet.numbers.join(', ')}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Amount</label>
                <p className="mt-1 text-sm text-gray-900">{formatCurrency(selectedBet.amount)}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Multiplier</label>
                <p className="mt-1 text-sm text-gray-900">{selectedBet.multiplier}x</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Potential Win</label>
                <p className="mt-1 text-sm text-gray-900">{formatCurrency(selectedBet.potentialWin)}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <p className="mt-1 text-sm text-gray-900">{selectedBet.status}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Placed At</label>
                <p className="mt-1 text-sm text-gray-900">{formatDate(selectedBet.placedAt)}</p>
              </div>
              {selectedBet.resultAt && (
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Result At</label>
                  <p className="mt-1 text-sm text-gray-900">{formatDate(selectedBet.resultAt)}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
