import MongoManagerRepository from "../repositories/MongoManagerRepository.js";
import LoginManager from "../../application/usecases/LoginManager.js";
import ManagerController from "../../presentation/controllers/ManagerController.js";
import RegisterManager from "../../application/usecases/RegisterManager.js";

const managerRepo = new MongoManagerRepository()
const loginManager = new LoginManager(managerRepo)
const registerManager = new RegisterManager(managerRepo)
const managerController = new ManagerController(loginManager,registerManager)


export {managerController}