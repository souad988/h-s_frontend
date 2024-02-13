import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, fetchProduct } from '../store/product/productSlice';
import { fetchCategories } from '../store/category/categorySlice';
import Header1 from '../components/header/Header1';
import Header2 from '../components/header/Header2';

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

  const handleProductClick = (id) => {
    dispatch(fetchProduct(id));
  };

  return (
    <div>
      <Header1 />
      <Header2 />
      <div>Home Page</div>
      <button type="button" onClick={() => handleClick()}>getProducts</button>
      <button type="button" onClick={() => handleCategoriesClick()}>getCategories</button>
      {products && products.map((product) => (
        <button type="button" key={product.id} onClick={() => handleProductClick(product.id)}>{product.name}</button>
      ))}
    </div>
  );
}

export default Home;
