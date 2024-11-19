import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  currentUser: null,
};
const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setCurrentQuestion: (state, action) => {
      state.answer = action.payload;
    },
  },
});
export const { setCurrentQuestion } = quizSlice.actions;
export default quizSlice.reducer;