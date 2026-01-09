import { useState, useRef, useEffect } from 'react'

function FinalScreen({ className = '' }) {
  const [response, setResponse] = useState(null)
  const [showIntro, setShowIntro] = useState(true)
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 })
  const [isFleeing, setIsFleeing] = useState(false)
  const noButtonRef = useRef(null)
  const containerRef = useRef(null)
  const animationFrameRef = useRef(null)

  const handleResponse = (res) => {
    setResponse(res)
  }

  const handleReset = () => {
    localStorage.removeItem('minigame_progress')
    window.location.reload()
  }

  useEffect(() => {
    if (response || showIntro) return
    
    // Attendre que les refs soient disponibles
    if (!noButtonRef.current || !containerRef.current) {
      // Réessayer après un court délai
      const timer = setTimeout(() => {
        if (noButtonRef.current && containerRef.current) {
          const containerRect = containerRef.current.getBoundingClientRect()
          if (noButtonPosition.x === 0 && noButtonPosition.y === 0) {
            setNoButtonPosition({ 
              x: containerRect.width / 2, 
              y: containerRect.height / 2 
            })
          }
        }
      }, 100)
      return () => clearTimeout(timer)
    }

    let mouseX = 0
    let mouseY = 0
    let currentX = noButtonPosition.x || 0
    let currentY = noButtonPosition.y || 0

    const handleMouseMove = (e) => {
      const container = containerRef.current
      if (!container) return
      
      const containerRect = container.getBoundingClientRect()
      mouseX = e.clientX - containerRect.left
      mouseY = e.clientY - containerRect.top
    }

    const animate = () => {
      const button = noButtonRef.current
      const container = containerRef.current
      if (!button || !container || response || showIntro) return

      const buttonRect = button.getBoundingClientRect()
      const containerRect = container.getBoundingClientRect()
      
      const buttonCenterX = buttonRect.left - containerRect.left + buttonRect.width / 2
      const buttonCenterY = buttonRect.top - containerRect.top + buttonRect.height / 2
      
      const distance = Math.sqrt(
        Math.pow(mouseX - buttonCenterX, 2) + Math.pow(mouseY - buttonCenterY, 2)
      )
      
      // Si la souris est proche (moins de 150px), faire fuir le bouton
      if (distance < 150) {
        setIsFleeing(true)
        
        // Calculer la direction opposée à la souris
        const angle = Math.atan2(mouseY - buttonCenterY, mouseX - buttonCenterX)
        
        // Vitesse de fuite (plus la souris est proche, plus vite il fuit)
        const speed = Math.max(3, (150 - distance) / 8)
        
        // Déplacer le bouton dans la direction opposée (en pixels)
        currentX -= Math.cos(angle) * speed
        currentY -= Math.sin(angle) * speed
        
        // Limiter le mouvement dans le conteneur (avec marges)
        const maxX = containerRect.width - buttonRect.width - 10
        const maxY = containerRect.height - buttonRect.height - 10
        
        currentX = Math.max(10, Math.min(maxX, currentX))
        currentY = Math.max(10, Math.min(maxY, currentY))
        
        setNoButtonPosition({ x: currentX, y: currentY })
      } else if (distance >= 200 && isFleeing) {
        // Réinitialiser si la souris s'éloigne beaucoup
        setIsFleeing(false)
      }
      
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    const container = containerRef.current
    if (container) {
      // Initialiser la position en pixels si nécessaire
      const containerRect = container.getBoundingClientRect()
      if ((noButtonPosition.x === 0 && noButtonPosition.y === 0) || 
          noButtonPosition.x === undefined || noButtonPosition.y === undefined) {
        const initialX = containerRect.width / 2
        const initialY = containerRect.height / 2
        setNoButtonPosition({ x: initialX, y: initialY })
        currentX = initialX
        currentY = initialY
      } else {
        currentX = noButtonPosition.x
        currentY = noButtonPosition.y
      }
      
      container.addEventListener('mousemove', handleMouseMove)
      animationFrameRef.current = requestAnimationFrame(animate)
      
      return () => {
        container.removeEventListener('mousemove', handleMouseMove)
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current)
        }
      }
    }
  }, [response, showIntro])

  const handleNoClick = (e) => {
    // Empêcher le clic si le bouton est en train de fuir
    e.preventDefault()
    e.stopPropagation()
    
    // Ne permettre le clic que si le bouton est stable et la souris très proche
    if (!isFleeing) {
      const button = noButtonRef.current
      const container = containerRef.current
      if (button && container) {
        const buttonRect = button.getBoundingClientRect()
        const containerRect = container.getBoundingClientRect()
        const mouseX = e.clientX - containerRect.left
        const mouseY = e.clientY - containerRect.top
        
        const buttonCenterX = buttonRect.left - containerRect.left + buttonRect.width / 2
        const buttonCenterY = buttonRect.top - containerRect.top + buttonRect.height / 2
        
        const distance = Math.sqrt(
          Math.pow(mouseX - buttonCenterX, 2) + Math.pow(mouseY - buttonCenterY, 2)
        )
        
        // Ne permettre le clic que si la souris est très proche (moins de 30px)
        if (distance < 30) {
          handleResponse('no')
        }
      }
    }
  }

  if (showIntro) {
    return (
      <div className={`bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8 border border-pink-200 ${className}`}>
        <div className="text-center">
          <div className="mb-6">
            <span className="text-6xl inline-block animate-bounce">✨</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Alors Madame...
          </h2>
          <p className="text-xl md:text-2xl text-gray-700 mb-4 leading-relaxed">
            Est-ce que ça te dirait qu'on aille boire un verre ensemble ?
          </p>
          <p className="text-base text-gray-600 mb-8 italic">
            (J'ai fait tout ce jeu juste pour te poser cette question... 😏)
          </p>
          <button
            onClick={() => setShowIntro(false)}
            className="bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold py-3 px-8 rounded-xl hover:from-pink-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Voir les options
          </button>
        </div>
      </div>
    )
  }

  if (response === 'yes') {
    return (
      <div className={`bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8 border border-pink-200 ${className}`}>
        <div className="text-center fade-in">
          <p className="text-6xl mb-6 animate-bounce">🎉</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Génial !
          </h2>
          <p className="text-xl text-gray-700 mb-4">
            Je suis content que ça te fasse plaisir ! 😊
          </p>
          <p className="text-lg text-gray-600 mb-4">
            On se contacte pour organiser ça alors ?
          </p>
          <p className="text-base text-gray-500 mb-8 italic">
            (Le jeu a payé... j'avais raison de croire en toi 😏)
          </p>
          <div className="space-y-3">
            <p className="text-2xl">✨</p>
            <p className="text-sm text-gray-500">
              (Samuel)
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (response === 'maybe') {
    return (
      <div className={`bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8 border border-pink-200 ${className}`}>
        <div className="text-center fade-in">
          <p className="text-5xl mb-6">🤔</p>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Pas de souci !
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            On peut en reparler plus tard si tu veux. 😊
          </p>
          <p className="text-gray-600 mb-8">
            Pas de pression, c'était juste pour rigoler de toute façon !
          </p>
          <button
            onClick={handleReset}
            className="bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold py-3 px-8 rounded-xl hover:from-pink-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Rejouer
          </button>
        </div>
      </div>
    )
  }

  if (response === 'no') {
    return (
      <div className={`bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8 border border-pink-200 ${className}`}>
        <div className="text-center fade-in">
          <p className="text-5xl mb-6">😊</p>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Pas de problème !
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            Merci d'avoir joué le jeu jusqu'au bout. ✨
          </p>
          <p className="text-gray-600 mb-6">
            J'espère au moins que ça t'a fait sourire un peu !
          </p>
          <p className="text-sm text-gray-500 mb-8 italic">
            (Et si jamais tu changes d'avis, tu sais où me trouver 😉)
          </p>
          <button
            onClick={handleReset}
            className="bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold py-3 px-8 rounded-xl hover:from-pink-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Rejouer
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={`bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8 border border-pink-200 ${className}`}>
      <div className="text-center">
        <div className="mb-6">
          <p className="text-6xl animate-bounce">✨</p>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Alors Madame...
        </h2>
        <p className="text-xl md:text-2xl text-gray-700 mb-4 leading-relaxed">
          Est-ce que ça te dirait qu'on aille boire un verre ensemble ?
        </p>
        <p className="text-base text-gray-600 mb-8 italic">
          (J'ai fait tout ce jeu juste pour te poser cette question... 😏)
        </p>
        <div className="space-y-4 max-w-md mx-auto relative" ref={containerRef} style={{ minHeight: '400px', position: 'relative' }}>
          <button
            onClick={() => handleResponse('yes')}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold py-4 px-8 rounded-xl hover:from-pink-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg text-lg"
          >
            Oui
          </button>
          <button
            onClick={() => handleResponse('maybe')}
            className="w-full bg-gradient-to-r from-pink-300 to-purple-300 text-gray-800 font-semibold py-4 px-8 rounded-xl hover:from-pink-400 hover:to-purple-400 transition-all duration-300 transform hover:scale-105 shadow-lg text-lg"
          >
            Peut-être
          </button>
          <div
            ref={noButtonRef}
            onClick={handleNoClick}
            className="absolute bg-gray-200 text-gray-700 font-semibold py-4 px-8 rounded-xl hover:bg-gray-300 shadow-lg text-lg cursor-pointer select-none"
            style={{
              left: `${noButtonPosition.x}px`,
              top: `${noButtonPosition.y}px`,
              transform: 'translate(-50%, -50%)',
              zIndex: 50,
              minWidth: '200px',
              textAlign: 'center',
              transition: 'none',
            }}
          >
            Non
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-8 italic">
          (Pas de pression, c'est juste pour rigoler 😊)
        </p>
      </div>
    </div>
  )
}

export default FinalScreen

