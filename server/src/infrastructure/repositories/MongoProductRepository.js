
import IProductRepository from '../../domain/repositories/IProductRepository.js';
import ProductModel from '../database/ProductModel.js';
import Product from '../../domain/entities/Product.js';

class MongoProductRepository extends IProductRepository {

    mapToEntity(product) {
        return new Product({
            id: product._id.toString(),
            productCode: product.productCode,
            barcode: product.barcode,
            productName: product.productName,
            category: product.category,
            brand: product.brand,
            unitOfMeasure: product.unitOfMeasure,
            displayOrder: product.displayOrder,
            displayGroup: product.displayGroup,
            price: product.price,
            sellingPrice: product.sellingPrice,
            taxInclusive: product.taxInclusive,
            taxCategory: product.taxCategory,
            taxPercentage: product.taxPercentage,
            sellable: product.sellable,
            redeemable: product.redeemable,
            pointValue: product.pointValue,
            costPerPoint: product.costPerPoint,
            minimumStock: product.minimumStock,
            active: product.active,
            displayInPOS: product.displayInPOS,
            customerCard: product.customerCard,
            image: product.image,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt
        });
    }

    async create(productData) {
        const product = await ProductModel.create(productData);
        return this.mapToEntity(product);
    }

    async findAll() {
        const products = await ProductModel.find();
        return products.map(product => this.mapToEntity(product));
    }

    async findById(id) {
        const product = await ProductModel.findById(id);

        if (!product) {
            return null;
        }

        return this.mapToEntity(product);
    }
}

export default MongoProductRepository;
