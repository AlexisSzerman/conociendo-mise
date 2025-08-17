const HintDisplay = ({ hint, showHint }) => {
  if (!hint || !showHint) return null;

  return (
    <p className="text-md text-gray-500 mt-3 italic bg-gray-100 p-2 rounded-md">
      {hint}
    </p>
  );
};

export default HintDisplay;
