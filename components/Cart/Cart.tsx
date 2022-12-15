import React, { useContext } from "react";
import { CartContext } from "../../providers/CartProvider";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CartItemList from "./CartItemList";
import CheckoutForm from "./CheckoutForm";
import { CartContextType } from "../../types/Cart";
import Empty from "../Navigation/Empty";

const Cart: React.FC = () => {
  const cartContext = useContext(CartContext) as CartContextType;

  if (cartContext.isEmpty()) {
    return (
      <Empty
        title="Todavía no agregaste productos al carrito..."
        description="Empezá a comprar!"
      />
    );
  }

  return (
    <>
      <Typography
        variant="h5"
        mb={5}
        textAlign="center"
        textTransform="capitalize"
      >
        Carrito
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: {
            xs: 4,
            md: 12,
          },
          flexWrap: "wrap",
        }}
      >
        <CartItemList />
        <CheckoutForm />
      </Box>
    </>
  );
};

export default Cart;
