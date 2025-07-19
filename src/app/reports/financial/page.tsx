'use client'

import { useState } from 'react'
import { 
  TrendingUp,
  TrendingDown,
  CreditCard,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  DollarSign
} from 'lucide-react'

const financialStats = [
  { label: 'Total Revenue', value: '₹2,31,45,678', change: '+12.5%', positive: true },
  { label: 'Monthly Profit', value: '₹45,23,890', change: '+8.7%', positive: true },
  { label: 'Total Payouts', value: '₹1,87,34,567', change: '+15.2%', positive: true },
  { label: 'Net Profit Margin', value: '18.4%', change: '+2.3%', positive: true },
]

const revenueBreakdown = [
  { source: 'Main Bazaar', amount: 4523000, percentage: 28.5, change: '+12.3%', positive: true },
  { source: 'Rajdhani Day', amount: 3890000, percentage: 24.6, change: '+8.7%', positive: true },
  { source: 'Milan Games', amount: 2876000, percentage: 18.2, change: '+15.1%', positive: true },
  { source: 'Gali Disawar', amount: 1945000, percentage: 12.3, change: '-2.4%', positive: false },
  { source: 'Time Bazaar', amount: 1567000, percentage: 9.9, change: '+7.8%', positive: true },
  { source: 'Other Games', amount: 1067000, percentage: 6.5, change: '+3.2%', positive: true },
]

const monthlyTrends = [
  { month: 'Jan', revenue: 18450000, profit: 3298500, margin: 17.9 },
  { month: 'Feb', revenue: 19870000, profit: 3576600, margin: 18.0 },
  { month: 'Mar', revenue: 21230000, profit: 3821400, margin: 18.0 },
  { month: 'Apr', revenue: 20890000, profit: 3760200, margin: 18.0 },
  { month: 'May', revenue: 22450000, profit: 4041000, margin: 18.0 },
  { month: 'Jun', revenue: 23890000, profit: 4300200, margin: 18.0 },
]

const transactionTypes = [
  { type: 'Deposits', amount: 12890000, count: 45672, avgAmount: 282 },
  { type: 'Withdrawals', amount: 9876000, count: 23456, avgAmount: 421 },
  { type: 'Betting', amount: 23145000, count: 156789, avgAmount: 147 },
  { type: 'Winnings', amount: 18734000, count: 67890, avgAmount: 276 },
]

const paymentMethods = [
  { method: 'UPI', percentage: 45.2, amount: 10456000 },
  { method: 'Net Banking', percentage: 28.7, amount: 6634000 },
  { method: 'Credit/Debit Cards', percentage: 15.8, amount: 3654000 },
  { method: 'Digital Wallets', percentage: 10.3, amount: 2384000 },
]

export default function FinancialReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('month')
  const [reportType, setReportType] = useState('overview')

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Financial Reports</h1>
          <p className="text-gray-600">Revenue analysis, profit margins, and transaction history</p>
        </div>
        <div className="flex items-center space-x-4">
          <select 
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
          <select 
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="overview">Overview</option>
            <option value="detailed">Detailed</option>
            <option value="comparative">Comparative</option>
          </select>
          <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Financial Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {financialStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              </div>
              <div className={`flex items-center text-sm ${
                stat.positive ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.positive ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
                {stat.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Revenue by Source</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {revenueBreakdown.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center flex-1">
                    <div className="w-3 h-3 bg-indigo-500 rounded-full mr-3" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900">{item.source}</span>
                        <div className={`flex items-center text-sm ${
                          item.positive ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {item.positive ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                          {item.change}
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-sm text-gray-600">{formatCurrency(item.amount)}</span>
                        <span className="text-sm text-gray-500">{item.percentage}%</span>
                      </div>
                      <div className="mt-2 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-indigo-600 h-2 rounded-full" 
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Payment Methods</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {paymentMethods.map((method, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <CreditCard className="h-4 w-4 text-gray-400 mr-3" />
                    <span className="font-medium text-gray-900">{method.method}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">{method.percentage}%</div>
                    <div className="text-sm text-gray-600">{formatCurrency(method.amount)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Trends */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Monthly Financial Trends</h2>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm font-medium text-gray-500">
                  <th className="pb-4">Month</th>
                  <th className="pb-4">Revenue</th>
                  <th className="pb-4">Profit</th>
                  <th className="pb-4">Margin</th>
                  <th className="pb-4">Growth</th>
                </tr>
              </thead>
              <tbody>
                {monthlyTrends.map((trend, index) => {
                  const prevRevenue = index > 0 ? monthlyTrends[index - 1].revenue : trend.revenue
                  const growth = ((trend.revenue - prevRevenue) / prevRevenue * 100).toFixed(1)
                  const isPositive = parseFloat(growth) > 0
                  
                  return (
                    <tr key={index} className="border-t border-gray-100">
                      <td className="py-4 font-medium text-gray-900">{trend.month}</td>
                      <td className="py-4 text-gray-900">{formatCurrency(trend.revenue)}</td>
                      <td className="py-4 text-green-600 font-semibold">{formatCurrency(trend.profit)}</td>
                      <td className="py-4">
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                            <div 
                              className="bg-indigo-600 h-2 rounded-full" 
                              style={{ width: `${trend.margin}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-600">{trend.margin}%</span>
                        </div>
                      </td>
                      <td className="py-4">
                        {index > 0 && (
                          <div className={`flex items-center text-sm ${
                            isPositive ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {isPositive ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                            {isPositive ? '+' : ''}{growth}%
                          </div>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Transaction Overview */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Transaction Overview</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {transactionTypes.map((type, index) => (
              <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-3 ${
                  index === 0 ? 'bg-green-100 text-green-600' :
                  index === 1 ? 'bg-red-100 text-red-600' :
                  index === 2 ? 'bg-blue-100 text-blue-600' :
                  'bg-yellow-100 text-yellow-600'
                }`}>
                  {index === 0 && <ArrowUpRight className="h-6 w-6" />}
                  {index === 1 && <ArrowDownRight className="h-6 w-6" />}
                  {index === 2 && <DollarSign className="h-6 w-6" />}
                  {index === 3 && <Wallet className="h-6 w-6" />}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{type.type}</h3>
                <p className="text-2xl font-bold text-gray-900 mb-1">{formatCurrency(type.amount)}</p>
                <p className="text-sm text-gray-600">{type.count.toLocaleString()} transactions</p>
                <p className="text-xs text-gray-500">Avg: {formatCurrency(type.avgAmount)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Financial Summary */}
      <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-lg shadow text-white">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Financial Performance Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-green-100">Best Performing Game</p>
              <p className="text-xl font-semibold">Main Bazaar</p>
              <p className="text-sm text-green-200">₹45.2L revenue this month</p>
            </div>
            <div>
              <p className="text-green-100">Growth Rate</p>
              <p className="text-xl font-semibold">+12.5%</p>
              <p className="text-sm text-green-200">Monthly revenue growth</p>
            </div>
            <div>
              <p className="text-green-100">Profit Margin</p>
              <p className="text-xl font-semibold">18.4%</p>
              <p className="text-sm text-green-200">Above industry average</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
