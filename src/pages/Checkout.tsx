import { useShoppingCart } from "../context/ShoppingCartContext";
import CartItem from "../components/CartItem";
import { createOrder,fetchProducts ,fetchOrders} from "../redux/features/actions/products";
import { useDispatch,useSelector } from "react-redux";
import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

 const Checkout = () => {
  const { closeCart, cartItems ,removeFromCart} = useShoppingCart();
  const navigate = useNavigate();
  const {products, loading, error} = useSelector((state:any) => state.products);
  const [isLoading, setIsLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem('user') || '{}');


  const dispatch = useDispatch();


  useEffect(() => {
    if(!user.token) navigate('/login');
   
    dispatch(fetchProducts() as any);
 }

, [dispatch]);
 
  const handleOrder = async () => {
    setIsLoading(true);

    const HOST: string = import.meta.env.VITE_BACKEND_URL;
    const userId = JSON.parse(localStorage.getItem('user') || '{}').id;

    for (const cartItem of cartItems) {
      const item = products.find((i:any) => i.id === cartItem.id);
      const bookId = cartItem.id;
      const quantity = cartItem.quantity;
      
      // Create data object for the current book
      const data = {
        bookId: bookId,
        userId: userId,
        quantity: quantity,
        amount: (item?.price || 0) * quantity
      };
    
      // Send request to create order for the current book
      const response = await fetch(`${HOST}/api/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(data),
      });
    
      const result = await response.json();
      if (response.status === 200) {
        toast.success("Order Placed Successfully");
        removeFromCart(bookId); 
      } else {
        console.log(result.error);
        setIsLoading(false);
        toast.error(result.message);
        setIsLoading(false);
        return { error: result.error };
      }
    }

    

  };

  return (
    <>
    <div className="p-4">
      <ToastContainer />
      <div className="min-h-screen ">
        <div className="container mx-auto p-10 max-w-screen-lg">
          <div className="bg-white rounded shadow p-8">
            <div className="w-full bg-orange-200 text-yellow-900 px-4 py-2 flex items-center">
              <img
                src="https://svgsilh.com/svg/151889.svg"
                className="w-10 block pr-2"
              />
              <div className="text-sm">
                You have <b>{user.points} Points</b> on yor account{" "}
              </div>
            </div>

            <div>
              <h3 className="text-xl mt-4 font-bold pb-4">Order Summary</h3>
              <div className="flex gap-4 flex-col mb-4">
                {cartItems.map((item) => (
                  <CartItem key={item.id} {...item} />
                ))}
              </div>
            </div>
            {
              isLoading?
              <button className="px-4 py-4 bg-purple-700 text-white w-full mt-3 rounded shadow font-bold hover:bg-purple-900">
                Processing...
              </button>: <button onClick={()=>handleOrder()} className="px-4 py-4 bg-purple-700 text-white w-full mt-3 rounded shadow font-bold hover:bg-purple-900">
              Finalize Payment with Points
            </button>
            }
           
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Checkout;
