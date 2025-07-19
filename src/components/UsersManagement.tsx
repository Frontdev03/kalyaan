'use client'

import { useState } from 'react'
import { Search, Filter, MoreHorizontal, Eye, Edit, Ban, CheckCircle, XCircle } from 'lucide-react'
import { User } from '@/types'
import { formatCurrency, formatDate, getStatusColor } from '@/lib/utils'

// Mock data - replace with real API calls
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@example.com',
    phone: '+91-9876543210',
    status: 'active',
    balance: 5000,
    totalBets: 150,
    totalWinnings: 8500,
    joinDate: new Date('2024-01-15'),
    lastLogin: new Date('2024-01-18'),
    kycStatus: 'approved',
    avatar: undefined
  },
  {
    id: '2',
    name: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    phone: '+91-9876543211',
    status: 'active',
    balance: 2500,
    totalBets: 89,
    totalWinnings: 3200,
    joinDate: new Date('2024-01-10'),
    lastLogin: new Date('2024-01-17'),
    kycStatus: 'pending',
    avatar: undefined
  },
  {
    id: '3',
    name: 'Amit Patel',
    email: 'amit.patel@example.com',
    phone: '+91-9876543212',
    status: 'blocked',
    balance: 0,
    totalBets: 45,
    totalWinnings: 1200,
    joinDate: new Date('2024-01-05'),
    lastLogin: new Date('2024-01-16'),
    kycStatus: 'rejected',
    avatar: undefined
  },
  {
    id: '4',
    name: 'Sunita Devi',
    email: 'sunita.devi@example.com',
    phone: '+91-9876543213',
    status: 'inactive',
    balance: 1200,
    totalBets: 23,
    totalWinnings: 800,
    joinDate: new Date('2024-01-12'),
    lastLogin: new Date('2024-01-14'),
    kycStatus: 'approved',
    avatar: undefined
  }
]

export default function UsersManagement() {
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [kycFilter, setKycFilter] = useState<string>('all')
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.phone.includes(searchTerm)
    
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter
    const matchesKyc = kycFilter === 'all' || user.kycStatus === kycFilter

    return matchesSearch && matchesStatus && matchesKyc
  })

  const handleUserAction = (userId: string, action: string) => {
    setUsers(users.map(user => {
      if (user.id === userId) {
        switch (action) {
          case 'activate':
            return { ...user, status: 'active' as const }
          case 'deactivate':
            return { ...user, status: 'inactive' as const }
          case 'block':
            return { ...user, status: 'blocked' as const }
          case 'approve-kyc':
            return { ...user, kycStatus: 'approved' as const }
          case 'reject-kyc':
            return { ...user, kycStatus: 'rejected' as const }
          default:
            return user
        }
      }
      return user
    }))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Users Management</h1>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
          Add User
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
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
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="blocked">Blocked</option>
          </select>
          <select
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            value={kycFilter}
            onChange={(e) => setKycFilter(e.target.value)}
          >
            <option value="all">All KYC</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
          <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Balance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Bets
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  KYC Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Login
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                        <span className="text-indigo-600 font-medium">
                          {user.name.charAt(0)}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                        <div className="text-sm text-gray-500">{user.phone}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatCurrency(user.balance)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.totalBets}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.kycStatus)}`}>
                      {user.kycStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(user.lastLogin)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        <Edit className="h-4 w-4" />
                      </button>
                      <div className="relative group">
                        <button className="text-gray-600 hover:text-gray-900">
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 hidden group-hover:block">
                          <div className="py-1">
                            {user.status !== 'active' && (
                              <button
                                onClick={() => handleUserAction(user.id, 'activate')}
                                className="flex items-center px-4 py-2 text-sm text-green-700 hover:bg-green-50 w-full"
                              >
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Activate
                              </button>
                            )}
                            {user.status === 'active' && (
                              <button
                                onClick={() => handleUserAction(user.id, 'deactivate')}
                                className="flex items-center px-4 py-2 text-sm text-yellow-700 hover:bg-yellow-50 w-full"
                              >
                                <XCircle className="h-4 w-4 mr-2" />
                                Deactivate
                              </button>
                            )}
                            {user.status !== 'blocked' && (
                              <button
                                onClick={() => handleUserAction(user.id, 'block')}
                                className="flex items-center px-4 py-2 text-sm text-red-700 hover:bg-red-50 w-full"
                              >
                                <Ban className="h-4 w-4 mr-2" />
                                Block
                              </button>
                            )}
                            {user.kycStatus === 'pending' && (
                              <>
                                <button
                                  onClick={() => handleUserAction(user.id, 'approve-kyc')}
                                  className="flex items-center px-4 py-2 text-sm text-green-700 hover:bg-green-50 w-full"
                                >
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Approve KYC
                                </button>
                                <button
                                  onClick={() => handleUserAction(user.id, 'reject-kyc')}
                                  className="flex items-center px-4 py-2 text-sm text-red-700 hover:bg-red-50 w-full"
                                >
                                  <XCircle className="h-4 w-4 mr-2" />
                                  Reject KYC
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Details Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">User Details</h2>
              <button
                onClick={() => setSelectedUser(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <p className="mt-1 text-sm text-gray-900">{selectedUser.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <p className="mt-1 text-sm text-gray-900">{selectedUser.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <p className="mt-1 text-sm text-gray-900">{selectedUser.phone}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <p className="mt-1 text-sm text-gray-900">{selectedUser.status}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Balance</label>
                <p className="mt-1 text-sm text-gray-900">{formatCurrency(selectedUser.balance)}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Total Bets</label>
                <p className="mt-1 text-sm text-gray-900">{selectedUser.totalBets}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Total Winnings</label>
                <p className="mt-1 text-sm text-gray-900">{formatCurrency(selectedUser.totalWinnings)}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">KYC Status</label>
                <p className="mt-1 text-sm text-gray-900">{selectedUser.kycStatus}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Join Date</label>
                <p className="mt-1 text-sm text-gray-900">{formatDate(selectedUser.joinDate)}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Last Login</label>
                <p className="mt-1 text-sm text-gray-900">{formatDate(selectedUser.lastLogin)}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
