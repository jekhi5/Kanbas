export default function AssignmentEditor() {
    return (
        <div id="wd-assignments-editor">
            <label htmlFor="wd-name"><h3>Assignment Name</h3></label>
            <input id="wd-name" value="A1 - ENV + HTML" /><br /><br />
            <textarea id="wd-description" cols={50} rows={8}>
                The assignment is available online Submit a link to the landing page of your Web application running on Netlify. The landing page should include the following: Your full name and section Links to each of the lab assignments Link to the Kanbas application Links to all relevant source code repositories The Kanbas application should include a link to navigate back to the landing page.
            </textarea>
            <br />
            <br />
            <table>
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-points">Points</label>
                    </td>
                    <td>
                        <input id="wd-points" value={100} />
                    </td>
                </tr>
                <br />
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-group">Assignment Group </label>
                    </td>
                    <td>
                        <select id="wd-group">
                            <option>ASSIGNMENTS</option>
                            <option>QUIZZES</option>
                            <option>EXAMS</option>
                            <option>PROJECTS</option>
                        </select>
                    </td>
                </tr>
                <br />
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-display-grade-as">Display Grade as </label>
                    </td>
                    <td>
                        <select id="wd-display-grade-as">
                            <option>Percentage</option>
                            <option>Points</option>
                            <option>Letter</option>
                        </select>
                    </td>
                </tr>
                <br />
                <tr>
                    <td align="right">
                        <label htmlFor="wd-submission-type">Submission Type </label>
                    </td>
                    <td>
                        <select id="wd-submission-type">
                            <option>Online</option>
                            <option>In person</option>
                            <option>Gradescope</option>
                        </select>
                    </td>
                </tr>
                <br />
                <tr>
                    <td></td>
                    <td align="left" valign="top">
                        Online Entry Option
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td align="left">
                        <input id="wd-text-entry" type="checkbox" />
                        <label htmlFor="wd-text-entry">Text Entry</label>
                        <br />
                        <input id="wd-website-url" type="checkbox" />
                        <label htmlFor="wd-website-url">Website URL</label>
                        <br />
                        <input id="wd-media-recordings" type="checkbox" />
                        <label htmlFor="wd-media-recordings">Media Recordings</label>
                        <br />
                        <input id="wd-student-annotation" type="checkbox" />
                        <label htmlFor="wd-student-annotation">Student Annotation</label>
                        <br />
                        <input id="wd-file-upload" type="checkbox" />
                        <label htmlFor="wd-file-upload">File Uploads</label>
                    </td>
                </tr>
                <br />
                <tr>
                    <td align="right" valign="top">
                        <label>Assign </label>
                    </td>
                    <td>
                        <label htmlFor="wd-assign-to">Assign to</label>
                        <br />
                        <input id="wd-assign-to" type="text" value="Everyone" />
                        <br />
                        <br />
                        <label htmlFor="wd-due-date">Due</label>
                        <br />
                        <input id="wd-due-date" type="date" value="2024-05-13" />
                    </td>
                </tr>
                <br />
                <tr>
                    <td></td>
                    <td>
                        <label htmlFor="wd-available-from">Available from</label>
                        <br />
                        <input id="wd-available-from" type="date" value="2024-05-06" />
                    </td>
                    <td>
                        <label htmlFor="wd-available-until">Until</label>
                        <br />
                        <input id="wd-available-until" type="date" value="2024-05-20" />
                    </td>
                </tr>
                <tr>
                    <td colSpan={3}>
                        <hr />
                    </td>
                </tr>
                <tr>
                    <td colSpan={3} align="right">
                        <button>Cancel</button>
                        <button>Save</button>
                    </td>
                </tr>
            </table>
        </div>
    );
}
