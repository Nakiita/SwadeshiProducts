import React, { useState, useEffect } from "react";
import {
  createProductApi,
  deleteProductApi,
  getAllProductsApi,
} from "../../apis/Api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faEdit,
  faTrash,
  faEye,
} from "@fortawesome/free-solid-svg-icons";

const AdminDashboard = () => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getAllProductsApi().then((res) => {
      setProducts(res.data.products);
    });
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setProductImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("productPrice", productPrice);
    formData.append("productDescription", productDescription);
    formData.append("productCategory", productCategory);
    formData.append("productQuantity", productQuantity);
    formData.append("productImage", productImage);

    createProductApi(formData)
      .then((res) => {
        if (res.data.success === false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          setIsModalOpen(false); // Close modal on success
          window.location.reload(); // Refresh to show the newly created product.
        }
      })
      .catch((err) => {
        toast.error("Internal Server Error!");
      });
  };

  const handleDelete = (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirm) return;

    deleteProductApi(id).then((res) => {
      if (res.data.success === false) {
        toast.error(res.data.message);
      } else {
        toast.success(res.data.message);
        setProducts(products.filter((product) => product._id !== id));
      }
    });
  };

  const filteredProducts = products.filter((product) =>
    product.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="container mx-auto">
        <div className="flex flex-wrap">
          <div className="w-full lg:w-1/5">
            <Sidebar />
          </div>
          <div className="w-full lg:w-4/5">
            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-4">Products</h3>
              <p className="mb-6">Add new products</p>
              <div className="flex justify-end mb-4">
                <button
                  type="button"
                  className="bg-black text-white p-2 rounded-md"
                  onClick={() => setIsModalOpen(true)}
                >
                  Add Product
                </button>
              </div>
              <div className="flex justify-center mb-4">
                <form className="flex w-full max-w-md">
                  <input
                    type="text"
                    placeholder="Search by Name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                </form>
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
                            <label className="block mb-2">Product Name</label>
                            <input
                              onChange={(e) => setProductName(e.target.value)}
                              className="block w-full mb-4 p-2 border rounded"
                              type="text"
                              placeholder="Enter product name"
                            />
                            <label className="block mb-2">
                              Product Description
                            </label>
                            <textarea
                              onChange={(e) =>
                                setProductDescription(e.target.value)
                              }
                              className="block w-full mb-4 p-2 border rounded"
                              placeholder="Enter description"
                              cols="4"
                              rows="4"
                            ></textarea>
                            <label className="block mb-2">Price</label>
                            <input
                              onChange={(e) => setProductPrice(e.target.value)}
                              type="number"
                              className="block w-full mb-4 p-2 border rounded"
                              placeholder="Enter your price"
                            />
                            <label className="block mb-2">
                              Select category
                            </label>
                            <select
                              onChange={(e) =>
                                setProductCategory(e.target.value)
                              }
                              className="block w-full mb-4 p-2 border rounded"
                            >
                              <option value="select">Select products</option>
                              <option value="Hemp">Hemp Products</option>
                              <option value="Singing Bowl">Singing Bowl</option>
                              <option value="Pottery">Pottery</option>
                              <option value="Bamboo Products">
                                Bamboo Products
                              </option>
                              <option value="Pashmina Shawl">
                                Pashmina Shawl
                              </option>
                              <option value="Dhaka Products">
                                Dhaka Products
                              </option>
                              <option value="Khukuri">Khukuri</option>
                              <option value="Thanka Paintings">
                                Thanka Paintings
                              </option>
                              <option value="Jwelleries">Jwelleries</option>
                            </select>
                            <label className="block mb-2">
                              Product Quantity
                            </label>
                            <input
                              onChange={(e) =>
                                setProductQuantity(e.target.value)
                              }
                              type="number"
                              className="block w-full mb-4 p-2 border rounded"
                              placeholder="Enter total quantity"
                            />
                            <label className="block mb-2">Product Image</label>
                            <input
                              onChange={handleImageUpload}
                              type="file"
                              className="block w-full mb-4 p-2 border rounded"
                            />
                            {previewImage && (
                              <img
                                src={previewImage}
                                className="w-full h-auto rounded mt-2"
                                alt="Product Preview"
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                      <button
                        onClick={handleSubmit}
                        type="button"
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                      >
                        Save changes
                      </button>
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
      </div>
    </>
  );
};

export default AdminDashboard;
