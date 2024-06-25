import React, { useState, useEffect } from "react";
import {
  createCategoryApi,
  deleteCategoryApi,
  getAllCategoriesApi,
} from "../../apis/Api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const CategoriesDashboard = () => {
  const [categoryName, setCategoryName] = useState("");
  const [slug, setSlug] = useState("");
  const [categoryImage, setCategoryImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getAllCategoriesApi().then((res) => {
      setCategories(res.data.categories);
    });
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setCategoryImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("categoryName", categoryName);
    formData.append("slug", slug);
    formData.append("categoryImage", categoryImage);

    createCategoryApi(formData)
      .then((res) => {
        if (res.data.success === false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          setIsModalOpen(false); // Close modal on success
          window.location.reload(); // Refresh to show the newly created category.
        }
      })
      .catch((err) => {
        toast.error("Internal Server Error!");
      });
  };

  const handleDelete = (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (!confirm) return;

    deleteCategoryApi(id).then((res) => {
      if (res.data.success === false) {
        toast.error(res.data.message);
      } else {
        toast.success(res.data.message);
        setCategories(categories.filter((category) => category._id !== id));
      }
    });
  };

  return (
    <>
      <div className="container mx-auto">
        <div className="flex flex-wrap">
          <div className="w-full lg:w-1/5">
            <Sidebar />
          </div>
          <div className="w-full lg:w-4/5">
            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-4">Categories</h3>
              <div className="flex justify-end mb-4">
                <button
                  type="button"
                  className="bg-black text-white p-2 rounded-md"
                  onClick={() => setIsModalOpen(true)}
                >
                  Add Category
                </button>
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
                  <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                          <h3 className="text-lg leading-6 font-medium text-gray-900">
                            Create a new category
                          </h3>
                          <div className="mt-2">
                            <label className="block mb-2">Category Name</label>
                            <input
                              onChange={(e) => setCategoryName(e.target.value)}
                              className="block w-full mb-4 p-2 border rounded"
                              type="text"
                              placeholder="Enter category name"
                            />
                            <label className="block mb-2">Slug</label>
                            <input
                              onChange={(e) => setSlug(e.target.value)}
                              className="block w-full mb-4 p-2 border rounded"
                              type="text"
                              placeholder="Enter slug"
                            />
                            <label className="block mb-2">Category Image</label>
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
              <table className="min-w-full bg-white">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="py-2 px-4">Category Image</th>
                    <th className="py-2 px-4">Category Name</th>
                    <th className="py-2 px-4">Slug</th>
                    <th className="py-2 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category) => (
                    <tr key={category._id} className="border-b">
                      <td className="py-2 px-4">
                        <img
                          src={category.categoryImageUrl}
                          className="w-24 h-24 object-cover rounded"
                          alt="Category"
                        />
                      </td>
                      <td className="py-2 px-4">{category.categoryName}</td>
                      <td className="py-2 px-4">{category.slug}</td>
                      <td className="py-2 px-4">
                        <div className="flex space-x-2">
                          <Link
                            to={`/categories/edit/${category._id}`}
                            className="text-blue-600"
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </Link>
                          <button
                            onClick={() => handleDelete(category._id)}
                            className="text-red-600"
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
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
    </>
  );
};

export default CategoriesDashboard;
