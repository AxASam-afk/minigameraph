import { useState, useEffect } from 'react'
import IntroScreen from './screens/IntroScreen'
import ClickGameScreen from './screens/ClickGameScreen'
import QuizScreen from './screens/QuizScreen'
import ChoiceScreen from './screens/ChoiceScreen'
import FinalScreen from './screens/FinalScreen'
import AnimatedBackground from './components/AnimatedBackground'

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

  // Ne pas restaurer automatiquement - forcer le passage par tous les jeux
  // L'utilisateur doit toujours commencer depuis le début

  const handleNextScreen = (nextScreen, progressUpdate = {}) => {
    // Définir l'ordre strict des écrans
    const screenOrder = [SCREENS.INTRO, SCREENS.CLICK_GAME, SCREENS.QUIZ, SCREENS.CHOICE, SCREENS.FINAL]
    const currentIndex = screenOrder.indexOf(currentScreen)
    const nextIndex = screenOrder.indexOf(nextScreen)
    
    // Ne permettre QUE le passage à l'écran suivant immédiat dans l'ordre
    if (nextIndex !== currentIndex + 1) {
      console.warn('Tentative de sauter une étape - bloquée')
      return
    }
    
    // Pour l'écran final, vérifier STRICTEMENT que tous les jeux sont complétés
    if (nextScreen === SCREENS.FINAL) {
      const newProgress = { ...gameProgress, ...progressUpdate }
      
      // Vérifier le jeu de clic (score doit être défini, même si 0)
      if (newProgress.clickScore === undefined || newProgress.clickScore === null) {
        console.warn('Le jeu de clic doit être complété avant de continuer')
        return
      }
      
      // Vérifier le quiz (doit avoir 4 réponses)
      if (!newProgress.quizAnswers || newProgress.quizAnswers.length < 4) {
        console.warn('Le quiz doit être complété (4 questions) avant de continuer')
        return
      }
      
      // Vérifier le choix
      if (!newProgress.choiceAnswer) {
        console.warn('Le choix doit être fait avant de continuer')
        return
      }
    }
    
    setTransitioning(true)
    
    setTimeout(() => {
      setCurrentScreen(nextScreen)
      const newProgress = { ...gameProgress, ...progressUpdate }
      setGameProgress(newProgress)
      
      // Sauvegarder dans localStorage (mais ne pas restaurer automatiquement au chargement)
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
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <AnimatedBackground />
      <div className="max-w-2xl w-full relative z-10">
        {renderScreen()}
      </div>
    </div>
  )
}

export default App

