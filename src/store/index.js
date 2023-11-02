import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user-slice";
import flightSlice from "./flight-slice";

const store = configureStore({
  reducer: { user: userSlice.reducer, flights: flightSlice.reducer },
});

export default store;
