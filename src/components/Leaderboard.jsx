const Leaderboard = ({ leaderboardData, loadingLeaderboard, formatTime }) => {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center border-t-4 border-purple-500 mt-8">
      <h2 className="text-3xl font-bold text-purple-700 mb-6">Tabla de Clasificación</h2>
      {loadingLeaderboard ? (
        <p className="text-gray-600">Cargando clasificación...</p>
      ) : (
        <ul className="space-y-3">
          {leaderboardData.length > 0 ? (
            leaderboardData.map((result, index) => (
              <li
                key={result.id}
                className={`flex justify-between items-center p-3 rounded-lg ${
                  index === 0
                    ? "bg-yellow-100 border-2 border-yellow-400 font-bold text-yellow-800"
                    : "bg-gray-50 border border-gray-200"
                }`}
              >
                <span className="text-lg">{index + 1}. {result.teamName}</span>
                <span className="text-lg font-semibold">{formatTime(result.elapsedTimeMs)}</span>
              </li>
            ))
          ) : (
            <p className="text-gray-600">No hay resultados aún. ¡Sé el primero!</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default Leaderboard;
