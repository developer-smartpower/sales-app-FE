import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { Box } from "@mui/material";

const MainLayout = () => {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100vh",
        flexDirection: "row",
        backgroundColor: "#f6f7fb",
      }}
    >
      <Box m={2} sx={{ display: "flex" }}>
        <Sidebar />
      </Box>
      <Box
        my={2}
        mr={2}
        sx={{
          display: "flex",
          flex: 1,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
