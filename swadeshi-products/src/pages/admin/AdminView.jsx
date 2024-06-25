import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleProductApi } from "../../apis/Api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

const AdminView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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

  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [oldImage, setOldImage] = useState("");

  return (
    <section className="flex min-h-screen items-center">
      <div className="container mx-auto px-4 py-5 flex justify-center">
        <div className="max-w-4xl">
          <div className="flex flex-col items-center shadow-lg">
            <div className="flex flex-wrap">
              <div className="w-full md:w-1/2 p-4">
                <img
                  className="mx-auto h-72 w-72 object-cover rounded-lg mb-3"
                  src={oldImage}
                  alt={productName}
                />
              </div>

              <div className="absolute top-0 right-0 m-2">
                <button
                  onClick={() => navigate("/adminDashboard")}
                  className="text-black"
                >
                  <FontAwesomeIcon icon={faClose} />
                </button>
              </div>

              <div className="w-full md:w-1/2 flex items-center">
                <div className="p-5 text-black w-full">
                  <div className="mb-2 flex justify-center">
                    <i className="fas fa-cubes text-2xl mr-2"></i>
                  </div>
                  <h3 className="text-blue-500 whitespace-nowrap text-center">
                    {productName}
                  </h3>
                  <h4 className="text-green-500 text-center">
                    {productCategory}
                  </h4>
                  <div className="card-body">
                    <p className="card-text">
                      <strong>Description: </strong>
                      {productDescription}
                      <br />
                      <strong>Price: </strong>
                      {productPrice}
                      <br />
                      <strong>Available: </strong>
                      {productQuantity}
                      <br />
                    </p>
                  </div>

                  <div className="pt-1 mb-4 flex justify-center">
                    <button
                      type="button"
                      className="w-1/2 mb-2 bg-gray-800 text-white py-2 rounded"
                      onClick={() => navigate("/admin-dashboard")}
                    >
                      Back
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminView;
