import { createAsyncThunk } from "@reduxjs/toolkit";

const HOST: string = (import.meta.env.VITE_BACKEND_URL);
export const login = createAsyncThunk(
    "auth/login",
    async (data, thunkAPI) => {
        console.log(data);
        const response = await fetch(`${HOST}/api/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        });
        const result = await response.json();
        console.log(response);
        if (response.status === 200) {
            console.log(result);
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));  
        return result;
        } else {
        return thunkAPI.rejectWithValue(result);
        }
    }
    );


    export const fetchUsers=createAsyncThunk(
        'users/fetchUsers',
        async (data, thunkAPI) => {
            const response = await fetch(`${HOST}/api/users`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const result = await response.json();
            if (response.status === 200) {
                return result.users;
            } else {
                return thunkAPI.rejectWithValue(result);
            }
        }
    )
    

