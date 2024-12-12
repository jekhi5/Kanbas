export default function FillInTheBlank({
  question,
}: {
  question: { points: string; answerChoices: { choice: string }[] };
}) {
  return !question ? (
    <p>Invalid Question</p>
  ) : (
    <div className="mb-3 ps-3 ps-1">
      <hr />
      <ul style={{ listStyleType: 'none' }}>
        {question.answerChoices.map((_, index) => (
          <li key={index}>
            <input
              id={`blank-${index}`}
              className="form-control mb-3"
              placeholder={`Blank ${index + 1}`}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
