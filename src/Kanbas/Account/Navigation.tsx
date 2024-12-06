import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
export default function AccountNavigation() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const links = currentUser ? ['Profile', 'Users'] : ['Signin', 'Signup'];
  const { pathname } = useLocation();

  return (
    <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
      {links.map(
        (link) =>
          (link !== 'Users' ||
            (link === 'Users' &&
              currentUser &&
              currentUser.role === 'ADMIN')) && (
            <Link
              to={`/Kanbas/Account/${link}`}
              className={`list-group-item ${
                pathname.includes(link) ? 'active' : ''
              } border border-0`}
            >
              {' '}
              {link}{' '}
            </Link>
          )
      )}
    </div>
  );
}
