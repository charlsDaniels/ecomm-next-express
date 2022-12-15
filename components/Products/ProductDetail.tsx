import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useContext, useState } from "react";
import { useAuthContext } from "../../providers/AuthProvider";
import { CartContext } from "../../providers/CartProvider";
import { CartContextType, CartItemInterface } from "../../types/Cart";
import { DBProduct, Size } from "../../types/Product";
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
          id: product.id,
          categoryDescription: product.categoryDescription,
          title: product.title,
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

  const selectSizeHandler = (size: Size) => {
    const initialCount = cartContext.getItemInitialCount(product.id, size.id);
    setInitialCount(initialCount);
    setSelectedSize(size.id);
    setStock(size.stock);
  };

  const productTitle = () => {
    return `${product.categoryDescription.slice(0, -1)} ${product.title}`;
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
        <Typography variant="body2" my={3}>
          {product.description}
        </Typography>
        <Typography variant="body1" ml={2}>
          ${product.price},00
        </Typography>
        <Typography variant="body2" mt={2}>
          Hasta 6 cuotas sin interés
        </Typography>

        <Box mt={3} sx={{ display: "flex", gap: 6 }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="overline">Selecciona tu talla</Typography>

            <ButtonGroup size="small" color="secondary" variant="outlined">
              {product.sizes.map((size) => (
                <Button
                  key={size.id}
                  onClick={() => selectSizeHandler(size)}
                  style={
                    selectedSize === size.id
                      ? {
                        color: "#fff",
                        backgroundColor: "#3B253B",
                      }
                      : undefined
                  }
                >
                  {size.id}
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
