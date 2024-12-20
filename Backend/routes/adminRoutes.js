const router = require("express").Router();
const productController = require("../controllers/productController");
const { authGuard, authGuardAdmin } = require("../middleware/authGuard");

router.post("/create_product", productController.createProduct);

// get all products
router.get("/get_products/:categoryId", productController.getProducts);

router.get("/get-all-products", productController.getAllProducts);

// single product
router.get("/get_product/:id", productController.getSingleProduct);

// update product
router.put("/update_product/:id", productController.updateProduct);

// delete product
router.delete("/delete_product/:id", productController.deleteProduct);

// create order
router.post("/create_order", productController.createOrder);

router.get("/get_orders", productController.getOrders);

// pagination route
router.get("/get_pagination", productController.getPagination);

router.get("/search", productController.searchProduct);
module.exports = router;
 