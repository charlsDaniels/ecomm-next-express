import Box from '@mui/material/Box';
import Empty from 'components/Navigation/Empty';
import ProductDetail from 'components/Products/ProductDetail';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { Fragment } from 'react';
import { fetchProducts } from 'services/api/querys';
import { DBProduct } from 'types/Product';
import { axios } from '../../services/axios';

interface ProductDetailPageProps {
  product: DBProduct
}

const ProductDetailPage = ({ product }: ProductDetailPageProps) => {

  if (!product) {
    return <Empty description="Producto no encontrado" />
  }

  return (
    <Fragment>
      <Head>
        <title>{product.name}</title>
        <meta name="description" content={product.description}></meta>
      </Head>
      <Box>
        <ProductDetail product={product} />
      </Box>
    </Fragment>
  );
}


export const getStaticProps: GetStaticProps = async (ctx) => {
  const productId = String(ctx.params?.productId)
  const { data } = await axios.get(`/product/${productId}`)
  
  return {
    props: {
      product: data
    },
    revalidate: 60
  }
}

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const { data: { products } } = await fetchProducts()

  const paths = products.map(product => ({ params: { productId: product._id } }))

  return {
    paths: paths,
    fallback: true
  }
}

export default ProductDetailPage