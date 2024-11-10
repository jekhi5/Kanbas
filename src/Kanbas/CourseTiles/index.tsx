import CS1234 from "./CS1234";
import CS2500 from "./CS2500";
import CS3000 from "./CS3000";
import CS3500 from "./CS3500";
import CS4550 from "./CS4550";
import ENGW1115 from "./ENGW1115";
import MUSC1112 from "./MUSC1112";

export default function Courses() {
    return (
        <div id="wd-dashboard-courses" className="row">
            <div className="row row-cols-1 row-cols-md-5 g-4">
                <CS1234 />
                <br />
                <CS2500 />
                <br />
                <CS3000 />
                <br />
                <CS3500 />
                <br />
                <CS4550 />
                <br />
                <MUSC1112 />
                <br />
                <ENGW1115 />
            </div>
        </div>
    );
}