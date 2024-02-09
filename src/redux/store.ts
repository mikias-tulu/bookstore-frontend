import { configureStore } from '@reduxjs/toolkit'
import usersSlice from './features/usersSlice'
import productSlice from './features/productSlice'

export const store = configureStore({
  reducer: {
    users: usersSlice,
    products: productSlice,
  },
})