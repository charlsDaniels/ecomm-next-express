import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import OrderModal from "./OrderModal";
import { useState, useContext } from "react";
import { CartContext } from "../../providers/CartProvider";
import { addOrder } from "../../services/firebase/querys";
import { serverTimestamp } from "firebase/firestore";
import Loader from "../UI/Loader";
import { CartContextType } from "../../types/Cart";
import { useAuthContext } from "../../providers/AuthProvider";
import { useRouter } from "next/router";
import { EMAIL_REGEX } from '../../utils/validations';
import { useForm, SubmitHandler } from 'react-hook-form';
import { auth } from "../../services/firebase/initialize";
import { FormInputText } from '../Forms/FormInputText';

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
      const order = {
        buyer: data,
        items: cartContext.cart,
        total: cartContext.totalAmount(),
        status: "generada",
        createdAt: serverTimestamp(),
      };
      const { id } = await addOrder(order);
      setOrderId(id);
      setShowModal(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const formInputs = [{
    name: "name",
    label: "Nombre completo",
    type: "text",
    rules: {
      required: 'El nombre es requerido',
    }
  },
  {
    name: "phone",
    label: "Teléfono",
    type: "tel",
    rules: {
      required: 'El teléfono es requerido'
    }
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    // defaultValue: authState.user?.email,
    rules: {
      pattern: {
        value: EMAIL_REGEX,
        message: 'El formato del email debe ser válido'
      }
    }
  }]

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
