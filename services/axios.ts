import axios from "axios";
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig()

const API_URL = publicRuntimeConfig.apiUrl

const client = axios.create({
  baseURL: `${API_URL}`,
});

client.interceptors.response.use(
  res => res,
  err => {
    if (err.response.data.errors) throw err.response.data.errors
    return err
  }
)

export {
  client as axios
}
