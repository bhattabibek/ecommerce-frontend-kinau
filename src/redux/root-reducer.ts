import { combineReducers } from '@reduxjs/toolkit';

import categorySlice from "./features/category.slice"
import productSlice from "./features/product.slice"
import wishlistSlice from './features/wishlist.slice'
import authSlice from './features/auth.slice'
import orderSlice from "./features/order.slice"
import sizeSlice from "./features/size.slice"
import colorSlice from "./features/color.slice"
import variantSlice from "./features/variant.slice"
import cartSlice from "./features/cart.slice"


const rootReducer = combineReducers({
    categories: categorySlice,
    product: productSlice,
    size: sizeSlice,
    color: colorSlice,
    variant: variantSlice,
    wishlist:wishlistSlice,
    auth:authSlice,
    order:orderSlice,
    carts: cartSlice

})

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer; 