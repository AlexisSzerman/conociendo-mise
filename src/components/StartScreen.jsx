import React from 'react';

const StartScreen = ({ teamName, setTeamName, startGame, feedbackMessage, hasUserPlayed }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 p-4 font-inter">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center border-t-4 border-blue-500">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6">
          <span className="text-purple-600">¡Bienvenidos!</span>
          <br />
          <span className="text-blue-600">Conociendo Plaza de la Misericordia</span>
        </h1>
        <p className="text-gray-600 mb-6 text-lg">
          Buscá a un hermano de Misericordia, hacé equipo y resuelvan las preguntas
        </p>
        <p className="text-purple-600 font-extrabold mb-6 text-lg">
          ¡El equipo que responda más rápido tiene premio!
        </p>
        <input
          type="text"
          placeholder="Ingresa el nombre de tu equipo"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
          // Deshabilita el input si el usuario ya jugó
          disabled={hasUserPlayed}
        />
        <button
          onClick={startGame}
          // Deshabilita el botón con un estilo visual si el usuario ya jugó
          className={`w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform text-xl
            ${hasUserPlayed ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700 hover:scale-105'}`}
          disabled={hasUserPlayed}
        >
          Comenzar Juego
        </button>
        {/* Muestra este mensaje si el usuario ya ha jugado */}
        {hasUserPlayed && (
          <p className="mt-4 text-orange-600 font-medium">Ya has participado en este juego desde este dispositivo.</p>
        )}
        {/* Muestra el mensaje de feedback del juego (ej. "Ingresa nombre de equipo") */}
        {feedbackMessage && (
          <p className="mt-4 text-red-500 font-medium">{feedbackMessage}</p>
        )}
      </div>
    </div>
  );
};

export default StartScreen;