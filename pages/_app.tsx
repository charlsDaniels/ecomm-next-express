import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from 'react';
import Container from '@mui/material/Container';
import Layout from '../components/Layout/Layout';
import CartProvider from '../providers/CartProvider';
import AuthProvider from '../providers/AuthProvider';

const theme = createTheme({
  palette: {
    primary: {
      main: "#c4e7ed",
    },
    secondary: {
      main: "#553555",
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <CartProvider>
          <Layout>
              <Component {...pageProps} />
          </Layout>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
