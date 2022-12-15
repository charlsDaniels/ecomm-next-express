import Cart from "../../components/Cart/Cart";
import { useAuthContext } from "../../providers/AuthProvider";
import { useRouter } from "next/router";
import { useEffect } from "react";

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
    <Cart />
  );
};

export default CartPage;