"use strict";
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
exports.updateUserPassword = exports.updateUserEmail = exports.updateUser = exports.deleteUser = exports.loadUser = exports.userLogin = exports.createUser = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const user_1 = __importDefault(require("../Models/user"));
const validation_1 = __importDefault(require("../helper/validation"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const createUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        // does this user exists
        const existsUser = yield user_1.default.findOne({ where: { email } });
        if (existsUser) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }
        const newUser = yield user_1.default.create({
            username,
            email,
            password,
        });
        res.status(201).json({
            data: newUser,
            message: "User created successfully",
        });
    }
    catch (error) {
        console.log('Error creating user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}));
exports.createUser = createUser;
const userLogin = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield user_1.default.findOne({ where: { email } });
        if (!user || !(yield user.comparePassword(password))) {
            res.status(401).json({ message: "Invalid credentials" });
        }
        const token = user === null || user === void 0 ? void 0 : user.generateAuthToken();
        res.status(200).json({
            data: user,
            token,
            message: "Login successful",
        });
    }
    catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}));
exports.userLogin = userLogin;
const loadUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    res.status(200).json({
        data: user,
        message: "Authenticated route"
    });
}));
exports.loadUser = loadUser;
const deleteUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const user = yield user_1.default.findByPk(userId);
        if (!user) {
            res.status(404).json({ message: "User not found" });
        }
        yield (user === null || user === void 0 ? void 0 : user.destroy());
        res.status(200).json({ message: "User deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}));
exports.deleteUser = deleteUser;
const updateUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const { updateEmail, updateUsername, updatePassword } = req.body;
        const user = yield user_1.default.findByPk(userId);
        if (!user) {
            res.status(404).json({ message: "User not found" });
        }
        if (user) {
            if (updateEmail !== undefined) {
                user.email = updateEmail;
            }
            if (updateUsername !== undefined) {
                user.email = updateUsername;
            }
            if (updatePassword !== undefined) {
                user.email = updatePassword;
            }
        }
        yield (user === null || user === void 0 ? void 0 : user.save());
        res.status(200).json({ message: "User email updated successfully" });
    }
    catch (error) {
        console.error("Error updating user email:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}));
exports.updateUser = updateUser;
const updateUserEmail = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const { updateEmail } = req.body;
        const user = yield user_1.default.findOne({ where: { id: userId } });
        if (!user) {
            res.status(404).json({ message: "User not found" });
        }
        if (updateEmail !== undefined) {
            if (!(0, validation_1.default)(updateEmail)) {
                res.status(400).json({ message: "Invalid Email Format" });
            }
            user === null || user === void 0 ? void 0 : user.set("email", updateEmail);
            yield (user === null || user === void 0 ? void 0 : user.save());
        }
        res.status(200).json({ message: "User email updated successfully" });
    }
    catch (error) {
        console.error("Error updating user email:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}));
exports.updateUserEmail = updateUserEmail;
const updateUserPassword = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const { updatePassword } = req.body;
        const user = yield user_1.default.findOne({ where: { id: userId } });
        if (!user) {
            res.status(404).json({ message: "User not found" });
        }
        if (updatePassword !== undefined) {
            const hashPassword = yield bcrypt_1.default.hash(updatePassword, 10);
            user === null || user === void 0 ? void 0 : user.set("password", hashPassword);
            yield (user === null || user === void 0 ? void 0 : user.save());
        }
        res.status(200).json({ message: "User password updated successfully" });
    }
    catch (error) {
        console.error("Error updating user password:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}));
exports.updateUserPassword = updateUserPassword;
