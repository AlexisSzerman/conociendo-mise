import Leaderboard from "./Leaderboard";

const GameFinished = ({ teamName, elapsedTime, formatTime, leaderboardData, loadingLeaderboard, userId }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-100 to-teal-100 p-4 font-inter">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center border-t-4 border-green-500 mb-6">
        <h1 className="text-4xl font-extrabold text-green-700 mb-4">¡Juego Completado!</h1>
        <p className="text-gray-700 text-2xl mb-6">Equipo: <span className="font-semibold text-teal-600">{teamName}</span></p>
        <p className="text-gray-800 text-3xl font-bold mb-8">Tiempo Total: <span className="text-green-600">{formatTime(elapsedTime)}</span></p>
      </div>

      <Leaderboard 
        leaderboardData={leaderboardData} 
        loadingLeaderboard={loadingLeaderboard} 
        formatTime={formatTime} 
      />
      
      <p className="text-sm text-gray-500 mt-4">ID de Usuario: {userId || 'Cargando...'}</p>
    </div>
  );
};

export default GameFinished;
