import {createSlice} from '@reduxjs/toolkit';
import { fetchProducts ,createOrder,fetchOrders} from './actions/products';

const initialState = {
    products: [],
    error: { payload: null, status: false },
    loading: false,
    product: {},
    orders: [],
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
      
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload;
            state.error = { payload: null, status: false };
        });
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false;
  
        });
        builder.addCase(createOrder.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(createOrder.fulfilled, (state, action) => {
            state.loading = false;
            state.error = { payload: null, status: false };
        });
        builder.addCase(createOrder.rejected, (state, action) => {
            state.loading = false;
           
        }
        );
        builder.addCase(fetchOrders.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchOrders.fulfilled, (state, action) => {
            state.loading = false;
            state.orders = action.payload;
            state.error = { payload: null, status: false };
        });
        builder.addCase(fetchOrders.rejected, (state, action) => {
            state.loading = false;
          
        }
        );
        
    },
});


export default productsSlice.reducer;