const MultipleChoiceQuestion = ({
  question,
  selectedOption,
  setSelectedOption,
}) => {
  return (
    <div className="flex flex-col items-start space-y-3 mb-4 w-full">
      {question.options.map((option, index) => (
        <label
          key={index}
          className="inline-flex items-center text-lg text-gray-800 cursor-pointer"
        >
          <input
            type="radio"
            name={`question-${question.id}`}
            value={option}
            checked={selectedOption === option}
            onChange={(e) => setSelectedOption(e.target.value)}
            className="form-radio h-5 w-5 text-indigo-600"
          />
          <span className="ml-3">{option}</span>
        </label>
      ))}
    </div>
  );
};

export default MultipleChoiceQuestion;
