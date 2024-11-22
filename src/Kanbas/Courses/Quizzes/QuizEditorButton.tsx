import { FaPen } from "react-icons/fa";
export default function QuizEditorButton() {
    return (
        <div className="float-end d-flex align-items-center">
            <FaPen className="fs-8 me-2" />
            <p className="mb-0">Edit</p>
        </div>
    );
}