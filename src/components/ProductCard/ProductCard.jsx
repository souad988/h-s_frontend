import React from "react";
import Card from "@mui/material/Card";
import Rating from "@mui/material/Rating";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";

export default function ProductCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image="/static/images/cards/contemplative-reptile.jpg"
        title="green iguana"
      />

      <CardContent>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography gutterBottom variant="h6" component="div">
            Dress
          </Typography>
          <Typography variant="subtitle1" component="p">
            $13.99
          </Typography>
        </Stack>
        <Typography variant="Body2" color="text.secondary">
          This the product description!
        </Typography>
      </CardContent>

      <CardActions sx={{ justifyContent: "space-between" }}>
        <Button size="large" sx={{ textTransform: "capitalize" }}>
          <AddShoppingCartOutlinedIcon fontSize="small" sx={{ mr: 1 }} />
          Add to Cart
        </Button>
        <Rating name="read-only" precision={0.5} value={4.5} readOnly />
      </CardActions>
    </Card>
  );
}
