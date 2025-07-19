// Types for the Kalyan Live Admin Dashboard

export interface User {
  id: string
  name: string
  email: string
  phone: string
  status: 'active' | 'inactive' | 'blocked'
  balance: number
  totalBets: number
  totalWinnings: number
  joinDate: Date
  lastLogin: Date
  kycStatus: 'pending' | 'approved' | 'rejected'
  avatar?: string
}

export interface Game {
  id: string
  name: string
  type: 'single' | 'jodi' | 'panna'
  status: 'active' | 'closed' | 'result-pending'
  openTime: string
  closeTime: string
  resultTime: string
  result?: string
  totalBets: number
  totalAmount: number
}

export interface Bet {
  id: string
  userId: string
  userName: string
  gameId: string
  gameName: string
  betType: 'single' | 'jodi' | 'panna'
  numbers: string[]
  amount: number
  multiplier: number
  potentialWin: number
  status: 'pending' | 'won' | 'lost'
  placedAt: Date
  resultAt?: Date
}

export interface Transaction {
  id: string
  userId: string
  userName: string
  type: 'deposit' | 'withdrawal' | 'bet' | 'win' | 'refund'
  amount: number
  status: 'pending' | 'completed' | 'failed'
  method: 'upi' | 'bank' | 'wallet'
  description: string
  createdAt: Date
  completedAt?: Date
}

export interface DashboardStats {
  totalUsers: number
  activeUsers: number
  totalBets: number
  totalRevenue: number
  totalWinnings: number
  todayBets: number
  todayRevenue: number
  pendingWithdrawals: number
  pendingDeposits: number
  activeGames: number
}

export interface ChartData {
  date: string
  bets: number
  revenue: number
  users: number
}

export interface AdminUser {
  id: string
  username: string
  email: string
  role: 'super-admin' | 'admin' | 'moderator'
  permissions: string[]
  lastLogin: Date
  createdAt: Date
}

export interface Notification {
  id: string
  type: 'info' | 'warning' | 'error' | 'success'
  title: string
  message: string
  read: boolean
  createdAt: Date
}

export interface GameSettings {
  singleMultiplier: number
  jodiMultiplier: number
  pannaMultiplier: number
  minBetAmount: number
  maxBetAmount: number
  gameOpenTime: string
  gameCloseTime: string
  resultTime: string
  maintenanceMode: boolean
  allowNewRegistrations: boolean
}

export interface WithdrawalRequest {
  id: string
  userId: string
  userName: string
  amount: number
  method: 'upi' | 'bank'
  accountDetails: {
    accountNumber?: string
    ifscCode?: string
    upiId?: string
    accountHolderName: string
  }
  status: 'pending' | 'approved' | 'rejected'
  requestedAt: Date
  processedAt?: Date
  processedBy?: string
  remarks?: string
}
