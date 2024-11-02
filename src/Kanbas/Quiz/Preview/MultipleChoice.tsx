export default function MultipleChoice() {
    return (
        <div className="mb-3 ps-3 ps-1">
            <hr />
            <input type="radio" name="radio-multiple-choice" className="ps-3 me-2" id="wd-true" />
            <label>True</label><br />
            <hr />
            <input type="radio" name="radio-multiple-choice" className="ps-3 me-2" id="wd-false" />
            <label>False</label><br />
        </div>
    );
}