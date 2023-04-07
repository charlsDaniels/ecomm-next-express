import { AxiosResponse } from 'axios';
import ProductList from "components/Products/ProductList";
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { Fragment } from 'react';
import { fetchProducts } from 'services/api/querys';
import { DBProduct } from 'types/Product';
import { DBProductResponse } from '../types/Product';

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
  const { data }: AxiosResponse<DBProductResponse, any> = await fetchProducts()

  const { products }: { products: DBProduct[] } = data

  const featuredProducts = products.filter((prod) => prod.isFeatured)

  return {
    props: {
      products: featuredProducts
    },
    revalidate: 180
  }
}

export default HomePage;

