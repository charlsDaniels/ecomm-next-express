import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Fragment, useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import CartProvider from '../providers/CartProvider';
import AuthProvider from '../providers/AuthProvider';
import { useRouter } from 'next/router';
import Loader from '../components/UI/Loader';
import Head from 'next/head';

const theme = createTheme({
  palette: {
    primary: {
      main: "#c4e7ed",
    },
    secondary: {
      main: "#553555",
    },
  },
  typography: {
    fontFamily: "'Oswald', sans-serif",
    body1: {
      fontWeight: 300,
    },
  },
});

function App({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);

  const router = useRouter()

  useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
    router.events.on("routeChangeStart", start);
    router.events.on("routeChangeComplete", end);
    router.events.on("routeChangeError", end);
  });

  return (
    <Fragment>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <CartProvider>
            <Layout>
              {loading ? <Loader /> : <Component {...pageProps} />}
            </Layout>
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </Fragment>
  )
}

export default App
