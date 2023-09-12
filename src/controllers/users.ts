import asyncHandler from "express-async-handler";
import User from "../Models/user";
import { Request, Response } from "express";
import { IUserRequest } from "../Interfaces/user";

const createUser = asyncHandler (async (req:Request, res: Response) => {
   try {
    const {username, email, password } = req.body;

    // does this user exists
    const existsUser = await User.findOne({ where: {email}});

    if(existsUser) {
        res.status(400).json({message: 'User already exists'});
        return;
    }

    const newUser = await User.create({
        username,
        email,
        password,
    });

    res.status(201).json({
        data: newUser,
        message: "User created successfully",
    })
   } catch (error) {
    console.log('Error creating user:', error);
    res.status(500).json({message: 'Internal Server Error'});
   }
});


const userLogin = asyncHandler(async(req: Request, res: Response)=> {
  try {
    const {email, password} = req.body;

    const user = await User.findOne({ where: {email}});

    if(!user || !(await user.comparePassword(password))){
        res.status(401).json({ message: "Invalid credentials"});
    }

    const token = user?.generateAuthToken();

    res.status(200).json({
        data: user,
        token,
        message: "Login successful",
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({message: "Internal Server Error"});
  }
});

const loadUser = asyncHandler(async( req: IUserRequest, res: Response) => {
    const user = req.user;

    res.status(200).json({
        data: user,
        message: "Authenticated route"
    })
})

const deleteUser = asyncHandler(async( req:Request, res: Response) =>{
    try {
        const userId = req.params.id;

    const user = await User.findByPk(userId);

    if(!user){
        res.status(404).json({message: "User not found"});
    }

    await user?.destroy();

    res.status(200).json({ message: "User deleted successfully"});
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "Internal Server Error"});
    }
});

const updateUser = asyncHandler(async(req:IUserRequest, res: Response) => {
    try {
        const userId = req.params.id;
    const {updateEmail, updateUsername, updatePassword} = req.body;

    const user = await User.findByPk(userId)!;

    if(!user){
        res.status(404).json({message: "User not found"});
    }

    if(updateEmail !== undefined){
        user!.email = updateEmail;
    }
    if(updateUsername !== undefined){
        user!.email = updateUsername;
    }
    if(updatePassword !== undefined){
        user!.email = updatePassword;
    }
    
    await user?.save()

    res.status(200).json({message: "User email updated successfully"});
    } catch (error) {
        console.error("Error updating user email:",  error);
        res.status(500).json({message: "Internal Server Error"});
    }
})

export {
    createUser,
    userLogin,
    loadUser,
    deleteUser,
    updateUser,

}