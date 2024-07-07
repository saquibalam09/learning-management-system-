import AppError, { handleError } from "../utils/error.util.js";
import { User } from "../models/user.model.js";
import fs from 'fs/promises';
import cloudinary from 'cloudinary';
import sendEmail from '../utils/email.util.js';  // Assuming you have an email utility
import crypto from 'crypto';

const cookieOptions = {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true,
    secure: true,
}

const register = async (req, res, next) => {
    try {
        const { fullName, email, password } = req.body;
        console.log(fullName);
    
        if (!fullName || !email || !password) {
            return next(handleError(res, 'All fields are required', 400));
        }
    
        const userExists = await User.findOne({ email });
    
        if (userExists) {
            return next(handleError(res, 'Email already exists', 400));
        }
    
        const user = await User.create({
            fullName,
            email,
            password,
            avatar: {
                public_id: email,
                secure_url: 'url'
            }
        });
    
        if (!user) {
            return next(handleError(res, 'User registration failed, please try again', 400));
        }
    
        if (req.file) {
            try {
                const result = await cloudinary.v2.uploader.upload(req.file.path, {
                    folder: 'lms',
                    width: 250,
                    height: 250,
                    gravity: 'faces',
                    crop: 'fill',
                });
    
                if (result) {
                    user.avatar.public_id = result.public_id;
                    user.avatar.secure_url = result.secure_url;
    
                    // Remove file from server
                    // await fs.rm(uploads/${req.file.filename});
                }
            } catch (error) {
                return next(handleError(res, error?.message, error?.status));
            }
        }
    
        await user.save();
    
        user.password = undefined;
        const token = user.generateJWTToken();
    
        res.cookie('token', token, cookieOptions);
    
        res.status(200).json({
    
            success: true,
            message: 'User registered successfully',
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false
        })
    }
}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return next(new AppError('All fields are required', 400));
        }

        const user = await User.findOne({ email }).select('+password');

        if (!user || !(await user.comparePassword(password))) {
            return next(new AppError('Email or password does not match', 400));
        }

        const token = user.generateJWTToken();
        user.password = undefined;
        res.cookie('token', token, cookieOptions);

        res.status(200).json({
            success: true,
            message: 'User logged in successfully',
            user,
        });
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
}

const logout = (req, res) => {
    res.cookie('token', null, {
        secure: true,
        maxAge: 0,
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: 'User logged out successfully',
    });
}

const getProfile = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);

        if (!user) {
            return next(new AppError('User not found', 404));
        }

        res.status(200).json({
            success: true,
            message: 'User details',
            user,
        });
    } catch (error) {
        return next(new AppError('Failed to fetch profile details', 400));
    }
}

const forgotPassword = async (req, res, next) => {
    const { email } = req.body;
    console.log(email);
    if (!email) {
        return next(new AppError('Email is required', 400));
    }

    const user = await User.findOne({ email });

    if (!user) {
        return next(new AppError('Email is not registered', 400));
    }

    const resetToken = user.generatePasswordResetToken();
    await user.save();

    const resetPasswordURL = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    const subject = 'Password Reset';
    const message = `<p>You can reset your password by clicking <a href='resetPasswordURL' target="_blank" > Reset your password </a> \nIf the above link does not work for some reason then copy paste this link in new tab 'resetPasswordURL'
    }.\n If you have not requested this, kindly ignore. </p>`;

    try {
        await sendEmail(email, subject, message);
        res.status(200).json({
            success: true,
            message: `Reset password token has been sent to ${email} successfully`
        });
    } catch (error) {
        user.forgotPasswordToken = undefined;
        user.forgotPasswordExpiry = undefined;
        await user.save();

        return next(new AppError(error.message || 'Something went wrong, Please try again.', 500));
    }
}

const resetPassword = async (req, res, next) => {
    const { token } = req.params;
    const { password } = req.body;

    const hashedToken = crypto
        .createHash('sha256')
        .update(token)
        .digest('hex');

    const user = await User.findOne({
        forgotPasswordToken: hashedToken,
        forgotPasswordExpiry: { $gt: Date.now() },
    });

    if (!user) {
        return next(new AppError('Token is invalid or has expired', 400));
    }

    user.password = password;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordExpiry = undefined;
    await user.save();

    const newToken = user.generateJWTToken();
    res.cookie('token', newToken, cookieOptions);

    res.status(200).json({
        success: true,
        message: 'Password reset successfully',
        token: newToken,
    });
}

const changePassword = async (req, res, next)=>{
    const {oldPassword, newPassword } = req.body;
    const {id} = req.user;
    
    if(!oldPassword || !newPassword){
        return next(
            new AppError('All fields are mandatory', 400)
        )
    }

    const user = await User.findById(id).select('+password');

    if(!user){
        return next(
            new AppError('All fields are mandatory', 400)
        )
    }

    const isPasswordValid = await user.comparePassword(oldPassword);

    if(!isPasswordValid){
        return next(
            new AppError('Entered password is incorect', 400)
        )
    }

    user.password = newPassword;
    await user.save();
    user.password = undefined;

    res.status(200).json({
        success: true,
        message: 'Password changed successfully',
        user
    })

}
const updateUser = async (req, res, next)=>{
    const {fullName}= req.body;
    const {id}=req.params;

    const user = await User.findById(id);

    if(!user){
        return next(
            new AppError('User does not exist', 400)
        )
    }

    if(req.fullName){
        user.fullName = fullName;
    }

    if(req.file){
        await cloudinary.v2.uploader.destroy(user.avatar.public_id);

        try {
            const result = await cloudinary.v2.uploader.upload(req.file.path, {
                folder: 'lms',
                width: 250,
                height: 250,
                gravity: 'faces',
                crop: 'fill',
            });

            if (result) {
                user.avatar.public_id = result.public_id;
                user.avatar.secure_url = result.secure_url;

                // Remove file from server
                // await fs.rm(uploads/${req.file.filename});
            }
        } catch (error) {
            return next(handleError(res, error?.message, error?.status));
        }
    }
    await user.save();

    user.password = undefined;

    res.status(200).json({
        success: true,
        message: 'User updated successfully',
        user
    })



}

export {
    register,
    login,
    logout,
    getProfile,
    forgotPassword,
    resetPassword,
    changePassword,
    updateUser
}