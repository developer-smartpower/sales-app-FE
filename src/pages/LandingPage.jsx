import { Box } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import loader from "../assets/gifs/loader.gif";

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/signIn");
    }, 2000);
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
      }}
    >
      <img src={loader} style={{ height: "200px", width: "200px" }} />
    </Box>
  );
};

export default LandingPage;
