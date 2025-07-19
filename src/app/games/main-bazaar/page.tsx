'use client'

import AdminLayout from '@/components/AdminLayout'
import MainBazaarManagement from '@/components/games/MainBazaarManagement'

export default function MainBazaarPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Main Bazaar Management</h1>
        </div>
        <MainBazaarManagement />
      </div>
    </AdminLayout>
  )
}
