import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleProductApi, updateProductApi } from "../../apis/Api";
import { toast } from "react-toastify";

const AdminEditProduct = () => {
  // receive product id from url
  const { id } = useParams();

  // load product data
  useEffect(() => {
    getSingleProductApi(id).then((res) => {
      console.log(res.data);
      setProductName(res.data.product.productName);
      setProductPrice(res.data.product.productPrice);
      setProductDescription(res.data.product.productDescription);
      setProductCategory(res.data.product.productCategory);
      setProductQuantity(res.data.product.productQuantity);
      setOldImage(res.data.product.productImageUrl);
    });
  }, [id]);

  // useState hooks for product details
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [oldImage, setOldImage] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  // image upload function
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    console.log(file);
    setProductImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  // handle submit function
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("productPrice", productPrice);
    formData.append("productDescription", productDescription);
    formData.append("productCategory", productCategory);
    formData.append("productQuantity", productQuantity);
    formData.append("productImage", productImage);

    updateProductApi(id, formData)
      .then((res) => {
        if (res.data.success === false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          navigate("/admin-dashboard");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Internal Server Error!");
      });
  };

  return (
    <div className="mx-4 my-4 mt-28">
      <h3 className="text-lg font-semibold">
        Editing product - <span className="font-semibold">{productName}</span>
      </h3>
      <div className="flex gap-3">
        <form className="flex-1">
          <label className="block">Product Name</label>
          <input
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            placeholder="Enter product name"
          />

          <label className="block mt-4">Product Description</label>
          <textarea
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            className="form-textarea mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            placeholder="Enter description"
            rows="4"
          ></textarea>

          <label className="block mt-4">Price</label>
          <input
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            type="number"
            className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            placeholder="Enter your price"
          />

          <label className="block mt-4">Select category</label>
          <select
            value={productCategory}
            onChange={(e) => setProductCategory(e.target.value)}
            className="form-select mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          >
            <option value="Hemp">Hemp Products</option>
            <option value="Singing Bowl">Singing Bowl</option>
            <option value="Pottery">Pottery</option>
            <option value="Bamboo Products">Bamboo Products</option>
            <option value="Pashmina Shawl">Pashmina Shawl</option>
            <option value="Dhaka Products">Dhaka Products</option>
            <option value="Khukuri">Khukuri</option>
            <option value="Thanka Paintings">Thanka Paintings</option>
            <option value="Jewelries">Jewelries</option>
          </select>

          <label className="block mt-4">Quantity</label>
          <input
            value={productQuantity}
            onChange={(e) => setProductQuantity(e.target.value)}
            type="number"
            className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            placeholder="Enter your quantity"
          />

          <label className="block mt-4">Product Image</label>
          <input
            onChange={handleImageUpload}
            type="file"
            className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
          <button
            onClick={handleSubmit}
            className="btn mt-4 w-full bg-black text-white font-bold py-2 px-4 rounded"
          >
            Update product
          </button>
        </form>
        <div>
          <h6 className="text-sm font-semibold mt-4">Old Image Preview</h6>
          <img
            className="rounded-lg object-cover"
            src={oldImage}
            alt=""
            style={{ width: "300px", height: "300px" }}
          />

          <h6 className="text-sm font-semibold mt-4">New Image</h6>
          {previewImage ? (
            <img
              src={previewImage}
              alt="product Image"
              className="rounded-lg object-cover"
              style={{ width: "300px", height: "300px" }}
            />
          ) : (
            <p>No image selected!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminEditProduct;
