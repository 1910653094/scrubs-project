import React from "react";
import Button from "@mui/material/Button";

// white text by default, PROPS: text, backgroundColor
const PrimaryButton = ({ text, color, onClick }) => {
  const COLOR = {
    blueBase: "#3e66b1",
    lightBlue: "#6489d1",
    veryLightBlue: "#cbd8f0",
    green: "#4a9652",
    red: "#bd3a3a",
  };

  const style = {
    color: "white",
    fontWeight: "bold",
    backgroundColor: COLOR.red,
    onClick: onClick,
    FontFace: "Barlow",
  };

  return (
    <Button style={style} className="primary-button" variant="contained">
      {text}
    </Button>
  );
};

export default PrimaryButton;
