'use client'

import { useState } from 'react'
import { Search, Filter, Eye, CheckCircle, XCircle, Download, Upload, CreditCard, Wallet } from 'lucide-react'
import { Transaction } from '@/types'
import { formatCurrency, formatDate, getStatusColor } from '@/lib/utils'

// Mock data - replace with real API calls
const mockTransactions: Transaction[] = [
  {
    id: 'TXN001',
    userId: '1',
    userName: 'Rajesh Kumar',
    type: 'deposit',
    amount: 5000,
    status: 'completed',
    method: 'upi',
    description: 'Deposit via UPI',
    createdAt: new Date('2024-01-18T09:30:00'),
    completedAt: new Date('2024-01-18T09:31:00')
  },
  {
    id: 'TXN002',
    userId: '2',
    userName: 'Priya Sharma',
    type: 'withdrawal',
    amount: 2500,
    status: 'pending',
    method: 'bank',
    description: 'Withdrawal to bank account',
    createdAt: new Date('2024-01-18T10:15:00')
  },
  {
    id: 'TXN003',
    userId: '1',
    userName: 'Rajesh Kumar',
    type: 'bet',
    amount: 100,
    status: 'completed',
    method: 'wallet',
    description: 'Bet on Main Bazaar',
    createdAt: new Date('2024-01-18T10:30:00'),
    completedAt: new Date('2024-01-18T10:30:00')
  },
  {
    id: 'TXN004',
    userId: '1',
    userName: 'Rajesh Kumar',
    type: 'win',
    amount: 950,
    status: 'completed',
    method: 'wallet',
    description: 'Winnings from Main Bazaar',
    createdAt: new Date('2024-01-18T11:30:00'),
    completedAt: new Date('2024-01-18T11:30:00')
  },
  {
    id: 'TXN005',
    userId: '3',
    userName: 'Amit Patel',
    type: 'deposit',
    amount: 1000,
    status: 'failed',
    method: 'upi',
    description: 'Deposit via UPI - Payment failed',
    createdAt: new Date('2024-01-18T12:00:00')
  },
  {
    id: 'TXN006',
    userId: '4',
    userName: 'Sunita Devi',
    type: 'withdrawal',
    amount: 800,
    status: 'pending',
    method: 'upi',
    description: 'Withdrawal via UPI',
    createdAt: new Date('2024-01-18T13:45:00')
  }
]

export default function TransactionsManagement() {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [methodFilter, setMethodFilter] = useState<string>('all')
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter
    const matchesType = typeFilter === 'all' || transaction.type === typeFilter
    const matchesMethod = methodFilter === 'all' || transaction.method === methodFilter

    return matchesSearch && matchesStatus && matchesType && matchesMethod
  })

  const totalTransactions = filteredTransactions.length
  const totalAmount = filteredTransactions.reduce((sum, txn) => sum + txn.amount, 0)
  const pendingTransactions = filteredTransactions.filter(txn => txn.status === 'pending').length
  const completedTransactions = filteredTransactions.filter(txn => txn.status === 'completed').length

  const handleTransactionAction = (transactionId: string, action: 'approve' | 'reject') => {
    setTransactions(transactions.map(txn => 
      txn.id === transactionId 
        ? { 
            ...txn, 
            status: action === 'approve' ? 'completed' : 'failed' as const, 
            completedAt: new Date() 
          }
        : txn
    ))
  }

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'deposit':
        return <Download className="h-4 w-4 text-green-600" />
      case 'withdrawal':
        return <Upload className="h-4 w-4 text-red-600" />
      case 'bet':
        return <CreditCard className="h-4 w-4 text-blue-600" />
      case 'win':
        return <Wallet className="h-4 w-4 text-purple-600" />
      default:
        return <CreditCard className="h-4 w-4 text-gray-600" />
    }
  }

  const getAmountColor = (type: string) => {
    switch (type) {
      case 'deposit':
      case 'win':
        return 'text-green-600'
      case 'withdrawal':
      case 'bet':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Transactions Management</h1>
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
              <p className="text-sm font-medium text-gray-600">Total Transactions</p>
              <p className="text-2xl font-bold text-gray-900">{totalTransactions}</p>
            </div>
            <CreditCard className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Amount</p>
              <p className="text-2xl font-bold text-green-600">{formatCurrency(totalAmount)}</p>
            </div>
            <Wallet className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-orange-600">{pendingTransactions}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-orange-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-purple-600">{completedTransactions}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-purple-600" />
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
              placeholder="Search transactions..."
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
            <option value="completed">Completed</option>
            <option value="failed">Failed</option>
          </select>
          <select
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="deposit">Deposit</option>
            <option value="withdrawal">Withdrawal</option>
            <option value="bet">Bet</option>
            <option value="win">Win</option>
            <option value="refund">Refund</option>
          </select>
          <select
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            value={methodFilter}
            onChange={(e) => setMethodFilter(e.target.value)}
          >
            <option value="all">All Methods</option>
            <option value="upi">UPI</option>
            <option value="bank">Bank Transfer</option>
            <option value="wallet">Wallet</option>
          </select>
          <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </button>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Transaction ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Method
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created At
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {transaction.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transaction.userName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getTransactionIcon(transaction.type)}
                      <span className="ml-2 text-sm capitalize">{transaction.type}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <span className={getAmountColor(transaction.type)}>
                      {transaction.type === 'deposit' || transaction.type === 'win' ? '+' : '-'}
                      {formatCurrency(transaction.amount)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 uppercase">
                      {transaction.method}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(transaction.status)}`}>
                      {transaction.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(transaction.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setSelectedTransaction(transaction)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      {transaction.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleTransactionAction(transaction.id, 'approve')}
                            className="text-green-600 hover:text-green-900"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleTransactionAction(transaction.id, 'reject')}
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

      {/* Transaction Details Modal */}
      {selectedTransaction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Transaction Details</h2>
              <button
                onClick={() => setSelectedTransaction(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Transaction ID</label>
                <p className="mt-1 text-sm text-gray-900">{selectedTransaction.id}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">User</label>
                <p className="mt-1 text-sm text-gray-900">{selectedTransaction.userName}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <p className="mt-1 text-sm text-gray-900 capitalize">{selectedTransaction.type}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Amount</label>
                <p className="mt-1 text-sm text-gray-900">{formatCurrency(selectedTransaction.amount)}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Method</label>
                <p className="mt-1 text-sm text-gray-900 uppercase">{selectedTransaction.method}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <p className="mt-1 text-sm text-gray-900 capitalize">{selectedTransaction.status}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Created At</label>
                <p className="mt-1 text-sm text-gray-900">{formatDate(selectedTransaction.createdAt)}</p>
              </div>
              {selectedTransaction.completedAt && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Completed At</label>
                  <p className="mt-1 text-sm text-gray-900">{formatDate(selectedTransaction.completedAt)}</p>
                </div>
              )}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <p className="mt-1 text-sm text-gray-900">{selectedTransaction.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
