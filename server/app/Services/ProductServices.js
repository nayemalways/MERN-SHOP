import BrandModel from '../models/ProductModel/brandModel.js';
import CategoryModel from '../models/ProductModel/categoryModel.js';
import ProductModel from '../models/ProductModel/productModel.js';
import ProductSliderModel from '../models/ProductModel/productSliderModel.js';
import ProductDetailsModel from '../models/ProductModel/productDetailsModel.js';
import ReviewModel from '../models/ProductModel/ReviewModel.js';
import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;










// Group: 1 -- PRODUCT BRAND, CATEGORY, SLIDER  SEARCH
export const BrandListService = async () => {
    try {
        // Find Brand Data
        const data = await BrandModel.find();
        return {status: "Success", data: data};

    }catch(e) {
        console.log(e);
        return {status: "error", message: "Internal server error"};
    }
}

export const CategoryListService = async () => {
    try {
        // Category Data
        const data = await  CategoryModel.find();
        return{status: "Success", data: data};

    }catch(e) {
        console.log(e);
        return {status: "error", message: "Internal server error"};
    }
}

export const SliderListService = async () => {
    try {
        // Slider Data
        const data = await ProductSliderModel.find();
        return {status: "Success", data: data};

    }catch(e) {
        console.log(e);
        return {status: "error", message: "Internal server error"};
    }
}




// Group: 2 -- PRODUCT SEARCH BY BRAND, CATEGORY, KEYWORD, SIMILAR, REMARK
export const ListByBrandService = async (req) => {
   
    try {
        const BrandId = new ObjectId(req.params.brandId);

        //Database Query
        const MatchStage = {$match: {brandID: BrandId}};
        const JoinWithBrandStage = {$lookup: {from: "brands", localField: "brandID", foreignField: "_id", as: "brand"}};
        const JoinWithCategoryStage = {$lookup: {from: "categories", localField: "categoryID", foreignField: "_id", as: "category"}};
        const UnwindBrandStage = {$unwind: "$brand"};
        const UnwindCategoryStage = {$unwind: "$category"};
    
    
        // Database operation
        let data = await ProductModel.aggregate([
            MatchStage,
            JoinWithBrandStage,
            JoinWithBrandStage,
            JoinWithCategoryStage,
            UnwindBrandStage,
            UnwindCategoryStage
        ])
    
        return {status: "Success", data: data};
 
    }catch(e) {
        console.log(e);
        return {status: "error", message: "Internal server error"};
        
    }

}

export const ListByCategoryService = async (req) => {
    try {
        const categoryID = new ObjectId(req.params.categoryID);

        // Query
        const match = {$match:{categoryID: categoryID}};
        const JoinWithBrandStage = {$lookup: {from: "brands", localField: "brandID", foreignField: "_id", as: "brand"}};
        const JoinWithCategoryStage = {$lookup: {from: "categories", localField: "categoryID", foreignField: "_id", as: "category"}};
        const UnwindBrandStage = {$unwind: "$brand"};
        const UnwindCategoryStage = {$unwind: "$category"};
        const projection = {$project: {categoryID: 0, brandID: 0, "brand._id": 0, "brand.createdAt": 0, "brand.updatedAt": 0,  "category._id": 0, "category.createdAt": 0, "category.updatedAt": 0}};

        // Data Retriving
        const data = await ProductModel.aggregate([
            match,
            JoinWithBrandStage,
            JoinWithCategoryStage,
            UnwindBrandStage,
            UnwindCategoryStage,
            projection
        ])

        return {status: "Success", data: data};
    }catch(e) {
        console.log(e);
        return {status: "Error", message:"Internal server error..!"}
    }
}

