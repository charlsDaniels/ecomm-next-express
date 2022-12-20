import Cart from "../../components/Cart/Cart";
import { useAuthContext } from "../../providers/AuthProvider";
import { useRouter } from "next/router";
import { Fragment, useEffect } from "react";
import Head from 'next/head';

const CartPage = () => {
  const { isUserAuthenticated } = useAuthContext()

  const router = useRouter()

  useEffect(() => {
    if (!isUserAuthenticated()) {
      router.push("/");
    }
  }, []);

  if (!isUserAuthenticated()) {
    return null;
  }

  return (
    <Fragment>
      <Head>
        <title>Carrito</title>
      </Head>
      <Cart />
    </Fragment>
  );
};

export default CartPage;