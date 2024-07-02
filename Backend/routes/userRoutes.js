const router = require("express").Router();
const userController = require("../controllers/userController");

// create user api
router.post("/register", userController.createUser);

//  task 1: create login api
router.post("/login", userController.loginUser);

router.post("/forgot/password", userController.forgotPassword);

router.put("/password/reset/:token", userController.resetPassword);

router.put("/update_user/:id", userController.updateUser);
// exporting
module.exports = router;
