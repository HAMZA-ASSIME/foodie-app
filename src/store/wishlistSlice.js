import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  restaurants: JSON.parse(localStorage.getItem("wishlist")) || []
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const exists = state.restaurants.find(r => r.id === action.payload.id);
      if (!exists) {
        state.restaurants.push(action.payload);
        localStorage.setItem("wishlist", JSON.stringify(state.restaurants));
      }
    },
    removeFromWishlist: (state, action) => {
      state.restaurants = state.restaurants.filter(r => r.id !== action.payload);
      localStorage.setItem("wishlist", JSON.stringify(state.restaurants));
    }
  }
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;