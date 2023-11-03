import { TextField } from "@mui/material";
import React from "react";

type Props = {
  name: string;
  type: string;
  label: string;
}

const CustomInput = (props: Props) => {
  return <TextField name={props.name} label={props.label} type={props.type} />
};

export default CustomInput;