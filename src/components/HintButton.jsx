const HintButton = ({ question, hintUsedForQuestion, handleShowHint }) => {
  if (!question.hint) return null;

  return (
    <button
      onClick={handleShowHint}
      disabled={hintUsedForQuestion[question.id]}
      className={`w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 text-xl mt-4 
      ${hintUsedForQuestion[question.id] ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {hintUsedForQuestion[question.id]
        ? "Pista Usada (+5s)"
        : "Pedir Pista (+5s)"}
    </button>
  );
};

export default HintButton;
