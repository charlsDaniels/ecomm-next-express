import ShoppingCart from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "../../providers/CartProvider";
import { CartContextType } from "../../types/Cart";

const CartWidget = () => {
  const cartContext = useContext(CartContext) as CartContextType;

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Ver carrito">
        <Link href="/cart">
          <IconButton sx={{ p: 0 }}>
            <Badge badgeContent={cartContext.numberOfItems()} color="success">
              <ShoppingCart
                titleAccess="Carrito de compras"
                color="secondary"
                fontSize="large"
              />
            </Badge>
          </IconButton>
        </Link>
      </Tooltip>
    </Box>
  );
};

export default CartWidget;
