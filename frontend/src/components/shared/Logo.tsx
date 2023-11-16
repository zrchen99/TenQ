import React from "react";
import { Typography } from "@mui/material";
import { Link } from 'react-router-dom';
import "./Logo.scss"; // Import the SASS stylesheet

const Logo = () => {
  return (
    <div className="logo-container">
      <Link to={"/"}>
        <img 
          src="openai.png" 
          alt="openai" 
          className="logo-image" 
        />
      </Link>
      <Typography className="logo-text">
        <span className="logo-text-primary">TenQ</span>-Chat
      </Typography>
    </div>
  );
};

export default Logo;
