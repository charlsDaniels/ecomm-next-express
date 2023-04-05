import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAuthContext } from "providers/AuthProvider";
import { FormInputText } from "../FormInputText";
import { EMAIL_REGEX } from 'utils/validations'
import { LoginForm } from "types/Auth";

interface LoginProps {
  onChangeMode: () => void;
}

const formInputs = [{
  name: "email",
  label: "Email",
  type: "email",
  rules: {
    required: 'El email es requerido',
    pattern: {
      value: EMAIL_REGEX,
      message: 'El formato del email debe ser válido'
    }
  }
},
{
  name: "password",
  label: "Contraseña",
  type: "password",
  rules: {
    required: 'La contraseña es requerida'
  }
}]

const Login: React.FC<LoginProps> = ({ onChangeMode }) => {

  const [error, setError] = useState("")

  const { login, closeAuthModal } = useAuthContext();

  const { handleSubmit, control, formState: { isValid } } = useForm<LoginForm>();

  const onSubmit: SubmitHandler<LoginForm> = async (form: LoginForm) => {
    setError("");
    try {
      await login(form);
      closeAuthModal();
    } catch (err) {
      setError("Ocurrió un error al iniciar sesión");
    }
  };

  return (
    <>
      <Typography variant="h6" component="h2">
        Iniciar sesión
      </Typography>

      {error && <Typography color="error">{error}</Typography>}

      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
        onSubmit={handleSubmit(onSubmit)}>
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
          Aceptar
        </Button>
      </Box>

      <Box sx={{
        display: "flex",
        flexDirection: "column",
      }}>
        <Typography>
          Si todavía no tenés un usuario,
        </Typography>
        <Typography component={Button} color="secondary" onClick={onChangeMode}>
          registrate!
        </Typography>
      </Box>
    </>
  );
};

export default Login;
