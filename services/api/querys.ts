import { DBProduct, DBProductResponse } from '../../types/Product';
import { axios } from "../axios";

const fetchProducts = async (category = '') => {
  const query = category ? `?category=${category}` : ''
  return await axios.get<DBProductResponse>(`/product${query}`);
}

const fetchProduct = async (id: string) => {
  return await axios.get<DBProduct>(`/product/${id}`)
}

const swrFetcher = async (resource: string) => {
  const response = await axios.get<any>(`/${resource}`)
  return response.data
}

export {
  fetchProducts,
  fetchProduct,
  swrFetcher
};
