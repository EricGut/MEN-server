import express from 'express';

const router = express.Router();

import { getUsers, loginUser, registerUser, userSeed } from '../controllers/userController.js';

router.get("/users", getUsers);
router.get("/seed", userSeed);
router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;