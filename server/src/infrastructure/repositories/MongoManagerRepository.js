import IManagerRepository from "../../domain/repositories/IManagerRepository.js";
import ManagerModel from "../database/ManagerModel.js";

class MongoManagerRepository extends IManagerRepository {
    
    async findByEmail(email){
        return await ManagerModel.findOne({email}).select('+password')
    }

    async create(managerData){
        return await ManagerModel.create(managerData) 
    }

}

export default MongoManagerRepository