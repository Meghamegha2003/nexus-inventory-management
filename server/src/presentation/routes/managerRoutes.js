
import express from "express";
import {managerController} from '../../infrastructure/dependency-injection/container.js'
const router = express.Router();

router.post("/login", managerController.login);

router.post('/register', managerController.register);


export default router;
