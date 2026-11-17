class GetAllProduct {
    constructor(productRepo){
        this.productRepo = productRepo
    }

    async execute(){
        return await this.productRepo.findAll()
    }
}

export default GetAllProduct