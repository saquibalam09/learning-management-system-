import React, { useState } from 'react'
import HomeLayout from '../Layouts/HomeLayout';
import { BsPersonCircle } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {toast} from 'react-hot-toast';


function Signup() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [prevImage, setPrevImage] = useState('');

    const [signupData, setSignupData] = useState({
        fullName:"",
        email: "",
        password: "",
        avatar: ""
    });


    function handleUserInput(e){
        const {name , value} = e.target;
        setSignupData({
            ...signupData,
            [name]: value
        })
    }

    function getImage(e){
       e.preventDefault(); 

       const uploadedImage = e.target.files[0];
       if(uploadedImage){
            setSignupData({
                ...signupData,
                avatar: uploadedImage
            });
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedImage);
            fileReader.addEventListener('load', function(){
                console.log(this.result);
                setPrevImage(this.result);
            })
       }
    }

    function createNewAccount(e){
        e.preventDefault();
        if(!signupData.email || !signupData.password || !signupData.fullName || !signupData.avatar){
            toast.error("Please fill all the details");
        }
    }

    return (
        <HomeLayout>
            <div className='flex justify-center items-center h-[90vh] w-full'>
                <form className='flex flex-col justify-center gap-3 rounded-lg p-4 text-white items-center w-96 shadow-[0_0_10px_black]'>
                    <h1 className='text-center text-2xl font-bold'>
                        Registration Page
                    </h1>
                    <label htmlFor='image_uploads' className='cursor-pointer'>
                        {prevImage ? (
                            <img className='w-24 h-24 rounded-full m-auto' src={prevImage} />
                        ) : (
                            <BsPersonCircle className='w-24 h-24 rounded-full m-auto' />
                        )}
                    </label>
                    <input
                        onChange={getImage} 
                        className='hidden'
                        type='file'
                        name='image_uploads'
                        id='image_uploads'
                        accept='.jpg, .jpeg, .png, .svg'
                    />
                    
                    <div className='w-3/4 flex flex-col gap-1'>
                        <label htmlFor='full_name' className='font-semibold'>Full Name</label>
                        <input
                            type='full_name'
                            required
                            name='full_name'
                            id='full_name'
                            placeholder='Enter your full_name...'
                            className='bg-trasparent px-2 py-1 border'
                            onChange={handleUserInput}
                            value={signupData.fullName}
                        />
                    </div>

                    <div className='w-3/4 flex flex-col gap-1'>
                        <label htmlFor='email' className='font-semibold'>Email</label>
                        <input
                            type='email'
                            required
                            name='email'
                            id='email'
                            placeholder='Enter your email...'
                            className='bg-trasparent px-2 py-1 border'
                            onChange={handleUserInput}
                            value={signupData.email}
                        />
                    </div>
                    <div className='w-3/4 flex flex-col gap-1'>
                        <label htmlFor='password' className='font-semibold'>Password</label>
                        <input
                            type='password'
                            required
                            name='password'
                            id='password'
                            placeholder='Enter your password...'
                            className='bg-trasparent px-2 py-1 border'
                            onChange={handleUserInput}
                            value={signupData.password}
                        />
                        

                    </div>
                    <button type='submit' className='w-1/2 mt-1 bg-yellow-600 font-semibold py-2 hover:bg-yellow-500 text-lg cursor-pointer transition-all ease-in-out duration-200 rounded-md'>
                        Create account
                    </button>
                    <p className='mt-1'>
                        Alreaddy have an account ? <Link className='link text-accent rounded-md font-semibold cursor-pointer' to='/login'>Login</Link>
                    </p>
                </form>
            </div>
        </HomeLayout>
    )
}

export default Signup;
