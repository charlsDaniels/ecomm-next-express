import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { FormInputText } from 'components/Forms/FormInputText';
import { useAuthContext } from "providers/AuthProvider";
import { useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { axios } from 'services/axios';
import { RegisterForm } from "types/Auth";
import { EMAIL_REGEX } from 'utils/validations';

interface RegisterProps {
  onChangeMode: () => void;
}

const Register: React.FC<RegisterProps> = ({ onChangeMode }) => {

  const [error, setError] = useState("");

  const { login } = useAuthContext();

  const { handleSubmit, control, formState: { isValid }, getValues } = useForm<RegisterForm>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<RegisterForm> = async (form: RegisterForm) => {
    setError("");
    try {
      await axios.post('/user', form)
      await login({ email: form.email, password: form.password })
    } catch (err: any) {
      setError(err.errors[0].msg);
    }
  };

  const formInputs = useMemo(() => [
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  ], [])

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
