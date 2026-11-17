
class Product {
    constructor({
        id,
        productCode,
        barcode,
        productName,
        category,
        brand,
        unitOfMeasure,
        displayOrder = 0,
        displayGroup = "",
        price,
        sellingPrice,
        taxInclusive = false,
        taxCategory = "",
        taxPercentage = 0,
        sellable = true,
        redeemable = false,
        pointValue = 0,
        costPerPoint = 0,
        minimumStock = 0,
        active = true,
        displayInPOS = true,
        customerCard = false,
        image = "",
        createdAt,
        updatedAt
    }) {
        if (!productName) {
            throw new Error("Product name is required");
        }

        if (
            !Number.isFinite(price) ||
            !Number.isFinite(sellingPrice) ||
            price < 0 ||
            sellingPrice < 0
        ) {
            throw new Error("Product prices must be valid non-negative numbers");
        }

        this.id = id;
        this.productCode = productCode;
        this.barcode = barcode;
        this.productName = productName;
        this.category = category;
        this.brand = brand;
        this.unitOfMeasure = unitOfMeasure;
        this.displayOrder = displayOrder;
        this.displayGroup = displayGroup;
        this.price = price;
        this.sellingPrice = sellingPrice;
        this.taxInclusive = taxInclusive;
        this.taxCategory = taxCategory;
        this.taxPercentage = taxPercentage;
        this.sellable = sellable;
        this.redeemable = redeemable;
        this.pointValue = pointValue;
        this.costPerPoint = costPerPoint;
        this.minimumStock = minimumStock;
        this.active = active;
        this.displayInPOS = displayInPOS;
        this.customerCard = customerCard;
        this.image = image;
        this.createdAt = createdAt || new Date();
        this.updatedAt = updatedAt || new Date();
    }
}

export default Product;
