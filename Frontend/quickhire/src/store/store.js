import { configureStore } from "@reduxjs/toolkit";
import serviceOrdersReducer from "../Features/Services/ServiceOrders/serviceOrdersSlice";

export const store = configureStore({
  reducer: {
    serviceOrders: serviceOrdersReducer,
  },
});
