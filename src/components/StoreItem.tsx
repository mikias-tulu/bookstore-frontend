import { useShoppingCart } from "../context/ShoppingCartContext";
import formatCurrency from "../utilities/formatCurrency";
import AddCart from "./AddCart";
type StoreItemProps = {
  id: number;
  title: string;
  writer: string;
  point: number;
  coverImage: string;
  tag: string[];
};

export default function StoreItem({ id, title, point, coverImage, writer, tag }: StoreItemProps) {
  const { getItemQuantity, increaseCartQuantity } = useShoppingCart();
  const quantity = getItemQuantity(id);
  return (
    <div className="h-auto w-64 border border-gray-300 bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
      <h2 className="text-lg font-bold px-4 py-2">{title}</h2>
      <img src={coverImage} alt={title} className="h-48 w-full object-contain" />
      <div className="p-4 flex flex-col justify-between flex-grow">
        <div>
          <p className="text-sm text-gray-600 mb-2">by {writer}</p>
          <div className="flex flex-wrap mb-2">
            {tag.map((tag: any, index: number) => (
              <span key={index} className="bg-gray-200 text-gray-700 px-2 py-1 rounded-md mr-2 mb-1 text-xs">{tag}</span>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-700 mb-2"><span style={{ fontWeight: 'bold', backgroundColor: '#FFD700', padding: '2px 4px', borderRadius: '4px' }}>{formatCurrency(point)}</span></p>
        </div>
        <div className="flex justify-center">
          {quantity === 0 ? (
            <button
              className="bg-yellow-500 hover:bg-yellow-600 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
              onClick={() => increaseCartQuantity(id)}
            >
              Buy this book
            </button>
          ) : (
            <AddCart quantity={quantity} id={id} />
          )}
        </div>
      </div>
    </div>
  );
  
  
  
  
  
}
