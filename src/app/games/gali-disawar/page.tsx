'use client'

import AdminLayout from '@/components/AdminLayout'
import GaliDisawarManagement from '@/components/games/GaliDisawarManagement'

export default function GaliDisawarPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Gali Disawar Management</h1>
        </div>
        <GaliDisawarManagement />
      </div>
    </AdminLayout>
  )
}
