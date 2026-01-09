import { useEffect, useState } from 'react'

function HeartParticle({ x, y, onComplete }) {
  const [opacity, setOpacity] = useState(1)
  const [translateY, setTranslateY] = useState(0)
  const [translateX, setTranslateX] = useState(0)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const randomX = (Math.random() - 0.5) * 100
    const randomY = -Math.random() * 80 - 20
    
    setTranslateX(randomX)
    setTranslateY(randomY)
    setScale(0.5 + Math.random() * 0.5)

    const duration = 1000 + Math.random() * 500
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = elapsed / duration

      if (progress < 1) {
        setOpacity(1 - progress)
        setTranslateY(randomY - progress * 50)
        requestAnimationFrame(animate)
      } else {
        onComplete()
      }
    }

    requestAnimationFrame(animate)
  }, [])

  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: `translate(-50%, -50%) translate(${translateX}px, ${translateY}px) scale(${scale})`,
        opacity: opacity,
        transition: 'opacity 0.1s ease-out',
      }}
    >
      <span className="text-3xl">❤️</span>
    </div>
  )
}

function HeartParticles({ trigger, position }) {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    if (trigger > 0 && position) {
      // Créer 5-8 particules de cœurs
      const count = 5 + Math.floor(Math.random() * 4)
      const newParticles = []
      
      for (let i = 0; i < count; i++) {
        newParticles.push({
          id: Date.now() + i,
          x: position.x,
          y: position.y,
        })
      }
      
      setParticles((prev) => [...prev, ...newParticles])
    }
  }, [trigger, position])

  const handleParticleComplete = (id) => {
    setParticles((prev) => prev.filter((p) => p.id !== id))
  }

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <HeartParticle
          key={particle.id}
          x={particle.x}
          y={particle.y}
          onComplete={() => handleParticleComplete(particle.id)}
        />
      ))}
    </div>
  )
}

export default HeartParticles

