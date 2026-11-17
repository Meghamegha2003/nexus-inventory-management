import MongoManagerRepository from "../repositories/MongoManagerRepository.js";
import LoginManager from "../../application/usecases/LoginManager.js";
import ManagerController from "../../presentation/controllers/ManagerController.js";
import RegisterManager from "../../application/usecases/RegisterManager.js";
import MongoProductRepository from "../repositories/MongoProductRepository.js";
import AddProduct from "../../application/usecases/AddProduct.js";
import ProductController from "../../presentation/controllers/ProductController.js";
import GetAllProduct from "../../application/usecases/GetAllproduct.js";
import GetProductById from "../../application/usecases/GetProductById.js";

const managerRepo = new MongoManagerRepository()
const loginManager = new LoginManager(managerRepo)
const registerManager = new RegisterManager(managerRepo)
const managerController = new ManagerController(loginManager,registerManager)

const productRepo = new MongoProductRepository()
const addProduct = new AddProduct(productRepo)
const getProduct = new GetAllProduct(productRepo)
const getProductById = new GetProductById(productRepo)
const productController = new ProductController(addProduct,getProduct,getProductById)


export {managerController,productController}