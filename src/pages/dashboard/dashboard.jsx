import React, { useEffect } from "react";
import useRedirectLoggedOut from "../../hooks/useRedirectLoggedOut";
import { useDispatch, useSelector } from "react-redux";
import { CLEAR_PRODUCTS, getProducts } from "../../redux/features/product/productSlice";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import ProductList from "../../components/productList";
import ProductSummary from "../../components/productSummary";



const Dashboard = () => {
  useRedirectLoggedOut("/login");
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { products, isLoading, message, isError } = useSelector(
    (state) => state.product
  );
  useEffect(() => {
    
    if (isLoggedIn === true) {
      dispatch(CLEAR_PRODUCTS());
      dispatch(getProducts());
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);
  return (
    
    <div>
      <ProductSummary products={products}/>
      <ProductList products={products} isLoading={isLoading}/>
    </div>
  );
};

export default Dashboard;
