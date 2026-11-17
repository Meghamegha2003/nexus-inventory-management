
const ValidateProduct = (req, res, next) => {
    const {
        productCode,
        productName,
        category,
        brand,
        unitOfMeasure,
        price,
        sellingPrice,
        displayOrder,
        taxPercentage,
        pointValue,
        costPerPoint,
        minimumStock
    } = req.body;

    if (!productCode || typeof productCode !== "string" || !productCode.trim()) {
        return res.status(400).json({
            success: false,
            message: "Product code is required"
        });
    }

    if (!productName || typeof productName !== "string" || !productName.trim()) {
        return res.status(400).json({
            success: false,
            message: "Product name is required"
        });
    }

    if (!category || typeof category !== "string" || !category.trim()) {
        return res.status(400).json({
            success: false,
            message: "Product category is required"
        });
    }

    if (!brand || typeof brand !== "string" || !brand.trim()) {
        return res.status(400).json({
            success: false,
            message: "Product brand is required"
        });
    }

    if (!unitOfMeasure || typeof unitOfMeasure !== "string" || !unitOfMeasure.trim()) {
        return res.status(400).json({
            success: false,
            message: "Unit of measure is required"
        });
    }

    if (!Number.isFinite(price) || price < 0) {
        return res.status(400).json({
            success: false,
            message: "Price must be a valid non-negative number"
        });
    }

    if (!Number.isFinite(sellingPrice) || sellingPrice < 0) {
        return res.status(400).json({
            success: false,
            message: "Selling price must be a valid non-negative number"
        });
    }

    if (displayOrder !== undefined && (!Number.isInteger(displayOrder) || displayOrder < 0)) {
        return res.status(400).json({
            success: false,
            message: "Display order must be a non-negative integer"
        });
    }

    if (taxPercentage !== undefined && (!Number.isFinite(taxPercentage) || taxPercentage < 0 || taxPercentage > 100)) {
        return res.status(400).json({
            success: false,
            message: "Tax percentage must be between 0 and 100"
        });
    }

    if (pointValue !== undefined && (!Number.isFinite(pointValue) || pointValue < 0)) {
        return res.status(400).json({
            success: false,
            message: "Point value must be a non-negative number"
        });
    }

    if (costPerPoint !== undefined && (!Number.isFinite(costPerPoint) || costPerPoint < 0)) {
        return res.status(400).json({
            success: false,
            message: "Cost per point must be a non-negative number"
        });
    }

    if (minimumStock !== undefined && (!Number.isInteger(minimumStock) || minimumStock < 0)) {
        return res.status(400).json({
            success: false,
            message: "Minimum stock must be a non-negative integer"
        });
    }

    next();
};

export default ValidateProduct;
