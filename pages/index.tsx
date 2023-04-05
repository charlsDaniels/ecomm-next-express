import { GetStaticProps } from 'next'
import Head from 'next/head';
import { Fragment } from 'react';
import ProductList from "components/Products/ProductList";
import { fetchProducts } from 'services/api/querys';
import { DBProduct } from 'types/Product';

interface HomePageProps {
  products: DBProduct[]
}

const HomePage = ({ products }: HomePageProps) => {
  return (
    <Fragment>
      <Head>
        <title>Productos Destacados</title>
        <meta name="description" content="Encontrá las mejores remeras y camisas!"></meta>
      </Head>
      {products.length && <ProductList products={products} title="Productos Destacados" />}
    </Fragment>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { products }: { products: DBProduct[] } = await fetchProducts()

  const featuredProducts = products.filter((prod) => prod.isFeatured)

  return {
    props: {
      products: featuredProducts
    },
    revalidate: 180
  }
}

export default HomePage;

