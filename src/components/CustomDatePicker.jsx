import { Box, Typography, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useState } from "react";

const CustomDatePicker = ({
  label,
  name,
  value,
  onChange = () => {},
  required = false,
  errorMessage = "Invalid date",
  onError = () => {},
  minDate,
  maxDate,
}) => {
  const [errorMsg, setErrorMsg] = useState("");

  const handleBlur = () => {
    if (required && !value) {
      setErrorMsg(errorMessage);
      onError(name, true);
    } else {
      setErrorMsg("");
      onError(name, false);
    }
  };

  const handleChange = (newValue) => {
    if (!newValue || !dayjs(newValue).isValid()) {
      setErrorMsg(errorMessage);
      onError(name, true);
      onChange({
        target: { name, value: "" },
      });
      return;
    }

    setErrorMsg("");
    onError(name, false);

    // Send DATE string to backend (YYYY-MM-DD)
    onChange({
      target: {
        name,
        value: dayjs(newValue).format("YYYY-MM-DD"),
      },
    });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Typography
        variant="subtitle2"
        fontWeight={500}
        sx={{ mb: 1.5 }}
        color="#374151"
      >
        {label}
      </Typography>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          value={value ? dayjs(value) : null}
          onChange={handleChange}
          minDate={minDate}
          maxDate={maxDate}
          slotProps={{
            textField: {
              name,
              fullWidth: true,
              onBlur: handleBlur,
              InputProps: {
                sx: {
                  borderRadius: "8px",
                  height: "50px",
                  fontSize: "14px",
                  color: "#4B5563",
                  mb: "16px",
                },
              },
            },
          }}
        />
      </LocalizationProvider>

      <Typography
        fontSize="12px"
        fontWeight={500}
        sx={{ mb: 1.5 }}
        color="#d84242ff"
      >
        {errorMsg}
      </Typography>
    </Box>
  );
};

export default CustomDatePicker;
