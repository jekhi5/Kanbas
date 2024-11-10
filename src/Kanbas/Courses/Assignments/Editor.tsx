export default function AssignmentEditor() {
    return (
        <div id="wd-assignments-editor">
            <div className="mb-4">
                <label htmlFor="textarea1" className="form-label">Assignment Name</label>
                <textarea className="form-control" id="wd-name" value="A1 - ENV + HTML"></textarea>
            </div>
            <textarea id="wd-description" className="form-control mb-2" cols={50} rows={8}>
                The assignment is available online. Submit a link to the landing page of your Web application running on
                Netlify. The Kanbas application should include a link to navigate back to the landing page.
            </textarea>
            <div className="row mb-4">
                <div className="col-3">
                    <label htmlFor="wd-points" className="form-label float-end">Points</label>
                </div>
                <div className="col-7">
                    <input id="wd-points" className="form-control" value={100} />
                </div>
            </div>
            <div className="row mb-4">
                <div className="col-3">
                    <label htmlFor="wd-group" className="form-label float-end">Assignment Group </label>
                </div>
                <div className="col-7">
                    <select id="wd-group" className="form-select">
                        <option>ASSIGNMENTS</option>
                        <option>QUIZZES</option>
                        <option>EXAMS</option>
                        <option>PROJECTS</option>
                    </select>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col-3">
                    <label htmlFor="wd-display-grade-as" className="form-label float-end">Display Grade as </label>
                </div>
                <div className="col-7">
                    <select id="wd-display-grade-as" className="form-select">
                        <option>Percentage</option>
                        <option>Points</option>
                        <option>Letter</option>
                    </select>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col-3">
                    <label htmlFor="wd-submission-type" className="form-label float-end">Submission Type </label>
                </div>
                <div className="col-7 border rounded-2 p-3">
                    <select id="wd-submission-type" className="form-select mb-1">
                        <option>Online</option>
                        <option>In person</option>
                        <option>Gradescope</option>
                    </select>
                    <b>Online Entry Option</b>
                    <div className="form-check my-2">
                        <input id="wd-text-entry" type="checkbox" className="form-check-input" />
                        <label htmlFor="wd-text-entry" className="form-check-label">Text Entry</label>
                    </div>
                    <div className="form-check my-2">
                        <input id="wd-website-url" type="checkbox" className="form-check-input" />
                        <label htmlFor="wd-website-url" className="form-check-label">Website URL</label>
                    </div>
                    <div className="form-check my-2">
                        <input id="wd-media-recordings" type="checkbox" className="form-check-input" />
                        <label htmlFor="wd-media-recordings" className="form-check-label">Media Recordings</label>
                    </div>
                    <div className="form-check my-2">
                        <input id="wd-student-annotation" type="checkbox" className="form-check-input" />
                        <label htmlFor="wd-student-annotation" className="form-check-label">Student Annotation</label>
                    </div>
                    <div className="form-check my-2">
                        <input id="wd-file-upload" type="checkbox" className="form-check-input" />
                        <label htmlFor="wd-file-upload" className="form-check-label">File Uploads</label>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-3">
                    <label className="form-label float-end">Assign </label>
                </div>
                <div className="col-7 border rounded-2 p-3">
                    <div className="mb-2">
                        <label htmlFor="wd-assign-to" className="form-label"><b>Assign to</b></label>
                        <input id="wd-assign-to" type="text" value="Everyone" className="form-control" />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="wd-due-date" className="form-label"><b>Due</b></label>
                        <input id="wd-due-date" type="date" value="2024-05-13" className="form-control" />
                    </div>
                    <div className="row mb-2">
                        <div className="col-6">
                            <label htmlFor="wd-available-from" className="form-label"><b>Available from</b></label>
                            <input id="wd-available-from" type="date" value="2024-05-06" className="form-control" />
                        </div>
                        <div className="col-6">
                            <label htmlFor="wd-available-until" className="form-label"><b>Until</b></label>
                            <input id="wd-available-until" type="date" value="2024-05-20" className="form-control" />
                        </div>
                    </div>
                </div>

            </div>
            <hr />
            <button className="btn btn-danger float-end">Save</button>
            <button className="btn btn-secondary float-end me-2">Cancel</button>



        </div >
    );
}
