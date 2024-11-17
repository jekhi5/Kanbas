import { BsGripVertical } from 'react-icons/bs';
import AssignmentsControls from './AssignmentsControls';
import AssignmentControlButtons from './AssignmentControlButton';
import AssignmentHeadingControlButtons from './AssignmentHeadingControlButtons';
import { PiNotePencilDuotone } from 'react-icons/pi';
import { IoIosArrowDown } from 'react-icons/io';
import { useParams } from 'react-router';
import { format } from 'date-fns';
import ProtectedContent from '../../Account/ProtectedContent';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAssignment } from './reducer';
import { FaTrash } from 'react-icons/fa';
import DeleteAssignmentModal from './DeleteAssignmentModal';
import { useState } from 'react';

export default function Assignments() {
  const { cid } = useParams();
  const { assignments } = useSelector((state: any) => state.assignmentReducer);
  const dispatch = useDispatch();
  const [assignmentToDelete, setAssignmentToDelete] = useState({
    _id: '',
    title: '',
  });

  const todaysDate = new Date().setHours(0, 0, 0, 0);

  return (
    <div>
      <ProtectedContent role="FACULTY">
        <AssignmentsControls />
      </ProtectedContent>
      <ul id="wd-assignment-list" className="list-group rounded-0">
        <li className="wd-assignment list-group-item p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <ProtectedContent role="FACULTY">
              <BsGripVertical className="me-2 fs-3" />
            </ProtectedContent>
            <IoIosArrowDown />
            <span className="px-3">
              <b>ASSIGNMENTS</b>
            </span>
            <ProtectedContent role="FACULTY">
              <AssignmentHeadingControlButtons />
            </ProtectedContent>
            <div className="float-end">
              <span className="border border-dark p-2 rounded-5">
                40% of Total
              </span>
            </div>
          </div>
          <ul className="wd-lessons list-group rounded-0">
            {assignments
              .filter((assignment: any) => assignment.course === cid)
              .map((assignment: any) => (
                <li className="wd-assignment-list-item list-group-item p-3 ps-1 py-0">
                  <div className="d-flex mb-3">
                    <div className="p-2 my-auto flex-shrink-0">
                      <ProtectedContent role="FACULTY">
                        <BsGripVertical className="me-2 fs-3" />
                      </ProtectedContent>
                      <PiNotePencilDuotone className="me-2 fs-5" />
                    </div>
                    <div className="p-2 my-auto">
                      <h3>
                        <ProtectedContent role="FACULTY">
                          <a
                            className="wd-assignment-link text-dark text-decoration-none"
                            href={`#/Kanbas/Courses/${cid}/Assignments/${assignment._id}`}
                          >
                            {assignment.title}
                          </a>
                        </ProtectedContent>

                        <ProtectedContent role="STUDENT">
                          {assignment.title}
                        </ProtectedContent>
                      </h3>
                      <span className="text-danger"> Multiple Modules </span>{' '}
                      {assignment.releaseDate &&
                      Date.parse(assignment.releaseDate.replace(/-/g, ' ')) >
                        todaysDate ? (
                        <span>
                          {' '}
                          | <b>Not Available until </b>
                          {format(
                            assignment.releaseDate,
                            "MMMM d 'at' hh:mma"
                          ) + ' |'}
                        </span>
                      ) : (
                        ''
                      )}{' '}
                      {assignment.dueDate && (
                        <span>
                          {' '}
                          | <b>Due</b>{' '}
                          {format(assignment.dueDate, "MMMM d 'at' hh:mma")}
                        </span>
                      )}
                      {assignment.points && (
                        <span> | {assignment.points} pts</span>
                      )}
                    </div>
                    <div className="ms-auto p-2 my-auto flex-shrink-0">
                      <ProtectedContent role="FACULTY">
                        <div className="d-flex align-items-center">
                          <AssignmentControlButtons />
                          <FaTrash
                            className="text-danger me-1"
                            id="wd-delete-assignment-btn"
                            data-bs-toggle="modal"
                            data-bs-target="#wd-delete-assignment-dialog"
                            onClick={() => setAssignmentToDelete(assignment)}
                          />
                        </div>
                        <DeleteAssignmentModal
                          assignmentTitle={assignmentToDelete.title}
                          deleteAssignment={() =>
                            dispatch(deleteAssignment(assignmentToDelete._id))
                          }
                        />
                      </ProtectedContent>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </li>
      </ul>
    </div>
  );
}
