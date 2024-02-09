import { useShoppingCart } from "../context/ShoppingCartContext";
import CartItem from "../components/CartItem";
import { createOrder,fetchOrders,fetchProducts } from "../redux/features/actions/products";
import { useDispatch,useSelector } from "react-redux";
import { useEffect } from "react";
import formatCurrency from "../utilities/formatCurrency";
import { useNavigate } from "react-router-dom";

export default function Orders() {

  const { closeCart, cartItems } = useShoppingCart();
  const {products,orders, loading, error} = useSelector((state:any) => state.products);
  console.log(orders)
const navigate = useNavigate();
const user = JSON.parse(localStorage.getItem('user') || '{}');

  const dispatch = useDispatch();

  useEffect(() => {
    if(!user.token) navigate('/login');
   
    dispatch(fetchOrders() as any);
 }

, [dispatch]);
 
  return (
    <div className="p-4">
      <div className="min-h-screen ">
        <div className="container mx-auto p-10 max-w-screen-lg">
          <div className="bg-white rounded shadow p-8">
            {/* <div className="w-full bg-orange-200 text-yellow-900 px-4 py-2 flex items-center">
              <img
                src="https://svgsilh.com/svg/151889.svg"
                className="w-10 block pr-2"
              />
              <div className="text-sm">
                Congrats you're eligible for a <b>Coupon Code</b> in this order{" "}
              </div>
            </div> */}

            <div>
              <h3 className="text-xl mt-4 font-bold pb-4">Order Summary</h3>
              <div className="flex gap-4 flex-col mb-4">
                {orders.map((item:any) => (
                    item.orderBooks.length > 0?
                  <div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center mr-4">
                      <img src={'https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg'} className=" h-20 w-32 object-cover mr-2" />
                      <div>
                        <p>
                                           
                        </p>
                        <p>{formatCurrency(item.amount)}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <p className="mr-4">Number {item.orderBooks.length}</p>
                  
                    </div>
                  </div>
                </div>:null
                ))}
              </div>
            </div>
  
          </div>
        </div>
      </div>
    </div>
  );
}
