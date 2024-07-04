import React, { useState, useEffect } from "react";
import {
  createProductApi,
  getAllProductsApi,
  getAllCategoriesApi,
  deleteProductApi,
  getProductsApi,
} from "../../apis/Api";
import { toast } from "react-toastify";
import Sidebar from "../../components/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faEye } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [previewImages, setPreviewImages] = useState([]);
  const [products, setProducts] = useState([]); // Ensure default is an empty array
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsRes = await getProductsApi();
        const categoriesRes = await getAllCategoriesApi();
        setProducts(productsRes.data.products || []); // Use logical OR to default to empty array
        setCategories(categoriesRes.data.categories || []); // Handle undefined categories similarly
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to fetch data.");
      }
    };
    fetchData();
  }, []);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);
    setPreviewImages(files.map((file) => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("productPrice", productPrice);
    formData.append("productDescription", productDescription);
    formData.append("productCategory", productCategory);
    formData.append("productQuantity", productQuantity);
    selectedFiles.forEach((file) => {
      formData.append("productImage", file);
    });

    try {
      const response = await createProductApi(formData);
      if (response.data.success) {
        toast.success(response.data.message);
        setIsModalOpen(false);
        setProducts([...products, response.data.product]); // Ensure this doesn't fail if products is undefined
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error("Failed to create product due to server error.");
      console.error("Upload Error:", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await deleteProductApi(id);
        if (response.data.success) {
          toast.success(response.data.message);
          setProducts(products.filter((product) => product._id !== id));
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error("Error deleting product.");
        console.error("Error:", error);
      }
    }
  };

  // Safe use of filter, ensuring products is always treated as an array
  const filteredProducts =
    products && products.length > 0
      ? products.filter((product) =>
          product.productName.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : [];

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-wrap">
        <div className="w-full lg:w-1/5">
          <Sidebar />
        </div>
        <div className="w-full lg:w-4/5">
          <div className="p-6">
            <h3 className="text-2xl font-semibold mb-4">Products</h3>
            <button
              onClick={() => setIsModalOpen(true)}
              className="mb-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Add Product
            </button>
            <input
              type="text"
              placeholder="Search by Name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input mb-4 p-2 border rounded w-full"
            />
          </div>
          <div
            className={`fixed z-10 inset-0 overflow-y-auto ${
              isModalOpen ? "" : "hidden"
            }`}
          >
            <div className="flex items-center justify-center min-h-screen px-4 text-center">
              <div
                className="fixed inset-0 transition-opacity"
                aria-hidden="true"
              >
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Create a new product!
                      </h3>
                      <div className="mt-2">
                        {/* Form for adding a new product */}
                        <form onSubmit={handleSubmit}>
                          <label className="block mb-2">Product Name</label>
                          <input
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            className="block w-full mb-4 p-2 border rounded"
                            type="text"
                            placeholder="Enter product name"
                            required
                          />
                          <label className="block mb-2">
                            Product Description
                          </label>
                          <textarea
                            value={productDescription}
                            onChange={(e) =>
                              setProductDescription(e.target.value)
                            }
                            className="block w-full mb-4 p-2 border rounded"
                            placeholder="Enter description"
                            required
                          ></textarea>
                          <label className="block mb-2">Price</label>
                          <input
                            value={productPrice}
                            onChange={(e) => setProductPrice(e.target.value)}
                            type="number"
                            className="block w-full mb-4 p-2 border rounded"
                            placeholder="Enter your price"
                            required
                          />
                          <label className="block mb-2">Select category</label>
                          <select
                            value={productCategory}
                            onChange={(e) => setProductCategory(e.target.value)}
                            className="block w-full mb-4 p-2 border rounded"
                            required
                          >
                            <option value="">Select category</option>
                            {categories.map((category) => (
                              <option key={category._id} value={category._id}>
                                {category.categoryName}
                              </option>
                            ))}
                          </select>
                          <label className="block mb-2">Product Quantity</label>
                          <input
                            value={productQuantity}
                            onChange={(e) => setProductQuantity(e.target.value)}
                            type="number"
                            className="block w-full mb-4 p-2 border rounded"
                            placeholder="Enter total quantity"
                            required
                          />
                          <label className="block mb-2">Product Image</label>
                          <input
                            multiple
                            onChange={handleFileChange}
                            type="file"
                            className="block w-full mb-4 p-2 border rounded"
                            required
                          />
                          {previewImages.map((imgSrc, index) => (
                            <img
                              key={index}
                              src={imgSrc}
                              className="w-full h-auto rounded mt-2"
                              alt={`Product Preview ${index + 1}`}
                            />
                          ))}
                          <button
                            type="submit"
                            className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Save Changes
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="w-1/6 py-2 px-4">Product Image</th>
                  <th className="w-1/6 py-2 px-4">Product Name</th>
                  <th className="w-1/6 py-2 px-4">Product Price</th>
                  <th className="w-1/6 py-2 px-4">Product Category</th>
                  <th className="w-1/6 py-2 px-4">Product Description</th>
                  <th className="w-1/6 py-2 px-4">Product Quantity</th>
                  <th className="w-1/6 py-2 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((item) => (
                  <tr key={item._id} className="border-b">
                    <td className="py-2 px-4">
                      <img
                        src={item.productImageUrl}
                        className="w-24 h-24 object-cover rounded"
                        alt="Product"
                      />
                    </td>
                    <td className="py-2 px-4">{item.productName}</td>
                    <td className="py-2 px-4">NPR.{item.productPrice}</td>
                    <td className="py-2 px-4">{item.productCategory}</td>
                    <td className="py-2 px-4">{item.productDescription}</td>
                    <td className="py-2 px-4">{item.productQuantity}</td>
                    <td className="py-2 px-4">
                      <div className="flex space-x-2">
                        <Link
                          to={`/admin/edit/${item._id}`}
                          className="text-blue-600"
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </Link>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="text-red-600"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                        <Link
                          to={`/admin/view/${item._id}`}
                          className="text-green-600"
                        >
                          <FontAwesomeIcon icon={faEye} />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
