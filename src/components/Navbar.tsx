import { Link } from "react-router-dom";
import { useShoppingCart } from "../context/ShoppingCartContext";
import ShoppingSvg from "./ShoppingSvg";
export default function NavBar() {
  const { openCart, cartQuantity } = useShoppingCart();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  
  return (
    <div className="bg-white shadow-sm sticky top-0">
      <div className="flex items-center text-2xl p-4">
        <nav className="mr-auto">

          <Link to={"/home"} className="mr-6">
            Home
          </Link>
  
        </nav>
        <div>
          {user.email ? (
            <Link to={"/orders"} className="mr-6">
              Orders
            </Link>
          ) : (
            <Link to={"/login"} className="mr-6">
              Login
            </Link>
          )}
        </div>
        {cartQuantity > 0 && (
          <button
            className="bg-sky-600 p-4 rounded-full hover:bg-sky-800 relative"
            onClick={openCart}
          >
            {<ShoppingSvg />}
            <div className="absolute bg-red-600 text-white rounded-full p-1 h-6 w-6 text-base flex items-center justify-center right-0 ">
              {cartQuantity}
            </div>
          </button>
        )}
      </div>
    </div>
  );
}
