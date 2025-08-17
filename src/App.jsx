import { useState, useEffect, useRef } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

import { questions } from "./data/questions";
import StartScreen from "./components/StartScreen";
import GameFinished from "./components/GameFinished";
import GameInProgress from "./components/GameInProgress";
import firebaseConfig from "./utils/firebaseconfig";

// --- Configuración Firebase (constantes fuera del componente) ---
const appId = "conociendo-mise";

function App() {
  // --- Estados de control de juego ---
  const [teamName, setTeamName] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answerInput, setAnswerInput] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const timerRef = useRef(null);

  // --- Firebase ---
  const [db, setDb] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loadingLeaderboard, setLoadingLeaderboard] = useState(true);

  // --- Bloqueo si ya jugó ---
  const [hasUserPlayed, setHasUserPlayed] = useState(false);

  // --- Pistas ---
  const [showHint, setShowHint] = useState(false);
  const [hintUsedForQuestion, setHintUsedForQuestion] = useState({});

  // --- Inicializar Firebase ---
  useEffect(() => {
    const initFirebase = async () => {
      try {
        const app = initializeApp(firebaseConfig);
        const authInstance = getAuth(app);
        const dbInstance = getFirestore(app);

        setDb(dbInstance);

        await signInAnonymously(authInstance);

        onAuthStateChanged(authInstance, (user) => {
          if (user) setUserId(user.uid);
          setIsAuthReady(true);
        });
      } catch (error) {
        console.error("Error al inicializar Firebase:", error);
      }
    };

    if (!db) initFirebase();
  }, [db]);

  // --- Timer ---
  useEffect(() => {
    if (gameStarted && !gameFinished) {
      timerRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 1000);
    } else if (gameFinished) {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [gameStarted, gameFinished, startTime]);

  // --- Leaderboard y verificación de usuario ---
  useEffect(() => {
    if (db && isAuthReady && userId) {
      setLoadingLeaderboard(true);
      const leaderboardCollectionRef = collection(
        db,
        `artifacts/${appId}/public/data/scavengerHuntResults`
      );
      const q = query(leaderboardCollectionRef, orderBy("elapsedTimeMs", "asc"));

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const results = [];
          let userAlreadyPlayed = false;

          snapshot.forEach((doc) => {
            const data = doc.data();
            results.push({ id: doc.id, ...data });
            if (data.userId === userId) userAlreadyPlayed = true;
          });

          setLeaderboardData(results);
          setHasUserPlayed(userAlreadyPlayed);
          setLoadingLeaderboard(false);
        },
        (error) => {
          console.error("Error al obtener datos del leaderboard:", error);
          setLoadingLeaderboard(false);
        }
      );

      return () => unsubscribe();
    }
  }, [db, isAuthReady, userId]);

  // --- Funciones ---
  const startGame = () => {
    if (teamName.trim() === "") {
      setFeedbackMessage("Por favor, ingresa el nombre de tu equipo.");
      return;
    }
    setGameStarted(true);
    setStartTime(Date.now());
    setFeedbackMessage("");
  };

  const saveResultToFirestore = async (team, timeMs) => {
    if (!db) return;
    try {
      const leaderboardRef = collection(
        db,
        `artifacts/${appId}/public/data/scavengerHuntResults`
      );
      await addDoc(leaderboardRef, {
        teamName: team,
        elapsedTimeMs: timeMs,
        timestamp: new Date(),
        userId: userId,
      });
      console.log("Resultado guardado.");
    } catch (e) {
      console.error("Error al guardar resultado:", e);
    }
  };

  const normalizeText = (text) =>
    text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

  const handleSubmitAnswer = () => {
    const currentQuestion = questions[currentQuestionIndex];
    let userAnswer =
      currentQuestion.type === "multiple-choice" ? selectedOption : answerInput;

    if (normalizeText(userAnswer) === normalizeText(currentQuestion.correctAnswer)) {
      setFeedbackMessage("¡Correcto!");
      setShowHint(false);

      setTimeout(() => {
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex((prev) => prev + 1);
          setAnswerInput("");
          setSelectedOption("");
          setFeedbackMessage("");
        } else {
          const finalElapsedTime = Date.now() - startTime;
          setElapsedTime(finalElapsedTime);
          setGameFinished(true);
          saveResultToFirestore(teamName, finalElapsedTime);
        }
      }, 1000);
    } else {
      setFeedbackMessage("Respuesta incorrecta. ¡Inténtalo de nuevo!");
    }
  };

  const handleShowHint = () => {
    const currentId = questions[currentQuestionIndex].id;
    if (!hintUsedForQuestion[currentId]) {
      setElapsedTime((prev) => prev + 5000);
      setShowHint(true);
      setHintUsedForQuestion((prev) => ({ ...prev, [currentId]: true }));
    }
  };

  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  // --- Render ---
if (!gameStarted) {
  if (hasUserPlayed) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
        <div className="bg-white shadow-lg rounded-xl p-8 max-w-md text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">¡Ya jugaste!</h2>
          <p className="text-gray-700">
            No puedes jugar nuevamente.
          </p>
        </div>
      </div>
    );
  }

    return (
    <StartScreen
      teamName={teamName}
      setTeamName={setTeamName}
      startGame={startGame}
      feedbackMessage={feedbackMessage}
      hasUserPlayed={false} // acá luego podés poner tu lógica
      leaderboardData={leaderboardData}
      loadingLeaderboard={loadingLeaderboard}
      formatTime={formatTime}
    />
    );
  }

  if (gameFinished) {
    return (
      <GameFinished
        teamName={teamName}
        elapsedTime={elapsedTime}
        formatTime={formatTime}
        leaderboardData={leaderboardData}
        loadingLeaderboard={loadingLeaderboard}
        userId={userId}
      />
    );
  }

  return (
    <GameInProgress
      teamName={teamName}
      elapsedTime={elapsedTime}
      formatTime={formatTime}
      currentQuestionIndex={currentQuestionIndex}
      currentQuestion={questions[currentQuestionIndex]}
      answerInput={answerInput}
      setAnswerInput={setAnswerInput}
      selectedOption={selectedOption}
      setSelectedOption={setSelectedOption}
      handleSubmitAnswer={handleSubmitAnswer}
      showHint={showHint}
      hintUsedForQuestion={hintUsedForQuestion}
      handleShowHint={handleShowHint}
      feedbackMessage={feedbackMessage}
    />
  );
}

export default App;
