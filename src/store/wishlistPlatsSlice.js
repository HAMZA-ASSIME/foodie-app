import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  plats: JSON.parse(localStorage.getItem("wishlistPlats")) || [],
};

const wishlistPlatsSlice = createSlice({
  name: "wishlistPlats",
  initialState,
  reducers: {
    addPlatToWishlist: (state, action) => {
      state.plats.push(action.payload);
      localStorage.setItem("wishlistPlats", JSON.stringify(state.plats));
    },
    removePlatFromWishlist: (state, action) => {
      state.plats = state.plats.filter((p) => p.id !== action.payload);
      localStorage.setItem("wishlistPlats", JSON.stringify(state.plats));
    },
  },
});

export const { addPlatToWishlist, removePlatFromWishlist } = wishlistPlatsSlice.actions;
export default wishlistPlatsSlice.reducer;
