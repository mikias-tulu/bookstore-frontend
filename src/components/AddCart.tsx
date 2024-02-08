import { useShoppingCart } from "../context/ShoppingCartContext";

type quantityProps = {
  id: number;
  quantity: number;
};

export default function AddCart({ id, quantity }: quantityProps) {
  const { increaseCartQuantity, decreaseCartQuantity, removeFromCart } =
    useShoppingCart();
  return (
    <div className="flex flex-col justify-center items-center gap-2">
      
      <div>
        <button
          className="text-sm bg-red-600 rounded-md p-2 text-white"
          onClick={() => removeFromCart(id)}
        >
          Remove
        </button>
      </div>
    </div>
  );
}
