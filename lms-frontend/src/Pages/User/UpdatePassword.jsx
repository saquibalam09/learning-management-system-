import React, { useState } from 'react'
import HomeLayout from '../../Layouts/HomeLayout.jsx';
import { useDispatch } from 'react-redux';
import { updatePassword } from '../../Redux/Slices/AuthSlice.js';


function UpdatePassword() {


    const dispatch=useDispatch();


    const [userData, setUserData] = useState({
        oldPassword:"",
        newPassword:""
    })

    function handleUserInput(e){
        const {name , value} = e.target;
        setUserData({
            ...userData,
            [name]: value
        })
    }

    async function onChangeValue(e){
        e.preventDefault();
        if(!userData.oldPassword || !userData.newPassword ){
            toast.error("Please fill all the details");
            return;
        }

        // checking name 
        
        // if(loginData.fullName.length < 5){
        //     toast.error("Name should atleast be of 5 character.");
        //     return;
        // }

        // email validation 
        
        //checking password validation
        if(!userData.newPassword.match(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)){
            toast.error("Password should be 6-16 character with atleast a number and special chracter.");
            return;
        }

        

        // dispatch create account action
        const response = await dispatch(updatePassword(userData));

        if(response?.payload?.success){
            navigate('/')
        };
         

        

        setLoginData({          
            oldPassword: "",
            newPassword: "",      
        });

        
};


    return (
    <HomeLayout>
        <div className='flex justify-center items-center h-[90vh] w-full'>
                <form noValidate onSubmit={onChangeValue} className='flex flex-col justify-center gap-3 rounded-lg p-4 text-white items-center w-96 shadow-[0_0_10px_black]'>
                    <h1 className='text-center text-2xl font-bold'>
                        Update Password
                    </h1>

                    <div className='w-3/4 flex flex-col gap-1'>
                        <label htmlFor='email' className='font-semibold'>OldPassword</label>
                        <input
                            type='password'
                            required
                            name='oldPassword'
                            id='oldPassword'
                            placeholder='Enter your old password'
                            className='bg-trasparent px-2 py-1 border'
                            onChange={handleUserInput}
                            value={userData.oldPassword}
                            
                        />
                    </div>
                    <div className='w-3/4 flex flex-col gap-1'>
                        <label htmlFor='password' className='font-semibold'>NewPassword</label>
                        <input
                            type='password'
                            required
                            name='newPassword'
                            id='newPassword'
                            placeholder='Enter your new password...'
                            className='bg-trasparent px-2 py-1 border'
                            onChange={handleUserInput}
                            value={userData.newPassword}
                            
                        />
                        

                    </div>
                    <button type='submit' className='w-1/2 mt-1 bg-yellow-600 font-semibold py-2 hover:bg-yellow-500 text-lg cursor-pointer transition-all ease-in-out duration-200 rounded-md'>
                        Change Password
                    </button>
                    
                </form>
            </div>
    </HomeLayout>
  )
}

export default UpdatePassword;