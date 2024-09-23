import { Navigate, Route, Routes } from "react-router";
import CoursesNavigation from "./Navigation";
import { useParams } from 'react-router-dom';
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";

export default function Courses() {
    const { cid } = useParams();
    return (
        <div id="wd-courses">
            <h2>Course {cid}</h2>
            <hr />
            <table>
                <tr>
                    <td valign="top">
                        <CoursesNavigation />
                    </td>
                    <td valign="top">
                        <Routes>
                            <Route path="/" element={<Navigate to="Home" />} />
                            <Route path="Home" element={<Home />} />
                            <Route path="Modules" element={<Modules />} />
                            <Route path="Assignments" element={<Assignments />} />
                            <Route path="Assignments/:aid" element={<h2>Assignment Editor</h2>} />
                            <Route path="People" element={<h2>People</h2>} />
                        </Routes>
                    </td>
                </tr>
            </table>
        </div>
    );
}
