import axios from "axios";

const Api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});
const config = {
  headers: {
    "Content-Type": "multipart/form-data",
    authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};

//Creating  test
export const testApi = () => Api.get("/test");

//  Creating register api
export const registerApi = (data) => Api.post("/api/user/register", data);

// Create login api
export const loginApi = (data) => Api.post("/api/user/login", data);

//forgot password
export const forgotPasswordApi = (data) =>
  Api.post("/api/user/forgot/password", data);

//reset password
export const resetPasswordApi = (data, token) =>
  Api.put(`/api/user/password/reset/${token}`, data);

// create product API
export const createProductApi = (formData) => Api.post('/api/product/create_product', formData)

// get products API
export const getAllProductsApi = () => Api.get('/api/product/get_products')

// get single product API
export const getSingleProductApi = (id) => Api.get(`/api/product/get_product/${id}`)

// update product
export const updateProductApi 
        = (id, formData) => Api.put(`/api/product/update_product/${id}`, formData, config)

// delete product
export const deleteProductApi = (id) => Api.delete(`/api/product/delete_product/${id}`, config)




