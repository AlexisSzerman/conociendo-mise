const FeedbackMessage = ({ feedbackMessage }) => {
  if (!feedbackMessage) return null;

  return (
    <p
      className={`mt-4 font-medium ${
        feedbackMessage.includes("Correcto")
          ? "text-green-600"
          : "text-red-500"
      }`}
    >
      {feedbackMessage}
    </p>
  );
};

export default FeedbackMessage;
