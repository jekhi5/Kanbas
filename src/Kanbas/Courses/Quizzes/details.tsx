import { useParams } from 'react-router';
import { quizzes } from '../../Database';
import { Link } from 'react-router-dom';
import QuizEditorButton from './QuizEditorButton';
export default function QuizDetails() {
  const { cid, qid } = useParams();
  const quiz = quizzes.find((quiz: any) => quiz._id === qid);
  return !quiz ? (
    <div>No quiz found!</div>
  ) : (
    <div id="wd-quiz-details-page">
      <div className="d-flex justify-content-center mb-4">
        <Link
          to={`/Kanbas/Courses/${cid}/quizzes/${qid}/preview`}
          className="btn btn-secondary me-2"
        >
          Preview
        </Link>
        <Link
          to={`/Kanbas/Courses/${cid}/quizzes/${qid}/edit`}
          className="btn btn-secondary"
        >
          <QuizEditorButton />
        </Link>
      </div>

      <hr />

      <h2 id="wd-quiz-title" className="mb-4">
        {quiz.title}
      </h2>

      <table className="table table-borderless" style={{ width: '33%' }}>
        <tbody>
          <tr>
            <td className="fw-bold text-end">Quiz Type</td>
            <td className="text-start">{quiz.quizType ?? 'Unknown'}</td>
          </tr>
          <tr>
            <td className="fw-bold text-end">Points</td>
            <td className="text-start">{quiz.points ?? 'Unknown'}</td>
          </tr>
          <tr>
            <td className="fw-bold text-end">Assignment Group</td>
            <td className="text-start">{quiz.assignmentGroup ?? 'Unknown'}</td>
          </tr>
          <tr>
            <td className="fw-bold text-end">Shuffle Answers</td>
            <td className="text-start">{quiz.shuffleAnswers ?? 'Unknown'}</td>
          </tr>
          <tr>
            <td className="fw-bold text-end">Time Limit</td>
            <td className="text-start">
              {quiz.timeLimitInMinutes
                ? `${quiz.timeLimitInMinutes} Minutes`
                : 'Unknown'}
            </td>
          </tr>
          <tr>
            <td className="fw-bold text-end">Multiple Attempts</td>
            <td className="text-start">
              {quiz.multipleAttempts ? 'Yes' : 'No'}
            </td>
          </tr>
          <tr>
            <td className="fw-bold text-end">View Responses</td>
            <td className="text-start">{quiz.viewResponses ?? 'Unknown'}</td>
          </tr>
          <tr>
            <td className="fw-bold text-end">Show Correct Answers</td>
            <td className="text-start">
              {quiz.showCorrectAnswers ?? 'Unknown'}
            </td>
          </tr>
          <tr>
            <td className="fw-bold text-end">One Question at a Time</td>
            <td className="text-start">
              {quiz.oneQuestionAtATime ? 'Yes' : 'No'}
            </td>
          </tr>
          <tr>
            <td className="fw-bold text-end">
              Require Respondus LockDown Browser
            </td>
            <td className="text-start">
              {quiz.requireLockdownBrowser ? 'Yes' : 'No'}
            </td>
          </tr>
          <tr>
            <td className="fw-bold text-end">Required to View Quiz Results</td>
            <td className="text-start">
              {quiz.requireToViewResults ? 'Yes' : 'No'}
            </td>
          </tr>
          <tr>
            <td className="fw-bold text-end">Webcam Required</td>
            <td className="text-start">{quiz.requireWebcam ? 'Yes' : 'No'}</td>
          </tr>
          <tr>
            <td className="fw-bold text-end">Lock Questions After Answering</td>
            <td className="text-start">
              {quiz.lockAfterAnswering ? 'Yes' : 'No'}
            </td>
          </tr>
        </tbody>
      </table>

      <table id="quiz-detail-table" className="table">
        <thead>
          <tr>
            <th scope="col">Due</th>
            <th scope="col">For</th>
            <th scope="col">Available from</th>
            <th scope="col">Until</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{quiz.dueDate}</td>
            <td>{quiz.assignTo}</td>
            <td>{quiz.releaseDate}</td>
            <td>{quiz.availableUntil}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
