const TextQuestion = ({ answerInput, setAnswerInput, handleSubmitAnswer }) => {
  return (
    <input
      type="text"
      placeholder="Tu respuesta aquí"
      value={answerInput}
      onChange={(e) => setAnswerInput(e.target.value)}
      onKeyPress={(e) => {
        if (e.key === "Enter") {
          handleSubmitAnswer();
        }
      }}
      className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-lg"
    />
  );
};

export default TextQuestion;
