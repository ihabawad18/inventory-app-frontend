import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Card from "./Card";
import "./productForm.css";
const ProductForm = ({
  product,
  productImage,
  imagePreview,
  description,
  setDescription,
  handleInputChange,
  handleImageChange,
  saveProduct,
}) => {
  return (
    <div>
      <Card cardClass={"full"}>
        <form onSubmit={saveProduct} className="form-product">
          <Card cardClass={"group full"}>
            <label className="block text-2xl font-medium">Product Image:</label>
            <code className="block mb-2 ">
              Supported Formats: jpg, jpeg, png
            </code>
            <input
              className="my-3 text-xl text-gray-500"
              type="file"
              name="image"
              onChange={(e) => handleImageChange(e)}
            />
            {imagePreview !== null ? (
              <div className="mt-3">
                <img src={imagePreview} alt="productImage" />
              </div>
            ) : (
              <p className="mt-3 text-lg ml-1 font-medium">
                {" "}
                No image set for this product.
              </p>
            )}
          </Card>
          <label htmlFor="productname" className="mt-3">
            Product Name:
          </label>
          <input
            type="text"
            value={product?.name}
            placeholder="Product Name"
            name="name"
            onChange={handleInputChange}
          />
          <label htmlFor="productcategory" className="mt-3">
            Product Category:
          </label>
          <input
            type="text"
            value={product?.category}
            placeholder="Product Category"
            name="category"
            onChange={handleInputChange}
          />
          <label htmlFor="productprice" className="mt-3">
            Product Price:
          </label>
          <input
            type="text"
            value={product?.price}
            placeholder="Product Price"
            name="price"
            onChange={handleInputChange}
          />
          <label htmlFor="productquantity" className="mt-3">
            Product Quantity:
          </label>
          <input
            type="text"
            value={product?.quantity}
            placeholder="Product Quantity"
            name="quantity"
            onChange={handleInputChange}
          />
          <label htmlFor="productdescription" className="my-3">
            Product Description:
          </label>
          <ReactQuill
            theme="snow"
            value={description}
            onChange={setDescription}
            modules={ProductForm.modules}
            formats={ProductForm.formats}
          />
          <button
            type="submit"
            className="p-3 bg-blue-500 rounded my-5 text-white text-xl font-medium hover:-translate-y-1 transition-transform duration-300 ease-in-out"
          >
            Save Product
          </button>
        </form>
      </Card>
    </div>
  );
};

ProductForm.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["clean"],
  ],
};
ProductForm.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "color",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "video",
  "image",
  "code-block",
  "align",
];

export default ProductForm;
