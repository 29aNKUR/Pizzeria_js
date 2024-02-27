import { PIZZA_LOGO } from "../constants";


const Header = () => {
  return (
    <div className="flex shadow-lg justify-center bg-blue-900">
      <img
        src={PIZZA_LOGO}
        alt="pizza logo"
        className="w-30 h-30 object-contain rounded-lg"
      />
    </div>
  );
};

export default Header;
