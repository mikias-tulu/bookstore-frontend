import {createAsyncThunk} from '@reduxjs/toolkit';
const HOST: string = (import.meta.env.VITE_BACKEND_URL);

const user = JSON.parse(localStorage.getItem('user') || '{}');


export const fetchProducts = createAsyncThunk(
    'products/fetchproducts',
    async (data, thunkAPI) => { 
        const response = await fetch(`${HOST}/api/books`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        });
        const result = await response.json();

        console.log("Products retrieved:", result);
   
        if (response.status === 200) {
            console.log("Products data:", result.books);
            return result.books;
        } else {
            return thunkAPI.rejectWithValue(result);
        }
    }
);




// create order
export const createOrder = createAsyncThunk(
    'products/createOrder',
    async (data, thunkAPI) => {
        const response = await fetch(`${HOST}/api/order`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify(data),
        });
        const result = await response.json();
        if (response.status === 201) {
            return result;
        } else {
            return thunkAPI.rejectWithValue(result);
        }
    }
);


// fetch orders
export const fetchOrders = createAsyncThunk(
    'products/fetchOrders',
    async (data, thunkAPI) => {
        const response = await fetch(`${HOST}/api/order`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
        });
        const result = await response.json();
        if (response.status === 200) {
            return result.data;
        } else {
            return thunkAPI.rejectWithValue(result);
        }
    }
);