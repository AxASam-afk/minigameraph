'use client'

import { useState } from 'react'
import { saveGameProgress } from '@/lib/progress'

interface GameQuizProps {
  onComplete: () => void
}

const questions = [
  {
    question: "Quel est le meilleur moment pour boire un café ?",
    options: [
      "Le matin au réveil",
      "L'après-midi pour la pause",
      "Le soir (pour les courageux)",
      "Tout le temps, évidemment !",
    ],
    correct: 3,
  },
  {
    question: "Si tu devais choisir une activité pour un dimanche après-midi...",
    options: [
      "Se balader en ville",
      "Regarder une série sous la couette",
      "Aller au cinéma",
      "Faire un brunch entre amis",
    ],
    correct: 1,
  },
  {
    question: "Quelle est ta réaction face à un chat mignon ?",
    options: [
      "Le prendre dans tes bras immédiatement",
      "Lui faire des photos",
      "Essayer de le caresser discrètement",
      "Tout ça à la fois",
    ],
    correct: 3,
  },
]

export default function GameQuiz({ onComplete }: GameQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [showResult, setShowResult] = useState(false)

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers, answerIndex]
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1)
      }, 800)
    } else {
      setTimeout(() => {
        setShowResult(true)
        saveGameProgress({ quizAnswers: newAnswers })
      }, 800)
    }
  }

  const getResultMessage = () => {
    const correctCount = answers.filter(
      (answer, index) => answer === questions[index].correct
    ).length

    if (correctCount === questions.length) {
      return "Parfait ! Tu as tout bon ! 🎉"
    }
    if (correctCount >= questions.length / 2) {
      return "Pas mal ! Tu t'en sors bien ! 😊"
    }
    return "C'était juste pour rigoler de toute façon ! 😄"
  }

  if (showResult) {
    return (
      <div className="w-full">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8 border border-pink-200">
          <div className="text-center animate-fade-in">
            <p className="text-3xl mb-4">✨</p>
            <p className="text-2xl font-bold text-gray-800 mb-6">
              {getResultMessage()}
            </p>
            <button
              onClick={onComplete}
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold py-3 px-8 rounded-xl hover:from-pink-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Continuer
            </button>
          </div>
        </div>
      </div>
    )
  }

  const question = questions[currentQuestion]

  return (
    <div className="w-full">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8 border border-pink-200">
        <div className="mb-4">
          <p className="text-sm text-gray-500 text-center">
            Question {currentQuestion + 1} / {questions.length}
          </p>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-800">
          {question.question}
        </h2>
        <div className="space-y-4">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              className="w-full bg-gradient-to-r from-pink-50 to-purple-50 hover:from-pink-100 hover:to-purple-100 border-2 border-pink-200 rounded-xl p-4 text-left transition-all duration-300 transform hover:scale-105 hover:shadow-md"
            >
              <p className="text-lg text-gray-800">{option}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

