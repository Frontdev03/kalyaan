'use client'

import { useState } from 'react'
import { 
  Users, 
  TrendingUp, 
  Settings, 
  FileText, 
  Bell, 
  Search, 
  Menu,
  X,
  Home,
  GamepadIcon,
  CreditCard,
  BarChart3,
  Shield,
  LogOut,
  Clock,
  Trophy,
  Calculator,
  Calendar,
  Target,
  Dice6,
  CircleDollarSign,
  Activity
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Users', href: '/users', icon: Users },
  { 
    name: 'Games', 
    icon: GamepadIcon,
    subItems: [
      { name: 'All Games', href: '/games', icon: GamepadIcon },
      { name: 'Main Bazaar', href: '/games/main-bazaar', icon: Target },
      { name: 'Milan Day', href: '/games/milan-day', icon: Clock },
      { name: 'Milan Night', href: '/games/milan-night', icon: Clock },
      { name: 'Rajdhani Day', href: '/games/rajdhani-day', icon: Trophy },
      { name: 'Rajdhani Night', href: '/games/rajdhani-night', icon: Trophy },
      { name: 'Gali Disawar', href: '/games/gali-disawar', icon: Dice6 },
      { name: 'Time Bazaar', href: '/games/time-bazaar', icon: Calendar },
      { name: 'SriGanesh', href: '/games/sriganesh', icon: Calculator },
      { name: 'Faridabad', href: '/games/faridabad', icon: Activity },
      { name: 'Ghaziabad', href: '/games/ghaziabad', icon: Activity }
    ]
  },
  { name: 'Bets', href: '/bets', icon: TrendingUp },
  { name: 'Transactions', href: '/transactions', icon: CreditCard },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { 
    name: 'Reports', 
    icon: FileText,
    subItems: [
      { name: 'Daily Reports', href: '/reports/daily', icon: Calendar },
      { name: 'Game Reports', href: '/reports/games', icon: GamepadIcon },
      { name: 'User Reports', href: '/reports/users', icon: Users },
      { name: 'Financial Reports', href: '/reports/financial', icon: CircleDollarSign }
    ]
  },
  { name: 'Settings', href: '/settings', icon: Settings },
]

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <div className={cn(
        "fixed inset-0 flex z-40 md:hidden",
        sidebarOpen ? "block" : "hidden"
      )}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-6 w-6 text-white" />
            </button>
          </div>
          <SidebarContent />
        </div>
      </div>

      {/* Static sidebar for desktop */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white">
          <SidebarContent />
        </div>
      </div>

      {/* Main content */}
      <div className="md:pl-64 flex flex-col flex-1">
        <div className="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-gray-50">
          <button
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Header */}
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center">
                <h1 className="text-3xl font-bold text-gray-900">
                  Kalyan Live Admin
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                <button className="p-2 text-gray-400 hover:text-gray-500">
                  <Search className="h-5 w-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-500">
                  <Bell className="h-5 w-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-500">
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

function SidebarContent() {
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const toggleExpanded = (itemName: string) => {
    setExpandedItems(prev => 
      prev.includes(itemName) 
        ? prev.filter(name => name !== itemName)
        : [...prev, itemName]
    )
  }

  return (
    <div className="flex flex-col flex-1">
      <div className="flex items-center h-16 flex-shrink-0 px-4 bg-indigo-600">
        <Shield className="h-8 w-8 text-white" />
        <span className="ml-2 text-white font-bold text-lg">Admin Panel</span>
      </div>
      <div className="flex-1 flex flex-col overflow-y-auto">
        <nav className="flex-1 px-2 py-4 bg-white space-y-1">
          {navigation.map((item) => {
            const hasSubItems = 'subItems' in item
            const isExpanded = expandedItems.includes(item.name)
            
            if (hasSubItems) {
              return (
                <div key={item.name}>
                  <button
                    onClick={() => toggleExpanded(item.name)}
                    className="w-full group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  >
                    <item.icon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                    {item.name}
                    <svg
                      className={cn(
                        "ml-auto h-4 w-4 transition-transform",
                        isExpanded ? "rotate-90" : "rotate-0"
                      )}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  {isExpanded && (
                    <div className="ml-6 mt-1 space-y-1">
                      {item.subItems?.map((subItem) => {
                        const isActive = pathname === subItem.href
                        return (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className={cn(
                              isActive
                                ? 'bg-indigo-100 text-indigo-700'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                              'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                            )}
                          >
                            <subItem.icon
                              className={cn(
                                isActive ? 'text-indigo-500' : 'text-gray-400 group-hover:text-gray-500',
                                'mr-3 h-4 w-4'
                              )}
                            />
                            {subItem.name}
                          </Link>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            } else {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href!}
                  className={cn(
                    isActive
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                    'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                  )}
                >
                  <item.icon
                    className={cn(
                      isActive ? 'text-indigo-500' : 'text-gray-400 group-hover:text-gray-500',
                      'mr-3 h-5 w-5'
                    )}
                  />
                  {item.name}
                </Link>
              )
            }
          })}
        </nav>
      </div>
    </div>
  )
}
