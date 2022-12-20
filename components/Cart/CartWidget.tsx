import ShoppingCart from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "../../providers/CartProvider";
import { CartContextType } from "../../types/Cart";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const CartWidget = () => {
  const cartContext = useContext(CartContext) as CartContextType;

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Ver carrito">
        <Link href="/cart">
          <IconButton sx={{ p: 0, ml: { xs: -3, md: -6 } }}>
            <Badge badgeContent={cartContext.numberOfItems()} color="success">
              <ShoppingCart
                titleAccess="Carrito de compras"
                color="secondary"
                fontSize={isDesktop ? "large" : "medium"}
              />
            </Badge>
          </IconButton>
        </Link>
      </Tooltip>
    </Box>
  );
};

export default CartWidget;
