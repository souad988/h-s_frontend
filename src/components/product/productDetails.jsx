import React from 'react';
import { useSelector } from 'react-redux';
import { Typography } from '@mui/material';

const ProductDetails = () => {
  const { product, loading } = useSelector((state) => state.product);
  if (loading) {
    return (
      <div>loading ...</div>
    );
  }
  return (
    <div>
      {product
        ? <Typography variant="h3">{product.name}</Typography>
        : <Typography variant="h3">Error Try Again Later </Typography>}
    </div>
  );
};

export default ProductDetails;
