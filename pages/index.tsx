import Box from "@mui/material/Box";
import { GetStaticProps } from 'next'
import ProductList from "../components/Products/ProductList";
import { fetchAllProducts } from "../services/firebase/querys";
import { DBProduct } from "../types/Product";

// import Loader from "./../components/UI/Loader";

interface Props {
  products: DBProduct[]
}

const HomePage: React.FC<Props> = (props) => {

  const { products } = props
  // const isLoading = useState(true)

  return (
    <Box>
      {/* {loading && <Loader />} */}

      {products.length && <ProductList products={products} title="Productos Destacados" />}
    </Box>
  );
};


export const getStaticProps: GetStaticProps = async (ctx) => {
  const snapshot = await fetchAllProducts();

  const products = snapshot.docs.map((doc) => {
    return {
      ...doc.data(),
      id: doc.id,
    };
  });

  const featuredProducts = products.filter(prod => prod.isFeatured)

  return {
    props: {
      products: featuredProducts
    },
    revalidate: 180
  }
}

export default HomePage;

