
/* --------------------------DEPENDENCIES------------------------ */
import express from "express";
import * as ProductControllers from '../app/controllers/ProductControllers.js';
import * as UserControllers from '../app/controllers/userController.js';
import * as WishListController from '../app/controllers/WishListControllers.js';
import * as CartListController from '../app/controllers/CartListControllers.js';
import * as InvoiceControllers from '../app/controllers/InvoiceControllers.js'
import { UserAuthentication } from "../app/middlewares/AuthMiddleware.js";
import * as FeaturesControllers from "../app/controllers/FeaturesControllers.js";



/*---CREATEED ROUTER INSTANCE---*/
const router = express.Router();


/*----------------------------PRODUCT API ENDPOINT---------------------------*/
router.get('/ProductBrandList', ProductControllers.ProductBrandList);
router.get('/ProductCategoryList', ProductControllers.ProductCategoryList);
router.get('/ProductSliderList', ProductControllers.ProductSliderList);
router.get('/ProductListByBrand/:brandId', ProductControllers.ProductListByBrand);
router.get('/ProductListByCategory/:categoryID', ProductControllers.ProductListByCategory);
router.get('/ProductListByRemark/:Remark', ProductControllers.ProductListByRemark);
router.get('/ProductListBySimilar/:categoryID', ProductControllers.ProductListBySimilar);
router.get('/ProductDetails/:ProductID', ProductControllers.ProductDetails);
router.get('/ProductListByKeyword/:Keyword', ProductControllers.ProductListByKeyword);
router.get('/ProductReviewsList/:ProductId', ProductControllers.ProductReviewsList);
router.post('/ProductFilter', ProductControllers.ProductFilter);
router.post('/ProductReviewCreate', UserAuthentication, ProductControllers.ProductReviewCreate);




/*----------------------------USERS API ENDPOINT---------------------------*/
router.get('/UserOTP/:email', UserControllers.UserOTP);
router.get('/OTPVerifyLogin/:email/:code', UserControllers.OTPVerifyLogin);
router.get('/UserLogout', UserAuthentication , UserControllers.UserLogout);
router.post('/SaveProfile', UserAuthentication , UserControllers.SaveProfile);
router.get('/ReadProfile', UserAuthentication , UserControllers.ReadProfile);

/*----------------------------WISHLIST API ENDPOINT---------------------------*/
router.get('/ReadWishListProducts', UserAuthentication, WishListController.ReadWishListProducts);
router.post('/SaveWishList', UserAuthentication, WishListController.SaveWishList);
router.post('/RemoveWishList', UserAuthentication, WishListController.RemoveWishList);

/*----------------------------CARTLIST API ENDPOINT---------------------------*/
router.post('/SaveProductToCart', UserAuthentication, CartListController.SaveProductToCart);
router.post('/UpdateProductOfCart/:CartID', UserAuthentication, CartListController.UpdateProductOfCart);
router.post('/RemoveProductFromCart', UserAuthentication, CartListController.RemoveProductFromCart);
router.get('/SelectCartListProduct', UserAuthentication, CartListController.SelectCartListProduct);

/*----------------------------INVOICE AND PAYMENT API ENDPOINT---------------------------*/
router.get('/CreateInvoice', UserAuthentication, InvoiceControllers.CreateInvoice);
router.get('/InvoiceList', UserAuthentication, InvoiceControllers.InvoiceList);
router.get('/InvoiceProductList/:invoice_id', UserAuthentication, InvoiceControllers.InvoiceProductList);
router.post('/PaymentSuccess/:trxID',   InvoiceControllers.PaymentSuccess);
router.post('/PaymentCancel/:trxID',   InvoiceControllers.PaymentCancel);
router.post('/PaymentFail/:trxID',   InvoiceControllers.PaymentFail);
router.post('/PaymentIPN/:trxID',   InvoiceControllers.PaymentIPN);


/*----------------------------FEATURES API ENDPOINT---------------------------*/
router.get('/FeaturesList', FeaturesControllers.FeaturesList);
router.get('/legalDetails/:type', FeaturesControllers.LegalDetails);














/*---EXPORT ROUTER---*/
export default router;





