const cloudinary = require("cloudinary");
const Categories = require("../model/categoriesModel");

const createCategory = async (req, res) => {
  // step 1 : check incomming data
  console.log(req.body);
  console.log(req.files);

  // step 2 : Destructuring data
  const { categoryName, slug } = req.body;
  const { categoryImage } = req.files;

  // step 3 : Validate data
  if (!categoryName || !slug || !categoryImage) {
    return res.json({
      success: false,
      message: "Please fill all the fields",
    });
  }

  try {
    // upload image to cloudinary
    const uploadedImage = await cloudinary.v2.uploader.upload(
      categoryImage.path,
      {
        folder: "categories",
        crop: "scale",
      }
    );

    // Save to database
    const newCategory = new Categories({
      categoryName: categoryName,
      slug: slug,
      categoryImageUrl: uploadedImage.secure_url,
    });
    await newCategory.save();
    res.json({
      success: true,
      message: "Category created successfully",
      category: newCategory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
//getAllCategories

const getCategories = async (req, res) => {
  try {
    const allCategories = await Categories.find({});
    res.json({
      success: true,
      message: "All categories fetched successfully!",
      categories: allCategories,
    });
  } catch (error) {
    console.log(error);
    res.send("Internal server error");
  }
};

const getSingleCategory = async (req, res) => {
  const categoryId = req.params.id;
  try {
    const singleCategory = await Categories.findById(categoryId);
    res.json({
      success: true,
      message: "Single category fetched successfully!",
      category: singleCategory,
    });
  } catch (error) {
    console.log(error);
    res.send("Internal server error");
  }
};

const updateCategory = async (req, res) => {
  // step 1 : check incomming data
  console.log(req.body);
  console.log(req.files);

  // destructuring data
  const { categoryName, slug } = req.body;
  const { categoryImage } = req.files;

  // validate data
  if (!categoryName || !slug) {
    return res.json({
      success: false,
      message: "Required fields are missing!",
    });
  }

  try {
    // case 1 : if there is image
    if (categoryImage) {
      // upload image to cloudinary
      const uploadedImage = await cloudinary.v2.uploader.upload(
        categoryImage.path,
        {
          folder: "categories",
          crop: "scale",
        }
      );

      // make updated json data
      const updatedData = {
        categoryName: categoryName,
        slug: slug,
        productImageUrl: uploadedImage.secure_url,
      };

      // find product and update
      const categoryId = req.params.id;
      await Categories.findByIdAndUpdate(categoryId, updatedData);
      res.json({
        success: true,
        message: "Category updated successfully with Image!",
        updatedCategory: updatedData,
      });
    } else {
      // update without image
      const updatedData = {
        categoryName: categoryName,
      };

      // find product and update
      const categoryId = req.params.id;
      await Categories.findByIdAndUpdate(categoryId, updatedData);
      res.json({
        success: true,
        message: "Category updated successfully without Image!",
        updatedCategory: updatedData,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const deleteCategory = async (req, res) => {
  const categoryId = req.params.id;

  try {
    await Categories.findByIdAndDelete(categoryId);
    res.json({
      success: true,
      message: "Category deleted successfully!",
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Server error!!",
    });
  }
};

module.exports = {
  createCategory,
  getCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
};
