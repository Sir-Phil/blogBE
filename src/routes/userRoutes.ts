import express from "express";
import { createUser, deleteUser, loadUser, updateUser, userLogin } from "../controllers/users";
import { isAuthenticated } from "../utils/auth";

const router = express.Router();

router.post("/create-user", createUser);
router.post("/login-user", userLogin);
router.get("/user-profile", isAuthenticated, loadUser);
router.put("/update-info/:id", isAuthenticated, updateUser);
router.delete("/delete-user/:id", isAuthenticated, deleteUser);

export default router;