import axios from "axios";
import { BACKEND_URL } from "../../../services/authService";

const API_URL = `${BACKEND_URL}/api/products`;

// Create Product
const createProduct = async (formData) => {
  const response = await axios.post(API_URL, formData);
  return response.data;
};

//Get Products

const getProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

//Delete Product

const deleteProduct = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

//Get a single Product

const getProduct = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Update product

const updateProduct = async (id,formData) => {
    const response = await axios.patch(`${API_URL}/${id}`,formData);
    return response.data;
  };
  

const productService = {
  createProduct,
  getProducts,
  deleteProduct,
  getProduct,
  updateProduct
};

export default productService;
