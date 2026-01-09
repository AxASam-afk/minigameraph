import { useEffect, useState } from 'react'

function FloatingHeart({ id, onComplete }) {
  const [x, setX] = useState(Math.random() * 100)
  const [y, setY] = useState(100 + Math.random() * 20) // Commence en bas
  const [opacity, setOpacity] = useState(0.3 + Math.random() * 0.2) // Entre 0.3 et 0.5
  const [scale, setScale] = useState(0.5 + Math.random() * 0.5) // Entre 0.5 et 1

  useEffect(() => {
    const speed = 0.02 + Math.random() * 0.03 // Vitesse lente et variable
    const drift = (Math.random() - 0.5) * 0.5 // Légère dérive horizontale

    const animate = () => {
      setY((prevY) => {
        const newY = prevY - speed
        if (newY < -10) {
          // Réinitialiser en bas quand il sort en haut
          onComplete()
          return 100 + Math.random() * 20
        }
        return newY
      })
      
      setX((prevX) => {
        // Légère dérive horizontale
        const newX = prevX + drift
        if (newX < -5) return 105
        if (newX > 105) return -5
        return newX
      })
    }

    const interval = setInterval(animate, 16) // ~60fps
    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: `translate(-50%, -50%) scale(${scale})`,
        opacity: opacity,
        filter: 'blur(2px)',
        transition: 'opacity 0.3s ease',
      }}
    >
      <span className="text-4xl md:text-5xl">❤️</span>
    </div>
  )
}

function AnimatedBackground() {
  const [hearts, setHearts] = useState([])

  useEffect(() => {
    // Créer 15-20 cœurs pour un effet discret mais présent
    const initialHearts = Array.from({ length: 15 + Math.floor(Math.random() * 6) }, (_, i) => ({
      id: Date.now() + i,
    }))
    setHearts(initialHearts)
  }, [])

  const handleHeartComplete = (id) => {
    // Recréer le cœur en bas pour un effet continu
    setHearts((prev) => {
      const filtered = prev.filter((h) => h.id !== id)
      return [
        ...filtered,
        {
          id: Date.now() + Math.random(),
        },
      ]
    })
  }

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {hearts.map((heart) => (
        <FloatingHeart
          key={heart.id}
          id={heart.id}
          onComplete={() => handleHeartComplete(heart.id)}
        />
      ))}
    </div>
  )
}

export default AnimatedBackground

