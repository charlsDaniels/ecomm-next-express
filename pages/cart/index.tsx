import Cart from "components/Cart/Cart";
import Head from 'next/head';
import { useRouter } from "next/router";
import { useAuthContext } from "providers/AuthProvider";
import { Fragment, useEffect } from "react";

const CartPage = () => {
  const { isUserAuthenticated } = useAuthContext()

  const router = useRouter()

  useEffect(() => {
    if (!isUserAuthenticated()) {
      router.push("/");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
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