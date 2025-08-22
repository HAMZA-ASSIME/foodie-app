import { configureStore } from "@reduxjs/toolkit";
import wishlistReducer from "./wishlistSlice";
import cartReducer from "./cartSlice";
import wishlistPlatsReducer from "./wishlistPlatsSlice";


const store = configureStore({
  reducer: {
    wishlist: wishlistReducer,
    cart: cartReducer,
    wishlistPlats: wishlistPlatsReducer,


  },
});

export default store;
