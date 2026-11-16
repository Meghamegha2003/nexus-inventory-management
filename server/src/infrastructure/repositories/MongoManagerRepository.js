import IManagerRepository from "../../domain/repositories/IManagerRepository";
import ManagerModel from "../database/ManagerModel";

class MongoManagerRepository extends IManagerRepository {
    async findByEmail(email){
        return await ManagerModel.findByEmail({email}).select('+password')
    }
}