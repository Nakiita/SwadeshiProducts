import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleProductApi } from "../../apis/Api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

const AdminView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  //UseEffect
  useEffect(() => {
    getSingleProductApi(id).then((res) => {
        console.log(res.data)
        setProductName(res.data.product.productName)
        setProductPrice(res.data.product.productPrice)
        setProductDescription(res.data.product.productDescription)
        setProductCategory(res.data.product.productCategory)
        setProductQuantity(res.data.product.productQuantity)
        setOldImage(res.data.product.productImageUrl)
    })
}, [id])

  //Make UseState
  const [productName, setProductName] = useState('')
    const [productPrice, setProductPrice] = useState('')
    const [productDescription, setProductDescription] = useState('')
    const [productCategory, setProductCategory] = useState('')
    const [productQuantity, setProductQuantity] = useState('')
    const [oldImage, setOldImage] = useState('')

  return (
    <>
      <section class="row min-vh-100 align-items-center">
        <div class="container py-5 d-flex justify-content-center">
          <div class="col col-md-10 col-sm-12 col-lg-7">
            <div class="card d-flex align-items-center shadow-lg">
              <div class="row">
                <div class="col-md-6 col-lg-6 order-md-1 order-lg-1 mb-4">
                  <img
                    className="img-fluid rounded-4 object-fit-cover mb-3"
                    height={300}
                    width={300}
                    src={oldImage}
                    alt={productName}
                    style={{ marginTop: 50, marginLeft: 70 }}
                  />
                </div>

                <div>
                  <a
                    className="position-absolute top-0 end-0 m-2 text-black"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate("/adminDashboard")}
                  >
                    <FontAwesomeIcon icon={faClose} />
                  </a>
                </div>
                <div class="col-md-6 col-lg-6 order-lg-3 d-flex align-items-center">
                  <div class="card-body p-5 p-lg-5 text-black">
                    <form>
                      <div class="mb-2 d-flex justify-content-center">
                        <i class="fas fa-cubes fa-2x me-2"></i>
                      </div>
                      <h3 style={{ color: "blue", whiteSpace: "nowrap" }}>
                       {productName}
                      </h3>
                      <h4 style={{ color: "green" }}>{productCategory}</h4>
                      <div className="card-body">
                        <p className="card-text">
                          <strong>Description: </strong> {productDescription}
                          <br />
                          <strong>Price: </strong> {productPrice}
                          <br />
                          <strong>Available:  </strong> {productQuantity}
                          <br />
                          
                        </p>
                      </div>
                    </form>

                    <div class="pt-1 mb-4 d-flex text-center justify-content-center">
                      <button
                        type="button"
                        className="btn w-50 mb-2 btn btn-dark"
                        onClick={() => navigate("/adminDashboard")}
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
    </>
  );
};

export default AdminView;