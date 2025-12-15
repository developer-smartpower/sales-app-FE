import { Box, Typography } from "@mui/material";

const DetailRow = ({ label, value }) => {
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
      <Typography
        fontSize={"12px"}
        fontWeight={500}
        sx={{ mb: 1.5 }}
        color="#d84242ff"
      >
        {value}
      </Typography>
    </Box>
  );
};

export default DetailRow;
