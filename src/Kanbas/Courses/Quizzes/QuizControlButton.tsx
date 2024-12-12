import { IoEllipsisVertical } from 'react-icons/io5';
import GreenCheckmark from '../GreenCheckmark';
import { useParams } from 'react-router';
import { deleteQuiz, updateQuiz } from './client';
import { BsSignDoNotEnter } from 'react-icons/bs';
export default function QuizControlButtons({
  quiz,
  fetchQuizzes,
}: {
  quiz: any;
  fetchQuizzes: () => void;
}) {
  const { cid } = useParams();
  return (
    <div className="float-end">
      {quiz.isPublished ? <GreenCheckmark /> : <BsSignDoNotEnter />}
      <div className="dropdown d-inline me-1 float-end">
        <button
          id="wd-publish-all-btn"
          className="btn btn-lg btn-secondary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
        >
          <IoEllipsisVertical className="fs-4" />
        </button>
        <ul className="dropdown-menu">
          <li>
            <a
              id="wd-edit-button"
              className="dropdown-item"
              href={`Kanbas/Courses/${cid}/Quizzes/${quiz._id}/edit`}
            >
              Edit
            </a>
          </li>
          <li>
            <button
              id="wd-publish-modules-only-button"
              className="dropdown-item"
              onClick={() => deleteQuiz(quiz._id)}
            >
              Delete
            </button>
          </li>
          <li>
            <button
              id="wd-unpublish-all-modules-and-items"
              className="dropdown-item"
              onClick={() => {
                updateQuiz({ ...quiz, isPublished: !quiz.isPublished });
                fetchQuizzes();
              }}
            >
              {quiz.isPublished ? 'Unpublish' : 'Publish'}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
