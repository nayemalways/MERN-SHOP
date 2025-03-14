

/*--------------------------DEPENDENCIE-------------------------*/
import {
     BrandListService,
     CategoryListService, 
     SliderListService,
     ListByBrandService,
     ListByCategoryService, 
     ListBySimilarService, 
     ListByKeywordService, 
     ListByRemarkService, 
     DetailsService, 
     ReviewsListService, 
     ProductReviewCreateService, 
     ProductFilterService
    } from "../Services/ProductServices.js"







// Group: 1 -- PRODUCT SEARCH BY BRAND, CATEGORY, SLIDER
export const ProductBrandList = async (req, res) => {
    const result = await BrandListService();
    res.json(result);
}

export const ProductCategoryList = async (req, res) => {
    const result = await CategoryListService();
    res.json(result);
}

export const ProductSliderList = async (req, res) => {
    const result = await SliderListService();
    res.json(result)
}




// Group: 2 -- PRODUCT SEARCH BY BRAND, CATEGORY, KEYWORD, SIMILAR, REMARK
export const ProductListByBrand = async (req, res) => {
    const result = await ListByBrandService(req);
    res.json(result);
}

export const ProductListByCategory = async (req, res) => {
    const result = await ListByCategoryService(req);
    res.json(result);
}

export const ProductListByRemark = async (req, res) => {
    const result = await ListByRemarkService(req);
    res.json(result);
}

export const ProductListBySimilar = async (req, res) => {
    const result = await ListBySimilarService(req);
    res.json(result);
}

export const ProductListByKeyword = async (req, res) => {
    const result = await ListByKeywordService(req);
    res.json(result);
}

export const ProductDetails = async (req, res) => {
    const result = await DetailsService(req);
    res.json(result);
}

export const ProductFilter = async (req, res) => {
    const result = await ProductFilterService(req);
    res.json(result);
}

export const ProductReviewsList= async (req, res) => {
    const result = await ReviewsListService(req);
    res.json(result);
}

export const ProductReviewCreate= async (req, res) => {
    const result = await ProductReviewCreateService(req);
    res.json(result);
}



 