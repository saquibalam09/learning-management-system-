import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance.js";

const initialState = {
    lecture: []
}

export const getCourseLectures = createAsyncThunk("/course/lecture/get", async(cid)=>{
    try {
        const res= axiosInstance.get(`/courses/${cid}`);
        toast.promise(res, {
            loading: "Fetching course lectures",
            success: "Lectures fetched successfully",
            error: "Failed to load the lectures"
        })
        return (await res).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
});
export const addCourseLectures = createAsyncThunk("/course/lecture/add", async (data)=>{
    try {
        const formData = new FormData();

        formData.append("lecture", data.lecture);
        formData.append("title", data.title);
        formData.append("description", data.description);
        console.log(data.id);
        
        const res= axiosInstance.post(`/courses/${data.id}`, formData);
        toast.promise(res, {
            loading: "Adding course lecture",
            success: "Lectures added successfully",
            error: "Failed to add lecture"
        })
        return (await res).data;
    } catch (error) {
        console.log("catch error");
        
        toast.error(error?.response?.data?.message);
    }
});

export const deleteCourseLecture = createAsyncThunk("/course/lecture/delete", async(data)=>{
    try {
        const res= axiosInstance.delete(`/courses?courseId=${data.courseId}&lectureId=${data.lectureId}`);
        toast.promise(res, {
            loading: "Fetching course lectures",
            success: "Lectures fetched successfully",
            error: "Failed to load the lectures"
        })
        return (await res).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
});

const lectureSlice = createSlice({
    name: "lecture",
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(getCourseLectures.fulfilled, (state, action)=>{
            state.lecture = action?.payload?.lectures;

        })
        .addCase(addCourseLectures.fulfilled, (state, action)=>{
            state.lecture = action?.payload?.course?.lectures;
            
        })
    }
});

export default lectureSlice.reducer;