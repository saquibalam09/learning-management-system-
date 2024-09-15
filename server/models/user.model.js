import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    fullName: {
      type: String, // Corrected the data type
      required: [true, "Name is required"],
      minLength: [5, "Name must be at least 5 characters"],
      maxLength: [50, "Name should be less than 50 characters"],
      lowercase: true,
      trim: true,
    },
    email: {
      type: String, // Corrected the data type
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
      unique: true,
      match: [
        /^[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/,
        "Please fill in a valid email address",
      ],
    },
    password: {
      type: String, // Corrected the data type
      required: [true, "Password is required"],
      minLength: [8, "Password must be at least 8 characters"],
      select: false,
    },
    avatar: {
      public_id: {
        type: String, // Corrected the data type
      },
      secure_url: {
        type: String, // Corrected the data type
      },
    },
    role: {
      type: String, // Corrected the data type
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
    subscription: {
      id: String,
      status: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.generateJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });
};

userSchema.methods.comparePassword = async function (plainTextPassword) {
  return await bcrypt.compare(plainTextPassword, this.password);
};

userSchema.methods.generatePasswordResetToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.forgotPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.forgotPasswordExpiry = Date.now() + 15 * 60 * 1000; // 15 min from now
  return resetToken;
};

export const User = model("User", userSchema);
