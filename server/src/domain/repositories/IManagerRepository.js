class IManagerRepository {
    async findByEmail(email){
        throw new Error("Method must be implemented")
    }
    
     async create(managerData) {
        throw new Error("Method must be implemented");
    }
}

export default IManagerRepository