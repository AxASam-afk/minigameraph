function IntroScreen({ onNext, className = '' }) {
  return (
    <div className={`bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8 border border-pink-200 ${className}`}>
      <div className="text-center">
        <div className="mb-6">
          <span className="text-6xl animate-bounce inline-block">✨</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
          Salut Madame !
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-2 leading-relaxed">
          J'ai préparé un petit truc pour toi...
        </p>
        <p className="text-base md:text-lg text-gray-600 mb-4">
          (J'ai passé un peu de temps dessus, alors sois gentille 😏)
        </p>
        <p className="text-base md:text-lg text-gray-500 mb-8 italic">
          Promis, c'est plus fun qu'un message WhatsApp classique ✨
        </p>
        <button
          onClick={onNext}
          className="bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold py-4 px-8 rounded-xl hover:from-pink-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg text-lg"
        >
          Commencer
        </button>
      </div>
    </div>
  )
}

export default IntroScreen

