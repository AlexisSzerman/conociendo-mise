import PhotoQuestion from "./PhotoQuestion";
import MultipleChoiceQuestion from "./MultipleChoiceQuestion";
import TextQuestion from "./TextQuestion";
import HintDisplay from "./HintDisplay";
import HintButton from "./HintButton";
import FeedbackMessage from "./FeedbackMessage";

const GameInProgress = ({
  teamName,
  elapsedTime,
  formatTime,
  currentQuestionIndex,
  currentQuestion,
  answerInput,
  setAnswerInput,
  selectedOption,
  setSelectedOption,
  handleSubmitAnswer,
  showHint,
  hintUsedForQuestion,
  handleShowHint,
  feedbackMessage,
}) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-100 to-pink-100 p-4 font-inter">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-2xl w-full text-center border-t-4 border-indigo-500 mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Equipo: <span className="text-indigo-600">{teamName}</span>
        </h2>
        <div className="text-2xl font-semibold text-gray-700 mb-6">
          Tiempo: <span className="text-pink-600">{formatTime(elapsedTime)}</span>
        </div>

        <div className="mb-8">
          <p className="text-xl font-medium text-gray-700 mb-4">
            Pregunta {currentQuestionIndex + 1} de {/** total */} 
          </p>

          {currentQuestion.type === "photo" && (
            <PhotoQuestion question={currentQuestion} />
          )}

          <p className="text-2xl text-gray-900 font-semibold leading-relaxed">
            {currentQuestion.question}
          </p>

          <HintDisplay hint={currentQuestion.hint} showHint={showHint} />
        </div>

        {currentQuestion.type === "multiple-choice" ? (
          <MultipleChoiceQuestion
            question={currentQuestion}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />
        ) : (
          <TextQuestion
            answerInput={answerInput}
            setAnswerInput={setAnswerInput}
            handleSubmitAnswer={handleSubmitAnswer}
          />
        )}

        <button
          onClick={handleSubmitAnswer}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 text-xl"
        >
          Enviar Respuesta
        </button>

        <HintButton
          question={currentQuestion}
          hintUsedForQuestion={hintUsedForQuestion}
          handleShowHint={handleShowHint}
        />

        <FeedbackMessage feedbackMessage={feedbackMessage} />
      </div>
      <p className="text-sm text-gray-500 mt-4">
        Diseñado para la Congregación Plaza de la Misericordia
      </p>
    </div>
  );
};

export default GameInProgress;
