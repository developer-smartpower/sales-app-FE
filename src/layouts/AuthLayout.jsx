import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <Box sx={{ display: "flex", height: "100vh", width: "100%" }}>
      <Outlet />
    </Box>
  );
};

export default AuthLayout;
