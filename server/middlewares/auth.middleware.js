import AppError from "../utils/error.util.js";
import asyncHandler from "./asyncHandler.middleware.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

export const isLoggedIn = async (req, _res, next) => {
  const { token } = req.cookies;
  // console.log("token from auth->", token);

  if (!token) {
    return next(new AppError("Unauthenticated, please login again", 401));
  }

  const userDetails = await jwt.verify(token, process.env.JWT_SECRET);

  req.user = userDetails;

  if (!userDetails) {
    return next(new AppError("Unauthorized, please login to continue", 401));
  }

  next();
};

// Middleware to check if user is admin or not
export const authorizeRoles = (...roles) =>
  // console.log(roles);

  asyncHandler(async (req, _res, next) => {
    const user = await User.findById(req.user.id);
    console.log(user.role);

    if (!roles.includes(user.role)) {
      // console.log("Problem");
      return next(
        new AppError("You do not have permission to view this route", 403)
      );
    }

    next();
  });

// Middleware to check if user has an active subscription or not
export const authorizeSubscribers = asyncHandler(async (req, _res, next) => {
  const user = await User.findById(req.user.id);
  // If user is not admin or does not have an active subscription then error else pass
  if (user.role !== "ADMIN" && user.subscription.status !== "active") {
    return next(new AppError("Please subscribe to access this route.", 403));
  }

  next();
});
