import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createProduct,
  selectIsLoading,
  selectIsSubmitted,
} from "../../redux/features/product/productSlice";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import ProductForm from "../../components/productForm";

const initialState = {
  name: "",
  category: "",
  quantity: "",
  price: "",
};

const AddProduct = () => {
  const [product, setProduct] = useState(initialState);
  const [productImage, setProductImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState("");
  const isLoading = useSelector(selectIsLoading);
  const isSubmitted = useSelector(selectIsSubmitted);
  const { name, category, price, quantity } = product;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };
  const handleImageChange = (e) => {
    setProductImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const generateSKU = (category) => {
    const letters = category.slice(0, 3).toUpperCase();
    const number = Date.now();
    const sku = letters + "-" + number;
    return sku;
  };

  const saveProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("sku", generateSKU(category));
    formData.append("description", description);
    formData.append("image", productImage);
    dispatch(createProduct(formData));
  };
  const navToDash = ()=>{
    navigate("/dashboard");
  }
  return (
    <div>
      {isLoading && <Loader />}
      {isSubmitted && navToDash()}  
      <h3 className="text-3xl font-medium my-4">Add New Product</h3>
      <ProductForm
        product={product}
        productImage={productImage}
        imagePreview={imagePreview}
        description={description}
        setDescription={setDescription}
        handleInputChange={handleInputChange}
        handleImageChange={handleImageChange}
        saveProduct={saveProduct}
      />
    </div>
  );
};

export default AddProduct;
