import { useState, useEffect } from 'react'
import HeartParticles from '../components/HeartParticles'

function ClickGameScreen({ onNext, className = '' }) {
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(10)
  const [isActive, setIsActive] = useState(false)
  const [position, setPosition] = useState({ x: 50, y: 50 })
  const [showResult, setShowResult] = useState(false)
  const [showIntro, setShowIntro] = useState(true)
  const [particleTrigger, setParticleTrigger] = useState(0)
  const [clickPosition, setClickPosition] = useState(null)

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false)
      setShowResult(true)
    }
  }, [isActive, timeLeft])

  const handleStart = () => {
    setShowIntro(false)
    setIsActive(true)
    setTimeLeft(10)
    setScore(0)
    setShowResult(false)
  }

  const handleClick = (e) => {
    if (isActive) {
      setScore(score + 1)
      const newX = Math.random() * 80 + 10
      const newY = Math.random() * 70 + 15
      setPosition({ x: newX, y: newY })
      
      // Déclencher l'effet de particules à la position du clic
      if (e && e.currentTarget) {
        const rect = e.currentTarget.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width) * 100
        const y = ((e.clientY - rect.top) / rect.height) * 100
        setClickPosition({ x, y })
        setParticleTrigger(prev => prev + 1)
      }
    }
  }

  const getMessage = () => {
    if (score >= 30) return "Wow, tu es vraiment rapide ! 🔥\n\n(J'adore quand tu es motivée comme ça 😏)"
    if (score >= 20) return "Pas mal du tout ! 😊\n\n(Tu as de la réactivité, j'aime bien ça)"
    if (score >= 10) return "Bien joué ! 👍\n\n(On sent que tu es là, c'est cool)"
    return "Tu peux faire mieux ! 😉\n\n(Allez, montre-moi ce dont tu es capable)"
  }

  if (showIntro) {
    return (
      <div className={`bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8 border border-pink-200 ${className}`}>
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
            Premier défi
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            Clique sur le cœur le plus vite possible !
          </p>
          <p className="text-base text-gray-600 mb-2">
            (On va voir si tu es rapide... et si tu es motivée 😏)
          </p>
          <p className="text-sm text-gray-500 mb-8 italic">
            Plus tu cliques, plus je suis content... c'est simple non ? 😉
          </p>
          <button
            onClick={handleStart}
            className="bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold py-3 px-8 rounded-xl hover:from-pink-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Commencer
          </button>
        </div>
      </div>
    )
  }

  if (showResult) {
    return (
      <div className={`bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8 border border-pink-200 ${className}`}>
        <div className="text-center fade-in">
          <p className="text-3xl font-bold text-pink-600 mb-4">
            Score final : {score}
          </p>
          <p className="text-xl text-gray-700 mb-6 whitespace-pre-line">{getMessage()}</p>
          <button
            onClick={() => onNext(score)}
            className="bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold py-3 px-8 rounded-xl hover:from-pink-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Continuer
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={`bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8 border border-pink-200 ${className}`}>
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-gray-800">
        Clique sur le cœur !
      </h2>
      <div className="relative h-64 md:h-96 bg-gradient-to-br from-pink-100 to-purple-100 rounded-xl overflow-hidden">
        <HeartParticles trigger={particleTrigger} position={clickPosition} />
        <div
          className="absolute cursor-pointer transition-all duration-200 hover:scale-110 z-10"
          style={{
            left: `${position.x}%`,
            top: `${position.y}%`,
            transform: 'translate(-50%, -50%)',
          }}
          onClick={handleClick}
        >
          <span className="text-6xl md:text-8xl animate-bounce">❤️</span>
        </div>
        <div className="absolute top-4 left-4 bg-white/80 rounded-lg px-4 py-2 z-10">
          <p className="text-2xl font-bold text-pink-600">Score: {score}</p>
        </div>
        <div className="absolute top-4 right-4 bg-white/80 rounded-lg px-4 py-2 z-10">
          <p className="text-xl font-semibold text-purple-600">{timeLeft}s</p>
        </div>
      </div>
    </div>
  )
}

export default ClickGameScreen

