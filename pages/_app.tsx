import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import CartProvider from '../providers/CartProvider';
import AuthProvider from '../providers/AuthProvider';
import { useRouter } from 'next/router';
import Loader from '../components/UI/Loader';

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
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <CartProvider>
          <Layout>
            {loading ? <Loader /> : <Component {...pageProps} />}
          </Layout>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
