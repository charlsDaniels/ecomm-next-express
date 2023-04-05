import { axios } from "../axios";

const fetchProducts = async (category = '') => {
  const query = category ? `?category=${category}` : ''
  const products = await axios.get(`/product${query}`);
  return products
}

const fetchProduct = async (id: string) => {
  const product = await axios.get(`/product/${id}`)
  return product
}

const swrFetcher = async (resource: string) => {
  const response = await axios.get(`/${resource}`)
  return response
}

export {
  fetchProducts,
  fetchProduct,
  swrFetcher
}