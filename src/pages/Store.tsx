import StoreItem from "../components/StoreItem";
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../redux/features/actions/products';
import { Link } from 'react-router-dom';

export default function Store() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state: any) => state.products);

  useEffect(() => {
    dispatch(fetchProducts() as any);
  }, [dispatch]);

  // Check if products is still loading or is undefined
  if (loading || products === undefined) {
    return <div>Loading...</div>;
  }

  // Check if there's an error fetching products


  return (
    <>
    
    <div className="bg-yellow-200 py-16 mb-8">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl font-bold text-yellow-800 mb-4">Welcome to Bookstore</h1>
        <p className="text-lg text-yellow-700 mb-8">Discover the magic of reading with our curated collection of books for all ages and interests.</p>
        <Link to="/register" className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-6 rounded-md shadow-md transition duration-300 mr-4">Register</Link>
      </div>
    </div>

    <div className="flex flex-wrap justify-center">
      {products.map((item: any, index: number) => (
        <div key={item.id} className="mb-8 mr-8">
          <StoreItem
            id={item.id}
            title={item.title}
            writer={item.writer}
            point={item.point}
            coverImage={item.coverImage}
            tag={item.tags}
          />
        </div>
      ))}
    </div>
  </>
  
  
  );
}
