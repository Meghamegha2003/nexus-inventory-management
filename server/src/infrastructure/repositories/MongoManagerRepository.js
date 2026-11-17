
import IManagerRepository from '../../domain/repositories/IManagerRepository.js';
import ManagerModel from '../database/ManagerModel.js';
import Manager from '../../domain/entities/Manager.js';

class MongoManagerRepository extends IManagerRepository {

    async findByEmail(email) {
        const manager = await ManagerModel
            .findOne({ email })
            .select('+password');

        if (!manager) return null;

        return new Manager({
            id: manager._id.toString(),
            name: manager.name,
            email: manager.email,
            password: manager.password,
            role: manager.role,
            isActive: manager.isActive
        });
    }

    async create(managerData) {
        const manager = await ManagerModel.create(managerData);

        return new Manager({
            id: manager._id.toString(),
            name: manager.name,
            email: manager.email,
            password: manager.password,
            role: manager.role,
            isActive: manager.isActive
        });
    }
}

export default MongoManagerRepository;
