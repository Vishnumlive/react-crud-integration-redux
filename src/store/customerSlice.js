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


export const addACustomer = createAsyncThunk("addACustomer", async (userDetails) => {

    

    const response = await fetch("http://localhost:8000/addCustomer",{
        method : "POST",
        headers : {
            'Content-Type' : "application/json"
        },
        credentials: "include",
        body : JSON.stringify(userDetails)
    });

    const customers =  await response.json()

    // console.log(customers);

    return customers;
})

export const editACustomer = createAsyncThunk("editACustomer", async (userData) => {

    
    var url = `http://localhost:8000/customer/${userData._id}`

    const response = await fetch(url,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            accept: "application/json",
            
        },
        credentials: "include",
        body: JSON.stringify(userData),
    });

    const customers =  await response.json()

    return customers;
})

export const deleteACustomer = createAsyncThunk("deleteACustomer", async (userid) => {

    
    var url = `http://localhost:8000/deleteCustomer/${userid}`;

    const response = await fetch(url,{
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: "include",
    });

    const customers =  await response.json()

    // console.log(customers);

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
            
            if(action.payload.message !=="auth-failed"){
                state.loading = false;
                state.customers = [ ...action.payload]
            }else{
                console.log("error part working");
                state.loading = false;
                state.customers = [];
                state.error = true;
            }
            
        })
        .addCase(fetchCustomers.rejected, (state, action) => {
            state.loading = false;
            // state.customers = [...action.payload];
        })
        .addCase(addACustomer.pending, (state) => {

            console.log("working1");
            state.loading = true;
        })
        .addCase(addACustomer.fulfilled, (state, action) => {
            // console.log("working2");
            console.log(state);
            console.log(action);
            
            if(action.payload.message !=="auth-failed"){
                state.loading = false;
                state.customers = [ ...state.customers ,action.payload]
            }else{
                //console.log("error part working");
                state.loading = false;
                state.customers = [...state.customers];
                state.error = true;
            }
            
        })
        .addCase(addACustomer.rejected, (state, action) => {
           // console.log("working3");
            state.loading = false;
            // state.customers = [...action.payload];
        })


        .addCase(deleteACustomer.pending, (state) => {

            console.log("working1");
            state.loading = true;
        })
        .addCase(deleteACustomer.fulfilled, (state, action) => {

            const id = action.meta.arg;
            console.log(id);
            if(action.payload.message !=="auth-failed"){
                state.loading = false;

                state.customers = state.customers.filter((item) => item._id !== id);
                console.log(state.customers);
            }else{
                console.log("error part working");
                state.loading = false;
                state.customers = [...state.customers];
                state.error = true;
            }
            
        })
        .addCase(deleteACustomer.rejected, (state, action) => {
           console.log("working3");
            state.loading = false;
            // state.customers = [...action.payload];
        })


        .addCase(editACustomer.pending, (state) => {

            console.log("working1");
            state.loading = true;
        })
        .addCase(editACustomer.fulfilled, (state, action) => {

            if(action.payload.message !=="auth-failed"){
                
                var foundIndex = state.customers.findIndex(item => item._id === action.payload._id);
                state.customers[foundIndex] = action.payload;
                state.loading = false;
                
            }else{
                //console.log("error part working");
                state.loading = false;
                state.customers = [...state.customers];
                state.error = true;
            }
            
        })
        .addCase(editACustomer.rejected, (state, action) => {
           //console.log("working3");
            state.loading = false;
            // state.customers = [...action.payload];
        })
    }
  });
  
  export const { fetchCustomersSuccess } = customerSlice.actions;
  export default customerSlice.reducer;
  