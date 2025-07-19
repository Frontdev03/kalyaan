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
  type: 'single' | 'jodi' | 'panna' | 'half-sangam' | 'full-sangam'
  category: 'main' | 'starline' | 'gali-disawar' | 'other'
  status: 'active' | 'closed' | 'result-pending' | 'maintenance'
  openTime: string
  closeTime: string
  resultTime: string
  result?: {
    open?: string
    close?: string
    jodi?: string
    panna?: string[]
  }
  totalBets: number
  totalAmount: number
  winningAmount: number
  settings: {
    singleRate: number
    jodiRate: number
    pannaRate: number
    halfSangamRate: number
    fullSangamRate: number
    minBetAmount: number
    maxBetAmount: number
    isActive: boolean
    allowOfflineResult: boolean
  }
  nextResultTime?: string
  lastResult?: {
    date: Date
    open: string
    close: string
  }[]
}

export interface Bet {
  id: string
  userId: string
  userName: string
  gameId: string
  gameName: string
  gameCategory: string
  betType: 'single' | 'jodi' | 'panna' | 'half-sangam' | 'full-sangam' | 'cp' | 'dp'
  numbers: string[]
  amount: number
  multiplier: number
  potentialWin: number
  status: 'pending' | 'won' | 'lost' | 'cancelled' | 'refunded'
  placedAt: Date
  resultAt?: Date
  session: 'open' | 'close'
  userIp?: string
  deviceInfo?: string
  isBonus?: boolean
  commission?: number
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
  singleRate: number
  jodiRate: number
  pannaRate: number
  halfSangamRate: number
  fullSangamRate: number
  minBetAmount: number
  maxBetAmount: number
  gameOpenTime?: string
  gameCloseTime?: string
  resultTime?: string
  isActive: boolean
  allowOfflineResult: boolean
  maintenanceMode?: boolean
  allowNewRegistrations?: boolean
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

export interface GameResult {
  id: string
  gameId: string
  gameName: string
  date: Date
  session: 'open' | 'close'
  result: string
  winningNumbers: {
    single: string[]
    jodi: string[]
    panna: string[]
    halfSangam: string[]
    fullSangam: string[]
  }
  totalWinningAmount: number
  totalBets: number
  declaredBy: string
  declaredAt: Date
}

export interface GameChart {
  gameId: string
  gameName: string
  results: {
    date: string
    open: string
    close: string
    jodi: string
  }[]
}

export interface UserWalletTransaction {
  id: string
  userId: string
  type: 'deposit' | 'withdrawal' | 'bet' | 'win' | 'refund' | 'bonus' | 'commission'
  amount: number
  balance: number
  description: string
  reference?: string
  status: 'completed' | 'pending' | 'failed'
  createdAt: Date
}

export interface AdminPermission {
  id: string
  name: string
  description: string
  module: string
}

export interface SystemSettings {
  maintenance: {
    enabled: boolean
    message: string
    startTime?: Date
    endTime?: Date
  }
  gameSettings: {
    allowNewBets: boolean
    defaultRates: {
      single: number
      jodi: number
      panna: number
      halfSangam: number
      fullSangam: number
    }
    betLimits: {
      min: number
      max: number
      dailyLimit: number
    }
  }
  paymentSettings: {
    minDeposit: number
    maxDeposit: number
    minWithdrawal: number
    maxWithdrawal: number
    withdrawalCharge: number
    autoApprovalLimit: number
  }
  notifications: {
    sms: boolean
    email: boolean
    whatsapp: boolean
    pushNotification: boolean
  }
}
