import { FaTrash, FaArrowRight } from 'react-icons/fa';
import { TbPencilCheck } from 'react-icons/tb';

export default function MultipleChoiceAnswers({
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
  const handleAnswerChange = async (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index].choice = value;
    setAnswerChoices(newAnswers);
    setEditingQuestion({ ...editingQuestion, answerChoices: newAnswers });
  };

  const addAnswer = () => {
    const newAnswers = [...answers, { text: '', isCorrect: false }];
    setAnswerChoices(newAnswers);
    setEditingQuestion({ ...editingQuestion, answerChoices: newAnswers });
  };

  const removeAnswer = (index: number) => {
    const newAnswers = answers.filter((_, i) => i !== index);
    setAnswerChoices(newAnswers);
    setEditingQuestion({ ...editingQuestion, answerChoices: newAnswers });
  };

  const toggleCorrectAnswer = (index: number) => {
    const newAnswers = answers?.map((answer, i) => ({
      ...answer,
      isCorrect: i === index ? !answer.isCorrect : answer.isCorrect,
    }));
    setAnswerChoices(newAnswers);
    setEditingQuestion({ ...editingQuestion, answerChoices: newAnswers });
  };

  return (
    <div className="possible-answers">
      <h3>Answers:</h3>
      {answers.map((answer, index) => (
        <div
          key={index}
          className={`answer-row ${answer.isCorrect ? 'correct' : ''}`}
        >
          {answer.isCorrect ? (
            <FaArrowRight className="correct-icon" />
          ) : (
            <FaArrowRight className="placeholder-icon" />
          )}
          <label>
            {answer.isCorrect ? 'Correct Answer' : 'Possible Answer'}:
          </label>
          <input
            type="text"
            value={answer.choice}
            onChange={(e) => handleAnswerChange(index, e.target.value)}
          />
          <div className="action-buttons">
            <button
              type="button"
              className={`correct-button ${answer.isCorrect ? 'selected' : ''}`}
              onClick={() => toggleCorrectAnswer(index)}
            >
              <TbPencilCheck />
            </button>
            <button
              type="button"
              className="delete-button"
              onClick={() => removeAnswer(index)}
            >
              <FaTrash />
            </button>
          </div>
        </div>
      ))}
      <button type="button" className="add-button" onClick={addAnswer}>
        + Add Another Answer
      </button>
    </div>
  );
}
