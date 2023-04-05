import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useContext, useState } from "react";
import { useAuthContext } from "providers/AuthProvider";
import { CartContext } from "providers/CartProvider";
import { CartContextType, CartItemInterface } from "types/Cart";
import { DBProduct, Stock } from "types/Product";
import ItemCount from "./ItemCount";

interface Props {
  product: DBProduct;
}

const ProductDetail = ({ product }: Props) => {
  const cartContext = useContext(CartContext) as CartContextType;
  const { isUserAuthenticated, openAuthModal } = useAuthContext();

  const [stock, setStock] = useState(0);
  const [initialCount, setInitialCount] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [checkoutButton, setShowCheckoutBtn] = useState(false)

  const onAddHandler = (quantity: number) => {
    if (!isUserAuthenticated()) {
      openAuthModal();
    } else {
      const selectedQuantity = initialCount === 1 ? quantity - 1 : quantity - initialCount;
      cartContext.addItem(
        {
          id: product._id,
          categoryDescription: product.category.name,
          title: product.name,
          price: product.price,
          pictureUrl: product.pictureUrl,
          sizes: [],
        } as CartItemInterface,
        selectedSize,
        selectedQuantity
      );
      setShowCheckoutBtn(true);
    }
  };

  const selectSizeHandler = (stock: Stock) => {
    const initialCount = cartContext.getItemInitialCount(product._id, stock.size);
    setInitialCount(initialCount);
    setSelectedSize(stock.size);
    setStock(stock.quantity);
  };

  const productTitle = () => {
    return `${product.category.name.slice(0, -1)} ${product.name}`;
  };

  return (
    <Box sx={{ display: "flex", mt: 6, ml: 7, gap: 5, flexWrap: "wrap" }}>
      <Box>
        <Box
          component="img"
          sx={{
            width: 196
          }}
          alt={product.description}
          src={product.pictureUrl}
        />
      </Box>

      <Box height={400}>
        <Typography variant="h5" textTransform="capitalize">
          {productTitle()}
        </Typography>

        <Typography variant="body1" my={3}>
          {product.description}
        </Typography>
        <Typography variant="body1" ml={2}>
          ${product.price},00
        </Typography>
        <Typography variant="body1" mt={2}>
          Hasta 6 cuotas sin interés
        </Typography>

        <Box mt={3} sx={{ display: "flex", gap: { xs: 2, md: 6 }, flexDirection: { xs: "column", md: "row" } }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="overline">Selecciona tu talla</Typography>

            <ButtonGroup size="small" color="secondary" variant="outlined">
              {product.stock.map((stock) => (
                <Button
                  key={stock.size}
                  onClick={() => selectSizeHandler(stock)}
                  style={
                    selectedSize === stock.size
                      ? {
                        color: "#fff",
                        backgroundColor: "#3B253B",
                      }
                      : undefined
                  }
                >
                  {stock.size}
                </Button>
              ))}
            </ButtonGroup>
          </Box>

          {stock !== 0 && (
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="overline">
                Stock disponible: {stock}
              </Typography>
              <ItemCount
                stock={stock}
                initial={initialCount}
                onAdd={onAddHandler}
              />
            </Box>
          )}
        </Box>

        {!cartContext.isEmpty() && checkoutButton && (
          <Box mt={5}>
            <Link href={`/cart`}>
              <Button
                color="secondary"
                variant="contained"
                size="small"
              >
                Finalizar compra
              </Button>
            </Link>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ProductDetail;
