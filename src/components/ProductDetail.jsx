import React, { useEffect } from "react";
import useRedirectLoggedOut from "../hooks/useRedirectLoggedOut";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn } from "../redux/features/auth/authSlice";
import { getProduct } from "../redux/features/product/productSlice";
import Card from "./Card";
import { SpinnerImg } from "./loader/Loader";
import DOMPurify from "dompurify";

const ProductDetail = () => {
  useRedirectLoggedOut("/login");
  const { id } = useParams();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { product, isLoading, message, isError } = useSelector(
    (state) => state.product
  );
  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getProduct(id));
      // console.log(product);
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  const inStock = (quantity) => {
    if (quantity > 0) {
      return <span className="text-green-600 font-semibold">In Stock</span>;
    }
    return <span className="text-red-600 font-semibold">Out of Stock</span>;
  };
  console.log(product);
  return (
    // className="mt-10" possible
    <div className="text-2xl">
      <h1>Product Details</h1>
      <Card cardClass={"p-20 mt-10"}>
        {isLoading && <SpinnerImg />}
        <div className="prduct-img">
          <Card cardClass={"group full"}>
            {product?.image ? (
              <img src={product.image.filePath} alt={product.image.fileName} />
            ) : (
              <p>No image set for this product.</p>
            )}
          </Card>
        </div>
        <h3 className="mt-6">
          Product Availability: {inStock(product?.quantity)}
        </h3>
        <hr className="border-gray-500 my-3" />

        <div className="my-5">
          <p className="text-3xl mb-5">
            <span className="bg-orange-500 text-white font-medium rounded p-1">
              Name:
            </span>
            <b>
              {"  "}
              {product?.name}
            </b>
          </p>
          <p>
            <b>&rarr; SKU: </b>
            {product?.sku}
          </p>
          <p>
            <b>&rarr; Category: </b>
            {product?.category}
          </p>
          <p>
            <b>&rarr; Price: </b>
            {"$"}
            {product?.price}
          </p>
          <p>
            <b>&rarr; Quantity in stock: </b>
            {product?.quantity}
          </p>
          <p>
            <b>&rarr; Total value in stock: </b>
            {product?.quantity * product?.price}
          </p>
        </div>

        <hr className="border-gray-500 my-3" />
        <h4 className="text-2xl my-2">
          <b>&rarr; Description:</b>{" "}
        </h4>
        <div
        className="mt-2 mb-4"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(product?.description),
          }}
        />
        <hr className="border-gray-500 my-3" />
        <code className="text-lg text-black">Created on: {product?.createdAt}</code><br/>
        <code className="text-lg text-black">Last updated: {product?.updatedAt}</code>
      </Card>
    </div>
  );
};

export default ProductDetail;
