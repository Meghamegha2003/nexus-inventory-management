class GetProductById {
    constructor(getProductIdRepo) {
        this.getProductIdRepo = getProductIdRepo
    }

    async execute(id){
        return await this.getProductIdRepo.findById(id)
    }
}

export default GetProductById