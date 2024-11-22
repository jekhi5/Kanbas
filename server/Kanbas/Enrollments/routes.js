import * as dao from './dao.js';

export default function EnrollmentRoutes(app) {
    app.get('/api/enrollments', (req, res) => {
        const enrollments = dao.fetchAllEnrollments();
        res.send(enrollments);
    });
}