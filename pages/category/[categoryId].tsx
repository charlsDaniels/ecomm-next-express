import { GetServerSideProps } from 'next';
import { fetchAllProducts } from '../../services/firebase/querys';
import ProductList from '../../components/Products/ProductList';
import { DBProduct } from '../../types/Product';
import { useRouter } from 'next/router';

interface ProductCategoryPageProps {
  products: DBProduct[]
}

const ProductCategoryPage = ({ products }: ProductCategoryPageProps) => {
  const router = useRouter();

  return (
    <>
      {products.length && <ProductList products={products} title={router.query.categoryId as string} />}
    </>
  )
}

export default ProductCategoryPage;


export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const categoryId = ctx.params?.categoryId

  const snapshot = await fetchAllProducts(categoryId as string)

  const products = snapshot.docs.map((doc) => {
    return {
      ...doc.data(),
      id: doc.id,
    };
  });

  return {
    props: {
      products
    }
  }
}

