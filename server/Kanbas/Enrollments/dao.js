import Database from '../Database/index.js';
export function enrollUserInCourse(userId, courseId) {
  const { enrollments } = Database;
  enrollments.push({
    _id: Date.now().toString(),
    user: userId,
    course: courseId,
  });
}

export function unenrollUserInCourse(userId, courseId) {
  const { enrollments } = Database;
  enrollments.filter(
    (enrollment) => enrollment.user !== userId || enrollment.course !== courseId
  );
}

export function fetchAllEnrollments() {
  return Database.enrollments;
}
