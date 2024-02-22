import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCustomers = createAsyncThunk("fetchCustomers", async () => {
    const response = await fetch("http://localhost:8000/customers",{
        headers: {
            accept: "application/json",
            "content-type": "application/json"
        },
        credentials: "include",
    });

    const customers =  await response.json()

    return customers;
})


const customerSlice = createSlice({
    name: 'customer',
    initialState: {
      customers: [],
      loading: false,
      error: null
    },
    reducers: {
      fetchCustomersSuccess(state, action) {
        state.customers = action.payload;
        state.loading = false;
        state.error = null;
      },
      // Other reducers for CRUD operations
    },
    extraReducers : (builder) => {
        builder
        .addCase(fetchCustomers.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchCustomers.fulfilled, (state, action) => {
            console.log(action.payload);
            if(action.payload.message !=="auth-failed"){
                state.loading = false;
                state.customers = [ ...action.payload]
            }else{

                state.loading = false;
                state.customers = [];
                state.error = true;
            }
            
        })
        .addCase(fetchCustomers.rejected, (state, action) => {
            state.loading = false;
            // state.customers = [...action.payload];
        })
    }
  });
  
  export const { fetchCustomersSuccess } = customerSlice.actions;
  export default customerSlice.reducer;
  