const router = require("express").Router();
const categoriesController = require("../controllers/categoriesController");

router.post("/createCategory", categoriesController.createCategory);

// get all products
router.get("/getCategories", categoriesController.getCategories);

// single product
router.get("/getCategory/:id", categoriesController.getSingleCategory);

// update product
router.put("/updateCategory/:id", categoriesController.updateCategory);

// delete product
router.delete("/deleteCategory/:id", categoriesController.deleteCategory);

module.exports = router;
