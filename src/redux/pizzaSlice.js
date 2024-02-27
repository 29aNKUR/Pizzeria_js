import { createSlice } from "@reduxjs/toolkit";
import OrderDetails from "../lib/types";

const pizzaSlice = createSlice({
  name: "pizza",
  initialState: {
    orders: [] as OrderDetails[],
    orderIdCounter: 0,
  },
  reducers: {
    placeOrder: (state, action) => {
      state.orders.push({
        orderId: `00${state.orderIdCounter + 1}`,
        ...action.payload,
        stage: "Order Placed",
        time: 0,
        prevTime: 0
      });
      state.orderIdCounter += 1;
    },

    updateOrderStage: (state, action) => {
        const { orderId, stage } = action.payload;
        const orderToUpdate = state.orders.find((order) => order.orderId === orderId);
        if(orderToUpdate) {
            orderToUpdate.stage = stage;
            orderToUpdate.prevTime = orderToUpdate.time;
        }
    },

    cancelOrder: (state, action) => {
        state.orders = state.orders.filter((order) => order.orderId !== action.payload);
    },

    updateOrderTime: (state, action) => {
        const { orderId, time} = action.payload;
        const orderToUpdate = state.orders.find((order) => order.orderId === orderId);
        if(orderToUpdate) {
            orderToUpdate.time = time;
        }
    }

  },
});

export const { placeOrder, updateOrderStage, cancelOrder, updateOrderTime } = pizzaSlice.actions;

export default pizzaSlice.reducer;