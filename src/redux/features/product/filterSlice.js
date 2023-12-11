import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredProducts: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_PRODUCTS(state, action) {
      const { products, searchValue } = action.payload;

      const tempProducts = products.filter((product) => {
        return (
          product.name.toLowerCase().includes(searchValue.toLowerCase()) ||
          product.category.toLowerCase().includes(searchValue.toLowerCase())
        );
      });
      state.filteredProducts = tempProducts;
    },
  },
});

export const { FILTER_PRODUCTS } = filterSlice.actions;
export const selectfilteredProducts = (state) => state.filter.filteredProducts;

export default filterSlice.reducer;
