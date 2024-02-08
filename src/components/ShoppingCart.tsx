import { useShoppingCart } from "../context/ShoppingCartContext";
import CartItem from "./CartItem";
import formatCurrency from "../utilities/formatCurrency";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

type ShoppingCartProps = {
  isOpen: boolean;
};

export default function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const { products, loading, error } = useSelector((state:any) => state.products);
  const { closeCart, cartItems } = useShoppingCart();

  return (
    <div
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-md h-auto z-50 bg-white shadow-xl ease-in-out duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
    >
      {isOpen && (
        <button
          className="text-4xl text-black items-center cursor-pointer absolute top-3 right-4 z-50"
          onClick={closeCart}
        >
          x
        </button>
      )}
      <div className="p-4">
        <div className="bg-purple-700 text-white text-center py-2 mb-4 rounded-md">
          <h2 className="text-3xl font-semibold">Your Cart</h2>
        </div>
        <div className="flex flex-col gap-4 mb-4">
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
        </div>
        <div className="font-semibold text-lg text-right">
          
          <span className="text-purple-700">
            {formatCurrency(
              cartItems.reduce((total, CartItem) => {
                const item = products.find((i:any) => i.id === CartItem.id);
                return total + (item?.price || 0) * CartItem.quantity;
              }, 0)
            )}
          </span>
        </div>
        <Link to="/checkout" className="block mt-3">
          <button className="px-4 py-4 bg-purple-700 text-white w-full rounded-md shadow font-semibold hover:bg-purple-900">
              Finalize Purchase
          </button>
        </Link>
      </div>
    </div>
  );
}
