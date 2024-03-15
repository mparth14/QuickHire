import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { serviceOrdersData } from "./OrdersDummyData";

// Storing API's in CONFIG file and accessing it from there here
// import { CONFIG } from "../../../config";

export const fetchReceivedServiceOrders = createAsyncThunk(
  "serviceOrders/fetchReceivedServiceOrders",
  async (args, thunkApi) => {
    const state = thunkApi.getState();
    console.log({ args }, { state });

    // const response = await fetch(`${CONFIG.BASE_PATH}${CONFIG.ORDERS_RECEIVED}`, {
    //   headers: {
    //     Authorization: `Bearer ${token}`, // For JWT token
    //   },
    // });
    // const recievedOrders = await response.json();
    // return recievedOrders;
  }
);

export const fetchPlacedServiceOrders = createAsyncThunk(
  "serviceOrders/fetchPlacedServiceOrders",
  async (args, thunkApi) => {
    const state = thunkApi.getState();
    console.log({ args }, { state });

    // const response = await fetch(`${CONFIG.BASE_PATH}${CONFIG.ORDERS_PLACED}`, {
    //   headers: {
    //     Authorization: `Bearer ${token}`, // For JWT token
    //   },
    // });
    // const recievedOrders = await response.json();
    // return recievedOrders;
  }
);

export const serviceOrdersSlice = createSlice({
  name: "serviceOrders",
  initialState: {
    receivedServiceOrders: serviceOrdersData,
    placedServiceOrders: serviceOrdersData,
  },
  reducers: {
    setReceivedServiceOrders(state, action) {
      console.log(action.payload);
      state.receivedServiceOrders = action.payload;
    },
    setPlacedServiceOrders(state, action) {
      console.log(action.payload);
      state.placedServiceOrders = action.payload;
    },
  },
  extraReducers: {
    // Received Service Orders
    [fetchReceivedServiceOrders.fulfilled]: (state, action) => {
      state.receivedServiceOrders = action.payload;
    },
    [fetchReceivedServiceOrders.rejected]: (state, action) => {
      console.log(action.payload);
    },

    // Placed Service Orders
    [fetchPlacedServiceOrders.fulfilled]: (state, action) => {
      state.placedServiceOrders = action.payload;
    },
    [fetchPlacedServiceOrders.rejected]: (state, action) => {
      console.log(action.payload);
    },
  },
});

export const { setReceivedServiceOrders, setPlacedServiceOrders } =
  serviceOrdersSlice.actions;

export const getAllReceivedServiceOrders = (state) =>
  state.serviceOrders.receivedServiceOrders;
export const getAllPlacedServiceOrders = (state) =>
  state.serviceOrders.placedServiceOrders;

export default serviceOrdersSlice.reducer;
