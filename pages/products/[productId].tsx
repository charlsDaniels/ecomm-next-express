import React from 'react'
import Box from '@mui/material/Box';
import ProductDetail from '../../components/Products/ProductDetail';
import { DBProduct } from '../../types/Product';
import { fetchAllProducts, fetchProductById } from '../../services/firebase/querys';
import { GetStaticProps, GetStaticPaths } from 'next'
import Empty from '../../components/Navigation/Empty';

interface Props {
  product: DBProduct
}

const ProductDetailPage: React.FC<Props> = (props) => {

  const { product } = props

  if (!product) {
    return <Empty messages={["Ocurió un error", "Producto no encontrado"]} />
  }

  return (
    <Box>
      <ProductDetail product={product} />
    </Box>
  );
}


export const getStaticProps: GetStaticProps = async (ctx) => {
  const productId = ctx.params?.productId

  const doc = await fetchProductById(productId as string)
  const data = doc.data();

  const product = data ? { ...data, id: doc.id } : null

  return {
    props: {
      product
    },
    revalidate: 10
  }
}

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const snapshot = await fetchAllProducts();

  const products = snapshot.docs.map((doc) => {
    return {
      ...doc.data(),
      id: doc.id,
    };
  });

  const paths = products.map(product => ({ params: { productId: product.id } }))

  return {
    paths: paths,
    fallback: true
  }
}

export default ProductDetailPage