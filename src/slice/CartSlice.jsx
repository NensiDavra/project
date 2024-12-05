import { createSlice } from "@reduxjs/toolkit";

// Load initial cart items from localStorage
const loadCartFromLocalStorage = () => {
  try {
    const serializedCart = localStorage.getItem("cart");
    return serializedCart ? JSON.parse(serializedCart) : []; //Converted the json file
  } catch (error) {
    console.error("Error loading cart from localStorage:", error);
    return [];
  }
};

// Save cart items to localStorage
const saveCartToLocalStorage = (items) => {
  try {
    const serializedCart = JSON.stringify(items);
    localStorage.setItem("cart", serializedCart);
  } catch (error) {
    console.error("Error saving cart to localStorage:", error);
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: loadCartFromLocalStorage(), // Load initial items from localStorage
  },
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1; //add the product
        existingItem.total = existingItem.price * existingItem.quantity; // Update total for the item
      } else {
        state.items.push({
          ...action.payload,
          quantity: 1,
          total: action.payload.price,
        });
      }
      saveCartToLocalStorage(state.items); // Save updated items to localStorage
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
      saveCartToLocalStorage(state.items); // Save updated items to localStorage
    },
    incrementQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1;
        item.total = item.price * item.quantity; // Update total for the item
      }
      saveCartToLocalStorage(state.items); // Save updated items to localStorage
    },

    decrementQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.quantity -= 1;
        item.total = item.price * item.quantity;

        // Remove item if quantity reaches 0
        if (item.quantity === 0) {
          state.items = state.items.filter((item) => item.id !== action.payload);
        }
      }
      saveCartToLocalStorage(state.items); // Save updated items to localStorage
    },

    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cart"); // Clear cart from localStorage
    },
  },
});

export const selectSubtotal = (state) =>
  state.cart.items.reduce((total, item) => total + item.total, 0);

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
