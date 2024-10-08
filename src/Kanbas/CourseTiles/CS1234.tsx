import { Link } from "react-router-dom";

export default function CS1234() {
    return (
        <div className="wd-dashboard-course col" style={{ width: "260px" }}>
            <div className="card rounded-3 overflow-hidden">
                <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                    to="/Kanbas/Courses/1234/Home">
                    <img src={require("../../public/images/reactjs.jpg")} alt="react logo" width="100%" height={160} />
                    <div className="card-body">
                        <h5 className="wd-dashboard-course-title card-title">
                            CS1234 React JS
                        </h5>
                        <p className="wd-dashboard-course-title card-text">
                            Full Stack software developer
                        </p>
                        <button className="btn btn-primary"> Go </button>
                    </div>
                </Link>
            </div>
        </div>
    );
}