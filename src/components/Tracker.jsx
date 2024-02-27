import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { cancelOrder, updateOrderStage, updateOrderTime } from "../redux/pizzaSlice";

const Tracker = () => {
  const orders = useSelector((state) => state.pizza.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      orders.forEach((order) => {
        const updatedTime =
          order.stage !== "Order Picked" ? order.time + 1 : order.time;
        dispatch(updateOrderTime({ orderId: order.orderId, time: updatedTime }));
      });
    }, 1000);
  
    return () => clearInterval(interval);
  }, [dispatch, orders]);
  

  const handleCancelOrder = (orderId) => {
    dispatch(cancelOrder(orderId));
  };

  const handleNextButtonClick = (orderId, currentStage) => {
  console.log("Clicked Next Button for Order ID:", orderId, "Current Stage:", currentStage);

  switch (currentStage) {
    case "Order Placed":
      dispatch(updateOrderStage({ orderId, stage: "Order in Making" }));
      break;
    case "Order in Making":
      dispatch(updateOrderStage({ orderId, stage: "Order Ready" }));
      break;
    case "Order Ready":
      dispatch(updateOrderStage({ orderId, stage: "Order Picked" }));
      break;
    default:
      console.log("Unknown Stage:", currentStage);
  }
};

  const isStale = (order) => order.time > 180;

  const stages = [
    "Order Placed",
    "Order in Making",
    "Order Ready",
    "Order Picked",
  ];

  return (
    <div>
      <h1 className="flex justify-center mt-10 font-bold text-3xl">Tracker</h1>
      <div className="flex justify-around mt-10">
        {stages.map((stage) => (
          <div className=" border shadow-lg p-5 rounded-md" key={stage}>
            <h1 className="font-bold text-2xl">{stage}</h1>
            {orders
              .filter((order) => order.stage === stage)
              .sort((a, b) => a.time - b.time)
              .map((order) => (
                <div
                  key={order.orderId}
                  className={`rounded-lg shadow-lg p-2 mt-3 mb-3 ${
                    isStale(order) ? "bg-red-500 text-white" : ""
                  } ${
                    order.stage === "Order Picked"
                      ? "bg-blue-700 text-white"
                      : ""
                  }`}
                >
                  <p>Order Id: {order.orderId}</p>
                  <p>Time Spent: {order.time} sec</p>
                  {/* <p>
                    Time in current Stage: {order.time - (order.prevTime || 0)}{" "}
                    sec
                  </p> */}
                  <div className="flex justify-between mt-2 mb-2">
                    {order.stage !== "Order Picked" && (
                      <button
                      className="bg-blue-800 text-white font-bold rounded px-2 py-1"
                        onClick={() =>
                          handleNextButtonClick(order.orderId, order.stage)
                        }
                      >
                        Next
                      </button>
                    )}
                    {order.stage !== "Order Picked" && (
                      <button   className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleCancelOrder(order.orderId)}>
                        Cancel
                      </button>
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
