import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import OrderForm from "./components/OrderForm";
import OrderSummary from "./components/OrderSummary";
import Tracker from "./components/Tracker";
function App() {
  return (
    <div>
      <Header />
      <div className="bg-slate-300">
        <OrderForm />
      </div>
      <Tracker />
      <div>
        <OrderSummary />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
