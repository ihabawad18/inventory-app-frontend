import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
    SET_SUBMITTED,
  getProduct,
  selectIsLoading,
  selectIsSubmitted,
  selectProduct,
  updateProduct,
} from "../../redux/features/product/productSlice";
import ProductForm from "../../components/productForm";
import Loader from "../../components/loader/Loader";

const EditProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);

  const productEdit = useSelector(selectProduct);

  const [product, setProduct] = useState(productEdit);
  const [productImage, setProductImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState("");

  const isSubmitted = useSelector(selectIsSubmitted);

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);

  useEffect(() => {
    setProduct(productEdit);
    setImagePreview(
      productEdit && productEdit.image ? `${productEdit.image.filePath}` : null
    );
    setDescription(
      productEdit && productEdit.description ? `${productEdit.description}` : ""
    );
  }, [productEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };
  const handleImageChange = (e) => {
    setProductImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const saveProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", product?.name);
    formData.append("category", product?.category);
    formData.append("price", product?.price);
    formData.append("quantity", product?.quantity);
    formData.append("description", description);
    formData.append("image", productImage);
    await dispatch(updateProduct({ id, formData }));
  };

  const navToDash = () => {
    dispatch(SET_SUBMITTED(false));
    navigate("/dashboard");
  };

  return (
    <div>
      {isLoading && <Loader />}
      {isSubmitted && navToDash()}
      <h3 className="text-3xl font-medium my-4">Edit Product</h3>
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

export default EditProduct;
