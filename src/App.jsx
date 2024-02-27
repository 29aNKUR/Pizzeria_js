import "./App.css";
import Header from "./components/Header";
import MainSection from "./components/MainSection";
import OrderForm from "./components/OrderForm";
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
        <MainSection />
      </div>
    </div>
  );
}

export default App;
