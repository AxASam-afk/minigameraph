'use client'

import { useState } from 'react'
import { saveGameProgress } from '@/lib/progress'

interface GameChoiceProps {
  onComplete: () => void
}

const choices = [
  {
    title: "Un bon film",
    emoji: "🎬",
    description: "On se fait un ciné ?",
  },
  {
    title: "Un verre en terrasse",
    emoji: "🍷",
    description: "L'apéro, ça te dit ?",
  },
  {
    title: "Une balade",
    emoji: "🚶",
    description: "On prend l'air ?",
  },
  {
    title: "Un resto",
    emoji: "🍽️",
    description: "On se fait plaisir ?",
  },
]

export default function GameChoice({ onComplete }: GameChoiceProps) {
  const [selected, setSelected] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)

  const handleChoice = (index: number) => {
    setSelected(index)
    saveGameProgress({ choiceAnswer: choices[index].title })
    setTimeout(() => {
      setShowResult(true)
    }, 500)
  }

  if (showResult && selected !== null) {
    return (
      <div className="w-full">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8 border border-pink-200">
          <div className="text-center animate-fade-in">
            <p className="text-6xl mb-4">{choices[selected].emoji}</p>
            <p className="text-2xl font-bold text-gray-800 mb-2">
              {choices[selected].title}
            </p>
            <p className="text-lg text-gray-600 mb-6">
              {choices[selected].description}
            </p>
            <p className="text-gray-700 mb-6">
              Bon choix ! On note ça quelque part... 😉
            </p>
            <button
              onClick={onComplete}
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold py-3 px-8 rounded-xl hover:from-pink-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Dernière étape
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8 border border-pink-200">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-gray-800">
          Choisis ce qui te fait envie
        </h2>
        <p className="text-center text-gray-600 mb-8">
          (Juste pour voir tes goûts... 😏)
        </p>
        <div className="grid grid-cols-2 gap-4">
          {choices.map((choice, index) => (
            <button
              key={index}
              onClick={() => handleChoice(index)}
              className={`bg-gradient-to-br from-pink-50 to-purple-50 hover:from-pink-100 hover:to-purple-100 border-2 rounded-xl p-6 transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                selected === index
                  ? 'border-pink-500 scale-105 shadow-lg'
                  : 'border-pink-200'
              }`}
            >
              <p className="text-4xl mb-2">{choice.emoji}</p>
              <p className="font-semibold text-gray-800">{choice.title}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

