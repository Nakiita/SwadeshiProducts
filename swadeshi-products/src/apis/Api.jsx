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
export const createProductApi = (formData) =>
  Api.post("/api/product/create_product", formData);

// get products API
export const getAllProductsApi = (categoryId) =>
  Api.get(`/api/product/get_products/${categoryId}`);

// get single product API
export const getSingleProductApi = (id) =>
  Api.get(`/api/product/get_product/${id}`);

// update product
export const updateProductApi = (id, formData) =>
  Api.put(`/api/product/update_product/${id}`, formData, config);

// delete product
export const deleteProductApi = (id) =>
  Api.delete(`/api/product/delete_product/${id}`, config);

export const createCategoryApi = (formData) =>
  Api.post("/api/category/createCategory", formData);

// get products API
export const getAllCategoriesApi = () => Api.get("/api/category/getCategories");

export const getSingleCategoryApi = (id) =>
  Api.get(`/api/category/getCategory/${id}`);

export const updateCategoryApi = (id, formData) =>
  Api.put(`/api/category/updateCategory/${id}`, formData, config);

// delete product
export const deleteCategoryApi = (id) =>
  Api.delete(`/api/category/deleteCategory/${id}`, config);

// update user
export const updateUserApi = (id, formData) =>
  Api.put(`/api/user/update_user/${id}`, formData, config);

