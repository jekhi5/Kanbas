import { useLocation, useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { addAssignment, updateAssignment } from './reducer';
export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { assignments } = useSelector((state: any) => state.assignmentReducer);
  const assignment = assignments.find(
    (assignment: any) => assignment._id === aid
  );

  const creatingNewAssignment = pathname.includes('new');

  const [title, setTitle] = useState('');
  const [course, setCourse] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [points, setPoints] = useState('');
  const [description, setDescription] = useState('');
  const [assignmentGroup, setAssignmentGroup] = useState('');
  const [submissionType, setSubmissionType] = useState('');
  const [displayGradeAs, setDisplayGradeAs] = useState('');
  const [onlineEntryOptions, setOnlineEntryOptions] = useState<string[]>([]);
  const [assignTo, setAssignTo] = useState('');
  const [availableUntil, setAvailableUntil] = useState('');

  useEffect(() => {
    if (!creatingNewAssignment && assignment) {
      setTitle(assignment.title);
      setCourse(assignment.course);
      setReleaseDate(assignment.releaseDate);
      setDueDate(assignment.dueDate);
      setPoints(assignment.points);
      setDescription(assignment.description);
      setAssignmentGroup(assignment.assignmentGroup);
      setSubmissionType(assignment.submissionType);
      setDisplayGradeAs(assignment.displayGradeAs);
      setOnlineEntryOptions(assignment.onlineEntryOptions);
      setAssignTo(assignment.assignTo);
      setAvailableUntil(assignment.availableUntil);
    } else {
      setCourse(cid ?? '');
    }
  }, [creatingNewAssignment, assignment, cid]);

  const saveAssignment = () => {
    const newAssignment = {
      title: title.length > 0 ? title : 'Untitled Assignment',
      course,
      releaseDate,
      dueDate,
      points,
      description,
      assignmentGroup,
      submissionType,
      displayGradeAs,
      onlineEntryOptions,
      assignTo,
      availableUntil,
    };

    if (creatingNewAssignment) {
      dispatch(addAssignment(newAssignment));
    } else {
      dispatch(updateAssignment({ ...assignment, ...newAssignment }));
    }
    navigate(`/Kanbas/Courses/${cid}/Assignments`);
  };

  const assignmentGroupOptions = [
    'ASSIGNMENTS',
    'QUIZZES',
    'EXAMS',
    'PROJECTS',
  ];
  const gradeDisplayOptions = ['Percentage', 'Points', 'Letter'];
  const submissionTypeOptions = ['Online', 'In person', 'Gradescope'];
  const onlineSubmissionOptions = [
    'Text Entry',
    'Website URL',
    'Media Recordings',
    'Student Annotation',
    'File Uploads',
  ];

  return !assignment && !creatingNewAssignment ? (
    <div>No assignment found!</div>
  ) : (
    <div id="wd-assignments-editor">
      <div className="mb-4">
        <label htmlFor="textarea1" className="form-label">
          Assignment Name
        </label>
        <textarea
          className="form-control"
          id="wd-name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></textarea>
      </div>
      <textarea
        id="wd-description"
        className="form-control mb-2"
        cols={50}
        rows={8}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <div className="row mb-4">
        <div className="col-3">
          <label htmlFor="wd-points" className="form-label float-end">
            Points
          </label>
        </div>
        <div className="col-7">
          <input
            id="wd-points"
            className="form-control"
            value={points}
            onChange={(e) => setPoints(e.target.value)}
          />
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-3">
          <label htmlFor="wd-group" className="form-label float-end">
            Assignment Group{' '}
          </label>
        </div>
        <div className="col-7">
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
      <div className="row mb-4">
        <div className="col-3">
          <label htmlFor="wd-display-grade-as" className="form-label float-end">
            Display Grade as{' '}
          </label>
        </div>
        <div className="col-7">
          <select
            id="wd-display-grade-as"
            className="form-select"
            value={displayGradeAs}
            onChange={(e) => setDisplayGradeAs(e.target.value)}
          >
            {gradeDisplayOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-3">
          <label htmlFor="wd-submission-type" className="form-label float-end">
            Submission Type{' '}
          </label>
        </div>
        <div className="col-7 border rounded-2 p-3">
          <select
            id="wd-submission-type"
            className="form-select mb-1"
            value={submissionType}
            onChange={(e) => setSubmissionType(e.target.value)}
          >
            {submissionTypeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <b>Online Entry Option</b>
          {onlineSubmissionOptions.map((option) => (
            <div className="form-check my-2" key={option}>
              <input
                id={`wd-${option}`}
                type="checkbox"
                className="form-check-input"
                checked={onlineEntryOptions.includes(option)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setOnlineEntryOptions([...onlineEntryOptions, option]);
                  } else {
                    setOnlineEntryOptions(
                      onlineEntryOptions.filter((o) => o !== option)
                    );
                  }
                }}
              />
              <label htmlFor={`wd-${option}`} className="form-check-label">
                {option}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="row">
        <div className="col-3">
          <label className="form-label float-end">Assign </label>
        </div>
        <div className="col-7 border rounded-2 p-3">
          <div className="mb-2">
            <label htmlFor="wd-assign-to" className="form-label">
              <b>Assign to</b>
            </label>
            <input
              id="wd-assign-to"
              type="text"
              value={assignTo}
              onChange={(e) => setAssignTo(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="wd-due-date" className="form-label">
              <b>Due</b>
            </label>
            <input
              id="wd-due-date"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="row mb-2">
            <div className="col-6">
              <label htmlFor="wd-available-from" className="form-label">
                <b>Available from</b>
              </label>
              <input
                id="wd-available-from"
                type="date"
                value={releaseDate}
                onChange={(e) => setReleaseDate(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="col-6">
              <label htmlFor="wd-available-until" className="form-label">
                <b>Until</b>
              </label>
              <input
                id="wd-available-until"
                type="date"
                value={availableUntil}
                onChange={(e) => setAvailableUntil(e.target.value)}
                className="form-control"
              />
            </div>
          </div>
        </div>
      </div>
      <hr />
      <button onClick={saveAssignment} className="btn btn-danger float-end">
        Save
      </button>
      <Link
        to={`/Kanbas/Courses/${cid}/Assignments`}
        className="btn btn-secondary float-end me-2"
      >
        Cancel
      </Link>
    </div>
  );
}