export const ListByRemarkService = async (req) => {
    try {
        const Remark = req.params.Remark;

    // Query
    const match = {$match: {remark: Remark}};
    const JoinWithBrandStage = {$lookup: {from: "brands", localField: "brandID", foreignField: "_id", as: "brand"}};
    const JoinWithCategoryStage = {$lookup: {from: "categories", localField: "categoryID", foreignField: "_id", as: "category"}};
    const UnwindBrandStage = {$unwind: "$brand"};
    const UnwindCategoryStage = {$unwind: "$category"};
    const projection = {$project: {categoryID: 0, brandID: 0, "brand._id": 0, "brand.createdAt": 0, "brand.updatedAt": 0,  "category._id": 0, "category.createdAt": 0, "category.updatedAt": 0}};

    // Data Retiriving
const data = await ProductModel.aggregate([
    match,
    JoinWithBrandStage,
    JoinWithCategoryStage,
    UnwindBrandStage,
    UnwindCategoryStage,
    projection
])

return {status: "Success", data: data};
    }catch(e) {
        console.log(e);
        return {Status: "Error", message: "Inernal Server error...!"}
    } 
}

export const ListBySimilarService = async (req) => {
    try {
        const categoryID = new ObjectId(req.params.categoryID);

        // Query
        const match = {$match:{categoryID: categoryID}};
        const limit = {$limit: 20};
        const JoinWithBrandStage = {$lookup: {from: "brands", localField: "brandID", foreignField: "_id", as: "brand"}};
        const JoinWithCategoryStage = {$lookup: {from: "categories", localField: "categoryID", foreignField: "_id", as: "category"}};
        const UnwindBrandStage = {$unwind: "$brand"};
        const UnwindCategoryStage = {$unwind: "$category"};
        const projection = {$project: {categoryID: 0, brandID: 0, "brand._id": 0, "brand.createdAt": 0, "brand.updatedAt": 0,  "category._id": 0, "category.createdAt": 0, "category.updatedAt": 0}};

        // Data Retriving
        const data = await ProductModel.aggregate([
            match,
            limit,
            JoinWithBrandStage,
            JoinWithCategoryStage,
            UnwindBrandStage,
            UnwindCategoryStage,
            projection
        ])

        return {status: "Success", data: data};
    }catch(e) {
        console.log(e);
        return {status: "Error", message:"Internal server error..!"}
    }
}

export const DetailsService = async (req) => {
    try {
        const productID = new ObjectId(req.params.ProductID);

        // Database Query Writing
        const match = {$match:{_id: productID}};

        const JoinWithBrandStage = {$lookup:{from: "brands" , localField: "brandID", foreignField: "_id", as: "brand"}};
        const JoinWithCategoryStage = {$lookup:{from: "categories" , localField: "categoryID", foreignField: "_id", as: "category"}};
        const JoinWithProductDetailsStage = {$lookup: {from: "ProductDetails", localField: "_id", foreignField: "productID", as: "ProductDetails"}};

        const UnwindBrandStage = {$unwind:"$brand"};
        const UnwindCategoryStage = {$unwind:"$category"};
        const UnwindProductDetailsStage = {$unwind:"$ProductDetails"};

        const projection = {$project: {
            "category._id": 0, 
            "brand._id": 0, 
            "ProductDetails._id":0 ,
            "brand.createdAt": 0,
            "brand.updatedAt": 0,
            "brand.createdAt": 0,
            "category.updatedAt": 0,
            "category.createdAt": 0,
            "ProductDetails.updatedAt": 0,
            "ProductDetails.createdAt": 0,
            }};


        // Data Retrive
        const data = await ProductModel.aggregate([
            match,
            JoinWithBrandStage,
            JoinWithCategoryStage,
            JoinWithProductDetailsStage,
            UnwindBrandStage,
            UnwindCategoryStage,
            UnwindProductDetailsStage,
            projection
        ])

        // Return Data
        return {status: "Success", data: data};
    }catch(e) {
        console.log(e);
        return {status: "Success", message: "Internal server error..!"}
    }
}

