import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { DBProduct } from "types/Product";
import Link from "next/link";

interface Props {
  product: DBProduct;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <Box sx={{ width: 230 }}>
      <Link href={`/product/${product._id}`}>
        <Card
          elevation={2}
          sx={{
            borderRadius: 1,
            "&:hover": {
              transform: "scale(1.02)",
            },
          }}
        >
          <CardContent>
            <CardHeader
              title={product.name}
              subheader={`$${product.price},00 `}
              sx={{ pt: 0 }}
            />
            <CardMedia
              component="img"
              sx={{ objectFit: "contain" }}
              height="200"
              image={product.pictureUrl}
              alt={product.name}
            />
          </CardContent>
        </Card>
      </Link>
    </Box>
  );
};

export default ProductCard;
