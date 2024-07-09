import React from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import HomeLayout from '../../Layouts/HomeLayout.jsx';
import { getAllCourses } from '../../Redux/Slices/CourseSlice.js';
import { useEffect } from 'react';
import CourseCard from '../../Components/CourseCard.jsx';


function CourseList() {

    const dispatch = useDispatch();
    const { coursesData } = useSelector((state) => state.course);

    // async function loadCourses(){
    //     await dispatch(getAllCourses());
    // }

    

    useEffect(() => {

        // loadCourses();
        (async () => {
        await dispatch(getAllCourses());
        })();

    }, []);


    return (
        <HomeLayout>
            <div className="min-h-[90vh] pt-12 pl-20 flex flex-col flex-wrap gap-10 text-white">
                <h1 className="text-center text-3xl font-semibold">
                  Explore the courses made by{" "}
                  <span className="font-bold text-yellow-500">Industry Experts</span>
                </h1>

                {/* wrapper for courses card */}
                <div className="mb-10 flex flex-wrap gap-14">
                  {coursesData?.map((element) => {
                    return <CourseCard key={element._id} data={element} />;
                  })}
                </div>
            </div>
        </HomeLayout>
    )
}

export default CourseList;
