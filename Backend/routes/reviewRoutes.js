const router = require("express").Router();
const reviewController = require('../controllers/reviewController');

router.post("/create", reviewController.createReview);

module.exports = router;