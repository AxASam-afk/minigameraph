import { useState } from 'react'

const questions = [
  {
    question: "Quel est le meilleur moment pour boire un café ?",
    options: [
      "Le matin au réveil",
      "L'après-midi pour la pause",
      "Le soir (pour les courageux)",
      "Tout le temps, évidemment !",
    ],
  },
  {
    question: "Si tu devais choisir une activité pour un dimanche après-midi...",
    options: [
      "Se balader en ville",
      "Regarder une série sous la couette",
      "Aller au cinéma",
      "Faire un brunch entre amis",
    ],
  },
  {
    question: "Quelle est ta réaction face à un chat mignon ?",
    options: [
      "Le prendre dans tes bras immédiatement",
      "Lui faire des photos",
      "Essayer de le caresser discrètement",
      "Tout ça à la fois",
    ],
  },
]

function QuizScreen({ onNext, className = '' }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState([])
  const [showResult, setShowResult] = useState(false)
  const [showIntro, setShowIntro] = useState(true)

  const handleAnswer = (answerIndex) => {
    const newAnswers = [...answers, answerIndex]
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1)
      }, 800)
    } else {
      setTimeout(() => {
        setShowResult(true)
      }, 800)
    }
  }

  const getResultMessage = () => {
    return "C'était juste pour rigoler de toute façon ! 😄"
  }

  if (showIntro) {
    return (
      <div className={`bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8 border border-pink-200 ${className}`}>
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
            Un petit quiz
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            Maintenant, quelques questions...
          </p>
          <p className="text-base text-gray-600 mb-8">
            (Ne t'inquiète pas, c'est pas un examen !)
          </p>
          <button
            onClick={() => setShowIntro(false)}
            className="bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold py-3 px-8 rounded-xl hover:from-pink-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            C'est parti !
          </button>
        </div>
      </div>
    )
  }

  if (showResult) {
    return (
      <div className={`bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8 border border-pink-200 ${className}`}>
        <div className="text-center fade-in">
          <p className="text-3xl mb-4">✨</p>
          <p className="text-2xl font-bold text-gray-800 mb-6">
            {getResultMessage()}
          </p>
          <button
            onClick={() => onNext(answers)}
            className="bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold py-3 px-8 rounded-xl hover:from-pink-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Continuer
          </button>
        </div>
      </div>
    )
  }

  const question = questions[currentQuestion]

  return (
    <div className={`bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8 border border-pink-200 ${className}`}>
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
  )
}

export default QuizScreen

