import { useParams } from 'react-router-dom';
import { BsPencilSquare, BsTrash } from 'react-icons/bs';
import TrueFalseAnswer from './TrueFalseAnswer';
import FillInTheBlank from './FillInTheBlankAnswers';
import MultipleChoiceAnswers from './MultipleChoiceAnswers';
import './index.css';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function Questions({
  questions,
  setQuestions,
}: {
  questions: any[];
  setQuestions: (questions: any) => void;
}) {
  const { qid } = useParams();
  const { quizzes } = useSelector((state: any) => state.quizReducer);
  const quiz = quizzes.find((quiz: any) => quiz._id === qid);

  const [questionToBeEditing, setQuestionToBeEditing] = useState({
    questionNumber: -1,
    questionText: '',
    type: 'Multiple-Choice',
    points: 0,
    answerChoices: [],
  });

  const [questionNumber, setQuestionNumber] = useState<number>(-1);
  const [questionText, setQuestionText] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [points, setPoints] = useState<number>(0);
  const [answerChoices, setAnswerChoices] = useState<
    {
      choice: string;
      isCorrect: boolean;
    }[]
  >([]);

  useEffect(() => {
    if (
      questionNumber > 0 &&
      questionNumber <= questions.length &&
      questionToBeEditing
    ) {
      setQuestionText(questionToBeEditing.questionText);
      setType(questionToBeEditing.type);
      setPoints(questionToBeEditing.points);
      setAnswerChoices(questionToBeEditing.answerChoices);
    }
  }, [questionNumber, questionToBeEditing, questions.length]);

  if (!quiz) {
    return <div>Quiz not found!</div>;
  }

  const handleQuestionMessage = (question: any) => {
    switch (question.type) {
      case 'True-False':
        return (
          <p>
            Enter your question text then select if True or False is the correct
            answer.
          </p>
        );
      case 'Open-Response':
        return <p>Enter your question text.</p>;
      case 'Multiple-Choice':
        return (
          <p>
            Enter your question and multiple answers, then select the one
            correct answer
          </p>
        );
      case 'Fill-In-The-Blank':
        return (
          <p>
            Enter your question text, then define all possible correct answers
            for the blank. <br />
            Students will see the questions followed by a small text box to type
            their answer.
          </p>
        );
      default:
        return (
          <p>Fill in missing question information and click save when ready</p>
        );
    }
  };

  if (!quiz.questions) {
    return <div></div>;
  }

  const showAnswerContent = (questionObj: any) => {
    switch (questionObj.type) {
      case 'True-False':
        return <TrueFalseAnswer question={questionObj} />;
      case 'Open-Response':
        return <p>This cannot be automatically graded</p>;
      case 'Multiple-Choice':
        return (
          <MultipleChoiceAnswers
            answers={answerChoices}
            setAnswerChoices={setAnswerChoices}
            editingQuestion={questionToBeEditing}
            setEditingQuestion={setQuestionToBeEditing}
          />
        );
      case 'Fill in the Blank':
        return (
          <FillInTheBlank
            answers={answerChoices}
            setAnswerChoices={setAnswerChoices}
            editingQuestion={questionToBeEditing}
            setEditingQuestion={setQuestionToBeEditing}
          />
        );
      default:
        return <></>;
    }
  };

  const handleUpdate = (question: any) => {
    const newQuestions = questions.map((q) =>
      q.questionNumber === question.questionNumber
        ? {
            questionNumber,
            questionText,
            type,
            points,
            answerChoices,
          }
        : q
    );
    setQuestions(newQuestions);
    setQuestionNumber(0);
  };

  return (
    <div id="wd-quiz-questions">
      <button
        id="wd-new-question"
        className="btn btn-secondary mb-2"
        onClick={() => {
          setQuestionNumber(questions.length + 1);
          setQuestions([
            ...questions,
            {
              questionNumber: questions.length + 1,
              questionText: 'Untitled Question',
              type: 'Multiple-Choice',
              points: 0,
              answerChoices: [],
            },
          ]);
        }}
      >
        + New Question
      </button>
      <div className="d-flex">
        <div className="p-6 align-items-stretch w-75">
          {questions.map((question: any, idx: number) => {
            return (
              <ul
                className="wd-assignments list-group rounded-0"
                key={idx}
                style={{ listStyleType: 'none' }}
              >
                <li className="list-group-item p-3 ps-1">
                  <button
                    onClick={() => {
                      setQuestionNumber(idx + 1);
                      setQuestionToBeEditing(question);
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      marginLeft: 'auto',
                      color: 'green',
                    }}
                  >
                    <BsPencilSquare size={16} />
                  </button>
                  <button
                    onClick={() => {
                      const curNum = question.questionNumber;
                      const newQuestions = questions
                        .filter((q) => q.questionNumber !== curNum)
                        .map((q) =>
                          q.questionNumber > curNum
                            ? { ...q, questionNumber: q.questionNum - 1 }
                            : q
                        );
                      setQuestions(newQuestions);
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      marginLeft: 'auto',
                      color: 'green',
                    }}
                  >
                    <BsTrash size={16} />
                  </button>
                  <div className="mb-3 ps-3 ps-1 d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                      <div id="wd-quiz-title" className="me-2">
                        {' '}
                        {idx + 1}
                        {'. '}
                      </div>
                      {questionNumber === question.questionNumber ? (
                        <select
                          id="wd-quiz-type"
                          className="form-select"
                          style={{ width: 200 }}
                          onChange={(e) => {
                            setType(e.target.value);

                            if (e.target.value === 'True-False') {
                              setAnswerChoices([
                                { choice: 'True', isCorrect: true },
                                { choice: 'False', isCorrect: false },
                              ]);
                            } else if (e.target.value === 'Open-Response') {
                              setAnswerChoices([]);
                            }
                          }}
                        >
                          {question.type && (
                            <option value={question.type}>
                              {question.type}
                            </option>
                          )}
                          <option value="True-False">True-False</option>
                          <option value="Multiple-Choice">
                            Multiple-Choice
                          </option>
                          <option value="Open-Response">Open-Response</option>
                          <option value="Fill-In-The-Blank">
                            Fill-In-The-Blank
                          </option>
                        </select>
                      ) : (
                        <>{question.type}</>
                      )}
                    </div>
                    <div className="d-flex align-items-center">
                      pts:
                      {questionNumber === question.questionNumber ? (
                        <input
                          id="wd-points"
                          type="number"
                          className="form-control points-input ms-1"
                          value={points}
                          onChange={(e) => setPoints(parseInt(e.target.value))}
                        />
                      ) : (
                        <span>{question.points}</span>
                      )}
                    </div>
                  </div>
                </li>
                <li className="list-group-item p-3 ps-1">
                  {questionNumber === question.questionNumber ? (
                    handleQuestionMessage(question)
                  ) : (
                    <></>
                  )}
                  <br />
                  <p style={{ fontWeight: 'bold' }}>Question: </p>
                  {questionNumber === question.questionNumber ? (
                    <textarea
                      id="wd-question-text"
                      className="form-control narrow-box tall-box"
                      onChange={(e) => setQuestionText(e.target.value)}
                    >
                      {question.questionText}
                    </textarea>
                  ) : (
                    <div>{question.questionText}</div>
                  )}
                  <br />
                  {question.type !== 'Open-Response' ||
                  (questionNumber === question.questionNumber &&
                    questionToBeEditing.type !== 'Open-Response') ? (
                    <>
                      <p style={{ fontWeight: 'bold' }}>Answer: </p>
                      {questionNumber === question.questionNumber ? (
                        showAnswerContent(question)
                      ) : (
                        <ol>
                          {question.answerChoices.map(
                            (
                              answerObj: { choice: String; isCorrect: Boolean },
                              idx: number
                            ) => (
                              <li
                                key={idx}
                                style={{
                                  color: `${
                                    answerObj.isCorrect ? 'green' : 'black'
                                  }`,
                                }}
                              >
                                {answerObj.choice}
                              </li>
                            )
                          )}
                        </ol>
                      )}
                    </>
                  ) : (
                    <></>
                  )}
                  <br />
                </li>
                {questionNumber === question.questionNumber ? (
                  <div>
                    <br />
                    <button
                      id="wd-questions-cancel"
                      className="btn btn-secondary me-2"
                      onClick={() => setQuestionNumber(0)}
                    >
                      Cancel
                    </button>
                    <button
                      id="wd-questions-update"
                      className="btn btn-danger"
                      onClick={() => handleUpdate(question)}
                    >
                      Update Question
                    </button>
                  </div>
                ) : (
                  <></>
                )}

                <br />
              </ul>
            );
          })}
        </div>
      </div>
    </div>
  );
}
