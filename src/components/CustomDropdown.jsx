import { Box, Typography, Select, MenuItem, FormControl } from "@mui/material";
import { useState } from "react";

const CustomDropdown = ({
  label,
  name,
  placeholder,
  value,
  onChange = () => {},
  options = [],
  regex,
  errorMessage = "",
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

  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
      {/* Label */}
      <Typography
        variant="subtitle2"
        fontWeight={500}
        sx={{ mb: 1 }}
        color="#374151"
      >
        {label}
      </Typography>

      {/* Select */}
      <FormControl fullWidth error={!!errorMsg}>
        <Select
          name={name}
          value={value}
          displayEmpty
          onChange={onChange}
          onBlur={validateField}
          sx={{
            borderRadius: "8px",
            height: "50px",
            fontSize: "14px",
            color: "#4B5563",
            mb: "16px",
          }}
        >
          {/* Placeholder */}
          <MenuItem value="">
            <em>{placeholder}</em>
          </MenuItem>

          {/* Options */}
          {options.map((opt) => (
            <MenuItem value={opt.value} key={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Error Message */}
      {errorMsg && (
        <Typography fontSize="12px" fontWeight={500} color="#d84242" mt={0.5}>
          {errorMsg}
        </Typography>
      )}
    </Box>
  );
};

export default CustomDropdown;
