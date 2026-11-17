class ProductController {
    constructor(addProduct, getProduct, getProductById) {
        this.addProduct = addProduct
        this.create = this.create.bind(this)

        this.getProduct = getProduct
        this.getAll = this.getAll.bind(this)

        this.getProductById = getProductById
        this.getById = this.getById.bind(this)
    }

    async create(req, res) {
        try {
            const product = await this.addProduct.execute(req.body)
            res.status(201).json({
                success: true,
                message: "Product added successfully",
                product
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    async getAll(req, res) {
        try {
            const product = await this.getProduct.execute()
            res.status(200).json({
                success: true,
                product
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }


    async getById(req,res){
        try {
            const product = await this.getProductById.execute(req.params.id)
            if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Product fetched successfully",
            product
        });

        } catch (error) {
            return res.status(500).json({
            success: false,
            message: error.message
        });
        }
    }
}


export default ProductController