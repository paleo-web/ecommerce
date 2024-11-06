import { createSlice } from "@reduxjs/toolkit";

export const ProductListSlice = createSlice({
  name: "ProductList",

  initialState: {
    value: [], // Ensure this is always initialized as an array
  },

  reducers: {
    addProduct: (state, action) => {
      // Ensure state.value is an array before proceeding
      if (!Array.isArray(state.value)) state.value = [];

      const itemIndex = state.value.findIndex(
        (items) => items.id === action.payload.id
      );

      if (itemIndex === -1) {
        state.value.push({ ...action.payload, quantity: 1 });
      }
    },

    isItemAdded: (state, action) => {
      if (!Array.isArray(state.value)) return false;

      const itemIndex = state.value.findIndex(
        (items) => items.id === action.payload.id
      );

      return itemIndex !== -1;
    },

    removeItem: (state, action) => {
      if (!Array.isArray(state.value)) return;

      const itemIndex = state.value.findIndex(
        (items) => items.id === action.payload.id
      );

      if (itemIndex > -1) {
        state.value.splice(itemIndex, 1);
      }
    },

    incrementQuantity: (state, action) => {
      if (!Array.isArray(state.value)) return;

      const itemIndex = state.value.findIndex(
        (items) => items.id === action.payload.id
      );

      if (itemIndex > -1) {
        state.value[itemIndex].quantity++;
      }
    },

    decrementQuantity: (state, action) => {
      if (!Array.isArray(state.value)) return;

      const itemIndex = state.value.findIndex(
        (items) => items.id === action.payload.id
      );

      if (itemIndex > -1 && state.value[itemIndex].quantity > 0) {
        state.value[itemIndex].quantity--;
      }
    },
  },
});

export const {
  addProduct,
  isItemAdded,
  removeItem,
  incrementQuantity,
  decrementQuantity,
} = ProductListSlice.actions;
export default ProductListSlice;
