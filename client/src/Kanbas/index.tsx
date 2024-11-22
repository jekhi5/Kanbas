import './styles.css';
import { Routes, Route, Navigate } from 'react-router';
import Account from './Account';
import Dashboard from './Dashboard';
import KanbasNavigation from './Navigation';
import Courses from './Courses';
import { useEffect, useState } from 'react';
import ProtectedRoute from './Account/ProtectedRoute';
import ProtectedCourse from './Courses/ProtectedCourse';
import Session from './Account/Session';
import * as userClient from './Account/client';
import { useSelector } from 'react-redux';
import * as courseClient from './Courses/client';
import * as enrollmentClient from './Dashboard/client';

export default function Kanbas() {
  const [courses, setCourses] = useState<any[]>([]);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [shouldHideUnenrolled, setShouldHideUnenrolled] =
    useState<boolean>(true);
  const [enrollments, setEnrollments] = useState<any[]>([]);

  useEffect(() => {
    const fetchEnrollments = async () => {
      const enrollments = await enrollmentClient.fetchAllEnrollments();
      setEnrollments(enrollments);
    };
    fetchEnrollments();
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const courses = shouldHideUnenrolled
          ? await userClient.findMyCourses()
          : await courseClient.fetchAllCourses();
        setCourses(courses);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCourses();
  }, [currentUser, shouldHideUnenrolled, enrollments]);

  const [course, setCourse] = useState<any>({
    _id: '1234',
    name: 'New Course',
    number: 'New Number',
    startDate: '2023-09-10',
    endDate: '2023-12-15',
    description: 'New Description',
  });
  const addNewCourse = async () => {
    const newCourse = await userClient.createCourse(course);

    setCourses([...courses, newCourse]);
  };
  const deleteCourse = async (courseId: string) => {
    await courseClient.deleteCourse(courseId);
    setCourses(courses.filter((course) => course._id !== courseId));
  };
  const updateCourse = async () => {
    await courseClient.updateCourse(course);

    setCourses(
      courses.map((c) => {
        if (c._id === course._id) {
          return course;
        } else {
          return c;
        }
      })
    );
  };

  const enrollInCourse = async (courseId: string) => {
    await userClient.enrollInCourse(courseId);
    setEnrollments((prev) => [
      ...prev,
      { user: currentUser._id, course: courseId },
    ]);
  };

  const unenrollInCourse = async (courseId: string) => {
    await userClient.unenrollInCourse(courseId);
    setEnrollments((prev) =>
      prev.filter(
        (enrollment) =>
          !(
            enrollment.course === courseId &&
            enrollment.user === currentUser._id
          )
      )
    );
  };

  return (
    <Session>
      <div id="wd-kanbas">
        <KanbasNavigation />
        <div className="wd-main-content-offset p-3">
          <Routes>
            <Route path="/" element={<Navigate to="/Kanbas/Account" />} />
            <Route path="/Account/*" element={<Account />} />
            <Route
              path="/Dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard
                    courses={courses}
                    course={course}
                    setCourse={setCourse}
                    addNewCourse={addNewCourse}
                    deleteCourse={deleteCourse}
                    updateCourse={updateCourse}
                    shouldHideUnenrolled={shouldHideUnenrolled}
                    setShouldHideUnenrolled={setShouldHideUnenrolled}
                    enrollInCourse={enrollInCourse}
                    unenrollInCourse={unenrollInCourse}
                    enrollments={enrollments}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/Courses/:cid/*"
              element={
                <ProtectedCourse>
                  <ProtectedRoute>
                    <Courses courses={courses} />
                  </ProtectedRoute>
                </ProtectedCourse>
              }
            />
            <Route path="/Calendar" element={<h1>Calendar</h1>} />
            <Route path="/Inbox" element={<h1>Inbox</h1>} />
          </Routes>
        </div>
      </div>
    </Session>
  );
}
