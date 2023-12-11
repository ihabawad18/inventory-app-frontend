import React, { useEffect } from "react";
import InfoBox from "./infoBox";

import { AiFillDollarCircle } from "react-icons/ai";
import { BsCart4, BsCartX } from "react-icons/bs";
import { BiCategory } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import {
  CALC_CATEGORY,
  CALC_OUT_OF_STOCK,
  CALC_STORE_VALUE,
  selectcategories,
  selectoutOfStock,
  selecttotalStoreValue,
} from "../redux/features/product/productSlice";

//Icons
const earningIcon = <AiFillDollarCircle size={40} />;
const productIcon = <BsCart4 size={40} />;
const categoryIcon = <BiCategory size={40} />;
const outOfStockIcon = <BsCartX size={40} />;

// Format Amount
export const formatNumbers = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const ProductSummary = ({ products }) => {
  const dispatch = useDispatch();
  const totalStoreValue = useSelector(selecttotalStoreValue);
  const outOfStck = useSelector(selectoutOfStock);
  const categories = useSelector(selectcategories);
  useEffect(() => {
    dispatch(CALC_STORE_VALUE(products));
    dispatch(CALC_OUT_OF_STOCK(products));
    dispatch(CALC_CATEGORY(products));
  }, [dispatch, products]);

  return (
    <div>
      <h3 className="text-4xl font-medium">Inventory Stats</h3>
      <div className="flex flex-wrap">
        <InfoBox
          bgColor={"bg-purple-500"}
          icon={productIcon}
          title={"Total Products"}
          count={products.length}
        />

        <InfoBox
          bgColor={"bg-green-600"}
          icon={earningIcon}
          title={"Total Store Value"}
          count={`$${formatNumbers(totalStoreValue.toFixed(2))}`}
        />

        <InfoBox
          bgColor={"bg-red-600"}
          icon={outOfStockIcon}
          title={"Out of Stock"}
          count={outOfStck}
        />
        <InfoBox
          bgColor={"bg-blue-500"}
          icon={categoryIcon}
          title={"All Categories"}
          count={categories}
        />
      </div>
    </div>
  );
};

export default ProductSummary;
