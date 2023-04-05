import React, { Fragment } from 'react'
import Box from '@mui/material/Box';
import ProductDetail from 'components/Products/ProductDetail';
import { DBProduct } from 'types/Product';
import { GetStaticProps, GetStaticPaths } from 'next'
import Empty from 'components/Navigation/Empty';
import Head from 'next/head';
import { fetchProduct, fetchProducts } from 'services/api/querys';

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

  const product = await fetchProduct(productId)

  return {
    props: {
      product
    },
    revalidate: 60
  }
}

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const { products }: { products: DBProduct[]} = await fetchProducts()

  const paths = products.map(product => ({ params: { productId: product._id } }))

  return {
    paths: paths,
    fallback: true
  }
}

export default ProductDetailPage