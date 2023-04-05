import React from "react";
import Box from "@mui/material/Box";
import { useAuthContext } from "providers/AuthProvider";
import { EMAIL_REGEX } from 'utils/validations';
import { useForm } from 'react-hook-form';
import { FormInputText } from 'components/Forms/FormInputText';
import { useEffect } from 'react';

export type PersonalInfoFormTypes = {
  name?: string,
  phone?: string,
  email?: string | null
};

interface Props {
  info: PersonalInfoFormTypes
  onValidForm: (isValid: boolean, getValues: any) => void
}

const PersonalInfoForm = ({ onValidForm, info }: Props) => {

  const { authState } = useAuthContext();

  const { control, formState: { isValid, isValidating }, getValues } = useForm<PersonalInfoFormTypes>(
    {
      mode: 'onChange',
      defaultValues: { email: authState.user?.email }
    }
  );

  const formInputs = [
    {
      name: "name",
      label: "Nombre completo",
      type: "text",
      rules: {
        required: 'El nombre es requerido',
      },
      value: info.name || ''
    },
    {
      name: "phone",
      label: "Teléfono",
      type: "tel",
      rules: {
        required: 'El teléfono es requerido'
      },
      value: info.phone || ''
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      rules: {
        pattern: {
          value: EMAIL_REGEX,
          message: 'El formato del email debe ser válido'
        }
      },
      value: info.email || ''
    }
  ]

  useEffect(() => {
    onValidForm(isValid, getValues)
  }, [isValidating])

  return (
    <>
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
        >
          {formInputs.map(input => (
            <FormInputText
              key={input.name}
              name={input.name}
              control={control}
              value={input.value}
              label={input.label}
              type={input.type}
              rules={input.rules} />
          ))}
        </Box>
      </Box>
    </>
  );
};

export default PersonalInfoForm;
