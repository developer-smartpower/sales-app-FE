import { Box, Typography } from "@mui/material";
import * as COLORS from "../assets/colors";

const InputBoxRenderer = ({ title, children }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
        mb: 6,
      }}
    >
      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        {title}
      </Typography>
      <Box
        sx={{
          backgroundColor: COLORS.WHITE,
          backgroundColor: "#fff",
          borderRadius: "16px",
          display: "flex",
          flexDirection: "row",
          ph: 4,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default InputBoxRenderer;
