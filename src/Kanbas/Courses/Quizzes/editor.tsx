import { format } from 'date-fns';
import { SetStateAction, useEffect, useState } from 'react';
import ThreeDotsElement from './ThreeDotsElement';
import NotPublishedElement from './NotPublishedElement';
import { useLocation, useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import * as coursesClient from '../client';
import * as quizzesClient from './client';
import { addQuiz, updateQuiz } from './reducer';
import { Link } from 'react-router-dom';
import Questions from './Questions';

export default function QuizEditor() {
  const { cid, qid } = useParams();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { quizzes } = useSelector((state: any) => state.quizReducer);
  const quiz = quizzes.find((quiz: any) => quiz._id === qid);

  const creatingNewQuiz = pathname.includes('new');

  const [title, setTitle] = useState('Untitled Quiz');
  const [course, setCourse] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [points, setPoints] = useState('');
  const [quizType, setQuizType] = useState('Graded');
  const [description, setDescription] = useState('');
  const [shuffleAnswers, setShuffleAnswers] = useState(false);
  const [submissionType, setSubmissionType] = useState('Online');
  const [displayGradeAs, setDisplayGradeAs] = useState('Percentage');
  const [onlineEntryOptions, setOnlineEntryOptions] = useState([]);
  const [assignTo, setAssignTo] = useState('Everyone');
  const [availableUntil, setAvailableUntil] = useState('');
  const [assignmentGroup, setAssignmentGroup] = useState('');
  const [requireTimeLimit, setRequireTimeLimit] = useState(false);
  const [timeLimitInMinutes, setTimeLimitInMinutes] = useState(Infinity);
  const [multipleAttempts, setMultipleAttempts] = useState(false);
  const [numberOfAllowedAttempts, setNumberOfAllowedAttempts] = useState(1);
  const [viewResponses, setViewResponses] = useState(false);
  const [showCorrectAnswers, setShowCorrectAnswers] = useState(false);
  const [oneQuestionAtATime, setOneQuestionAtATime] = useState(false);
  const [requireLockdownBrowser, setRequireLockdownBrowser] = useState(false);
  const [requireToViewResults, setRequireToViewResults] = useState(false);
  const [requireWebcam, setRequireWebcam] = useState(false);
  const [lockAfterAnswering, setLockAfterAnswering] = useState(false);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    if (!creatingNewQuiz && quiz) {
      setTitle(quiz.title);
      setCourse(quiz.course);
      setReleaseDate(quiz.releaseDate);
      setDueDate(quiz.dueDate);
      setPoints(quiz.points);
      setQuizType(quiz.quizType);
      setDescription(quiz.description);
      setShuffleAnswers(quiz.shuffleAnswers);
      setSubmissionType(quiz.submissionType);
      setDisplayGradeAs(quiz.displayGradeAs);
      setOnlineEntryOptions(quiz.onlineEntryOptions);
      setAssignTo(quiz.assignTo);
      setAvailableUntil(quiz.availableUntil);
      setAssignmentGroup(quiz.assignmentGroup);
      setRequireTimeLimit(quiz.requireTimeLimit);
      setTimeLimitInMinutes(quiz.timeLimitInMinutes);
      setMultipleAttempts(quiz.multipleAttempts);
      setNumberOfAllowedAttempts(quiz.numberOfAllowedAttempts);
      setViewResponses(quiz.viewResponses);
      setShowCorrectAnswers(quiz.showCorrectAnswers);
      setOneQuestionAtATime(quiz.oneQuestionAtATime);
      setRequireLockdownBrowser(quiz.requireLockdownBrowser);
      setRequireToViewResults(quiz.requireToViewResults);
      setRequireWebcam(quiz.requireWebcam);
      setLockAfterAnswering(quiz.lockAfterAnswering);
      setQuestions(quiz.questions);
    } else {
      setCourse(cid ?? '');
    }
  }, [creatingNewQuiz, quiz, cid]);

  const saveQuiz = async () => {
    const newQuiz = {
      title: title.length > 0 ? title : 'Untitled Assignment',
      course,
      releaseDate,
      dueDate,
      points,
      quizType,
      description,
      shuffleAnswers,
      submissionType,
      displayGradeAs,
      onlineEntryOptions,
      assignTo,
      availableUntil,
      assignmentGroup,
      requireTimeLimit,
      timeLimitInMinutes,
      multipleAttempts,
      numberOfAllowedAttempts,
      viewResponses,
      showCorrectAnswers,
      oneQuestionAtATime,
      requireLockdownBrowser,
      requireToViewResults,
      requireWebcam,
      lockAfterAnswering,
      questions,
    };

    if (creatingNewQuiz) {
      if (!cid) return;
      const quiz = await coursesClient.createQuizForCourse(cid, newQuiz);
      dispatch(addQuiz(quiz));
    } else {
      const updatedQuiz = {
        ...quiz,
        ...newQuiz,
      };
      await quizzesClient.updateQuiz(updatedQuiz);
      dispatch(updateQuiz(updatedQuiz));
    }
    navigate(`/Kanbas/Courses/${cid}/Quizzes`);
  };

  const quizTypeOptions = [
    'Graded Quiz',
    'Ungraded Quiz',
    'Graded Survey',
    'Ungraded Survey',
  ];

  const assignmentGroupOptions = [
    'Quizzes',
    'Exams',
    'Assignments',
    'Projects',
  ];

  // Tab management
  const [activeTab, setActiveTab] = useState('details');
  const switchTab = (tab: SetStateAction<string>) => setActiveTab(tab);

  return !quiz && !creatingNewQuiz ? (
    <div>No quiz found!</div>
  ) : (
    <div id="wd-quiz-editor" className="container p-4">
      <>
        <div className="row mb-1 justify-content-end">
          <div className="col-auto">
            <h4 className="mb-0">Points</h4>
          </div>
          <div className="col-auto">
            <h4 className="mb-0">{points}</h4>
          </div>
          <div className="col-auto">
            <h6 className="mb-0">
              <NotPublishedElement /> <ThreeDotsElement />{' '}
            </h6>
          </div>
        </div>
        <hr />
        <div className="row mb-3">
          <div className="col-auto">
            <button
              className={`btn ${
                activeTab === 'details' ? 'btn-danger' : 'btn-outline-secondary'
              }`}
              onClick={() => switchTab('details')}
            >
              Details
            </button>
          </div>
          <div className="col-auto">
            <button
              className={`btn ${
                activeTab === 'questions'
                  ? 'btn-danger'
                  : 'btn-outline-secondary'
              }`}
              onClick={() => switchTab('questions')}
            >
              Questions
            </button>
          </div>
        </div>
        <hr />
        {activeTab === 'details' ? (
          <>
            <div className="row mb-3">
              <div className="col-6">
                <input
                  id="wd-quiz-title"
                  placeholder="Name"
                  className="form-control narrow-box"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            </div>
            <div className="row mb-3 col-6">
              <div className="col-6">Quiz Instrunctions</div>
            </div>
            <div className="row mb-4">
              <div className="col-8">
                <textarea
                  id="wd-quiz-description"
                  className="form-control narrow-box tall-box"
                  onChange={(e) => setDescription(e.target.value)}
                >
                  {description}
                </textarea>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-2 d-flex justify-content-end">
                <label htmlFor="wd-quiz-type">Quiz Type</label>
              </div>
              <div className="col-md-3 d-flex justify-content-end">
                <select
                  id="wd-group"
                  className="form-select"
                  value={quizType}
                  onChange={(e) => setQuizType(e.target.value)}
                >
                  {quizTypeOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-2 d-flex justify-content-end">
                <label htmlFor="wd-quiz-points">Points</label>
              </div>
              <div className="col-md-2 d-flex justify-content-end">
                <input
                  id="wd-quiz-points"
                  placeholder="Points"
                  className="form-control narrow-box"
                  onChange={(e) => setPoints(e.target.value)}
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-2 d-flex justify-content-end">
                <label htmlFor="wd-quiz-group">Assignment Group</label>
              </div>
              <div className="col-md-3 d-flex justify-content-end">
                <select
                  id="wd-group"
                  className="form-select"
                  value={assignmentGroup}
                  onChange={(e) => setAssignmentGroup(e.target.value)}
                >
                  {assignmentGroupOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-2 d-flex justify-content-end"> </div>
              <div className="col-md-3 d-flex flex-column align-items">
                <div className="mb-3 fw-bold">Options</div>
                <div className="border rounded-2 p-3" style={{ width: '133%' }}>
                  <div className="row mb-3 align-items-center">
                    <div className="col-md-1">
                      <input
                        type="checkbox"
                        id="wd-shuffle-answers"
                        className="form-check-input"
                        checked={shuffleAnswers.toString() === 'true'}
                        onChange={(e) => setShuffleAnswers(e.target.checked)}
                      />
                    </div>
                    <div className="col">
                      <label
                        htmlFor="wd-shuffle-answers"
                        className="form-label"
                      >
                        Shuffle Answers
                      </label>
                    </div>
                  </div>

                  <div className="row mb-3 align-items-center">
                    <div className="col-md-1">
                      <input
                        type="checkbox"
                        id="wd-require-time-limit"
                        className="form-check-input"
                        checked={requireTimeLimit.toString() === 'true'}
                        value={timeLimitInMinutes}
                        onChange={(e) => {
                          const willRequireTimeLimit = !requireTimeLimit;
                          setRequireTimeLimit(e.target.checked);
                          if (!willRequireTimeLimit) {
                            setTimeLimitInMinutes(Infinity);
                          }
                        }}
                      />
                    </div>
                    <div className="col">
                      <label
                        htmlFor="wd-require-time-limit"
                        className="form-label"
                      >
                        Set Time Limit
                      </label>
                    </div>
                  </div>

                  {requireTimeLimit.toString() === 'true' && (
                    <div className="row mb-3 align-items-center">
                      <div className="col-md-auto">
                        <label
                          htmlFor="wd-time-limit"
                          className="form-label me-3"
                        >
                          Time Limit In Minutes:
                        </label>
                      </div>
                      <div className="col">
                        <input
                          type="number"
                          id="wd-time-limit-minutes"
                          className="form-control"
                          value={timeLimitInMinutes}
                          onChange={(e) => {
                            try {
                              setTimeLimitInMinutes(parseInt(e.target.value));
                            } catch {
                              setTimeLimitInMinutes(Infinity);
                            }
                          }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="row mb-3 align-items-center">
                    <div className="col-md-1">
                      <input
                        type="checkbox"
                        id="wd-multiple-attempts"
                        className="form-check-input"
                        checked={multipleAttempts.toString() === 'true'}
                        onChange={(e) => {
                          const allowMultipleAttempts = !multipleAttempts;
                          setMultipleAttempts(e.target.checked);
                          if (!allowMultipleAttempts) {
                            setNumberOfAllowedAttempts(1);
                          }
                        }}
                      />
                    </div>
                    <div className="col">
                      <label
                        htmlFor="wd-multiple-attempts"
                        className="form-label"
                      >
                        Allow Multiple Attempts
                      </label>
                    </div>
                  </div>

                  {multipleAttempts.toString() === 'true' && (
                    <div className="row mb-3 align-items-center">
                      <div className="col-md-auto">
                        <label
                          htmlFor="wd-attempts"
                          className="form-label me-3"
                        >
                          Number of Allowed Attempts:
                        </label>
                      </div>
                      <div className="col">
                        <input
                          type="number"
                          id="wd-numberOfAttempts"
                          className="form-control"
                          value={numberOfAllowedAttempts}
                          onChange={(e) => {
                            try {
                              setNumberOfAllowedAttempts(
                                parseInt(e.target.value)
                              );
                            } catch {
                              setNumberOfAllowedAttempts(1);
                            }
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-2 d-flex justify-content-end">
                <label htmlFor="wd-assign">Assign</label>
              </div>
              <div className="col-md-4 border p-3 rounded">
                <label htmlFor="wd-assign-to">
                  <strong>Assign To</strong>
                </label>
                <input
                  id="wd-assign-to"
                  className="form-control mb-3"
                  onChange={(e) => setAssignTo(e.target.value)}
                />

                <label htmlFor="wd-due">Due</label>
                <input
                  type="date"
                  id="wd-due-date"
                  value={dueDate}
                  className="form-control mb-3"
                  onChange={(e) => setDueDate(e.target.value)}
                />

                <div className="row">
                  <div className="col-md-6">
                    <label htmlFor="wd-available-from">Available from</label>
                    <input
                      type="date"
                      id="wd-available-from"
                      value={releaseDate}
                      className="form-control"
                      onChange={(e) => setReleaseDate(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="wd-available-until">Until</label>
                    <input
                      type="date"
                      id="wd-available-until"
                      value={availableUntil}
                      className="form-control"
                      onChange={(e) => setAvailableUntil(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className="row justify-content-center">
              <div className="col-auto">
                <Link
                  to={`/Kanbas/Courses/${cid}/Quizzes`}
                  className="btn btn-secondary float-end me-2"
                >
                  Cancel
                </Link>
              </div>
              <div className="col-auto">
                <button
                  onClick={saveQuiz}
                  id="wd-questions-save"
                  className="btn btn-danger"
                >
                  Save
                </button>
              </div>
            </div>
            <hr />
          </>
        ) : (
          <>
            <div className="row mb-3">
              <div className="col">
                <button id="wd-new-question" className="btn btn-secondary">
                  + New Question
                </button>
                <div className="col">
                  <Questions
                    questions={questions}
                    setQuestions={setQuestions}
                  />
                </div>
              </div>
            </div>
            <hr />
            <div className="row justify-content-center">
              <div className="col-auto">
                <Link
                  to={`/Kanbas/Courses/${cid}/Quizzes`}
                  className="btn btn-secondary float-end me-2"
                >
                  Cancel
                </Link>
              </div>
              <div className="col-auto">
                <button
                  onClick={saveQuiz}
                  id="wd-questions-save"
                  className="btn btn-danger"
                >
                  Save
                </button>
              </div>
            </div>
            <hr />
          </>
        )}
      </>
    </div>
  );
}
