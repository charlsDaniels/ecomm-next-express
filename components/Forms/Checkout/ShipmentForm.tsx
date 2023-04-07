import React from "react";
import Box from "@mui/material/Box";
import { useForm } from 'react-hook-form';
import { FormInputText } from 'components/Forms/FormInputText';
import { useEffect } from 'react';

export type ShipmentFormTypes = {
  address?: string,
  postalCode?: string,
};

interface Props {
  info: ShipmentFormTypes
  onValidForm: (isValid: boolean, getValues: any) => void;
}

const ShipmentForm = ({ onValidForm, info }: Props) => {

  const { control, formState: { isValid, isValidating }, getValues } = useForm<ShipmentFormTypes>(
    {
      mode: 'onChange',
    }
  );

  const formInputs = [
    {
      name: "address",
      label: "Dirección",
      type: "text",
      rules: {
        required: 'La dirección es requerida',
      },
      value: info.address || ''
    },
    {
      name: "postalCode",
      label: "Código Postal",
      type: "text",
      rules: {
        required: 'El código postal es requerido'
      },
      value: info.postalCode || ''
    },
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
              label={input.label}
              type={input.type}
              rules={input.rules} />
          ))}
        </Box>
      </Box>
    </>
  );
};

export default ShipmentForm;
