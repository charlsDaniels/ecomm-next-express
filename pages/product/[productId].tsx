import React, { Fragment } from 'react'
import Box from '@mui/material/Box';
import ProductDetail from 'components/Products/ProductDetail';
import { DBProduct } from 'types/Product';
import { GetStaticProps, GetStaticPaths } from 'next'
import Empty from 'components/Navigation/Empty';
import Head from 'next/head';
import { fetchProduct, fetchProducts } from 'services/api/querys';
import {DBProductResponse} from '../../types/Product';
import { AxiosResponse } from 'axios';
import {axios} from '../../services/axios';

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

  const { data }: AxiosResponse<DBProduct, any> = await axios.get(`/product/${productId}`)

  return {
    props: {
      product: data
    },
    revalidate: 60
  }
}

export const getStaticPaths: GetStaticPaths = async (ctx) => {

  const { data }: AxiosResponse<DBProductResponse, any> = await fetchProducts()

  const { products }: { products: DBProduct[] } = data

  const paths = products.map(product => ({ params: { productId: product._id } }))

  return {
    paths: paths,
    fallback: true
  }
}

export default ProductDetailPage