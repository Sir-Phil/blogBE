"use strict";
// import { NextFunction, Request, Response } from "express";
// import jwt from "jsonwebtoken";
// import { IUserRequest } from "../Interfaces/user";
// import User from "../Models/user";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const user_1 = __importDefault(require("../Models/user"));
exports.isAuthenticated = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY);
            // Use findOne to find the user by their ID
            const user = yield user_1.default.findOne({ where: { id: decoded.id } });
            if (!user) {
                res.status(401);
                throw new Error("User not found");
            }
            // Attach the user data to req.user
            req.user = user;
            console.log("User data:", req.user);
            next();
        }
        catch (error) {
            console.log(error.message);
            res.status(401);
            throw new Error("Invalid token");
        }
    }
    if (!token) {
        res.status(401);
        throw new Error("No token provided");
    }
}));
