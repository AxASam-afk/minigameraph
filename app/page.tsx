'use client'

import { useState, useEffect } from 'react'
import GameClick from '@/components/GameClick'
import GameQuiz from '@/components/GameQuiz'
import GameChoice from '@/components/GameChoice'
import FinalInvitation from '@/components/FinalInvitation'
import { getGameProgress, saveGameProgress, getCurrentStep } from '@/lib/progress'

type GameStep = 'intro' | 'click' | 'quiz' | 'choice' | 'final'

const messages = [
  {
    step: 'intro',
    text: "Salut Raphaëlle ! ✨\n\nJ'ai préparé un petit truc pour toi...\n\nC'est parti ?",
  },
  {
    step: 'click',
    text: "Premier défi : clique sur le cœur le plus vite possible !\n\n(On va voir si tu es rapide 😏)",
  },
  {
    step: 'quiz',
    text: "Maintenant, un petit quiz...\n\n(Ne t'inquiète pas, c'est pas un examen !)",
  },
  {
    step: 'choice',
    text: "Dernier petit jeu avant la fin...\n\n(On y est presque !)",
  },
]

export default function Home() {
  const [step, setStep] = useState<GameStep>('intro')
  const [showMessage, setShowMessage] = useState(true)

  useEffect(() => {
    const savedStep = getCurrentStep()
    if (savedStep && savedStep !== 'intro') {
      setStep(savedStep as GameStep)
      setShowMessage(false)
    }
  }, [])

  const handleNext = () => {
    setShowMessage(true)
    const nextSteps: GameStep[] = ['intro', 'click', 'quiz', 'choice', 'final']
    const currentIndex = nextSteps.indexOf(step)
    if (currentIndex < nextSteps.length - 1) {
      const nextStep = nextSteps[currentIndex + 1]
      setStep(nextStep)
      saveGameProgress({ currentStep: nextStep })
    }
  }

  const handleMessageClose = () => {
    setShowMessage(false)
  }

  const currentMessage = messages.find(m => m.step === step) || messages[0]

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {showMessage && step !== 'final' && (
          <div className="mb-8 animate-fade-in">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8 border border-pink-200">
              <p className="text-lg md:text-xl text-gray-800 whitespace-pre-line text-center leading-relaxed">
                {currentMessage.text}
              </p>
              <button
                onClick={handleMessageClose}
                className="mt-6 w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold py-3 px-6 rounded-xl hover:from-pink-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                C'est parti !
              </button>
            </div>
          </div>
        )}

        {!showMessage && step === 'click' && (
          <GameClick onComplete={handleNext} />
        )}

        {!showMessage && step === 'quiz' && (
          <GameQuiz onComplete={handleNext} />
        )}

        {!showMessage && step === 'choice' && (
          <GameChoice onComplete={handleNext} />
        )}

        {step === 'final' && <FinalInvitation />}
      </div>
    </main>
  )
}

