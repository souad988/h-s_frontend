import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../store/product/productSlice';
import Header1 from '../components/header/Header1';
import Header2 from '../components/header/Header2';
import Hero from '../components/hero/Hero';

function Home() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);
  console.log('products', products);
  const handleClick = () => {
    dispatch(fetchProducts());
  };
  return (
    <div>
      <Header1 />
      <Header2 />
      <Hero />
      <div>Home Page</div>
      <button type="button" onClick={() => handleClick()}>
        getProducts
      </button>
    </div>
  );
}

export default Home;