export const ListByKeywordService = async (req) => {
    try {
        const SearchRegex = {"$regex": req.params.Keyword, "$options": "i"};
        const SearchParams = [{title: SearchRegex}, {shortDes: SearchRegex}];
        const SearchQuery = {$or: SearchParams};

        const match = {$match: SearchQuery};

        const JoinWithBrandStage = {$lookup:{from: "brands", localField: "brandID", foreignField: "_id", as: "brand"}};
        const JoinWithCategoryStage = {$lookup:{from: "categories", localField: "categoryID", foreignField: "_id", as: "category"}};

        const UnwindBrandStage = {$unwind: "$brand"};
        const UnwindCategoryStage = {$unwind: "$category"};

        const projection = {$project: {categoryID: 0, brandID: 0, "brand._id": 0, "brand.createdAt": 0, "brand.updatedAt": 0,  "category._id": 0, "category.createdAt": 0, "category.updatedAt": 0}};


        // Data Retriving
        const data = await ProductModel.aggregate([
            match,
            JoinWithBrandStage,
            JoinWithCategoryStage,
            UnwindBrandStage,
            UnwindCategoryStage,
            projection
        ])


        // Return Data 
        return {status: "Success", data: data}


    }catch(e) {
        console.log(e);
        return {status: "Success", message: "Internal server error..!"}
    }
}

export const ProductFilterService = async (req) => {
    try {

        

        // Brand and Category matching conditions
        let matchConditions = {};
        if(req.body['categoryID']) {
            matchConditions.categoryID = new ObjectId(req.body['categoryID']);
        }
        if(req.body['brandID']) {
            matchConditions.brandID = new ObjectId(req.body['brandID']);
        }
        let MatchStage = { $match: matchConditions}




        /* 
            Add new field named "numericPrice" for comparing with "price" field.
            The "numericPrice" value is price field. Which is converted string to Integer
        */
        let AddFieldsStage = {
            $addFields: {numericPrice: {$toInt: "$price"}} // String type Number to Number
        }

         // Price matching conditions
        let priceMin = parseInt(req.body['priceMin']);
        let priceMax = parseInt(req.body['priceMax']);
        let PriceMatchConditions = {};
        if(!isNaN(priceMin)) {
            PriceMatchConditions['numericPrice'] = { $gte: priceMin };
        }
        if(!isNaN(priceMax)) {
            PriceMatchConditions['numericPrice'] = {...(PriceMatchConditions['numericPrice'] || {}), $lte: priceMax};
        }
        let PriceMatchStage = { $match: PriceMatchConditions };


        // Join with "brands", "categoroies" fields. And unwind the unecessary Array sign for a single brand data
        let JoinWithBrandStage = { $lookup: { from:"brands", localField: "brandID", foreignField: "_id", as: "brand" }};
        let JoinWithCategoryStage = { $lookup: { from:"categories", localField: "categoryID", foreignField: "_id", as: "category" }};
        let UnwindBrandStage = {$unwind: "$brand"};
        let UnwindCategoryStage = {$unwind: "$category"};
        let projectionStage = {$project: {'brand._id': 0, 'category._id': 0, 'brandID': 0}};


        // Aggregation Pipline
        let data = await ProductModel.aggregate([
            MatchStage,
            AddFieldsStage,
            PriceMatchStage,
            JoinWithBrandStage, JoinWithCategoryStage,
            UnwindBrandStage, UnwindCategoryStage,
            projectionStage
        ])



        return {status: "Success", data: data}



    }catch(e) {
        console.log(e);
        return {status: "Error", message: "Internal server error..!"}
    }
}

export const ReviewsListService = async (req) => {
    try {
        const productId = new ObjectId( req.params.ProductId);

        const matchStage = {$match:{productID: productId}};
        const JoinWithUserProfilesStage = {$lookup: {from: "profiles", localField: "userID", foreignField: "userID", as: "profile"}};
        const UnwindProfileStage = {$unwind: "$profile"}
        const projectionStage = {$project: {"des":1, "rating":1, "profile.cus_name": 1}}

        // Data Retrive 
        const data = await ReviewModel.aggregate([
            matchStage,
            JoinWithUserProfilesStage,
            UnwindProfileStage,
            projectionStage
        ])

        return {status: "Success", data: data};
    }catch(e) {
        console.log(e);
        return {status: "Error", message: "Internal server error..!"};
    }
}

export const ProductReviewCreateService = async (req) => {
    try {

        const userID = new ObjectId(req.headers.user_id);
        const {productID, des, rating} =req.body;


        // Create Review
        await ReviewModel.create({productID, userID, des, rating});
 

        return {status: "Success", message: "Review created success"};

    }catch(e) {
        console.log(e);
        return {status: "Error", message: "Internal server error..!"}
    }
}



 