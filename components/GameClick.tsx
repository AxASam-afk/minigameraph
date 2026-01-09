'use client'

import { useState, useEffect } from 'react'
import { saveGameProgress } from '@/lib/progress'

interface GameClickProps {
  onComplete: () => void
}

export default function GameClick({ onComplete }: GameClickProps) {
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(10)
  const [isActive, setIsActive] = useState(false)
  const [position, setPosition] = useState({ x: 50, y: 50 })
  const [showResult, setShowResult] = useState(false)

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false)
      setShowResult(true)
      saveGameProgress({ clickScore: score })
    }
  }, [isActive, timeLeft, score])

  const handleStart = () => {
    setIsActive(true)
    setTimeLeft(10)
    setScore(0)
    setShowResult(false)
  }

  const handleClick = () => {
    if (isActive) {
      setScore(score + 1)
      const newX = Math.random() * 80 + 10
      const newY = Math.random() * 70 + 15
      setPosition({ x: newX, y: newY })
    }
  }

  const getMessage = () => {
    if (score >= 30) return "Wow, tu es vraiment rapide ! 🔥"
    if (score >= 20) return "Pas mal du tout ! 😊"
    if (score >= 10) return "Bien joué ! 👍"
    return "Tu peux faire mieux ! 😉"
  }

  return (
    <div className="w-full">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8 border border-pink-200">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-gray-800">
          Clique sur le cœur !
        </h2>

        {!isActive && !showResult && (
          <div className="text-center">
            <p className="text-gray-600 mb-6">
              Tu as 10 secondes pour cliquer le plus de fois possible sur le cœur.
            </p>
            <button
              onClick={handleStart}
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold py-3 px-8 rounded-xl hover:from-pink-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Commencer
            </button>
          </div>
        )}

        {isActive && (
          <div className="relative h-64 md:h-96 bg-gradient-to-br from-pink-100 to-purple-100 rounded-xl overflow-hidden">
            <div
              className="absolute cursor-pointer transition-all duration-200 hover:scale-110"
              style={{
                left: `${position.x}%`,
                top: `${position.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
              onClick={handleClick}
            >
              <span className="text-6xl md:text-8xl animate-bounce-slow">❤️</span>
            </div>
            <div className="absolute top-4 left-4 bg-white/80 rounded-lg px-4 py-2">
              <p className="text-2xl font-bold text-pink-600">Score: {score}</p>
            </div>
            <div className="absolute top-4 right-4 bg-white/80 rounded-lg px-4 py-2">
              <p className="text-xl font-semibold text-purple-600">{timeLeft}s</p>
            </div>
          </div>
        )}

        {showResult && (
          <div className="text-center animate-fade-in">
            <p className="text-3xl font-bold text-pink-600 mb-4">
              Score final : {score}
            </p>
            <p className="text-xl text-gray-700 mb-6">{getMessage()}</p>
            <button
              onClick={onComplete}
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold py-3 px-8 rounded-xl hover:from-pink-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Continuer
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

