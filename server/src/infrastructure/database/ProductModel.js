
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        productCode: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        barcode: {
            type: String,
            default: "",
            trim: true
        },

        productName: {
            type: String,
            required: true,
            trim: true
        },

        category: {
            type: String,
            required: true,
            trim: true
        },

        brand: {
            type: String,
            required: true,
            trim: true
        },

        unitOfMeasure: {
            type: String,
            required: true,
            trim: true
        },

        displayOrder: {
            type: Number,
            default: 0,
            min: 0
        },

        displayGroup: {
            type: String,
            default: "",
            trim: true
        },

        price: {
            type: Number,
            required: true,
            min: 0
        },

        sellingPrice: {
            type: Number,
            required: true,
            min: 0
        },

        taxInclusive: {
            type: Boolean,
            default: false
        },

        taxCategory: {
            type: String,
            default: ""
        },

        taxPercentage: {
            type: Number,
            default: 0,
            min: 0,
            max: 100
        },

        sellable: {
            type: Boolean,
            default: true
        },

        redeemable: {
            type: Boolean,
            default: false
        },

        pointValue: {
            type: Number,
            default: 0,
            min: 0
        },

        costPerPoint: {
            type: Number,
            default: 0,
            min: 0
        },

        minimumStock: {
            type: Number,
            default: 0,
            min: 0
        },

        active: {
            type: Boolean,
            default: true
        },

        displayInPOS: {
            type: Boolean,
            default: true
        },

        customerCard: {
            type: Boolean,
            default: false
        },

        image: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true
    }
);

const ProductModel = mongoose.model("Product", productSchema);

export default ProductModel;
