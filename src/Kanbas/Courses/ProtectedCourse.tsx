import { useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
export default function ProtectedCourse({ children }: { children: any }) {
  const { cid } = useParams();
  const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  return currentUser.role === 'FACULTY' ||
    enrollments.some(
      (enrollment: any) =>
        enrollment &&
        enrollment.user === currentUser._id &&
        enrollment.course === cid
    )
    ? children
    : <Navigate to="/Kanbas/Dashboard" />;
}
