//@ts-check
import Box from "@mui/material/Box";
import { DBProduct } from "../../types/Product";
import Product from "./ProductCard";
import Typography from '@mui/material/Typography';

interface Props {
  products: DBProduct[];
  title?: string
}

const ProductList = ({ products, title }: Props) => {
  return (
    <Box>
      {title && <Typography
        variant="h5"
        mb={5}
        textAlign="center"
        textTransform="capitalize"
      >
        {title}
      </Typography>}

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 5,
          flexWrap: "wrap",
        }}
      >
        {products.map((item) => (
          <Product key={item.id} product={item} />
        ))}
      </Box>
    </Box>
  );
};

export default ProductList;
