import { useLocation } from 'react-router';
export default function TOC() {
  const { pathname } = useLocation();
  const labs = ['Lab1', 'Lab2', 'Lab3', 'Lab4', 'Lab5'];
  return (
    <ul className="nav nav-pills">
      <li className="nav-item">
        <a id="wd-a" href="#/Labs" className="nav-link">
          Labs
        </a>
      </li>
      {labs.map((lab) => (
        <li key={lab} className="nav-item">
          <a
            id={`wd-a${lab}`}
            href={`#/Labs/${lab}`}
            className={`nav-link ${pathname.includes(lab) ? 'active' : ''}`}
          >
            {lab}
          </a>
        </li>
      ))}
      <li className="nav-item">
        <a id="wd-k" href="#/Kanbas" className="nav-link">
          Kanbas
        </a>
      </li>
      <li className="nav-item">
        <a
          id="wd-github"
          href="https://github.com/jekhi5/kanbas-react-web-app-cs4550-f24/"
          className="nav-link"
        >
          Web App Repo
        </a>
      </li>
      <li className="nav-item">
        <a
          id="wd-github"
          href="https://github.com/jekhi5/kanbas-node-server-app"
          className="nav-link"
        >
          Server Repo
        </a>
      </li>
      <li className="nav-item">
        <a
          id="wd-github"
          href="https://kanbas-node-server-app-5fv0.onrender.com"
          className="nav-link"
        >
          Root of Server
        </a>
      </li>
    </ul>
  );
}
