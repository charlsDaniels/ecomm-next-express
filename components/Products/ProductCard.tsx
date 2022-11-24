import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { DBProduct } from "../../types/Product";
import Link from "next/link";

interface Props {
  product: DBProduct;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <Box sx={{ width: 260 }}>
      <Link href={`/products/${product.id}`}>
        <Card
          elevation={5}
          sx={{
            borderRadius: 3,
            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
        >
          <CardContent>
            <CardHeader
              title={product.title}
              subheader={`$${product.price},00 `}
              sx={{ pt: 0 }}
            />
            <CardMedia
              component="img"
              sx={{ objectFit: "contain" }}
              height="235"
              image={product.pictureUrl}
              alt={product.title}
            />
          </CardContent>
        </Card>
      </Link>
    </Box>
  );
};

export default ProductCard;
