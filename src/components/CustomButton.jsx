import { Button, Box } from "@mui/material";
import * as COLORS from "../assets/colors";

const CustomButton = ({
  label,
  onClick = () => {},
  primaryBtnIcon = null,
  buttonStyles = {},
  disabled = false,
  fullWidth = false,
}) => {
  return (
    <Button
      fullWidth={fullWidth}
      onClick={onClick}
      disabled={disabled}
      sx={{
        backgroundColor: "#000",
        color: "#fff",
        borderRadius: "100px",
        px: "20px",
        textTransform: "none",
        display: "flex",
        alignItems: "center",
        gap: "16px",
        ...buttonStyles,
      }}
    >
      {label}

      {/* Right Icon */}
      {primaryBtnIcon && (
        <Box
          sx={{
            display: "flex",
            backgroundColor: COLORS.WHITE,
            borderRadius: "100px",
          }}
        >
          {primaryBtnIcon}
        </Box>
      )}
    </Button>
  );
};

export default CustomButton;
