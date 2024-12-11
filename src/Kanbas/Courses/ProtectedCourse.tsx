import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
export default function ProtectedCourse({
  children,
  enrolledUsers,
}: {
  children: any;
  enrolledUsers: any[];
}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  console.log(
    'enrolledUsers.id',
    enrolledUsers.map((user) => user._id)
  );

  console.log('currentUser._id: ', currentUser._id);
  if (!currentUser) {
    return <Navigate to="/Kanbas/Account/Signin" />;
  }

  return enrolledUsers.some(
    (user: any) => user && user._id === currentUser._id
  ) ? (
    children
  ) : (
    <Navigate to="/Kanbas/Dashboard" />
  );
}
