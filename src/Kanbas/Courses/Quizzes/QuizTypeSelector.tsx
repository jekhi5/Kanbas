import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';

const QuizTypeSelector = () => {
  const { qid } = useParams();

  // Find the quiz based on the qid
  const { quizzes } = useSelector((state: any) => state.quizReducer);
  const quiz = quizzes.find((quiz: any) => quiz._id === qid);

  // Use useEffect to set the state based on quiz
  const [selectedQuizType, setSelectedQuizType] = useState('');

  useEffect(() => {
    // Set the selected quiz type if quiz is found
    if (quiz) {
      setSelectedQuizType(quiz.quizType || '');
    }
  }, [quiz]);

  // Handle change event for the dropdown
  const handleQuizTypeChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSelectedQuizType(event.target.value);
    // Update quiz.quizType or perform other actions as needed
    // e.g., quiz.quizType = event.target.value; // Update if directly modifying
  };

  return (
    <div className="mb-4">
      <select
        id="quiz-type"
        className="form-select"
        value={selectedQuizType}
        onChange={handleQuizTypeChange}
      >
        <option value="">Choose a quiz type</option>
        <option value="multiple-choice">Multiple Choice</option>
        <option value="true-false">True/False</option>
        <option value="short-answer">Short Answer</option>
        {/* Add more options as needed */}
      </select>
    </div>
  );
};

export default QuizTypeSelector;
