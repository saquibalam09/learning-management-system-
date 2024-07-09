import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer  from './Slices/AuthSlice.js'
import CourseSlice from "./Slices/CourseSlice.js";


const store = configureStore({
    reducer: {
        auth: authSliceReducer,
        course: CourseSlice
    },
    devTools: true
});

export default store;


