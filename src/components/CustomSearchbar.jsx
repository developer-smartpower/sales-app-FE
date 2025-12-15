import { Box, TextField, Typography } from "@mui/material";
import { useState } from "react";

const CustomSearchbar = ({
  name,
  placeholder,
  value,
  onSearchChange = () => {},
  regex,
  errorMessage,
  onSearchError = () => {},
  customParentStyles
}) => {
  const [errorMsg, setErrorMsg] = useState("");

  const validateField = () => {
    if (regex && !regex.test(value)) {
      setErrorMsg(errorMessage);
      onSearchError(name, true);
    } else {
      setErrorMsg("");
      onSearchError(name, false);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", flex: 1, ...customParentStyles }}>
      <TextField
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onSearchChange}
        onBlur={validateField}
        fullWidth={true}
        InputProps={{
          sx: {
            borderRadius: 8,
            height: 50,
            fontSize: 14,
            color: "#4B5563",
            mb: 2,
          },
        }}
      />
      <Typography
        fontSize={12}
        fontWeight={500}
        sx={{ mb: 1.5 }}
        color="#d84242ff"
      >
        {errorMsg}
      </Typography>
    </Box>
  );
};

export default CustomSearchbar;
