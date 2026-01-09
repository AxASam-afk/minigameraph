import { useState } from 'react'

function FinalScreen({ className = '' }) {
  const [response, setResponse] = useState(null)
  const [showIntro, setShowIntro] = useState(true)

  const handleResponse = (res) => {
    setResponse(res)
  }

  const handleReset = () => {
    localStorage.removeItem('minigame_progress')
    window.location.reload()
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
        <div className="space-y-4 max-w-md mx-auto">
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
          <button
            onClick={() => handleResponse('no')}
            className="w-full bg-gray-200 text-gray-700 font-semibold py-4 px-8 rounded-xl hover:bg-gray-300 transition-all duration-300 transform hover:scale-105 shadow-lg text-lg"
          >
            Non
          </button>
        </div>
        <p className="text-sm text-gray-500 mt-8 italic">
          (Pas de pression, c'est juste pour rigoler 😊)
        </p>
      </div>
    </div>
  )
}

export default FinalScreen

