import React from 'react'
import HomeLayout from '../Layouts/HomeLayout';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { isEmailValid } from '../Constant/regexMatcher';
import axiosInstance from '../Helpers/axiosInstance';

function Contact() {



    const [userInput , setUserInput] = useState({
        name: "",
        email: "",
        message: ""
    });
     
    function handleInputChange(e){
        const {name , value} = e.target;
        console.log(name, value);
        setUserInput({
            ...userInput,
            [name]: value
        })
    }
    async function onFormSubmit(e){
        e.preventDefault();
        if( !userInput.email || !userInput.name || !userInput.message){
            toast.error("All fields are required")
            return;
        }

        if(!isEmailValid(userInput.email)){
            toast.error("Email is not valid.");
            return;
        }

        try {
            const response = axiosInstance.post('/contact', userInput);
            toast.promise(response , {
                loading: "Submitting your message ...",
                success:"Form submitted successfully",
                error: "Failed to submit the form"
            });
            const contactResponse = await response ;
            if(contactResponse?.data?.success){
                setUserInput({
                    name: "",
                    email: "",
                    message: ""
                })
            }
        } catch (error) {
            toast.error("Operation failed....")
        }
    }
    return (
        <HomeLayout>
            <div className='flex items-center justify-center h-[100vh]'>
                <form 
                    className='flex flex-col items-center justify-center gap-2 p-5 rounded-md text-white shadow-[0_0_10px_black] w-[22rem]'
                    onSubmit={onFormSubmit}
                    noValidate
                    >
                    <h1 className='text-3xl font-semibold '>
                        Contact Form
                    </h1>
                    <div className='flex flex-col w-full gap-1'>
                        <label htmlFor='name' className='text-xl font-semibold'>Name</label>
                        <input
                            className='bg-transparent border px-2 py-1 rounded-md'
                            id='name'
                            name='name'
                            type='text'
                            onChange={handleInputChange}
                            
                            placeholder='Enter your name...'
                        />
                    </div>
                    <div className='flex flex-col w-full gap-1'>
                        <label htmlFor='email' className='text-xl font-semibold'>Email</label>
                        <input
                            className='bg-transparent border px-2 py-1 rounded-md'
                            id='email'
                            name='email'
                            type='text'
                            onChange={handleInputChange}
                            
                            placeholder='Enter your email...'
                        />
                    </div>
                    <div className='flex flex-col w-full gap-1'>
                        <label htmlFor='message' className='text-xl font-semibold'>Message</label>
                        <textarea
                            className='bg-transparent border px-2 py-1 rounded-md resize-none h-40'
                            id='message'
                            name='message'
                            onChange={handleInputChange}
                            
                            
                            placeholder='Enter your email...'
                        />
                    </div>
                    <button type='submit' className='w-full bg-yellow-600 hover:bg-yellow-400 transition-all ease-in-out rounded-sm duration-300 py-2 font-semibold text-lg cursor-pointer'>
                        Submit
                    </button>
                </form>
            </div>
        </HomeLayout>
    )
}

export default Contact;
