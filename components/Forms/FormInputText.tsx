import { Control, Controller, FieldValues } from "react-hook-form";
import React from "react";
import { TextField } from "@mui/material";

interface Props {
  name: string,
  control: Control<FieldValues, any>,
  label: string,
  defaultValue?: string | null,
  type: string,
  rules: {},
}

export const FormInputText = ({ name, control, label, type, rules }: Props) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          label={label}
          size="small"
          color="secondary"
          onChange={onChange}
          error={!!error}
          helperText={error ? error.message : null}
          type={type}
        />
      )}
      rules={rules}
    />

  )

}