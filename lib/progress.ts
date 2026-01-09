export interface GameProgress {
  currentStep: string
  clickScore?: number
  quizAnswers?: number[]
  choiceAnswer?: string
}

const STORAGE_KEY = 'minigame_raph_progress'

export function saveGameProgress(progress: Partial<GameProgress>) {
  const existing = getGameProgress()
  const updated = { ...existing, ...progress }
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  }
}

export function getGameProgress(): GameProgress {
  if (typeof window === 'undefined') {
    return { currentStep: 'intro' }
  }
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored) {
    try {
      return JSON.parse(stored)
    } catch {
      return { currentStep: 'intro' }
    }
  }
  return { currentStep: 'intro' }
}

export function getCurrentStep(): string | null {
  const progress = getGameProgress()
  return progress.currentStep || null
}

export function resetProgress() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY)
  }
}

