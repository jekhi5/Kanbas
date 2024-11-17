import { useSelector } from 'react-redux';
export default function ProtectedContent({
  children,
  role,
}: {
  children: any;
  role: string;
}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  if (currentUser.role && currentUser.role === role) {
    return children;
  } else {
    return <></>;
  }
}
