import ProtectedContent from '../../Account/ProtectedContent';
import Modules from '../Modules';
import CourseStatus from './status';
export default function Home() {
  return (
    <div className="d-flex" id="wd-home">
      <div className="flex-fill">
        <Modules />
      </div>
      <div className="d-none d-md-block">
        <ProtectedContent role="FACULTY">
          <CourseStatus />
        </ProtectedContent>
      </div>
    </div>
  );
}
