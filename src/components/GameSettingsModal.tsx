'use client'

import { useState } from 'react'
import { X, Settings, DollarSign, Calculator, AlertCircle } from 'lucide-react'
import { Game, GameSettings } from '@/types'

interface GameSettingsModalProps {
  game: Game
  onClose: () => void
  onSave: (settings: GameSettings) => void
}

export default function GameSettingsModal({ game, onClose, onSave }: GameSettingsModalProps) {
  const [settings, setSettings] = useState<GameSettings>(game.settings)
  const [previewAmount, setPreviewAmount] = useState(100)

  const handleSave = () => {
    onSave(settings)
  }

  const calculatePayout = (betType: string, amount: number) => {
    switch (betType) {
      case 'single':
        return amount * settings.singleRate
      case 'jodi':
        return amount * settings.jodiRate
      case 'panna':
        return amount * settings.pannaRate
      case 'half-sangam':
        return amount * settings.halfSangamRate
      case 'full-sangam':
        return amount * settings.fullSangamRate
      default:
        return amount
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Settings className="h-6 w-6 text-indigo-600" />
            <h2 className="text-xl font-bold text-gray-900">Game Settings - {game.name}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Betting Rates Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Calculator className="h-5 w-5 text-blue-600 mr-2" />
                Betting Rates
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Single Rate (x)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={settings.singleRate}
                    onChange={(e) => setSettings(prev => ({ ...prev, singleRate: parseFloat(e.target.value) }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Jodi Rate (x)
                  </label>
                  <input
                    type="number"
                    step="1"
                    value={settings.jodiRate}
                    onChange={(e) => setSettings(prev => ({ ...prev, jodiRate: parseInt(e.target.value) }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Single Panna Rate (x)
                  </label>
                  <input
                    type="number"
                    step="1"
                    value={settings.pannaRate}
                    onChange={(e) => setSettings(prev => ({ ...prev, pannaRate: parseInt(e.target.value) }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Half Sangam Rate (x)
                  </label>
                  <input
                    type="number"
                    step="1"
                    value={settings.halfSangamRate}
                    onChange={(e) => setSettings(prev => ({ ...prev, halfSangamRate: parseInt(e.target.value) }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Sangam Rate (x)
                  </label>
                  <input
                    type="number"
                    step="1"
                    value={settings.fullSangamRate}
                    onChange={(e) => setSettings(prev => ({ ...prev, fullSangamRate: parseInt(e.target.value) }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Betting Limits Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <DollarSign className="h-5 w-5 text-green-600 mr-2" />
                Betting Limits
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum Bet Amount (₹)
                  </label>
                  <input
                    type="number"
                    value={settings.minBetAmount}
                    onChange={(e) => setSettings(prev => ({ ...prev, minBetAmount: parseInt(e.target.value) }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Maximum Bet Amount (₹)
                  </label>
                  <input
                    type="number"
                    value={settings.maxBetAmount}
                    onChange={(e) => setSettings(prev => ({ ...prev, maxBetAmount: parseInt(e.target.value) }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Game Controls */}
                <div className="pt-4 border-t border-gray-200">
                  <h4 className="text-md font-medium text-gray-900 mb-4">Game Controls</h4>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={settings.isActive}
                        onChange={(e) => setSettings(prev => ({ ...prev, isActive: e.target.checked }))}
                        className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      />
                      <span className="ml-2 text-sm text-gray-700">Game is Active</span>
                    </label>

                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={settings.allowOfflineResult}
                        onChange={(e) => setSettings(prev => ({ ...prev, allowOfflineResult: e.target.checked }))}
                        className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      />
                      <span className="ml-2 text-sm text-gray-700">Allow Offline Result Declaration</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Rate Preview Section */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Rate Preview Calculator</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preview Amount (₹)
                </label>
                <input
                  type="number"
                  value={previewAmount}
                  onChange={(e) => setPreviewAmount(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="font-medium text-gray-700">Single:</div>
                  <div className="text-blue-600 font-bold">₹{calculatePayout('single', previewAmount)}</div>
                  
                  <div className="font-medium text-gray-700">Jodi:</div>
                  <div className="text-green-600 font-bold">₹{calculatePayout('jodi', previewAmount)}</div>
                  
                  <div className="font-medium text-gray-700">Panna:</div>
                  <div className="text-purple-600 font-bold">₹{calculatePayout('panna', previewAmount)}</div>
                  
                  <div className="font-medium text-gray-700">Half Sangam:</div>
                  <div className="text-orange-600 font-bold">₹{calculatePayout('half-sangam', previewAmount)}</div>
                  
                  <div className="font-medium text-gray-700">Full Sangam:</div>
                  <div className="text-red-600 font-bold">₹{calculatePayout('full-sangam', previewAmount)}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Warning Section */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 mr-3" />
              <div>
                <h4 className="text-sm font-medium text-yellow-800">Important Notes:</h4>
                <ul className="mt-2 text-sm text-yellow-700 list-disc list-inside space-y-1">
                  <li>Changes will affect all new bets placed after saving</li>
                  <li>Existing bets will use their original rates</li>
                  <li>Higher rates increase player winnings but reduce profit margins</li>
                  <li>Always verify rates before saving changes</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end space-x-4 p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  )
}
