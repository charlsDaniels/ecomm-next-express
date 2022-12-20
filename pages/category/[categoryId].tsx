import { GetServerSideProps } from 'next';
import { fetchAllProducts } from '../../services/firebase/querys';
import ProductList from '../../components/Products/ProductList';
import { DBProduct } from '../../types/Product';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import Head from 'next/head';

interface ProductCategoryPageProps {
  products: DBProduct[]
}

const ProductCategoryPage = ({ products }: ProductCategoryPageProps) => {
  const router = useRouter();

  const category = router.query.categoryId as string

  return (
    <Fragment>
      <Head>
        <title>{category.toUpperCase()}</title>
        <meta name="description" content={`Todas las ${category}`}></meta>
      </Head>
      {products.length && <ProductList products={products} title={category} />}
    </Fragment>
  )
}

export default ProductCategoryPage;


export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const categoryId = ctx.params?.categoryId as string

  const snapshot = await fetchAllProducts(categoryId)

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

