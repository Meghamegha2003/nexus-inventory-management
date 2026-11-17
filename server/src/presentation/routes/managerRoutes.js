
import express from "express";
import {managerController} from '../../infrastructure/dependency-injection/container.js'
import ValidateManager from "../middleware/ValidateManager.js";
const router = express.Router();

router.post("/login", managerController.login);

router.post('/register', ValidateManager, managerController.register);


export default router;
