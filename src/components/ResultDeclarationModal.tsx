'use client'

import { useState } from 'react'
import { X, Trophy, AlertTriangle, CheckCircle, Calculator } from 'lucide-react'
import { Game } from '@/types'

interface ResultDeclarationModalProps {
  game: Game
  onClose: () => void
  onDeclareResult: (result: { open: string; close?: string; jodi?: string }) => void
}

export default function ResultDeclarationModal({ game, onClose, onDeclareResult }: ResultDeclarationModalProps) {
  const [openAnk, setOpenAnk] = useState('')
  const [closeAnk, setCloseAnk] = useState('')
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [errors, setErrors] = useState<string[]>([])

  const validateInputs = () => {
    const newErrors: string[] = []

    // For single digit games (Gali Disawar), only open ank is needed
    if (game.type === 'single') {
      if (!openAnk || openAnk.length !== 1 || !/^\d$/.test(openAnk)) {
        newErrors.push('Open ank must be a single digit (0-9)')
      }
    } else {
      // For jodi/panna games, both open and close ank are needed
      if (!openAnk || openAnk.length !== 1 || !/^\d$/.test(openAnk)) {
        newErrors.push('Open ank must be a single digit (0-9)')
      }
      if (!closeAnk || closeAnk.length !== 1 || !/^\d$/.test(closeAnk)) {
        newErrors.push('Close ank must be a single digit (0-9)')
      }
    }

    setErrors(newErrors)
    return newErrors.length === 0
  }

  const calculateJodi = (open: string, close: string) => {
    return open + close
  }

  const handleSubmit = () => {
    if (validateInputs()) {
      setShowConfirmation(true)
    }
  }

  const confirmResult = () => {
    const result = {
      open: openAnk,
      close: game.type !== 'single' ? closeAnk : undefined,
      jodi: game.type !== 'single' ? calculateJodi(openAnk, closeAnk) : undefined
    }

    onDeclareResult(result)
  }

  const resetForm = () => {
    setOpenAnk('')
    setCloseAnk('')
    setShowConfirmation(false)
    setErrors([])
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4">
        {!showConfirmation ? (
          <>
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <Trophy className="h-6 w-6 text-yellow-600" />
                <h2 className="text-xl font-bold text-gray-900">Declare Result</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Game Info */}
            <div className="px-6 py-4 bg-blue-50 border-b border-blue-100">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-600">Game:</span>
                  <p className="font-bold text-blue-900">{game.name}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Type:</span>
                  <p className="font-bold text-blue-900 capitalize">{game.type}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Close Time:</span>
                  <p className="font-bold text-blue-900">{game.closeTime}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Result Time:</span>
                  <p className="font-bold text-blue-900">{game.resultTime}</p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Error Display */}
              {errors.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5 mr-3" />
                    <div>
                      <h4 className="text-sm font-medium text-red-800">Please fix the following errors:</h4>
                      <ul className="mt-2 text-sm text-red-700 list-disc list-inside">
                        {errors.map((error, index) => (
                          <li key={index}>{error}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Input Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Open Ank *
                  </label>
                  <input
                    type="text"
                    maxLength={1}
                    value={openAnk}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, '')
                      setOpenAnk(value)
                    }}
                    className="w-full px-4 py-3 text-center text-2xl font-bold border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                    placeholder="0"
                  />
                  <p className="mt-1 text-xs text-gray-500">Enter single digit (0-9)</p>
                </div>

                {game.type !== 'single' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Close Ank *
                    </label>
                    <input
                      type="text"
                      maxLength={1}
                      value={closeAnk}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^0-9]/g, '')
                        setCloseAnk(value)
                      }}
                      className="w-full px-4 py-3 text-center text-2xl font-bold border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                      placeholder="0"
                    />
                    <p className="mt-1 text-xs text-gray-500">Enter single digit (0-9)</p>
                  </div>
                )}
              </div>

              {/* Preview Section */}
              {openAnk && (game.type === 'single' || closeAnk) && (
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Calculator className="h-5 w-5 text-green-600 mr-2" />
                    Result Preview
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                      <div className="text-3xl font-bold text-blue-600 mb-2">{openAnk}</div>
                      <p className="text-sm font-medium text-gray-700">Open Ank</p>
                    </div>
                    
                    {game.type !== 'single' && (
                      <>
                        <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                          <div className="text-3xl font-bold text-green-600 mb-2">{closeAnk}</div>
                          <p className="text-sm font-medium text-gray-700">Close Ank</p>
                        </div>
                        
                        <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                          <div className="text-3xl font-bold text-purple-600 mb-2">{calculateJodi(openAnk, closeAnk)}</div>
                          <p className="text-sm font-medium text-gray-700">Jodi</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Instructions */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-800 mb-2">Instructions:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  {game.type === 'single' ? (
                    <li>• Enter only the Open Ank (single digit 0-9) for this game</li>
                  ) : (
                    <>
                      <li>• Enter both Open and Close Ank (single digits 0-9 each)</li>
                      <li>• Jodi will be automatically calculated from Open + Close</li>
                    </>
                  )}
                  <li>• Double-check the numbers before declaring the result</li>
                  <li>• This action cannot be undone once confirmed</li>
                </ul>
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
                onClick={handleSubmit}
                disabled={!openAnk || (game.type !== 'single' && !closeAnk)}
                className="px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 disabled:bg-gray-300 disabled:cursor-not-allowed font-medium"
              >
                Preview Result
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Confirmation Screen */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-6 w-6 text-green-600" />
                <h2 className="text-xl font-bold text-gray-900">Confirm Result Declaration</h2>
              </div>
              <button
                onClick={() => setShowConfirmation(false)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 mr-3" />
                  <div>
                    <h4 className="text-sm font-medium text-yellow-800">Final Confirmation Required</h4>
                    <p className="mt-1 text-sm text-yellow-700">
                      You are about to declare the result for <strong>{game.name}</strong>. 
                      This action will immediately affect all pending bets and cannot be reversed.
                    </p>
                  </div>
                </div>
              </div>

              {/* Final Result Display */}
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Final Result</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-6 bg-white rounded-lg shadow-md border-2 border-blue-200">
                    <div className="text-4xl font-bold text-blue-600 mb-2">{openAnk}</div>
                    <p className="text-sm font-medium text-gray-700">Open Ank</p>
                  </div>
                  
                  {game.type !== 'single' && (
                    <>
                      <div className="text-center p-6 bg-white rounded-lg shadow-md border-2 border-green-200">
                        <div className="text-4xl font-bold text-green-600 mb-2">{closeAnk}</div>
                        <p className="text-sm font-medium text-gray-700">Close Ank</p>
                      </div>
                      
                      <div className="text-center p-6 bg-white rounded-lg shadow-md border-2 border-purple-200">
                        <div className="text-4xl font-bold text-purple-600 mb-2">{calculateJodi(openAnk, closeAnk)}</div>
                        <p className="text-sm font-medium text-gray-700">Jodi</p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="text-center text-sm text-gray-600">
                <p>Game: <strong>{game.name}</strong></p>
                <p>Declaration Time: <strong>{new Date().toLocaleString()}</strong></p>
              </div>
            </div>

            {/* Confirmation Footer */}
            <div className="flex justify-end space-x-4 p-6 border-t border-gray-200 bg-gray-50">
              <button
                onClick={resetForm}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
              >
                Go Back
              </button>
              <button
                onClick={confirmResult}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
              >
                Confirm & Declare Result
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
