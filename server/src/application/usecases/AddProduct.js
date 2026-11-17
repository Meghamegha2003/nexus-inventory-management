class AddProduct {
    constructor(productRepo){
        this.productRepo = productRepo
    }

    async execute(productData){
        return await this.productRepo.create(productData)
    }
}

export default AddProduct