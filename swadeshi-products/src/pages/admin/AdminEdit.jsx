import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleProductApi, updateProductApi, getAllCategoriesApi } from "../../apis/Api";
import { toast } from "react-toastify";

const AdminEditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    productName: '',
    productPrice: '',
    productDescription: '',
    productCategory: '',
    productQuantity: '',
    productImageUrls: [],
  });
  const [categories, setCategories] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productRes, categoriesRes] = await Promise.all([
          getSingleProductApi(id),
          getAllCategoriesApi()
        ]);
        const { product } = productRes.data;
        setProduct({
          productName: product.productName,
          productPrice: product.productPrice,
          productDescription: product.productDescription,
          productCategory: product.productCategory,
          productQuantity: product.productQuantity,
          productImageUrls: product.productImageUrls,
        });
        setCategories(categoriesRes.data.categories || []);
        setPreviewImage(product.productImageUrls[0] || 'path_to_default_image.jpg');
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to fetch product details.");
      }
    };
    fetchData();
  }, [id]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("productName", product.productName);
    formData.append("productPrice", product.productPrice);
    formData.append("productDescription", product.productDescription);
    formData.append("productCategory", product.productCategory);
    formData.append("productQuantity", product.productQuantity);
    if (selectedFile) {
      formData.append("productImage", selectedFile);
    }

    try {
      const res = await updateProductApi(id, formData);
      if (res.data.success) {
        toast.success("Product updated successfully.");
        navigate("/admin-dashboard");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.error("Server Error:", err);
      toast.error("Internal Server Error!");
    }
  };

  return (
    <div className="mx-4 my-4 mt-28">
      <h3 className="text-lg font-semibold">
        Editing Product - <span className="font-semibold">{product.productName}</span>
      </h3>
      <form onSubmit={handleSubmit} className="w-full">
        <label className="block">Product Name</label>
        <input
          value={product.productName}
          onChange={(e) => setProduct({ ...product, productName: e.target.value })}
          className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          placeholder="Enter product name"
          required
        />

        <label className="block mt-4">Product Description</label>
        <textarea
          value={product.productDescription}
          onChange={(e) => setProduct({ ...product, productDescription: e.target.value })}
          className="form-textarea mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          placeholder="Enter description"
          rows="4"
          required
        />

        <label className="block mt-4">Price</label>
        <input
          value={product.productPrice}
          onChange={(e) => setProduct({ ...product, productPrice: e.target.value })}
          type="number"
          className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          placeholder="Enter your price"
          required
        />

        <label className="block mt-4">Select Category</label>
        <select
          value={product.productCategory}
          onChange={(e) => setProduct({ ...product, productCategory: e.target.value })}
          className="form-select mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
        >
          <option value="">Select a category</option>
          {categories.map(category => (
            <option key={category._id} value={category._id}>
              {category.categoryName}
            </option>
          ))}
        </select>

        <label className="block mt-4">Quantity</label>
        <input
          value={product.productQuantity}
          onChange={(e) => setProduct({ ...product, productQuantity: e.target.value })}
          type="number"
          className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          placeholder="Enter quantity"
          required
        />

        <label className="block mt-4">Product Image</label>
        <input
          onChange={handleImageUpload}
          type="file"
          className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />

        {previewImage && (
          <img
            src={previewImage}
            alt="Preview"
            className="rounded-lg object-cover mt-4"
            style={{ width: "300px", height: "300px" }}
          />
        )}

        <button
          type="submit"
          className="btn mt-4 w-full bg-black text-white font-bold py-2 px-4 rounded"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default AdminEditProduct;
