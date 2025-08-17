const PhotoQuestion = ({ question }) => {
  return (
    <div className="mb-6">
      <img
        src={question.image}
        alt="Pista visual"
        className="w-full max-h-80 object-contain rounded-lg shadow-md mx-auto border border-gray-200"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src =
            "https://placehold.co/600x400/CCCCCC/000000?text=Imagen+no+disponible";
        }}
      />
    </div>
  );
};

export default PhotoQuestion;
