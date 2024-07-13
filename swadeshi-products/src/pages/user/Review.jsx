import React, { useState } from "react";
import { createReviewApi } from "../../apis/Api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const Review = () => {
  const navigate = useNavigate();
  const [review, setReview] = useState("");


const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("review", review);

createReviewApi(formData)
      .then((res) => {
        if (res.data.success === false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          
         navigate ('/');
        }
      })
      .catch((err) => {
        toast.error("Internal Server Error!");
      });
    };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="space-y-6 flex flex-col justify-between items-center">
          <label
            htmlFor="review"
            className="block text-lg font-medium text-gray-700"
          >
            Write a Review!
          </label>
          <textarea
            id="review"
            rows="5"
            className="w-full p-4 text-base border-2 border-blue-500 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Write your review here..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
          <button
            type="submit"
            className="flex items-center px-4 py-2 text-white bg-black rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default Review;
