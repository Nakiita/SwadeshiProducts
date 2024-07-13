const Reviews = require("../model/reviewModel");

const createReview = async (req, res) => {
  const { review } = req.body;

  if (!review) {
    return res.status(400).json({
      success: false,
      message: "Review content is required.",
    });
  }

  try {
    // Create and save the new review
    const newReview = new Reviews({
      review: review,
    });

    await newReview.save();

    res.json({
      success: true,
      message: "Review submitted successfully",
      reviewData: newReview,
    });
  } catch (error) {
    console.error("Failed to save review:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
     createReview };
