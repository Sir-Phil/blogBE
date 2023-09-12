// import { NextFunction, Request, Response } from "express";
// import jwt from "jsonwebtoken";
// import { IUserRequest } from "../Interfaces/user";
// import User from "../Models/user";

// const isAuthenticated = (
//     req: IUserRequest,
//     res: Response,
//     next: NextFunction
// ) => {
//     const token = req.header("Authorization");
//     if(!token){
//         return res.status(401).json({ message: "Unauthorized" });
//     }

//     jwt.verify(token, process.env.JWT_SECRET_KEY as string, (err, user) => {
//         if(err){
//             if (err.name === "TokenExpiredError") {
//                 return res.status(401).json({ message: "Token expired" });
//               } else {
//                 return res.status(403).json({ message: "Invalid token" });
//               }
//         }
        
//         req.user = user
//         next();
//     });
// };


import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { IUserRequest } from "../Interfaces/user";
import User from "../Models/user";

export const isAuthenticated = asyncHandler(async (req: IUserRequest, res: Response, next: NextFunction) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET_KEY as string);

      // Use findOne to find the user by their ID
      const user = await User.findOne({ where: { id: decoded.id } });

      if (!user) {
        res.status(401);
        throw new Error("User not found");
      }

      // Attach the user data to req.user
      req.user = user;

      console.log("User data:", req.user);

      next();
    } catch (error: any) {
      console.log(error.message);
      res.status(401);
      throw new Error("Invalid token");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("No token provided");
  }
});
