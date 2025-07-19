'use client'

import { useState } from 'react'
import { X, Eye, Search, Download } from 'lucide-react'
import { Game, Bet } from '@/types'

interface LiveBetsModalProps {
  game: Game
  bets: Bet[]
  onClose: () => void
}

export default function LiveBetsModal({ game, bets, onClose }: LiveBetsModalProps) {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'pending' | 'won' | 'lost'>('all')
  const [selectedBetType, setSelectedBetType] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedBet, setSelectedBet] = useState<Bet | null>(null)

  const filteredBets = bets.filter(bet => {
    const matchesFilter = selectedFilter === 'all' || bet.status === selectedFilter
    const matchesBetType = selectedBetType === 'all' || bet.betType === selectedBetType
    const matchesSearch = bet.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bet.numbers.some(num => num.includes(searchTerm))
    
    return matchesFilter && matchesBetType && matchesSearch
  })

  const stats = {
    totalBets: bets.length,
    totalAmount: bets.reduce((sum, bet) => sum + bet.amount, 0),
    pendingBets: bets.filter(bet => bet.status === 'pending').length,
    wonBets: bets.filter(bet => bet.status === 'won').length,
    lostBets: bets.filter(bet => bet.status === 'lost').length,
    totalWinnings: bets.filter(bet => bet.status === 'won').reduce((sum, bet) => sum + bet.potentialWin, 0)
  }

  const formatCurrency = (amount: number) => `₹${amount.toLocaleString('en-IN')}`

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'won':
        return 'bg-green-100 text-green-800'
      case 'lost':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const betTypes = [...new Set(bets.map(bet => bet.betType))]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-7xl w-full mx-4 h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Eye className="h-6 w-6 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-900">Live Bets - {game.name}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Stats Overview */}
        <div className="p-6 bg-gray-50 border-b border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">Total Bets</p>
              <p className="text-2xl font-bold text-blue-600">{stats.totalBets}</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">Total Amount</p>
              <p className="text-2xl font-bold text-green-600">{formatCurrency(stats.totalAmount)}</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.pendingBets}</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">Won</p>
              <p className="text-2xl font-bold text-green-600">{stats.wonBets}</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">Lost</p>
              <p className="text-2xl font-bold text-red-600">{stats.lostBets}</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">Winnings</p>
              <p className="text-2xl font-bold text-orange-600">{formatCurrency(stats.totalWinnings)}</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="p-6 border-b border-gray-200 space-y-4">
          <div className="flex flex-wrap gap-4 items-center">
            {/* Search */}
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by user or number..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Status Filter */}
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value as 'all' | 'pending' | 'won' | 'lost')}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="won">Won</option>
              <option value="lost">Lost</option>
            </select>

            {/* Bet Type Filter */}
            <select
              value={selectedBetType}
              onChange={(e) => setSelectedBetType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Types</option>
              {betTypes.map(type => (
                <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
              ))}
            </select>

            {/* Export Button */}
            <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
              <Download className="h-4 w-4 mr-2" />
              Export
            </button>
          </div>
        </div>

        {/* Bets Table */}
        <div className="flex-1 overflow-auto">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bet Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Numbers</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Potential Win</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Session</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBets.map((bet) => (
                  <tr key={bet.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{bet.userName}</div>
                        <div className="text-sm text-gray-500">{bet.userId}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                      {bet.betType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                        {bet.numbers.join(', ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      {formatCurrency(bet.amount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                      {formatCurrency(bet.potentialWin)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        bet.session === 'open' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                      }`}>
                        {bet.session}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {bet.placedAt.toLocaleTimeString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(bet.status)}`}>
                        {bet.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => setSelectedBet(bet)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredBets.length === 0 && (
            <div className="text-center py-12">
              <Eye className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-lg font-medium text-gray-900">No bets found</p>
              <p className="text-gray-500">Try adjusting your filters or search terms</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center p-6 border-t border-gray-200 bg-gray-50">
          <div className="text-sm text-gray-600">
            Showing {filteredBets.length} of {bets.length} bets
          </div>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 font-medium"
          >
            Close
          </button>
        </div>
      </div>

      {/* Bet Details Modal */}
      {selectedBet && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-60">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-900">Bet Details</h3>
              <button
                onClick={() => setSelectedBet(null)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-600">User:</span>
                  <p className="font-bold">{selectedBet.userName}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-600">User ID:</span>
                  <p className="font-bold">{selectedBet.userId}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Bet Type:</span>
                  <p className="font-bold capitalize">{selectedBet.betType}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Session:</span>
                  <p className="font-bold capitalize">{selectedBet.session}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Numbers:</span>
                  <p className="font-bold font-mono">{selectedBet.numbers.join(', ')}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Multiplier:</span>
                  <p className="font-bold">{selectedBet.multiplier}x</p>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Amount:</span>
                  <p className="font-bold text-green-600">{formatCurrency(selectedBet.amount)}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Potential Win:</span>
                  <p className="font-bold text-green-600">{formatCurrency(selectedBet.potentialWin)}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Placed At:</span>
                  <p className="font-bold">{selectedBet.placedAt.toLocaleString()}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Status:</span>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(selectedBet.status)}`}>
                    {selectedBet.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-end p-6 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => setSelectedBet(null)}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
