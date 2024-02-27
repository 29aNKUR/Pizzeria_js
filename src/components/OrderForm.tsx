import type { RootState } from "../redux/store";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { placeOrder } from "../redux/pizzaSlice";

const OrderForm = () => {
  
  const dispatch = useDispatch();
  const orders = useSelector((state: RootState) => state.pizza.orders);
  const [order, setOrder] = useState({ type: "", size: "", base: "" });

  const handleInputChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const {name, value} = event.target;
    setOrder((prevOrder) => ({...prevOrder, [name]: value}));
  };

  const handlePlaceOrder = () => {
    if(orders.length < 10) {
      if(order.type && order.size && order.base) {
        dispatch(placeOrder(order));
        setOrder({type:"", size:"", base:""});
      } else {
        alert('Please fill in all fields');
      } 
    } else {
      alert('Not taking any order for now')
    }
  };



  return (
    <div className="flex justify-between space-x-4 p-4">
      <div className="w-1/4">
        <label className="block font-bold mb-2">Type:</label>
        <select
          className="w-full p-2 border rounded"
          name="type"
          value={order.type}
          onChange={handleInputChange}
        >
          <option value="">Select Type</option>
          <option value="Veg">Veg</option>
          <option value="Non-Veg">Non-Veg</option>
        </select>
      </div>
      <div className="w-1/4">
        <label className="block font-bold mb-2">Size:</label>
        <select
          className="w-full p-2 border rounded"
          name="size"
          value={order.size}
          onChange={handleInputChange}
        >
          <option value="">Select Size</option>
          <option value="Small">Small</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
        </select>
      </div>
      <div className="w-1/4">
        <label className="block font-bold mb-2">Base:</label>
        <select
          className="w-full p-2 border rounded"
          name="base"
          value={order.base}
          onChange={handleInputChange}
        >
          <option value="">Select Base</option>
          <option value="Thin">Thin</option>
          <option value="Thick">Thick</option>
        </select>
      </div>
      <button
        className="p-4 border text-white bg-blue-900 rounded-lg"
        onClick={handlePlaceOrder}
      >
        Place Order
      </button>
    </div>
  );
};

export default OrderForm;
