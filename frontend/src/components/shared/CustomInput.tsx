import React from "react";
import { TextField } from "@mui/material";
import "./CustomInput.scss"; // Import the SASS stylesheet

type Props = {
  name: string;
  type: string;
  label: string;
}

const CustomInput = (props: Props) => {
  return (
    <TextField 
      margin="normal"
      InputLabelProps={{ className: "input-label" }}
      name={props.name} 
      label={props.label} 
      type={props.type} 
      inputProps={{ className: "input-field" }}
    />
  );
};

export default CustomInput;