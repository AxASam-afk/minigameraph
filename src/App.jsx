import { useState, useEffect } from 'react'
import IntroScreen from './screens/IntroScreen'
import ClickGameScreen from './screens/ClickGameScreen'
import QuizScreen from './screens/QuizScreen'
import ChoiceScreen from './screens/ChoiceScreen'
import FinalScreen from './screens/FinalScreen'

const SCREENS = {
  INTRO: 'intro',
  CLICK_GAME: 'click',
  QUIZ: 'quiz',
  CHOICE: 'choice',
  FINAL: 'final',
}

function App() {
  const [currentScreen, setCurrentScreen] = useState(SCREENS.INTRO)
  const [transitioning, setTransitioning] = useState(false)
  const [gameProgress, setGameProgress] = useState({
    clickScore: 0,
    quizAnswers: [],
    choiceAnswer: null,
  })

  // Restaurer la progression depuis localStorage
  useEffect(() => {
    const saved = localStorage.getItem('minigame_progress')
    if (saved) {
      try {
        const progress = JSON.parse(saved)
        if (progress.currentScreen && progress.currentScreen !== SCREENS.INTRO) {
          setCurrentScreen(progress.currentScreen)
          setGameProgress(progress.gameProgress || gameProgress)
        }
      } catch (e) {
        console.error('Erreur lors du chargement de la progression', e)
      }
    }
  }, [])

  const handleNextScreen = (nextScreen, progressUpdate = {}) => {
    setTransitioning(true)
    
    setTimeout(() => {
      setCurrentScreen(nextScreen)
      const newProgress = { ...gameProgress, ...progressUpdate }
      setGameProgress(newProgress)
      
      // Sauvegarder dans localStorage
      localStorage.setItem('minigame_progress', JSON.stringify({
        currentScreen: nextScreen,
        gameProgress: newProgress,
      }))
      
      setTimeout(() => {
        setTransitioning(false)
      }, 50)
    }, 400)
  }

  const handleScreenChange = (screen, progressUpdate = {}) => {
    handleNextScreen(screen, progressUpdate)
  }

  const renderScreen = () => {
    if (transitioning) {
      return null
    }

    switch (currentScreen) {
      case SCREENS.INTRO:
        return (
          <IntroScreen
            onNext={() => handleScreenChange(SCREENS.CLICK_GAME)}
            className="screen-enter"
          />
        )
      case SCREENS.CLICK_GAME:
        return (
          <ClickGameScreen
            onNext={(score) => handleScreenChange(SCREENS.QUIZ, { clickScore: score })}
            className="slide-in-right"
          />
        )
      case SCREENS.QUIZ:
        return (
          <QuizScreen
            onNext={(answers) => handleScreenChange(SCREENS.CHOICE, { quizAnswers: answers })}
            className="slide-in-right"
          />
        )
      case SCREENS.CHOICE:
        return (
          <ChoiceScreen
            onNext={(choice) => handleScreenChange(SCREENS.FINAL, { choiceAnswer: choice })}
            className="slide-in-right"
          />
        )
      case SCREENS.FINAL:
        return (
          <FinalScreen
            className="scale-in"
          />
        )
      default:
        return (
          <IntroScreen
            onNext={() => handleScreenChange(SCREENS.CLICK_GAME)}
            className="screen-enter"
          />
        )
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {renderScreen()}
      </div>
    </div>
  )
}

export default App

