import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { useAuthContext } from "providers/AuthProvider";
import { EMAIL_REGEX } from 'utils/validations';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FormInputText } from 'components/Forms/FormInputText';
import Box from "@mui/material/Box";
import { RegisterForm } from "types/Auth";
import {axios} from 'services/axios';

interface RegisterProps {
  onChangeMode: () => void;
}

const Register: React.FC<RegisterProps> = ({ onChangeMode }) => {

  const [error, setError] = useState("");

  const { closeAuthModal, login } = useAuthContext();

  const { handleSubmit, control, formState: { isValid }, getValues } = useForm<RegisterForm>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<RegisterForm> = async (form: RegisterForm) => {
    setError("");
    try {

      await axios.post('/user', form)

      await login({ email: form.email, password: form.password })

      closeAuthModal();
    } catch (err) {
      setError(err.errors[0].msg);
    }
  };

  const formInputs = [
    {
      name: "username",
      label: "Nombre de usuario",
      type: "text",
      rules: {
        required: 'El nombre es requerido'
      }
    },
    {
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
    },
    {
      name: "password_confirm",
      label: "Confirmar contraseña",
      type: "password",
      rules: {
        required: 'El confirmar contraseña es requerido',
        validate: {
          validatePassword: (v: string | undefined) => getValues('password') === v || 'Las contraseñas deben coincidir'
        },
      }
    }
  ]

  return (
    <>
      <Typography variant="h6" component="h2">
        Crear usuario
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
          value="submit"
          disabled={!isValid}
        >
          Aceptar
        </Button>
      </Box>

      <Typography>
        Si ya tenés un usuario,
        <Typography component={Button} color="secondary" onClick={onChangeMode}>
          iniciá sesión!
        </Typography>
      </Typography>
    </>
  );
};

export default Register;
