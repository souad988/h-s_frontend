import React from "react";
// import { Box } from '@mui/material';
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../store/product/productSlice";
import Header1 from "../components/header/Header1";
import Header2 from "../components/header/Header2";
import Hero from "../components/hero/Hero";
import ProductCard from "../components/ProductCard/ProductCard";

function Home() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);
  console.log("products", products);
  const handleClick = () => {
    dispatch(fetchProducts());
  };
  return (
    <div>
      <Header1 />
      <Header2 />
      <Hero />
      <ProductCard />

      <button type="button" onClick={() => handleClick()}>
        getProducts
      </button>
    </div>
  );
}

export default Home;
