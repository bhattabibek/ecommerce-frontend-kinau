import { combineReducers } from '@reduxjs/toolkit';

import categorySlice from "./features/category.slice"
import productSlice from "./features/product.slice"
import wishlistSlice from './features/wishlist.slice'
import authSlice from './features/auth.slice'
import orderSlice from "./features/order.slice"


const rootReducer = combineReducers({
    categories: categorySlice,
    product: productSlice,
    wishlist:wishlistSlice,
    auth:authSlice,
    order:orderSlice,

})

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer; 