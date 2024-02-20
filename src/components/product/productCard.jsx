import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import { fetchProduct } from '../../store/product/productSlice';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const handleClick = (id) => {
    dispatch(fetchProduct(id));
  };
  return (
    <div>
      {product
        ? <Link to="/productDetails"><Typography variant="h3" onClick={() => handleClick(product.id)}>{product.name}</Typography></Link>
        : <Typography variant="h3">Error Try Again Later </Typography>}
    </div>
  );
};

export default ProductCard;
