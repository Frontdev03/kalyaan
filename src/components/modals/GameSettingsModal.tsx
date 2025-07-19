'use client'

import { useState } from 'react'
import { XCircle, CheckCircle, Save, RefreshCw, AlertTriangle } from 'lucide-react'
import { GameSettings } from '@/types'

interface GameSettingsModalProps {
  isOpen: boolean
  onClose: () => void
  gameSettings: GameSettings
  onSave: (settings: GameSettings) => void
  gameName: string
}

export default function GameSettingsModal({
  isOpen,
  onClose,
  gameSettings,
  onSave,
  gameName
}: GameSettingsModalProps) {
  const [settings, setSettings] = useState(gameSettings)
  const [hasChanges, setHasChanges] = useState(false)

  const handleChange = (field: keyof GameSettings, value: any) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }))
    setHasChanges(true)
  }

  const handleSave = () => {
    onSave(settings)
    setHasChanges(false)
    onClose()
  }

  const handleReset = () => {
    setSettings(gameSettings)
    setHasChanges(false)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-900">Game Settings - {gameName}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <XCircle className="h-6 w-6" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Betting Rates */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900 border-b pb-2">Betting Rates</h4>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Single Rate (Multiplier)
              </label>
              <input
                type="number"
                value={settings.singleRate}
                onChange={(e) => handleChange('singleRate', parseFloat(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                step="0.1"
                min="1"
                max="20"
              />
              <p className="text-xs text-gray-500 mt-1">Current rate: {settings.singleRate}x</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Jodi Rate (Multiplier)
              </label>
              <input
                type="number"
                value={settings.jodiRate}
                onChange={(e) => handleChange('jodiRate', parseFloat(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                step="1"
                min="1"
                max="100"
              />
              <p className="text-xs text-gray-500 mt-1">Current rate: {settings.jodiRate}x</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Panna Rate (Multiplier)
              </label>
              <input
                type="number"
                value={settings.pannaRate}
                onChange={(e) => handleChange('pannaRate', parseFloat(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                step="1"
                min="100"
                max="2000"
              />
              <p className="text-xs text-gray-500 mt-1">Current rate: {settings.pannaRate}x</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Half Sangam Rate (Multiplier)
              </label>
              <input
                type="number"
                value={settings.halfSangamRate}
                onChange={(e) => handleChange('halfSangamRate', parseFloat(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                step="1"
                min="1000"
                max="5000"
              />
              <p className="text-xs text-gray-500 mt-1">Current rate: {settings.halfSangamRate}x</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Sangam Rate (Multiplier)
              </label>
              <input
                type="number"
                value={settings.fullSangamRate}
                onChange={(e) => handleChange('fullSangamRate', parseFloat(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                step="1"
                min="5000"
                max="20000"
              />
              <p className="text-xs text-gray-500 mt-1">Current rate: {settings.fullSangamRate}x</p>
            </div>
          </div>

          {/* Betting Limits & Controls */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900 border-b pb-2">Betting Limits & Controls</h4>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Minimum Bet Amount (₹)
              </label>
              <input
                type="number"
                value={settings.minBetAmount}
                onChange={(e) => handleChange('minBetAmount', parseFloat(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                step="1"
                min="1"
                max="100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Maximum Bet Amount (₹)
              </label>
              <input
                type="number"
                value={settings.maxBetAmount}
                onChange={(e) => handleChange('maxBetAmount', parseFloat(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                step="100"
                min="100"
                max="100000"
              />
            </div>

            <div className="space-y-4 pt-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.isActive}
                  onChange={(e) => handleChange('isActive', e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-3 text-sm font-medium text-gray-700">Game Active</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.allowOfflineResult}
                  onChange={(e) => handleChange('allowOfflineResult', e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-3 text-sm font-medium text-gray-700">Allow Offline Result Declaration</span>
              </label>
            </div>

            {/* Rate Calculation Preview */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h5 className="font-semibold text-blue-900 mb-2">Rate Preview</h5>
              <div className="text-sm text-blue-800 space-y-1">
                <p>₹10 Single Bet → Win: ₹{(10 * settings.singleRate).toFixed(0)}</p>
                <p>₹10 Jodi Bet → Win: ₹{(10 * settings.jodiRate).toFixed(0)}</p>
                <p>₹10 Panna Bet → Win: ₹{(10 * settings.pannaRate).toFixed(0)}</p>
              </div>
            </div>

            {hasChanges && (
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center">
                  <AlertTriangle className="h-4 w-4 text-yellow-600 mr-2" />
                  <p className="text-sm text-yellow-800">You have unsaved changes</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={handleReset}
            disabled={!hasChanges}
            className="flex items-center px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset Changes
          </button>
          
          <div className="flex space-x-4">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={!hasChanges}
              className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
