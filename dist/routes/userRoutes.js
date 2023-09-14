"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = require("../controllers/users");
const auth_1 = require("../utils/auth");
const router = express_1.default.Router();
router.post("/create-user", users_1.createUser);
router.post("/login-user", users_1.userLogin);
router.get("/user-profile", auth_1.isAuthenticated, users_1.loadUser);
router.put("/update-info/:id", auth_1.isAuthenticated, users_1.updateUser);
router.put("/update-email/:id", auth_1.isAuthenticated, users_1.updateUserEmail);
router.put("/update-password/:id", auth_1.isAuthenticated, users_1.updateUserPassword);
router.delete("/delete-user/:id", auth_1.isAuthenticated, users_1.deleteUser);
exports.default = router;
