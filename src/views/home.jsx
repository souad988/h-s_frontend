import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../store/product/productSlice';

function Home() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);
  console.log('products', products);
  const handleClick = () => {
    dispatch(fetchProducts());
  };
  return (
    <div>
      <div>Home Page</div>
      <button type="button" onClick={() => handleClick()}>getProducts</button>
    </div>
  );
}

export default Home;
