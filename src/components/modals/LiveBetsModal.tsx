'use client'

import { useState } from 'react'
import { XCircle, Eye, Download, Filter, Search, TrendingUp, DollarSign, Clock, User, Target } from 'lucide-react'
import { Bet } from '@/types'

interface LiveBetsModalProps {
  isOpen: boolean
  onClose: () => void
  gameName: string
  bets: Bet[]
}

export default function LiveBetsModal({
  isOpen,
  onClose,
  gameName,
  bets
}: LiveBetsModalProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'won' | 'lost'>('all')
  const [betTypeFilter, setBetTypeFilter] = useState<'all' | 'single' | 'jodi' | 'panna'>('all')
  const [selectedBet, setSelectedBet] = useState<Bet | null>(null)

  const filteredBets = bets.filter(bet => {
    const matchesSearch = bet.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bet.numbers.join('').includes(searchTerm)
    const matchesStatus = statusFilter === 'all' || bet.status === statusFilter
    const matchesType = betTypeFilter === 'all' || bet.betType === betTypeFilter
    
    return matchesSearch && matchesStatus && matchesType
  })

  const formatCurrency = (amount: number) => `₹${amount.toLocaleString('en-IN')}`
  const formatTime = (date: Date) => date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })

  const getStatusColor = (status: string) => {
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

  const getBetTypeColor = (betType: string) => {
    switch (betType) {
      case 'single':
        return 'bg-blue-100 text-blue-800'
      case 'jodi':
        return 'bg-purple-100 text-purple-800'
      case 'panna':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const totalBets = filteredBets.length
  const totalAmount = filteredBets.reduce((sum, bet) => sum + bet.amount, 0)
  const potentialPayout = filteredBets.reduce((sum, bet) => sum + bet.potentialWin, 0)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-7xl w-full mx-4 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Live Bets - {gameName}</h3>
            <p className="text-sm text-gray-600 mt-1">Real-time betting activity</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <XCircle className="h-6 w-6" />
          </button>
        </div>

        {/* Stats Overview */}
        <div className="p-4 bg-gray-50 border-b">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Total Bets</p>
                  <p className="text-xl font-bold text-blue-900">{totalBets}</p>
                </div>
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="bg-green-50 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600">Total Amount</p>
                  <p className="text-xl font-bold text-green-900">{formatCurrency(totalAmount)}</p>
                </div>
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="bg-purple-50 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-600">Potential Payout</p>
                  <p className="text-xl font-bold text-purple-900">{formatCurrency(potentialPayout)}</p>
                </div>
                <Target className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="bg-orange-50 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-600">Expected Profit</p>
                  <p className="text-xl font-bold text-orange-900">
                    {formatCurrency(Math.max(0, totalAmount - potentialPayout * 0.1))}
                  </p>
                </div>
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="p-4 border-b bg-white">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search user or numbers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="won">Won</option>
              <option value="lost">Lost</option>
            </select>

            <select
              value={betTypeFilter}
              onChange={(e) => setBetTypeFilter(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Types</option>
              <option value="single">Single</option>
              <option value="jodi">Jodi</option>
              <option value="panna">Panna</option>
            </select>

            <div className="flex space-x-2">
              <button className="flex items-center px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </button>
              <button className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                <Download className="h-4 w-4 mr-2" />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Bets Table */}
        <div className="flex-1 overflow-auto p-4">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Numbers
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Potential Win
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBets.map((bet) => (
                  <tr key={bet.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8">
                          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                            <User className="h-4 w-4 text-blue-600" />
                          </div>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">{bet.userName}</p>
                          <p className="text-xs text-gray-500">ID: {bet.userId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getBetTypeColor(bet.betType)}`}>
                        {bet.betType.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex flex-wrap gap-1">
                        {bet.numbers.map((num, index) => (
                          <span key={index} className="inline-block px-2 py-1 text-sm font-bold bg-gray-100 rounded">
                            {num}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {formatCurrency(bet.amount)}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                      {formatCurrency(bet.potentialWin)}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(bet.status)}`}>
                        {bet.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {formatTime(bet.placedAt)}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => setSelectedBet(bet)}
                        className="text-blue-600 hover:text-blue-900 flex items-center"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredBets.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-500">
                  <Target className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No bets found matching your criteria</p>
                  <p className="text-sm mt-2">Try adjusting your filters</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-gray-50">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Showing {filteredBets.length} of {bets.length} bets
            </div>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            >
              Close
            </button>
          </div>
        </div>
      </div>

      {/* Bet Details Modal */}
      {selectedBet && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-60">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-bold text-gray-900">Bet Details</h4>
              <button
                onClick={() => setSelectedBet(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XCircle className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-sm font-medium text-gray-700">Bet ID</p>
                  <p className="text-sm text-gray-900">#{selectedBet.id}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">User</p>
                  <p className="text-sm text-gray-900">{selectedBet.userName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Type</p>
                  <p className="text-sm text-gray-900">{selectedBet.betType}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Numbers</p>
                  <p className="text-sm text-gray-900">{selectedBet.numbers.join(', ')}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Amount</p>
                  <p className="text-sm text-gray-900">{formatCurrency(selectedBet.amount)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Multiplier</p>
                  <p className="text-sm text-gray-900">{selectedBet.multiplier}x</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Potential Win</p>
                  <p className="text-sm text-green-600 font-medium">{formatCurrency(selectedBet.potentialWin)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Status</p>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedBet.status)}`}>
                    {selectedBet.status}
                  </span>
                </div>
                <div className="col-span-2">
                  <p className="text-sm font-medium text-gray-700">Placed At</p>
                  <p className="text-sm text-gray-900">{selectedBet.placedAt.toLocaleString('en-IN')}</p>
                </div>
                {selectedBet.resultAt && (
                  <div className="col-span-2">
                    <p className="text-sm font-medium text-gray-700">Result At</p>
                    <p className="text-sm text-gray-900">{selectedBet.resultAt.toLocaleString('en-IN')}</p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="mt-6">
              <button
                onClick={() => setSelectedBet(null)}
                className="w-full px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
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
