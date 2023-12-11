import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productService from "./productService";
import { toast } from "react-toastify";

const initialState = {
  product: null,
  products: [],
  isError: false,
  isSuccess: false,
  isSubmitted: false,
  isLoading: false,
  message: "",
  totalStoreValue: 0,
  categories: [],
  outOfStock: 0,
};

// Create New Product

export const createProduct = createAsyncThunk(
  "products/create",
  async (formData, thunkAPI) => {
    try {
      return await productService.createProduct(formData);
    } catch (error) {
      const message = error.response.data.message
        ? error.response.data.message
        : error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get All Products

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (thunkAPI) => {
    try {
      return await productService.getProducts();
    } catch (error) {
      const message = error.response.data.message
        ? error.response.data.message
        : error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete Product

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (obj, thunkAPI) => {
    try {
      await productService.deleteProduct(obj.id);
      return obj;
    } catch (error) {
      const message = error.response.data.message
        ? error.response.data.message
        : error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// Get a single Product

export const getProduct = createAsyncThunk(
  "products/getProduct",
  async (id, thunkAPI) => {
    try {
      return await productService.getProduct(id);
    } catch (error) {
      const message = error.response.data.message
        ? error.response.data.message
        : error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// Update a Product

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({id,formData}, thunkAPI) => {
    try {
      return await productService.updateProduct(id,formData);
    } catch (error) {
      const message = error.response.data.message
        ? error.response.data.message
        : error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    CALC_STORE_VALUE(state, action) {
      const totalValues = [];
      action.payload.map((item) => {
        const { price, quantity } = item;
        return totalValues.push(price * quantity);
      });
      const total = totalValues.reduce((a, b) => {
        return a + b;
      }, 0);
      state.totalStoreValue = total;
    },
    CALC_OUT_OF_STOCK(state, action) {
      let outOfStock = 0;
      action.payload.map((item) => {
        return (outOfStock += item.quantity === "0");
      });

      state.outOfStock = outOfStock;
    },
    CALC_CATEGORY(state, action) {
      let mySet = new Set();
      action.payload.forEach((item) => {
        mySet.add(item.category.toLowerCase());
      });
      state.categories = mySet.size;
    },
    CLEAR_PRODUCTS(state) {
      state.products = [];
    },
    SET_SUBMITTED(state,action){
      state.isSubmitted = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isSubmitted = true;
        state.isError = false;
        state.products.push(action.payload);
        toast.success("Product Added Successfully");
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.isSubmitted = false;
        state.message = action.payload;
        toast.error(action.payload);
        //    throw new Error("error to create");
      })
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;

        const { products, id } = action.payload;
        state.products = products.filter((prod) => {
          return prod._id !== id;
        });
        toast.success("Product deleted successfully");
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.product = action.payload;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isSubmitted = true;
        state.isError = false;
        toast.success("Product updated successfully")
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSubmitted = false;
        state.isSuccess = false;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const {
  CALC_STORE_VALUE,
  CLEAR_PRODUCTS,
  CALC_OUT_OF_STOCK,
  CALC_CATEGORY,
  SET_SUBMITTED
} = productSlice.actions;

export const selectIsLoading = (state) => state.product.isLoading;
export const selectIsError = (state) => state.product.isError;
export const selectIsSubmitted = (state) => state.product.isSubmitted;
export const selectProduct = (state) => state.product.product;
export const selecttotalStoreValue = (state) => state.product.totalStoreValue;
export const selectoutOfStock = (state) => state.product.outOfStock;
export const selectcategories = (state) => state.product.categories;

export default productSlice.reducer;
