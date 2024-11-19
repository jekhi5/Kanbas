import { configureStore } from '@reduxjs/toolkit';
import modulesReducer from './Courses/Modules/reducer';
import accountReducer from './Account/reducer';
import assignmentReducer from './Courses/Assignments/reducer';
import enrollmentsReducer from './Dashboard/reducer';
import quizPreviewReducer from './Courses/Quizzes/Preview/reducer'
const store = configureStore({
  reducer: {
    modulesReducer,
    accountReducer,
    assignmentReducer,
    enrollmentsReducer,
    quizPreviewReducer,
  },
});
export default store;
