import { createSlice } from "@reduxjs/toolkit";
/*import { quizzes } from '../../../Database';
const initialState = {
  quizzes: quizzes,
};
const quizSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    addAnswer: (state, action) => {
        const { quizId, questionNum, ans } = action.payload;
        console.log(ans);
        state.quizzes = state.quizzes.map((quiz) =>
            quiz._id === quizId
              ? {
                  ...quiz,
                  questions: quiz.questions.map((question) =>
                    question.number === questionNum
                      ? { ...question, answer: ans }
                      : question
                  ),
                }
              : quiz
          );
    },
  },
});
export const { addAnswer } = quizSlice.actions;
export default quizSlice.reducer;*/