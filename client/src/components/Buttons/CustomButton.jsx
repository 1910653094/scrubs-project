import React from "react";
import Button from "@mui/material/Button";
import { COLORS } from "../../assets";

const CustomButton = ({
  type,
  text,
  textColor = COLORS.blueLight5,
  backgroundColor = COLORS.blueLight1,
  onClick,
  fontSize = "24px",
  letterSpacing = "0.06em",
}) => {
  const TYPES = {
    primary: {
      color: COLORS.blueLight5,
      backgroundColor: backgroundColor,
      fontFamily: "Barlow",
      fontWeight: "bold",
      letterSpacing: "0.06cm",
      borderRadius: "5px",
      fontSize: fontSize,
      letterSpacing: letterSpacing,
    },
    secondary: {
      color: textColor,
      backgroundColor: backgroundColor,
      fontFamily: "Barlow",
      fontWeight: "bold",
      letterSpacing: "0.06cm",
      borderRadius: "5px",
      fontSize: fontSize,
      letterSpacing: letterSpacing,
    },
    tertiary: {
      color: textColor,
      textTransform: "none",
      fontFamily: "Barlow",
      fontWeight: "bold",
      letterSpacing: "0.06cm",
      borderRadius: "5px",
      fontSize: fontSize,
      letterSpacing: letterSpacing,
    },
  };
  return (
    <Button
      style={TYPES[type]}
      variant={type == "tertiary" ? "text" : "contained"}
      disableElevation
      onClick={onClick}
    >
      {text}
    </Button>
  );
};

export default CustomButton;
