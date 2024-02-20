import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../store/product/productSlice';
import { fetchCategories } from '../store/category/categorySlice';
import Header1 from '../components/header/Header1';
import Header2 from '../components/header/Header2';
import Hero from '../components/hero/Hero';
import ProductCard from '../components/product/productCard';

function Home() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);
  const { categories } = useSelector((state) => state.category);
  console.log('products', products);
  console.log('categories', categories);
  const handleClick = () => {
    dispatch(fetchProducts());
  };

  const handleCategoriesClick = () => {
    dispatch(fetchCategories());
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
      <button type="button" aria-label="getProducts" onClick={() => handleClick()}>getProducts</button>
      <button type="button" onClick={() => handleCategoriesClick()}>getCategories</button>
      {products && products.map((product) => (
        <ProductCard product={product} key={product.id} data-testid="product-item" />
      ))}
    </div>
  );
}

export default Home;
