const cloudinary = require("cloudinary");
const Products = require("../model/productModel");
const Orders = require("../model/orderModel");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

// const createProduct = async (req,res) => {
//     // step 1 : check incomming data
//     console.log(req.body);
//     console.log(req.files);

//     // step 2 : Destructuring data
//     const {
//         productName,
//         productPrice,
//         productDescription,
//         productCategory,
//         productQuantity,
//     } = req.body;
//     const {productImage} = req.files;

//     // step 3 : Validate data
//     if(!productName || !productPrice || !productDescription || !productCategory ||!productQuantity || !productImage){
//         return res.json({
//             success : false,
//             message : "Please fill all the fields"
//         })
//     }

//     try {
//         // upload image to cloudinary
//         const uploadedImage = await cloudinary.v2.uploader.upload(
//             productImage.path,
//             {
//                 folder : "products",
//                 crop : "scale"
//             }
//         )

//         // Save to database
//         const newProduct = new Products({
//             productName : productName,
//             productPrice : productPrice,
//             productDescription : productDescription,
//             productCategory : productCategory,
//             productQuantity : productQuantity,
//             productImageUrl : uploadedImage.secure_url
//         })
//         await newProduct.save();
//         res.json({
//             success : true,
//             message : "Product created successfully",
//             product : newProduct
//         })

//     } catch (error) {
//         res.status(500).json({
//             success : false,
//             message : "Internal server error"
//         })
//     }

// }

const uploadsDir = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

