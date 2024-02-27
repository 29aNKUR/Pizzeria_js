import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { cancelOrder } from '../redux/pizzaSlice';
import { formatTime } from '../utils';

const OrderSummary = () => {
  const orders = useSelector((state) => state.pizza.orders);
  const dispatch = useDispatch();

  // Calculate total time spent on each order and total pizzas delivered today
  const totalPizzasDeliveredToday = orders.filter((order) => order.stage === 'Order Picked').length;

  const handleCancelOrder = (orderId) => {
    dispatch(cancelOrder(orderId));
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 flex justify-center mt-4">Order Summary</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border">Order Id</th>
            <th className="border">Stage</th>
            <th className="border">Total time spent</th>
            <th className="border">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.orderId} className="border">
              <td className="border p-2">{order.orderId}</td>
              <td className="border p-2">{order.stage}</td>
              <td className="border p-2">{formatTime(order.time)}</td>
              <td className="border p-2">
                {order.stage !== 'Order Picked' && (
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleCancelOrder(order.orderId)}
                  >
                    Cancel
                  </button>
                )}
              </td>
            </tr>
          ))}
          <tr className="border bg-gray-200">
            <td className="border p-2" colSpan="2">Total order delivered today:</td>
            <td className="border p-2" colSpan="2">{totalPizzasDeliveredToday}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default OrderSummary;
