import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { FormInputText } from 'components/Forms/FormInputText';
import Loader from "components/UI/Loader";
import { useRouter } from "next/router";
import { useAuthContext } from "providers/AuthProvider";
import { CartContext } from "providers/CartProvider";
import { useContext, useMemo, useState } from "react";
import { SubmitHandler, useForm } from 'react-hook-form';
import { CartContextType } from "types/Cart";
import { EMAIL_REGEX } from 'utils/validations';
import OrderModal from "./OrderModal";
import { axios } from "services/axios";

type FormData = {
  name?: string,
  phone?: string,
  email?: string | null
};

const CheckoutForm = () => {
  const cartContext = useContext(CartContext) as CartContextType;
  const router = useRouter();

  const { authState } = useAuthContext();

  const { handleSubmit, control, formState: { isValid }, getValues } = useForm<FormData>(
    {
      mode: 'onChange',
      defaultValues: { email: authState.user?.email }
    }
  );

  const [openModal, setShowModal] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCloseModal = () => {
    cartContext.clear();
    router.push("/")
  };

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    setLoading(true);
    try {
      const items = cartContext.cart.map(item => {
        return {
          productId: item.id,
          sizes: item.sizes
        }
      })
      const order = {
        items,
        total: cartContext.totalAmount(),
      };
      const response = await axios.post('/order', order)
      setOrderId(response.data.trackingNumber);
      setShowModal(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const formInputs = useMemo(() => {
    return [
      {
        name: "name",
        label: "Nombre completo",
        type: "text",
        rules: {
          required: 'El nombre es requerido',
        }
      },
      // {
      //   name: "phone",
      //   label: "Teléfono",
      //   type: "tel",
      //   rules: {
      //     required: 'El teléfono es requerido'
      //   }
      // },
      {
        name: "email",
        label: "Email",
        type: "email",
        rules: {
          pattern: {
            value: EMAIL_REGEX,
            message: 'El formato del email debe ser válido'
          }
        }
      }
    ]
  }, []);

  return (
    <>
      {loading && <Loader />}

      {openModal && <OrderModal orderId={orderId} onClose={handleCloseModal} />}

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Typography variant="h5">
            Total carrito: ${cartContext.totalAmount()},00
          </Typography>

          <Typography variant="body1" mt={5}>
            Completa tus datos para finalizar la compra!
          </Typography>

          {formInputs.map(input => (
            <FormInputText
              key={input.name}
              name={input.name}
              control={control}
              label={input.label}
              type={input.type}
              rules={input.rules} />
          ))}

          <Button
            variant="outlined"
            color="secondary"
            type="submit"
            disabled={!isValid}
          >
            Comprar
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default CheckoutForm;