const createProduct = async (req, res) => {

  console.log(req.files.productImage[1])
  // Step 2: Destructuring data
  const {
    productName,
    productPrice,
    productDescription,
    productCategory,
    productQuantity,
  } = req.body;
  const productImage = req.files.productImage;

  // Step 3: Validate data
  if (
    !productName ||
    !productPrice ||
    !productDescription ||
    !productCategory ||
    !productQuantity
  ) {
    return res.json({
      success: false,
      message: "Please fill all the fields and upload at least one image.",
    });
  }

  if (!req.files || !req.files.productImage || req.files.productImage.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Please upload at least one image."
    });
  }

  try {

    var imageUrls = []

    for (let i = 0; i < productImage.length; i++) {
      const image = productImage[i];
      const uploadedImage = await cloudinary.v2.uploader.upload(image.path, {
        folder: "products",
        crop: "scale"
      });
      // Use the original filename (without extension) as the key
      const key = image.originalFilename.replace(/\.[^/.]+$/, "");

      imageUrls.push(uploadedImage.secure_url);
      
    }






    // Save to database
    const newProduct = new Products({
      productName: productName,
      productPrice: productPrice,
      productDescription: productDescription,
      productCategory: productCategory,
      productQuantity: productQuantity,
      productImageUrls: imageUrls,
    });

    console.log(newProduct)

    await newProduct.save();

    res.json({
      success: true,
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const allProducts = await Products.find({});
    res.json({
      success: true,
      message: "All products fetched successfully!",
      products: allProducts,
    });
  } catch (error) {
    console.log(error);
    res.send("Internal server error");
  }
};

const getProducts = async (req, res) => {
  const { categoryId } = req.params;
  let allProducts = [];

  console.log("Requested categoryId:", categoryId);

  try {
    if (!categoryId || categoryId === "undefined") {
      console.log("No categoryId provided or categoryId is undefined.");
      allProducts = await Products.find({});
      res.json({
        success: false,
        message: "Category ID is undefined or empty",
      });
    } else {
      console.log("Fetching products for categoryId:", categoryId);
      allProducts = await Products.find({ productCategory: categoryId });

      console.log("Number of products found:", allProducts.length); // Log the count of products found

      if (allProducts.length == 0) {
        res.json({
          success: true,
          message: `No products found for categoryId: ${categoryId}`,
        });
      } else {
        res.json({
          success: true,
          message: "All products fetched successfully!",
          products: allProducts,
        });
      }
    }
  } catch (error) {
    console.error("Error fetching products for categoryId:", categoryId, error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// fetch single product
const getSingleProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const singleProduct = await Products.findById(productId);
    res.json({
      success: true,
      message: "Single product fetched successfully!",
      product: singleProduct,
    });
  } catch (error) {
    console.log(error);
    res.send("Internal server error");
  }
};

// update product
const updateProduct = async (req, res) => {
  // step 1 : check incomming data
  console.log(req.body);
  console.log(req.files);

  // destructuring data
  const {
    productName,
    productPrice,
    productDescription,
    productCategory,
    productQuantity,
  } = req.body;
  const { productImage } = req.files;

  // validate data
  if (
    !productName ||
    !productPrice ||
    !productDescription ||
    !productCategory ||
    !productQuantity
  ) {
    return res.json({
      success: false,
      message: "Required fields are missing!",
    });
  }

  try {
    // case 1 : if there is image
    if (productImage) {
      // upload image to cloudinary
      const uploadedImage = await cloudinary.v2.uploader.upload(
        productImage.path,
        {
          folder: "products",
          crop: "scale",
        }
      );

      // make updated json data
      const updatedData = {
        productName: productName,
        productPrice: productPrice,
        productDescription: productDescription,
        productCategory: productCategory,
        productQuantity: productQuantity,
        productImageUrl: uploadedImage.secure_url,
      };

      // find product and update
      const productId = req.params.id;
      await Products.findByIdAndUpdate(productId, updatedData);
      res.json({
        success: true,
        message: "Product updated successfully with Image!",
        updatedProduct: updatedData,
      });
    } else {
      // update without image
      const updatedData = {
        productName: productName,
        productPrice: productPrice,
        productDescription: productDescription,
        productCategory: productCategory,
        productQuantity: productQuantity,
      };

      // find product and update
      const productId = req.params.id;
      await Products.findByIdAndUpdate(productId, updatedData);
      res.json({
        success: true,
        message: "Product updated successfully without Image!",
        updatedProduct: updatedData,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// delete product
const deleteProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    await Products.findByIdAndDelete(productId);
    res.json({
      success: true,
      message: "Product deleted successfully!",
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Server error!!",
    });
  }
};

// create order
const createOrder = async (req, res) => {
  console.log(req.body);
  const { userId, productId, quantity } = req.body;

  // validate data
  if (!userId || !productId || !quantity) {
    return res.json({
      success: false,
      message: "Please fill all the fields",
    });
  }

  try {
    const newOrder = new Orders({
      userId: userId,
      productId: productId,
      quantity: quantity,
    });
    await newOrder.save();
    res.json({
      success: true,
      message: "Order created successfully!",
      order: newOrder,
    });
  } catch (error) {
    res.send(error);
  }
};

// get orders and populate user
const getOrders = async (req, res) => {
  try {
    const orders = await Orders.find({
      $and: [
        { status: "pending" },
        {
          quantity: {
            $gt: 2,
          },
        },
      ],
    }).populate("userId", "firstName lastName");
    res.json({
      success: true,
      message: "All orders fetched successfully!",
      orders: orders,
    });
  } catch (error) {
    console.log(error);
  }
};

// pagination route
const getPagination = async (req, res) => {
  // step 1 : Get the page user requested
  const requestedPage = req.query.page;

  // step 2 : Result per page
  const resultPerPage = 5;

  try {
    // step 3 : Fetch all the products
    // Result : (test1,test2,test3,test4,test5,test6)
    const products = await Products.find({})
      .skip((requestedPage - 1) * resultPerPage)
      .limit(resultPerPage);

    if (products.length === 0) {
      return res.json({
        success: false,
        message: "No Products found!",
      });
    }

    res.json({
      success: true,
      products: products,
    });
  } catch (error) {
    console.log(error);
    res.send("Error Occured!");
  }
};

module.exports = {
  createProduct,
  getProducts,
  getAllProducts,
  upload,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  createOrder,
  getOrders,
  getPagination,
};
