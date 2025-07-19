'use client'

import AdminLayout from '@/components/AdminLayout'
import MilanDayManagement from '@/components/games/MilanDayManagement'

export default function MilanDayPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Milan Day Management</h1>
        </div>
        <MilanDayManagement />
      </div>
    </AdminLayout>
  )
}
