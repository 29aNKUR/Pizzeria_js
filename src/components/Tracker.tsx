import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect } from "react";
import { cancelOrder, updateOrderTime } from "../redux/pizzaSlice";
import OrderDetails from "../lib/types";

const Tracker = () => {
  const orders = useSelector((state: RootState) => state.pizza.orders);
  const dispatch = useDispatch();

  useEffect(() => {
  const interval = setInterval(() => {
    orders.forEach((order) => {
      const updatedTime: number = order.stage !== 'Order Picked' ? order.time + 1 : order.time;
      dispatch(updateOrderTime(order.orderId, updatedTime));
    });
  }, 1000);

  return () => clearInterval(interval);
}, [dispatch, orders]); 
  

  const handleCancelOrder = (orderId: string) => {
    dispatch(cancelOrder(orderId));
  };

  const handleNextButtonClick = (orderId: string, currentStage: string) => {
    switch (currentStage) {
      case "Order Placed":
        dispatch(updateOrderTime(orderId, "Order in Making"));
        break;
      case "Order in Making":
        dispatch(updateOrderTime(orderId, "Order Ready"));
        break;
      case "Order Ready":
        dispatch(updateOrderTime(orderId, "Order Picked"));
        break;
      default:
        console.log("Unknown Stage:", currentStage);
    }
  };

  const isStale = (order: OrderDetails) => order.time > 180;

  const stages = [
    "Order Placed",
    "Order in Making",
    "Order Ready",
    "Order Picked",
  ];

  return (
    <div>
      <h1 className="flex justify-center mt-10 font-bold text-3xl">Tracker</h1>
      <div className="flex justify-around mt-10 font-bold text-xl">
        {stages.map((stage) => (
          <div key={stage}>
            <h1>{stage}</h1>
            {orders
              .filter((order: OrderDetails) => order.stage === stage)
              .sort((a, b) => a.time - b.time)
              .map((order) => (
                <div
                  key={order.orderId}
                  className={`${
                    isStale(order) ? "bg-red-500 text-white" : ""
                  } ${
                    order.stage === "Order Picked"
                      ? "bg-blue-700 text-white"
                      : ""
                  }`}
                >
                  <p>Order Id: {order.orderId}</p>
                  <p>Total Time Spent: {order.time} sec</p>
                  <p>
                    Time in current Stage: {order.time - (order.prevTime || 0)}{" "}
                    sec
                  </p>
                  <div>
                    {order.stage !== "Order Picked" && (
                      <button onClick={() => handleNextButtonClick(order.orderId, order.stage)}>Next</button>
                    )}
                    {order.stage !== "Order Picked" && (
                      <button onClick={() => handleCancelOrder(order.orderId)}>Cancel</button>
                    )}
                    {order.stage === "Order Picked" && <p>Order Picked</p>}
                  </div>
                </div>
              ))}
          </div>
        ))}

        {/* <div className="border p-10 rounded-lg shadow-lg">
          <h1>Order Placed</h1>

        </div>
        <div className="border p-10 rounded-lg shadow-lg">
          <h1>Order in Making</h1>
        </div>
        <div className="border p-10 rounded-lg shadow-lg">
          <h1>Order Ready</h1>
        </div>
        <div className="border p-10 rounded-lg shadow-lg">
          <h1>Order Picked</h1>
        </div> */}
      </div>
    </div>
  );
};

export default Tracker;
