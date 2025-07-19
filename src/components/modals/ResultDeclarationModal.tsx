'use client'

import { useState } from 'react'
import { XCircle, CheckCircle, AlertTriangle, Trophy, Clock, Target } from 'lucide-react'

interface ResultDeclarationModalProps {
  isOpen: boolean
  onClose: () => void
  gameName: string
  gameType: 'single' | 'jodi' | 'panna' | 'gali-disawar'
  onDeclareResult: (result: any) => void
}

export default function ResultDeclarationModal({
  isOpen,
  onClose,
  gameName,
  gameType,
  onDeclareResult
}: ResultDeclarationModalProps) {
  const [openNumber, setOpenNumber] = useState('')
  const [closeNumber, setCloseNumber] = useState('')
  const [pannaNumbers, setPannaNumbers] = useState(['', '', ''])
  const [isConfirming, setIsConfirming] = useState(false)

  const resetForm = () => {
    setOpenNumber('')
    setCloseNumber('')
    setPannaNumbers(['', '', ''])
    setIsConfirming(false)
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  const getJodi = () => {
    if (openNumber && closeNumber) {
      return openNumber + closeNumber
    }
    return ''
  }

  const canDeclareResult = () => {
    if (gameType === 'gali-disawar' || gameType === 'single') {
      return openNumber.length === 1 && /^[0-9]$/.test(openNumber)
    } else {
      return openNumber.length === 1 && closeNumber.length === 1 && 
             /^[0-9]$/.test(openNumber) && /^[0-9]$/.test(closeNumber)
    }
  }

  const handleDeclare = () => {
    if (!canDeclareResult()) return

    const result: any = {
      gameName,
      timestamp: new Date().toISOString()
    }

    if (gameType === 'gali-disawar' || gameType === 'single') {
      result.number = openNumber
    } else {
      result.open = openNumber
      result.close = closeNumber
      result.jodi = getJodi()
      
      if (gameType === 'panna') {
        result.panna = pannaNumbers.filter(p => p.length === 3)
      }
    }

    onDeclareResult(result)
    handleClose()
  }

  const handlePannaChange = (index: number, value: string) => {
    if (value.length <= 3 && /^[0-9]*$/.test(value)) {
      const newPanna = [...pannaNumbers]
      newPanna[index] = value
      setPannaNumbers(newPanna)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-900 flex items-center">
            <Trophy className="h-6 w-6 text-yellow-500 mr-2" />
            Declare Result
          </h3>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <XCircle className="h-6 w-6" />
          </button>
        </div>

        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
          <div className="flex items-center">
            <Target className="h-5 w-5 text-blue-600 mr-2" />
            <div>
              <p className="text-sm font-medium text-blue-900">{gameName}</p>
              <p className="text-xs text-blue-600">Type: {gameType}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {(gameType === 'gali-disawar' || gameType === 'single') ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Result Number (0-9)
              </label>
              <input
                type="text"
                maxLength={1}
                value={openNumber}
                onChange={(e) => {
                  if (/^[0-9]*$/.test(e.target.value)) {
                    setOpenNumber(e.target.value)
                  }
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-center text-3xl font-bold"
                placeholder="0"
              />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Open Number (0-9)
                  </label>
                  <input
                    type="text"
                    maxLength={1}
                    value={openNumber}
                    onChange={(e) => {
                      if (/^[0-9]*$/.test(e.target.value)) {
                        setOpenNumber(e.target.value)
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-center text-2xl font-bold"
                    placeholder="0"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Close Number (0-9)
                  </label>
                  <input
                    type="text"
                    maxLength={1}
                    value={closeNumber}
                    onChange={(e) => {
                      if (/^[0-9]*$/.test(e.target.value)) {
                        setCloseNumber(e.target.value)
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-center text-2xl font-bold"
                    placeholder="0"
                  />
                </div>
              </div>

              {gameType === 'panna' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Panna Numbers (Optional - 3 digits each)
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {pannaNumbers.map((panna, index) => (
                      <input
                        key={index}
                        type="text"
                        maxLength={3}
                        value={panna}
                        onChange={(e) => handlePannaChange(index, e.target.value)}
                        className="w-full px-2 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-center text-sm font-bold"
                        placeholder="123"
                      />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* Result Preview */}
          {canDeclareResult() && (
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <h4 className="text-sm font-medium text-green-800 mb-2 flex items-center">
                <CheckCircle className="h-4 w-4 mr-1" />
                Result Preview
              </h4>
              <div className="space-y-2">
                {gameType === 'gali-disawar' || gameType === 'single' ? (
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-600 mb-1">{openNumber}</div>
                    <p className="text-xs text-green-600">Result Number</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-green-600">{openNumber}</div>
                      <p className="text-xs text-green-600">Open</p>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">{closeNumber}</div>
                      <p className="text-xs text-green-600">Close</p>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-600">{getJodi()}</div>
                      <p className="text-xs text-purple-600">Jodi</p>
                    </div>
                  </div>
                )}

                {gameType === 'panna' && pannaNumbers.some(p => p.length === 3) && (
                  <div className="mt-3 pt-3 border-t border-green-200">
                    <p className="text-xs text-green-600 mb-1">Panna:</p>
                    <div className="flex justify-center space-x-2">
                      {pannaNumbers.filter(p => p.length === 3).map((panna, index) => (
                        <span key={index} className="text-sm font-bold text-yellow-600 bg-yellow-100 px-2 py-1 rounded">
                          {panna}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Warning */}
          <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-200">
            <div className="flex items-start">
              <AlertTriangle className="h-4 w-4 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-yellow-800">
                <p className="font-medium mb-1">Important:</p>
                <ul className="text-xs space-y-1">
                  <li>• Once declared, results cannot be easily modified</li>
                  <li>• All winning bets will be automatically calculated</li>
                  <li>• User balances will be updated immediately</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Time stamp */}
          <div className="text-center text-sm text-gray-500 flex items-center justify-center">
            <Clock className="h-4 w-4 mr-1" />
            Result will be declared at: {new Date().toLocaleString('en-IN')}
          </div>
        </div>

        <div className="flex space-x-4 mt-8">
          <button
            onClick={handleClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 font-medium"
          >
            Cancel
          </button>
          
          {!isConfirming ? (
            <button
              onClick={() => setIsConfirming(true)}
              disabled={!canDeclareResult()}
              className="flex-1 bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              Review Result
            </button>
          ) : (
            <button
              onClick={handleDeclare}
              className="flex-1 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 font-medium flex items-center justify-center"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Declare Result
            </button>
          )}
        </div>

        {isConfirming && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center">
              <AlertTriangle className="h-4 w-4 text-red-600 mr-2" />
              <p className="text-sm text-red-800 font-medium">
                Are you sure? This action cannot be undone.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
