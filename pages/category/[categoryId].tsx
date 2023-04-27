import ProductList from 'components/Products/ProductList';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import { fetchProducts } from 'services/api/querys';
import { DBProduct } from 'types/Product';

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
  const category = ctx.params?.categoryId as string
  const { data: { products } } = await fetchProducts(category)

  return {
    props: {
      products
    }
  }
}

