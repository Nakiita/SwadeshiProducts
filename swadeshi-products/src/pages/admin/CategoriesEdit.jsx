import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleCategoryApi, updateCategoryApi } from "../../apis/Api";
import { toast } from "react-toastify";

const CategoriesEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getSingleCategoryApi(id).then((res) => {
      console.log(res.data);
      setCategoryName(res.data.category.categoryName);
      setSlug(res.data.category.slug);
      setOldImage(res.data.category.categoryImageUrl);
    });
  }, [id]);

  const [categoryName, setCategoryName] = useState("");
  const [slug, setSlug] = useState("");
  const [oldImage, setOldImage] = useState("");
  const [categoryImage, setCategoryImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    console.log(file);
    setCategoryImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("categoryName", categoryName);
    formData.append("slug", slug);
    formData.append("categoryImage", categoryImage);

    updateCategoryApi(id, formData)
      .then((res) => {
        if (res.data.success === false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          navigate("/categories-dashboard");
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
        Editing Category - <span className="font-semibold">{categoryName}</span>
      </h3>
      <div className="flex gap-3">
        <form className="flex-1">
          <label className="block">Category Name</label>
          <input
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            placeholder="Enter category name"
          />

          <label className="block mt-4">Slug</label>
          <input
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            type="text"
            className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            placeholder="Enter slug"
          />

          <label className="block mt-4">Category Image</label>
          <input
            onChange={handleImageUpload}
            type="file"
            className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
          <button
            onClick={handleSubmit}
            className="btn mt-4 w-full bg-black text-white font-bold py-2 px-4 rounded"
          >
            Update Category
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
              alt="category Image"
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

export default CategoriesEdit;
