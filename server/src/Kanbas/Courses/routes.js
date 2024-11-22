import { Express } from 'express-serve-static-core';
import { Request, Response } from 'express';
import * as dao from './dao.js';
export default function CourseRoutes(app) {
  app.get('/api/courses', (req, res) => {
    const courses = dao.findAllCourses();
    res.send(courses);
  });
}
