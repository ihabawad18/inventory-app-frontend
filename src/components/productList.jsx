import React, { useEffect, useState } from "react";
import { SpinnerImg } from "./loader/Loader";
import { AiOutlineEye } from "react-icons/ai";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import "./ProductList.css";
import Search from "./Search";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_PRODUCTS,
  selectfilteredProducts,
} from "../redux/features/product/filterSlice";
import ReactPaginate from "react-paginate";
import { deleteProduct } from "../redux/features/product/productSlice";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { Link } from "react-router-dom";

const ProductList = ({ products, isLoading }) => {
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();
  const filteredProducts = useSelector(selectfilteredProducts);

  const onChangeHandler = (e) => {
    setSearchValue(e.target.value);
  };

  const shortingText = (text, n) => {
    if (text.length > n) {
      const shortenedtext = text.substring(0, n).concat("...");
      return shortenedtext;
    }
    return text;
  };

  const deleteProductbyId = (id) => {
    dispatch(deleteProduct({ id, products }));
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure want to delete this product.",
      buttons: [
        {
          label: "Delete",
          onClick: () => deleteProductbyId(id),
        },
        {
          label: "Cancel",
          // onClick: () => alert('Click No')
        },
      ],
    });
  };
  //   Begin Pagination
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;

    setCurrentItems(filteredProducts.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredProducts.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredProducts]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredProducts.length;
    setItemOffset(newOffset);
  };
  //   End Pagination

  useEffect(() => {
    dispatch(FILTER_PRODUCTS({ searchValue, products }));
  }, [dispatch, searchValue, products]);

  return (
    <div className="product-list">
      <hr className="border-gray-500 my-3" />

      <div className="flex justify-between ">
        <h3 className="text-4xl font-medium">Inventory Items</h3>
        <Search value={searchValue} onChange={onChangeHandler} />
      </div>
      {isLoading && <SpinnerImg />}
      {!isLoading && products.length === 0 ? (
        <p>-- No products found, please add a product...</p>
      ) : (
        <div>
          <table>
            <thead>
              <tr>
                <th>s/n</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Value</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((product, index) => {
                const { _id, name, category, price, quantity } = product;
                return (
                  <tr key={_id}>
                    <td>
                      {index + 1}
                      {"."}
                    </td>
                    <td>{shortingText(name, 16)}</td>
                    <td>{category}</td>
                    <td>
                      {"$"}
                      {price}
                    </td>
                    <td>{quantity}</td>
                    <td>
                      {"$"}
                      {quantity * price}
                    </td>
                    <td className="flex">
                      <span>
                        <Link to={`/product-detail/${_id}`}>
                          <AiOutlineEye size={25} color="purple" />
                        </Link>
                      </span>
                      <span className="ml-3">
                        <Link to={`/edit-product/${_id}`}>
                          <FaEdit size={20} color="green" />
                        </Link>
                      </span>
                      <span className="ml-3">
                        <FaTrashAlt
                          size={20}
                          color="red"
                          onClick={() => confirmDelete(_id)}
                        />
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      <ReactPaginate
        breakLabel="..."
        nextLabel="Next"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel="Prev"
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageLinkClassName="page-num"
        previousLinkClassName="page-num"
        nextLinkClassName="page-num"
        activeLinkClassName="activePage"
      />
    </div>
  );
};

export default ProductList;
