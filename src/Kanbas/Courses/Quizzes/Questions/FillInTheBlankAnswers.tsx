import { FaTrash } from 'react-icons/fa';

export default function FillInTheBlank({
  answers,
  setAnswerChoices,
  editingQuestion,
  setEditingQuestion,
}: {
  answers: { choice: string; isCorrect: boolean }[];
  setAnswerChoices: (choices: any) => void;
  editingQuestion: {};
  setEditingQuestion: (question: any) => void;
}) {
  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = { choice: value, isCorrect: false }; // Update answer text
    setAnswerChoices(newAnswers);
    setEditingQuestion({ ...editingQuestion, answerChoices: newAnswers });
  };

  const addAnswer = () => {
    const newAnswers = [...answers, { text: '', isCorrect: false }];
    setAnswerChoices(newAnswers); // Add empty answer
    setEditingQuestion({ ...editingQuestion, answerChoices: newAnswers });
  };

  const removeAnswer = (index: number) => {
    const newAnswers = answers.filter((_, i) => i !== index); // Remove answer
    setAnswerChoices(newAnswers);
    setEditingQuestion({ ...editingQuestion, answerChoices: newAnswers });
  };

  return (
    <div className="possible-answers">
      {answers.map((answer, index) => (
        <div key={index} className="answer-row">
          <label>Possible Answer:</label>
          <input
            type="text"
            value={answer.choice}
            onChange={(e) => handleAnswerChange(index, e.target.value)}
          />
          {answers.length > 1 && (
            <button
              type="button"
              className="delete-button"
              onClick={() => removeAnswer(index)}
            >
              <FaTrash />
            </button>
          )}
        </div>
      ))}
      <button type="button" className="add-button" onClick={addAnswer}>
        + Add Another Answer
      </button>
    </div>
  );
}
