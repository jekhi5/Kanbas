import * as assignmentsDao from "./dao.js";
export default function AssignmentsRoutes(app) {
    app.delete("/api/assignments/:assignmentId", async (req, res) => {
        const { assignmentId } = req.params;
        const status = await assignmentsDao.deleteAssignment(assignmentId);
        res.send(status);
    });
}