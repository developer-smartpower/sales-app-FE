import { Box, TextField, Typography } from "@mui/material";
import { useState } from "react";

const CustomTextInput = ({
  label,
  name,
  placeholder,
  value,
  onChange = () => {},
  disabled = false,
  regex,
  errorMessage,
  onError = () => {},
}) => {
  const [errorMsg, setErrorMsg] = useState("");

  const validateField = () => {
    if (regex && !regex.test(value)) {
      setErrorMsg(errorMessage);
      onError(name, true);
    } else {
      setErrorMsg("");
      onError(name, false);
    }
  };

  const onBlurFunc = () => {
    validateField();
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "500px" }}>
      <Typography
        variant="subtitle2"
        fontWeight={500}
        sx={{ mb: 1.5 }}
        color="#374151"
      >
        {label}
      </Typography>
      <TextField
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={() => onBlurFunc()}
        fullWidth
        InputProps={{
          sx: {
            borderRadius: "8px",
            height: "50px",
            fontSize: "14px",
            color: "#4B5563",
            mb: "16px",
          },
        }}
        disabled={disabled}
      />
      <Typography
        fontSize={"12px"}
        fontWeight={500}
        sx={{ mb: 1.5 }}
        color="#d84242ff"
      >
        {errorMsg}
      </Typography>
    </Box>
  );
};

export default CustomTextInput;
