import React from "react";
import { Typography } from "@mui/material";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footerContainer">
        <Typography variant="bold20" color="white">
          Mateusz Kuruc © 2023
        </Typography>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://github.com/MateuszKuruc"
        >
          <FaGithub size={30} color="white" />
        </a>
      </div>
    </div>
  );
};

export default Footer;
