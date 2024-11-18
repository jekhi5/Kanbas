import LessonControlButtons from './LessonControlButtons';
import ModuleControlButtons from './ModuleControlButtons';
import ModulesControls from './ModulesControls';
import { BsGripVertical } from 'react-icons/bs';
import { useParams } from 'react-router';
import { useState } from 'react';
import { addModule, editModule, updateModule, deleteModule } from './reducer';
import { useSelector, useDispatch } from 'react-redux';
import ProtectedContent from '../../Account/ProtectedContent';
export default function Modules() {
  const { cid } = useParams();
  const [moduleName, setModuleName] = useState('');
  const { modules } = useSelector((state: any) => state.modulesReducer);
  const dispatch = useDispatch();

  return (
    <div>
      <ProtectedContent role="FACULTY">
        <ModulesControls
          setModuleName={setModuleName}
          moduleName={moduleName}
          addModule={() => {
            dispatch(addModule({ name: moduleName, course: cid }));
            setModuleName('');
          }}
        />{' '}
        <br />
        <br />
        <br />
        <br />
      </ProtectedContent>
      <ul id="wd-modules" className="list-group rounded-0">
        {modules
          .filter((module: any) => module.course === cid)
          .map((module: any) => (
            <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
              <div className="wd-title p-3 ps-2 bg-secondary">
                <ProtectedContent role="FACULTY">
                  <BsGripVertical className="me-2 fs-3" />
                  {!module.editing && module.name}
                  {module.editing && (
                    <input
                      className="form-control w-50 d-inline-block"
                      onChange={(e) =>
                        dispatch(
                          updateModule({ ...module, name: e.target.value })
                        )
                      }
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          dispatch(updateModule({ ...module, editing: false }));
                        }
                      }}
                      value={module.name}
                    />
                  )}
                  <ModuleControlButtons
                    moduleId={module._id}
                    deleteModule={(moduleId) => {
                      dispatch(deleteModule(moduleId));
                    }}
                    editModule={(moduleId) => dispatch(editModule(moduleId))}
                  />
                </ProtectedContent>

                <ProtectedContent role="STUDENT">
                  {module.name}
                </ProtectedContent>
              </div>
              {module.lessons && (
                <ul className="wd-lessons list-group rounded-0">
                  {module.lessons.map((lesson: any) => (
                    <li className="wd-lesson list-group-item p-3 ps-1">
                      <div className="wd-title">
                        <ProtectedContent role="FACULTY">
                          <BsGripVertical className="me-2 fs-3" />
                        </ProtectedContent>
                        {lesson.name}
                        <ProtectedContent role="FACULTY">
                          <LessonControlButtons />
                        </ProtectedContent>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
}